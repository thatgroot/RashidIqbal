"use client";

import { useEffect, useState } from "react";
import { Eye, MousePointerClick, ArrowDownToLine, FileText, Smartphone, Monitor, Tablet, Bot } from "lucide-react";

type RealtimeRow = {
  id: number;
  type: string;
  path: string | null;
  target: string | null;
  createdAt: string;
  country: string | null;
  city: string | null;
  deviceType: string | null;
};

const POLL_MS = 10_000;

function eventIcon(type: string) {
  if (type === "pageview") return <Eye className="w-3.5 h-3.5 text-[#73706d]" aria-hidden="true" />;
  if (type === "scroll")
    return <ArrowDownToLine className="w-3.5 h-3.5 text-[#73706d]" aria-hidden="true" />;
  if (type === "form_submit")
    return <FileText className="w-3.5 h-3.5 text-[#0e3030]" aria-hidden="true" />;
  return <MousePointerClick className="w-3.5 h-3.5 text-[#1b1938]" aria-hidden="true" />;
}

function deviceIcon(d: string | null) {
  if (d === "mobile") return <Smartphone className="w-3 h-3" aria-hidden="true" />;
  if (d === "tablet") return <Tablet className="w-3 h-3" aria-hidden="true" />;
  if (d === "bot") return <Bot className="w-3 h-3" aria-hidden="true" />;
  return <Monitor className="w-3 h-3" aria-hidden="true" />;
}

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  return `${m}m ago`;
}

export function RealtimeClient({ initial }: { initial: RealtimeRow[] }) {
  const [rows, setRows] = useState<RealtimeRow[]>(initial);
  const [tick, setTick] = useState(0); // forces timeAgo to recompute

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/dashboard/realtime", { cache: "no-store" });
        if (!res.ok) return;
        const body = (await res.json()) as { rows: RealtimeRow[] };
        if (!cancelled) setRows(body.rows);
      } catch {
        /* swallow */
      }
    }

    const id = window.setInterval(poll, POLL_MS);
    const tickId = window.setInterval(() => setTick((x) => x + 1), 5_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      window.clearInterval(tickId);
    };
  }, []);

  return (
    <div className="border border-[#e8e4dd] bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8e4dd] bg-[#fafaf8]">
        <span className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em]">
          {rows.length} events · last 5 min
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#0e3030] uppercase tracking-[0.18em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9b4fa] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0e3030]"></span>
          </span>
          Live
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-[#73706d] px-6 py-12 text-center">
          Quiet right now. Events from the last 5 minutes will land here.
        </p>
      ) : (
        <ol className="divide-y divide-[#e8e4dd]" key={tick}>
          {rows.map((r) => (
            <li key={r.id} className="flex items-start gap-3 px-4 py-2.5">
              <span className="mt-1 shrink-0">{eventIcon(r.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#292827]">
                  <span className="font-mono text-[11px] text-[#9a9794] mr-2">{r.type}</span>
                  {r.target ? (
                    <span className="font-mono">{r.target}</span>
                  ) : r.path ? (
                    <span className="font-mono">{r.path}</span>
                  ) : (
                    <span className="text-[#9a9794]">—</span>
                  )}
                </p>
                <p className="text-[11px] text-[#9a9794] flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    {deviceIcon(r.deviceType)}
                    {r.deviceType || "—"}
                  </span>
                  <span>·</span>
                  <span>{[r.city, r.country].filter(Boolean).join(", ") || "—"}</span>
                  {r.path && r.target && <span className="font-mono truncate">{r.path}</span>}
                </p>
              </div>
              <span className="text-[11px] text-[#9a9794] font-mono shrink-0">
                {timeAgo(r.createdAt)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
