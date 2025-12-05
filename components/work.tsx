"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "melissa-ambrosini",
    name: "Melissa Ambrosini",
    desc: "Website design and development.",
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
    desc: "Personal brand website.",
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
    desc: "SaaS product website.",
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
    desc: "Gaming project website.",
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
    desc: "Corporate website design.",
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
    desc: "Crypto project landing page.",
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
    desc: "Marketing agency website.",
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
    desc: "Cryptocurrency website.",
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
    desc: "Travel app landing page.",
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
    desc: "Mobile application showcase.",
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
    desc: "E-commerce website.",
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
    desc: "Product website.",
    category: "E-commerce",
    stack: ["Framer"],
    year: "2024",
    link: "https://roadid.com",
    color: "bg-zinc-500",
    imageSrc: "/work-screenshots/road-id.png",
    imageAlt: "ROAD iD product website showing wearable identification products for active individuals"
  }
];

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const
    }
  })
};

export function WorkV2() {
  return (
    <section className="bg-white" id="work">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer> 
            <GridItem className="py-24 flex justify-between items-end">
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
                        When It All Comes Together.
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-zinc-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        The result feels effortless and complete. A polished, working product ready to perform and make an impact. Here&apos;s what that looks like in practice.
                    </motion.p>
                </motion.div>
             
            </GridItem>
        </GridContainer>

        <GridContainer cols={2}> 
            {projects.map((project, i) => (
                <motion.div
                  key={i}
                  custom={i % 4}
                  variants={projectVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <GridItem padding={false} className="group bg-white hover:bg-zinc-50/50 transition-colors duration-300 relative overflow-hidden flex flex-col">
                    {/* Visual Area */}
                    <div className="aspect-video bg-zinc-50/50 relative overflow-hidden flex items-center justify-center group-hover:bg-zinc-100/50 transition-colors dotted-bg dotted-bg-16">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full flex items-center justify-center relative z-10 p-6"
                        >
                            <ImageVisual src={project.imageSrc} alt={project.imageAlt} />
                        </motion.div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-1 p-8 sm:p-12">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                  <motion.div 
                                    className="text-xs font-bold text-orange-700 mb-2 uppercase tracking-wider"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    {project.category}
                                  </motion.div>
                                <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors mb-1">
                                    {project.name}
                                </h3>
                            </div>
                              <motion.a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label={`Visit ${project.name} website (opens in new tab)`}
                                  className="p-2 bg-white text-zinc-400 hover:text-orange-500 transition-colors"
                                  whileHover={{ scale: 1.2, rotate: 45 }}
                                  whileTap={{ scale: 0.9 }}
                            >
                                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                              </motion.a>
                        </div>
                        
                        <p className="text-zinc-500 leading-relaxed mb-6 text-sm flex-1">
                            {project.desc}
                        </p>

                        <div className="flex gap-2">
                            {project.stack.map((tech, j) => (
                                  <motion.span 
                                    key={j} 
                                    className="px-2 py-1 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
                                    whileHover={{ backgroundColor: "#f97316", color: "#fff" }}
                                  >
                                    {tech}
                                  </motion.span>
                            ))}
                        </div>
                    </div>
                </GridItem>
                </motion.div>
            ))}
        </GridContainer>
        
        {/* Mobile 'View All' Button */}
        <motion.div 
          className="desktop:hidden border-b border-r border-zinc-100 p-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
             <motion.button 
               className="text-sm font-bold text-zinc-900 items-center gap-2 border-b border-zinc-900 pb-1 flex"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                View All Projects <ArrowUpRight className="w-4 h-4" />
            </motion.button>
        </motion.div>
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
