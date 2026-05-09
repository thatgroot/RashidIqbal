import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { listPublishedCaseStudies } from "@/lib/cms/queries";
import { SITE_URL } from "@/lib/constants";

// ISR: regenerate every 30 minutes; CMS edits propagate without losing static delivery.
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Case Studies · Rashid Iqbal",
  description:
    "Live SaaS sites I designed, wrote copy for, and shipped on Framer. Real outcomes, named clients, public URLs.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: "Case Studies · Rashid Iqbal",
    description: "Real outcomes, named clients, public URLs.",
    url: `${SITE_URL}/work`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Case Studies")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function WorkIndexPage() {
  const cases = await listPublishedCaseStudies();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Case studies · Rashid Iqbal",
    description:
      "Live SaaS sites I designed, wrote copy for, and shipped on Framer. Real outcomes, named clients, public URLs.",
    numberOfItems: cases.length,
    itemListElement: cases.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/work/${c.slug}`,
      name: `${c.title} · ${c.clientName}`,
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE_URL}/work` },
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
      <header className="max-w-5xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
          <span className="font-bold text-[#0a0a0a] tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <p className="text-[10px] font-mono text-[#0a0a0a] uppercase tracking-[0.22em] mb-3">
          Case studies
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0a0a0a] mb-5 leading-[1.1]">
          Proof, not pitches.
        </h1>
        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-10 max-w-2xl">
          Live SaaS sites I designed, wrote copy for, and shipped. Click a card
          for the full deep-dive: what was broken, what I changed, what
          shipped.
        </p>

        {cases.length === 0 ? (
          <div className="border border-[#e5e5e5] bg-white p-10 text-center">
            <p className="text-sm text-[#737373]">
              No published case studies yet. Add some via the dashboard CMS.
            </p>
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {cases.map((c) => {
              const tags = (c.tags ?? []) as string[];
              const metrics = (c.metrics ?? []) as { label: string; value: string }[];
              const featured = metrics[0];
              return (
                <li key={c.id}>
                  <Link
                    href={`/work/${c.slug}`}
                    className="block border border-[#e5e5e5] bg-white p-6 hover:border-[#8b7cf8] transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[10px] font-mono text-[#0a0a0a] uppercase tracking-[0.18em] mb-1">
                          {c.clientName}
                        </p>
                        <p className="text-xl font-bold text-[#0a0a0a] group-hover:text-[#0a0a0a] transition-colors leading-tight">
                          {c.title}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#737373] group-hover:text-[#0a0a0a] transition-colors shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </div>
                    {c.summary && (
                      <p className="text-sm text-[#737373] leading-relaxed mb-4 line-clamp-3">
                        {c.summary}
                      </p>
                    )}
                    {featured && (
                      <p className="text-2xl font-bold text-[#0a0a0a] mb-1">
                        {featured.value}
                        <span className="text-[10px] font-mono text-[#737373] uppercase tracking-[0.18em] ml-2">
                          {featured.label}
                        </span>
                      </p>
                    )}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-[#e5e5e5]">
                        {tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-bold text-[#737373] uppercase tracking-wider px-2 py-0.5 bg-[#fafafa]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="border-t border-[#e5e5e5] pt-10 mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-3">
            Want yours next?
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a] transition-colors shadow-lg shadow-[#0a0a0a]/25"
          >
            Start a project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
