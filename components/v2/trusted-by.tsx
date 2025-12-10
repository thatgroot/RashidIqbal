"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";

const brands = [
  { name: "UpdateAI", highlight: true },
  { name: "Lean Scale", highlight: false },
  { name: "Funnel Labs", highlight: true },
  { name: "Melissa Ambrosini", highlight: false },
  { name: "Nick Broadhurst", highlight: false },
  { name: "uToura", highlight: true },
  { name: "SkarduApp", highlight: false },
  { name: "ROAD iD", highlight: true },
  { name: "Deals Finders", highlight: false },
  { name: "Saku Monsters", highlight: false },
  { name: "Scorch Token", highlight: true },
  { name: "Pedro Token", highlight: false },
];

export function TrustedByV2() {
  return (
    <section className="bg-zinc-50/50">
      <div className="max-w-container border-x border-zinc-100">
        <GridContainer>
          <GridItem className="py-6 md:py-8" padding={false}>
            <div className="flex flex-col md:flex-row items-center gap-6 px-6 md:px-8">
              {/* Label */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Trusted by 50+ companies
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
      </div>
    </section>
  );
}
