"use client";

import { motion } from "framer-motion";

const brands = [
  "Reactive Growth", "Minexa.ai", "SmileJoy", "JuPay", "Designify", 
  "OrbitX", "PowerPulse", "WireFox", "UNIVIT Research", "LifeLink", "Q-TARO"
];

export function BrandsMarquee() {
  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">Trusted by brands around the world</h3>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-16 whitespace-nowrap pl-16"
        >
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="text-2xl font-bold text-white/30 hover:text-white/80 transition-colors cursor-default uppercase tracking-tight">
               {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

