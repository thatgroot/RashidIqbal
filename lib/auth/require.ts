import { NextRequest, NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "./session";

/**
 * Drop-in guard for dashboard API routes. Returns a 401 NextResponse if
 * the request lacks a valid session cookie, or null if the request is
 * authenticated.
 *
 *   export async function GET(req: NextRequest) {
 *     const unauth = await requireAuth(req);
 *     if (unauth) return unauth;
 *     // ... handler logic ...
 *   }
 */
export async function requireAuth(req: NextRequest): Promise<NextResponse | null> {
  const jwt = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await readSession(jwt);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}
