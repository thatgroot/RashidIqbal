"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: "vanos-ai",
        name: "Vanos AI",
        desc: "Problem: Needed a high-fidelity platform to showcase real-time voice agents for enterprise. Solution: Built a deterministic, real-time Web platform on Framer. Impact: Showcased sub-200ms conversational features to secure enterprise leads.",
        category: "AI / SaaS",
        stack: ["Framer"],
        year: "2024",
        link: "https://vanos.ai",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/vanos-ai.png",
        imageAlt: "Vanos AI platform showcasing real-time voice agents and cross-platform workflows"
    },
    {
        id: "melissa-ambrosini",
        name: "Melissa Ambrosini",
        desc: "Problem: Needed a fast, modern platform for a personal brand and meditation offer. Solution: Designed and developed a custom Framer website. Impact: Increased user engagement and seamless content delivery.",
        category: "Web Design",
        stack: ["Framer"],
        year: "2024",
        link: "https://melissaambrosini.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/melissa-ambrosini.png",
        imageAlt: "Melissa Ambrosini website homepage showing author branding and meditation offer"
    },
    {
        id: "nick-broadhurst",
        name: "Nick Broadhurst",
        desc: "Problem: Required a cohesive personal brand site to promote a new music single. Solution: Built a high-performance Framer site. Impact: boosted single promotions with a 90+ Lighthouse score.",
        category: "Web Design",
        stack: ["Framer"],
        year: "2024",
        link: "https://iamnickbroadhurst.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/nick-broadhurst.png",
        imageAlt: "Nick Broadhurst personal brand website with music single promotion"
    },
    {
        id: "updateai",
        name: "UpdateAI",
        desc: "Problem: Outdated SaaS website lacking conversion focus. Solution: Completed a full redesign on Framer. Impact: Supported customer acquisition goals leading to a successful exit to Gainsight.",
        category: "SaaS",
        stack: ["Framer"],
        year: "2024",
        link: "https://update.ai",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/updateai.png",
        imageAlt: "UpdateAI SaaS product website showing acquisition announcement by Gainsight"
    },
    {
        id: "saku-monsters",
        name: "Saku Monsters",
        desc: "Problem: Needed an engaging gaming site for blind box figurines. Solution: Delivered an interactive Web Design on Framer. Impact: Elevated brand presence and user interaction for game launches.",
        category: "Web Design",
        stack: ["Framer"],
        year: "2024",
        link: "https://saku.framer.ai",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/saku-monsters.png",
        imageAlt: "Saku Monsters blind box figurines gaming project website"
    },
    {
        id: "leanscale",
        name: "Lean Scale",
        desc: "Problem: Legacy corporate site failing to convert enterprise leads. Solution: Designed a modern, trust-building digital venture builder site. Impact: Significantly improved lead generation metrics.",
        category: "Web Design",
        stack: ["Framer"],
        year: "2024",
        link: "https://leanscale.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/leanscale.png",
        imageAlt: "Lean Scale digital venture builder corporate website"
    },
    {
        id: "scorch-token",
        name: "Scorch Token",
        desc: "Problem: Needed a trustworthy landing page for a new crypto token. Solution: Built a high-converting Web3 page on Framer. Impact: Facilitated successful token launch and investor onboarding.",
        category: "Web3",
        stack: ["Framer"],
        year: "2024",
        link: "https://scorchtoken.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/scorch-token.png",
        imageAlt: "Scorch Token cryptocurrency project landing page"
    },
    {
        id: "funnel-labs",
        name: "Funnel Labs",
        desc: "Problem: Marketing agency required a site to showcase funnel building offers. Solution: Created a conversion-focused agency site. Impact: Increased client inquiries and streamlined service descriptions.",
        category: "Agency",
        stack: ["Framer"],
        year: "2024",
        link: "https://www.funnellabs.co/",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/funnel-labs.png",
        imageAlt: "Funnel Labs marketing agency website with funnel building offer"
    },
    {
        id: "pedro-token",
        name: "Pedro the Token",
        desc: "Problem: Lacked a professional site for a meme coin with staking features. Solution: Developed a playful yet functional Web3 crypto site. Impact: Enhanced community trust and simplified staking processes.",
        category: "Web3",
        stack: ["Framer"],
        year: "2024",
        link: "https://pedrothetoken.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/pedro-token.png",
        imageAlt: "Pedro the Token cryptocurrency website with raccoon mascot and staking features"
    },
    {
        id: "utoura",
        name: "uToura",
        desc: "Problem: Travel app needed a compelling landing page for hotel and tour bookings. Solution: Designed an engaging App Landing page on Framer. Impact: Drove app downloads and user sign-ups.",
        category: "App Landing",
        stack: ["Framer"],
        year: "2024",
        link: "https://utoura.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/utoura.png",
        imageAlt: "uToura travel app landing page with hotel and tour booking interface"
    },
    {
        id: "skardu-app",
        name: "SkarduApp",
        desc: "Problem: Needed a platform to showcase an e-commerce mobile application. Solution: Built a dedicated Mobile App showcase site. Impact: Successfully educated users and increased active app installations.",
        category: "Mobile App",
        stack: ["Framer"],
        year: "2024",
        link: "https://skarduapp.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/skardu-app.png",
        imageAlt: "SkarduApp e-commerce mobile application website"
    },
    {
        id: "deals-finders",
        name: "Deals Finders",
        desc: "Problem: Required a fast platform to display deals and store listings. Solution: Developed an E-commerce site focused on speed. Impact: improved user navigation and deal discovery rates.",
        category: "E-commerce",
        stack: ["Framer"],
        year: "2024",
        link: "https://dealsfinders.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/deals-finders.png",
        imageAlt: "Deals Finders e-commerce website showing deals and store listings"
    },
    {
        id: "road-id",
        name: "ROAD iD",
        desc: "Problem: Needed a robust E-commerce site for wearable identification products. Solution: Rebuilt the product website for optimal performance. Impact: Increased checkout conversions and overall sales.",
        category: "E-commerce",
        stack: ["Framer"],
        year: "2024",
        link: "https://roadid.com",
        color: "bg-zinc-500",
        imageSrc: "/work-screenshots/road-id.png",
        imageAlt: "ROAD iD product website showing wearable identification products for active individuals"
    }
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
