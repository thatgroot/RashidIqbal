"use client";

import { motion } from "framer-motion";
import { Layout, Palette, Layers } from "lucide-react";
import { ComprehensiveV2VVisual } from "./comprehensive-visuals";

const services = [
  {
    title: "Copywriting",
    desc: "Crafting compelling narratives that drive engagement.",
    visual: "text",
    tags: ["Copywriting", "Strategy"]
  },
  {
    title: "Product Design",
    desc: "Creating intuitive and attractive product designs that resonate with users.",
    visual: "ui",
    tags: ["Figma", "UX/UI"]
  },
  {
    title: "Development",
    desc: "Building robust, scalable apps with modern tech.",
    visual: "code",
    tags: ["Next.js", "React"]
  },
  {
    title: "Motion Design",
    desc: "Capturing attention with dynamic motion graphics.",
    visual: "motion",
    tags: ["After Effects", "Framer Motion"]
  },
  {
    title: "Branding",
    desc: "Developing cohesive brand identities that reflect your core values.",
    visual: "brand",
    tags: ["Identity", "Logo"]
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm text-white/40 uppercase tracking-widest mb-4 block">My Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Here is how I can help you</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Grow your brand and business with a comprehensive suite of digital skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl bg-black overflow-hidden min-h-[400px] flex flex-col shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-shadow duration-500 ${service.visual === 'brand' ? 'md:col-span-2' : ''}`}
            >
               {/* Visual Container */}
               <div className="h-[280px] relative overflow-hidden bg-[#050505]">
                  
                  {/* Motion Design Visual */}
                  {service.visual === 'motion' && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full h-full max-w-[300px] max-h-[200px]">
                            <ComprehensiveV2VVisual state="running" />
                        </div>
                    </div>
                  )}
                  
                  {/* Copywriting Visual - Static Top-Left DT */}
                  {service.visual === 'text' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                          {/* Static DT Label */}
                          <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50">
                              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-xs font-bold text-white">DT</div>
                              <span className="text-xs font-mono text-white/60">DRAFT_V1</span>
                          </div>

                          <div className="relative p-8 w-full max-w-xs flex flex-col items-center">
                              <div className="space-y-4 relative z-10 w-full">
                                  {[80, 60, 90].map((width, i) => (
                                      <div key={i} className="h-3 bg-white/10 rounded overflow-hidden relative w-full">
                                          <motion.div 
                                              className="absolute inset-0 bg-white/40"
                                              initial={{ width: 0 }}
                                              animate={{ width: `${width}%` }}
                                              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
                                          />
                                      </div>
                                  ))}
                                  <motion.div 
                                      className="h-10 w-32 bg-blue-500/20 rounded-lg mt-6 border border-blue-500/30 flex items-center justify-center mx-auto"
                                      animate={{ scale: [1, 1.05, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                  >
                                      <span className="text-xs font-mono text-blue-400">CTA_BUTTON</span>
                                  </motion.div>
                              </div>
                          </div>
                      </div>
                  )}
                  
                  {/* Development Visual - Typewriter Effect */}
                  {service.visual === 'code' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] font-mono text-xs p-8 overflow-hidden">
                          <div className="w-full max-w-sm space-y-2 relative z-10">
                              <TypeWriter text="import { Future } from '@rashid/dev';" delay={0} color="text-purple-400" />
                              <TypeWriter text="const project = await build({ " delay={1.5} color="text-blue-400" />
                              <div className="pl-4 space-y-1">
                                  <TypeWriter text="performance: '100%'," delay={2.5} color="text-green-400" />
                                  <TypeWriter text="security: 'enterprise'," delay={3.5} color="text-green-400" />
                              </div>
                              <TypeWriter text="});" delay={5.5} color="text-blue-400" />
                          </div>
                          
                          {/* Background particles */}
                          {[...Array(10)].map((_, i) => (
                              <motion.div
                                  key={i}
                                  className="absolute w-1 h-1 bg-white/10 rounded-full"
                                  animate={{ 
                                      y: [0, -100], 
                                      opacity: [0, 1, 0] 
                                  }}
                                  transition={{ 
                                      duration: Math.random() * 2 + 2, 
                                      repeat: Infinity, 
                                      delay: Math.random() * 2 
                                  }}
                                  style={{ left: `${Math.random() * 100}%`, bottom: 0 }}
                              />
                          ))}
                      </div>
                  )}

                   {/* Product Design Visual - Figma Style Dashboard */}
                   {service.visual === 'ui' && (
                      <div className="absolute inset-0 bg-[#1e1e1e] flex flex-col overflow-hidden">
                          {/* Top Bar */}
                          <div className="h-8 bg-[#2c2c2c] border-b border-black flex items-center justify-between px-3 shrink-0">
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-[#f24822] rounded-full" />
                                  <span className="text-[10px] text-white/60 font-medium">App Design System</span>
                              </div>
                              <div className="flex gap-2">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-[#2c2c2c] -ml-2" />
                                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#2c2c2c] -ml-2" />
                              </div>
                          </div>
                          
                          <div className="flex-1 flex relative">
                              {/* Left Sidebar */}
                              <div className="w-12 bg-[#2c2c2c] border-r border-black flex flex-col gap-3 p-2 shrink-0">
                                  <Layout className="w-4 h-4 text-white/40" />
                                  <Layers className="w-4 h-4 text-white/40" />
                                  <Palette className="w-4 h-4 text-white/40" />
                              </div>
                              
                              {/* Canvas */}
                              <div className="flex-1 bg-[#1e1e1e] relative p-4 flex items-center justify-center overflow-hidden">
                                  <div className="relative w-64 h-48 bg-black rounded-lg shadow-2xl border border-white/5 p-4 scale-90 md:scale-100">
                                      <div className="flex items-center justify-between mb-4">
                                          <div className="w-8 h-8 bg-white/10 rounded-full" />
                                          <div className="w-4 h-4 bg-white/10 rounded" />
                                      </div>
                                      <div className="space-y-2">
                                          <div className="w-3/4 h-4 bg-white/10 rounded" />
                                          <div className="w-1/2 h-4 bg-white/10 rounded" />
                                      </div>
                                      <div className="mt-6 grid grid-cols-2 gap-2">
                                          <div className="h-16 bg-blue-500/20 rounded border border-blue-500/30" />
                                          <div className="h-16 bg-purple-500/20 rounded border border-purple-500/30" />
                                      </div>
                                  </div>

                                  {/* Animated Cursor */}
                                  <motion.div
                                      className="absolute z-50 pointer-events-none"
                                      animate={{ 
                                          x: [0, 80, 40, 0],
                                          y: [0, 60, 100, 0]
                                      }}
                                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                      style={{ top: '20%', left: '30%' }}
                                  >
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="black" stroke="white"/>
                                      </svg>
                                      <div className="ml-2 mt-1 px-1.5 py-0.5 bg-blue-500 text-[8px] text-white rounded font-bold">
                                          Rashid
                                      </div>
                                  </motion.div>
                              </div>
                              
                              {/* Right Sidebar */}
                              <div className="w-48 bg-[#2c2c2c] border-l border-black hidden md:flex flex-col p-3 gap-4 shrink-0">
                                  <div className="space-y-2">
                                      <div className="text-[10px] text-white/40 uppercase font-bold">Properties</div>
                                      <div className="w-full h-8 bg-white/5 rounded border border-white/5" />
                                      <div className="w-full h-8 bg-white/5 rounded border border-white/5" />
                                  </div>
                                  <div className="space-y-2">
                                      <div className="text-[10px] text-white/40 uppercase font-bold">Colors</div>
                                      <div className="flex gap-2">
                                          <div className="w-6 h-6 rounded-full bg-blue-500" />
                                          <div className="w-6 h-6 rounded-full bg-purple-500" />
                                          <div className="w-6 h-6 rounded-full bg-green-500" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Branding Visual - Card Stack */}
                  {service.visual === 'brand' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 overflow-hidden">
                          <div className="relative w-full h-full flex items-center justify-center">
                              {[0, 1, 2].map((i) => (
                                  <motion.div
                                      key={i}
                                      className="absolute w-64 h-40 rounded-xl border border-white/10 bg-black shadow-2xl flex items-center justify-center"
                                      style={{ zIndex: 3 - i }}
                                      initial={{ y: i * 10, scale: 1 - i * 0.05, opacity: 1 - i * 0.2 }}
                                      animate={{ 
                                          y: [i * 15, i * 15 - 10, i * 15],
                                          rotate: i === 0 ? [0, 2, 0] : 0
                                      }}
                                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                                  >
                                      {i === 0 && (
                                          <div className="flex flex-col items-center gap-2">
                                              <div className="text-6xl font-bold font-serif text-white">Ag</div>
                                              <div className="space-y-1 w-32">
                                                  <div className="h-2 bg-white/20 rounded w-full" />
                                                  <div className="h-2 bg-white/20 rounded w-2/3 mx-auto" />
                                              </div>
                                          </div>
                                      )}
                                  </motion.div>
                              ))}
                          </div>
                      </div>
                  )}
               </div>

               {/* Content */}
               <div className="p-8 flex-1 flex flex-col bg-zinc-950 relative z-20 border-t border-white/5">
                  <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold group-hover:text-white transition-colors text-white/90">{service.title}</h3>
                      <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                  </div>
                  <p className="text-white/60 mb-6 flex-1 leading-relaxed">{service.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                      {service.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/50 group-hover:text-white/70 transition-all">
                              {tag}
                          </span>
                      ))}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeWriter({ text, delay, color }: { text: string, delay: number, color: string }) {
    return (
        <motion.div
            initial={{ width: 0, opacity: 1 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: delay, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
            className={`overflow-hidden whitespace-nowrap border-r-2 border-transparent ${color}`}
        >
            {text}
        </motion.div>
    )
}
