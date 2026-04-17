"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    client: "Composio",
    problem: "Complex AI agent infrastructure needed to feel simple enough for developers to sign up on first visit.",
    solution: "Designed the full site in Figma with tight product messaging across three offerings. Built on Framer.",
    result: "Clean positioning across 3 product lines",
    detail: "YC-backed platform connecting AI agents to 1,000+ apps.",
    link: "https://composio.dev",
    tags: ["Figma", "Framer", "DevTools"],
  },
  {
    client: "Crezco",
    problem: "FCA-regulated payments API needed a site that made complex fintech feel simple and trustworthy.",
    solution: "Wrote copy that translates payment infrastructure into clear business benefits. Built on Framer with product demos.",
    result: "Sales team confident sending prospects to the site",
    detail: "UK-regulated Electronic Money Institution with embedded payables.",
    link: "https://www.crezco.com",
    tags: ["Figma", "Framer", "Fintech"],
  },
  {
    client: "Vanos AI",
    problem: "Enterprise voice AI startup needed a site for government, defense, and healthcare buyers.",
    solution: "Designed a high-fidelity platform showcase in Figma. Built on Framer with V2V and V2A sections.",
    result: "Enterprise-grade site that secured early leads",
    detail: "San Francisco voice AI company for mission-critical workflows.",
    link: "https://vanos.ai",
    tags: ["Figma", "Framer", "AI / Enterprise"],
  },
];

export function CaseStudies() {
  return (
    <section className="bg-white" id="case-studies">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6 leading-[1.1]">
                Proof, not pitches.
              </h2>
              <p className="text-lg text-zinc-500">
                Three live sites I designed, wrote the copy for, and built. Click through and see the work yourself.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={3}>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: i * 0.12 } },
              }}
            >
              <GridItem className="flex flex-col h-full">
                {/* Client + Link */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <h3 className="text-xl font-bold text-zinc-900">{c.client}</h3>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-orange-500 transition-colors"
                    aria-label={`Visit ${c.client} website`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Problem */}
                <motion.div
                  className="mb-4"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Problem</span>
                  <p className="text-sm text-zinc-600 mt-1">{c.problem}</p>
                </motion.div>

                {/* What I Did */}
                <motion.div
                  className="mb-4"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">What I Did</span>
                  <p className="text-sm text-zinc-600 mt-1">{c.solution}</p>
                </motion.div>

                {/* Result */}
                <motion.div
                  className="mb-6 flex-1"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="text-[10px] font-mono text-orange-500 uppercase tracking-wider">Result</span>
                  <p className="text-base font-bold text-zinc-900 mt-1">{c.result}</p>
                  <p className="text-xs text-zinc-500 mt-1">{c.detail}</p>
                </motion.div>

                {/* Tags */}
                <motion.div
                  className="flex gap-2 pt-4 border-t border-zinc-100"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  {c.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </GridItem>
            </motion.div>
          ))}
        </GridContainer>
      </div>
    </section>
  );
}
