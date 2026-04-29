import Link from "next/link";
import { Star, Archive, Mail, Inbox } from "lucide-react";
import { listInbox, inboxCounts, type InboxFolder } from "@/lib/dashboard/inbox-queries";

export const dynamic = "force-dynamic";

const FOLDERS: { key: InboxFolder; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "starred", label: "Starred" },
  { key: "archived", label: "Archived" },
];

const SOURCE_LABELS: Record<string, string> = {
  "offer-paid": "Offer · Booking",
  "offer-lp": "Free Audit",
  "exit-intent": "Exit-Intent Audit",
  "service-builder": "Project Inquiry",
  pricing: "Pricing Inquiry",
  contact: "Contact",
};

function timeAgo(d: Date): string {
  const ms = Date.now() - new Date(d).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d`;
  return new Date(d).toLocaleDateString();
}

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
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em] mb-2">
        Inbox
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
        Form submissions
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        Every submission to /api/lead and /api/contact lands here in addition to
        your Gmail. Click a row to read the full payload.
      </p>

      {/* Folder tabs */}
      <div className="flex gap-1 mb-5 border-b border-zinc-200">
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
                  ? "text-zinc-900 font-bold"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {f.label}
              {c > 0 && (
                <span
                  className={`ml-2 inline-flex items-center justify-center text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded ${
                    active ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {c}
                </span>
              )}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* List */}
      <div className="border border-zinc-200 bg-white">
        {inbox.rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Inbox className="w-8 h-8 text-zinc-300 mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-zinc-500">
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
          <ul className="divide-y divide-zinc-100">
            {inbox.rows.map((r) => {
              const unread = !r.readAt && !r.archivedAt;
              return (
                <li key={r.id}>
                  <Link
                    href={`/dashboard/inbox/${r.id}`}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-zinc-50/60 transition-colors ${
                      unread ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        unread ? "bg-orange-500" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    {r.starred ? (
                      <Star
                        className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    )}
                    <div className="w-44 shrink-0 flex flex-col">
                      <span
                        className={`text-sm truncate ${
                          unread ? "font-bold text-zinc-900" : "text-zinc-700"
                        }`}
                      >
                        {r.name || r.email.split("@")[0]}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 truncate">
                        {SOURCE_LABELS[r.source] || r.source}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm truncate ${
                          unread ? "text-zinc-900 font-medium" : "text-zinc-600"
                        }`}
                      >
                        {r.subject}
                      </p>
                      {r.preview && (
                        <p className="text-[12px] text-zinc-400 truncate">{r.preview}</p>
                      )}
                    </div>
                    {r.archivedAt && (
                      <Archive className="w-3.5 h-3.5 text-zinc-300 shrink-0" aria-hidden="true" />
                    )}
                    <span className="text-[11px] text-zinc-400 font-mono tabular-nums shrink-0 w-12 text-right">
                      {timeAgo(r.createdAt)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-zinc-500">
          <span>
            Page {page} of {totalPages} · {inbox.total.toLocaleString()} entries
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?folder=${folder}&page=${page - 1}`}
                className="px-3 py-1.5 border border-zinc-200 hover:border-zinc-400 transition-colors"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?folder=${folder}&page=${page + 1}`}
                className="px-3 py-1.5 border border-zinc-200 hover:border-zinc-400 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-[10px] text-zinc-400 flex items-center gap-1.5">
        <Mail className="w-3 h-3" aria-hidden="true" />
        Submissions are also delivered to your Gmail inbox via Resend.
      </p>
    </div>
  );
}
