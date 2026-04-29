import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db/client";
import { clientOtpCodes, clientSessions, clients } from "@/db/schema";
import { and, eq, gt, isNull } from "drizzle-orm";

// Client portal auth — mirrors lib/auth/* for the admin path but uses
// separate tables (client_otp_codes, client_sessions) and its own cookie
// (`aestho_client`). Allowlist is implicit: only emails that already have
// a clients row can request an OTP. Rashid creates client rows when he
// converts a form submission into a project.

export const PORTAL_COOKIE = "aestho_client";
const PORTAL_TTL_DAYS = 30;
const PORTAL_TTL_MS = PORTAL_TTL_DAYS * 24 * 60 * 60 * 1000;

const OTP_TTL_MS = 10 * 60 * 1000;
const BCRYPT_ROUNDS = 10;

function secretKey() {
  // Reuses the dashboard session secret — same admin governs both spaces.
  const s = process.env.DASHBOARD_SESSION_SECRET;
  if (!s) throw new Error("DASHBOARD_SESSION_SECRET is not set");
  return new TextEncoder().encode(s);
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
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

export function generateCode(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return (buf[0]! % 1_000_000).toString().padStart(6, "0");
}

export async function getClientByEmail(email: string) {
  const [row] = await db
    .select()
    .from(clients)
    .where(eq(clients.email, email.trim().toLowerCase()))
    .limit(1);
  return row ?? null;
}

export async function createClientOtp(opts: { email: string; ip?: string | undefined }) {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, BCRYPT_ROUNDS);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);
  await db.insert(clientOtpCodes).values({
    email: opts.email.toLowerCase().trim(),
    codeHash,
    expiresAt,
    ip: opts.ip ?? null,
  });
  return { code, expiresAt };
}

export async function verifyClientOtp(opts: {
  email: string;
  code: string;
}): Promise<boolean> {
  const email = opts.email.toLowerCase().trim();
  const now = new Date();
  const rows = await db
    .select()
    .from(clientOtpCodes)
    .where(
      and(
        eq(clientOtpCodes.email, email),
        gt(clientOtpCodes.expiresAt, now),
        isNull(clientOtpCodes.usedAt)
      )
    );
  for (const row of rows) {
    if (await bcrypt.compare(opts.code, row.codeHash)) {
      await db
        .update(clientOtpCodes)
        .set({ usedAt: now })
        .where(eq(clientOtpCodes.id, row.id));
      return true;
    }
  }
  return false;
}

export async function createClientSession(opts: {
  clientId: string;
  ip?: string | undefined;
  userAgent?: string | undefined;
}): Promise<{ jwt: string; expiresAt: Date }> {
  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + PORTAL_TTL_MS);
  await db.insert(clientSessions).values({
    clientId: opts.clientId,
    tokenHash,
    expiresAt,
    ip: opts.ip ?? null,
    userAgent: opts.userAgent ?? null,
  });
  await db
    .update(clients)
    .set({ lastLoginAt: new Date() })
    .where(eq(clients.id, opts.clientId));
  const jwt = await new SignJWT({ t: token, k: "client" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secretKey());
  return { jwt, expiresAt };
}

export async function readClientSession(jwt: string | undefined) {
  if (!jwt) return null;
  let token: string;
  try {
    const { payload } = await jwtVerify(jwt, secretKey());
    if (payload.k !== "client") return null;
    token = payload.t as string;
    if (!token) return null;
  } catch {
    return null;
  }
  const tokenHash = await sha256Hex(token);
  const now = new Date();
  const rows = await db
    .select({
      clientId: clientSessions.clientId,
      sessionId: clientSessions.id,
    })
    .from(clientSessions)
    .where(and(eq(clientSessions.tokenHash, tokenHash), gt(clientSessions.expiresAt, now)))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, row.clientId))
    .limit(1);
  if (!client) return null;
  // touch last_seen_at fire-and-forget
  db.update(clientSessions)
    .set({ lastSeenAt: now })
    .where(eq(clientSessions.id, row.sessionId))
    .catch((e) => console.error("[portal] last_seen_at touch failed", e));
  return { client, sessionId: row.sessionId };
}

export async function destroyClientSession(jwt: string | undefined) {
  if (!jwt) return;
  let token: string;
  try {
    const { payload } = await jwtVerify(jwt, secretKey());
    token = payload.t as string;
  } catch {
    return;
  }
  const tokenHash = await sha256Hex(token);
  await db.delete(clientSessions).where(eq(clientSessions.tokenHash, tokenHash));
}

export async function getCurrentClientSession() {
  const store = await cookies();
  const jwt = store.get(PORTAL_COOKIE)?.value;
  return readClientSession(jwt);
}

export function buildPortalCookie(jwt: string, expiresAt: Date) {
  return {
    name: PORTAL_COOKIE,
    value: jwt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}
