import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db/client";
import { authSessions } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";

export const SESSION_COOKIE = "aestho_admin";
export const SESSION_TTL_DAYS = 7;
const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

function secretKey() {
  const s = process.env.DASHBOARD_SESSION_SECRET;
  if (!s) throw new Error("DASHBOARD_SESSION_SECRET is not set");
  return new TextEncoder().encode(s);
}

async function hashToken(token: string): Promise<string> {
  // sha256 hex — fast, deterministic, no salt needed because token already
  // has 256 bits of entropy.
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Create a session DB row + return a signed JWT (containing only the random
 * token). The cookie holds the JWT; the server hashes the token on each
 * request and looks it up. So even if the JWT secret leaks, an attacker
 * can't forge a valid session without also writing to the DB.
 */
export async function createSession(opts: {
  email: string;
  ip?: string | undefined;
  userAgent?: string | undefined;
}): Promise<{ jwt: string; expiresAt: Date }> {
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.insert(authSessions).values({
    email: opts.email.toLowerCase().trim(),
    tokenHash,
    expiresAt,
    ip: opts.ip ?? null,
    userAgent: opts.userAgent ?? null,
  });

  const jwt = await new SignJWT({ t: token, k: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secretKey());

  return { jwt, expiresAt };
}

/**
 * Validate the cookie's JWT, then confirm a non-expired session row exists
 * with a matching token_hash. Returns the email on success, null otherwise.
 * Side effect: bumps last_seen_at.
 */
export async function readSession(jwt: string | undefined): Promise<{ email: string } | null> {
  if (!jwt) return null;

  let token: string;
  try {
    const { payload } = await jwtVerify(jwt, secretKey());
    // Reject tokens minted for the client portal (k: "client") even though
    // they're signed with the same secret — defense in depth so a portal
    // session can't be replayed against admin endpoints.
    if (payload.k && payload.k !== "admin") return null;
    token = payload.t as string;
    if (!token) return null;
  } catch {
    return null;
  }

  const tokenHash = await hashToken(token);
  const now = new Date();
  const rows = await db
    .select()
    .from(authSessions)
    .where(and(eq(authSessions.tokenHash, tokenHash), gt(authSessions.expiresAt, now)))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  // Touch last_seen_at, fire-and-forget — don't block the request.
  db.update(authSessions)
    .set({ lastSeenAt: now })
    .where(eq(authSessions.id, row.id))
    .catch((e) => console.error("[auth] last_seen_at update failed", e));

  return { email: row.email };
}

export async function destroySession(jwt: string | undefined): Promise<void> {
  if (!jwt) return;
  let token: string;
  try {
    const { payload } = await jwtVerify(jwt, secretKey());
    token = payload.t as string;
    if (!token) return;
  } catch {
    return;
  }
  const tokenHash = await hashToken(token);
  await db.delete(authSessions).where(eq(authSessions.tokenHash, tokenHash));
}

/**
 * Server-component helper: read the cookie and return the session, if any.
 * Use inside layout.tsx / page.tsx server components.
 */
export async function getCurrentSession() {
  const store = await cookies();
  const jwt = store.get(SESSION_COOKIE)?.value;
  return readSession(jwt);
}

export function buildSessionCookie(jwt: string, expiresAt: Date) {
  return {
    name: SESSION_COOKIE,
    value: jwt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}
