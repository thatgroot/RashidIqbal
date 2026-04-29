import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { getCaseStudyBySlug } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) return { title: "Case study" };
  const url = `${SITE_URL}/work/${slug}`;
  return {
    title: `${c.title} · ${c.clientName} case study`,
    description: c.summary || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${c.title} · ${c.clientName}`,
      description: c.summary || undefined,
      url,
      type: "article",
      images: c.coverImage
        ? [{ url: c.coverImage, width: 1200, height: 630 }]
        : [
            {
              url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(c.title)}`,
              width: 1200,
              height: 630,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} · ${c.clientName}`,
      description: c.summary || undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) notFound();

  const metrics = (c.metrics ?? []) as { label: string; value: string }[];
  const tags = (c.tags ?? []) as string[];
  void schema;
  void db;
  void eq;

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
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          All case studies
        </Link>

        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Case study · {c.clientName}
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          {c.title}
        </h1>

        {c.summary && (
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl">
            {c.summary}
          </p>
        )}

        {c.heroImage && (
          <div className="border border-zinc-200 mb-10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.heroImage} alt="" className="w-full h-auto" />
          </div>
        )}

        {metrics.length > 0 && (
          <section className="grid sm:grid-cols-3 gap-3 mb-12">
            {metrics.map((m, i) => (
              <div key={i} className="border border-zinc-200 bg-white p-5">
                <p className="text-3xl md:text-4xl font-bold text-orange-700 tracking-tight">
                  {m.value}
                </p>
                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{m.label}</p>
              </div>
            ))}
          </section>
        )}

        {c.liveUrl && (
          <div className="mb-10">
            <a
              href={c.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-zinc-700 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors"
            >
              View live site
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}

        {c.body && (
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={c.body} />
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-zinc-100">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-zinc-200 pt-10 mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Want a site that converts like this?
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            Book a 30-minute call. I&rsquo;ll tell you honestly if I can help.
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
