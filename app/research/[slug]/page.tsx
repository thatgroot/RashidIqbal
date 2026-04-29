import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Download, ArrowRight } from "lucide-react";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

export const dynamic = "force-dynamic";

async function getReport(slug: string) {
  const [row] = await db
    .select()
    .from(schema.cmsResearchReports)
    .where(eq(schema.cmsResearchReports.slug, slug))
    .limit(1);
  if (!row || !row.publishedAt) return null;
  return row;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = await getReport(slug);
  if (!r) return { title: "Research report" };
  const url = `${SITE_URL}/research/${slug}`;
  return {
    title: `${r.title} | Aestho Research`,
    description: r.summary || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: r.title,
      description: r.summary || undefined,
      url,
      type: "article",
      images: r.coverImage
        ? [{ url: r.coverImage, width: 1200, height: 630 }]
        : [
            {
              url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(r.title)}`,
              width: 1200,
              height: 630,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.summary || undefined,
    },
  };
}

export default async function ResearchReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getReport(slug);
  if (!r) notFound();

  const findings = (r.findings ?? []) as { stat: string; context: string }[];

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans"
    >
      <header className="max-w-3xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back home
        </Link>

        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Research report · Aestho
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          {r.title}
        </h1>

        {r.summary && (
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl">
            {r.summary}
          </p>
        )}

        {findings.length > 0 && (
          <section className="grid sm:grid-cols-2 gap-3 mb-12">
            {findings.map((f, i) => (
              <div key={i} className="border border-zinc-200 bg-white p-5">
                <p className="text-3xl md:text-4xl font-bold text-orange-700 tracking-tight">
                  {f.stat}
                </p>
                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{f.context}</p>
              </div>
            ))}
          </section>
        )}

        {r.pdfUrl && (
          <div className="mb-10">
            <a
              href={r.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-600 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download full PDF
            </a>
          </div>
        )}

        {r.body && (
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={r.body} />
          </div>
        )}

        <div className="border-t border-zinc-200 pt-10 mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Want a teardown of your site like this?
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            Book a 30-minute call. I&rsquo;ll walk through where your page is
            leaking visitors using the same lens.
          </p>
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a strategy call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </article>
    </main>
  );
}
