import { STATUS_LABELS } from "@/lib/portal/constants";

export function StatusPill({ status }: { status: string }) {
  const meta = STATUS_LABELS[status] || { label: status, tone: "kickoff" as const };
  const cls =
    meta.tone === "live"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : meta.tone === "review"
        ? "bg-orange-50 text-orange-700 border-orange-200"
        : meta.tone === "active"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : meta.tone === "paused"
            ? "bg-zinc-100 text-zinc-600 border-zinc-200"
            : "bg-zinc-50 text-zinc-700 border-zinc-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 border ${cls}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          meta.tone === "live"
            ? "bg-emerald-500"
            : meta.tone === "review"
              ? "bg-orange-500"
              : meta.tone === "active"
                ? "bg-blue-500"
                : meta.tone === "paused"
                  ? "bg-zinc-400"
                  : "bg-zinc-500"
        }`}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}
