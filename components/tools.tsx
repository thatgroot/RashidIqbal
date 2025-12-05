"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ExternalLink } from "lucide-react";

const tools = [
  {
    category: "Design",
    items: [
      { 
        name: "Figma", 
        desc: "Collaborative interface design", 
        url: "https://figma.com",
        color: "#F24E1E"
      },
      { 
        name: "Framer", 
        desc: "No-code production sites", 
        url: "https://framer.com",
        color: "#0055FF"
      }
    ]
  },
  {
    category: "Development",
    items: [
      { 
        name: "Next.js", 
        desc: "React framework for the web", 
        url: "https://nextjs.org",
        color: "#000000"
      },
      { 
        name: "Expo", 
        desc: "Universal native apps", 
        url: "https://expo.dev",
        color: "#000020"
      }
    ]
  },
  {
    category: "AI IDEs",
    items: [
      { 
        name: "Cursor", 
        desc: "AI-first code editor", 
        url: "https://cursor.com",
        color: "#000000"
      },
      { 
        name: "Antigravity", 
        desc: "Google's AI coding agents", 
        url: "https://idx.google.com",
        color: "#4285F4"
      }
    ]
  },
  {
    category: "AI Builders",
    items: [
      { 
        name: "Lovable", 
        desc: "Full-stack apps from prompts", 
        url: "https://lovable.dev",
        color: "#FF6B6B"
      },
      { 
        name: "Bolt", 
        desc: "Instant web apps", 
        url: "https://bolt.new",
        color: "#1389FD"
      },
      { 
        name: "Base44", 
        desc: "AI-powered app platform", 
        url: "https://base44.com",
        color: "#6366F1"
      }
    ]
  }
];

export function Tools() {
  return (
    <section className="bg-white" id="tools">
      <div className="max-w-container border-l border-zinc-100">
        {/* Header */}
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Tools I Work With.
              </h2>
              <p className="text-lg text-zinc-500">
                A curated toolkit of design platforms, frameworks, and AI-powered tools that help me ship faster.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        {/* Tools Grid - Matching site's 4-column layout */}
        {tools.map((category) => (
          <div key={category.category}>
            {/* Category Label Row */}
            <GridContainer>
              <GridItem padding={false} className="px-8 sm:px-12 py-4 border-t border-zinc-100">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {category.category}
                </span>
              </GridItem>
            </GridContainer>

            {/* Tools in Category */}
            <GridContainer cols={category.items.length > 2 ? 3 : 2}>
              {category.items.map((tool, i) => (
                <motion.a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="block group"
                >
                  <GridItem padding={false} className="h-full">
                    <div className="p-8 sm:p-12 h-full flex flex-col">
                      {/* Top Row: Color dot + External link */}
                      <div className="flex items-center justify-between mb-6">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tool.color }}
                        />
                        <ExternalLink 
                          className="w-4 h-4 text-zinc-200 group-hover:text-orange-500 transition-colors" 
                          aria-hidden="true"
                        />
                      </div>
                      
                      {/* Tool Name */}
                      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">
                        {tool.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-zinc-500">
                        {tool.desc}
                      </p>
                    </div>
                  </GridItem>
                </motion.a>
              ))}
            </GridContainer>
          </div>
        ))}

        {/* Bottom CTA */}
        <GridContainer>
          <GridItem className="py-16">
            <motion.p
              className="text-sm text-zinc-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The right tool for the right job. Always exploring what&apos;s next.
            </motion.p>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
