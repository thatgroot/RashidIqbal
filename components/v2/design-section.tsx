"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { MousePointer2 } from "lucide-react";

export function DesignSectionV2() {
  return (
    <section className="bg-white">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer cols={2}  > 
            {/* Content */}
            <GridItem className="py-24" label="01 · Design Phase">
                <div className="max-w-lg mt-auto">
                    <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
                        It Starts With Your Vision.
                    </h2>
                    <p className="text-zinc-500 leading-relaxed mb-12">
                        It started with a simple idea and a clear vision. You wanted something that looked great, worked perfectly, and told your story with purpose. We explore directions, test concepts, and refine each part until everything begins to align.
                    </p>
                    
                    <ul className="space-y-4 mb-12">
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            Atomic Design Principles
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            Interactive Prototyping
                        </li>
                        <li className="flex items-center gap-3 text-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            Developer-Ready Handover
                        </li>
                    </ul>
                </div>
            </GridItem>

            {/* Interactive Figma Visual - Flat */}
            <GridItem className="grid-item-visual dotted-bg">
                <div className="w-full h-full relative">
                    {/* Floating Interface Elements - Flat */}
                    <motion.div 
                        className="absolute top-20 left-12 bg-white border border-zinc-200 p-2"
                        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="flex gap-2 mb-2">
                            <div className="w-8 h-8 bg-zinc-50 rounded-none" />
                            <div className="w-8 h-8 bg-zinc-50 rounded-none" />
                        </div>
                        <div className="w-20 h-2 bg-zinc-50 rounded-none" />
                    </motion.div>

                    {/* Main Canvas Area - Flat */}
                    <div className="absolute inset-12 top-32 bg-white border border-zinc-200">
                        <div className="h-8 border-b border-zinc-100 flex items-center px-4 justify-between">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Frame 1</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                                <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between mb-8">
                                <div className="w-12 h-12 bg-orange-500 opacity-20 rounded-none" />
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-zinc-50 rounded-none" />
                                    <div className="w-20 h-4 bg-zinc-50 rounded-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="aspect-video bg-zinc-50 border border-zinc-100" />
                                <div className="aspect-video bg-zinc-50 border border-zinc-100" />
                                <div className="aspect-video bg-zinc-50 border border-zinc-100" />
                            </div>
                        </div>
                    </div>

                    {/* Selection Box Interaction - Flat */}
                    <motion.div 
                        className="absolute border-2 border-blue-500 bg-blue-500/5 pointer-events-none z-20"
                        initial={{ top: 200, left: 100, width: 0, height: 0, opacity: 0 }}
                        animate={{ 
                            top: [200, 150, 150],
                            left: [100, 80, 80],
                            width: [0, 250, 250],
                            height: [0, 300, 300],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                    >
                        <div className="absolute -bottom-6 right-0 bg-blue-700 text-white text-[10px] px-2 py-0.5">
                            Selection
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute z-30"
                        animate={{ 
                            top: [200, 450, 200],
                            left: [100, 330, 100]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                    >
                        <MousePointer2 className="w-5 h-5 text-black fill-black stroke-white" />
                    </motion.div>
                </div>
            </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
