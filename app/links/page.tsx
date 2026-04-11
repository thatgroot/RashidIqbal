"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaBehance, FaWhatsapp } from "react-icons/fa6";
import { SiUpwork, SiFramer } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [
  {
    name: "Framer Expert Profile",
    url: "https://www.framer.com/@rashidiqbal",
    icon: <SiFramer className="w-4 h-4" />,
    featured: true,
    label: "Design · Build",
  },
  {
    name: "Portfolio & Services",
    url: "/",
    icon: <MoveRight className="w-4 h-4" />,
    label: "Work",
  },
  {
    name: "Read My Latest Articles",
    url: "/blog",
    icon: <MoveRight className="w-4 h-4" />,
    label: "Blog",
  },
  {
    name: "Hire me on Contra",
    url: "https://contra.com/rashidiqbal",
    icon: <SiFramer className="w-4 h-4" />,
    label: "Freelance",
  },
  {
    name: "Hire Me on Upwork",
    url: "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
    icon: <SiUpwork className="w-4 h-4" />,
    label: "Freelance",
  },
  {
    name: "Follow on LinkedIn",
    url: "https://www.linkedin.com/in/callmerashidiqbal/",
    icon: <FaLinkedinIn className="w-4 h-4" />,
    label: "Social",
  },
  {
    name: "Follow on X / Twitter",
    url: "https://x.com/rashidrealme",
    icon: <FaXTwitter className="w-4 h-4" />,
    label: "Social",
  },
  {
    name: "View Designs on Behance",
    url: "https://www.behance.net/thatgroot",
    icon: <FaBehance className="w-4 h-4" />,
    label: "Portfolio",
  },
  {
    name: "GitHub Open Source",
    url: "https://github.com/thatgroot",
    icon: <FaGithub className="w-4 h-4" />,
    label: "Code",
  },
  {
    name: "Chat on WhatsApp",
    url: "https://wa.me/923554665643",
    icon: <FaWhatsapp className="w-4 h-4" />,
    label: "Contact",
  },
];

export default function LinksPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 font-sans relative overflow-x-hidden pb-24">
      {/* Grid background — matches landing page grid but inverted */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-size-[40px_40px] opacity-40" />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950" />
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-orange-600/5 blur-[140px]" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-md mx-auto px-6 z-10 relative">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center text-center pt-16 mb-12"
        >
          <div className="relative mb-6 group">
            <div className="absolute -inset-px bg-linear-to-br from-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="w-20 h-20 border border-zinc-800 bg-zinc-900 flex items-center justify-center p-4 relative">
              <Image
                src="/favicon.svg"
                alt="Rashid Iqbal Logo"
                width={64}
                height={64}
                priority
                className="brightness-125 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            Rashid Iqbal
          </h1>
          <p className="text-orange-500/90 font-mono text-xs tracking-widest uppercase flex items-center gap-2 justify-center mb-3">
            <span className="w-1.5 h-1.5 bg-orange-500 animate-pulse" aria-hidden="true" />
            Figma &amp; Framer Expert
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
            Designing in Figma. Building in Framer. Creating Chrome extensions that convert.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          className="space-y-px w-full border border-zinc-800"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.3 },
            },
          }}
        >
          {links.map((link, index) => {
            const isExternal = link.url.startsWith("http");
            const LinkComponent = isExternal ? "a" : Link;

            return (
              <motion.div
                key={link.name}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  show: { opacity: 1, x: 0 },
                }}
                className="relative group"
              >
                <LinkComponent
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`
                    relative flex items-center justify-between px-5 py-4 w-full
                    transition-colors duration-200 border-b border-zinc-800 last:border-b-0
                    ${link.featured
                      ? "bg-orange-700 text-white hover:bg-orange-800"
                      : "bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`
                      w-8 h-8 flex items-center justify-center shrink-0 transition-colors duration-200
                      ${link.featured
                        ? "bg-orange-600 text-white"
                        : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200"
                      }
                    `}>
                      {link.icon}
                    </div>
                    <div>
                      <span className="font-medium text-sm block leading-none mb-1">{link.name}</span>
                      {link.label && (
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${link.featured ? "text-orange-200" : "text-zinc-600"}`}>
                          {link.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(link.url, index);
                      }}
                      className={`
                        w-7 h-7 flex items-center justify-center transition-all duration-200
                        opacity-0 group-hover:opacity-100
                        ${link.featured ? "text-orange-200 hover:text-white" : "text-zinc-600 hover:text-zinc-300"}
                      `}
                      title="Copy link"
                      aria-label={`Copy link for ${link.name}`}
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy className="w-3.5 h-3.5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <MoveRight className={`
                      w-4 h-4 transition-all duration-300
                      ${link.featured ? "text-orange-200" : "text-zinc-600 group-hover:text-zinc-400"}
                      group-hover:translate-x-1
                    `} aria-hidden="true" />
                  </div>
                </LinkComponent>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pt-12 text-center"
        >
          <div className="h-px w-8 bg-zinc-800 mx-auto mb-6" />
          <p className="text-[10px] text-zinc-700 font-mono tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Rashid Iqbal · Dubai / Remote
          </p>
        </motion.div>
      </div>
    </main>
  );
}
