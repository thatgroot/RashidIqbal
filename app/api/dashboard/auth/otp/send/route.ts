import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getPrimaryEmail, isEmailAllowed } from "@/lib/auth/allowlist";
import { createOtpCode } from "@/lib/auth/otp";
import { buildOtpEmail } from "@/lib/auth/otp-email";

// Simple in-memory rate limit shared with the rest of the app's API surface.
// 3 OTP requests per IP per 15-min window.
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 15 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now - e.ts > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (e.count >= RATE_LIMIT) return true;
  e.count++;
  return false;
}

function senderForOtp() {
  const base =
    process.env.RESEND_FROM_EMAIL?.replace(/^[^<]*<|>$/g, "").trim() ||
    "onboarding@resend.dev";
  return `Aestho Login <${base}>`;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  // The login UI doesn't ask for an email — there's only one admin. If the
  // client passes one, validate it; otherwise fall back to the primary
  // allowlisted address. Either way, never leak whether a passed email is
  // allowed by varying the response shape.
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const passed = body.email?.trim().toLowerCase();
  if (passed && !passed.includes("@")) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const email = passed || getPrimaryEmail();
  if (!isEmailAllowed(email)) {
    return NextResponse.json({ success: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[otp/send] RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 500 }
    );
  }

  const { code, expiresAt } = await createOtpCode({ email, ip });
  const userAgent = req.headers.get("user-agent") || undefined;
  const { subject, html, text } = buildOtpEmail({ code, expiresAt, ip, userAgent });

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const res = await resend.emails.send({
      from: senderForOtp(),
      to: email,
      subject,
      html,
      text,
    });
    if (res.error) {
      console.error("[otp/send] Resend error", res.error);
      return NextResponse.json(
        { error: "Email failed to send. Try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[otp/send] unexpected", err);
    return NextResponse.json(
      { error: "Email failed to send. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
