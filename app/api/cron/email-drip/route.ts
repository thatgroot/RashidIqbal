import { NextRequest, NextResponse } from "next/server";
import { dispatchDueSteps } from "@/lib/email-drip/sequencer";

// Hourly cron: picks up email_drip_jobs whose due_at has passed and sends
// each via Resend. Idempotent — sent_at is set on success so a row never
// fires twice.
//
// Auth mirrors /api/indexnow/sync-sitemap:
//   - Vercel cron attaches Authorization: Bearer ${CRON_SECRET}
//   - Manual triggers can pass ?secret=… or matching Bearer

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // open if not configured (low-risk worker)

  const url = new URL(req.url);
  const queryToken = url.searchParams.get("secret") ?? "";
  const authHeader = req.headers.get("authorization") ?? "";
  const headerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  return headerToken === cronSecret || queryToken === cronSecret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await dispatchDueSteps(50);
  return NextResponse.json({ ok: true, ...result, ts: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
