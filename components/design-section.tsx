"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";

const designFeatures = [
  "Atomic Design Principles",
  "Interactive Prototyping",
  "Developer-Ready Handover"
];

export function DesignSectionV2() {
  return (
    <GridContainer cols={2}> 
      {/* Content */}
      <GridItem className="py-24" label="01 · Design Phase">
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
            It Starts With Your Vision.
          </motion.h2>
          <motion.p 
            className="text-zinc-500 leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            It started with a simple idea and a clear vision. You wanted something that looked great, worked perfectly, and told your story with purpose. We explore directions, test concepts, and refine each part until everything begins to align.
          </motion.p>
          
          <ul className="space-y-4 mb-12">
            {designFeatures.map((feature, i) => (
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

      {/* Design Visual */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="min-h-[500px] p-6 desktop:p-8 border-b border-r border-zinc-100 dotted-bg relative">
          {/* Canvas Container */}
          <motion.div 
            className="w-full h-full min-h-[400px] bg-white border border-zinc-200 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "#f97316" }}
            transition={{ duration: 0.3 }}
          >
            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-100" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-100" />
            </div>
            
            {/* Orange Square */}
            <motion.div 
              className="absolute top-8 left-8 w-28 h-28 bg-orange-500 cursor-pointer"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
            
            {/* Circle */}
            <motion.div 
              className="absolute top-1/4 right-12 w-20 h-20 border-2 border-zinc-300 rounded-full cursor-pointer"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              whileHover={{ borderColor: "#f97316", scale: 1.15 }}
            />
            
            {/* Text Blocks */}
            <motion.div 
              className="absolute bottom-10 right-10 space-y-3 cursor-pointer"
              whileHover={{ x: -5 }}
            >
              <motion.div 
                className="w-36 h-4 bg-zinc-900"
                whileHover={{ width: "160px", backgroundColor: "#f97316" }}
                transition={{ duration: 0.2 }}
              />
              <div className="w-28 h-4 bg-zinc-300" />
              <div className="w-32 h-4 bg-zinc-200" />
            </motion.div>
            
            {/* Dots */}
            <motion.div 
              className="absolute bottom-8 left-8 w-4 h-4 bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-10 right-10 w-3 h-3 bg-zinc-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Corner Decorations */}
          <motion.div 
            className="absolute top-3 right-3 w-8 h-8 bg-orange-500 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 bg-white" />
          </motion.div>
          <motion.div 
            className="absolute bottom-3 left-3 w-6 h-6 border-2 border-zinc-300"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </GridContainer>
  );
}
