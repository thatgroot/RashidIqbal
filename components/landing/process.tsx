"use client";

//"From idea to ship, with Aestho" — Codex pattern.
//   - Centred chip + heavy black headline + sub.
//   - 4 numbered step CARDS (rounded-2xl, hairline border, padding 6,
//     h-full flex-col so all heights match across the row).
//   - Custom SVG icon per step — clean, minimalistic, monochrome,
//     stroke-based.
//   - Dotted lavender connectors run BETWEEN the cards (positioned
//     into the grid gap, not inside any column).
//   - 4th card flips to dark with a violet/blue corner glow ("Ship").
//   - Bottom:"Ready to move faster?" + black pill CTA.

import Link from"next/link";
import Image from"next/image";
import { motion } from"framer-motion";
import { Check } from"lucide-react";

// ---- Custom SVG step icons ------------------------------------------
//
// 24×24 viewBox. Three-colour palette only: amber gradient
// (#E6B431 → #9C7307), pure black (#0A0A0A), white. No currentColor —
// these are illustrative marks, not UI glyphs, and they shouldn't
// recolour with the surrounding text. The Ship icon swaps black for
// white because it lives on the dark Day-5 card.

const Icon = {
  // Day 0 — two cards diagonally placed with an amber connecting arc.
  Connect: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="proc-connect-arc" x1="7" y1="7.5" x2="15.95" y2="17.45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
        <linearGradient id="proc-connect-front" x1="12.5" y1="12" x2="21.5" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <path opacity="0.55" d="M7 7.5C11 7.5 13 16.5 17 16.5" stroke="url(#proc-connect-arc)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9.25 3H4.75C3.5074 3 2.5 4.0074 2.5 5.25V9.75C2.5 10.9926 3.5074 12 4.75 12H9.25C10.4926 12 11.5 10.9926 11.5 9.75V5.25C11.5 4.0074 10.4926 3 9.25 3Z" fill="#0A0A0A" />
      <path opacity="0.7" d="M8.9 5H5.1C4.7686 5 4.5 5.2686 4.5 5.6V5.9C4.5 6.2314 4.7686 6.5 5.1 6.5H8.9C9.2314 6.5 9.5 6.2314 9.5 5.9V5.6C9.5 5.2686 9.2314 5 8.9 5Z" fill="white" />
      <path opacity="0.45" d="M6.9 7.5H5.1C4.7686 7.5 4.5 7.7686 4.5 8.1V8.4C4.5 8.7314 4.7686 9 5.1 9H6.9C7.2314 9 7.5 8.7314 7.5 8.4V8.1C7.5 7.7686 7.2314 7.5 6.9 7.5Z" fill="white" />
      <path d="M19.25 12H14.75C13.5074 12 12.5 13.0074 12.5 14.25V18.75C12.5 19.9926 13.5074 21 14.75 21H19.25C20.4926 21 21.5 19.9926 21.5 18.75V14.25C21.5 13.0074 20.4926 12 19.25 12Z" fill="url(#proc-connect-front)" />
      <path opacity="0.85" d="M18.9 14H15.1C14.7686 14 14.5 14.2686 14.5 14.6V14.9C14.5 15.2314 14.7686 15.5 15.1 15.5H18.9C19.2314 15.5 19.5 15.2314 19.5 14.9V14.6C19.5 14.2686 19.2314 14 18.9 14Z" fill="white" />
      <path opacity="0.55" d="M16.9 16.5H15.1C14.7686 16.5 14.5 16.7686 14.5 17.1V17.4C14.5 17.7314 14.7686 18 15.1 18H16.9C17.2314 18 17.5 17.7314 17.5 17.4V17.1C17.5 16.7686 17.2314 16.5 16.9 16.5Z" fill="white" />
    </svg>
  ),
  // Day 1 — three layered cards (depth silhouettes + amber front + dot).
  Assign: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="proc-assign-front" x1="3" y1="7" x2="16.96" y2="19.96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <path opacity="0.18" d="M17 3H8C6.8954 3 6 3.8954 6 5V15C6 16.1046 6.8954 17 8 17H17C18.1046 17 19 16.1046 19 15V5C19 3.8954 18.1046 3 17 3Z" fill="#0A0A0A" />
      <path opacity="0.32" d="M15.5 5H6.5C5.3954 5 4.5 5.8954 4.5 7V17C4.5 18.1046 5.3954 19 6.5 19H15.5C16.6046 19 17.5 18.1046 17.5 17V7C17.5 5.8954 16.6046 5 15.5 5Z" fill="#0A0A0A" />
      <path d="M14 7H5C3.8954 7 3 7.8954 3 9V19C3 20.1046 3.8954 21 5 21H14C15.1046 21 16 20.1046 16 19V9C16 7.8954 15.1046 7 14 7Z" fill="url(#proc-assign-front)" />
      <path opacity="0.85" d="M13.4 10H5.6C5.2686 10 5 10.2686 5 10.6V11C5 11.3314 5.2686 11.6 5.6 11.6H13.4C13.7314 11.6 14 11.3314 14 11V10.6C14 10.2686 13.7314 10 13.4 10Z" fill="white" />
      <path opacity="0.55" d="M10.4 13H5.6C5.2686 13 5 13.2686 5 13.6V13.8C5 14.1314 5.2686 14.4 5.6 14.4H10.4C10.7314 14.4 11 14.1314 11 13.8V13.6C11 13.2686 10.7314 13 10.4 13Z" fill="white" />
      <path opacity="0.55" d="M11.9 15.5H5.6C5.2686 15.5 5 15.7686 5 16.1V16.3C5 16.6314 5.2686 16.9 5.6 16.9H11.9C12.2314 16.9 12.5 16.6314 12.5 16.3V16.1C12.5 15.7686 12.2314 15.5 11.9 15.5Z" fill="white" />
      <path d="M13.5 19.1C14.3837 19.1 15.1 18.3837 15.1 17.5C15.1 16.6164 14.3837 15.9 13.5 15.9C12.6164 15.9 11.9 16.6164 11.9 17.5C11.9 18.3837 12.6164 19.1 13.5 19.1Z" fill="white" />
    </svg>
  ),
  // Day 3 — single black document silhouette with amber accent dot,
  // amber highlight bar, and two black ribbon rows.
  Review: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="proc-review-dot" x1="14" y1="2.4" x2="20" y2="8.4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
        <linearGradient id="proc-review-bar" x1="6" y1="11" x2="18" y2="13.4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <rect x="4" y="2.4" width="16" height="20" rx="2.5" opacity="0.2" fill="#0A0A0A" />
      <rect x="14" y="2.4" width="6" height="6" rx="1.5" fill="url(#proc-review-dot)" />
      <rect x="6" y="11" width="12" height="2.4" rx="1.2" fill="url(#proc-review-bar)" />
      <rect x="6" y="15" width="8" height="1.4" rx="0.7" opacity="0.6" fill="#0A0A0A" />
      <rect x="6" y="17.5" width="6" height="1.4" rx="0.7" opacity="0.4" fill="#0A0A0A" />
    </svg>
  ),
  // Day 5 — dark-card variant: amber main square + small white accent
  // dot + ground line + two white ribbon rows (white where the other
  // icons use black, so the mark reads on the dark Day-5 card).
  Ship: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="proc-ship-main" x1="19.5" y1="11" x2="5.5" y2="11" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <rect x="3" y="19" width="16" height="2" rx="1" opacity="0.3" fill="white" />
      <rect x="5.5" y="4" width="14" height="14" rx="2.5" fill="url(#proc-ship-main)" />
      <rect x="14.5" y="4" width="6" height="6" rx="1.5" opacity="0.4" fill="white" />
      <rect x="3.5" y="13.5" width="2.4" height="1.4" rx="0.7" opacity="0.6" fill="white" />
      <rect x="3.5" y="16" width="4" height="1.4" rx="0.7" opacity="0.3" fill="white" />
    </svg>
  ),
} as const;

// ---- Step config ----------------------------------------------------

const STEPS = [
  {
    n: 1,
    title:"Connect a project",
    body:"30-min kickoff. Share Figma, brand, references, ICP. We quote a fixed scope same day.",
    foot:"Read-only Figma access",
    icon: <Icon.Connect />,
    mock: <MockConnect />,
    dark: false,
  },
  {
    n: 2,
    title:"Assign the work",
    body:"Describe what you want shipped. The team plans the workstream, opens the Figma file and gets to it.",
    foot:"Runs in a private cloud sandbox",
    icon: <Icon.Assign />,
    mock: <MockAssign />,
    dark: false,
  },
  {
    n: 3,
    title:"Review the changes",
    body:"We open a Loom + a Figma diff with a clear summary so you see exactly what changed and why.",
    foot:"Transparent diffs and tests",
    icon: <Icon.Review />,
    mock: <MockReview />,
    dark: false,
  },
  {
    n: 4,
    title:"Ship with confidence",
    body:"You hit publish when ready. Domain, redirects, analytics — wired before launch, monitored after.",
    foot:"Ship, monitor, iterate",
    icon: <Icon.Ship />,
    mock: <MockShip />,
    dark: true,
  },
];

export function Process() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 codex-section-glow pointer-events-none"
      />

      <div className="relative max-w-container mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin:"-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="codex-chip mx-auto inline-flex">
            <span
              aria-hidden="true"
              className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[0.5625rem]"
              style={{
                background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
                fontVariationSettings: '"wght" 700',
              }}
            >
              A
            </span>
            How Aestho works
          </span>
          <h2
            className="mt-7 text-[clamp(2.5rem,5.6vw,4rem)] tracking-[-0.028em] leading-[1.04] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            From idea to ship, with Aestho.
          </h2>
          <p className="mt-5 text-[1.1875rem] leading-[1.5] text-[#404040] max-w-2xl mx-auto">
            Aestho works alongside you — to plan, design and ship a marketing
            site that converts, with no agency lead time.
          </p>
        </motion.div>

        {/* 4-card grid. Each card (except the last) renders its own
            outbound dotted connector that bridges the gap to the next
            card. Anchoring the connector to the card means it always
            lands inside the gap regardless of the grid's % math. */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-center gap-6">
          <span className="text-[1.0625rem] text-[#404040]">Ready to move faster?</span>
          <Link href="/#booking-calendar" className="btn-pill btn-pill-primary group">
            Get started with Aestho
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---- Step card ------------------------------------------------------

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const isDark = step.dark;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative h-full flex flex-col rounded-2xl p-6 md:p-7 ${
        isDark
          ?"text-white border border-white/[0.08]"
          :"bg-white border border-[#e5e5e5]"
      }`}
      style={
        isDark
          ? {
              // Tight bottom-right bloom only — keeps the top-left of
              // the card solid black so the"Ship with confidence"
              // title stays legible. Earlier gradient bled into the
              // type area at ~30% opacity and washed it out.
              background:
"radial-gradient(70% 80% at 100% 100%, rgba(230,180,49,0.55) 0%, rgba(248,200,77,0.16) 35%, rgba(10,10,10,0) 70%), #0a0a0a",
            }
          : { background:"#ffffff" }
      }
    >
      {/* Outbound dotted connector — anchored to THIS card's right edge
          and extending 2rem (= gap-x-8) into the gap so it lands flush
          with the next card's left edge. Hidden on the last card and
          on screens narrower than `lg` (where the grid stacks). */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="hidden lg:block absolute pointer-events-none"
          style={{
            top:"2.4rem",
            right:"-2rem",
            width:"2rem",
            borderTop:"1px dashed #fde8a3",
          }}
        />
      ) : null}
      {/* Number + custom SVG icon row */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-[0.9375rem] ${
            isDark ?"bg-white/10 text-white" :"bg-[#fdf3d0] text-[#9c7307]"
          }`}
          style={{ fontVariationSettings: '"wght" 600' }}
        >
          {step.n}
        </span>
        <span className={`w-6 h-6 ${isDark ?"text-white/85" :"text-[#9c7307]"}`}>
          {step.icon}
        </span>
      </div>

      <h3
        className={`mt-5 text-[1.25rem] tracking-[-0.012em] ${
          isDark ?"text-white" :"text-[#0a0a0a]"
        }`}
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        {step.title}
      </h3>

      <p className={`mt-3 text-[0.9375rem] leading-[1.6] ${isDark ?"text-white/70" :"text-[#737373]"}`}>
        {step.body}
      </p>

      <div className="mt-6">{step.mock}</div>

      <div
        className={`mt-auto pt-5 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] ${
          isDark ?"text-white/55" :"text-[#737373]"
        }`}
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        <span className={`w-1 h-1 rounded-full ${isDark ?"bg-[#fde8a3]" :"bg-[#e6b431]"}`} />
        {step.foot}
      </div>
    </motion.div>
  );
}

// ---- Mockups (kept compact so card heights stay reasonable) ---------

function MockConnect() {
  const items = [
    { name:"aestho/web", selected: true },
    { name:"updateai/site", selected: false },
    { name:"vanos-ai/web", selected: false },
  ];
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3">
      <p
        className="text-[0.6875rem] text-[#0a0a0a] mb-2 px-1"
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        Connect a project
      </p>
      <ul className="space-y-1">
        {items.map((it) => (
          <li
            key={it.name}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${
              it.selected ?"bg-[#fafafa]" :""
            }`}
          >
            <span className="inline-flex items-center gap-2 text-[0.75rem]">
              <span aria-hidden="true" className="w-3 h-3 inline-block rounded-sm bg-[#0a0a0a]" />
              <span className={it.selected ?"text-[#0a0a0a]" :"text-[#737373]"}>
                {it.name}
              </span>
            </span>
            {it.selected ? <Check className="w-3 h-3 text-[#16a34a]" aria-hidden="true" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockAssign() {
  const steps = [
    { label:"Plan", state:"done" as const },
    { label:"Hero rewrite", state:"done" as const },
    { label:"Figma layout", state:"current" as const },
    { label:"Review", state:"todo" as const },
  ];
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3">
      <div className="flex items-center gap-2 mb-2">
        <span
          aria-hidden="true"
          className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[0.5625rem]"
          style={{
            background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
            fontVariationSettings: '"wght" 700',
          }}
        >
          {">_"}
        </span>
        <span className="text-[0.6875rem] text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 600' }}>
          Marketing-site rebuild
        </span>
      </div>
      <ul className="space-y-1">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[0.75rem]">
            {s.state ==="done" ? (
              <Check className="w-3 h-3 text-[#0a0a0a]" aria-hidden="true" />
            ) : s.state ==="current" ? (
              <span className="w-3 h-3 rounded-full border-2 border-[#e6b431] border-t-transparent animate-spin" />
            ) : (
              <span className="w-3 h-3 rounded-full border border-[#e5e5e5]" />
            )}
            <span className={s.state ==="todo" ?"text-[#737373]" :"text-[#0a0a0a]"}>
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockReview() {
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[#e5e5e5]">
        <span className="text-[0.6875rem] text-[#737373]" style={{ fontVariationSettings: '"wght" 500' }}>
          aestho/hero-rebuild
        </span>
        <span className="inline-flex items-center gap-1 text-[0.625rem] text-[#16a34a] px-2 py-0.5 rounded-full bg-[#f0fdf4] border border-[#bbf7d0]">
          <span className="w-1 h-1 rounded-full bg-[#16a34a]" />
          Open
        </span>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[0.6875rem] text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 600' }}>
          Hero rebuild + CRO
        </p>
        <p className="text-[0.625rem] text-[#737373] mt-0.5">
          <span className="text-[#16a34a]">+28</span>{""}
          <span className="text-rose-500">−6</span>
        </p>
        <ul className="mt-2 space-y-0.5 text-[0.625rem]">
          <li className="flex items-center justify-between text-[#0a0a0a]">
            <span>hero/index.tsx</span>
            <span className="text-[#16a34a]">+18</span>
          </li>
          <li className="flex items-center justify-between text-[#0a0a0a]">
            <span>hero/cta.tsx</span>
            <span className="text-[#16a34a]">+34</span>
          </li>
        </ul>
        <div className="mt-2 flex items-center justify-between text-[0.625rem] pt-1.5 border-t border-[#e5e5e5]">
          <span className="text-[#737373]">Tests</span>
          <span className="inline-flex items-center gap-1 text-[#16a34a]">
            12 passed <Check className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function MockShip() {
  return (
    <div className="rounded-xl bg-black/40 border border-white/[0.08] p-3 font-mono text-[0.625rem] leading-[1.55] backdrop-blur-sm">
      <div className="text-white/55">$ vercel deploy --prod</div>
      <div className="mt-1 text-[#34d399]">✓ Merged</div>
      <div className="text-[#34d399]">✓ All checks passed</div>
      <div className="mt-2 text-white/55">Deployment</div>
      <div className="flex items-center justify-between mt-0.5">
        <span className="text-white inline-flex items-center gap-1">
          <span className="text-[#34d399]">✓</span> Production
        </span>
        <span className="text-white/45">2m 18s</span>
      </div>
    </div>
  );
}

void Image;
