"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Code2, Layout } from "lucide-react";

export function WebSectionV2() {
  return (
    <GridContainer cols={2}> 
      {/* Web Visual */}
      <motion.div
        className="order-2 md:order-1"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="min-h-[500px] p-6 md:p-8 border-b border-r border-zinc-100 dotted-bg relative">
          {/* Browser Frame */}
          <motion.div 
            className="w-full h-full min-h-[400px] bg-white border border-zinc-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "#f97316" }}
            transition={{ duration: 0.3 }}
          >
            {/* Browser Header */}
            <div className="h-12 border-b border-zinc-100 flex items-center px-5 gap-3 bg-zinc-50/50 shrink-0">
              <div className="flex gap-2">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-zinc-300 cursor-pointer"
                  whileHover={{ backgroundColor: "#ef4444" }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-zinc-300 cursor-pointer"
                  whileHover={{ backgroundColor: "#eab308" }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-zinc-300 cursor-pointer"
                  whileHover={{ backgroundColor: "#22c55e" }}
                />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 bg-zinc-100 rounded max-w-sm" />
              </div>
            </div>
            
            {/* Code Content */}
            <div className="flex-1 p-6 md:p-8 space-y-5">
              {/* Code Lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  className="flex gap-5 items-center cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-base text-zinc-300 w-6 font-mono text-right">{i + 1}</span>
                  <motion.div 
                    className={`h-4 rounded ${i === 2 ? 'bg-orange-500' : 'bg-zinc-200'}`}
                    style={{ width: `${[55, 75, 40, 65, 50][i]}%` }}
                    animate={i === 2 ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ backgroundColor: i === 2 ? "#ea580c" : "#d4d4d8" }}
                  />
                </motion.div>
              ))}
              
              <div className="h-6" />
              
              {/* Component Blocks */}
              <div className="grid grid-cols-2 gap-5">
                <motion.div 
                  className="h-28 border-2 border-zinc-200 bg-zinc-50/30 cursor-pointer"
                  whileHover={{ borderColor: "#f97316", backgroundColor: "rgba(249, 115, 22, 0.05)", scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div 
                  className="h-28 border-2 border-zinc-200 bg-zinc-50/30 cursor-pointer"
                  whileHover={{ borderColor: "#f97316", backgroundColor: "rgba(249, 115, 22, 0.05)", scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              {/* Button */}
              <motion.div 
                className="w-36 h-12 bg-zinc-900 cursor-pointer"
                whileHover={{ backgroundColor: "#f97316", scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
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

      {/* Content */}
      <GridItem className="py-24 order-1 md:order-2" label="02 · Infrastructure">
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
            Step by Step, It Becomes Real.
          </motion.h2>
          <motion.p 
            className="text-zinc-500 leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Step by step, the idea turns into something real. Whether you need a stunning marketing site built in days with <strong>Framer</strong>, a complex web app powered by <strong>Next.js</strong>, or a native mobile app with <strong>Expo</strong>, I pick the right tool for the job and craft it until it&apos;s perfect.
          </motion.p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <motion.div
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, x: 3 }}
            >
              <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                <Layout className="w-4 h-4 text-orange-500" aria-hidden="true" /> No-Code
              </h3>
              <p className="text-xs text-zinc-500">Framer for speed. Instant publishing, perfect for marketing teams.</p>
            </motion.div>
            <motion.div
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, x: 3 }}
            >
              <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-900" aria-hidden="true" /> Full-Code
              </h3>
              <p className="text-xs text-zinc-500">Next.js for power. Server components, auth, and complex logic.</p>
            </motion.div>
          </div>
        </motion.div>
      </GridItem>
    </GridContainer>
  );
}
