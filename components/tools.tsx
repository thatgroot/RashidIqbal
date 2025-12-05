"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

const categories = [
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Figma", desc: "Collaborative interface design", url: "https://figma.com", color: "#F24E1E" },
      { name: "Framer", desc: "No-code production sites", url: "https://framer.com", color: "#0055FF" }
    ]
  },
  {
    id: "development",
    label: "Development",
    tools: [
      { name: "Next.js", desc: "React framework for the web", url: "https://nextjs.org", color: "#000000" },
      { name: "Expo", desc: "Universal native apps", url: "https://expo.dev", color: "#000020" }
    ]
  },
  {
    id: "ai-ides",
    label: "AI IDEs",
    tools: [
      { name: "Cursor", desc: "AI-first code editor", url: "https://cursor.com", color: "#000000" },
      { name: "Antigravity", desc: "Google's AI coding agents", url: "https://idx.google.com", color: "#4285F4" }
    ]
  },
  {
    id: "ai-builders",
    label: "AI Builders",
    tools: [
      { name: "Lovable", desc: "Full-stack apps from prompts", url: "https://lovable.dev", color: "#FF6B6B" },
      { name: "Bolt", desc: "Instant web apps", url: "https://bolt.new", color: "#1389FD" },
      { name: "Base44", desc: "AI-powered app platform", url: "https://base44.com", color: "#6366F1" }
    ]
  }
];

export function Tools() {
  const [activeTab, setActiveTab] = useState("design");
  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <section className="bg-white" id="tools">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Tools I Work With.
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl mb-12">
                A curated toolkit that helps me ship faster without sacrificing quality.
              </p>

              {/* Window - Styled to match site aesthetic */}
              <div className="max-w-3xl">
                <div className="border border-zinc-200 overflow-hidden">
                  {/* Window Title Bar - Minimal */}
                  <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-zinc-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      stack.config
                    </span>
                    <div className="w-12" />
                  </div>

                  {/* Tabs - Clean style */}
                  <div className="flex border-b border-zinc-200 bg-white">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`relative px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                          activeTab === category.id 
                            ? 'text-zinc-900' 
                            : 'text-zinc-400 hover:text-zinc-600'
                        }`}
                      >
                        {category.label}
                        {activeTab === category.id && (
                          <motion.div
                            layoutId="toolsActiveTab"
                            className="absolute bottom-0 left-0 right-0 h-px bg-orange-500"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="bg-white">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {activeCategory?.tools.map((tool, i) => (
                          <motion.a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 p-5 border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors group"
                          >
                            {/* Color indicator */}
                            <div 
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: tool.color }}
                            />
                            
                            {/* Tool info */}
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-zinc-900 group-hover:text-orange-500 transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-zinc-300 mx-3">—</span>
                              <span className="text-sm text-zinc-500">{tool.desc}</span>
                            </div>
                            
                            {/* Link icon */}
                            <ExternalLink 
                              className="w-4 h-4 text-zinc-200 group-hover:text-orange-500 transition-colors shrink-0" 
                              aria-hidden="true"
                            />
                          </motion.a>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-zinc-400 mt-4">
                  The right tool for the right job. Always exploring what&apos;s next.
                </p>
              </div>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
