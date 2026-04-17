"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ProjectCounter } from "./project-counter";

const brands = [
  { name: "Crezco", highlight: true },
  { name: "UpdateAI", highlight: false },
  { name: "Composio", highlight: true },
  { name: "Titan Gatequity", highlight: false },
  { name: "Melissa Ambrosini", highlight: true },
  { name: "Nick Broadhurst", highlight: false },
  { name: "Vanos AI", highlight: true },
  { name: "Giga AI", highlight: false },
  { name: "AAKP", highlight: true },
  { name: "Tandem BI", highlight: false },
  { name: "Space Dome", highlight: true },
  { name: "Ask Dialog", highlight: false },
];

export function TrustedBy() {
  return (
    <section id="work" className="bg-zinc-50/50 scroll-mt-16">
      <div className="max-w-container border-x border-zinc-100">
        <GridContainer>
          <GridItem className="py-6 md:py-8" padding={false}>
            <div className="flex flex-col md:flex-row items-center gap-6 px-6 md:px-8">
              {/* Label */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Shipped for YC startups &amp; indie creators
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-zinc-200" />

              {/* Scrolling Logos */}
              <div className="flex-1 w-full overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-50/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-50/50 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex items-center gap-8 md:gap-12 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                >
                  {[...brands, ...brands].map((brand, i) => (
                    <span
                      key={i}
                      className={`text-sm font-semibold whitespace-nowrap transition-colors cursor-default ${
                        brand.highlight
                          ? "text-zinc-700"
                          : "text-zinc-400"
                      } hover:text-zinc-900`}
                    >
                      {brand.name}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </GridItem>
        </GridContainer>

        {/* Project Stats Counter */}
        <ProjectCounter />
      </div>
    </section>
  );
}
