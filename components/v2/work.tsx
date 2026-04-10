"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: "crezco",
        name: "Crezco",
        desc: "Open banking payments platform. Designed and built a conversion-focused marketing site that explains complex fintech simply.",
        category: "Fintech",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://www.crezco.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/crezco.png",
        imageAlt: "Crezco open banking payments platform website"
    },
    {
        id: "composio",
        name: "Composio",
        desc: "YC-backed AI agent infrastructure platform. Designed the marketing site with clear positioning across their MCP tools, Platform SDK, and CLI products.",
        category: "DevTools / AI",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://composio.dev/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/composio.png",
        imageAlt: "Composio AI agent infrastructure platform website"
    },
    {
        id: "relace-ai",
        name: "Relace AI",
        desc: "AI coding models company. Designed and built a developer-focused site for their code retrieval, merging, and source control infrastructure.",
        category: "AI / DevTools",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://relace.ai/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/relace-ai.png",
        imageAlt: "Relace AI coding models platform website"
    },
    {
        id: "ask-dialog",
        name: "Ask Dialog",
        desc: "Conversational AI platform. Clean SaaS marketing site designed in Figma with clear feature messaging and strong CTAs.",
        category: "SaaS",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://www.askdialog.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/ask-dialog.png",
        imageAlt: "Ask Dialog conversational AI platform website"
    },
    {
        id: "giga-ai",
        name: "Giga AI",
        desc: "AI automation platform. Designed and built a bold, high-converting SaaS landing page on Framer.",
        category: "AI / SaaS",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://giga.ai/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/giga-ai.png",
        imageAlt: "Giga AI automation platform website"
    },
    {
        id: "updateai",
        name: "UpdateAI",
        desc: "AI meeting assistant SaaS. Full Framer redesign that supported customer acquisition before their exit to Gainsight.",
        category: "SaaS",
        stack: ["Figma", "Framer"],
        year: "2024",
        link: "https://update.ai/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/updateai.png",
        imageAlt: "UpdateAI SaaS website redesigned in Framer"
    },
    {
        id: "vanos-ai",
        name: "Vanos AI",
        desc: "Voice AI platform for enterprise. Built a Framer site showcasing real-time voice agents with sub-200ms latency features.",
        category: "AI / SaaS",
        stack: ["Figma", "Framer"],
        year: "2024",
        link: "https://vanos.ai/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/vanos-ai.png",
        imageAlt: "Vanos AI voice agent platform website"
    },
    {
        id: "titan-gatequity",
        name: "Titan Gatequity",
        desc: "Private equity firm. Clean, trust-building design in Figma with strategic UX copy. Built on Framer with CMS for portfolio updates.",
        category: "Finance",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://titangatequity.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/titan-gatequity.png",
        imageAlt: "Titan Gatequity private equity firm website"
    },
    {
        id: "nick-broadhurst",
        name: "Nick Broadhurst",
        desc: "Personal brand site for an Australian musician. High-performance Framer build with 90+ Lighthouse score.",
        category: "Personal Brand",
        stack: ["Figma", "Framer"],
        year: "2024",
        link: "https://iamnickbroadhurst.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/nick-broadhurst.png",
        imageAlt: "Nick Broadhurst personal brand and music website"
    },
    {
        id: "aakp",
        name: "AAKP",
        desc: "Norwegian professional services firm. Designed in Figma with bilingual UX copy, built a clean multi-page Framer site.",
        category: "Professional Services",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://www.aakp.no/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/aakp.png",
        imageAlt: "AAKP Norwegian professional services website"
    },
    {
        id: "melissa-ambrosini",
        name: "Melissa Ambrosini",
        desc: "Personal brand and meditation platform for a bestselling author. Custom Framer site with conversion-focused layout.",
        category: "Personal Brand",
        stack: ["Figma", "Framer"],
        year: "2024",
        link: "https://melissaambrosini.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/melissa-ambrosini.png",
        imageAlt: "Melissa Ambrosini author and meditation platform website"
    },
    {
        id: "space-dome",
        name: "Space Dome",
        desc: "AI-powered space technology platform. Designed a futuristic, immersive landing page in Figma and built it on Framer.",
        category: "AI / Tech",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://spacedome.ai/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/space-dome.png",
        imageAlt: "Space Dome AI space technology platform website"
    },
    {
        id: "deep-see",
        name: "Deep See",
        desc: "E-commerce analytics platform. Built a conversion-focused Framer site that clearly communicates their data product.",
        category: "E-commerce / SaaS",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://deepseecommerce.com/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/deep-see.png",
        imageAlt: "Deep See e-commerce analytics platform website"
    },
    {
        id: "gte-exchange",
        name: "GTE Exchange",
        desc: "Pre-IPO equity marketplace. Designed a trust-building landing page with clear value props for retail investors.",
        category: "Finance",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://gte.xyz/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/gte-exchange.png",
        imageAlt: "GTE Exchange pre-IPO equity marketplace website"
    },
    {
        id: "tandem-bi",
        name: "Tandem BI",
        desc: "Business intelligence platform. Clean, professional Framer site with CMS for case studies and product updates.",
        category: "SaaS",
        stack: ["Figma", "Framer"],
        year: "2025",
        link: "https://tandem.bi/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/tandem-bi.png",
        imageAlt: "Tandem BI business intelligence platform website"
    },
];

export function WorkV2() {
    return (
        <section className="bg-white" id="work">
            <div className="max-w-container border-l border-zinc-100">
                <GridContainer  >
                    <GridItem className="py-24 flex justify-between items-end">
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                                When It All Comes Together.
                            </h2>
                            <p className="text-lg text-zinc-500">
                                The result feels effortless and complete. A polished, working product ready to perform and make an impact. Here&apos;s what that looks like in practice.
                            </p>
                        </motion.div>

                    </GridItem>
                </GridContainer>

                <GridContainer cols={2}  >
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1, delayChildren: (i % 2) * 0.1 } }
                            }}
                        >
                            <GridItem padding={false} className="group bg-white hover:bg-zinc-50/50 transition-colors duration-300 relative overflow-hidden flex flex-col">
                                {/* Visual Area */}
                                <motion.div
                                    className="aspect-video bg-zinc-50/50 relative overflow-hidden flex items-center justify-center group-hover:bg-zinc-100/50 transition-colors dotted-bg dotted-bg-16"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.95 },
                                        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex items-center justify-center relative z-10 p-6"
                                    >
                                        <ImageVisual src={project.imageSrc} alt={project.imageAlt} />
                                    </motion.div>
                                </motion.div>

                                {/* Content Area */}
                                <div className="flex flex-col flex-1 p-8 sm:p-12">
                                    <motion.div
                                        className="flex justify-between items-start mb-4"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-orange-700 mb-2 uppercase tracking-wider">{project.category}</div>
                                            <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors mb-1">
                                                {project.name}
                                            </h3>
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${project.name} website (opens in new tab)`}
                                            className="p-2 bg-white text-zinc-500 hover:text-zinc-900 transition-colors"
                                        >
                                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                                        </a>
                                    </motion.div>

                                    <motion.p
                                        className="text-zinc-500 leading-relaxed mb-6 text-sm flex-1"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        {project.desc}
                                    </motion.p>

                                    <motion.div
                                        className="flex gap-2"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        {project.stack.map((tech, j) => (
                                            <span key={j} className="px-2 py-1 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </GridItem>
                        </motion.div>
                    ))}
                </GridContainer>
            </div>
        </section>
    );
}

// --- Flat Visual Components ---

function ImageVisual({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 590px"
                loading="lazy"
                quality={85}
            />
        </div>
    );
}
