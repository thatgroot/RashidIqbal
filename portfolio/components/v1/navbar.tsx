"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <div className="flex items-center gap-6 px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-xl">
        <Link href="/" className="text-sm font-medium hover:text-white/80 transition-colors">
          Home
        </Link>
        <Link href="#services" className="text-sm font-medium hover:text-white/80 transition-colors">
          Services
        </Link>
        <Link href="#work" className="text-sm font-medium hover:text-white/80 transition-colors">
          Work
        </Link>
        <Link href="#contact" className="px-4 py-1.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors">
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}

