"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Check, X } from "lucide-react";

const standardAgencyIssues = [
  "Ghosting & poor communication",
  "Design doesn't match code",
  "Bloated, slow websites",
  "Surprise invoices"
];

const myApproachBenefits = [
  "Direct access to me (Slack/WhatsApp)",
  "Pixel-perfect implementation",
  "Lightning fast performance",
  "Flat, transparent pricing"
];

export function ComparisonV2() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
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
                        Stop Gambling With Freelancers.
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-zinc-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Work with a partner who cares about your business, not just the code.
                    </motion.p>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={2}> 
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
            <GridItem label="Standard Agency" className="bg-zinc-50/30">
                <div className="space-y-6">
                      {standardAgencyIssues.map((item, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-center gap-4 text-zinc-500"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                              <motion.div 
                                className="w-6 h-6 rounded flex items-center justify-center border border-zinc-200 bg-white"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.1, type: "spring" }}
                                whileHover={{ scale: 1.1, borderColor: "#ef4444" }}
                              >
                                <X className="w-3 h-3" />
                              </motion.div>
                            {item}
                          </motion.div>
                    ))}
                </div>
            </GridItem>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            <GridItem label="My Approach" className="bg-white">
                <div className="space-y-6">
                      {myApproachBenefits.map((item, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-center gap-4 text-zinc-900 font-medium"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                              <motion.div 
                                className="w-6 h-6 rounded flex items-center justify-center bg-orange-500 text-white"
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.2 }}
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
