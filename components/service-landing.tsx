"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ServiceLandingV2() {
  return (
    <section className="py-24 px-4 border-b border-zinc-200 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 desktop:grid-cols-2 gap-16 items-center">
        <div className="order-2 desktop:order-1">
           <div className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded text-[10px] font-mono font-medium uppercase tracking-wider mb-6">
              Performance Module
           </div>
           <h2 className="text-3xl desktop:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
              High-Conversion Landing Pages
           </h2>
           <p className="text-zinc-500 mb-8 leading-relaxed">
              Engineered for speed and conversion. We don't just build pages; we build funnel entry points that load instantly and guide users to action.
           </p>
           <ul className="space-y-3 mb-8">
              {[
                  "A/B Testing Architecture",
                  "Dynamic CMS Integration",
                  "Instant Page Transitions",
                  "Advanced Analytics Setup"
              ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {item}
                  </li>
              ))}
           </ul>
           <button className="text-sm font-bold text-zinc-900 flex items-center gap-2 hover:gap-4 transition-all">
               View Case Studies <ArrowRight className="w-4 h-4" />
           </button>
        </div>

        <div className="order-1 desktop:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent rounded-2xl" />
            <div className="relative bg-white border border-zinc-200 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
                    <span className="font-mono text-xs text-zinc-400">LIGHTHOUSE_METRICS</span>
                    <span className="font-mono text-xs text-green-600 bg-green-50 px-2 py-1 rounded">PASS</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Performance", score: 100 },
                        { label: "Accessibility", score: 100 },
                        { label: "Best Practices", score: 100 },
                        { label: "SEO", score: 100 }
                    ].map((metric, i) => (
                        <div key={i} className="flex flex-col items-center p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                            <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="32" cy="32" r="28" stroke="#e4e4e7" strokeWidth="4" fill="none" />
                                    <motion.circle 
                                        cx="32" cy="32" r="28" 
                                        stroke="#22c55e" strokeWidth="4" fill="none" 
                                        strokeDasharray="175.9"
                                        initial={{ strokeDashoffset: 175.9 }}
                                        whileInView={{ strokeDashoffset: 0 }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                    />
                                </svg>
                                <span className="absolute text-lg font-bold text-green-600">{metric.score}</span>
                            </div>
                            <span className="text-xs font-medium text-zinc-500">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

