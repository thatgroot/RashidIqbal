"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQStructuredData } from "@/components/seo/faq-structured-data";

const faqs = [
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, that's my specialty. I help founders go from zero to one. I provide not just code, but product strategy and design direction to help you launch."
  },
  {
    q: "What tools do you use?",
    a: "I use Figma for design, Framer for marketing sites, and Next.js (React) for web apps. For mobile, I build with React Native and Expo."
  },
  {
    q: "How do we handle the handoff?",
    a: "You get everything. I provide docs, organized Figma files, and clean, type-safe code. I can even help onboard your future team."
  },
  {
    q: "How long does it take?",
    a: "Usually 2-6 weeks. I work in weekly sprints, so you'll see progress every single week."
  }
];

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <FAQStructuredData />
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
                            {openIndex === i ? <Minus className="w-5 h-5 text-zinc-400" /> : <Plus className="w-5 h-5 text-zinc-400" />}
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
