import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { eq, sql } from "drizzle-orm";
import { dbEdge, schema } from "@/db/edge";

export const runtime = "edge";

// ----------------------------------------------------------------------------
// Types — must stay in sync with components/analytics/tracker.tsx
// ----------------------------------------------------------------------------

type IncomingEvent = {
  type: string;
  path?: string;
  target?: string;
  properties?: Record<string, unknown>;
  ts?: number; // client wall-clock; we ignore this for createdAt but accept it
};

type Payload = {
  visitorId: string; // aestho_v cookie value
  sessionToken: string; // aestho_s cookie value
  events: IncomingEvent[];
  // Per-payload metadata (sent on first event of a session, then optional)
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  clarityId?: string;
  landingPath?: string;
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

const VALID_EVENT_TYPES = new Set([
  "pageview",
  "click",
  "scroll",
  "form_view",
  "form_submit",
  "cta_click",
  "custom",
]);

const ID_REGEX = /^[a-z0-9-]{16,64}$/i;

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function dailySalt(): string {
  // Salt rotates daily — same visitor across days gets a different ip_hash,
  // which prevents long-term IP correlation while still enabling unique
  // visitor counts within a single day.
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

function deviceTypeFromUA(uaResult: ReturnType<UAParser["getResult"]>): string {
  const t = uaResult.device.type;
  if (t === "mobile" || t === "tablet") return t;
  if (uaResult.browser.name?.includes("Bot")) return "bot";
  return "desktop";
}

// In-memory rate limit. Edge runtime gives a fresh module per cold start, so
// this is bursty in practice. 60 events / visitor / minute is generous for
// real users and clamps a runaway bot.
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 60;
const RATE_WINDOW = 60_000;

function rateLimited(visitorCookie: string): boolean {
  const now = Date.now();
  const e = rateMap.get(visitorCookie);
  if (!e || now - e.ts > RATE_WINDOW) {
    rateMap.set(visitorCookie, { count: 1, ts: now });
    return false;
  }
  if (e.count >= RATE_LIMIT) return true;
  e.count++;
  return false;
}

// ----------------------------------------------------------------------------
// Handler
// ----------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  if (!body.visitorId || !ID_REGEX.test(body.visitorId)) {
    return NextResponse.json({ error: "bad visitor" }, { status: 400 });
  }
  if (!body.sessionToken || !ID_REGEX.test(body.sessionToken)) {
    return NextResponse.json({ error: "bad session" }, { status: 400 });
  }
  if (!Array.isArray(body.events) || body.events.length === 0) {
    return NextResponse.json({ error: "no events" }, { status: 400 });
  }
  if (body.events.length > 60) {
    return NextResponse.json({ error: "too many events" }, { status: 400 });
  }

  if (rateLimited(body.visitorId)) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  // ---- Geo + UA enrichment from request headers --------------------------
  const country = req.headers.get("x-vercel-ip-country") || null;
  const region = req.headers.get("x-vercel-ip-country-region") || null;
  const city = req.headers.get("x-vercel-ip-city") || null;
  const timezone = req.headers.get("x-vercel-ip-timezone") || null;
  const ua = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  const parser = new UAParser(ua);
  const uaResult = parser.getResult();
  const deviceType = deviceTypeFromUA(uaResult);
  const browser = [uaResult.browser.name, uaResult.browser.version?.split(".")[0]]
    .filter(Boolean)
    .join(" ");
  const os = [uaResult.os.name, uaResult.os.version].filter(Boolean).join(" ");
  const ipHash = await sha256Hex(`${ip}|${dailySalt()}`);

  // ---- Upsert visitor row -----------------------------------------------
  // First-touch attribution: only fill utm_* / referrer_first if they were
  // empty. Postgres ON CONFLICT lets us do that in a single round trip.
  const visitorInsert = await dbEdge
    .insert(schema.analyticsVisitors)
    .values({
      visitorId: body.visitorId,
      country: country || undefined,
      region: region || undefined,
      city: city || undefined,
      timezone: timezone || undefined,
      userAgent: ua.slice(0, 500) || undefined,
      deviceType,
      browser: browser || undefined,
      os: os || undefined,
      ipHash,
      utmSource: body.utmSource || undefined,
      utmMedium: body.utmMedium || undefined,
      utmCampaign: body.utmCampaign || undefined,
      referrerFirst: body.referrer || undefined,
    })
    .onConflictDoUpdate({
      target: schema.analyticsVisitors.visitorId,
      set: {
        lastSeenAt: new Date(),
        // Refresh enrichment that may have changed (new browser, new geo)
        country: sql`COALESCE(EXCLUDED.country, ${schema.analyticsVisitors.country})`,
        region: sql`COALESCE(EXCLUDED.region, ${schema.analyticsVisitors.region})`,
        city: sql`COALESCE(EXCLUDED.city, ${schema.analyticsVisitors.city})`,
        timezone: sql`COALESCE(EXCLUDED.timezone, ${schema.analyticsVisitors.timezone})`,
        userAgent: sql`COALESCE(EXCLUDED.user_agent, ${schema.analyticsVisitors.userAgent})`,
        deviceType: sql`COALESCE(EXCLUDED.device_type, ${schema.analyticsVisitors.deviceType})`,
        browser: sql`COALESCE(EXCLUDED.browser, ${schema.analyticsVisitors.browser})`,
        os: sql`COALESCE(EXCLUDED.os, ${schema.analyticsVisitors.os})`,
        ipHash: sql`EXCLUDED.ip_hash`,
      },
    })
    .returning({ id: schema.analyticsVisitors.id });

  const visitorRowId = visitorInsert[0]?.id;
  if (!visitorRowId) {
    return NextResponse.json({ error: "visitor upsert failed" }, { status: 500 });
  }

  // ---- Upsert session row -----------------------------------------------
  const pageviewCount = body.events.filter((e) => e.type === "pageview").length;
  const lastPath = [...body.events].reverse().find((e) => e.path)?.path;

  const sessionInsert = await dbEdge
    .insert(schema.analyticsSessions)
    .values({
      visitorId: visitorRowId,
      sessionToken: body.sessionToken,
      landingPath: body.landingPath || lastPath || undefined,
      exitPath: lastPath || undefined,
      referrer: body.referrer || undefined,
      utmSource: body.utmSource || undefined,
      utmMedium: body.utmMedium || undefined,
      utmCampaign: body.utmCampaign || undefined,
      pageviewCount,
      eventCount: body.events.length,
      isBounce: pageviewCount <= 1,
      country: country || undefined,
      deviceType,
      clarityId: body.clarityId || undefined,
    })
    .onConflictDoUpdate({
      target: schema.analyticsSessions.sessionToken,
      set: {
        endedAt: new Date(),
        exitPath: lastPath ?? sql`${schema.analyticsSessions.exitPath}`,
        pageviewCount: sql`${schema.analyticsSessions.pageviewCount} + ${pageviewCount}`,
        eventCount: sql`${schema.analyticsSessions.eventCount} + ${body.events.length}`,
        // is_bounce flips false the moment we see >1 total pageview on this session
        isBounce: sql`(${schema.analyticsSessions.pageviewCount} + ${pageviewCount}) <= 1`,
        durationSec: sql`EXTRACT(EPOCH FROM (NOW() - ${schema.analyticsSessions.startedAt}))::int`,
        clarityId: body.clarityId
          ? sql`EXCLUDED.clarity_id`
          : sql`${schema.analyticsSessions.clarityId}`,
      },
    })
    .returning({ id: schema.analyticsSessions.id });

  const sessionRowId = sessionInsert[0]?.id;
  if (!sessionRowId) {
    return NextResponse.json({ error: "session upsert failed" }, { status: 500 });
  }

  // ---- Bulk-insert events -----------------------------------------------
  const eventRows = body.events
    .filter((e) => VALID_EVENT_TYPES.has(e.type))
    .map((e) => ({
      sessionId: sessionRowId,
      visitorId: visitorRowId,
      type: e.type,
      path: e.path?.slice(0, 512) ?? null,
      target: e.target?.slice(0, 200) ?? null,
      properties: e.properties ?? null,
    }));

  if (eventRows.length > 0) {
    await dbEdge.insert(schema.analyticsEvents).values(eventRows);
  }

  return NextResponse.json({ ok: true });
}

// Allow same-origin GET to expose nothing, just so misconfigured clients see
// 405 explicitly rather than a generic Next handling.
export async function GET() {
  return NextResponse.json({ error: "POST only" }, { status: 405 });
}

// HEAD probes from uptime monitors etc.
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

// Refresh one untouched session row to silence the unused-import warning at
// build time when the schema export grows.
void eq;
