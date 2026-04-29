import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, X, Minus } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

// Shared layout for /framer-vs-* and /hire-*-vs-* pages. GEO-optimal
// pattern: question H1, direct answer in the first paragraph,
// comparison table, FAQ, CTA. Each page passes a config — adding a new
// comparison takes ~30 lines.

export type ComparisonRow = {
  feature: string;
  // 'yes' | 'no' | 'partial' | string custom note
  left: "yes" | "no" | "partial" | string;
  right: "yes" | "no" | "partial" | string;
};

export type ComparisonConfig = {
  pagePath: string;
  pageUrl: string;
  eyebrow: string;
  h1: string; // "Framer vs Webflow for SaaS landing pages"
  // Direct-answer first sentence — the GEO-optimal hook for AI search
  directAnswer: string;
  intro: string;
  leftLabel: string; // "Framer"
  rightLabel: string; // "Webflow"
  rows: readonly ComparisonRow[];
  whoShould: { name: string; bullets: readonly string[] }[]; // 1 or 2 audiences
  faqs: readonly { q: string; a: string }[];
};

function Cell({ value }: { value: ComparisonRow["left"] }) {
  if (value === "yes") return <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />;
  if (value === "no") return <X className="w-4 h-4 text-zinc-400" aria-hidden="true" />;
  if (value === "partial")
    return <Minus className="w-4 h-4 text-amber-500" aria-hidden="true" />;
  return <span className="text-xs text-zinc-700">{value}</span>;
}

export function ComparisonPage({ config }: { config: ComparisonConfig }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/40" />
      </div>

      <header className="max-w-3xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <article className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em] mb-4">
          {config.eyebrow}
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          {config.h1}
        </h1>

        {/* Direct answer up top — GEO-optimal so AI search engines lift
            it as the citation paragraph. */}
        <p className="text-base md:text-lg text-zinc-900 font-medium leading-relaxed mb-4 border-l-2 border-orange-500 pl-4">
          {config.directAnswer}
        </p>

        <p className="text-base text-zinc-600 leading-relaxed mb-10">
          {config.intro}
        </p>

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">
            Side-by-side comparison
          </h2>
          <div className="border border-zinc-200 bg-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Feature
                  </th>
                  <th className="text-center px-4 py-2.5 font-bold text-zinc-900">
                    {config.leftLabel}
                  </th>
                  <th className="text-center px-4 py-2.5 font-bold text-zinc-900">
                    {config.rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {config.rows.map((r) => (
                  <tr key={r.feature}>
                    <td className="px-4 py-2.5 text-zinc-700">{r.feature}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center justify-center">
                        <Cell value={r.left} />
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center justify-center">
                        <Cell value={r.right} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Who should use which */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">
            Who should pick which
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {config.whoShould.map((w) => (
              <div key={w.name} className="border border-zinc-200 bg-white p-5">
                <p className="text-sm font-bold text-zinc-900 mb-3">{w.name}</p>
                <ul className="space-y-2">
                  {w.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <Check
                        className="w-4 h-4 text-orange-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {config.faqs.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-bold text-zinc-900 mb-1.5">{f.q}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="border-t border-zinc-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Want a senior pair of eyes on the decision?
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            30-minute call. Tell me your situation and I will tell you honestly
            which way to go — even if it is not me.
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
