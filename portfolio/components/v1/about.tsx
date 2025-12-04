"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 backdrop-blur-sm">
             <div className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </div>
             <span className="font-mono tracking-wide">SYSTEM ONLINE</span>
             <span className="w-px h-3 bg-white/10 mx-1" />
             <span>Rashid Iqbal</span>
          </div>
          
          <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                I build high-converting websites.
                <span className="text-white/40 block mt-2">No fluff. Just results.</span>
              </h2>
              
              {/* Decorative lines */}
              <div className="absolute -left-8 top-0 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent hidden md:block" />
              <div className="absolute -right-8 top-0 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent hidden md:block" />
          </div>
          
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            I combine design, code, and strategy to help startups launch faster and grow bigger.
            Think of me as your dedicated product partner.
          </p>
          
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 max-w-2xl mx-auto">
              {[
                  { label: "Projects", value: "100+" },
                  { label: "Experience", value: "5 Years" },
                  { label: "Satisfaction", value: "100%" }
              ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-default">
                      <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{stat.value}</div>
                      <div className="text-sm text-white/40 uppercase tracking-wider font-mono">{stat.label}</div>
                  </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
