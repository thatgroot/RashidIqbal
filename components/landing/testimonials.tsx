"use client";

import Image from"next/image";
import { motion } from"framer-motion";
import { Star } from"lucide-react";

// Superhuman + cap.so testimonials. Drops the polaroid scrapbook in
// favor of a clean 3-column quote grid:
//   - Star strip header ("⭐ 30 verified · 4.9 avg")
//   - Editorial opener
//   - Quote cards: large quote in display-md weight, photo + name + role
//     at the bottom, small accent bar in violet-soft.
//   - Hover: lifts 4px, violet-soft ring fades in.
//   - Stagger reveal on scroll.
//
// CMS rows are the source of truth via the optional `items` prop.
// Hardcoded REVIEWS is the verified-only fallback.

interface Review {
  text: string;
  author: string;
  role: string;
  accent: string;
  avatarUrl?: string;
  placeholder?: boolean;
}

const REVIEWS: Review[] = [
  {
    text:"Rashid redesigned our entire marketing site. The new design is clean, loads fast, and converts way better than what we had before. Our team can update copy without waiting on a developer. Onboarding signups went up by half.",
    author:"Josh Schachter",
    role:"Founder & CEO, UpdateAI",
    accent:"violet",
    avatarUrl:"/testimonials/josh.png",
  },
  {
    text:"The design feels premium and the communication was excellent throughout. Rashid delivered a polished site in under two weeks, scored 90+ on Lighthouse, and the whole experience was smooth from start to finish.",
    author:"Nick Broadhurst",
    role:"Musician & Creator",
    accent:"teal",
    avatarUrl:"/testimonials/nick-broadhurst.webp",
  },
  {
    text:"Rashid, Ans and Mehdi are very hardworking and creative group of people, will keep working with them!",
    author:"Yazrael Javaid",
    role:"Client, SpaceDome",
    accent:"violet",
    avatarUrl:"/testimonials/yazrael.png",
  },
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0] ||"")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function accentToHex(accent: string): string {
  // Accepts either short brand keys ("violet" /"teal" /"indigo") or
  // legacy `bg-[#hex]` strings carried over from CMS rows.
  const map: Record<string, string> = {
    violet:"#fde8a3",
    teal:"#0a0a0a",
    indigo:"#0a0a0a",
"bg-[#fde8a3]":"#fde8a3",
"bg-[#0a0a0a]":"#0a0a0a",
  };
  return map[accent] ??"#fde8a3";
}

export function Testimonials({ items }: { items?: Review[] }) {
  const verifiedFallback = REVIEWS.filter((r) => !r.placeholder);
  const reviews = items && items.length > 0 ? items : verifiedFallback;

  return (
    <section
      className="bg-[#fafafa] text-[#0a0a0a] relative overflow-hidden border-y border-[#e5e5e5]"
      id="testimonials"
    >
      <div className="max-w-container mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32 relative z-10">
        {/* Editorial opener */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin:"-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <p
            className="text-[11px] uppercase tracking-[0.22em] text-[#737373] mb-4"
            style={{ fontVariationSettings: '"wght" 540' }}
          >
            04 · Receipts
          </p>
          <h2
            className="text-[clamp(38px,5.6vw,68px)] tracking-[-0.024em] leading-[0.96] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 460' }}
          >
            Don&rsquo;t take our word.
            <br className="hidden md:inline" />
            <span className="text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 540' }}>
              {""}Take theirs.
            </span>
          </h2>

          {/* Star strip — cap.so trust pattern. */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <div className="inline-flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#0a0a0a]"
                  fill="#0a0a0a"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span
              className="text-[#0a0a0a]"
              style={{ fontVariationSettings: '"wght" 600' }}
            >
              4.9 average
            </span>
            <span className="text-[#a3a3a3]">·</span>
            <span className="text-[#737373]">30 verified reviews</span>
            <span className="text-[#a3a3a3]">·</span>
            <a
              href="https://www.upwork.com/freelancers/~01b24c107f5b5af596"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a0a0a] underline decoration-[#fde8a3] underline-offset-2 hover:decoration-[#0a0a0a]"
              style={{ fontVariationSettings: '"wght" 540' }}
            >
              Upwork Top Rated
            </a>
          </div>
        </motion.div>

        {/* 3-column grid. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
  const accentHex = accentToHex(review.accent);
  const hasPhoto = !!review.avatarUrl;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-60px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-lg p-7 md:p-8 border border-[#e5e5e5] hover:border-[#0a0a0a] transition-all flex flex-col"
    >
      {/* Quote mark — cap.so style, oversized + violet-soft. */}
      <span
        aria-hidden="true"
        className="absolute top-5 right-6 text-[64px] leading-none text-[#fde8a3]/35 select-none pointer-events-none"
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        &ldquo;
      </span>

      {/* Stars (per review — assumes 5/5 for now). */}
      <div className="inline-flex items-center gap-0.5 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 text-[#0a0a0a]"
            fill="#0a0a0a"
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote
        className="text-[16px] md:text-[17px] text-[#0a0a0a] leading-[1.6] flex-1"
        style={{ fontVariationSettings: '"wght" 460' }}
      >
        {review.text}
      </blockquote>

      {/* Author row — cap.so pattern: photo + name + role. */}
      <figcaption className="mt-6 pt-5 border-t border-[#e5e5e5] flex items-center gap-3">
        <div
          className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full ring-1 ring-[#e5e5e5]"
          style={{ backgroundColor: accentHex }}
        >
          {hasPhoto ? (
            <Image
              src={review.avatarUrl as string}
              alt={review.author}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <span
              className="absolute inset-0 flex items-center justify-center text-white text-[12px]"
              style={{ fontVariationSettings: '"wght" 600' }}
            >
              {getInitials(review.author)}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p
            className="text-[14px] text-[#0a0a0a] leading-tight truncate"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            {review.author}
          </p>
          <p className="text-[12px] text-[#737373] leading-snug mt-0.5 truncate">
            {review.role}
          </p>
        </div>
      </figcaption>

      {/* Bottom accent bar (violet/teal/indigo per review). */}
      <div
        className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accentHex }}
        aria-hidden="true"
      />
    </motion.figure>
  );
}
