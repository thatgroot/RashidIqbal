"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaBehance, FaWhatsapp } from "react-icons/fa6";
import { SiUpwork, SiFramer } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GridContainer, GridItem } from "@/components/shared/grid-system";

const featuredLink = {
  name: "Framer Expert Profile",
  url: "https://www.framer.com/@rashidiqbal",
  icon: <SiFramer className="w-5 h-5" />,
  label: "Design · Build",
  description: "View my certified Framer Expert profile and published work.",
};

const links = [
  {
    name: "Read the Blog",
    url: "/blog",
    icon: <ArrowUpRight className="w-4 h-4" />,
    label: "Writing",
    isExternal: false,
  },
  {
    name: "Start a Project",
    url: "/contact",
    icon: <ArrowUpRight className="w-4 h-4" />,
    label: "Contact",
    isExternal: false,
  },
  {
    name: "Hire me on Upwork",
    url: "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
    icon: <SiUpwork className="w-4 h-4" />,
    label: "Freelance",
    isExternal: true,
  },
  {
    name: "Hire me on Contra",
    url: "https://contra.com/rashidiqbal",
    icon: <SiFramer className="w-4 h-4" />,
    label: "Freelance",
    isExternal: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/callmerashidiqbal/",
    icon: <FaLinkedinIn className="w-4 h-4" />,
    label: "Social",
    isExternal: true,
  },
  {
    name: "X / Twitter",
    url: "https://x.com/rashidrealme",
    icon: <FaXTwitter className="w-4 h-4" />,
    label: "Social",
    isExternal: true,
  },
  {
    name: "Behance Portfolio",
    url: "https://www.behance.net/thatgroot",
    icon: <FaBehance className="w-4 h-4" />,
    label: "Design",
    isExternal: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/thatgroot",
    icon: <FaGithub className="w-4 h-4" />,
    label: "Code",
    isExternal: true,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/923554665643",
    icon: <FaWhatsapp className="w-4 h-4" />,
    label: "Contact",
    isExternal: true,
  },
];

export default function LinksPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (url: string, index: number) => {
    const absoluteUrl = url.startsWith("http") ? url : `https://aestho.xyz${url}`;
    navigator.clipboard.writeText(absoluteUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
        {/* Background: same grid as landing page */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
          <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/50" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/2 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/2 rounded-full blur-3xl" />
        </div>

        <Navbar />

        <section className="pt-16 bg-white relative overflow-hidden">
          <div className="max-w-container border-l border-zinc-100 relative">
            {/* Profile hero block */}
            <GridContainer cols={1}>
              <GridItem className="border-t py-16 md:py-20" padding={false}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center px-6"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 flex items-center justify-center mb-6">
                    <Image
                      src="/favicon.svg"
                      alt="Rashid Iqbal"
                      width={48}
                      height={48}
                      priority
                    />
                  </div>

                  {/* Availability pill */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-xs font-medium mb-5"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    Available now
                  </motion.div>

                  {/* Name */}
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-3 leading-[1.1] pb-1">
                    <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">Rashid Iqbal</span>
                  </h1>

                  {/* Role */}
                  <p className="text-[10px] font-mono text-orange-600 uppercase tracking-[0.2em] mb-4">
                    Figma &amp; Framer Expert
                  </p>

                  {/* Description */}
                  <p className="text-base md:text-lg text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Designing in Figma. Building in Framer. Shipping Chrome extensions that convert.
                  </p>
                </motion.div>
              </GridItem>
            </GridContainer>

            {/* Featured link - full width, orange accent like hero CTA */}
            <GridContainer cols={1}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GridItem className="bg-linear-to-b from-orange-50/60 to-white ring-2 ring-orange-500/30 ring-inset relative">
                  <a
                    href={featuredLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-12 h-12 bg-orange-700 text-white flex items-center justify-center shrink-0">
                      {featuredLink.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono text-orange-600 uppercase tracking-[0.2em]">
                          Featured · {featuredLink.label}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-zinc-900 mb-1">
                        {featuredLink.name}
                      </h2>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {featuredLink.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-orange-600 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </GridItem>
              </motion.div>
            </GridContainer>

            {/* Link grid */}
            <GridContainer cols={2}>
              {links.map((link, index) => {
                const LinkComponent = link.isExternal ? "a" : Link;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <GridItem className="group h-full">
                      <div className="relative h-full flex flex-col">
                        <LinkComponent
                          href={link.url}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-4 h-full"
                        >
                          <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700 shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
                            {link.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2 block">
                              {link.label}
                            </span>
                            <span className="font-medium text-zinc-900 text-base block leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                              {link.name}
                            </span>
                            <span className="text-xs text-zinc-400 truncate block">
                              {link.isExternal
                                ? new URL(link.url).hostname.replace("www.", "")
                                : `aestho.xyz${link.url}`}
                            </span>
                          </div>
                          <ArrowUpRight
                            className="w-4 h-4 text-zinc-300 shrink-0 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                            aria-hidden="true"
                          />
                        </LinkComponent>

                        {/* Copy button - absolute so it doesn't disturb the anchor target area */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyToClipboard(link.url, index);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-orange-600 hover:bg-orange-50 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                          title="Copy link"
                          aria-label={`Copy link for ${link.name}`}
                        >
                          <AnimatePresence mode="wait">
                            {copiedIndex === index ? (
                              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              </motion.div>
                            ) : (
                              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Copy className="w-3.5 h-3.5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </GridItem>
                  </motion.div>
                );
              })}
            </GridContainer>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
