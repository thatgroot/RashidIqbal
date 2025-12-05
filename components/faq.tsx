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
    <section className="pt-20 bg-white" id="resources">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer cols={2}> 
            <GridItem className="py-24">
                <motion.div 
                  className="max-w-md"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                    <motion.h2 
                      className="text-4xl font-semibold text-zinc-900 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Got Questions? <br /> I Have Answers.
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-zinc-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Everything you need to know about how we&apos;ll work together.
                    </motion.p>
                </motion.div>
            </GridItem>

            <div className="bg-white">
                {faqs.map((faq, i) => (
                    <motion.div 
                      key={i} 
                      className="border-b border-r border-zinc-100"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <motion.button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-8 text-left hover:bg-zinc-50 transition-colors"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <span className="font-medium text-zinc-900 pr-8">{faq.q}</span>
                            <motion.div
                              animate={{ rotate: openIndex === i ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {openIndex === i ? <Minus className="w-5 h-5 text-orange-500" /> : <Plus className="w-5 h-5 text-zinc-400" />}
                            </motion.div>
                        </motion.button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <motion.div 
                                      className="px-8 pb-8 text-zinc-500 leading-relaxed text-sm"
                                      initial={{ y: -10 }}
                                      animate={{ y: 0 }}
                                      transition={{ delay: 0.1 }}
                                    >
                                        {faq.a}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </GridContainer>
      </div>
    </section>
    </>
  );
}
