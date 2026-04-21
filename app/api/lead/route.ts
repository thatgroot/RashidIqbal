import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildLeadEmailHtml,
  buildLeadEmailText,
  buildClientEmailHtml,
  buildClientEmailText,
} from "./email-template";
import {
  ONE_TIME_PLANS,
  RETAINER_PLANS,
  type PricingPlan,
} from "@/lib/pricing-data";

// Look up the full plan object from the pricing catalog by display name +
// billing mode. Returns undefined when no match — the email template then
// skips the pricing card block gracefully.
function findPricingPlan(
  planName: string | undefined,
  mode: string | undefined
): PricingPlan | undefined {
  if (!planName) return undefined;
  const catalog = mode === "retainer" ? RETAINER_PLANS : ONE_TIME_PLANS;
  const needle = planName.trim().toLowerCase();
  return catalog.find((p) => p.name.toLowerCase() === needle);
}

// ============================================================================
// Constants
// ============================================================================

const RECIPIENT = "rashid@founderfist.com";

// Two distinct sender identities so Rashid's inbox and the client's inbox
// each show a sensible "from" line. Same underlying mailbox — just a display
// name difference on the envelope.
//
// RESEND_FROM_EMAIL should be a verified-domain mailbox like
// "mail@aestho.xyz". If unset (e.g. before domain verification in dev), we
// fall back to Resend's sandbox `onboarding@resend.dev`, which delivers only
// to your Resend signup email — useful for smoke tests.
const SENDER_BASE =
  process.env.RESEND_FROM_EMAIL?.replace(/^[^<]*<|>$/g, "").trim() ||
  "onboarding@resend.dev";

const SENDER_INTERNAL = `Aestho Leads <${SENDER_BASE}>`;
const SENDER_CLIENT = `Rashid Iqbal <${SENDER_BASE}>`;

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

type LeadPayload = {
  source?: "offer-lp" | "service-builder" | "exit-intent" | "pricing" | string;
  email?: string;
  name?: string;
  website?: string;
  concern?: string;
  location?: string;
  services?: string;
  stack?: string;
  pageCount?: string | number;
  budget?: string;
  timeline?: string;
  description?: string;
  // Pricing-inquiry only
  plan?: string;
  mode?: string;
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

    // Honeypot — silently 200 so bots don't retry.
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

    // -------------------------------------------------------------------- //
    // Subjects
    // -------------------------------------------------------------------- //
    // Pipe separator keeps the type prefix readable when the inbox list
    // truncates. Internal and client subjects are deliberately different
    // so Rashid can grep his inbox by "New Inquiry |" / "Free Audit |".

    const displayName = name || email;

    const planLabel = body.plan?.trim();
    const modeLabel =
      body.mode === "retainer" ? "Retainer" : body.mode === "one-time" ? "One-time" : undefined;

    const internalSubjectByType: Record<string, string> = {
      "service-builder": `New Inquiry | ${body.services || "Project"} from ${displayName}`,
      "offer-lp": `Free Audit | ${website || displayName}`,
      "exit-intent": `Audit Request | ${website || displayName}`,
      "pricing": `Pricing Inquiry | ${planLabel || "Plan"}${
        modeLabel ? ` (${modeLabel})` : ""
      } from ${displayName}`,
    };
    const internalSubject =
      internalSubjectByType[source] || `New Lead | ${displayName}`;

    const clientSubjectByType: Record<string, string> = {
      "service-builder": `Got your project inquiry — here's what's next`,
      "offer-lp": `Your free audit is on the way`,
      "exit-intent": `Audit request received`,
      "pricing": `Got your pricing inquiry — here's what's next`,
    };
    const clientSubject =
      clientSubjectByType[source] || `Got your message — here's what's next`;

    // -------------------------------------------------------------------- //
    // Build both emails
    // -------------------------------------------------------------------- //

    const sharedFields = {
      email,
      name,
      website,
      concern: body.concern?.trim(),
      location: body.location?.trim(),
      services: body.services?.trim(),
      stack: body.stack?.trim(),
      pageCount: body.pageCount,
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
      description: body.description?.trim(),
      plan: body.plan?.trim(),
      mode: body.mode?.trim(),
      // Resolve the full pricing-catalog entry on the server so the email
      // renders the complete tier card without trusting client-supplied data.
      planSnapshot: findPricingPlan(body.plan, body.mode),
    };

    const internalHtml = buildLeadEmailHtml({
      ...sharedFields,
      source,
      subject: internalSubject,
    });
    const internalText = buildLeadEmailText({
      ...sharedFields,
      source,
      subject: internalSubject,
    });

    const clientHtml = buildClientEmailHtml({ ...sharedFields, source });
    const clientText = buildClientEmailText({ ...sharedFields, source });

    // -------------------------------------------------------------------- //
    // Send in parallel
    // -------------------------------------------------------------------- //

    const resend = new Resend(process.env.RESEND_API_KEY);

    const [internalRes, clientRes] = await Promise.all([
      resend.emails.send({
        from: SENDER_INTERNAL,
        to: RECIPIENT,
        replyTo: email, // reply-all threads back to the submitter
        subject: internalSubject,
        html: internalHtml,
        text: internalText,
      }),
      resend.emails.send({
        from: SENDER_CLIENT,
        to: email,
        replyTo: RECIPIENT, // submitter's reply lands in Rashid's inbox
        subject: clientSubject,
        html: clientHtml,
        text: clientText,
      }),
    ]);

    if (internalRes.error) {
      // Internal send is the critical one. If it fails, surface an error so
      // the visitor knows to try again or email directly.
      console.error("[lead-api] Internal send failed:", internalRes.error);
      return NextResponse.json(
        {
          error:
            internalRes.error.message ||
            "Failed to send. Please email directly.",
        },
        { status: 502 }
      );
    }

    if (clientRes.error) {
      // Client ack failure isn't fatal — the lead still landed with Rashid.
      // Log it so we can notice if Resend is flaky for outbound mail to
      // certain providers.
      console.error("[lead-api] Client ack send failed:", clientRes.error);
    }

    return NextResponse.json({
      success: true,
      internalId: internalRes.data?.id,
      clientAckId: clientRes.data?.id ?? null,
    });
  } catch (err) {
    console.error("[lead-api] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
  }
}
