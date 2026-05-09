import Link from "next/link";
import { notFound } from "next/navigation";
import { getVisitorDetail } from "@/lib/dashboard/queries";
import { ArrowLeft, ExternalLink, MousePointerClick, Eye, FileText, ArrowDownToLine } from "lucide-react";

export const dynamic = "force-dynamic";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "wh9vau008x";

function eventIcon(type: string) {
  if (type === "pageview") return <Eye className="w-3.5 h-3.5 text-[#73706d]" aria-hidden="true" />;
  if (type === "scroll")
    return <ArrowDownToLine className="w-3.5 h-3.5 text-[#73706d]" aria-hidden="true" />;
  if (type === "form_submit")
    return <FileText className="w-3.5 h-3.5 text-[#0e3030]" aria-hidden="true" />;
  return <MousePointerClick className="w-3.5 h-3.5 text-[#1b1938]" aria-hidden="true" />;
}

function timeShort(d: Date): string {
  return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default async function VisitorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getVisitorDetail(id);
  if (!detail) notFound();

  const { visitor, sessions } = detail;

  return (
    <div>
      <Link
        href="/dashboard/visitors"
        className="inline-flex items-center gap-1.5 text-xs text-[#73706d] hover:text-[#292827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        Back to visitors
      </Link>

      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Visitor
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2 font-mono">
        {visitor.visitorId.slice(0, 16)}…
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        First seen {new Date(visitor.firstSeenAt).toLocaleString()} · Last seen{" "}
        {new Date(visitor.lastSeenAt).toLocaleString()}
      </p>

      {/* Identity / location card */}
      <div className="grid md:grid-cols-3 gap-3 mb-10">
        <Card label="Location">
          {[visitor.city, visitor.region, visitor.country].filter(Boolean).join(", ") || "—"}
          {visitor.timezone && (
            <p className="text-[11px] text-[#9a9794] mt-1">{visitor.timezone}</p>
          )}
        </Card>
        <Card label="Device">
          <p className="capitalize">{visitor.deviceType || "unknown"}</p>
          <p className="text-[11px] text-[#9a9794] mt-1">
            {[visitor.browser, visitor.os].filter(Boolean).join(" · ") || "—"}
          </p>
        </Card>
        <Card label="First touch">
          <p className="truncate">{visitor.referrerFirst || "Direct"}</p>
          {visitor.utmSource && (
            <p className="text-[11px] text-[#9a9794] mt-1">
              {[visitor.utmSource, visitor.utmMedium, visitor.utmCampaign]
                .filter(Boolean)
                .join(" / ")}
            </p>
          )}
        </Card>
      </div>

      {/* Sessions */}
      <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
        Sessions ({sessions.length})
      </p>
      <div className="space-y-4 mb-10">
        {sessions.length === 0 ? (
          <p className="text-sm text-[#73706d]">No sessions yet.</p>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="border border-[#e8e4dd] bg-white">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e4dd]">
                <div>
                  <p className="text-sm font-bold text-[#292827]">
                    {new Date(s.startedAt).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-[#73706d]">
                    {s.pageviewCount} pageviews · {s.eventCount} events ·{" "}
                    {s.isBounce ? "bounced" : "engaged"} ·{" "}
                    {s.durationSec ? `${Math.round(s.durationSec / 60)}m` : "—"}
                  </p>
                </div>
                {s.clarityId && (
                  <a
                    href={`https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/sessions?id=${encodeURIComponent(s.clarityId)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
                  >
                    Open in Clarity
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>

              {/* Timeline */}
              <ol className="divide-y divide-[#e8e4dd]">
                {s.events.length === 0 ? (
                  <li className="px-5 py-3 text-sm text-[#73706d]">No events captured.</li>
                ) : (
                  s.events
                    .slice()
                    .reverse()
                    .map((e) => (
                      <li key={e.id} className="px-5 py-2 flex items-start gap-3">
                        <span className="mt-1 shrink-0">{eventIcon(e.type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#292827]">
                            <span className="font-mono text-[11px] text-[#9a9794] mr-2">
                              {e.type}
                            </span>
                            {e.target ? (
                              <span className="font-mono">{e.target}</span>
                            ) : e.path ? (
                              <span className="font-mono">{e.path}</span>
                            ) : (
                              <span className="text-[#9a9794]">—</span>
                            )}
                          </p>
                          {e.path && e.target && (
                            <p className="text-[11px] text-[#9a9794] truncate font-mono">
                              {e.path}
                            </p>
                          )}
                        </div>
                        <span className="text-[11px] text-[#9a9794] font-mono shrink-0">
                          {timeShort(e.createdAt)}
                        </span>
                      </li>
                    ))
                )}
              </ol>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#e8e4dd] bg-white p-4">
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] mb-2">
        {label}
      </p>
      <div className="text-sm text-[#292827]">{children}</div>
    </div>
  );
}
