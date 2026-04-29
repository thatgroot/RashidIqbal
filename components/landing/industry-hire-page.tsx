import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Star } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

// Shared layout for every /framer-expert-for-<industry> page. Pages pass a
// config; the component renders the same hero / deliverables / clients /
// process / FAQ shape with industry-specific copy. Adding a new industry
// is now ~50 lines instead of 294.

export type IndustryConfig = {
  industryLabel: string; // "SaaS", "Fintech", "AI Startups"
  pagePath: string;
  pageUrl: string;
  eyebrow: string; // "Certified Framer Expert · Top Rated on Upwork"
  h1: string;
  intro: string;
  clients: readonly string[];
  deliverables: readonly string[];
  processSteps: readonly { title: string; body: string }[];
  testimonial?: { text: string; author: string; title: string };
  faqs: readonly { q: string; a: string }[];
};

export function IndustryHirePage({ config }: { config: IndustryConfig }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Framer Expert for ${config.industryLabel}`,
    provider: { "@type": "Person", name: "Rashid Iqbal" },
    url: config.pageUrl,
    description: config.intro,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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

      <section className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em] mb-4">
          {config.eyebrow}
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          {config.h1}
        </h1>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
          {config.intro}
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a strategy call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="https://framer.link/rashidiqbal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-300 text-zinc-900 text-sm font-bold hover:bg-zinc-50 transition-colors"
          >
            Hire on Framer
          </a>
        </div>

        {config.clients.length > 0 && (
          <div className="mb-12">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3">
              {config.industryLabel} clients shipped
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-zinc-700">
              {config.clients.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        )}

        <div className="border border-zinc-200 bg-white p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">What you get</h2>
          <ul className="space-y-3">
            {config.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-zinc-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Two-week delivery, day by day
          </h2>
          <ol className="space-y-4">
            {config.processSteps.map((s) => (
              <li key={s.title} className="border-l-2 border-orange-500 pl-4">
                <p className="text-sm font-bold text-zinc-900">{s.title}</p>
                <p className="text-sm text-zinc-600 mt-1">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {config.testimonial && (
          <figure className="border border-zinc-100 bg-white px-6 py-8 mb-12">
            <div className="flex gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-orange-500 text-orange-500"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-base md:text-lg text-zinc-900 leading-relaxed font-medium mb-4">
              {config.testimonial.text}
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-bold text-zinc-900">{config.testimonial.author}</span>{" "}
              <span className="text-zinc-500">· {config.testimonial.title}</span>
            </figcaption>
          </figure>
        )}

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
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
        </div>

        <div className="border-t border-zinc-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Ready to ship?</h2>
          <p className="text-sm text-zinc-600 mb-5">
            One call decides if we are a fit. No pitch, no upsell.
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
      </section>
    </main>
  );
}
