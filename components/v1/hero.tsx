"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { BackgroundMesh } from "./background-mesh";
import { HeroWindow } from "./hero-window";

export function Hero() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center pt-32 px-4 overflow-hidden">
      {/* Dynamic Background Mesh - z-0 */}
      <BackgroundMesh />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Ambient Glows - z-0 */}
      <motion.div 
         className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
         animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
         className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
         animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
         transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content Container - z-20 */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center space-y-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm uppercase tracking-wider shadow-lg group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="group-hover:text-white transition-colors">Accepting New Projects</span>
          </div>

          <div className="relative">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 pb-2">
              I Help Startups Design &
              <br />
              Develop Products.
              </h1>
              
              {/* Subtle Text Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent blur-3xl -z-10 opacity-50" />
          </div>

          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            You need more than pretty designs. I deliver breathtaking visuals, persuasive copy, and flawless development. Ready to elevate your project?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="relative px-8 py-4 rounded-full bg-white text-black font-medium transition-all hover:scale-105 w-full sm:w-auto flex items-center gap-2 group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                  Book a Call
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-medium hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-md hover:border-white/20">
              Get Free Site Build
            </button>
          </div>
        </div>

        {/* Hero Window - Relative Positioning */}
        <div className="w-full flex justify-center pb-20">
          <HeroWindow />
        </div>
      </div>
    </section>
  );
}
