import Link from "next/link";
import { Mail, Inbox } from "lucide-react";
import { listInbox, inboxCounts, type InboxFolder } from "@/lib/dashboard/inbox-queries";
import { InboxListRow } from "@/components/dashboard/inbox-row";

export const dynamic = "force-dynamic";

const FOLDERS: { key: InboxFolder; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "starred", label: "Starred" },
  { key: "archived", label: "Archived" },
];


export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ folder?: InboxFolder; page?: string }>;
}) {
  const sp = await searchParams;
  const folder = (sp.folder || "all") as InboxFolder;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const PAGE_SIZE = 50;

  const [inbox, counts] = await Promise.all([
    listInbox({ folder, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
    inboxCounts(),
  ]);

  const totalPages = Math.max(1, Math.ceil(inbox.total / PAGE_SIZE));

  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        Inbox
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        Form submissions
      </h1>
      <p className="text-sm text-[#73706d] mb-6">
        Every submission to /api/lead and /api/contact lands here in addition to
        your Gmail. Click a row to read the full payload.
      </p>

      {/* Folder tabs */}
      <div className="flex gap-1 mb-5 border-b border-[#e8e4dd]">
        {FOLDERS.map((f) => {
          const c =
            f.key === "unread"
              ? counts.unread
              : f.key === "starred"
                ? counts.starred
                : f.key === "archived"
                  ? counts.archived
                  : counts.all;
          const active = f.key === folder;
          return (
            <Link
              key={f.key}
              href={`/dashboard/inbox?folder=${f.key}`}
              className={`relative px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "text-[#292827] font-bold"
                  : "text-[#73706d] hover:text-[#292827]"
              }`}
            >
              {f.label}
              {c > 0 && (
                <span
                  className={`ml-2 inline-flex items-center justify-center text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded ${
                    active ? "bg-[#1b1938] text-white" : "bg-[#fafaf8] text-[#73706d]"
                  }`}
                >
                  {c}
                </span>
              )}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1b1938]"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* List */}
      <div className="border border-[#e8e4dd] bg-white">
        {inbox.rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Inbox className="w-8 h-8 text-zinc-300 mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-[#73706d]">
              {folder === "all"
                ? "No submissions yet. Forms posted to /api/lead or /api/contact will land here."
                : folder === "unread"
                  ? "Inbox zero. Nice."
                  : folder === "starred"
                    ? "No starred submissions yet."
                    : "Archive is empty."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#e8e4dd]">
            {inbox.rows.map((r) => (
              <InboxListRow
                key={r.id}
                row={{
                  ...r,
                  createdAt: r.createdAt.toISOString(),
                  readAt: r.readAt ? r.readAt.toISOString() : null,
                  archivedAt: r.archivedAt ? r.archivedAt.toISOString() : null,
                }}
              />
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-[#73706d]">
          <span>
            Page {page} of {totalPages} · {inbox.total.toLocaleString()} entries
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?folder=${folder}&page=${page - 1}`}
                className="px-3 py-1.5 border border-[#e8e4dd] hover:border-zinc-400 transition-colors"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?folder=${folder}&page=${page + 1}`}
                className="px-3 py-1.5 border border-[#e8e4dd] hover:border-zinc-400 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-[10px] text-[#9a9794] flex items-center gap-1.5">
        <Mail className="w-3 h-3" aria-hidden="true" />
        Submissions are also delivered to your Gmail inbox via Resend.
      </p>
    </div>
  );
}
