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
    icon: <SiFramer className="w-5 h-5" />,
    featured: true,
  },
  {
    name: "Portfolio & Services",
    url: "/",
    icon: <MoveRight className="w-5 h-5" />,
  },
  {
    name: "Read My Latest Articles",
    url: "/blog",
    icon: <MoveRight className="w-5 h-5" />,
  },
  {
    name: "Hire me on Contra",
    url: "https://contra.com/rashidiqbal",
    icon: <SiFramer className="w-5 h-5" />,
  },
  {
    name: "Hire Me on Upwork",
    url: "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
    icon: <SiUpwork className="w-5 h-5" />,
  },
  {
    name: "Follow on LinkedIn",
    url: "https://www.linkedin.com/in/callmerashidiqbal/",
    icon: <FaLinkedinIn className="w-5 h-5" />,
  },
  {
    name: "Follow on X/Twitter",
    url: "https://x.com/rashidrealme",
    icon: <FaXTwitter className="w-5 h-5" />,
  },
  {
    name: "View Designs on Behance",
    url: "https://www.behance.net/thatgroot",
    icon: <FaBehance className="w-5 h-5" />,
  },
  {
    name: "GitHub Open Source",
    url: "https://github.com/thatgroot",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    name: "Chat on WhatsApp",
    url: "https://wa.me/923554665643",
    icon: <FaWhatsapp className="w-5 h-5" />,
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
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center relative overflow-x-hidden font-sans pb-24">


      <div className="w-full max-w-md mx-auto px-6 z-10">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6 pt-16 mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-emerald-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
            <div className="w-28 h-28 rounded-full bg-zinc-900 shadow-2xl flex items-center justify-center p-5 border border-zinc-800/50 relative overflow-hidden backdrop-blur-3xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500">
              <Image
                src="/favicon.svg"
                alt="Rashid Iqbal Logo"
                width={80}
                height={80}
                priority
                className="brightness-125 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
              Rashid Iqbal
            </h1>
            <p className="text-blue-400/90 font-mono text-sm tracking-widest uppercase flex items-center gap-2 justify-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Figma & Framer Expert
            </p>
            <p className="text-zinc-500 text-[15px] leading-relaxed max-w-[300px] mx-auto pt-2">
              Designing in Figma. Building in Framer. Creating Chrome extensions that convert.
            </p>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="space-y-4 w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
        >
          {links.map((link, index) => {
            const isExternal = link.url.startsWith("http");
            const LinkComponent = isExternal ? "a" : Link;

            return (
              <motion.div
                key={link.name}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0 }
                }}
                className="relative group"
              >
                <LinkComponent
                  href={link.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`
                    relative flex items-center justify-between p-4.5 w-full
                    rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    border backdrop-blur-md overflow-hidden
                    ${link.featured
                      ? "bg-white text-zinc-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] scale-100 hover:scale-[1.02]"
                      : "bg-zinc-900/40 text-zinc-200 border-zinc-800/50 hover:border-zinc-600/50 shadow-lg hover:shadow-blue-500/10 scale-100 hover:scale-[1.01]"}
                  `}
                >
                  {/* Subtle hover gradient for non-featured */}
                  {!link.featured && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                  )}

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`
                      p-2.5 rounded-xl transition-all duration-500
                      ${link.featured ? "bg-zinc-100 group-hover:bg-zinc-200" : "bg-zinc-800/50 group-hover:bg-zinc-800 group-hover:text-blue-400 group-hover:scale-110 shadow-inner"}
                    `}>
                      {link.icon}
                    </div>
                    <span className="font-semibold text-base tracking-tight">{link.name}</span>
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(link.url, index);
                      }}
                      className={`
                        p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100
                        ${link.featured ? "text-zinc-400 hover:text-zinc-950" : "text-zinc-600 hover:text-white hover:bg-zinc-800/50"}
                      `}
                      title="Copy link"
                    >
                      <AnimatePresence mode="wait">
                        {copiedIndex === index ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4 text-emerald-500" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <MoveRight className={`
                      w-4 h-4 transition-all duration-500
                      ${link.featured ? "text-zinc-400 group-hover:text-zinc-950" : "text-zinc-600 group-hover:text-zinc-300"}
                      group-hover:translate-x-1
                    `} />
                  </div>
                </LinkComponent>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="pt-16 text-center space-y-6"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent via-zinc-800 to-transparent mx-auto" />
          <p className="text-[10px] text-zinc-600 font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} AESTHO · Dubai / Remote
          </p>
        </motion.div>
      </div>

      {/* Advanced Ambient Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-size-[64px_64px] opacity-[0.15]" />
        <div className="absolute inset-0 bg-radial-at-t from-zinc-900/50 to-transparent" />
      </div>
    </main>
  );
}
