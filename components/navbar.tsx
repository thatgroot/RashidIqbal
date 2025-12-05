"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp } from "react-icons/si";
import { useState } from "react";

export function NavbarV2() {
  const [showContactOptions, setShowContactOptions] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 64; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 dotted-bg dotted-bg-opacity-30"
    >
      
      <div className="max-w-container h-full border-x border-zinc-100 flex items-center justify-between px-8 relative z-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Scroll to top"
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="#services" onClick={(e) => scrollToSection(e, "#services")} className="hover:text-orange-500 transition-colors">Services</Link>
          <Link href="#work" onClick={(e) => scrollToSection(e, "#work")} className="hover:text-orange-500 transition-colors">Work</Link>
          <Link href="#process" onClick={(e) => scrollToSection(e, "#process")} className="hover:text-orange-500 transition-colors">Process</Link>
          <Link href="#resources" onClick={(e) => scrollToSection(e, "#resources")} className="hover:text-orange-500 transition-colors">FAQ</Link>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowContactOptions(!showContactOptions)}
            aria-label="Start project contact options"
            aria-expanded={showContactOptions}
            aria-haspopup="true"
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors flex items-center gap-2"
          >
            Start Project
          </button>

          <AnimatePresence>
            {showContactOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="menu"
                aria-label="Contact options"
                className="absolute top-full right-0 mt-2 w-48 bg-white border border-zinc-200 overflow-hidden dotted-bg"
              >
                
                <div className="relative z-10 bg-white">
                  <a href="mailto:rashidiqbal.freelance@gmail.com" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-orange-500 transition-colors border-b border-zinc-100">
                      <SiGmail size={16} aria-hidden="true" />
                      <span>Email</span>
                  </a>
                  <a href="https://wa.me/923554665643" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-green-500 transition-colors">
                      <SiWhatsapp size={16} aria-hidden="true" />
                      <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
