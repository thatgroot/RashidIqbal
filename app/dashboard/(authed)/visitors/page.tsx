import Link from "next/link";
import { listVisitors } from "@/lib/dashboard/queries";
import { ArrowRight, Smartphone, Monitor, Tablet, Bot } from "lucide-react";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

function deviceIcon(d: string | null) {
  if (d === "mobile") return <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />;
  if (d === "tablet") return <Tablet className="w-3.5 h-3.5" aria-hidden="true" />;
  if (d === "bot") return <Bot className="w-3.5 h-3.5" aria-hidden="true" />;
  return <Monitor className="w-3.5 h-3.5" aria-hidden="true" />;
}

function timeAgo(d: Date): string {
  const ms = Date.now() - new Date(d).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; country?: string; device?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const { rows, total } = await listVisitors({
    limit: PAGE_SIZE,
    offset,
    country: sp.country,
    device: sp.device,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Visitors
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        Visitor explorer
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        {total.toLocaleString()} total visitors. Click any row for the full timeline,
        device, geo, and a deep-link into Microsoft Clarity for the session replay.
      </p>

      <div className="border border-zinc-200 bg-white">
        {rows.length === 0 ? (
          <p className="text-sm text-zinc-500 px-6 py-12 text-center">
            No visitors yet. Visits will land here as soon as the tracker fires on
            production.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="text-left px-4 py-2.5 font-normal">Last seen</th>
                <th className="text-left px-4 py-2.5 font-normal">Location</th>
                <th className="text-left px-4 py-2.5 font-normal">Device</th>
                <th className="text-left px-4 py-2.5 font-normal">Browser</th>
                <th className="text-right px-4 py-2.5 font-normal">Sessions</th>
                <th className="text-right px-4 py-2.5 font-normal">Events</th>
                <th className="px-2 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="px-4 py-2.5">
                    <p className="text-zinc-900 font-medium">{timeAgo(r.lastSeenAt)}</p>
                    <p className="text-[11px] text-zinc-400">
                      {new Date(r.lastSeenAt).toLocaleString()}
                    </p>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    {[r.city, r.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-zinc-600 capitalize">
                      {deviceIcon(r.deviceType)}
                      {r.deviceType || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600 truncate max-w-[140px]">
                    {r.browser || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900 font-semibold">
                    {r.totalSessions}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                    {r.totalEvents}
                  </td>
                  <td className="px-2 py-2.5">
                    <Link
                      href={`/dashboard/visitors/${r.id}`}
                      className="inline-flex items-center justify-center w-8 h-8 hover:bg-zinc-100 rounded transition-colors"
                      aria-label="View detail"
                    >
                      <ArrowRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-zinc-500">
          <span>
            Page {page} of {totalPages} · {total.toLocaleString()} visitors
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="px-3 py-1.5 border border-zinc-200 hover:border-zinc-400 transition-colors"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}`}
                className="px-3 py-1.5 border border-zinc-200 hover:border-zinc-400 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
