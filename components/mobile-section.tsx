"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";

const mobileFeatures = [
  "60 FPS Animations",
  "Offline-First Architecture",
  "Easy Updates"
];

export function MobileSectionV2() {
  return (
    <GridContainer cols={2}> 
      {/* Content */}
      <GridItem className="py-24" label="03 · Mobile">
        <motion.div 
          className="max-w-lg mt-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-semibold text-zinc-900 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built to Last.
          </motion.h2>
          <motion.p 
            className="text-zinc-500 leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            When it all came together, the result felt effortless and complete. Looking back, I feel proud of what this project became. It carries the same energy it started with but now stands stronger, more refined, and built to last.
          </motion.p>
          
          <ul className="space-y-4 mb-12">
            {mobileFeatures.map((feature, i) => (
              <motion.li 
                key={i}
                className="flex items-center gap-3 text-sm text-zinc-700 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5, color: "#f97316" }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 bg-orange-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.1, type: "spring" }}
                  aria-hidden="true"
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </GridItem>

      {/* Mobile Visual */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="min-h-[500px] p-6 desktop:p-8 border-b border-r border-zinc-100 dotted-bg relative flex items-center justify-center">
          {/* Phone Frame */}
          <motion.div 
            className="w-[280px] h-[560px] bg-white border-2 border-zinc-200 rounded-[3rem] overflow-hidden relative cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "#f97316", y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-zinc-900 rounded-full z-10" />
            
            {/* Screen Content */}
            <div className="pt-14 px-5 pb-5 h-full flex flex-col">
              {/* Header */}
              <motion.div 
                className="flex justify-between items-center mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="w-10 h-10 border border-zinc-200 rounded-full cursor-pointer"
                  whileHover={{ borderColor: "#f97316", scale: 1.1 }}
                />
                <div className="w-28 h-3 bg-zinc-200 rounded" />
                <motion.div 
                  className="w-10 h-10 border border-zinc-200 rounded-full cursor-pointer"
                  whileHover={{ borderColor: "#f97316", scale: 1.1 }}
                />
              </motion.div>
              
              {/* Main Card */}
              <motion.div 
                className="bg-orange-500 rounded-2xl p-5 mb-5 cursor-pointer"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl mb-4" />
                <div className="w-full h-3 bg-white/30 rounded mb-2" />
                <div className="w-2/3 h-3 bg-white/30 rounded" />
              </motion.div>
              
              {/* List Items */}
              <div className="space-y-4 flex-1">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-4 p-2 -mx-2 rounded-xl cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.05)", x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-zinc-100 rounded-xl"
                      whileHover={{ backgroundColor: "#fed7aa" }}
                    />
                    <div className="flex-1">
                      <div className="w-full h-3 bg-zinc-200 rounded mb-2" />
                      <div className="w-2/3 h-3 bg-zinc-100 rounded" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom Nav */}
              <motion.div 
                className="flex justify-around pt-5 border-t border-zinc-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-orange-500 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div 
                  className="w-6 h-6 bg-zinc-200 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.3, backgroundColor: "#f97316" }}
                />
                <motion.div 
                  className="w-6 h-6 bg-zinc-200 rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.3, backgroundColor: "#f97316" }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Corner Decorations */}
          <motion.div 
            className="absolute top-3 right-3 w-10 h-10 border border-zinc-200"
            animate={{ rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-3 left-3 w-5 h-5 bg-orange-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </GridContainer>
  );
}
