import { db, schema } from "@/db/client";
import { sql, gte, count, eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getKpis(sinceMs: number) {
  const since = new Date(Date.now() - sinceMs);

  const [visitorsRow] = await db
    .select({ n: sql<number>`count(distinct ${schema.analyticsSessions.visitorId})` })
    .from(schema.analyticsSessions)
    .where(gte(schema.analyticsSessions.startedAt, since));

  const [sessionsRow] = await db
    .select({ n: count() })
    .from(schema.analyticsSessions)
    .where(gte(schema.analyticsSessions.startedAt, since));

  const [pageviewsRow] = await db
    .select({ n: count() })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, since),
        eq(schema.analyticsEvents.type, "pageview")
      )
    );

  const [bounceRow] = await db
    .select({ n: count() })
    .from(schema.analyticsSessions)
    .where(
      and(
        gte(schema.analyticsSessions.startedAt, since),
        eq(schema.analyticsSessions.isBounce, true)
      )
    );

  const sessions = Number(sessionsRow?.n ?? 0);
  const visitors = Number(visitorsRow?.n ?? 0);
  const pageviews = Number(pageviewsRow?.n ?? 0);
  const bounces = Number(bounceRow?.n ?? 0);
  const bounceRate = sessions > 0 ? (bounces / sessions) * 100 : 0;

  return { visitors, sessions, pageviews, bounceRate };
}

const RANGES = [
  { label: "Today", ms: 24 * 60 * 60 * 1000 },
  { label: "7 days", ms: 7 * 24 * 60 * 60 * 1000 },
  { label: "30 days", ms: 30 * 24 * 60 * 60 * 1000 },
] as const;

export default async function OverviewPage() {
  const ranges = await Promise.all(RANGES.map((r) => getKpis(r.ms)));

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Overview
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-8">
        Visitor activity
      </h1>

      <div className="space-y-8">
        {RANGES.map((range, i) => {
          const k = ranges[i]!;
          const cards = [
            { label: "Visitors", value: k.visitors.toLocaleString() },
            { label: "Sessions", value: k.sessions.toLocaleString() },
            { label: "Pageviews", value: k.pageviews.toLocaleString() },
            { label: "Bounce rate", value: `${k.bounceRate.toFixed(1)}%` },
          ];
          return (
            <section key={range.label}>
              <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
                {range.label}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {cards.map((c) => (
                  <div key={c.label} className="border border-zinc-200 bg-white p-5">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] mb-2">
                      {c.label}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 border border-zinc-200 bg-zinc-50/40 p-6">
        <p className="text-sm font-bold text-zinc-900 mb-1">Phase 1 is live.</p>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Auth is wired and the schema is in Neon. Numbers above will stay at zero
          until Phase 2 (the tracker + /api/track) ships. Visitor explorer, page
          analytics, funnels, and realtime are stubbed in the sidebar — those land
          in Phase 3.
        </p>
      </div>
    </div>
  );
}
