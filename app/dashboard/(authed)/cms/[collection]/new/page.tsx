import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CmsEditor } from "@/components/dashboard/cms-editor";
import { COLLECTION_META } from "@/lib/cms/collection-meta";

export default async function NewCollectionRowPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const meta = COLLECTION_META[collection];
  if (!meta) notFound();

  return (
    <div>
      <Link
        href={`/dashboard/cms/${collection}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        All {meta.label.toLowerCase()}
      </Link>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
        New {meta.singular.toLowerCase()}
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        Save first to get a draft. Use Publish when ready.
      </p>
      <CmsEditor
        collection={collection}
        rowId={null}
        initial={meta.initial}
        fields={meta.fields}
        collectionLabel={meta.singular}
      />
    </div>
  );
}
