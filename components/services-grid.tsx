"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Figma, Zap, Layout } from "lucide-react";
import { DesignSectionV2 } from "./design-section";
import { WebSectionV2 } from "./web-section";
import { MobileSectionV2 } from "./mobile-section";
const services = [
  {
    title: "Landing Pages",
    desc: "I design landing pages in Figma that convert. Every layout, button, and visual element is crafted to guide visitors toward action. What you get is a design that looks great and works even better.",
    icon: Figma,
    stat: "Figma • Framer • Next.js"
  },
  {
    title: "Marketing Sites",
    desc: "High converting Framer sites shipped fast. I build marketing pages that load instantly, look stunning, and turn visitors into customers. No code required, just results.",
    icon: Layout,
    stat: "2 Week Delivery"
  },
  {
    title: "Web Applications",
    desc: "Complex Next.js apps built right. I handle the full stack from database design to API integration, ensuring your app is fast, secure, and ready to scale when you need it.",
    icon: Zap,
    stat: "99/100 Performance"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function ServicesGridV2() {
  return (
    <section className="pt-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer> 
            <GridItem className="py-24">
                <motion.div 
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                    <motion.h2 
                      className="text-4xl font-semibold text-zinc-900 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        From Idea to Impact.
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-zinc-500 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        It starts with a simple idea and a clear vision. You want something that looks great, works perfectly, and tells your story with purpose. We explore directions, test concepts, and refine each part until everything begins to align.
                    </motion.p>
                </motion.div>
            </GridItem>
        </GridContainer>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <GridContainer cols={3}> 
            {services.map((service, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <GridItem label={`0${i + 1}`}>
                    <div className="h-full flex flex-col">
                            <motion.div 
                              className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8 text-zinc-900"
                              whileHover={{ scale: 1.1, backgroundColor: "#f97316", color: "#fff" }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                            <service.icon className="w-5 h-5" />
                            </motion.div>
                        
                        <h3 className="text-xl font-medium text-zinc-900 mb-3">
                            {service.title}
                        </h3>
                        
                        <p className="text-sm text-zinc-500 leading-relaxed mb-8 flex-1">
                            {service.desc}
                        </p>

                            <motion.div 
                              className="pt-4 border-t border-zinc-100 flex items-center justify-between"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                            <span className="text-xs font-mono text-zinc-500 uppercase">Metric</span>
                                <motion.span 
                                  className="text-xs font-bold text-zinc-900"
                                  whileHover={{ color: "#f97316" }}
                                >
                                  {service.stat}
                                </motion.span>
                            </motion.div>
                    </div>
                </GridItem>
                  </motion.div>
            ))}
        </GridContainer>
        </motion.div>


        {/* Design Phase */}
        <DesignSectionV2 />

        {/* Web/Infrastructure Phase */}
        <WebSectionV2 />

        {/* Mobile Phase */}
        <MobileSectionV2 />
      </div>
    </section>
  );
}
