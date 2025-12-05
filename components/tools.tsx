"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ExternalLink } from "lucide-react";

const toolCategories = [
  {
    title: "Design & Prototyping",
    tools: [
      {
        name: "Figma",
        description: "Where ideas become interfaces",
        url: "https://figma.com",
        color: "#F24E1E"
      },
      {
        name: "Framer",
        description: "No-code that doesn't compromise",
        url: "https://framer.com",
        color: "#0055FF"
      }
    ]
  },
  {
    title: "Development",
    tools: [
      {
        name: "Next.js",
        description: "React framework for production",
        url: "https://nextjs.org",
        color: "#000000"
      },
      {
        name: "Expo",
        description: "Universal React Native apps",
        url: "https://expo.dev",
        color: "#000020"
      }
    ]
  },
  {
    title: "AI-Powered IDEs",
    tools: [
      {
        name: "Cursor",
        description: "The AI-first code editor",
        url: "https://cursor.com",
        color: "#000000"
      },
      {
        name: "Antigravity",
        description: "Google's autonomous coding agents",
        url: "https://idx.google.com",
        color: "#4285F4"
      }
    ]
  },
  {
    title: "AI App Builders",
    tools: [
      {
        name: "Lovable",
        description: "Ship full-stack apps with AI",
        url: "https://lovable.dev",
        color: "#FF6B6B"
      },
      {
        name: "Bolt",
        description: "Prompt to production in seconds",
        url: "https://bolt.new",
        color: "#1389FD"
      },
      {
        name: "Base44",
        description: "Build apps without limits",
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
              <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4 block">
                Stack
              </span>
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Tools I Work With.
              </h2>
              <p className="text-lg text-zinc-500">
                A curated toolkit of design platforms, frameworks, and AI-powered tools that help me ship faster without sacrificing quality.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        {/* Tool Categories */}
        {toolCategories.map((category) => (
          <div key={category.title}>
            {/* Category Header */}
            <GridContainer>
              <GridItem padding={false} className="py-4 px-8 sm:px-12 border-t border-zinc-100">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  {category.title}
                </span>
              </GridItem>
            </GridContainer>

            {/* Tools Grid */}
            <GridContainer cols={category.tools.length > 2 ? 3 : 2}>
              {category.tools.map((tool, toolIndex) => (
                <motion.a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: toolIndex * 0.1 }}
                  className="block"
                >
                  <GridItem padding={false} className="h-full group">
                    <div className="p-8 sm:p-12 h-full flex flex-col">
                      {/* Tool Icon/Logo Placeholder */}
                      <div className="flex items-start justify-between mb-8">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: tool.color }}
                        >
                          {tool.name.charAt(0)}
                        </div>
                        <ExternalLink 
                          className="w-4 h-4 text-zinc-300 group-hover:text-orange-500 transition-colors" 
                          aria-hidden="true"
                        />
                      </div>
                      
                      {/* Tool Name */}
                      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">
                        {tool.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-zinc-500">
                        {tool.description}
                      </p>
                    </div>
                  </GridItem>
                </motion.a>
              ))}
            </GridContainer>
          </div>
        ))}

        {/* Footer Note */}
        <GridContainer>
          <GridItem className="py-16">
            <motion.p
              className="text-sm text-zinc-400 max-w-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              The right tool for the right job. I stay current with emerging technologies to deliver modern, performant solutions.
            </motion.p>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}

