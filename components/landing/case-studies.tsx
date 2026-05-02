"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ArrowUpRight } from "lucide-react";

// Default fallback. CMS-published case studies (passed via the `items`
// prop) override this list when present.
const DEFAULT_CASES = [
  {
    client: "UpdateAI",
    result: "Onboarding signups +50% in 60 days.",
    detail: "AI meeting notes for customer-success teams.",
    link: "https://www.update.ai",
    tags: ["SaaS", "AI", "CS"],
  },
  {
    client: "Vanos AI",
    result: "Weekly active developers in docs 2× in 30 days.",
    detail: "Autonomous orchestration tooling for AI engineers.",
    link: "https://vanos.ai",
    tags: ["AI", "Developer tools"],
  },
  {
    client: "SpaceDome",
    result: "Sign-ups from the homepage 3× in 6 weeks.",
    detail: "Immersive spatial workspaces for hybrid teams.",
    link: "https://spacedome.ai",
    tags: ["B2B SaaS", "Category creation"],
  },
];

export type CaseStudyCard = {
  client: string;
  problem?: string;
  solution?: string;
  result: string;
  detail?: string;
  link: string;
  tags: string[];
};

export function CaseStudies({ items }: { items?: CaseStudyCard[] }) {
  // Use CMS rows when present; otherwise fall back to hardcoded so the
  // homepage never goes empty during a deploy.
  const cases = items && items.length > 0 ? items : DEFAULT_CASES;
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
              className="h-full"
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

                {/* Result — first metric or one-line outcome from CMS. */}
                <motion.div
                  className="flex-1"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="text-[10px] font-mono text-orange-500 uppercase tracking-wider">Result</span>
                  <p className="text-base text-zinc-700 leading-relaxed mt-1">{c.result}</p>
                  {c.detail && <p className="text-xs text-zinc-500 mt-1">{c.detail}</p>}
                </motion.div>
              </GridItem>
            </motion.div>
          ))}
        </GridContainer>
      </div>
    </section>
  );
}
