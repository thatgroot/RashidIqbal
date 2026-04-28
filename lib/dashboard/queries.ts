import { db, schema } from "@/db/client";
import { and, count, desc, eq, gte, inArray, isNotNull, sql } from "drizzle-orm";

// All read paths for the admin dashboard. Each helper accepts a `sinceMs`
// window so callers can render today / 7d / 30d the same way.

export type Range = { sinceMs: number; label: string };

export const RANGES: Record<"today" | "week" | "month", Range> = {
  today: { sinceMs: 24 * 60 * 60 * 1000, label: "24h" },
  week: { sinceMs: 7 * 24 * 60 * 60 * 1000, label: "7d" },
  month: { sinceMs: 30 * 24 * 60 * 60 * 1000, label: "30d" },
};

export type Kpis = {
  visitors: number;
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgDurationSec: number;
};

export async function getKpis(sinceMs: number): Promise<Kpis> {
  const since = new Date(Date.now() - sinceMs);

  const [row] = await db
    .select({
      visitors: sql<number>`count(distinct ${schema.analyticsSessions.visitorId})`,
      sessions: count(),
      bounces: sql<number>`sum(case when ${schema.analyticsSessions.isBounce} then 1 else 0 end)`,
      avgDurationSec: sql<number>`coalesce(avg(${schema.analyticsSessions.durationSec}), 0)`,
    })
    .from(schema.analyticsSessions)
    .where(gte(schema.analyticsSessions.startedAt, since));

  const [pv] = await db
    .select({ n: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, since),
        eq(schema.analyticsEvents.type, "pageview")
      )
    );

  const visitors = Number(row?.visitors ?? 0);
  const sessions = Number(row?.sessions ?? 0);
  const bounces = Number(row?.bounces ?? 0);
  const pageviews = Number(pv?.n ?? 0);
  const bounceRate = sessions > 0 ? (bounces / sessions) * 100 : 0;
  const avgDurationSec = Math.round(Number(row?.avgDurationSec ?? 0));

  return { visitors, sessions, pageviews, bounceRate, avgDurationSec };
}

export type DailyPoint = { day: string; sessions: number; pageviews: number };

export async function getDailySeries(sinceMs: number): Promise<DailyPoint[]> {
  const since = new Date(Date.now() - sinceMs);

  const rows = await db
    .select({
      day: sql<string>`to_char(date_trunc('day', ${schema.analyticsSessions.startedAt}), 'YYYY-MM-DD')`,
      sessions: count(),
      pageviews: sql<number>`coalesce(sum(${schema.analyticsSessions.pageviewCount}), 0)`,
    })
    .from(schema.analyticsSessions)
    .where(gte(schema.analyticsSessions.startedAt, since))
    .groupBy(sql`date_trunc('day', ${schema.analyticsSessions.startedAt})`)
    .orderBy(sql`date_trunc('day', ${schema.analyticsSessions.startedAt}) ASC`);

  return rows.map((r) => ({
    day: r.day,
    sessions: Number(r.sessions),
    pageviews: Number(r.pageviews),
  }));
}

export type TopPage = {
  path: string;
  views: number;
  uniqueSessions: number;
  bounceRate: number;
};

export async function getTopPages(sinceMs: number, limit = 15): Promise<TopPage[]> {
  const since = new Date(Date.now() - sinceMs);

  const rows = await db
    .select({
      path: schema.analyticsEvents.path,
      views: count(),
      uniqueSessions: sql<number>`count(distinct ${schema.analyticsEvents.sessionId})`,
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, since),
        eq(schema.analyticsEvents.type, "pageview"),
        isNotNull(schema.analyticsEvents.path)
      )
    )
    .groupBy(schema.analyticsEvents.path)
    .orderBy(desc(count()))
    .limit(limit);

  // For each top path, compute bounce rate on landing sessions.
  const out: TopPage[] = [];
  for (const r of rows) {
    if (!r.path) continue;
    const [b] = await db
      .select({
        landings: count(),
        bounces: sql<number>`sum(case when ${schema.analyticsSessions.isBounce} then 1 else 0 end)`,
      })
      .from(schema.analyticsSessions)
      .where(
        and(
          gte(schema.analyticsSessions.startedAt, since),
          eq(schema.analyticsSessions.landingPath, r.path)
        )
      );
    const landings = Number(b?.landings ?? 0);
    const bounces = Number(b?.bounces ?? 0);
    out.push({
      path: r.path,
      views: Number(r.views),
      uniqueSessions: Number(r.uniqueSessions),
      bounceRate: landings > 0 ? (bounces / landings) * 100 : 0,
    });
  }
  return out;
}

export type TopTarget = { target: string; clicks: number };

export async function getTopTargets(sinceMs: number, limit = 15): Promise<TopTarget[]> {
  const since = new Date(Date.now() - sinceMs);

  const rows = await db
    .select({
      target: schema.analyticsEvents.target,
      n: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, since),
        sql`${schema.analyticsEvents.type} in ('click', 'cta_click', 'form_submit')`,
        isNotNull(schema.analyticsEvents.target)
      )
    )
    .groupBy(schema.analyticsEvents.target)
    .orderBy(desc(count()))
    .limit(limit);

  return rows
    .filter((r) => r.target)
    .map((r) => ({ target: r.target!, clicks: Number(r.n) }));
}

export type CountryRow = { country: string; sessions: number };

export async function getTopCountries(sinceMs: number, limit = 12): Promise<CountryRow[]> {
  const since = new Date(Date.now() - sinceMs);

  const rows = await db
    .select({
      country: schema.analyticsSessions.country,
      n: count(),
    })
    .from(schema.analyticsSessions)
    .where(
      and(
        gte(schema.analyticsSessions.startedAt, since),
        isNotNull(schema.analyticsSessions.country)
      )
    )
    .groupBy(schema.analyticsSessions.country)
    .orderBy(desc(count()))
    .limit(limit);

  return rows
    .filter((r) => r.country)
    .map((r) => ({ country: r.country!, sessions: Number(r.n) }));
}

export type ReferrerRow = { referrer: string; sessions: number; isAi: boolean };

const AI_REFERRERS = [
  "chat.openai.com",
  "chatgpt.com",
  "perplexity.ai",
  "claude.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
];

export async function getTopReferrers(
  sinceMs: number,
  limit = 12
): Promise<ReferrerRow[]> {
  const since = new Date(Date.now() - sinceMs);

  const rows = await db
    .select({
      referrer: schema.analyticsSessions.referrer,
      n: count(),
    })
    .from(schema.analyticsSessions)
    .where(
      and(
        gte(schema.analyticsSessions.startedAt, since),
        isNotNull(schema.analyticsSessions.referrer)
      )
    )
    .groupBy(schema.analyticsSessions.referrer)
    .orderBy(desc(count()))
    .limit(limit);

  return rows
    .filter((r) => r.referrer)
    .map((r) => {
      const ref = r.referrer!;
      const isAi = AI_REFERRERS.some((a) => ref.toLowerCase().includes(a));
      return { referrer: ref, sessions: Number(r.n), isAi };
    });
}

export type DeviceRow = { device: string; sessions: number };

export async function getDeviceMix(sinceMs: number): Promise<DeviceRow[]> {
  const since = new Date(Date.now() - sinceMs);
  const rows = await db
    .select({
      device: schema.analyticsSessions.deviceType,
      n: count(),
    })
    .from(schema.analyticsSessions)
    .where(gte(schema.analyticsSessions.startedAt, since))
    .groupBy(schema.analyticsSessions.deviceType)
    .orderBy(desc(count()));
  return rows.map((r) => ({ device: r.device || "unknown", sessions: Number(r.n) }));
}

// ---- Visitor explorer ------------------------------------------------------

export type VisitorListItem = {
  id: string;
  visitorId: string;
  country: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  firstSeenAt: Date;
  lastSeenAt: Date;
  totalSessions: number;
  totalEvents: number;
};

export async function listVisitors(opts: {
  limit?: number;
  offset?: number;
  country?: string | undefined;
  device?: string | undefined;
  search?: string | undefined;
}): Promise<{ rows: VisitorListItem[]; total: number }> {
  const limit = Math.min(200, opts.limit ?? 50);
  const offset = Math.max(0, opts.offset ?? 0);

  const conditions = [] as ReturnType<typeof eq>[];
  if (opts.country) conditions.push(eq(schema.analyticsVisitors.country, opts.country));
  if (opts.device) conditions.push(eq(schema.analyticsVisitors.deviceType, opts.device));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ total } = { total: 0 }] = await db
    .select({ total: count() })
    .from(schema.analyticsVisitors)
    .where(where);

  const rows = await db
    .select({
      id: schema.analyticsVisitors.id,
      visitorId: schema.analyticsVisitors.visitorId,
      country: schema.analyticsVisitors.country,
      city: schema.analyticsVisitors.city,
      deviceType: schema.analyticsVisitors.deviceType,
      browser: schema.analyticsVisitors.browser,
      firstSeenAt: schema.analyticsVisitors.firstSeenAt,
      lastSeenAt: schema.analyticsVisitors.lastSeenAt,
    })
    .from(schema.analyticsVisitors)
    .where(where)
    .orderBy(desc(schema.analyticsVisitors.lastSeenAt))
    .limit(limit)
    .offset(offset);

  // Side query: counts per visitor in this page slice.
  const ids = rows.map((r) => r.id);
  const counts = ids.length
    ? await db
        .select({
          visitorId: schema.analyticsSessions.visitorId,
          totalSessions: count(),
          totalEvents: sql<number>`coalesce(sum(${schema.analyticsSessions.eventCount}), 0)`,
        })
        .from(schema.analyticsSessions)
        .where(inArray(schema.analyticsSessions.visitorId, ids))
        .groupBy(schema.analyticsSessions.visitorId)
    : [];
  const byId = new Map(counts.map((c) => [c.visitorId, c]));

  return {
    rows: rows.map((r) => {
      const c = byId.get(r.id);
      return {
        ...r,
        totalSessions: Number(c?.totalSessions ?? 0),
        totalEvents: Number(c?.totalEvents ?? 0),
      };
    }),
    total: Number(total),
  };
}

export type VisitorDetail = {
  visitor: typeof schema.analyticsVisitors.$inferSelect;
  sessions: (typeof schema.analyticsSessions.$inferSelect & {
    events: (typeof schema.analyticsEvents.$inferSelect)[];
  })[];
};

export async function getVisitorDetail(visitorRowId: string): Promise<VisitorDetail | null> {
  const [visitor] = await db
    .select()
    .from(schema.analyticsVisitors)
    .where(eq(schema.analyticsVisitors.id, visitorRowId))
    .limit(1);
  if (!visitor) return null;

  const sessions = await db
    .select()
    .from(schema.analyticsSessions)
    .where(eq(schema.analyticsSessions.visitorId, visitorRowId))
    .orderBy(desc(schema.analyticsSessions.startedAt))
    .limit(20);

  const sessionIds = sessions.map((s) => s.id);
  const events = sessionIds.length
    ? await db
        .select()
        .from(schema.analyticsEvents)
        .where(inArray(schema.analyticsEvents.sessionId, sessionIds))
        .orderBy(desc(schema.analyticsEvents.createdAt))
        .limit(500)
    : [];

  const eventsBySession = new Map<string, (typeof schema.analyticsEvents.$inferSelect)[]>();
  for (const e of events) {
    const list = eventsBySession.get(e.sessionId) ?? [];
    list.push(e);
    eventsBySession.set(e.sessionId, list);
  }

  return {
    visitor,
    sessions: sessions.map((s) => ({ ...s, events: eventsBySession.get(s.id) ?? [] })),
  };
}

// ---- Realtime --------------------------------------------------------------

export type RealtimeEvent = {
  id: number;
  type: string;
  path: string | null;
  target: string | null;
  createdAt: Date;
  country: string | null;
  city: string | null;
  deviceType: string | null;
};

export async function getRealtime(limit = 80): Promise<RealtimeEvent[]> {
  const since = new Date(Date.now() - 5 * 60 * 1000);
  const rows = await db
    .select({
      id: schema.analyticsEvents.id,
      type: schema.analyticsEvents.type,
      path: schema.analyticsEvents.path,
      target: schema.analyticsEvents.target,
      createdAt: schema.analyticsEvents.createdAt,
      country: schema.analyticsSessions.country,
      city: schema.analyticsVisitors.city,
      deviceType: schema.analyticsSessions.deviceType,
    })
    .from(schema.analyticsEvents)
    .innerJoin(
      schema.analyticsSessions,
      eq(schema.analyticsEvents.sessionId, schema.analyticsSessions.id)
    )
    .innerJoin(
      schema.analyticsVisitors,
      eq(schema.analyticsEvents.visitorId, schema.analyticsVisitors.id)
    )
    .where(gte(schema.analyticsEvents.createdAt, since))
    .orderBy(desc(schema.analyticsEvents.createdAt))
    .limit(limit);

  return rows;
}

// ---- Funnels ---------------------------------------------------------------

export type FunnelStep = { label: string; count: number; pct: number };

export async function computeFunnel(
  sinceMs: number,
  steps: { label: string; match: { type?: string; path?: string; target?: string } }[]
): Promise<FunnelStep[]> {
  const since = new Date(Date.now() - sinceMs);
  let cohortVisitors: string[] | null = null;
  const out: FunnelStep[] = [];

  for (const step of steps) {
    const conds = [gte(schema.analyticsEvents.createdAt, since)];
    if (step.match.type) conds.push(eq(schema.analyticsEvents.type, step.match.type));
    if (step.match.path) conds.push(eq(schema.analyticsEvents.path, step.match.path));
    if (step.match.target) conds.push(eq(schema.analyticsEvents.target, step.match.target));
    if (cohortVisitors !== null) {
      if (cohortVisitors.length === 0) {
        out.push({ label: step.label, count: 0, pct: 0 });
        continue;
      }
      conds.push(inArray(schema.analyticsEvents.visitorId, cohortVisitors));
    }
    const rows = await db
      .selectDistinct({ visitorId: schema.analyticsEvents.visitorId })
      .from(schema.analyticsEvents)
      .where(and(...conds));
    cohortVisitors = rows.map((r) => r.visitorId);
    out.push({ label: step.label, count: cohortVisitors.length, pct: 0 });
  }

  // Compute percentages relative to step 0
  const top = out[0]?.count || 0;
  for (const s of out) s.pct = top > 0 ? (s.count / top) * 100 : 0;
  return out;
}
