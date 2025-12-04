"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";

const brands = [
  "UpdateAI", "Lean Scale", "Funnel Labs", "Melissa Ambrosini", "Nick Broadhurst", 
  "uToura", "SkarduApp", "ROAD iD", "Deals Finders", "Saku Monsters", 
  "Scorch Token", "Pedro the Token"
];

export function TrustedByV2() {
  return (
    <section className="bg-white border-b border-zinc-100">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <p className="text-xs font-bold text-zinc-900 whitespace-nowrap">
                  TRUSTED BY 50+ COMPANIES
                </p>
                
                <div className="flex-1 w-full overflow-hidden mask-linear-fade relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10" />
                    
                    <motion.div 
                        className="flex gap-16 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    >
                        {[...brands, ...brands].map((brand, i) => (
                            <span key={i} className="text-lg font-bold text-zinc-500 hover:text-zinc-700 transition-colors cursor-default">
                                {brand}
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
