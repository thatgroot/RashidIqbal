"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

// Dark proof showcase — sits directly under the hero. Three layers:
//
//   1. "Book a FREE 30 minute call" pill at top.
//   2. Horizontally-scrollable row of project preview cards. Each card
//      is a screenshot of the live site with the client name + outcome
//      overlaid on hover.
//   3. Compact "Trusted by brands around the world" strip with brand
//      names below — replaces the old <TrustedBy /> rotating logos.
//
// CMS-driven via the items prop; falls back to a static set when the DB
// is unreachable so the section never goes empty.

export type CaseStudyCard = {
  client: string;
  result: string;
  detail?: string;
  link: string;
  tags: string[];
  screenshot?: string;
};

const DEFAULT_CASES: CaseStudyCard[] = [
  {
    client: "UpdateAI",
    result: "Onboarding signups +50% in 60 days.",
    detail: "+50% · onboarding signups",
    link: "https://www.update.ai",
    tags: ["SaaS", "AI"],
    screenshot: "/work-screenshots/updateai.png",
  },
  {
    client: "Vanos AI",
    result: "Weekly active developers in docs 2× in 30 days.",
    detail: "2× · weekly active developers",
    link: "https://vanos.ai",
    tags: ["AI", "Developer tools"],
    screenshot: "/work-screenshots/vanos-ai.png",
  },
  {
    client: "SpaceDome",
    result: "Sign-ups from the homepage 3× in 6 weeks.",
    detail: "3× · signups from homepage",
    link: "https://spacedome.ai",
    tags: ["B2B SaaS"],
    screenshot: "/work-screenshots/space-dome.png",
  },
];

const TRUSTED_BRANDS = [
  "UpdateAI",
  "Cartage",
  "Solidroad",
  "Karumi",
  "Liftoff",
  "Keel",
  "Circleback",
  "Pageloop",
  "ATQLeads",
  "Localyzer",
  "Vanos AI",
  "SpaceDome",
  "Crezco",
  "Melissa Ambrosini",
  "Nick Broadhurst",
  "Titan Gatequity",
  "Ask Dialog",
  "AAKP",
];

export function CaseStudies({ items }: { items?: CaseStudyCard[] }) {
  const cases = items && items.length > 0 ? items : DEFAULT_CASES;

  return (
    <section
      id="case-studies"
      className="relative bg-zinc-950 text-white overflow-hidden"
    >
      {/* Dotted background — same tone as the testimonials canvas. */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-20 md:pb-28">
        {/* Top pill — anchors to the in-page booking section. */}
        <div className="flex justify-center mb-12 md:mb-16">
          <a
            href="#booking-calendar"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#booking-calendar")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 text-sm md:text-base font-medium hover:bg-white transition-colors shadow-lg"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            Book a FREE 30 minute call
          </a>
        </div>

        {/* Horizontal-scroll showcase. CSS scroll-snap so each card
            settles cleanly. Hidden scrollbar — drag-to-scroll on
            trackpad / touch. */}
        <ProjectShowcase cases={cases} />

        {/* Trust strip */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-sm md:text-base text-zinc-400 mb-6">
            Trusted by brands around the world
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {TRUSTED_BRANDS.map((b) => (
              <span
                key={b}
                className="text-xs md:text-sm font-semibold text-zinc-500 hover:text-zinc-200 transition-colors uppercase tracking-wide"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ cases }: { cases: CaseStudyCard[] }) {
  // Show each case at least once; if there are fewer than 5, repeat
  // them so the row feels populated and remains scrollable.
  const display =
    cases.length >= 5 ? cases : [...cases, ...cases].slice(0, Math.max(5, cases.length));

  return (
    <div className="relative -mx-6 md:-mx-8">
      <div
        className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-8 pb-4 snap-x snap-mandatory scrollbar-thin"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {display.map((c, i) => (
          <ProjectCard key={`${c.client}-${i}`} caseStudy={c} index={i} />
        ))}
      </div>
      {/* Hide WebKit scrollbar inline; cleaner than a global stylesheet rule. */}
      <style>{`
        section#case-studies div[class*="overflow-x-auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function ProjectCard({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudyCard;
  index: number;
}) {
  const isExternal = caseStudy.link.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.a
      href={caseStudy.link}
      {...linkProps}
      aria-label={`View ${caseStudy.client} project`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative shrink-0 w-[280px] md:w-[360px] lg:w-[420px] aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 snap-start hover:border-orange-500/40 transition-colors"
    >
      {caseStudy.screenshot ? (
        <Image
          src={caseStudy.screenshot}
          alt={`${caseStudy.client} site preview`}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 280px"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
          <span className="text-3xl font-bold text-white/40 tracking-tight">
            {caseStudy.client}
          </span>
        </div>
      )}

      {/* Bottom gradient + label always visible on dark cards. */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/85 via-black/60 to-transparent">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {caseStudy.client}
            </p>
            {caseStudy.detail && (
              <p className="text-[11px] font-mono text-orange-300/90 uppercase tracking-wider mt-0.5 truncate">
                {caseStudy.detail}
              </p>
            )}
          </div>
          <ArrowUpRight
            className="w-5 h-5 text-white/70 shrink-0 group-hover:text-orange-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.a>
  );
}
