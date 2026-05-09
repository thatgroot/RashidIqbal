"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { X } from "lucide-react";
import { Sparkles } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";

const DISMISS_KEY = "offer-banner-dismissed-at";
const DISMISS_DAYS = 7; // expire dismiss after a week so returning visitors see the offer again

/**
 * Thin promotional strip that sits at the top of the homepage hero,
 * directly below the fixed navbar. Links to the conversion-focused
 * landing page at /offer.
 *
 * Dismissal stores a timestamp instead of a boolean — the banner
 * reappears 7 days later. Previous behaviour was permanent dismiss,
 * so a first-time visitor who closed it never saw the offer hook
 * again on a return visit.
 */
export function OfferBanner() {
  // Default to visible so SSR renders the banner and first-paint shows it.
  // useEffect will hide it if the visitor previously dismissed within window.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (!raw) return;
      const ts = parseInt(raw, 10);
      if (!Number.isFinite(ts)) return;
      if (Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000) {
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
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
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
          className="w-full bg-[#000000] text-white overflow-hidden border-b border-white/5"
          role="region"
          aria-label="Promotional offer"
        >
          <div className="max-w-container mx-auto px-4 sm:px-6 relative">
            <Link
              href="/offer"
              onClick={handleCtaClick}
              className="group flex items-center justify-center gap-2 sm:gap-3 py-2.5 pr-10 sm:pr-14 text-xs sm:text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
              style={{ fontVariationSettings: '"wght" 500' }}
            >
              <Sparkles className="w-4 h-4 shrink-0 hidden sm:inline text-[#d4a017]" aria-hidden="true" />
              <span>
                <span className="text-[#d4a017]" style={{ fontVariationSettings: '"wght" 600' }}>
                  Free 60-sec site audit
                </span>
                <span className="text-white/65"> · landing in 3 days · 2 slots left this month</span>
              </span>
              <ArrowRight
                className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
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
