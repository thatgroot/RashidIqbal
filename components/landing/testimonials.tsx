"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Canvas-style testimonial gallery. Every card is visible — no carousel,
// no autoplay. Cards alternate slight rotations (-2° / +2°) so the
// section reads as a scrapbook of pinned polaroids rather than a uniform
// grid. CMS rows are the source of truth; the hardcoded REVIEWS array is
// only used as a fallback during a fresh deploy or DB outage.

interface Review {
  text: string;
  author: string;
  role: string;
  accent: string;
  avatarUrl?: string;
  placeholder?: boolean;
}

// Verified-only fallback — entries marked placeholder:true (drafted but
// not client-approved) are filtered out before render.
const REVIEWS: Review[] = [
  {
    text: "Rashid redesigned our entire marketing site. The new design is clean, loads fast, and converts way better than what we had before. Our team can update copy without waiting on a developer. Onboarding signups went up by half.",
    author: "Josh Schachter",
    role: "Founder & CEO, UpdateAI",
    accent: "bg-orange-500",
    avatarUrl: "/testimonials/josh.png",
  },
  {
    text: "The design feels premium and the communication was excellent throughout. Rashid delivered a polished site in under two weeks, scored 90+ on Lighthouse, and the whole experience was smooth from start to finish.",
    author: "Nick Broadhurst",
    role: "Musician & Creator",
    accent: "bg-emerald-600",
    avatarUrl: "/testimonials/nick-broadhurst.webp",
  },
  {
    text: "Rashid, Ans and Mehdi are very hardworking and creative group of people, will keep working with them!",
    author: "Yazrael Javaid",
    role: "Client, SpaceDome",
    accent: "bg-violet-600",
    avatarUrl: "/testimonials/yazrael.png",
  },
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Deterministic-but-varied rotation by index so re-renders + SSR stay
// stable. Cycles -2°, +2°, -1°, +1°, 0°.
function rotationFor(i: number): number {
  const cycle = [-2, 2, -1.2, 1.2, 0, -2.4, 2.4];
  return cycle[i % cycle.length] ?? 0;
}

function accentToHex(accent: string): string {
  const map: Record<string, string> = {
    "bg-orange-500": "#f97316",
    "bg-orange-600": "#ea580c",
    "bg-zinc-900": "#18181b",
    "bg-zinc-700": "#3f3f46",
    "bg-emerald-600": "#059669",
    "bg-violet-600": "#7c3aed",
    "bg-indigo-600": "#4f46e5",
    "bg-rose-500": "#f43f5e",
    "bg-sky-600": "#0284c7",
    "bg-amber-600": "#d97706",
    "bg-fuchsia-600": "#c026d3",
    "bg-teal-600": "#0d9488",
  };
  return map[accent] ?? "#52525b";
}

export function Testimonials({ items }: { items?: Review[] }) {
  const verifiedFallback = REVIEWS.filter((r) => !r.placeholder);
  const reviews = items && items.length > 0 ? items : verifiedFallback;

  return (
    <section
      className="bg-zinc-50 text-zinc-900 relative overflow-hidden border-y border-zinc-100"
      id="testimonials"
    >
      {/* Soft dotted texture — light variant. */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #18181b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-24 md:pb-36 relative z-10">
        {/* Header — big "Testimonials" wordmark + eyebrow tags */}
        <header className="mb-14 md:mb-20">
          <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.22em] border border-zinc-200 bg-white px-2.5 py-1 rounded-full">
              Don&rsquo;t just take my word for it
            </span>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.22em] border border-zinc-200 bg-white px-2.5 py-1 rounded-full">
              Kind words
            </span>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.22em] border border-zinc-200 bg-white px-2.5 py-1 rounded-full">
              Happy customers
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.85] text-zinc-900">
            Testimonials
          </h2>
        </header>

        {/* Canvas — CSS columns gives a Pinterest/scrapbook feel where
            each card flows into the next column rather than locking to a
            row baseline. Every card is rendered; no carousel. */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-7 [column-fill:_balance]">
          {reviews.map((r, i) => (
            <TestimonialCard key={`${r.author}-${i}`} review={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  review,
  index,
}: {
  review: Review;
  index: number;
}) {
  const rotate = rotationFor(index);
  const accentHex = accentToHex(review.accent);
  const hasPhoto = !!review.avatarUrl;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      style={{ rotate: `${rotate}deg` }}
      className="group relative mb-5 md:mb-7 break-inside-avoid bg-white text-zinc-900 rounded-lg p-5 md:p-6 border border-zinc-100 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.22)]"
    >
      {/* Avatar polaroid — small portrait pinned to the top-left corner.
          Rotated counter-direction so the photo doesn't tilt the same
          way as the card. */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-md overflow-hidden ring-1 ring-zinc-200 shadow-sm"
          style={{ rotate: `${-rotate * 0.6}deg`, backgroundColor: accentHex }}
        >
          {hasPhoto ? (
            <Image
              src={review.avatarUrl as string}
              alt={review.author}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              {getInitials(review.author)}
            </span>
          )}
        </div>
        <figcaption className="min-w-0">
          <p className="text-sm font-bold text-zinc-900 leading-tight truncate">
            {review.author}
          </p>
          <p className="text-xs text-zinc-500 leading-snug mt-0.5">
            {review.role}
          </p>
        </figcaption>
      </div>

      <blockquote className="text-sm md:text-[15px] text-zinc-700 leading-relaxed">
        <span aria-hidden="true" className="text-zinc-300 mr-0.5">
          &ldquo;
        </span>
        {review.text}
        <span aria-hidden="true" className="text-zinc-300 ml-0.5">
          &rdquo;
        </span>
      </blockquote>

      {/* Subtle accent bar — a thin colored line at the bottom of the
          card that picks up the testimonial's accent color. */}
      <div
        className="mt-5 h-[3px] w-10 rounded-full"
        style={{ backgroundColor: accentHex }}
        aria-hidden="true"
      />
    </motion.figure>
  );
}
