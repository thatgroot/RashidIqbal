"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";

const DISMISS_KEY = "offer-banner-dismissed";

/**
 * Thin promotional strip that sits at the top of the homepage hero,
 * directly below the fixed navbar. Links to the conversion-focused
 * landing page at /offer. Dismissible; dismissal is remembered in
 * localStorage across sessions.
 */
export function OfferBanner() {
  // Default to visible so SSR renders the banner and first-paint shows it.
  // useEffect will hide it if the visitor previously dismissed.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") {
        setVisible(false);
      }
    } catch {
      /* localStorage blocked — show banner */
    }
  }, []);

  function handleDismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* no-op */
    }
    try {
      posthog.capture("offer_banner_dismissed", { source: "homepage" });
    } catch {
      /* no-op */
    }
    setVisible(false);
  }

  function handleCtaClick() {
    try {
      posthog.capture("offer_banner_clicked", { source: "homepage" });
    } catch {
      /* no-op */
    }
  }

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full bg-orange-600 text-white overflow-hidden"
          role="region"
          aria-label="Promotional offer"
        >
          <div className="max-w-container mx-auto px-4 sm:px-6 relative">
            <Link
              href="/offer"
              onClick={handleCtaClick}
              className="flex items-center justify-center gap-2 sm:gap-3 py-2.5 pr-10 sm:pr-14 text-xs sm:text-sm font-medium text-center hover:underline decoration-white/70 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600"
            >
              <Sparkles className="w-4 h-4 shrink-0 hidden sm:inline" aria-hidden="true" />
              <span>
                <span className="font-bold">Free 15-min page audit (worth $497)</span>
                <span className="hidden sm:inline">
                  {" "}
                  — 2 spots left this week
                </span>
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss offer banner"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
