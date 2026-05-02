"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ProjectCounter } from "./project-counter";

// Concrete conversion deltas next to brand names — research says
// data-driven proof beats logo-only strips by ~15% on lift. The `delta`
// field renders inline with the brand. Every brand carries an optional
// `url` so the strip becomes verifiable: each click takes the visitor
// to the live site Rashid actually shipped.
type Brand = {
  name: string;
  highlight: boolean;
  delta?: string;
  url?: string;
};

const brands: Brand[] = [
  { name: "UpdateAI", highlight: true, delta: "signups +50%", url: "https://www.update.ai" },
  { name: "Equals", highlight: false, delta: "demo requests 2x", url: "https://equals.com" },
  { name: "Hevn", highlight: true, delta: "bounce −34%", url: "https://gethevn.com" },
  { name: "Relace", highlight: false, delta: "shipped in 9 days", url: "https://relace.ai" },
  { name: "Cartage", highlight: true, url: "https://cartage.ai" },
  { name: "Solidroad", highlight: false, url: "https://solidroad.com" },
  { name: "Karumi", highlight: true, url: "https://karumi.ai" },
  { name: "Liftoff", highlight: false, url: "https://liftoff.xyz" },
  { name: "Keel", highlight: true, url: "https://keel.so" },
  { name: "Circleback", highlight: false, url: "https://circleback.ai" },
  { name: "Pageloop", highlight: true, url: "https://pageloop.ai" },
  { name: "ATQLeads", highlight: false, delta: "2 closed-won wk 1", url: "https://atqleads.com" },
  { name: "Localyzer", highlight: true, url: "https://localyzer.io" },
  { name: "Vanos AI", highlight: false, delta: "weekly devs 2x", url: "https://vanos.ai" },
  { name: "SpaceDome", highlight: true, delta: "signups 3x", url: "https://spacedome.ai" },
  { name: "Crezco", highlight: false, url: "https://crezco.co.uk" },
  { name: "Composio", highlight: true, url: "https://composio.dev" },
  { name: "Giga AI", highlight: false, delta: "demos doubled in 2 weeks", url: "https://giga.ai" },
  { name: "Melissa Ambrosini", highlight: true, url: "https://melissaambrosini.com" },
  { name: "Nick Broadhurst", highlight: false, url: "https://nickbroadhurst.com" },
  { name: "Titan Gatequity", highlight: true },
  { name: "Ask Dialog", highlight: false },
  { name: "AAKP", highlight: true },
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
                  {[...brands, ...brands].map((brand, i) => {
                    const colorClass = brand.highlight
                      ? "text-zinc-700"
                      : "text-zinc-400";
                    const inner = (
                      <>
                        <span className="font-semibold">{brand.name}</span>
                        {brand.delta && (
                          <span className="ml-2 text-orange-600 text-[12px] font-mono">
                            · {brand.delta}
                          </span>
                        )}
                      </>
                    );
                    if (brand.url) {
                      return (
                        <a
                          key={i}
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${brand.name}`}
                          className={`text-sm whitespace-nowrap transition-colors ${colorClass} hover:text-zinc-900 hover:underline underline-offset-4 decoration-orange-500/40`}
                        >
                          {inner}
                        </a>
                      );
                    }
                    return (
                      <span
                        key={i}
                        className={`text-sm whitespace-nowrap transition-colors cursor-default ${colorClass} hover:text-zinc-900`}
                      >
                        {inner}
                      </span>
                    );
                  })}
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
