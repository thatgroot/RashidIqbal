import { ArrowRight, Check } from"lucide-react";
import { Star } from"@/components/icons";
import { SOCIAL_LINKS } from"@/lib/constants";
import { ClosingBand } from"@/components/landing/closing-band";
import { Navbar } from"@/components/layout/navbar";

// Shared layout for every /framer-expert-for-<industry> page. Pages pass a
// config; the component renders the same hero / deliverables / clients /
// process / FAQ shape with industry-specific copy. Adding a new industry
// is now ~50 lines instead of 294.

export type IndustryConfig = {
  industryLabel: string; //"SaaS","Fintech","AI Startups"
  pagePath: string;
  pageUrl: string;
  eyebrow: string; //"Certified Framer Expert · Top Rated on Upwork"
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
"@context":"https://schema.org",
"@type":"FAQPage",
    mainEntity: config.faqs.map((f) => ({
"@type":"Question",
      name: f.q,
      acceptedAnswer: {"@type":"Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
"@context":"https://schema.org",
"@type":"Service",
    name: `Framer Expert for ${config.industryLabel}`,
    provider: {"@type":"Person", name:"Rashid Iqbal" },
    url: config.pageUrl,
    description: config.intro,
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#d4a017]/30 selection:text-black font-sans relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Navbar />

      <section className="relative max-w-container mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 codex-section-glow pointer-events-none"
        />

        <div className="relative">

          <article className="max-w-3xl mx-auto">
            <p className="text-[0.625rem] text-[#737373] uppercase tracking-[0.2em] mb-4">
              {config.eyebrow}
            </p>

            <h1
              className="text-[clamp(2.5rem,6vw,4.75rem)] tracking-[-0.024em] leading-[1.02] text-black mb-6"
              style={{ fontVariationSettings: '"wght" 700' }}
            >
              {config.h1}
            </h1>

            <p className="text-[1.0625rem] leading-[1.6] text-[#737373] mb-10">
              {config.intro}
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <a
                href={SOCIAL_LINKS.calcom}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-primary group"
              >
                Book a strategy call
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://framer.link/rashidiqbal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-ghost"
              >
                Hire on Framer
              </a>
            </div>

            {config.clients.length > 0 && (
              <div className="mb-14">
                <p className="text-[0.625rem] text-[#737373] uppercase tracking-[0.2em] mb-3">
                  {config.industryLabel} clients shipped
                </p>
                <div
                  className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#0a0a0a]"
                  style={{ fontVariationSettings: '"wght" 600' }}
                >
                  {config.clients.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-white border border-[#e5e5e5] p-6 md:p-8 mb-14">
              <h2
                className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.014em] leading-[1.04] text-black mb-6"
                style={{ fontVariationSettings: '"wght" 600' }}
              >
                What you get
              </h2>
              <ul className="space-y-3">
                {config.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-[#0a0a0a]"
                  >
                    <Check
                      className="w-4 h-4 text-[#0a0a0a] shrink-0 mt-1.5"
                      aria-hidden="true"
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-14">
              <h2
                className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.014em] leading-[1.04] text-black mb-6"
                style={{ fontVariationSettings: '"wght" 600' }}
              >
                Two-week delivery, day by day
              </h2>
              <ol className="space-y-5">
                {config.processSteps.map((s) => (
                  <li key={s.title} className="flex items-start gap-3 pl-0">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block w-2 h-2 rounded-full bg-[#0a0a0a] shrink-0"
                    />
                    <div>
                      <p
                        className="text-[1.0625rem] text-[#0a0a0a]"
                        style={{ fontVariationSettings: '"wght" 600' }}
                      >
                        {s.title}
                      </p>
                      <p className="text-[1.0625rem] leading-[1.6] text-[#737373] mt-1">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {config.testimonial && (
              <figure className="rounded-2xl bg-white border border-[#e5e5e5] px-6 md:px-8 py-8 mb-14">
                <div
                  className="flex gap-1 mb-4"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill="#0a0a0a"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote
                  className="text-[1.0625rem] md:text-lg text-[#0a0a0a] leading-[1.6] mb-4"
                  style={{ fontVariationSettings: '"wght" 500' }}
                >
                  {config.testimonial.text}
                </blockquote>
                <figcaption className="text-sm">
                  <span
                    className="text-[#0a0a0a]"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    {config.testimonial.author}
                  </span>{""}
                  <span className="text-[#737373]">
                    · {config.testimonial.title}
                  </span>
                </figcaption>
              </figure>
            )}

            <div className="mb-4">
              <h2
                className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.014em] leading-[1.04] text-black mb-6"
                style={{ fontVariationSettings: '"wght" 600' }}
              >
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {config.faqs.map((f) => (
                  <div key={f.q}>
                    <p
                      className="text-[1.0625rem] text-[#0a0a0a] mb-2"
                      style={{ fontVariationSettings: '"wght" 600' }}
                    >
                      {f.q}
                    </p>
                    <p className="text-[1.0625rem] leading-[1.6] text-[#737373]">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Closing teal band, Superhuman-system rule: every marketing
          page resolves on the deep-teal CTA band. */}
      <ClosingBand
        headline="Ready to ship?"
        sub="One call decides if we're a fit. No pitch, no upsell."
        ctaLabel="Book a strategy call"
        ctaHref={SOCIAL_LINKS.calcom}
      />
    </main>
  );
}
