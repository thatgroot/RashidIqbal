"use client";

import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQStructuredData } from "@/components/seo/faq-structured-data";

const faqs = [
  {
    q: "What does it cost and how long does it take?",
    a: "Landing pages start at $1,600 and ship in 2 weeks. Multi-page sites with CMS start at $3,500 and ship in 3-5 weeks. Chrome extensions start at $2,500 and run 3-4 weeks. You see progress every week."
  },
  {
    q: "What happens if I am not happy with the design?",
    a: "You get unlimited revisions on the Figma design before I build anything in Framer. If the direction is not right after the first round, I refund your deposit. That has happened exactly once in years of projects."
  },
  {
    q: "Do you work with my stack (Framer, Webflow, custom)?",
    a: "Framer is where I ship fastest and what my clients get the most value from. I also work in Webflow and handcoded Next.js when the project calls for it. Tell me what you have and I will tell you honestly if it is a fit."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                  The three questions founders ask before hiring.
                </h2>
                <p className="text-lg text-zinc-500">
                  Straight answers. No marketing fluff.
                </p>
              </div>
            </GridItem>

            <div className="bg-white">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-r border-zinc-100">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left hover:bg-zinc-50 transition-colors"
                  >
                    <span className="font-medium text-zinc-900 pr-8">{faq.q}</span>
                    {openIndex === i ? <Minus className="w-5 h-5 text-zinc-500" /> : <Plus className="w-5 h-5 text-zinc-500" />}
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
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
              ))}
            </div>
          </GridContainer>
        </div>
      </section>
    </>
  );
}
