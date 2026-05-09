"use client";

//"Built for how you ship" — image 4 layout. Centred dark chip,
// massive black bold headline, sub. Below: a 2x2 grid of large
// rounded-2xl use-case cards. Each card is split: left half is the
// content (icon + title + body + small chip kicker), right half is a
// realistic UI mockup that illustrates the use case.

import { motion } from"framer-motion";
import { Check, GitPullRequest } from"lucide-react";
import Image from"next/image";

// ---- Inline use-case SVGs --------------------------------------------
//
// Each glyph is a unique 24×24 composition built from amber gradient
// (#E6B431 → #9C7307), pure black (#0A0A0A) and white only. No icon
// component imports — these SVGs are written here in line with the
// section that owns them, like the four process card icons.

const IconLayout = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="uc-layout" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#0A0A0A" />
    <rect x="5" y="5" width="14" height="3" rx="0.8" fill="url(#uc-layout)" />
    <rect x="5" y="9.5" width="6" height="9.5" rx="0.8" opacity="0.85" fill="white" />
    <rect x="12" y="9.5" width="7" height="4" rx="0.8" opacity="0.55" fill="white" />
    <rect x="12" y="14.5" width="7" height="4.5" rx="0.8" opacity="0.55" fill="white" />
  </svg>
);

const IconWrench = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="uc-wrench" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <path opacity="0.18" d="M19 5H8C6.9 5 6 5.9 6 7V18C6 19.1 6.9 20 8 20H19C20.1 20 21 19.1 21 18V7C21 5.9 20.1 5 19 5Z" fill="#0A0A0A" />
    <rect x="3" y="3" width="14" height="14" rx="2.5" fill="#0A0A0A" />
    <path d="M6 7H14M6 10H11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M11 14L13.2 16.2L17 12.4" stroke="url(#uc-wrench)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="14" cy="14" r="3.6" fill="url(#uc-wrench)" />
    <path d="M12.5 14L13.5 15L15.5 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const IconBookOpen = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="uc-book" x1="12" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <path d="M11 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H11V4Z" fill="#0A0A0A" />
    <path opacity="0.7" d="M9 7H4.6C4.27 7 4 7.27 4 7.6V8C4 8.33 4.27 8.6 4.6 8.6H9V7Z" fill="white" />
    <path opacity="0.45" d="M8 10H4.6C4.27 10 4 10.27 4 10.6V11C4 11.33 4.27 11.6 4.6 11.6H8V10Z" fill="white" />
    <path opacity="0.45" d="M9 13H4.6C4.27 13 4 13.27 4 13.6V14C4 14.33 4.27 14.6 4.6 14.6H9V13Z" fill="white" />
    <path d="M13 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H13V4Z" fill="url(#uc-book)" />
    <path opacity="0.85" d="M19.4 7H15C14.67 7 14.4 7.27 14.4 7.6V8C14.4 8.33 14.67 8.6 15 8.6H19.4C19.73 8.6 20 8.33 20 8V7.6C20 7.27 19.73 7 19.4 7Z" fill="white" />
    <path opacity="0.55" d="M18.4 10H15C14.67 10 14.4 10.27 14.4 10.6V11C14.4 11.33 14.67 11.6 15 11.6H18.4C18.73 11.6 19 11.33 19 11V10.6C19 10.27 18.73 10 18.4 10Z" fill="white" />
    <path opacity="0.55" d="M19.4 13H15C14.67 13 14.4 13.27 14.4 13.6V14C14.4 14.33 14.67 14.6 15 14.6H19.4C19.73 14.6 20 14.33 20 14V13.6C20 13.27 19.73 13 19.4 13Z" fill="white" />
  </svg>
);

const IconSend = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="uc-send-card" x1="2" y1="9" x2="14" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
      <linearGradient id="uc-send-arrow" x1="13" y1="11" x2="22" y2="3" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6B431" />
        <stop offset="100%" stopColor="#9C7307" />
      </linearGradient>
    </defs>
    <path opacity="0.32" d="M16 7H6C4.9 7 4 7.9 4 9V19C4 20.1 4.9 21 6 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7Z" fill="#0A0A0A" />
    <path d="M14 9H4C2.9 9 2 9.9 2 11V19C2 20.1 2.9 21 4 21H14C15.1 21 16 20.1 16 19V11C16 9.9 15.1 9 14 9Z" fill="url(#uc-send-card)" />
    <path opacity="0.85" d="M13.4 12H4.6C4.27 12 4 12.27 4 12.6V13C4 13.33 4.27 13.6 4.6 13.6H13.4C13.73 13.6 14 13.33 14 13V12.6C14 12.27 13.73 12 13.4 12Z" fill="white" />
    <path opacity="0.55" d="M10.4 15H4.6C4.27 15 4 15.27 4 15.6V15.8C4 16.13 4.27 16.4 4.6 16.4H10.4C10.73 16.4 11 16.13 11 15.8V15.6C11 15.27 10.73 15 10.4 15Z" fill="white" />
    <path opacity="0.55" d="M11.4 17.5H4.6C4.27 17.5 4 17.77 4 18.1V18.3C4 18.63 4.27 18.9 4.6 18.9H11.4C11.73 18.9 12 18.63 12 18.3V18.1C12 17.77 11.73 17.5 11.4 17.5Z" fill="white" />
    <path d="M15 9L21 3M21 3H16M21 3V8" stroke="url(#uc-send-arrow)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const USE_CASES = [
  {
    icon: <IconLayout />,
    title:"Design landing pages",
    body:"Tell us what you're shipping. We design, write copy, and build the page in Framer in days, not weeks.",
    kicker:"From idea to live site",
    mock: <MockLandingPage />,
  },
  {
    icon: <IconWrench />,
    title:"Audit + rewrite",
    body:"Paste your URL. We screen-record where you're leaking visitors and ship a fixed page rebuilt for conversion.",
    kicker:"From red to green",
    mock: <MockAudit />,
  },
  {
    icon: <IconBookOpen />,
    title:"Migrate from Webflow / WP",
    body:"Move off legacy platforms onto Framer with the brand, content, and SEO intact. Redirects mapped, no traffic dropped.",
    kicker:"From legacy to fast",
    mock: <MockMigrate />,
  },
  {
    icon: <IconSend />,
    title:"Ship review-ready PRs",
    body:"We open every change behind a Loom + a Figma diff with a clear summary so your team can review and ship with confidence.",
    kicker:"From local to live",
    mock: <MockPR />,
  },
];

export function UseCases() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Two soft glows: violet on the left, sky on the bottom-right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
"radial-gradient(40% 60% at 5% 30%, rgba(253,232,163,0.45) 0%, rgba(253,232,163,0) 60%), radial-gradient(40% 60% at 100% 90%, rgba(255,241,207,0.55) 0%, rgba(255,241,207,0) 60%)",
        }}
      />

      <div className="relative max-w-container mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24 md:pb-32">
        {/* Centred opener — chip is dark on this section per image 4. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin:"-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a] text-white text-[13px]">
            <span
              aria-hidden="true"
              className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[9px]"
              style={{
                background:"linear-gradient(135deg, #404040 0%, #0a0a0a 100%)",
                fontVariationSettings: '"wght" 700',
              }}
            >
              ✦
            </span>
            <span style={{ fontVariationSettings: '"wght" 500' }}>
              Use Aestho for real work
            </span>
          </span>

          <h2
            className="mt-7 text-[clamp(40px,5.6vw,72px)] tracking-[-0.028em] leading-[1.04] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Built for how you ship.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.5] text-[#404040] max-w-xl mx-auto">
            Aestho helps you move from idea to a shipped, production-grade
            page — faster than any agency.
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5 md:gap-6">
          {USE_CASES.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin:"-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center rounded-2xl bg-white border border-[#e5e5e5] p-6 md:p-8"
            >
              <div>
                <div className="mb-5 inline-flex">{u.icon}</div>
                <h3
                  className="text-[20px] md:text-[22px] tracking-[-0.012em] text-[#0a0a0a] mb-2"
                  style={{ fontVariationSettings: '"wght" 600' }}
                >
                  {u.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#737373] max-w-sm">
                  {u.body}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-[#fdf3d0] text-[#9c7307]"
                  style={{ fontVariationSettings: '"wght" 500' }}
                >
                  {u.kicker}
                </span>
              </div>
              <div className="md:justify-self-end w-full md:max-w-[320px]">{u.mock}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Use-case mockups ------------------------------------------------

function MockLandingPage() {
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <span
          aria-hidden="true"
          className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px]"
          style={{
            background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
            fontVariationSettings: '"wght" 700',
          }}
        >
          A
        </span>
        <span
          className="text-[12px] text-[#0a0a0a]"
          style={{ fontVariationSettings: '"wght" 600' }}
        >
          Hero rebuild
        </span>
      </div>
      <ul className="space-y-1.5 text-[12px]">
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#0a0a0a]" /> <span className="text-[#0a0a0a]">Plan</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#0a0a0a]" />{""}
          <span className="text-[#0a0a0a]">Implement hero</span>
        </li>
        <li className="flex items-center gap-2 text-[#737373]">
          <span className="w-3.5 h-3.5 rounded-full border border-[#e5e5e5]" />
          Add tests
        </li>
        <li className="flex items-center gap-2 text-[#737373]">
          <span className="w-3.5 h-3.5 rounded-full border border-[#e5e5e5]" />
          Update docs
        </li>
      </ul>
      <div className="mt-3 flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[#fafafa] border border-[#e5e5e5] text-[10px]">
        <span className="text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 500' }}>
          hero/index.tsx
        </span>
        <span className="text-[#16a34a] tabular-nums">+134</span>
      </div>
    </div>
  );
}

function MockAudit() {
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3.5 font-mono text-[10px] leading-[1.6]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#737373]">src/cta.tsx</span>
        <span className="tabular-nums">
          <span className="text-[#16a34a]">+2</span>{""}
          <span className="text-rose-500">−4</span>
        </span>
      </div>
      <div className="space-y-0.5">
        <div className="text-[#737373]">
          42&nbsp;&nbsp;async function track() {`{`}
        </div>
        <div className="bg-rose-50 text-rose-700 -mx-2 px-2">
          43&nbsp;&nbsp;− let res = await track(cta.url);
        </div>
        <div className="bg-rose-50 text-rose-700 -mx-2 px-2">
          44&nbsp;&nbsp;− if (!res.ok) throw Error(res.text);
        </div>
        <div className="bg-emerald-50 text-emerald-700 -mx-2 px-2">
          43&nbsp;&nbsp;+ const res = await track(cta.url, cfg);
        </div>
        <div className="bg-emerald-50 text-emerald-700 -mx-2 px-2">
          44&nbsp;&nbsp;+ if (!res.ok) throw Error(&apos;Track failed&apos;);
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] pt-2 border-t border-[#e5e5e5]">
        <span className="text-[#737373]">Tests</span>
        <span className="inline-flex items-center gap-1 text-[#16a34a]">
          3 passed <Check className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

function MockMigrate() {
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3.5">
      <p
        className="text-[12px] text-[#0a0a0a] mb-2"
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        Why is the redirect mapped this way?
      </p>
      <div className="rounded-lg bg-[#fafafa] border border-[#e5e5e5] p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            aria-hidden="true"
            className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[8px]"
            style={{
              background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
              fontVariationSettings: '"wght" 700',
            }}
          >
            A
          </span>
          <span
            className="text-[11px] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            Aestho
          </span>
        </div>
        <p className="text-[11px] leading-[1.55] text-[#404040]">
          The old Webflow slugs map 1:1 onto new Framer routes. Old assets
          stay under <span className="text-[#0a0a0a]">/legacy</span> with a
          301 + 30-day TTL so SEO is preserved end-to-end.
        </p>
      </div>
      <div className="mt-3 space-y-1 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-[#0a0a0a]">redirects.json</span>
          <span className="text-[#737373]">23 — 78</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#0a0a0a]">/legacy/*</span>
          <span className="text-[#737373]">10 — 42</span>
        </div>
      </div>
    </div>
  );
}

function MockPR() {
  return (
    <div className="rounded-xl bg-white border border-[#e5e5e5] p-3.5">
      <p
        className="text-[12px] text-[#0a0a0a] mb-2"
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        Hero rebuild + CTA rewrite
      </p>
      <p className="text-[11px] text-[#737373] mb-3">
        <span className="text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 500' }}>
          Summary
        </span>
        : Implements the post-audit hero, switches CTAs to in-page modals,
        and adds tracking so we can measure the lift.
      </p>
      <ul className="space-y-1 text-[10px]">
        <li className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#0a0a0a]">
            <Check className="w-3 h-3 text-[#16a34a]" />
            hero/index.tsx
          </span>
          <span className="tabular-nums">
            <span className="text-[#16a34a]">+128</span>{""}
            <span className="text-rose-500">−6</span>
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#0a0a0a]">
            <Check className="w-3 h-3 text-[#16a34a]" />
            hero/cta.tsx
          </span>
          <span className="text-[#16a34a] tabular-nums">+34</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[#0a0a0a]">
            <Check className="w-3 h-3 text-[#16a34a]" />
            docs/cro.md
          </span>
          <span className="text-[#16a34a] tabular-nums">+16</span>
        </li>
      </ul>
      <button
        type="button"
        className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#0a0a0a] text-white text-[11px]"
        style={{ fontVariationSettings: '"wght" 500' }}
      >
        <GitPullRequest className="w-3 h-3" /> Open pull request
      </button>
    </div>
  );
}

void Image;
