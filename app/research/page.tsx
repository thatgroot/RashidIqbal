import Link from"next/link";
import Image from"next/image";
import type { Metadata } from"next";
import { ArrowLeft, ArrowUpRight } from"@/components/icons";
import { listAllResearchReports } from"@/lib/cms/queries";
import { SITE_URL } from"@/lib/constants";

export const revalidate = 1800;

const PAGE_URL = `${SITE_URL}/research`;

export const metadata: Metadata = {
  title:"Research · UX, copy, and conversion benchmarks",
  description:
"Distilled findings from NN/g, Baymard, ContentSquare, Microsoft Clarity, and Google. Citations from the institutions that publish the conversion-research most quoted in 2026.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:"Research · UX, copy, and conversion benchmarks",
    description:
"Distilled findings from NN/g, Baymard, ContentSquare, Microsoft Clarity, and Google.",
    url: PAGE_URL,
    type:"website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Research · UX & conversion benchmarks")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Research · UX, copy, and conversion benchmarks",
    description:
"Distilled findings from NN/g, Baymard, ContentSquare, Microsoft Clarity, and Google.",
  },
};

export default async function ResearchIndexPage() {
  const all = await listAllResearchReports();
  const reports = all.filter((r) => !!r.publishedAt);

  const itemListJsonLd = {
"@context":"https://schema.org",
"@type":"ItemList",
    name:"Research · Aestho",
    description:
"Distilled UX and conversion research from top institutions: NN/g, Baymard, ContentSquare, Microsoft Clarity, Google.",
    numberOfItems: reports.length,
    itemListElement: reports.map((r, i) => ({
"@type":"ListItem",
      position: i + 1,
      url: `${SITE_URL}/research/${r.slug}`,
      name: r.title,
    })),
  };
  const breadcrumbJsonLd = {
"@context":"https://schema.org",
"@type":"BreadcrumbList",
    itemListElement: [
      {"@type":"ListItem", position: 1, name:"Home", item: SITE_URL },
      {"@type":"ListItem", position: 2, name:"Research", item: PAGE_URL },
    ],
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#ffffff] text-[#0a0a0a] selection:bg-[#0a0a0a]/30 selection:text-black font-sans"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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

      <section className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#0a0a0a] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back home
        </Link>

        <p className="text-[10px] font-mono text-[#0a0a0a] uppercase tracking-[0.22em] mb-3">
          Research · Aestho
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0a0a0a] mb-5 leading-[1.1]">
          UX, copy, and conversion research worth citing.
        </h1>
        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-10 max-w-2xl">
          Distilled findings from the institutions whose research most often
          decides what gets shipped on a marketing site: NN/g, Baymard,
          ContentSquare, Microsoft Clarity, and Google. Each report links back
          to the original source.
        </p>

        {reports.length === 0 ? (
          <div className="border border-[#e5e5e5] bg-white p-10 text-center">
            <p className="text-sm text-[#737373]">
              No reports published yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => {
              const findings = (r.findings ?? []) as { stat: string; context: string }[];
              return (
                <li key={r.id}>
                  <Link
                    href={`/research/${r.slug}`}
                    className="block border border-[#e5e5e5] bg-white p-6 hover:border-[#8b7cf8] transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-lg md:text-xl font-bold text-[#0a0a0a] group-hover:text-[#0a0a0a] transition-colors leading-tight">
                        {r.title}
                      </h2>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#737373] group-hover:text-[#0a0a0a] transition-colors shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </div>
                    {r.summary && (
                      <p className="text-sm text-[#737373] leading-relaxed mb-3">
                        {r.summary}
                      </p>
                    )}
                    {findings[0] && (
                      <p className="text-xs font-mono text-[#0a0a0a]">
                        {findings[0].stat} · {findings[0].context}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
