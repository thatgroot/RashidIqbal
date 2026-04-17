import { NextRequest, NextResponse } from "next/server";

// Where inquiry/lead emails should land
const RECIPIENT_EMAIL = "rashidiqbal.freelance@gmail.com";

// Rate limiting for lead submissions
const leadRateMap = new Map<string, { count: number; timestamp: number }>();
const LEAD_RATE_LIMIT = 5;
const LEAD_RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isLeadRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = leadRateMap.get(ip);
  if (!entry || now - entry.timestamp > LEAD_RATE_WINDOW) {
    leadRateMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (entry.count >= LEAD_RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (isLeadRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const { email, url, scores } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Build message from scores (which may contain inquiry form data)
    const name = scores?.name || "N/A";
    const projectType = scores?.projectType || "N/A";
    const budget = scores?.budget || "N/A";
    const timeline = scores?.timeline || "N/A";
    const description = scores?.description || "N/A";
    const performance = scores?.performance;
    const seo = scores?.seo;

    const isInquiryForm = !!scores?.projectType;

    const message = isInquiryForm
      ? `New project inquiry from ${name}.

Name: ${name}
Email: ${email}
Website: ${url || "N/A"}
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}

Description:
${description}`
      : `New audit request.

Email: ${email}
Website: ${url}
${performance ? `Performance: ${performance}` : ""}
${seo ? `SEO: ${seo}` : ""}`;

    // Server-only env var. Fall back to legacy NEXT_PUBLIC_ name during transition.
    const webhookKey = process.env.WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;

    if (!webhookKey) {
      console.error("[lead] WEB3FORMS_KEY not configured; cannot send email.");
      return NextResponse.json(
        { error: "Email delivery not configured on the server." },
        { status: 500 }
      );
    }

    // Send lead to Web3Forms
    // `to` overrides the default account recipient. The target address must be
    // verified in the Web3Forms dashboard for this access key; if not verified,
    // Web3Forms falls back to the account's primary email.
    const w3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: webhookKey,
        to: RECIPIENT_EMAIL,
        subject: isInquiryForm
          ? `New Inquiry: ${projectType} from ${name}`
          : `New Audit Request: ${url}`,
        from_name: "Aestho",
        email,
        replyto: email,
        message: message.trim(),
      }),
    });

    const w3Body = await w3Res.json().catch(() => ({}));

    if (!w3Res.ok || w3Body?.success === false) {
      console.error("[lead] Web3Forms returned an error:", w3Res.status, w3Body);
      return NextResponse.json(
        { error: "Failed to deliver the message. Please email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[lead] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
  }
}
