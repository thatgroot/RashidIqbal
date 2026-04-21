"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Figma, Chrome, Layout } from "lucide-react";

const services = [
    {
        title: "Figma Design + UX Copy",
        desc: "Pages designed in Figma with headlines, CTAs, and microcopy tied to a conversion goal.",
        icon: Figma,
        expertise: "7+ years. 100+ interfaces designed."
    },
    {
        title: "Framer & Replit Builds",
        desc: "Pixel-perfect Framer marketing sites and Replit app prototypes from your Figma design. Fast, responsive, and your team can update content without code.",
        icon: Layout,
        expertise: "Certified Framer & Official Replit Expert."
    },
    {
        title: "Chrome Extensions",
        desc: "Standalone Chrome extensions built from scratch. Productivity tools, SaaS companions, workflow automations.",
        icon: Chrome,
        expertise: "Published on the Chrome Web Store."
    }
];

export function ServicesGrid() {
    return (
        <section className="bg-white scroll-mt-16" id="services">
            <div className="max-w-7xl mx-auto border-l border-zinc-100">
                <GridContainer  >
                    <GridItem className="py-24">
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-semibold text-zinc-900 mb-6 leading-[1.1]">
                                Everything your page needs, from one person.
                            </h2>
                            <p className="text-lg text-zinc-500 leading-relaxed">
                                Designer, copywriter, and developer. Same person. No agency telephone game.
                            </p>
                        </motion.div>
                    </GridItem>
                </GridContainer>

                <GridContainer cols={3}  >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1, delayChildren: i * 0.15 } }
                            }}
                        >
                            <GridItem label={`0${i + 1}`}>
                                <article className="h-full flex flex-col">
                                    <motion.div
                                        className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8 text-zinc-900"
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8 },
                                            visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        <service.icon className="w-5 h-5" />
                                    </motion.div>

                                    <motion.h3
                                        className="text-xl font-medium text-zinc-900 mb-3"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        {service.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-sm text-zinc-500 leading-relaxed mb-8 flex-1"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        {service.desc}
                                    </motion.p>

                                    <motion.div
                                        className="pt-4 border-t border-zinc-100 flex items-center justify-between"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        <span className="text-xs font-mono text-zinc-500 uppercase">Proof</span>
                                        <span className="text-xs font-bold text-zinc-900">{service.expertise}</span>
                                    </motion.div>
                                </article>
                            </GridItem>
                        </motion.div>
                    ))}
                </GridContainer>
            </div>
        </section>
    );
}
