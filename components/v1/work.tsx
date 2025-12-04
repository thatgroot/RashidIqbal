"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SecurityShieldVisual } from "./security-shield";

const projects = [
  {
    title: "AI Agent Platform",
    category: "Web App",
    description: "A platform for building and deploying autonomous AI agents.",
    tech: ["Next.js", "OpenAI", "Tailwind"],
    className: "md:col-span-2 md:row-span-2",
    visual: "agent"
  },
  {
    title: "Secure Finance Dashboard",
    category: "SaaS",
    description: "Real-time financial analytics with enterprise-grade security.",
    tech: ["React", "D3.js", "Supabase"],
    className: "md:col-span-1 md:row-span-1",
    visual: "security"
  },
  {
    title: "E-commerce Mobile App",
    category: "Mobile",
    description: "Cross-platform shopping experience.",
    tech: ["Flutter", "Firebase"],
    className: "md:col-span-1 md:row-span-1",
    visual: "mobile"
  },
  {
    title: "Creative Portfolio",
    category: "Website",
    description: "Award-winning immersive portfolio template.",
    tech: ["Framer Motion", "Next.js"],
    className: "md:col-span-2 md:row-span-1",
    visual: "creative"
  },
];

export function Work() {
  return (
    <section id="work" className="py-32 px-4 relative bg-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-white/60 max-w-xl text-lg">
              A collection of projects that define my style and capabilities.
            </p>
          </div>
       
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors ${project.className}`}
            >
              {/* Dynamic Visual Backgrounds */}
              <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />
                 
                 {project.visual === 'security' && <SecurityShieldVisual />}
                 
                 {project.visual === 'agent' && (
                    <div className="relative w-full h-full">
                        <motion.div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid grid-cols-3 gap-4 opacity-30 rotate-12 scale-125">
                                {[...Array(9)].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        className="w-16 h-16 bg-white/5 rounded-lg border border-white/10"
                                        animate={{ 
                                            y: [0, -20, 0],
                                            opacity: [0.2, 0.5, 0.2]
                                        }}
                                        transition={{ 
                                            duration: 3 + Math.random() * 2, 
                                            repeat: Infinity, 
                                            delay: i * 0.2 
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                 )}
                 
                 {project.visual === 'mobile' && (
                     <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div 
                            className="w-32 h-56 border border-white/20 rounded-4xl bg-black/40 backdrop-blur-sm"
                            animate={{ rotateY: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />
                     </div>
                 )}

                {project.visual === 'creative' && (
                     <div className="relative w-full h-full overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div 
                                key={i}
                                className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/10 rounded-full"
                                style={{ x: '-50%', y: '-50%' }}
                                animate={{ 
                                    scale: [1, 2, 1], 
                                    rotate: [0, 180, 360],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ 
                                    duration: 10 + i * 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.5 
                                }}
                            />
                        ))}
                     </div>
                 )}
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">{project.category}</span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
