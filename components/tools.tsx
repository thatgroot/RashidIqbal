"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

// --- Icons ---

function FigmaIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.2533 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.2533 19 9.5 19H19V0H9.5C4.2533 0 0 4.2533 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.2533 38 9.5 38H19V19H9.5C4.2533 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
    );
}

function FramerIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0H12V8L4 0Z" fill="#000"/>
            <path d="M12 8H20V16H4L12 8Z" fill="#000"/>
            <path d="M12 16H20V24L12 16Z" fill="#000"/>
        </svg>
    );
}

function NextJsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1_2" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="black"/>
            </mask>
            <g mask="url(#mask0_1_2)">
                <circle cx="90" cy="90" r="90" fill="black"/>
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_1_2)"/>
                <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_1_2)"/>
            </g>
            <defs>
                <linearGradient id="paint0_linear_1_2" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1_2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

function ExpoIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5766 11.2663C18.9557 11.3581 20.1898 10.4162 20.4603 9.06229C20.1275 8.54719 19.5585 8.23747 18.946 8.23747C17.3542 8.20103 16.5 10.0956 17.5766 11.2663ZM11.1472 3.66421L14.9016 1.48907L13.705 0.814331L8.52686 3.81433L8.93952 4.04412L9.72353 4.48484L11.1472 3.66421ZM15.3828 1.28925C15.4452 1.30817 15.4956 1.35932 15.5145 1.42098L17.2547 6.74073C17.2876 6.83251 17.2511 6.93131 17.167 6.98177C15.7879 7.5508 15.1237 9.1852 15.5433 10.7296C16.003 12.405 17.682 13.4847 19.3673 13.3095C19.4619 13.3018 19.553 13.3606 19.5824 13.4517L21.378 18.919L21.4067 18.9392L15.9005 22.2823C15.8746 22.297 15.8417 22.3075 15.8087 22.3075C15.7611 22.3187 15.7107 22.3075 15.6665 22.2788L13.7291 21.2589C13.6955 21.2372 13.6702 21.205 13.6527 21.1692L13.6072 21.0712L13.6114 16.6778L13.6177 12.2816L13.6856 12.1961C13.7207 12.1501 13.7952 12.091 13.8478 12.0625C13.9377 12.0187 13.9728 12.0143 14.3519 12.0143C14.7991 12.0143 14.8736 12.0318 14.9898 12.1589C15.0227 12.194 16.239 14.0261 17.6941 16.2327L19.164 19.2875L20.9392 21.775L21.029 21.7159C21.8247 21.1987 22.6662 20.4623 23.3324 19.6953C24.7504 18.0671 25.6644 16.0816 25.9712 13.9648C26.0611 13.349 26.072 13.1671 26.072 12.3373C26.072 11.503 26.0611 11.3211 25.9712 10.7053C25.3619 6.49533 22.3659 2.95827 18.3027 1.6477C17.586 1.41539 16.8232 1.2554 15.9685 1.15899C15.7581 1.13708 15.3092 1.113 15.1273 1.13052C15.0797 1.1349 14.9259 1.14804 14.7879 1.15899C14.755 1.16118 15.0227 1.21813 15.3828 1.28925ZM9.55318 4.86265L8.19917 4.09946L2.80877 14.77L3.78696 15.3466L8.43296 8.4524C8.47712 8.39 8.55002 8.35714 8.62292 8.36809C8.69582 8.37576 8.7575 8.42176 8.78764 8.48637L13.8532 17.1677L15.2072 17.9309L9.55318 4.86265ZM18.9446 12.2619C17.3635 12.2254 16.5092 14.12 17.5857 15.2907C18.9648 15.3825 20.1989 14.4407 20.4694 13.0867C20.1366 12.5716 19.5676 12.2619 18.9551 12.2619H18.9446Z" />
        </svg>
    );
}

function CursorIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"/>
        </svg>
    );
}

function BoltIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 21L15 11H9L13 1H7L3 13H9L5 21H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function LovableIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6B6B"/>
        </svg>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
    );
}

function Base44Icon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#F97316"/>
            <path d="M7 17L12 7L17 17H14L12 12L10 17H7Z" fill="white"/>
        </svg>
    );
}

// --- Data ---

const categories = [
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Figma", desc: "Collaborative interface design", url: "https://figma.com", icon: FigmaIcon },
      { name: "Framer", desc: "No-code production sites", url: "https://framer.com", icon: FramerIcon }
    ]
  },
  {
    id: "development",
    label: "Development",
    tools: [
      { name: "Next.js", desc: "React framework for the web", url: "https://nextjs.org", icon: NextJsIcon },
      { name: "Expo", desc: "Universal native apps", url: "https://expo.dev", icon: ExpoIcon }
    ]
  },
  {
    id: "ai-ides",
    label: "AI IDEs",
    tools: [
      { name: "Cursor", desc: "AI-first code editor", url: "https://cursor.com", icon: CursorIcon },
      { name: "Antigravity", desc: "Google's AI coding agents", url: "https://idx.google.com", icon: GoogleIcon }
    ]
  },
  {
    id: "ai-builders",
    label: "AI Builders",
    tools: [
      { name: "Lovable", desc: "Apps & websites by chatting with AI", url: "https://lovable.dev", icon: LovableIcon },
      { name: "Bolt", desc: "The #1 vibe coding tool", url: "https://bolt.new", icon: BoltIcon },
      { name: "Base44", desc: "Build apps in minutes with words", url: "https://base44.com", icon: Base44Icon }
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
          <GridItem className="py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Tools I Work With.
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl mb-16">
                A curated toolkit that helps me ship faster without sacrificing quality.
              </p>

              {/* Window - Styled to match site aesthetic */}
              <div className="max-w-3xl">
                <div className="border border-zinc-200 overflow-hidden bg-zinc-50/50 rounded-xl shadow-xs">
                  {/* Window Title Bar - Minimal */}
                  <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-100">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/20 border border-green-400/50" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      stack.config
                    </span>
                    <div className="w-12" />
                  </div>

                  {/* Tabs - Clean style with more spacing */}
                  <div className="flex border-b border-zinc-100 bg-zinc-50/50 px-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`relative px-6 py-4 text-xs font-mono uppercase tracking-wider transition-colors ${
                          activeTab === category.id 
                            ? 'text-zinc-900 font-medium' 
                            : 'text-zinc-400 hover:text-zinc-600'
                        }`}
                      >
                        {category.label}
                        {activeTab === category.id && (
                          <motion.div
                            layoutId="toolsActiveTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Content - More vertical padding */}
                  <div className="bg-white min-h-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="divide-y divide-zinc-50"
                      >
                        {activeCategory?.tools.map((tool, i) => (
                          <motion.a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 px-8 py-6 hover:bg-zinc-50/50 transition-all group"
                          >
                            {/* Icon Container */}
                            <div className="w-12 h-12 flex items-center justify-center bg-zinc-50 rounded-lg border border-zinc-100 group-hover:border-zinc-200 group-hover:scale-105 transition-all shadow-sm">
                                <tool.icon className="w-6 h-6" />
                            </div>
                            
                            {/* Tool info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-semibold text-zinc-900 group-hover:text-orange-500 transition-colors">
                                    {tool.name}
                                </span>
                              </div>
                              <span className="text-sm text-zinc-500">{tool.desc}</span>
                            </div>
                            
                            {/* Link icon */}
                            <ExternalLink 
                              className="w-4 h-4 text-zinc-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" 
                              aria-hidden="true"
                            />
                          </motion.a>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <p>The right tool for the right job.</p>
                    <p>Always exploring what&apos;s next.</p>
                </div>
              </div>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
