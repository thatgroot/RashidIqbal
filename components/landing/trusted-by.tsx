"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ProjectCounter } from "./project-counter";

// Concrete conversion deltas next to brand names — research says
// data-driven proof beats logo-only strips by ~15% on lift. The `delta`
// field renders inline with the brand: "UpdateAI · signups +50%".
type Brand = { name: string; highlight: boolean; delta?: string };

const brands: Brand[] = [
  { name: "UpdateAI", highlight: true, delta: "signups +50%" },
  { name: "Equals", highlight: false, delta: "demo requests 2x" },
  { name: "Hevn", highlight: true, delta: "bounce −34%" },
  { name: "Relace", highlight: false, delta: "shipped in 9 days" },
  { name: "Crezco", highlight: true },
  { name: "Composio", highlight: false },
  { name: "Titan Gatequity", highlight: true },
  { name: "Melissa Ambrosini", highlight: false },
  { name: "Nick Broadhurst", highlight: true },
  { name: "Giga AI", highlight: false, delta: "demos doubled in 2 weeks" },
  { name: "AAKP", highlight: true },
  { name: "Space Dome", highlight: false },
  { name: "Ask Dialog", highlight: true },
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
                      className={`text-sm whitespace-nowrap transition-colors cursor-default ${
                        brand.highlight
                          ? "text-zinc-700"
                          : "text-zinc-400"
                      } hover:text-zinc-900`}
                    >
                      <span className="font-semibold">{brand.name}</span>
                      {brand.delta && (
                        <span className="ml-2 text-orange-600 text-[12px] font-mono">
                          · {brand.delta}
                        </span>
                      )}
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
