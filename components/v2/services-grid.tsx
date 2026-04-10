"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Figma, Chrome, Layout } from "lucide-react";

const services = [
    {
        title: "Figma Design + UX Copy",
        desc: "I design your pages in Figma and write the UX copy that makes people act. Headlines, CTAs, page flow, microcopy. Every layout decision is tied to a conversion goal.",
        icon: Figma,
        stat: "Designing since 2019"
    },
    {
        title: "Framer Development",
        desc: "Pixel-perfect Framer builds from your Figma design. Your team can update content without touching code. Fast, responsive, SEO-ready.",
        icon: Layout,
        stat: "53 sites shipped"
    },
    {
        title: "Chrome Extensions",
        desc: "Standalone Chrome extensions built from scratch. Whether it's a productivity tool, a SaaS companion, or a workflow automation, I design and ship it to the Chrome Web Store.",
        icon: Chrome,
        stat: "Published on Web Store"
    }
];

export function ServicesGridV2() {
    return (
        <section className="bg-white" id="services">
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
                            <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                                Three Things I Do Really Well.
                            </h2>
                            <p className="text-lg text-zinc-500 leading-relaxed">
                                Figma design with UX copy and CRO baked in. Framer builds that are fast, responsive, and your team can manage. And Chrome extensions that solve real business problems.
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
                                        <span className="text-xs font-mono text-zinc-500 uppercase">Metric</span>
                                        <span className="text-xs font-bold text-zinc-900">{service.stat}</span>
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
