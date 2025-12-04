"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function BackgroundMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      
      <motion.div 
        style={{ rotate, scale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[1000px] md:h-[1000px] opacity-20"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Rotating Circles */}
          {[...Array(5)].map((_, i) => (
            <motion.ellipse
              key={`circle-${i}`}
              cx="50"
              cy="50"
              rx={30 + i * 8}
              ry={30 + i * 8}
              fill="none"
              stroke="url(#grid-grad)"
              strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0, rotate: i % 2 === 0 ? 0 : 180 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.3,
                rotate: i % 2 === 0 ? 360 : -180 
              }}
              transition={{ 
                duration: 20 + i * 5, 
                repeat: Infinity, 
                ease: "linear",
                opacity: { duration: 2, delay: i * 0.5 }
              }}
            />
          ))}

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={50}
              cy={50}
              r={Math.random() * 0.5 + 0.1}
              fill="#fff"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5 
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

