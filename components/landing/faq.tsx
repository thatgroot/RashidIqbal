"use client";

import { Plus, Minus } from"@/components/icons";
import { useState } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { FAQStructuredData } from"@/components/seo/faq-structured-data";

// Superhuman + cap.so FAQ. Two-column layout: editorial opener on the
// left (sticky on desktop), accordion on the right. Smooth height-grow
// animation on open."Still have questions?" sticky email row pinned to
// the bottom of the left column.

const DEFAULT_FAQS = [
  {
    q:"Will this actually move my conversion rate?",
    a:"Across recent SaaS projects the average lift is 2.4x in 60 days. UpdateAI's onboarding signups went up 50% after relaunch. Vanos AI's weekly active developers doubled in 30 days. SpaceDome's homepage signups went up 3x in 6 weeks. We won't promise your specific number — every market is different — but on the kickoff call we'll walk you through the conversion principle behind each lift so you know what's changing and why."
  },
  {
    q:"What if the design isn't right?",
    a:"You get unlimited revisions on the Figma design before we touch Framer. If the direction is still wrong after the first review, we refund your deposit. That has happened exactly once in years of projects."
  },
  {
    q:"What happens after we go live? Will I need you for every change?",
    a:"You walk away with a 15-minute Loom showing how to update copy, swap images, and add blog posts yourself. If you'd rather not touch it, monthly retainers cover edits, A/B tests, and new pages. Most clients pick the retainer for the first 3 months, then go DIY."
  },
  {
    q:"Who owns the design and code? Can I move it later?",
    a:"You do, from day one. The Figma file transfers to your team, the Framer project transfers to your Framer account, and any Chrome extension or custom code ships to your GitHub. No licensing fee, no 'works only while you're on retainer' clause. If you fire us tomorrow, you keep everything."
  },
  {
    q:"Can you work with my existing brand, Figma, or in-house team?",
    a:"Yes. We work inside your designer's Figma file when there is one, follow your brand guide, and pair with your developer on backend or API integration. Stack-wise we ship fastest in Framer but also work in Webflow and hand-coded Next.js when the project needs it. Tell us what you have and we'll be honest about fit."
  }
];

type FaqItem = { q: string; a: string };

export function FAQ({ items }: { items?: FaqItem[] }) {
  const faqs = items && items.length > 0 ? items : DEFAULT_FAQS;
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set([0]) // first one open by default — cap.so pattern
  );

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <>
      <FAQStructuredData
        faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <section className="bg-white scroll-mt-16" id="faq">
        <div className="max-w-container mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin:"-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
            >
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-[#737373] mb-4"
                style={{ fontVariationSettings: '"wght" 540' }}
              >
                05 · Honest answers
              </p>
              <h2
                className="text-[clamp(36px,5vw,60px)] tracking-[-0.024em] leading-[0.96] text-[#0a0a0a]"
                style={{ fontVariationSettings: '"wght" 460' }}
              >
                What founders ask
                <br className="hidden md:inline" />
                <span className="text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 540' }}>
                  {""}before hiring.
                </span>
              </h2>
              <p
                className="mt-6 text-[16px] md:text-[17px] text-[#737373] leading-[1.6] max-w-md"
                style={{ fontVariationSettings: '"wght" 460' }}
              >
                Straight answers. No marketing fluff. Pricing and timelines
                live in the section above.
              </p>

              {/* Sticky email row — retention pattern. */}
              <div className="mt-10 p-5 rounded-lg border border-[#e5e5e5] bg-[#fafafa]">
                <p
                  className="text-[13px] text-[#0a0a0a] leading-[1.5]"
                  style={{ fontVariationSettings: '"wght" 600' }}
                >
                  Still have questions?
                </p>
                <p
                  className="text-[13px] text-[#737373] mt-1 leading-[1.5]"
                  style={{ fontVariationSettings: '"wght" 460' }}
                >
                  Email us — replies in under 24h.
                </p>
                <a
                  href="mailto:rashidiqbal.freelance@gmail.com"
                  className="group mt-4 inline-flex items-center gap-2 text-[13px] text-[#0a0a0a]"
                  style={{ fontVariationSettings: '"wght" 600' }}
                >
                  rashidiqbal.freelance@gmail.com
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.div>

            <div className="lg:col-span-7 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
              {faqs.map((faq, i) => {
                const isOpen = openSet.has(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin:"-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.05, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-6 py-7 md:py-8 text-left hover:bg-[#fafafa] transition-colors px-2 -mx-2 rounded-md"
                    >
                      <h3
                        className="text-[18px] md:text-[21px] text-[#0a0a0a] leading-[1.3] tracking-[-0.012em] pr-2"
                        style={{ fontVariationSettings: isOpen ? '"wght" 600' : '"wght" 540' }}
                      >
                        {faq.q}
                      </h3>
                      <span
                        className={`shrink-0 mt-1 flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                          isOpen
                            ?"bg-[#0a0a0a] text-white rotate-180"
                            :"bg-[#fafafa] border border-[#e5e5e5] text-[#737373]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height:"auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-2 pb-7 md:pb-8 text-[15px] md:text-[16px] text-[#737373] leading-[1.65] max-w-2xl"
                            style={{ fontVariationSettings: '"wght" 460' }}
                          >
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
