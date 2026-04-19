import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ============================================================================
// Constants
// ============================================================================

const RECIPIENT = "rashid@founderfist.com";

// Sender address. In prod, set RESEND_FROM_EMAIL to a verified-domain
// mailbox (e.g. "contact@aestho.xyz"). During setup, Resend lets you send
// from `onboarding@resend.dev` *only* to your signup email — useful for
// smoke-testing before domain verification.
const SENDER =
  process.env.RESEND_FROM_EMAIL || "Aestho <onboarding@resend.dev>";

// Simple in-memory rate limit: 5 submissions per IP per hour.
const rateMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ============================================================================
// POST /api/lead
// ============================================================================
// Accepts every lead form in the site: /offer page, /contact ServiceBuilder,
// ExitIntentPopup. Discriminates by `source` in the request body.
//
// All fields optional except `email`.
type LeadPayload = {
  source?: "offer-lp" | "service-builder" | "exit-intent" | string;
  email?: string;
  name?: string;
  website?: string;
  concern?: string;
  location?: string;
  services?: string;
  pageCount?: string | number;
  budget?: string;
  timeline?: string;
  description?: string;
  // Honeypot — must be empty. Bots fill it, humans don't.
  botcheck?: string;
};

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as LeadPayload;

    // Honeypot — silently 200 so bots don't retry, but don't send anything.
    if (body.botcheck) {
      return NextResponse.json({ success: true });
    }

    const email = body.email?.trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[lead-api] RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Email delivery is not configured on the server." },
        { status: 500 }
      );
    }

    const source = body.source || "unknown";
    const website = body.website?.trim();
    const name = body.name?.trim();

    // Subject routing — keep inbox signals readable at a glance.
    let subject: string;
    if (source === "offer-lp") {
      subject = `Free Audit Claim: ${website || email}`;
    } else if (source === "exit-intent") {
      subject = `New Audit Request: ${website || email}`;
    } else if (source === "service-builder") {
      subject = `New Inquiry: ${body.services || "General"} from ${name || email}`;
    } else {
      subject = `New Lead from ${name || email}`;
    }

    // Build a plain-text message body dynamically from whichever fields the
    // form actually submitted. Avoids empty "N/A" lines.
    const lines = [
      `Source: ${source}`,
      `Email: ${email}`,
      website ? `Website: ${website}` : null,
      name ? `Name: ${name}` : null,
      body.location ? `Location: ${body.location}` : null,
      body.services ? `Services: ${body.services}` : null,
      body.pageCount ? `Approximate pages: ${body.pageCount}` : null,
      body.budget ? `Budget: ${body.budget}` : null,
      body.timeline ? `Timeline: ${body.timeline}` : null,
      body.concern ? `\nBiggest concern:\n${body.concern}` : null,
      body.description ? `\nDescription:\n${body.description}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: SENDER,
      to: RECIPIENT,
      cc: email, // submitter gets a copy for their records
      replyTo: email,
      subject,
      text: lines,
    });

    if (error) {
      console.error("[lead-api] Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send. Please email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[lead-api] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
  }
}
