import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { COLLECTIONS, type CollectionKey } from "@/lib/cms/registry";
import { COLLECTION_META } from "@/lib/cms/collection-meta";
import { CmsEditor } from "@/components/dashboard/cms-editor";

export const dynamic = "force-dynamic";

// Coerce Date instances to ISO strings so the data crosses the server →
// client boundary cleanly (the editor is a client component).
function serialize(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = v instanceof Date ? v.toISOString() : v;
  }
  return out;
}

export default async function EditCollectionRowPage({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) {
  const { collection, id } = await params;
  const def = COLLECTIONS[collection as CollectionKey];
  const meta = COLLECTION_META[collection];
  if (!def || !meta) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = def.table as any;
  const [row] = await db.select().from(t).where(eq(t.id, id)).limit(1);
  if (!row) notFound();

  const initial = serialize(row as Record<string, unknown>);
  const isPublished = !!(row as { publishedAt?: Date | null }).publishedAt;

  return (
    <div>
      <Link
        href={`/dashboard/cms/${collection}`}
        className="inline-flex items-center gap-1.5 text-xs text-[#73706d] hover:text-[#292827] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        All {meta.label.toLowerCase()}
      </Link>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-1">
        {meta.toEditTitle(row as never)}
      </h1>
      <p className="text-sm text-[#73706d] mb-6">
        {isPublished ? "Published · live on the site." : "Draft."}
      </p>
      <CmsEditor
        collection={collection}
        rowId={String(id)}
        initial={initial}
        fields={meta.fields}
        collectionLabel={meta.singular}
      />
    </div>
  );
}
