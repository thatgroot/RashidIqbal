"use client";

// OpenAI-Codex hero. Centred composition. White → soft-violet → white
// atmospheric backdrop that terminates in pure white at the bottom so
// there is NO visible seam between the hero and the next section.
//
// Layout: the hero product mockup is `position: absolute` with z-99
// and pulled down so that ~25% of its height bleeds into the section
// below, then nudged 100px upward so the float sits closer to the
// CTAs. The hero `<section>` reserves enough bottom space to leave
// 75% of the image inside the hero band.
//
// Animation: the headline animates one character at a time on first
// paint (Framer Motion stagger). Each glyph fades + rises 8px in
// sequence, with a slight per-letter delay (24ms).

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Headline split into segments so the second word ("Studio") can pick
// up the amber liquid-glass text-gradient while the first stays in
// pure ink. Each segment is animated character-by-character below.
const HEADLINE_SEGMENTS = [
  { text: "Aestho", gradient: false },
  { text: " ", gradient: false },
  { text: "Studio", gradient: true },
] as const;
const HEADLINE_FULL = HEADLINE_SEGMENTS.map((s) => s.text).join("");
const HEADLINE_LEN = HEADLINE_FULL.length;

export function Hero() {
  return (
    <section
      className="relative bg-white"
      style={{ overflow: "visible" }}
      aria-label="Aestho"
    >
      {/* Atmospheric backdrop — terminates in white so the seam between
          hero and the next section disappears. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 80% at 90% 25%, rgba(255,241,207,0.85) 0%, rgba(255,241,207,0) 60%), radial-gradient(50% 70% at 10% 70%, rgba(253,232,163,0.7) 0%, rgba(253,232,163,0) 60%), radial-gradient(40% 60% at 60% 80%, rgba(255,241,207,0.55) 0%, rgba(255,241,207,0) 60%), linear-gradient(180deg, #ffffff 0%, #fffaf0 50%, #ffffff 100%)",
        }}
      />

      <div className="relative max-w-container mx-auto px-6 md:px-10 pt-36 md:pt-44">
        {/* Per-character animated wordmark headline. */}
        <motion.h1
          aria-label={HEADLINE_FULL}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.024, delayChildren: 0.06 } },
          }}
          className="text-center text-[clamp(3.75rem,11.5vw,9.25rem)] tracking-[-0.03em] leading-[1.0] text-[#0a0a0a]"
          style={{ fontVariationSettings: '"wght" 700' }}
        >
          {HEADLINE_SEGMENTS.flatMap((seg) =>
            seg.text.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              aria-hidden="true"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{
                whiteSpace: ch === " " ? "pre" : "normal",
              }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.06 + HEADLINE_LEN * 0.024 + 0.1,
          }}
          className="mt-7 text-center text-[1.25rem] md:text-[1.5rem] leading-[1.35] text-[#404040] max-w-3xl mx-auto"
        >
          <span className="block">Design, build and ship</span>
          <span className="block">
            <RotatingWord />
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.06 + HEADLINE_LEN * 0.024 + 0.2,
          }}
          className="mt-12 flex items-center justify-center gap-3 flex-wrap"
        >
          <Link href="/#booking-calendar" className="btn-pill btn-pill-primary group">
            Book a strategy call
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/work" className="btn-pill btn-pill-ghost">
            See the work
          </Link>
        </motion.div>

        {/* Spacer reserving 75% of the image height inside the hero so
            the absolutely-positioned mockup below doesn't collide with
            this content block. */}
        <div
          aria-hidden="true"
          className="mt-16 md:mt-20"
          style={{ height: "calc(min(1320px, 90vw) * 10 / 16 * 0.75)" }}
        />
      </div>

      {/* Floating product mockup — absolute, z-99, no shadow. Lifted
          100px from the original 25% bleed position so it nudges
          closer to the CTAs. */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
        className="absolute left-1/2 -translate-x-1/2 px-6 md:px-10 w-full"
        style={{
          // Original calc was `* -0.25` (25% bleed). Adding +100px
          // shifts the image upward by 100px relative to the hero.
          bottom: `calc(min(1320px, 90vw) * 10 / 16 * -0.25 + 100px)`,
          maxWidth: "1320px",
          zIndex: 99,
        }}
      >
        <HeroScreenshotCarousel />
      </motion.div>

      <div aria-hidden="true" style={{ height: "200px" }} />
    </section>
  );
}

/** Reserved top-padding the next section adds to absorb the bleed. */
export const HERO_BLEED_TOP_PADDING_PX = 360;

// ---- HeroScreenshotCarousel -----------------------------------------
//
// Cycles a stack of client screenshots inside the hero browser-chrome
// frame. Two pieces in motion at once:
//
//   1. The browser-chrome domain label (top of the window) cross-fades
//      via AnimatePresence `mode: "wait"` so only one URL is visible
//      at a time.
//   2. The screenshot itself uses an *overlapping* cross-fade — each
//      candidate image is absolutely stacked, animated independently
//      with a blur + scale pixelation envelope on entry/exit:
//
//        entering: opacity 0 → 1, blur 24px → 0, scale 1.04 → 1
//        exiting:  opacity 1 → 0, blur 0 → 24px, scale 1 → 1.04
//
//      The `contrast(1.4)` mid-transition pushes the blurred state
//      toward chunky digital pixelation rather than a soft gaussian
//      smear. Combined with `image-rendering: pixelated` during the
//      transformed window, transitions read as a hardware "morph"
//      rather than a film dissolve.
//
// Auto-rotates every 3.5s. Pauses if the user prefers reduced motion.

const HERO_SCREENSHOTS = [
  { domain: "update.ai", src: "/work-screenshots/updateai.png", label: "UpdateAI" },
  { domain: "vanos.ai", src: "/work-screenshots/vanos-ai.png", label: "Vanos AI" },
  { domain: "atqleads.com", src: "/work-screenshots/atqleads.jpg", label: "ATQLeads" },
  { domain: "melissaambrosini.com", src: "/work-screenshots/melissa-ambrosini.png", label: "Melissa Ambrosini" },
  { domain: "nickbroadhurst.com", src: "/work-screenshots/nick-broadhurst.png", label: "Nick Broadhurst" },
] as const;

function HeroScreenshotCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SCREENSHOTS.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const current = HERO_SCREENSHOTS[index];

  return (
    <div className="relative rounded-[1.25rem] overflow-hidden bg-white border border-[#e5e5e5]">
      {/* Image stack — each frame absolutely-positioned so transitions
          can OVERLAP (cross-fade with simultaneous blur/scale). */}
      <div className="relative aspect-[16/10] bg-[#fafafa] overflow-hidden">
        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{
                opacity: 0,
                filter: "blur(24px) contrast(1.35) saturate(0.9)",
                scale: 1.04,
                imageRendering: "pixelated" as const,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px) contrast(1) saturate(1)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                filter: "blur(24px) contrast(1.35) saturate(0.9)",
                scale: 1.04,
                imageRendering: "pixelated" as const,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={current.src}
                alt={`${current.label} marketing site, designed and shipped by Aestho`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 1320px"
                // `object-cover` fills the 16:10 frame on both axes and
                // crops whatever overflows. `object-[center_top]` biases
                // toward keeping the top of the screenshot in view —
                // marketing-site headers/heroes are usually the most
                // important content — while still cutting overflow on
                // the sides for square-ish images like ATQLeads
                // (2698×2250 ≈ 1.2:1 vs the frame's 1.6:1).
                className="object-cover object-[center_top]"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Index dots — bottom-right overlay so the visitor can spot
            which slot is currently visible without being intrusive. */}
        <div className="absolute bottom-3 right-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur border border-[#e5e5e5]">
          {HERO_SCREENSHOTS.map((s, i) => (
            <button
              key={s.domain}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.label}`}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                backgroundColor:
                  i === index ? "#0a0a0a" : "#d4d4d4",
                width: i === index ? "0.8rem" : "0.375rem",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- RotatingWord ---------------------------------------------------
//
// Cycles through "Marketing → GTM → Product …" in place. Because the
// rotating word now lives on its OWN line followed by "Websites", the
// previous layout-width-animation gymnastics are unnecessary — the
// whole line simply re-centres itself when the word changes.
// AnimatePresence handles the vertical fade-rotate; the amber liquid-
// glass gradient pulls the eye to the rotating word.

// Each rotating phrase carries its own "Websites" so the whole noun
// phrase swaps as one unit. Both leading word and "Websites" are
// capitalised — keeps the line reading as a proper title.
const ROTATING_WORDS = [
  "Marketing Websites",
  "GTM Websites",
  "Product Websites",
  "Growth Websites",
  "Launch Websites",
  "Conversion Websites",
] as const;

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline align-baseline overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "0.4em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.4em", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap text-gradient-amber"
          style={{ fontVariationSettings: '"wght" 600' }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
