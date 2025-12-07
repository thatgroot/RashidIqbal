"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Check, X } from "lucide-react";

const agencyProblems = [
    "Ghosting & poor communication",
    "Design doesn't match code",
    "Bloated, slow websites",
    "Surprise invoices"
];

const myApproach = [
    "Direct access to me (Slack/WhatsApp)",
    "Pixel-perfect implementation",
    "Lightning fast performance",
    "Flat, transparent pricing"
];

export function ComparisonV2() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
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
                        Stop Gambling With Freelancers.
                    </h2>
                    <p className="text-lg text-zinc-500">
                        Work with a partner who cares about your business, not just the code.
                    </p>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={2}  > 
            {/* Standard Agency - Problems */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } }
                }}
            >
                <GridItem label="Standard Agency" className="bg-zinc-50/30">
                    <div className="space-y-6">
                        {agencyProblems.map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="flex items-center gap-4 text-zinc-500"
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                                }}
                            >
                                <motion.div 
                                    className="w-6 h-6 rounded flex items-center justify-center border border-zinc-200 bg-white"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1, transition: { duration: 0.3, delay: i * 0.05 } }
                                    }}
                                >
                                    <X className="w-3 h-3" />
                                </motion.div>
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </GridItem>
            </motion.div>
            
            {/* My Approach - Benefits */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
            >
                <GridItem label="My Approach" className="bg-white">
                    <div className="space-y-6">
                        {myApproach.map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="flex items-center gap-4 text-zinc-900 font-medium"
                                variants={{
                                    hidden: { opacity: 0, x: 20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                                }}
                            >
                                <motion.div 
                                    className="w-6 h-6 rounded flex items-center justify-center bg-orange-500 text-white"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1, transition: { duration: 0.3, delay: i * 0.05 } }
                                    }}
                                >
                                    <Check className="w-3 h-3" />
                                </motion.div>
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </GridItem>
            </motion.div>
        </GridContainer>
      </div>
    </section>
  );
}
