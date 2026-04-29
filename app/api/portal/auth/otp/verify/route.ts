import { NextRequest, NextResponse } from "next/server";
import {
  buildPortalCookie,
  createClientSession,
  getClientByEmail,
  verifyClientOtp,
} from "@/lib/portal/auth";

const failMap = new Map<string, { count: number; ts: number }>();
const FAIL_LIMIT = 6;
const FAIL_WINDOW = 15 * 60 * 1000;

function recordFailure(ip: string): boolean {
  const now = Date.now();
  const e = failMap.get(ip);
  if (!e || now - e.ts > FAIL_WINDOW) {
    failMap.set(ip, { count: 1, ts: now });
    return false;
  }
  e.count++;
  return e.count >= FAIL_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const body = (await req.json().catch(() => ({}))) as { email?: string; code?: string };
  const email = body.email?.trim().toLowerCase();
  const code = body.code?.trim();
  if (!email || !email.includes("@") || !code || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Email and 6-digit code required." }, { status: 400 });
  }

  const client = await getClientByEmail(email);
  if (!client) {
    recordFailure(ip);
    return NextResponse.json({ error: "Code is invalid or expired." }, { status: 401 });
  }

  const ok = await verifyClientOtp({ email, code });
  if (!ok) {
    const blocked = recordFailure(ip);
    return NextResponse.json(
      {
        error: blocked
          ? "Too many wrong codes. Try again in 15 minutes."
          : "Code is invalid or expired.",
      },
      { status: blocked ? 429 : 401 }
    );
  }

  const userAgent = req.headers.get("user-agent") || undefined;
  const { jwt, expiresAt } = await createClientSession({
    clientId: client.id,
    ip,
    userAgent,
  });
  const res = NextResponse.json({ success: true, redirect: "/portal" });
  res.cookies.set(buildPortalCookie(jwt, expiresAt));
  return res;
}
