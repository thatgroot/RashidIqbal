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

export function TestimonialsV2() {
  return (
    <section className="bg-white" id="testimonials">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <motion.div 
                    className="max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                        Client Feedback.
                    </h2>
                    <p className="text-lg text-zinc-500">
                        Trusted by ambitious founders and engineering teams.
                    </p>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}  > 
            {reviews.map((review, i) => (
                <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: i * 0.15 } }
                    }}
                >
                <GridItem className="dotted-bg dotted-bg-opacity-30">
                    
                    <div className="relative z-10">
                        <motion.div 
                            className="flex gap-1 mb-8"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            {[...Array(5)].map((_, j) => (
                                <motion.div
                                    key={j}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0 },
                                        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: j * 0.05 } }
                                    }}
                                >
                                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.p 
                            className="text-lg text-zinc-900 leading-relaxed mb-8 font-medium"
                            variants={{
                                hidden: { opacity: 0, y: 15 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                        >
                            &quot;{review.text}&quot;
                        </motion.p>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
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
