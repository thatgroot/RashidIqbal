"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    client: "UpdateAI",
    problem: "Outdated SaaS website wasn't converting enterprise leads.",
    solution: "Full Figma redesign with new UX copy. Rebuilt on Framer with CMS.",
    result: "Onboarding signups up 50%",
    detail: "Acquired by Gainsight shortly after launch.",
    link: "https://update.ai",
    tags: ["Figma", "Framer", "UX Copy"],
  },
  {
    client: "Crezco",
    problem: "Complex fintech product needed a site that felt simple and trustworthy.",
    solution: "Designed the full marketing site in Figma. Wrote conversion-focused copy for every page. Built on Framer.",
    result: "Sales team finally proud to send prospects to the site",
    detail: "Open banking payments platform.",
    link: "https://www.crezco.com",
    tags: ["Figma", "Framer", "Fintech"],
  },
  {
    client: "Nick Broadhurst",
    problem: "Needed a personal brand site for a new music release. Had 10 days.",
    solution: "Designed in Figma, built on Framer. Focused on speed and Lighthouse scores.",
    result: "90+ Lighthouse score. Shipped in 9 days.",
    detail: "Australian musician and creator.",
    link: "https://iamnickbroadhurst.com",
    tags: ["Figma", "Framer", "Personal Brand"],
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
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                Real Projects. Real Results.
              </h2>
              <p className="text-lg text-zinc-500">
                Not mockups. Not concepts. These are live sites I designed, wrote the copy for, and built. Here&apos;s what happened.
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
