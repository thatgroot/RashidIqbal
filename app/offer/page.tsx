"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import { SOCIAL_LINKS } from "@/lib/constants";

// Small client list shown as logo strip — echoes `components/landing/trusted-by.tsx`
const CLIENT_BRANDS = [
  "UpdateAI",
  "Vanos AI",
  "Space Dome",
  "Leanscale",
] as const;

// Distributed trust copy
const TRUST_SIGNALS = [
  { label: "53 projects shipped" },
  { label: "Avg. 2.4x conversion lift" },
  { label: "Rated 4.9 on Upwork" },
] as const;

// Read a cookie value on the client
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function OfferPage() {
  // Fire a view event so the B cohort is counted
  useEffect(() => {
    const variant = readCookie("ab_home") ?? "B";
    try {
      posthog.capture("lp_view", { variant, source: "offer-lp" });
    } catch {
      /* no-op if posthog not ready */
    }
  }, []);

  function handleCtaClick() {
    const variant = readCookie("ab_home") ?? "B";
    try {
      posthog.capture("cta_clicked", {
        source: "offer-lp",
        variant,
        cta: "book_strategy_call",
      });
    } catch {
      /* no-op */
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
    >
      {/* Background — same subtle grid as the homepage for visual consistency */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-3xl" />
      </div>

      {/* Top strip: just logo + wordmark. No nav links. */}
      <header className="max-w-2xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Image src="/favicon.svg" alt="" width={28} height={28} aria-hidden="true" />
        <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-10 md:pt-14 pb-16 text-center">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[11px] md:text-xs font-medium text-orange-700 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          Accepting 2 new projects this month
        </motion.div>

        {/* Frustration hook */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-xl font-bold tracking-tight mb-4"
        >
          <span className="text-zinc-900">Why is your site</span>{" "}
          <span className="text-orange-600">not converting?</span>
        </motion.p>

        {/* Headline — 7 words, 3-part gradient (matches homepage verbatim) */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1] pb-1"
        >
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">
            Because your page
          </span>{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">
            isn&rsquo;t built to
          </span>{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-orange-600 pb-1">
            sell.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8"
        >
          I audit what is losing you visitors, rewrite the copy, and rebuild the page around conversion.{" "}
          <span className="font-semibold text-zinc-900">Measurable lift in two weeks.</span>
        </motion.p>

        {/* Single CTA — full-width on mobile, large touch target */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex justify-center mb-5"
        >
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-orange-700 text-white text-base font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 group"
          >
            Book my strategy call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Distributed trust band directly under the CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-zinc-500 mb-12"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full">
            <Users className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <span className="font-medium text-zinc-700">{TRUST_SIGNALS[0].label}</span>
          </div>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <span className="hidden sm:inline">{TRUST_SIGNALS[1].label}</span>
          <span className="hidden sm:inline text-zinc-300">•</span>
          <span className="hidden sm:inline">{TRUST_SIGNALS[2].label}</span>
        </motion.div>

        {/* One testimonial — trust near the action */}
        <motion.figure
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="border border-zinc-100 bg-white px-6 py-8 max-w-xl mx-auto text-left mb-10"
        >
          <div className="flex gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="text-base md:text-lg text-zinc-900 leading-relaxed font-medium mb-4">
            &ldquo;The new design is clean, loads fast, and converts way better than what we had before.
            Onboarding signups went up by half.&rdquo;
          </blockquote>
          <figcaption className="text-sm">
            <span className="font-bold text-zinc-900">Josh Schachter</span>{" "}
            <span className="text-zinc-500">· Founder &amp; CEO, UpdateAI</span>
          </figcaption>
        </motion.figure>

        {/* Logo strip — trust near headline/action, low decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-zinc-400 mb-16"
          aria-label="Companies I have shipped work for"
        >
          {CLIENT_BRANDS.map((brand, i) => (
            <span key={brand} className={i % 2 === 0 ? "text-zinc-700" : ""}>
              {brand}
            </span>
          ))}
        </motion.div>

        {/* Honest footer line — no competing links */}
        <p className="text-[11px] text-zinc-400 font-mono tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Rashid Iqbal · Remote, working worldwide
        </p>
      </section>
    </main>
  );
}
