"use client";

// OpenAI-Codex"Run multiple threads in parallel. Ship faster." section.
// Left column: violet brand chip + huge black-on-grey split-colour
// headline + body para + 3 feature rows with coloured icons.
// Right column: 3 layered floating cards (project cards with header,
// description, checklist, file footer + Review button) overlapping
// each other with offsets and ambient shadows.

import { motion } from "framer-motion";
import { Check, ChevronRight, Circle } from "lucide-react";

// ---- Inline service-list SVGs ----------------------------------------
//
// Three unique 24×24 compositions. Amber gradient + black + white only.

const IconWorkflow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sl-wf-c" x1="14" y1="2" x2="22" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <path d="M3 5C3 3.9 3.9 3 5 3H10C11.1 3 12 3.9 12 5V8C12 9.1 11.1 10 10 10H5C3.9 10 3 9.1 3 8V5Z" fill="#0A0A0A" />
    <path opacity="0.7" d="M5 5.5H10" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path opacity="0.45" d="M5 7.5H8.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path d="M14 5C14 3.9 14.9 3 16 3H19C20.1 3 21 3.9 21 5V8C21 9.1 20.1 10 19 10H16C14.9 10 14 9.1 14 8V5Z" fill="url(#sl-wf-c)" />
    <path opacity="0.85" d="M16 5.5H19" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path d="M3 16C3 14.9 3.9 14 5 14H10C11.1 14 12 14.9 12 16V19C12 20.1 11.1 21 10 21H5C3.9 21 3 20.1 3 19V16Z" fill="#0A0A0A" />
    <path opacity="0.7" d="M5 16.5H10" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path opacity="0.45" d="M5 18.5H8.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 6.5H14M12 17.5H14" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" opacity="0.18" />
    <path d="M15 11V14" stroke="#9C7307" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14 13L15 14L16 13" stroke="#9C7307" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGitBranch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sl-gb-top" x1="13" y1="3" x2="22" y2="11" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
      <linearGradient id="sl-gb-line" x1="6" y1="8" x2="18" y2="14" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <circle cx="6" cy="6" r="2.6" fill="#0A0A0A" />
    <circle cx="6" cy="6" r="0.9" fill="white" opacity="0.85" />
    <circle cx="18" cy="6" r="2.6" fill="url(#sl-gb-top)" />
    <circle cx="18" cy="6" r="0.9" fill="white" opacity="0.85" />
    <circle cx="6" cy="18" r="2.6" fill="#0A0A0A" />
    <circle cx="6" cy="18" r="0.9" fill="white" opacity="0.85" />
    <path d="M6 8.6V15.4" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" opacity="0.32" />
    <path d="M6 12C6 9.5 8.5 8 11 8C14 8 16 7 16 5" stroke="url(#sl-gb-line)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
);

const IconCloud = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sl-cl-front" x1="3" y1="11" x2="21" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <path opacity="0.18" d="M19 4H10C8.9 4 8 4.9 8 6V13C8 14.1 8.9 15 10 15H19C20.1 15 21 14.1 21 13V6C21 4.9 20.1 4 19 4Z" fill="#0A0A0A" />
    <path opacity="0.32" d="M17 7H7C5.9 7 5 7.9 5 9V16C5 17.1 5.9 18 7 18H17C18.1 18 19 17.1 19 16V9C19 7.9 18.1 7 17 7Z" fill="#0A0A0A" />
    <path d="M15 10H5C3.9 10 3 10.9 3 12V19C3 20.1 3.9 21 5 21H15C16.1 21 17 20.1 17 19V12C17 10.9 16.1 10 15 10Z" fill="url(#sl-cl-front)" />
    <path opacity="0.85" d="M14.4 13H5.6C5.27 13 5 13.27 5 13.6V14C5 14.33 5.27 14.6 5.6 14.6H14.4C14.73 14.6 15 14.33 15 14V13.6C15 13.27 14.73 13 14.4 13Z" fill="white" />
    <path opacity="0.55" d="M11.4 16H5.6C5.27 16 5 16.27 5 16.6V16.8C5 17.13 5.27 17.4 5.6 17.4H11.4C11.73 17.4 12 17.13 12 16.8V16.6C12 16.27 11.73 16 11.4 16Z" fill="white" />
    <path opacity="0.55" d="M13.4 18.5H5.6C5.27 18.5 5 18.77 5 19.1V19.3C5 19.63 5.27 19.9 5.6 19.9H13.4C13.73 19.9 14 19.63 14 19.3V19.1C14 18.77 13.73 18.5 13.4 18.5Z" fill="white" />
  </svg>
);

const FEATURES = [
  {
    icon: <IconWorkflow />,
    title:"Parallel workstreams",
    body:"Eight specialists pick up Figma, Framer, copy, and motion at the same time — not sequentially.",
  },
  {
    icon: <IconGitBranch />,
    title:"Isolated worktrees",
    body:"Every workstream runs in its own Figma file and Framer branch for safe, conflict-free changes.",
  },
  {
    icon: <IconCloud />,
    title:"Cloud environments",
    body:"Pre-configured Framer + CMS + analytics environments keep every project fast and consistent.",
  },
];

export function ServiceList() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 codex-section-glow pointer-events-none"
      />

      <div
        className="relative max-w-container mx-auto px-6 md:px-10 pb-32 md:pb-40"
        style={{
          // Hero image bleeds 25% into this section. Reserve padding
          // so the first row sits well below the image.
          paddingTop:"clamp(160px, 22vw, 360px)",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin:"-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="codex-chip">
              <span
                aria-hidden="true"
                className="w-4 h-4 rounded-md flex items-center justify-center text-white text-[9px]"
                style={{
                  background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
                  fontVariationSettings: '"wght" 700',
                }}
              >
                ✦
              </span>
              Multi-discipline workflow
            </span>

            <h2
              className="mt-8 text-[clamp(40px,5.4vw,72px)] tracking-[-0.028em] leading-[1.04] text-[#0a0a0a]"
              style={{ fontVariationSettings: '"wght" 700' }}
            >
              Run every workstream
              <br />
              in parallel.
              <br />
              <span className="text-[#a3a3a3]">Ship faster.</span>
            </h2>

            <p className="mt-7 text-[17px] leading-[1.6] text-[#404040] max-w-lg">
              Aestho works in isolated workstreams across Figma, Framer, copy
              and motion — so we can explore, build, and ship without blocking
              each other or you.
            </p>

            <div className="mt-12 space-y-7">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="shrink-0">{f.icon}</div>
                  <div>
                    <h3
                      className="text-[16px] text-[#0a0a0a]"
                      style={{ fontVariationSettings: '"wght" 600' }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-[1.55] text-[#737373] max-w-sm">
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — 3 layered floating cards. */}
          <div className="relative h-[640px] md:h-[680px]">
            <FloatingCard
              top="0px"
              right="0"
              left="40px"
              delay={0}
              title="Audit + rewrite — UpdateAI"
              repo="updateai/web"
              branch="main"
              diff={{ added: 42, removed: 8 }}
              body="Implement the post-rewrite hero, switch the CTA to a strategy-call modal, and add CRO instrumentation."
              steps={[
                { label:"Plan", done: true },
                { label:"Implement hero", done: true },
                { label:"Wire CRO events", done: false, current: true },
                { label:"QA on staging", done: false },
              ]}
              file="hero/index.tsx"
              fileDiff="+28 −6"
            />
            <FloatingCard
              top="190px"
              left="0"
              right="80px"
              delay={0.08}
              title="Marketing site — Vanos AI"
              repo="vanos-ai/web"
              branch="feature/api-docs"
              diff={{ added: 76, removed: 15 }}
              body="Refactor the docs landing into a CMS-backed gallery and migrate session handling to middleware."
              steps={[
                { label:"Plan", done: true },
                { label:"Migrate docs CMS", done: true },
                { label:"Session middleware", done: false, current: true },
                { label:"Add tests", done: false },
              ]}
              file="docs/landing.tsx"
              fileDiff="+52 −10"
            />
            <FloatingCard
              top="380px"
              left="120px"
              right="0"
              delay={0.16}
              title="CRO experiment — ATQLeads"
              repo="atqleads/web"
              branch="feature/cta-test"
              diff={{ added: 31, removed: 4 }}
              body="Instrument the booking flow with analytics events and dashboards for week-one win-rate tracking."
              steps={[
                { label:"Plan", done: true },
                { label:"Add events", done: true },
                { label:"Build dashboard", done: false, current: true },
                { label:"Validate data", done: false },
              ]}
              file="analytics/events.ts"
              fileDiff="+31 −4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Floating workflow card ------------------------------------------

interface FloatingCardProps {
  top: string;
  left?: string;
  right?: string;
  delay: number;
  title: string;
  repo: string;
  branch: string;
  diff: { added: number; removed: number };
  body: string;
  steps: { label: string; done: boolean; current?: boolean }[];
  file: string;
  fileDiff: string;
}

function FloatingCard({
  top,
  left,
  right,
  delay,
  title,
  repo,
  branch,
  diff,
  body,
  steps,
  file,
  fileDiff,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="absolute rounded-2xl bg-white border border-[#e5e5e5] p-5"
      style={{ top, left: left ??"auto", right: right ??"auto" }}
    >
      {/* Header row */}
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px]"
          style={{
            background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
            fontVariationSettings: '"wght" 700',
          }}
        >
          {">_"}
        </span>
        <span
          className="flex-1 text-[14px] text-[#0a0a0a] truncate"
          style={{ fontVariationSettings: '"wght" 600' }}
        >
          {title}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-[#737373] px-2 py-0.5 rounded-md border border-[#e5e5e5]">
          <span className="w-2.5 h-2.5 inline-block">⚪</span>
          Open
        </span>
        <span className="text-[11px] tabular-nums">
          <span className="text-[#16a34a]">+{diff.added}</span>{""}
          <span className="text-rose-500">−{diff.removed}</span>
        </span>
      </div>

      {/* Repo + branch row */}
      <div className="mt-2 flex items-center gap-3 text-[11px] text-[#737373]">
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2" fill="#737373"/><circle cx="6" cy="18" r="2" fill="#737373"/><circle cx="18" cy="12" r="2" fill="#737373"/><path d="M6 8V16M6 12C6 12 12 12 14 12C16 12 16 11 16 10" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
          {repo}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2" fill="#737373"/><circle cx="6" cy="18" r="2" fill="#737373"/><circle cx="18" cy="12" r="2" fill="#737373"/><path d="M6 8V16M6 12C6 12 12 12 14 12C16 12 16 11 16 10" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
          {branch}
        </span>
      </div>

      {/* Body */}
      <p className="mt-3 text-[12.5px] text-[#404040] leading-[1.5] max-w-md">
        {body}
      </p>

      {/* Step list */}
      <ul className="mt-4 space-y-1.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-[12.5px]">
            {s.done ? (
              <Check className="w-3.5 h-3.5 text-[#0a0a0a]" aria-hidden="true" />
            ) : s.current ? (
              <ChevronRight className="w-3.5 h-3.5 text-[#0a0a0a]" aria-hidden="true" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-[#a3a3a3]" aria-hidden="true" />
            )}
            <span
              className={
                s.done || s.current ?"text-[#0a0a0a]" :"text-[#737373]"
              }
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      {/* File footer + Review button */}
      <div className="mt-4 flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-[#fafafa] border border-[#e5e5e5]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-3 h-3 inline-block rounded-sm bg-white border border-[#e5e5e5]" />
          <span
            className="text-[12px] text-[#0a0a0a] truncate"
            style={{ fontVariationSettings: '"wght" 500' }}
          >
            {file}
          </span>
          <span className="text-[11px] text-[#737373] tabular-nums shrink-0">
            {fileDiff}
          </span>
        </div>
        <button
          type="button"
          className="text-[11px] px-2.5 py-1 rounded-md bg-white border border-[#e5e5e5] text-[#0a0a0a]"
          style={{ fontVariationSettings: '"wght" 500' }}
        >
          Review
        </button>
      </div>
    </motion.div>
  );
}
