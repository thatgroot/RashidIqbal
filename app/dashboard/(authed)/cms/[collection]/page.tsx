import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { COLLECTIONS, type CollectionKey } from "@/lib/cms/registry";
import { COLLECTION_META } from "@/lib/cms/collection-meta";
import { CmsList } from "@/components/dashboard/cms-list";

export const dynamic = "force-dynamic";

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const def = COLLECTIONS[collection as CollectionKey];
  const meta = COLLECTION_META[collection];
  if (!def || !meta) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = def.table as any;
  const rows = (await db.select().from(t)) as Record<string, unknown>[];

  // Stable sort: sortOrder asc → publishedAt desc → createdAt desc
  rows.sort((a, b) => {
    const sa = typeof a.sortOrder === "number" ? a.sortOrder : 0;
    const sb = typeof b.sortOrder === "number" ? b.sortOrder : 0;
    if (sa !== sb) return sa - sb;
    const pa = a.publishedAt instanceof Date ? a.publishedAt.getTime() : 0;
    const pb = b.publishedAt instanceof Date ? b.publishedAt.getTime() : 0;
    if (pa !== pb) return pb - pa;
    const ca = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
    const cb = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
    return cb - ca;
  });

  return (
    <CmsList
      collection={collection}
      collectionLabel={meta.label}
      description={meta.description}
      rows={rows.map((r) => {
        const view = meta.toListRow(r as never);
        return { id: String(r.id), ...view };
      })}
    />
  );
}
