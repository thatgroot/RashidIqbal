"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export function Comparison() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background Split Visual */}
      <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-red-950/5 border-r border-white/5" />
          <div className="w-1/2 bg-green-950/5" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Me?</h2>
          <p className="text-white/60">Avoid the common pitfalls of hiring.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Without Me */}
          <motion.div style={{ y }} className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative p-8 rounded-3xl bg-black border border-white/10 h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                        <XCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Without Me</h3>
                </div>
                <ul className="space-y-6">
                    {[
                        "Fragmented, disjointed projects",
                        "Generic templates, no brand identity",
                        "Hidden costs & endless delays",
                        "Poor communication & ghosting",
                        "Zero post-launch support"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-white/60 group-hover:text-red-200/60 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                            {item}
                        </li>
                    ))}
                </ul>
             </div>
          </motion.div>

          {/* With Me */}
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }} className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="relative p-8 rounded-3xl bg-zinc-900 border border-green-500/20 h-full shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">With Me</h3>
                </div>
                <ul className="space-y-6">
                    {[
                        "Cohesive, strategic execution",
                        "Custom design tailored to your brand",
                        "Transparent, fixed pricing",
                        "Direct access & daily updates",
                        "30 days of dedicated support"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-white font-medium">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>
                
                <motion.div 
                    className="absolute bottom-8 right-8"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowRight className="w-6 h-6 text-green-500 opacity-50" />
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
