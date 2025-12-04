"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";

export function MobileSectionV2() {
  return (
    <section className="bg-white">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer cols={2}  > 
            {/* Content */}
            <GridItem className="py-24" label="03 · Mobile">
                <div className="max-w-lg mt-auto">
                    <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
                        Built to Last.
                    </h2>
                    <p className="text-zinc-500 leading-relaxed mb-12">
                        When it all came together, the result felt effortless and complete. Looking back, I feel proud of what this project became. It carries the same energy it started with but now stands stronger, more refined, and built to last.
                    </p>
                    
                    <ul className="space-y-4 mb-12">
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            60 FPS Animations
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            Offline-First Architecture
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            Easy Updates
                        </li>
                    </ul>
                </div>
            </GridItem>

            {/* Interactive Phone Visual - Flat */}
            <GridItem className="flex items-center justify-center grid-item-visual dotted-bg">
                <div className="relative w-[300px] h-[600px] bg-white border-4 border-zinc-200 rounded-[3rem] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-20" />
                    
                    {/* Scrollable Content */}
                    <motion.div 
                        className="w-full bg-white pt-12 pb-20 px-4 space-y-4 h-full overflow-hidden relative z-10"
                    >
                        <motion.div
                            animate={{ y: [0, -100, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                                <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                            </div>
                            <div className="h-48 bg-orange-500 rounded-2xl p-6 text-white flex flex-col justify-end">
                                <div className="w-12 h-12 bg-white/20 rounded-full mb-4 backdrop-blur-sm" />
                                <div className="w-32 h-4 bg-white/40 rounded mb-2" />
                                <div className="w-20 h-4 bg-white/40 rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-32 bg-zinc-50 rounded-xl border border-zinc-100" />
                                <div className="h-32 bg-zinc-50 rounded-xl border border-zinc-100" />
                            </div>
                            <div className="h-20 bg-zinc-900 rounded-xl" />
                            <div className="h-20 bg-zinc-100 rounded-xl" />
                        </motion.div>
                    </motion.div>

                    {/* Bottom Tab Bar */}
                    <div className="absolute bottom-6 inset-x-6 h-16 bg-white border border-zinc-100 rounded-2xl flex items-center justify-around px-4 z-20">
                        <div className="w-6 h-6 bg-orange-500 rounded-full" />
                        <div className="w-6 h-6 bg-zinc-200 rounded-full" />
                        <div className="w-6 h-6 bg-zinc-200 rounded-full" />
                    </div>
                </div>
            </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
