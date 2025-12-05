"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { useState } from "react";

// SVG Logo Components
const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" className="w-6 h-9" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const FramerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 180 180" className="w-7 h-7" fill="none">
    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
      <circle cx="90" cy="90" r="90" fill="black"/>
      <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461A90.06 90.06 0 01149.508 157.52z" fill="url(#paint0_linear)"/>
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ExpoLogo = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
    <path d="M16.001 2.667c.427 0 .853.12 1.227.36l.107.073 10.4 7.28a2.64 2.64 0 011.173 1.907l.012.18v7.066c0 .773-.4 1.48-1.053 1.893l-.133.08-10.4 5.867a2.64 2.64 0 01-2.507.08l-.133-.08-10.4-5.867a2.24 2.24 0 01-1.173-1.787l-.012-.186v-7.066c0-.76.387-1.467 1.027-1.88l.133-.093.107-.067 10.4-7.28c.373-.253.8-.387 1.227-.4zm0 2.666l-9.6 6.72v6.214l9.6 5.413 9.6-5.413v-6.214l-9.6-6.72z"/>
  </svg>
);

const CursorLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M5.5 3.21V20.8l6.68-4.62 2.08 6.82h2.73l-2.08-6.82h5.59L5.5 3.21z"/>
  </svg>
);

const BoltLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const LovableLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Base44Logo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const categories = [
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Figma", desc: "Collaborative interface design", url: "https://figma.com", Logo: FigmaLogo },
      { name: "Framer", desc: "No-code production sites", url: "https://framer.com", Logo: FramerLogo }
    ]
  },
  {
    id: "development",
    label: "Development",
    tools: [
      { name: "Next.js", desc: "React framework for the web", url: "https://nextjs.org", Logo: NextLogo },
      { name: "Expo", desc: "Universal native apps", url: "https://expo.dev", Logo: ExpoLogo }
    ]
  },
  {
    id: "ai-ides",
    label: "AI IDEs",
    tools: [
      { name: "Cursor", desc: "AI-first code editor", url: "https://cursor.com", Logo: CursorLogo },
      { name: "Antigravity", desc: "Google's AI coding agents", url: "https://idx.google.com", Logo: AntigravityLogo }
    ]
  },
  {
    id: "ai-builders",
    label: "AI Builders",
    tools: [
      { name: "Lovable", desc: "Full-stack apps from prompts", url: "https://lovable.dev", Logo: LovableLogo },
      { name: "Bolt", desc: "Instant web apps", url: "https://bolt.new", Logo: BoltLogo },
      { name: "Base44", desc: "AI-powered app platform", url: "https://base44.com", Logo: Base44Logo }
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
              <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4 block">
                Stack
              </span>
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Tools I Work With.
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl mb-12">
                A curated toolkit that helps me ship faster without sacrificing quality.
              </p>

              {/* macOS-style Window */}
              <div className="max-w-3xl">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 shadow-xl overflow-hidden">
                  {/* Window Title Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 border-b border-zinc-200">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-zinc-500 font-medium">tools.config</span>
                    </div>
                    <div className="w-14" /> {/* Spacer for symmetry */}
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-zinc-200 bg-white">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                          activeTab === category.id 
                            ? 'text-zinc-900' 
                            : 'text-zinc-500 hover:text-zinc-700'
                        }`}
                      >
                        {category.label}
                        {activeTab === category.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white min-h-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid gap-4"
                      >
                        {activeCategory?.tools.map((tool, i) => (
                          <motion.a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-lg border border-zinc-100 bg-zinc-50/50 hover:bg-orange-50 hover:border-orange-200 transition-all group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 group-hover:border-orange-300 group-hover:text-orange-600 transition-colors">
                              <tool.Logo />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                                {tool.name}
                              </h4>
                              <p className="text-sm text-zinc-500">{tool.desc}</p>
                            </div>
                            <div className="text-zinc-300 group-hover:text-orange-400 transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </motion.a>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer note */}
                <p className="text-xs text-zinc-400 mt-4 text-center">
                  Click any tool to visit its official site →
                </p>
              </div>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
