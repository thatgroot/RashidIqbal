"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Rashid rebuilt our entire deal aggregation platform from scratch. The new architecture handles 50k+ daily listings without breaking a sweat. Conversion rates jumped 34% after launch.",
    author: "Priya Selvakumar",
    role: "Founder @ DealsFinders"
  },
  {
    text: "Our AI meeting assistant needed a website that felt as smart as the product. Rashid delivered a Next.js site that converts visitors into users. Onboarding signups increased by half after launch.",
    author: "Josh Schachter",
    role: "Founder & CEO @ UpdateAI"
  },
  {
    text: "Rashid built our mobile apps from the ground up. Athletes can now update their emergency IDs on the go. The React Native performance is buttery smooth. App Store ratings speak for themselves.",
    author: "Mike Wimmer",
    role: "Co-Founder @ Road ID"
  }
];

const reviewVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const
    }
  })
};

export function TestimonialsV2() {
  return (
    <section className="bg-white" id="testimonials">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer> 
            <GridItem className="py-24">
                <motion.div 
                  className="max-w-2xl"
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
                        Client Feedback.
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-zinc-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Trusted by ambitious founders and engineering teams.
                    </motion.p>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}> 
            {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={reviewVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <GridItem className="dotted-bg dotted-bg-opacity-30">
                    <div className="relative z-10">
                          <motion.div 
                            className="flex gap-1 mb-8"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                          >
                            {[...Array(5)].map((_, j) => (
                                  <motion.div
                                    key={j}
                                    initial={{ opacity: 0, rotate: -180 }}
                                    whileInView={{ opacity: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                                  >
                                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                                  </motion.div>
                            ))}
                          </motion.div>
                          <motion.p 
                            className="text-lg text-zinc-900 leading-relaxed mb-8 font-medium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                              &quot;{review.text}&quot;
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          >
                            <div className="font-bold text-zinc-900 text-sm">{review.author}</div>
                            <div className="text-xs text-zinc-500">{review.role}</div>
                          </motion.div>
                    </div>
                </GridItem>
                </motion.div>
            ))}
        </GridContainer>
      </div>
    </section>
  );
}
