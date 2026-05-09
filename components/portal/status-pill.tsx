import { STATUS_LABELS } from "@/lib/portal/constants";

export function StatusPill({ status }: { status: string }) {
  const meta = STATUS_LABELS[status] || { label: status, tone: "kickoff" as const };
  const cls =
    meta.tone === "live"
      ? "bg-[#fafaf8] text-emerald-700 border-[#e8e4dd]"
      : meta.tone === "review"
        ? "bg-[#fafaf8] text-[#1b1938] border-[#e8e4dd]"
        : meta.tone === "active"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : meta.tone === "paused"
            ? "bg-[#fafaf8] text-[#73706d] border-[#e8e4dd]"
            : "bg-[#fafaf8] text-[#292827] border-[#e8e4dd]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 border ${cls}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          meta.tone === "live"
            ? "bg-[#0e3030]"
            : meta.tone === "review"
              ? "bg-[#1b1938]"
              : meta.tone === "active"
                ? "bg-[#1b1938]"
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
