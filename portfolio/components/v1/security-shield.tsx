"use client";

import { motion } from "framer-motion";

export function SecurityShieldVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center scale-75">
      <div className="relative w-40 h-48">
          {/* Shield Outline */}
          <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-green-500/30 stroke-[2] drop-shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              <path d="M50 0 L100 25 V70 Q50 120 0 70 V25 Z" />
          </svg>
          
          {/* Animated Scan Line */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-10"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Grid Lock Animation */}
          <div className="absolute inset-4 grid grid-cols-3 gap-1 overflow-hidden" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
              {[...Array(9)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="bg-green-500/10 rounded-sm backdrop-blur-sm"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
                  />
              ))}
          </div>
          
          {/* Lock Icon Overlay */}
          <motion.div 
             className="absolute inset-0 flex items-center justify-center z-20"
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
          >
             <div className="w-8 h-10 border-2 border-white/80 rounded-t-full relative">
                <div className="absolute top-5 left-[-2px] w-[calc(100%+4px)] h-6 bg-white/90 rounded-sm flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,1)]"></div>
                </div>
             </div>
          </motion.div>
      </div>
    </div>
  );
}

