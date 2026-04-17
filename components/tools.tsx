"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

// --- Icon Components with Real Logos ---

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

function FramerIconSvg({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z" fill="white" stroke="#e4e4e7" strokeWidth="1"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9 20.3335H16V27.0002L9 20.3335Z" fill="#0055FF"/>
            <path d="M16 13.6665H9V20.3332H23L16 13.6665Z" fill="#00AAFF"/>
            <path d="M9 7L16 13.6667H23V7H9Z" fill="#88DDFF"/>
        </svg>
    );
}

function NextJsIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_tools_nextjs" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="black"/>
            </mask>
            <g mask="url(#mask0_tools_nextjs)">
                <circle cx="90" cy="90" r="90" fill="black"/>
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_tools_nextjs)"/>
                <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_tools_nextjs)"/>
            </g>
            <defs>
                <linearGradient id="paint0_linear_tools_nextjs" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear_tools_nextjs" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

function ExpoIconSvg({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.292 15.547c1.968 0.131 3.729-1.213 4.115-3.145-0.475-0.735-1.287-1.177-2.161-1.177-2.272-0.052-3.491 2.651-1.953 4.323zM15.115 4.697l5.359-3.104-1.708-0.963-7.391 4.281 0.589 0.328 1.119 0.629 2.032-1.176zM21.161 1.307c0.089 0.027 0.161 0.1 0.188 0.188l2.484 7.593c0.047 0.131-0.005 0.272-0.125 0.344-1.968 1.156-2.916 3.489-2.317 5.693 0.656 2.391 2.937 3.953 5.401 3.703 0.135-0.011 0.265 0.073 0.307 0.203l2.563 7.803c0.041 0.131-0.011 0.271-0.125 0.344l-7.859 4.771c-0.037 0.021-0.084 0.036-0.131 0.036-0.068 0.016-0.14 0-0.203-0.041l-2.765-1.797c-0.048-0.031-0.084-0.077-0.109-0.129l-5.396-12.896-8.219 4.875c-0.016 0.011-0.037 0.021-0.052 0.032-0.084 0.036-0.183 0.025-0.261-0.021l-1.859-1.093c-0.136-0.073-0.188-0.245-0.115-0.381l7.953-15.749c0.025-0.057 0.077-0.104 0.135-0.131l7.959-4.609c0.088-0.052 0.197-0.057 0.292-0.005zM12.839 6.407l-1.932-1.089-7.693 15.229 1.396 0.823 6.631-9.015c0.063-0.089 0.167-0.136 0.271-0.12 0.104 0.011 0.192 0.077 0.235 0.177l7.228 17.296 1.933 1.251-8.063-24.552zM26.245 16.964c-2.256 0-3.787-2.292-2.923-4.376 0.86-2.083 3.563-2.619 5.156-1.025 0.595 0.593 0.928 1.396 0.928 2.235 0.005 1.749-1.412 3.167-3.161 3.167z"/>
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

function BoltIconSvg({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="4" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.64368 11.7731C7.91976 11.7731 7.20901 11.5147 6.80099 10.9591L6.65707 11.6143L4 13L4.28684 11.6143L6.22186 3H8.59103L7.9066 6.03634C8.45941 5.44199 8.97273 5.22234 9.63083 5.22234C11.0523 5.22234 12 6.1397 12 7.81938C12 9.55074 10.9076 11.7731 8.64368 11.7731ZM9.55186 8.31036C9.55186 9.11144 8.97273 9.71871 8.22249 9.71871C7.8013 9.71871 7.4196 9.56366 7.16952 9.29233L7.53806 7.70309C7.81447 7.43176 8.13036 7.27671 8.49889 7.27671C9.06486 7.27671 9.55186 7.69017 9.55186 8.31036Z" fill="white"/>
        </svg>
    );
}

function LovableIconSvg({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lovable-gradient-tools" x1="7.736" x2="15.072" y1="4.218" y2="23.867" gradientUnits="userSpaceOnUse">
                    <stop offset="0.025" stopColor="#FF8E63"/>
                    <stop offset="0.56" stopColor="#FF7EB0"/>
                    <stop offset="0.95" stopColor="#4B73FF"/>
                </linearGradient>
                <filter id="lovable-filter-c-tools" width="45.444" height="46.274" x="-12.638" y="-10.326" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur result="effect1" stdDeviation="3.58"/>
                </filter>
                <filter id="lovable-filter-d-tools" width="54.181" height="46.274" x="-15.297" y="-19.094" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur result="effect1" stdDeviation="3.58"/>
                </filter>
                <filter id="lovable-filter-e-tools" width="45.444" height="42.383" x="-7.677" y="-20.154" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur result="effect1" stdDeviation="3.58"/>
                </filter>
                <filter id="lovable-filter-f-tools" width="33.038" height="33.538" x="-4.448" y="-12.73" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur result="effect1" stdDeviation="3.58"/>
                </filter>
                <mask id="lovable-mask-tools" width="23" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{maskType: "alpha"}}>
                    <path fill="url(#lovable-gradient-tools)" fillRule="evenodd" d="M6.898 0c3.81 0 6.898 3.179 6.898 7.1v2.7h2.295c3.81 0 6.898 3.178 6.898 7.1S19.901 24 16.091 24H0V7.1C0 3.18 3.088 0 6.898 0" clipRule="evenodd"/>
                </mask>
            </defs>
            <g mask="url(#lovable-mask-tools)">
                <g filter="url(#lovable-filter-c-tools)">
                    <ellipse cx="10.084" cy="12.811" fill="#4B73FF" rx="15.562" ry="15.977"/>
                </g>
                <g filter="url(#lovable-filter-d-tools)">
                    <ellipse cx="11.794" cy="4.043" fill="#FF66F4" rx="19.931" ry="15.977"/>
                </g>
                <g filter="url(#lovable-filter-e-tools)">
                    <ellipse cx="15.045" cy="1.037" fill="#FF0105" rx="15.562" ry="14.031"/>
                </g>
                <g filter="url(#lovable-filter-f-tools)">
                    <ellipse cx="12.071" cy="4.039" fill="#FE7B02" rx="9.359" ry="9.608"/>
                </g>
            </g>
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

function Base44IconImg({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Image 
                src="/icons/base44.png" 
                alt="Base44" 
                width={24} 
                height={24}
                className="w-full h-full object-contain"
            />
        </div>
    );
}

// --- Data ---

const categories = [
  {
    id: "design",
    label: "Design",
    tools: [
      { name: "Figma", desc: "Collaborative interface design", url: "https://figma.com", icon: FigmaIcon },
      { name: "Framer", desc: "No-code production sites", url: "https://framer.com", icon: FramerIconSvg }
    ]
  },
  {
    id: "development",
    label: "Development",
    tools: [
      { name: "Next.js", desc: "React framework for the web", url: "https://nextjs.org", icon: NextJsIcon },
      { name: "Expo", desc: "Universal native apps", url: "https://expo.dev", icon: ExpoIconSvg }
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
      { name: "Lovable", desc: "Apps & websites by chatting with AI", url: "https://lovable.dev", icon: LovableIconSvg },
      { name: "Bolt", desc: "The #1 vibe coding tool", url: "https://bolt.new", icon: BoltIconSvg },
      { name: "Base44", desc: "Build apps in minutes with words", url: "https://base44.com", icon: Base44IconImg }
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
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-zinc-100">
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/20 border border-red-400/50" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/20 border border-amber-400/50" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400/20 border border-green-400/50" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      stack.config
                    </span>
                    <div className="w-8 sm:w-12" />
                  </div>

                  {/* Tabs - Responsive with horizontal scroll on mobile */}
                  <div className="flex border-b border-zinc-100 bg-zinc-50/50 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`relative px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                          activeTab === category.id 
                            ? 'text-zinc-900 font-medium' 
                            : 'text-zinc-500 hover:text-zinc-700'
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
                  <div className="bg-white min-h-[220px] sm:min-h-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="divide-y divide-zinc-50"
                      >
                        {activeCategory?.tools.map((tool) => (
                          <motion.a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 sm:gap-6 px-4 sm:px-8 py-4 sm:py-6 hover:bg-zinc-50/50 transition-all group"
                          >
                            {/* Icon Container */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-zinc-50 rounded-lg border border-zinc-100 group-hover:border-zinc-200 group-hover:scale-105 transition-all shadow-sm shrink-0">
                                <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" />
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
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-1 text-[10px] sm:text-xs text-zinc-400 font-mono">
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
