import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { listPublishedCaseStudies } from "@/lib/cms/queries";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

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

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans"
    >
      <header className="max-w-5xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
          Case studies
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          Proof, not pitches.
        </h1>
        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-10 max-w-2xl">
          Live SaaS sites I designed, wrote copy for, and shipped. Click a card
          for the full deep-dive: what was broken, what I changed, what
          shipped.
        </p>

        {cases.length === 0 ? (
          <div className="border border-zinc-200 bg-white p-10 text-center">
            <p className="text-sm text-zinc-500">
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
                    className="block border border-zinc-200 bg-white p-6 hover:border-orange-300 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.18em] mb-1">
                          {c.clientName}
                        </p>
                        <p className="text-xl font-bold text-zinc-900 group-hover:text-orange-700 transition-colors leading-tight">
                          {c.title}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </div>
                    {c.summary && (
                      <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-3">
                        {c.summary}
                      </p>
                    )}
                    {featured && (
                      <p className="text-2xl font-bold text-orange-700 mb-1">
                        {featured.value}
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em] ml-2">
                          {featured.label}
                        </span>
                      </p>
                    )}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-zinc-100">
                        {tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 py-0.5 bg-zinc-50"
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

        <div className="border-t border-zinc-200 pt-10 mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Want yours next?
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Start a project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
