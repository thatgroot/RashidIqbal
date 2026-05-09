"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";

const valueProps = [
  {
    number: "01",
    title: "Copy first. Design second.",
    desc: "Headlines, CTAs, and page flow are written before a single pixel is drawn. Because copy moves people. Design just makes them look nice.",
  },
  {
    number: "02",
    title: "Shipped in two weeks, not two months.",
    desc: "Figma to Framer in ten business days. No agency hand-offs. No surprise invoices. No three-month retainer for a five-page site.",
  },
  {
    number: "03",
    title: "Measured from the first visitor.",
    desc: "GA4, heatmaps, and event tracking installed before launch. You see what is working from day one, not the next quarter.",
  },
];

export function ValueProp() {
  return (
    <section className="bg-white">
      <div className="max-w-container border-l border-[#e8e4dd]">
        <GridContainer>
          <GridItem className="py-16" padding={false}>
            <div className="px-8 sm:px-12 max-w-2xl">
              <motion.span
                className="text-[0.625rem] font-mono text-[#1b1938] uppercase tracking-[0.2em] block mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
              >
                How this works
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-semibold text-[#292827] tracking-tight leading-[1.15]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                Why founders pick this over a design agency.
              </motion.h2>
              <motion.p
                className="text-base text-[#73706d] mt-4 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Same result. Half the time. One person to talk to.
              </motion.p>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={3}>
          {valueProps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GridItem className="h-full flex flex-col">
                <span className="text-xs font-mono text-[#1b1938] tracking-widest mb-6">
                  {item.number}
                </span>
                <h3 className="text-xl font-semibold text-[#292827] mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#73706d] leading-relaxed">
                  {item.desc}
                </p>
              </GridItem>
            </motion.div>
          ))}
        </GridContainer>
      </div>
    </section>
  );
}
