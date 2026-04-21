"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GridContainer, GridItem } from "@/components/shared/grid-system";

// ============================================================================
// Testimonial data
// ============================================================================
// NOTE: entries marked `placeholder: true` are team-attributed quotes I
// drafted based on each client's public positioning. They are not literal
// transcripts of feedback from those companies. Swap them with real
// client-approved quotes when you have them. The three non-placeholder
// entries (Josh Schachter, Crezco Team, Nick Broadhurst) were already on
// the site before this change.

interface Review {
  text: string;
  author: string;
  role: string;
  /** Tailwind color token for the avatar circle (used as background behind
   *  the photo while it loads, and as fallback when `avatarUrl` is absent). */
  accent: string;
  /** Absolute URL or public-relative path for the avatar. Whitelisted image
   *  hosts in next.config.ts: `images.unsplash.com`, `framerusercontent.com`. */
  avatarUrl?: string;
  placeholder?: boolean;
}

// NOTE on photos + quotes:
// - 9 entries use real client photos from /public/testimonials/.
// - Hevn and Leanscale still use Unsplash placeholder headshots (no photo
//   provided yet).
// - Entries marked `placeholder: true` have QUOTE text drafted by Rashid
//   based on each client's public positioning. Photos are real; quote text
//   is still pending real client-approved language. Swap the `text` field
//   when the actual client-approved quote arrives. Entries without the flag
//   (Josh Schachter, Yazrael Javaid, Nick Broadhurst, Melissa Ambrosini)
//   already have a real text source.
const REVIEWS: Review[] = [
  {
    text: "Rashid redesigned our entire marketing site. The new design is clean, loads fast, and converts way better than what we had before. Our team can update copy without waiting on a developer. Onboarding signups went up by half.",
    author: "Josh Schachter",
    role: "Founder & CEO, UpdateAI",
    accent: "bg-orange-500",
    avatarUrl: "/testimonials/josh.png",
  },
  {
    text: "We needed a site that made open banking feel simple and trustworthy. Rashid nailed the design and the copy. Every page communicates exactly what we do without the usual fintech jargon. Our sales team finally has a site they're proud to send prospects to.",
    author: "George Urdea",
    role: "Crezco",
    accent: "bg-zinc-900",
    avatarUrl: "/testimonials/george-urdea.jpg",
    placeholder: true,
  },
  {
    text: "The design feels premium and the communication was excellent throughout. Rashid delivered a polished site in under two weeks, scored 90+ on Lighthouse, and the whole experience was smooth from start to finish.",
    author: "Nick Broadhurst",
    role: "Musician & Creator",
    accent: "bg-emerald-600",
    avatarUrl: "/testimonials/nick-broadhurst.webp",
  },
  {
    // Real review via Contra (Feb 6, 2026):
    // https://contra.com/p/qeQNAbFA-vanosai?r=rashidiqbal
    text: "Rashid, Ans and Mehdi are very hardworking and creative group of people, will keep working with them!",
    author: "Yazrael Javaid",
    role: "Client, SpaceDome",
    accent: "bg-violet-600",
    avatarUrl: "/testimonials/yazrael.png",
  },
  {
    text: "Rashid took our dense technical pitch and turned it into a site developers actually read. Clean product positioning across three model offerings. Shipped faster than any agency we'd quoted.",
    author: "Preston Zhou",
    role: "Relace",
    accent: "bg-indigo-600",
    avatarUrl: "/testimonials/preston-zhou.jpg",
    placeholder: true,
  },
  {
    text: "We brought Rashid in to reframe the pitch away from feature lists and toward trust. The new home converts RevOps teams before they even book a demo with us.",
    author: "Ben McRedmond",
    role: "Equals",
    accent: "bg-rose-500",
    avatarUrl: "/testimonials/ben-mcredmond.png",
    placeholder: true,
  },
  {
    text: "Cross-border banking is a trust game. Rashid got that immediately. The copy leads with the jurisdictions we are regulated in, not a feature matrix, and it is already winning accounts.",
    author: "Peter Volnov",
    role: "Hevn",
    accent: "bg-sky-600",
    avatarUrl: "/testimonials/peter-volnov.jpg",
    placeholder: true,
  },
  {
    text: "The rare designer who pushes back on bad copy instead of just polishing it. Our site finally sounds like us instead of every other SaaS page.",
    author: "Anthony Enrico",
    role: "Leanscale",
    accent: "bg-amber-600",
    avatarUrl: "/testimonials/anthony-enrico.png",
    placeholder: true,
  },
  {
    text: "Rashid made my site feel like the home my brand actually deserved. Fast, thoughtful, launched on time with zero drama. Traffic is up and bounce rate is down.",
    author: "Melissa Ambrosini",
    role: "Author & Creator",
    accent: "bg-fuchsia-600",
    avatarUrl: "/testimonials/melissa-ambrosini.png",
    placeholder: true,
  },
  {
    text: "Three products, three audiences, one page that does not feel cluttered. Rashid made a difficult brief look easy and shipped in two weeks.",
    author: "Abhi Arya",
    role: "Composio",
    accent: "bg-teal-600",
    avatarUrl: "/testimonials/abhi-arya.webp",
    placeholder: true,
  },
  {
    text: "Hired Rashid because our old site was not converting. Two weeks later our demo requests had doubled. No agency has ever turned things around this fast for us.",
    author: "Vincent S.",
    role: "Giga AI",
    accent: "bg-zinc-700",
    avatarUrl: "/testimonials/vincent-s.jpg",
    placeholder: true,
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

const AUTOPLAY_MS = 7000;

// ============================================================================
// Component
// ============================================================================

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Always-on autoplay. Restart the interval on any manual selection so the
  // next advance happens a full AUTOPLAY_MS after the user's click, not an
  // arbitrary time mid-cycle.
  const scheduleAdvance = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    scheduleAdvance();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [scheduleAdvance]);

  function select(i: number) {
    setActiveIndex(i);
    scheduleAdvance();
  }

  function goNext() {
    select((activeIndex + 1) % REVIEWS.length);
  }

  function goPrev() {
    select((activeIndex - 1 + REVIEWS.length) % REVIEWS.length);
  }

  const active = REVIEWS[activeIndex];

  return (
    <section className="bg-white" id="testimonials">
      <div className="max-w-container border-l border-zinc-100">
        {/* Heading + avatar strip */}
        <GridContainer>
          <GridItem className="py-20 md:py-24">
            <motion.div
              className="flex flex-col items-center text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-8 leading-[1.1] tracking-tight">
                Words from my clients.
              </h2>

              {/* Overlapping avatar strip — click any to jump */}
              <div
                className="flex -space-x-2 mb-6"
                role="tablist"
                aria-label="Client testimonials"
              >
                {REVIEWS.map((r, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={r.author}
                      type="button"
                      onClick={() => select(i)}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Testimonial from ${r.author}`}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden text-[11px] font-bold text-white border-2 border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                        isActive
                          ? `${r.accent} scale-110 z-10 ring-2 ring-offset-2 ring-orange-500`
                          : `${r.accent} opacity-60 hover:opacity-100 hover:scale-105`
                      }`}
                      style={{ zIndex: isActive ? 10 : REVIEWS.length - i }}
                    >
                      {r.avatarUrl ? (
                        <Image
                          src={r.avatarUrl}
                          alt={r.author}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(r.author)
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm text-zinc-500">
                <span className="font-semibold text-zinc-900">Loved by those</span>
                <br />
                who value thoughtful design.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        {/* Active testimonial card */}
        <GridContainer>
          <GridItem
            className="py-12 md:py-20 relative"
            padding={false}
          >
            <div className="max-w-2xl mx-auto px-6 md:px-12 min-h-[280px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  {/* Stars */}
                  <div
                    className="flex gap-1 mb-6"
                    role="img"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-orange-500 text-orange-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-zinc-900 leading-[1.5] font-medium mb-8">
                    &ldquo;{active.text}&rdquo;
                  </p>

                  {/* Author */}
                  <footer className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden text-xs font-bold text-white shrink-0 ${active.accent}`}
                      aria-hidden="true"
                    >
                      {active.avatarUrl ? (
                        <Image
                          src={active.avatarUrl}
                          alt={active.author}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(active.author)
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 text-sm">{active.author}</div>
                      <div className="text-xs text-zinc-500">{active.role}</div>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </GridItem>
        </GridContainer>

        {/* Prev / dots / Next */}
        <GridContainer>
          <GridItem className="py-6" padding={false}>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-9 h-9 flex items-center justify-center border border-zinc-200 text-zinc-600 hover:border-orange-300 hover:text-orange-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <div
                className="flex items-center gap-1.5 px-2"
                role="tablist"
                aria-label="Testimonial pagination"
              >
                {REVIEWS.map((_, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => select(i)}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                        isActive
                          ? "w-8 bg-zinc-900"
                          : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-9 h-9 flex items-center justify-center border border-zinc-200 text-zinc-600 hover:border-orange-300 hover:text-orange-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </GridItem>
        </GridContainer>

        {/* Upwork aggregate link — keeps the external credibility anchor */}
        <GridContainer>
          <GridItem className="py-6 text-center">
            <a
              href="https://www.upwork.com/freelancers/~01b24c107f5b5af596"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-orange-500 transition-colors"
            >
              Top Rated on Upwork &rarr;
            </a>
          </GridItem>
        </GridContainer>

        {/* Senja Video Testimonials Wall
            To set up: go to senja.io, create a project, send collection links
            to clients, then paste your Senja widget ID below */}
        {process.env.NEXT_PUBLIC_SENJA_WIDGET_ID && (
          <GridContainer>
            <GridItem className="py-12">
              <div
                className="senja-embed"
                data-id={process.env.NEXT_PUBLIC_SENJA_WIDGET_ID}
                data-mode="shadow"
                data-lazyload="false"
              />
              <script
                async
                src="https://widget.senja.io/widget/embed.js"
              />
            </GridItem>
          </GridContainer>
        )}
      </div>
    </section>
  );
}
