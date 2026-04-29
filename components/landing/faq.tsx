"use client";

import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQStructuredData } from "@/components/seo/faq-structured-data";

// Default fallback set. Used whenever the CMS has no published FAQs.
const DEFAULT_FAQS = [
  {
    q: "Will this actually move my conversion rate?",
    a: "Across recent SaaS projects the average lift is 2.4x in 60 days. UpdateAI's onboarding signups went up 50% after relaunch. Equals' homepage demo-request rate doubled. I won't promise your specific number — every market is different — but on the kickoff call I'll walk you through the conversion principle behind each lift so you know what's changing and why."
  },
  {
    q: "What if the design isn't right?",
    a: "You get unlimited revisions on the Figma design before I touch Framer. If the direction is still wrong after the first review, I refund your deposit. That has happened exactly once in years of projects."
  },
  {
    q: "What happens after we go live? Will I need you for every change?",
    a: "You walk away with a 15-minute Loom showing how to update copy, swap images, and add blog posts yourself. If you'd rather not touch it, monthly retainers cover edits, A/B tests, and new pages. Most clients pick the retainer for the first 3 months, then go DIY."
  },
  {
    q: "Who owns the design and code? Can I move it later?",
    a: "You do, from day one. The Figma file transfers to your team, the Framer project transfers to your Framer account, and any Chrome extension or custom code ships to your GitHub. No licensing fee, no 'works only while you're on retainer' clause. If you fire me tomorrow, you keep everything."
  },
  {
    q: "Can you work with my existing brand, Figma, or in-house team?",
    a: "Yes. I work inside your designer's Figma file when there is one, follow your brand guide, and pair with your developer on backend or API integration. Stack-wise I ship fastest in Framer but also work in Webflow and hand-coded Next.js when the project needs it. Tell me what you have and I'll be honest about fit."
  }
];

type FaqItem = { q: string; a: string };

export function FAQ({ items }: { items?: FaqItem[] }) {
  // Use the CMS-supplied list if present; otherwise fall back to the
  // hardcoded set so the section never goes empty during a deploy.
  const faqs = items && items.length > 0 ? items : DEFAULT_FAQS;
  // Every FAQ open by default. Click toggles a single one closed/open
  // independently — no accordion behavior. Open set is the ground truth.
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(faqs.map((_, i) => i))
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
        faqs={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      <section className="bg-white scroll-mt-16" id="faq">
        <div className="max-w-7xl mx-auto border-l border-zinc-100">
          <GridContainer cols={2}  >
            <GridItem className="py-24">
              <div className="max-w-md">
                <h2 className="text-4xl font-semibold text-zinc-900 mb-6 leading-[1.1]">
                  What SaaS founders ask before hiring.
                </h2>
                <p className="text-lg text-zinc-500">
                  Straight answers. No marketing fluff. Pricing and timelines
                  live in the section above — these are the harder questions.
                </p>
              </div>
            </GridItem>

            <div className="bg-white">
              {faqs.map((faq, i) => {
                const isOpen = openSet.has(i);
                return (
                  <div key={i} className="border-b border-r border-zinc-100">
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-8 text-left hover:bg-zinc-50 transition-colors"
                    >
                      <span className="font-medium text-zinc-900 pr-8">{faq.q}</span>
                      {isOpen ? <Minus className="w-5 h-5 text-zinc-500" /> : <Plus className="w-5 h-5 text-zinc-500" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 text-zinc-500 leading-relaxed text-sm">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </GridContainer>
        </div>
      </section>
    </>
  );
}
