import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

// Generic CMS list view. Pages pass a row → display-line mapping; the
// component handles header, "New" button, empty state, and row click-
// through.

export type ListRow = {
  id: string;
  primary: string;
  secondary?: string | undefined;
  meta?: string | undefined;
  isPublished?: boolean | undefined;
};

export function CmsList({
  collection,
  collectionLabel,
  rows,
  description,
}: {
  collection: string;
  collectionLabel: string;
  rows: ListRow[];
  description?: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-2">
        <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em]">
          CMS · {collectionLabel}
        </p>
      </div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-1">
            {collectionLabel}
          </h1>
          {description && <p className="text-sm text-[#73706d]">{description}</p>}
        </div>
        <Link
          href={`/dashboard/cms/${collection}/new`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          New
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="border border-[#e8e4dd] bg-white p-10 text-center">
          <p className="text-sm text-[#73706d]">
            No entries yet. Click <strong>New</strong> to add the first one.
          </p>
        </div>
      ) : (
        <ul className="border border-[#e8e4dd] bg-white divide-y divide-[#e8e4dd]">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={`/dashboard/cms/${collection}/${r.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafaf8]/60 transition-colors"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    r.isPublished ? "bg-[#0e3030]" : "bg-zinc-300"
                  }`}
                  aria-hidden="true"
                  title={r.isPublished ? "Published" : "Draft"}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#292827] truncate">{r.primary}</p>
                  {r.secondary && (
                    <p className="text-[12px] text-[#9a9794] truncate">{r.secondary}</p>
                  )}
                </div>
                {r.meta && (
                  <span className="text-[11px] font-mono text-[#9a9794] shrink-0">
                    {r.meta}
                  </span>
                )}
                <ArrowRight className="w-4 h-4 text-zinc-300 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
