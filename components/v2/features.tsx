"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, Code2, Box, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Frontend Architecture",
    desc: "Pixel-perfect implementation of landing pages and mobile apps using React, Next.js, and Tailwind CSS.",
    icon: Layout,
    colSpan: "md:col-span-2",
    visual: (
       <div className="absolute right-4 top-4 opacity-20">
          <div className="grid grid-cols-3 gap-2 w-32">
             {[...Array(9)].map((_, i) => (
                 <div key={i} className="w-full aspect-video bg-current rounded-sm" />
             ))}
          </div>
       </div>
    )
  },
  {
    title: "Backend Systems",
    desc: "Scalable APIs and serverless functions powered by modern edge infrastructure.",
    icon: Code2,
    colSpan: "md:col-span-1",
    visual: null
  },
  {
    title: "Mobile Native",
    desc: "Cross-platform mobile applications built with Expo and React Native.",
    icon: Smartphone,
    colSpan: "md:col-span-1",
    visual: null
  },
  {
    title: "No-Code Velocity",
    desc: "Rapid prototyping and MVP launches using Framer, Webflow, and v0.",
    icon: Box,
    colSpan: "md:col-span-2",
    visual: (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-2 opacity-20">
            <div className="w-12 h-12 border-2 border-current rounded-lg" />
            <div className="w-12 h-12 border-2 border-current rounded-full" />
            <div className="w-12 h-12 border-2 border-current rounded-lg rotate-45" />
        </div>
    )
  }
];

export function FeaturesV2() {
  return (
    <section id="services" className="py-24 px-4 border-b border-black/5 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Core Capabilities</h2>
            <p className="text-zinc-500 mt-2 max-w-lg">A complete toolkit for building modern digital products.</p>
          </div>
          <div className="hidden md:block text-xs font-mono text-zinc-500">
             SYSTEM_MODULES_LOADED: 4/4
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${feature.colSpan} relative group p-8 bg-white rounded-lg border border-zinc-200 hover:border-orange-500/50 transition-colors shadow-sm hover:shadow-md overflow-hidden`}
            >
              {feature.visual}
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-10 h-10 bg-zinc-50 rounded-lg border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                  <feature.icon className="w-5 h-5 text-zinc-700 group-hover:text-orange-600" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
                    {feature.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

