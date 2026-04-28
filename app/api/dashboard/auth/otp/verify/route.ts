import { NextRequest, NextResponse } from "next/server";
import { getPrimaryEmail, isEmailAllowed } from "@/lib/auth/allowlist";
import { verifyOtpCode } from "@/lib/auth/otp";
import { buildSessionCookie, createSession } from "@/lib/auth/session";

// In-memory bucket for verify attempts. 6 wrong codes per IP per 15 min.
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

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    code?: string;
  };
  // Single-admin login: email defaults to the primary allowlisted address
  // when the client omits it.
  const passed = body.email?.trim().toLowerCase();
  const email = passed || getPrimaryEmail();
  const code = body.code?.trim();

  if (!email.includes("@") || !code || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "6-digit code required." },
      { status: 400 }
    );
  }

  if (!isEmailAllowed(email)) {
    // Generic error — don't reveal whether email is allowed.
    recordFailure(ip);
    return NextResponse.json(
      { error: "Code is invalid or expired." },
      { status: 401 }
    );
  }

  const ok = await verifyOtpCode({ email, code });
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
  const { jwt, expiresAt } = await createSession({ email, ip, userAgent });

  const cookie = buildSessionCookie(jwt, expiresAt);
  const res = NextResponse.json({ success: true, redirect: "/dashboard" });
  res.cookies.set(cookie);
  return res;
}
