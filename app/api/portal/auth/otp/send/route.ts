import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClientOtp, getClientByEmail } from "@/lib/portal/auth";
import { buildPortalOtpEmail } from "@/lib/portal/otp-email";

// 3 OTP requests per IP per 15 min — same envelope as the admin route.
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
  return `Rashid Iqbal <${base}>`;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }

  // Allowlist: only emails that already have a clients row can request a
  // code. Returning success either way avoids leaking whether the email
  // belongs to a real client.
  const client = await getClientByEmail(email);
  if (!client) {
    return NextResponse.json({ success: true });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("[portal/otp/send] RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }
  const { code, expiresAt } = await createClientOtp({ email, ip });
  const { subject, html, text } = buildPortalOtpEmail({
    code,
    expiresAt,
    clientName: client.name ?? undefined,
  });
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const r = await resend.emails.send({
      from: senderForOtp(),
      to: email,
      subject,
      html,
      text,
    });
    if (r.error) {
      console.error("[portal/otp/send] Resend error", r.error);
      return NextResponse.json({ error: "Email failed to send." }, { status: 502 });
    }
  } catch (err) {
    console.error("[portal/otp/send] unexpected", err);
    return NextResponse.json({ error: "Email failed to send." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
