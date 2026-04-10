"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQStructuredData } from "@/components/seo/faq-structured-data";

const faqs = [
  {
    q: "What exactly do you do?",
    a: "Three things. I design pages in Figma with UX copy and conversion strategy baked in. I build them pixel-perfect in Framer. And I develop standalone Chrome extensions for businesses that need custom browser tools."
  },
  {
    q: "Do you write the copy too, or just design?",
    a: "Both. I write the headlines, CTAs, value props, and page flow as part of the Figma design. Good design without good copy doesn't convert."
  },
  {
    q: "What kind of Chrome extensions do you build?",
    a: "Standalone tools for businesses. Productivity extensions, SaaS companion apps, workflow automation tools. If you have an idea for a Chrome extension, I can design, build, and ship it to the Web Store."
  },
  {
    q: "How long does a typical project take?",
    a: "A 3-4 page Framer site takes about 2 weeks. Larger multi-page sites with CMS run 3-4 weeks. Chrome extensions depend on complexity but usually 2-4 weeks. You see progress every week."
  },
  {
    q: "What if I'm not happy with the design?",
    a: "You get unlimited revisions on the Figma design before I build anything in Framer. If the direction isn't right after the first round, I refund your deposit. That's happened once in 53 projects."
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. I white-label for several agencies as their Framer department. Your brand on everything, NDA signed before we start. Check aestho.xyz/partners for details."
  }
];

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <FAQStructuredData
        faqs={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      <section className="bg-white" id="resources">
        <div className="max-w-7xl mx-auto border-l border-zinc-100">
          <GridContainer cols={2}  >
            <GridItem className="py-24">
              <div className="max-w-md">
                <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                  Got Questions? <br /> I Have Answers.
                </h2>
                <p className="text-lg text-zinc-500">
                  Everything you need to know about how we&apos;ll work together.
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
