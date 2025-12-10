"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";
import { useState } from "react";
import { PenSquare } from "lucide-react";

export function BlogNavbar() {
  const [showContactOptions, setShowContactOptions] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 h-16 bg-white/95 backdrop-blur-md border-b border-zinc-100"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo & Home Link */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-sm"
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          <span className="font-bold text-zinc-900 tracking-tight">
            Rashid Iqbal
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="px-3 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-sm"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="px-3 py-2 text-orange-600 font-semibold hover:bg-orange-50 transition-all rounded-sm"
          >
            Blog
          </Link>
          <Link
            href="/#work"
            className="px-3 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-sm"
          >
            Work
          </Link>
          <Link
            href="/#pricing"
            className="px-3 py-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-sm"
          >
            Pricing
          </Link>
        </div>

        {/* Actions */}
        <div className="relative flex items-center gap-3">
          {/* Write Post Button */}
          <Link
            href="/blog/new"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-sm"
          >
            <PenSquare className="w-4 h-4" />
            <span>Write</span>
          </Link>

          {/* Availability Badge */}
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available
          </span>

          {/* Contact Button */}
          <button
            onClick={() => setShowContactOptions(!showContactOptions)}
            aria-label="Contact options"
            aria-expanded={showContactOptions}
            aria-haspopup="true"
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-all rounded-sm"
          >
            Contact
          </button>

          {/* Contact Dropdown */}
          <AnimatePresence>
            {showContactOptions && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowContactOptions(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  role="menu"
                  aria-label="Contact options"
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-lg z-50"
                >
                  <a
                    href="https://cal.com/rashid.iqbal"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors border-b border-zinc-100"
                  >
                    <Image
                      src="/icons/cal.png"
                      alt=""
                      width={16}
                      height={16}
                      className="rounded-sm"
                      aria-hidden="true"
                    />
                    <span>Book a Call</span>
                  </a>
                  <a
                    href="mailto:rashidiqbal.freelance@gmail.com"
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-orange-500 transition-colors border-b border-zinc-100"
                  >
                    <SiGmail size={16} aria-hidden="true" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://wa.me/923554665643"
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-green-500 transition-colors border-b border-zinc-100"
                  >
                    <SiWhatsapp size={16} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~01b24c107f5b5af596"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-green-600 transition-colors"
                  >
                    <SiUpwork size={16} aria-hidden="true" />
                    <span>Upwork</span>
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

