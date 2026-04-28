import { computeFunnel, RANGES } from "@/lib/dashboard/queries";

export const dynamic = "force-dynamic";

const FUNNELS = [
  {
    title: "Homepage → Offer → Booking",
    steps: [
      { label: "Visit homepage", match: { type: "pageview", path: "/" } },
      { label: "Visit /offer", match: { type: "pageview", path: "/offer" } },
      { label: "Submit offer form", match: { type: "form_submit" } },
    ],
  },
  {
    title: "Homepage → Pricing → Inquiry",
    steps: [
      { label: "Visit homepage", match: { type: "pageview", path: "/" } },
      { label: "Visit /#pricing", match: { type: "pageview", path: "/" } },
      { label: "Submit pricing form", match: { type: "form_submit" } },
    ],
  },
  {
    title: "Blog → Hero CTA",
    steps: [
      { label: "Visit any blog post", match: { type: "pageview" } },
      { label: "Visit homepage", match: { type: "pageview", path: "/" } },
      { label: "Click hero CTA", match: { type: "cta_click" } },
    ],
  },
  {
    title: "Visit → Email-me toast",
    steps: [
      { label: "Any pageview", match: { type: "pageview" } },
      { label: "Open email toast", match: { target: "email-toast.open" } },
      { label: "Click a launcher", match: { target: "email-toast.cta.gmail" } },
    ],
  },
] as const;

function fmtPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export default async function FunnelsPage() {
  const data = await Promise.all(
    FUNNELS.map(async (f) => ({
      ...f,
      steps: await computeFunnel(RANGES.month.sinceMs, [...f.steps]),
    }))
  );

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Funnels
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        Conversion funnels
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        Last 30 days. Each step counts unique visitors who completed all prior steps.
        Drop-off is the gap between steps.
      </p>

      <div className="space-y-8">
        {data.map((f) => {
          const top = f.steps[0]?.count || 0;
          return (
            <section key={f.title}>
              <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
                {f.title}
              </p>
              <div className="border border-zinc-200 bg-white p-5">
                {top === 0 ? (
                  <p className="text-sm text-zinc-500 py-6 text-center">
                    No visitors in this funnel yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {f.steps.map((s, i) => {
                      const drop = i > 0 ? f.steps[i - 1]!.count - s.count : 0;
                      const dropPct = i > 0 && f.steps[i - 1]!.count > 0
                        ? (drop / f.steps[i - 1]!.count) * 100
                        : 0;
                      return (
                        <div key={s.label}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-zinc-700">
                              <span className="font-mono text-[10px] text-zinc-400 mr-2">
                                {(i + 1).toString().padStart(2, "0")}
                              </span>
                              {s.label}
                            </span>
                            <span className="tabular-nums">
                              <span className="font-bold text-zinc-900">
                                {s.count.toLocaleString()}
                              </span>
                              <span className="text-zinc-400 ml-2">{fmtPct(s.pct)}</span>
                            </span>
                          </div>
                          <div className="h-2 bg-zinc-100 overflow-hidden">
                            <div
                              className="h-full bg-orange-500 transition-all"
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                          {i > 0 && drop > 0 && (
                            <p className="text-[11px] text-zinc-400 mt-1">
                              Drop: {drop.toLocaleString()} ({fmtPct(dropPct)})
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
