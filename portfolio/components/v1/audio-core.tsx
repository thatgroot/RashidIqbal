"use client";

import { motion } from "framer-motion";

export function AudioCoreVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center scale-75">
        {/* Concentric Rings */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border border-blue-500/20"
                style={{ width: 100 + i * 60, height: 100 + i * 60 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1], rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full -translate-x-1/2" />
            </motion.div>
        ))}

        {/* Central Waveform */}
        <div className="flex items-center gap-1 h-20 z-10">
             {[...Array(8)].map((_, i) => (
                 <motion.div 
                    key={i}
                    className="w-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    animate={{ 
                        height: ["20%", "80%", "40%", "100%", "20%"],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.1 
                    }}
                 />
             ))}
        </div>

        {/* Particles */}
        {[...Array(8)].map((_, i) => (
            <motion.div 
                key={`p-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                    x: Math.cos(i) * 80,
                    y: Math.sin(i) * 80,
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
        ))}
      </div>
    </div>
  );
}

