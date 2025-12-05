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
    <motion.section 
      className="pt-20 bg-white border-b border-zinc-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer> 
            <GridItem className="py-12">
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.p 
                  className="text-xs font-bold text-zinc-900 whitespace-nowrap"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  TRUSTED BY 50+ COMPANIES
                </motion.p>
                
                <div className="flex-1 w-full overflow-hidden mask-linear-fade relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10" />
                    
                    <motion.div 
                        className="flex gap-16 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    >
                        {[...brands, ...brands].map((brand, i) => (
                      <motion.span 
                        key={i} 
                        className="text-lg font-bold text-zinc-500 hover:text-orange-500 transition-colors cursor-default"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                                {brand}
                      </motion.span>
                        ))}
                    </motion.div>
                </div>
              </motion.div>
            </GridItem>
        </GridContainer>
      </div>
    </motion.section>
  );
}
