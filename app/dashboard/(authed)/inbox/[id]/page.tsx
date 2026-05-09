import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { getInboxItem, markRead } from "@/lib/dashboard/inbox-queries";
import { InboxToolbar } from "@/components/dashboard/inbox-toolbar";

export const dynamic = "force-dynamic";

const SOURCE_LABELS: Record<string, string> = {
  "offer-paid": "Offer · Booking",
  "offer-lp": "Free Audit",
  "exit-intent": "Exit-Intent Audit",
  "service-builder": "Project Inquiry",
  pricing: "Pricing Inquiry",
  contact: "Contact",
};

export default async function InboxDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getInboxItem(id);
  if (!row) notFound();

  // Mark as read on view (idempotent — won't overwrite a previously-read at).
  if (!row.readAt) {
    markRead(id, true).catch(() => {});
  }

  const body = (row.body as Record<string, unknown> | null) || {};

  // Coerce unknown JSON-blob values to a usable string (or null when absent),
  // so JSX conditionals stay typed.
  const s = (v: unknown): string | null => {
    if (v == null) return null;
    if (typeof v === "string") return v.trim() || null;
    return String(v);
  };

  const plan = s(body["plan"]);
  const mode = s(body["mode"]);
  const budget = s(body["budget"]);
  const timeline = s(body["timeline"]);
  const services = s(body["services"]);
  const stack = s(body["stack"]);
  const pageCount = s(body["pageCount"]);
  const location = s(body["location"]);
  const description = s(body["description"]) || s(body["concern"]);

  return (
    <div>
      <Link
        href="/dashboard/inbox"
        className="inline-flex items-center gap-1.5 text-xs text-[#73706d] hover:text-[#292827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        Back to inbox
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0">
          <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-2">
            {SOURCE_LABELS[row.source] || row.source}
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-[#292827] leading-tight mb-1 break-words">
            {row.subject}
          </h1>
          <p className="text-sm text-[#73706d]">
            {row.name ? (
              <>
                <span className="text-[#292827] font-semibold">{row.name}</span>{" "}
                <span className="text-[#9a9794]">·</span>{" "}
              </>
            ) : null}
            <a
              href={`mailto:${row.email}`}
              className="text-[#292827] hover:text-[#1b1938] transition-colors"
            >
              {row.email}
            </a>
            <span className="text-[#9a9794] ml-2">
              · {new Date(row.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/dashboard/projects/new?from=${row.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors"
            title="Convert this submission into a portal project"
          >
            <FolderPlus className="w-3.5 h-3.5" aria-hidden="true" />
            Convert to project
          </Link>
          <InboxToolbar
            id={row.id}
            starred={row.starred}
            archived={!!row.archivedAt}
            email={row.email}
          />
        </div>
      </div>

      {/* Quick fields summary */}
      <div className="border border-[#e8e4dd] bg-white p-5 mb-5 grid sm:grid-cols-2 gap-4">
        <Field label="Email" value={row.email} mono />
        <Field label="Source" value={row.source} mono />
        {row.name && <Field label="Name" value={row.name} />}
        {row.website && <Field label="Website" value={row.website} link />}
        {plan && <Field label="Plan" value={plan} />}
        {mode && <Field label="Mode" value={mode} />}
        {budget && <Field label="Budget" value={budget} />}
        {timeline && <Field label="Timeline" value={timeline} />}
        {services && <Field label="Services" value={services} />}
        {stack && <Field label="Stack" value={stack} />}
        {pageCount && <Field label="Pages" value={pageCount} />}
        {location && <Field label="Location" value={location} />}
      </div>

      {/* Description / concern body */}
      {description && (
        <section className="mb-5">
          <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-2">
            Message
          </p>
          <div className="border border-[#e8e4dd] bg-white p-5">
            <p className="text-sm text-[#292827] whitespace-pre-wrap leading-relaxed">
              {description}
            </p>
          </div>
        </section>
      )}

      {/* Raw payload (collapsible) */}
      <details className="border border-[#e8e4dd] bg-white p-4 mb-5">
        <summary className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] cursor-pointer">
          Raw payload
        </summary>
        <pre className="mt-3 text-[11px] font-mono text-[#292827] overflow-auto whitespace-pre-wrap break-all">
          {JSON.stringify(row, null, 2)}
        </pre>
      </details>

      {/* Network / traceability footer */}
      <div className="text-[11px] text-[#9a9794] font-mono space-y-0.5">
        {row.ip && <p>IP · {row.ip}</p>}
        {row.userAgent && <p>UA · {row.userAgent}</p>}
        {row.visitorCookie && (
          <p>
            Visitor ·{" "}
            <Link
              href={`/dashboard/visitors?cookie=${row.visitorCookie}`}
              className="hover:text-[#1b1938]"
            >
              {row.visitorCookie.slice(0, 16)}…
            </Link>
          </p>
        )}
        {row.internalEmailId && <p>Resend internal · {row.internalEmailId}</p>}
        {row.clientAckEmailId && <p>Resend client ack · {row.clientAckEmailId}</p>}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  link,
}: {
  label: string;
  value: string;
  mono?: boolean;
  link?: boolean;
}) {
  const content = link ? (
    <a
      href={value.startsWith("http") ? value : `https://${value}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#1b1938] hover:underline"
    >
      {value}
    </a>
  ) : (
    value
  );
  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] mb-1">
        {label}
      </p>
      <p
        className={`text-sm text-[#292827] break-all ${mono ? "font-mono" : ""}`}
      >
        {content}
      </p>
    </div>
  );
}
