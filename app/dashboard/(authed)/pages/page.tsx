import { db, schema } from "@/db/client";
import { and, desc, eq, gte, count, isNotNull, sql } from "drizzle-orm";
import { RANGES, getTopPages } from "@/lib/dashboard/queries";

export const dynamic = "force-dynamic";

async function getScrollDepthByPage(sinceMs: number) {
  const since = new Date(Date.now() - sinceMs);
  const rows = await db
    .select({
      path: schema.analyticsEvents.path,
      max25: sql<number>`sum(case when (properties->>'pct')::int >= 25 then 1 else 0 end)`,
      max50: sql<number>`sum(case when (properties->>'pct')::int >= 50 then 1 else 0 end)`,
      max75: sql<number>`sum(case when (properties->>'pct')::int >= 75 then 1 else 0 end)`,
      max100: sql<number>`sum(case when (properties->>'pct')::int >= 100 then 1 else 0 end)`,
      total: count(),
    })
    .from(schema.analyticsEvents)
    .where(
      and(
        gte(schema.analyticsEvents.createdAt, since),
        eq(schema.analyticsEvents.type, "scroll"),
        isNotNull(schema.analyticsEvents.path)
      )
    )
    .groupBy(schema.analyticsEvents.path)
    .orderBy(desc(count()))
    .limit(15);
  return rows;
}

async function getTopExitPaths(sinceMs: number) {
  const since = new Date(Date.now() - sinceMs);
  const rows = await db
    .select({
      path: schema.analyticsSessions.exitPath,
      n: count(),
    })
    .from(schema.analyticsSessions)
    .where(
      and(
        gte(schema.analyticsSessions.startedAt, since),
        isNotNull(schema.analyticsSessions.exitPath)
      )
    )
    .groupBy(schema.analyticsSessions.exitPath)
    .orderBy(desc(count()))
    .limit(10);
  return rows.filter((r) => r.path).map((r) => ({ path: r.path!, n: Number(r.n) }));
}

function fmt(n: number): string {
  return n.toLocaleString();
}

function fmtPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export default async function PagesAnalyticsPage() {
  const [topPages, scrollDepth, exitPaths] = await Promise.all([
    getTopPages(RANGES.month.sinceMs, 25),
    getScrollDepthByPage(RANGES.month.sinceMs),
    getTopExitPaths(RANGES.month.sinceMs),
  ]);

  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Pages
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        Top pages and sections
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        Last 30 days. Bounce rate is per landing page (sessions that landed on the
        path and never went anywhere else).
      </p>

      {/* Top pages */}
      <section className="mb-10">
        <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
          Most visited
        </p>
        <div className="border border-[#e8e4dd] bg-white">
          {topPages.length === 0 ? (
            <p className="text-sm text-[#73706d] px-6 py-12 text-center">No pageviews yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#fafaf8] text-[10px] font-mono uppercase tracking-[0.18em] text-[#73706d]">
                <tr>
                  <th className="text-left px-4 py-2.5 font-normal">Path</th>
                  <th className="text-right px-4 py-2.5 font-normal">Views</th>
                  <th className="text-right px-4 py-2.5 font-normal">Sessions</th>
                  <th className="text-right px-4 py-2.5 font-normal">Bounce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4dd]">
                {topPages.map((p) => (
                  <tr key={p.path} className="hover:bg-[#fafaf8]/60 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-[#292827] truncate max-w-[360px]">
                      {p.path}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-bold">
                      {fmt(p.views)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-[#73706d]">
                      {fmt(p.uniqueSessions)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-[#73706d]">
                      {fmtPct(p.bounceRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Scroll depth */}
      <section className="mb-10">
        <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
          Scroll depth distribution
        </p>
        <p className="text-xs text-[#73706d] mb-3">
          Share of pageviews that scrolled past each milestone. Lower 100% number = visitors
          stop reading before the bottom.
        </p>
        <div className="border border-[#e8e4dd] bg-white">
          {scrollDepth.length === 0 ? (
            <p className="text-sm text-[#73706d] px-6 py-12 text-center">
              No scroll events yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#fafaf8] text-[10px] font-mono uppercase tracking-[0.18em] text-[#73706d]">
                <tr>
                  <th className="text-left px-4 py-2.5 font-normal">Path</th>
                  <th className="text-right px-4 py-2.5 font-normal">25%</th>
                  <th className="text-right px-4 py-2.5 font-normal">50%</th>
                  <th className="text-right px-4 py-2.5 font-normal">75%</th>
                  <th className="text-right px-4 py-2.5 font-normal">100%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4dd]">
                {scrollDepth.map((r) => {
                  const tot = Number(r.total) || 1;
                  return (
                    <tr key={r.path!} className="hover:bg-[#fafaf8]/60 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-[#292827] truncate max-w-[360px]">
                        {r.path}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {fmtPct((Number(r.max25) / tot) * 100)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {fmtPct((Number(r.max50) / tot) * 100)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {fmtPct((Number(r.max75) / tot) * 100)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {fmtPct((Number(r.max100) / tot) * 100)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Top exit pages */}
      <section>
        <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
          Top exit pages
        </p>
        <p className="text-xs text-[#73706d] mb-3">
          The last page each session was on before leaving. High exits on a deep page = good.
          High exits on /pricing or /offer = something is leaking.
        </p>
        <div className="border border-[#e8e4dd] bg-white">
          {exitPaths.length === 0 ? (
            <p className="text-sm text-[#73706d] px-6 py-12 text-center">No exit data yet.</p>
          ) : (
            <ul className="divide-y divide-[#e8e4dd]">
              {exitPaths.map((p, i) => (
                <li key={p.path} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="text-[10px] font-mono text-[#9a9794] w-5">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-mono text-sm truncate">{p.path}</span>
                  <span className="text-sm font-bold tabular-nums">{fmt(p.n)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
