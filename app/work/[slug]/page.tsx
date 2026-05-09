import { notFound } from"next/navigation";
import Link from"next/link";
import Image from"next/image";
import type { Metadata } from"next";
import { ArrowLeft, ArrowRight, ExternalLink } from"@/components/icons";
import { eq } from"drizzle-orm";
import { db, schema } from"@/db/client";
import { SITE_URL, SOCIAL_LINKS } from"@/lib/constants";
import { MarkdownRenderer } from"@/components/blog/markdown-renderer";
import { getCaseStudyBySlug } from"@/lib/cms/queries";

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) return { title:"Case study" };
  const url = `${SITE_URL}/work/${slug}`;
  return {
    title: `${c.title} · ${c.clientName} case study`,
    description: c.summary || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${c.title} · ${c.clientName}`,
      description: c.summary || undefined,
      url,
      type:"article",
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
      card:"summary_large_image",
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

  const url = `${SITE_URL}/work/${c.slug}`;
  const articleJsonLd = {
"@context":"https://schema.org",
"@type":"Article",
    headline: c.title,
    alternativeHeadline: `${c.clientName} case study`,
    description: c.summary || undefined,
    image: c.coverImage || c.heroImage || `${SITE_URL}/api/blog-og?title=${encodeURIComponent(c.title)}`,
    datePublished: (c.publishedAt ?? c.createdAt).toISOString(),
    dateModified: c.updatedAt.toISOString(),
    inLanguage:"en-US",
    isAccessibleForFree: true,
    url,
    mainEntityOfPage: {"@type":"WebPage","@id": url },
    author: {
"@type":"Person",
      name:"Rashid Iqbal",
      url: SITE_URL,
      sameAs: [
"https://framer.link/rashidiqbal",
"https://www.upwork.com/freelancers/thatgroot",
"https://contra.com/rashidiqbal",
      ],
    },
    publisher: {
"@type":"Organization",
      name:"Rashid Iqbal · aestho.xyz",
      url: SITE_URL,
      logo: {"@type":"ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    about: tags,
    keywords: tags.join(","),
  };
  const breadcrumbJsonLd = {
"@context":"https://schema.org",
"@type":"BreadcrumbList",
    itemListElement: [
      {"@type":"ListItem", position: 1, name:"Home", item: SITE_URL },
      {"@type":"ListItem", position: 2, name:"Case studies", item: `${SITE_URL}/work` },
      {"@type":"ListItem", position: 3, name: c.title, item: url },
    ],
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#ffffff] text-[#0a0a0a] selection:bg-[#0a0a0a]/30 selection:text-black font-sans"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="max-w-3xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
          <span className="font-bold text-[#0a0a0a] tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#0a0a0a] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          All case studies
        </Link>

        <p className="text-[10px] font-mono text-[#0a0a0a] uppercase tracking-[0.22em] mb-3">
          Case study · {c.clientName}
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0a0a0a] mb-5 leading-[1.1]">
          {c.title}
        </h1>

        {c.summary && (
          <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-8 max-w-2xl">
            {c.summary}
          </p>
        )}

        {c.heroImage && (
          <div className="border border-[#e5e5e5] mb-10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.heroImage} alt="" className="w-full h-auto" />
          </div>
        )}

        {metrics.length > 0 && (
          <section className="grid sm:grid-cols-3 gap-3 mb-12">
            {metrics.map((m, i) => (
              <div key={i} className="border border-[#e5e5e5] bg-white p-5">
                <p className="text-3xl md:text-4xl font-bold text-[#0a0a0a] tracking-tight">
                  {m.value}
                </p>
                <p className="text-sm text-[#737373] mt-2 leading-relaxed">{m.label}</p>
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
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#0a0a0a] border border-[#e5e5e5] hover:border-[#8b7cf8] hover:text-[#0a0a0a] transition-colors"
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
          <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-[#e5e5e5]">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-[#fafafa] text-[10px] font-bold text-[#737373] uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-[#e5e5e5] pt-10 mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-3">
            Want a site that converts like this?
          </h2>
          <p className="text-sm text-[#737373] mb-5">
            Book a 30-minute call. I&rsquo;ll tell you honestly if I can help.
          </p>
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a] transition-colors /25"
          >
            Book a strategy call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </article>
    </main>
  );
}
