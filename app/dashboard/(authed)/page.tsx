import {
  RANGES,
  getKpis,
  getDailySeries,
  getTopPages,
  getTopTargets,
  getTopCountries,
  getTopReferrers,
  getDeviceMix,
} from "@/lib/dashboard/queries";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

function fmt(n: number): string {
  return n.toLocaleString();
}

function fmtDuration(sec: number): string {
  if (!sec || sec < 1) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

function fmtPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export default async function OverviewPage() {
  const [
    kpiToday,
    kpiWeek,
    kpiMonth,
    series,
    topPages,
    topTargets,
    topCountries,
    topReferrers,
    deviceMix,
  ] = await Promise.all([
    getKpis(RANGES.today.sinceMs),
    getKpis(RANGES.week.sinceMs),
    getKpis(RANGES.month.sinceMs),
    getDailySeries(RANGES.month.sinceMs),
    getTopPages(RANGES.week.sinceMs, 10),
    getTopTargets(RANGES.week.sinceMs, 10),
    getTopCountries(RANGES.week.sinceMs, 10),
    getTopReferrers(RANGES.week.sinceMs, 10),
    getDeviceMix(RANGES.week.sinceMs),
  ]);

  const ranges = [
    { label: "Today", k: kpiToday },
    { label: "7 days", k: kpiWeek },
    { label: "30 days", k: kpiMonth },
  ];

  const totalDevice = deviceMix.reduce((a, b) => a + b.sessions, 0) || 1;

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Overview
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-8">
        Visitor activity
      </h1>

      {/* KPI bands */}
      <div className="space-y-6 mb-10">
        {ranges.map(({ label, k }) => {
          const cards = [
            { label: "Visitors", value: fmt(k.visitors) },
            { label: "Sessions", value: fmt(k.sessions) },
            { label: "Pageviews", value: fmt(k.pageviews) },
            { label: "Bounce rate", value: fmtPct(k.bounceRate) },
            { label: "Avg duration", value: fmtDuration(k.avgDurationSec) },
          ];
          return (
            <section key={label}>
              <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
                {label}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {cards.map((c) => (
                  <div key={c.label} className="border border-zinc-200 bg-white p-4">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em] mb-2">
                      {c.label}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Trend chart */}
      <section className="mb-10">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Last 30 days
        </p>
        <div className="border border-zinc-200 bg-white p-5">
          <TrendChart data={series} />
        </div>
      </section>

      {/* 2-col tables */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <RankTable
          title="Top pages"
          subtitle="7 days"
          rows={topPages.map((p) => ({
            primary: p.path,
            secondary: `${fmt(p.views)} views · ${fmtPct(p.bounceRate)} bounce`,
            value: p.uniqueSessions,
          }))}
        />
        <RankTable
          title="Top buttons & links"
          subtitle="7 days · click + cta_click + form_submit"
          rows={topTargets.map((t) => ({
            primary: t.target,
            secondary: "",
            value: t.clicks,
          }))}
        />
        <RankTable
          title="Top countries"
          subtitle="7 days"
          rows={topCountries.map((c) => ({
            primary: countryName(c.country),
            secondary: c.country,
            value: c.sessions,
          }))}
        />
        <RankTable
          title="Top referrers"
          subtitle="7 days · AI sources highlighted"
          rows={topReferrers.map((r) => ({
            primary: cleanReferrer(r.referrer),
            secondary: r.isAi ? "AI search" : "",
            value: r.sessions,
            accent: r.isAi,
          }))}
          icon={<Sparkles className="w-3 h-3 text-orange-500" aria-hidden="true" />}
        />
      </div>

      {/* Device mix */}
      <section>
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Device mix · 7 days
        </p>
        <div className="border border-zinc-200 bg-white p-5">
          {deviceMix.length === 0 ? (
            <p className="text-sm text-zinc-500">No sessions yet.</p>
          ) : (
            <div className="space-y-2">
              {deviceMix.map((d) => {
                const pct = (d.sessions / totalDevice) * 100;
                return (
                  <div key={d.device} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-zinc-700 w-20 capitalize">
                      {d.device}
                    </span>
                    <div className="flex-1 h-2 bg-zinc-100 overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 w-20 text-right tabular-nums">
                      {fmt(d.sessions)} · {fmtPct(pct)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function RankTable({
  title,
  subtitle,
  rows,
  icon,
}: {
  title: string;
  subtitle: string;
  rows: { primary: string; secondary: string; value: number; accent?: boolean }[];
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em]">
          {title}
        </p>
        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em]">
          {subtitle}
        </p>
      </div>
      <div className="border border-zinc-200 bg-white">
        {rows.length === 0 ? (
          <p className="text-sm text-zinc-500 px-4 py-8 text-center">No data yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {rows.map((r, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 ${
                  r.accent ? "bg-orange-50/40" : ""
                }`}
              >
                <span className="text-[10px] font-mono text-zinc-400 w-5">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-900 truncate flex items-center gap-1.5">
                    {r.accent && icon}
                    {r.primary}
                  </p>
                  {r.secondary && (
                    <p className="text-[11px] text-zinc-400 truncate">{r.secondary}</p>
                  )}
                </div>
                <span className="text-sm font-bold text-zinc-900 tabular-nums">
                  {r.value.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function countryName(iso2: string): string {
  // Lightweight ISO-2 → name. Falls back to the code itself.
  try {
    const d = new Intl.DisplayNames(["en"], { type: "region" });
    return d.of(iso2) || iso2;
  } catch {
    return iso2;
  }
}

function cleanReferrer(ref: string): string {
  try {
    const u = new URL(ref);
    return u.hostname.replace(/^www\./, "") + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return ref;
  }
}
