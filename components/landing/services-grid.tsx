"use client";

import { motion } from"framer-motion";
import {
  Type,
  LayoutGrid,
  Smartphone,
  Code,
  Palette,
  Film,
} from"lucide-react";

//"My Services" grid — six cards in a 2 × 3 layout. Light theme to match
// the rest of the site (white bg, zinc-100 borders, orange accents).
// No rounded corners on cards / panels / mock frames — Aestho design
// system uses sharp 90° edges throughout. Only circular elements
// (status dots, avatars) keep their roundness.

type Service = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  Mock: React.ComponentType;
};

const services: Service[] = [
  {
    title:"Copywriting",
    desc:
"Conversion copy written before the design starts. Headlines, CTAs, and microcopy tuned to the buyer's actual objections — not generic feature lists.",
    Icon: Type,
    Mock: CopyMock,
  },
  {
    title:"Web Design",
    desc:
"Visually stunning, user-friendly websites and landing pages that captivate visitors. Turning clicks into customers with intuitive design.",
    Icon: LayoutGrid,
    Mock: WebDesignMock,
  },
  {
    title:"Product Design",
    desc:
"Intuitive product designs that resonate with users. Enhancing user experience and retention through clear hierarchy and considered interaction.",
    Icon: Smartphone,
    Mock: ProductMock,
  },
  {
    title:"Development",
    desc:
"Building robust, scalable applications using the latest technologies. Bringing your ideas to life seamlessly — Framer, Next.js, or React.",
    Icon: Code,
    Mock: DevMock,
  },
  {
    title:"Branding",
    desc:
"Cohesive brand identities that reflect your core values. Making your brand unforgettable and instantly recognizable across every surface.",
    Icon: Palette,
    Mock: BrandMock,
  },
  {
    title:"Motion Design",
    desc:
"Dynamic motion graphics that engage and entertain. Capturing attention with every movement, telling your story visually.",
    Icon: Film,
    Mock: MotionMock,
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        {/* Eyebrow pill — circular by intent, matches hero pill style. */}
        <div className="flex justify-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-xs md:text-sm text-zinc-700">
            <span
              className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"
              aria-hidden="true"
            />
            My Services
          </span>
        </div>

        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-900 max-w-3xl mx-auto mb-16 md:mb-20">
          Here Is How I Can Help You
          <br />
          Grow Your Brand And Business
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { title, desc, Icon, Mock } = service;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative border border-zinc-200 bg-white p-6 md:p-8 overflow-hidden hover:border-orange-300 hover:shadow-orange-500/5 transition-all"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="w-9 h-9 bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-100 transition-colors">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-6 max-w-[44ch]">
        {desc}
      </p>

      {/* Visual mock — purely CSS / SVG, no images. Sharp corners. */}
      <div className="relative aspect-[16/9] border border-zinc-100 bg-zinc-50 overflow-hidden">
        <Mock />
      </div>
    </motion.article>
  );
}

// ----------------------------------------------------------------------------
// Per-service mocks — light theme, sharper illustrations.
// ----------------------------------------------------------------------------

// Copywriting — Notion-style task table with status pills. The
// disciplined"in progress" /"review" /"done" workflow conveys the
// actual rigour of Rashid's copy process.
function CopyMock() {
  const rows = [
    { label:"Hero · headline", status:"Done", color:"bg-emerald-100 text-emerald-700" },
    { label:"Sub · value prop", status:"Done", color:"bg-emerald-100 text-emerald-700" },
    { label:"Pricing · objections", status:"Review", color:"bg-amber-100 text-amber-700" },
    { label:"CTA · button copy", status:"Drafting", color:"bg-orange-100 text-orange-700" },
    { label:"FAQ · 5 entries", status:"Queued", color:"bg-zinc-100 text-zinc-500" },
  ];
  return (
    <div className="absolute inset-0 px-4 py-3 md:px-5 md:py-4 flex flex-col">
      {/* File-tab header */}
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-zinc-200">
        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
          Doc
        </span>
        <span className="text-[11px] font-semibold text-zinc-700 truncate">
          UpdateAI · landing copy
        </span>
        <span className="ml-auto px-1.5 py-px text-[8px] font-mono uppercase text-orange-700 bg-orange-50 border border-orange-100">
          Live
        </span>
      </div>
      <table className="w-full text-[10px] md:text-[11px] font-mono">
        <tbody className="divide-y divide-zinc-100">
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="py-1.5 text-zinc-600 truncate">{r.label}</td>
              <td className="py-1.5 text-right">
                <span className={`px-1.5 py-px ${r.color}`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Web Design — full mini-website layout with navbar, hero text,
// pricing cards, and footer. Reads as an actual marketing-page wire.
function WebDesignMock() {
  return (
    <div className="absolute inset-0 p-3 md:p-4">
      <div className="w-full h-full border border-zinc-200 bg-white overflow-hidden flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-1 px-2 py-1 border-b border-zinc-200 bg-zinc-50">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="ml-2 text-[8px] font-mono text-zinc-400 truncate">
            aestho.xyz
          </span>
        </div>
        {/* Site nav */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-zinc-100">
          <span className="w-2 h-2 bg-orange-500" />
          <span className="h-1 w-12 bg-zinc-200" />
          <span className="ml-auto h-1 w-6 bg-zinc-200" />
          <span className="h-1 w-6 bg-zinc-200" />
          <span className="h-3 w-10 bg-zinc-900" />
        </div>
        {/* Hero copy */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="h-1.5 md:h-2 w-32 md:w-40 bg-zinc-800 mb-1.5 mx-auto" />
            <div className="h-1.5 md:h-2 w-24 md:w-28 bg-zinc-300 mb-3 mx-auto" />
            <div className="flex gap-1.5 justify-center">
              <span className="h-3.5 w-12 bg-orange-500" />
              <span className="h-3.5 w-10 border border-zinc-300" />
            </div>
          </div>
        </div>
        {/* Footer logos */}
        <div className="flex items-center justify-around px-3 py-1.5 border-t border-zinc-100 bg-zinc-50">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1 w-8 bg-zinc-300" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Design — three phone screens showing app states (sign-in,
// dashboard with stats, profile). A real-feeling product flow.
function ProductMock() {
  return (
    <div className="absolute inset-0 px-6 py-3 flex items-end justify-center gap-3">
      <Phone variant="signin" offset="-translate-y-2 -rotate-3" />
      <Phone variant="dashboard" offset="-translate-y-3" />
      <Phone variant="profile" offset="-translate-y-1 rotate-3" />
    </div>
  );
}

function Phone({
  variant,
  offset,
}: {
  variant:"signin" |"dashboard" |"profile";
  offset: string;
}) {
  return (
    <div
      className={`relative w-12 md:w-14 aspect-[9/19] border border-zinc-300 bg-white ${offset} flex flex-col`}
    >
      {/* Notch */}
      <div className="mx-auto mt-1 w-4 h-1 rounded-full bg-zinc-200" />
      <div className="flex-1 px-1.5 pt-1.5 pb-1 flex flex-col gap-1">
        {variant ==="signin" && (
          <>
            <span className="h-1 w-2/3 bg-zinc-800 mt-1" />
            <span className="h-1 w-1/2 bg-zinc-200" />
            <span className="mt-auto h-1 w-full border border-zinc-200" />
            <span className="h-1 w-full border border-zinc-200" />
            <span className="h-2.5 w-full bg-orange-500" />
          </>
        )}
        {variant ==="dashboard" && (
          <>
            <span className="h-1 w-1/2 bg-zinc-800" />
            <div className="flex gap-0.5 mt-1">
              <span className="h-3 flex-1 bg-orange-200" />
              <span className="h-3 flex-1 bg-zinc-200" />
              <span className="h-3 flex-1 bg-zinc-100" />
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              <span className="h-0.5 w-full bg-zinc-200" />
              <span className="h-0.5 w-2/3 bg-zinc-200" />
              <span className="h-0.5 w-3/4 bg-zinc-200" />
              <span className="h-0.5 w-1/2 bg-zinc-200" />
            </div>
          </>
        )}
        {variant ==="profile" && (
          <>
            <span className="mx-auto w-3 h-3 rounded-full bg-orange-500 mt-1" />
            <span className="mx-auto h-1 w-2/3 bg-zinc-800 mt-1" />
            <span className="mx-auto h-0.5 w-1/2 bg-zinc-300" />
            <div className="flex gap-0.5 mt-2">
              <span className="h-2 flex-1 border border-zinc-200" />
              <span className="h-2 flex-1 border border-zinc-200" />
            </div>
            <span className="mt-auto h-1.5 w-full bg-zinc-900" />
          </>
        )}
      </div>
    </div>
  );
}

// Development — IDE / Framer canvas with components panel + code
// editor split. Reads as engineering, not just shipping.
function DevMock() {
  return (
    <div className="absolute inset-0 p-3 md:p-4 flex gap-2 font-mono text-[9px] md:text-[10px]">
      {/* Components panel */}
      <div className="w-1/3 border border-zinc-200 bg-white p-1.5 flex flex-col gap-1">
        <span className="text-zinc-400 uppercase tracking-wider text-[8px]">
          Components
        </span>
        <span className="px-1 py-0.5 bg-orange-50 text-orange-700 truncate">
          Hero
        </span>
        <span className="px-1 py-0.5 text-zinc-500 truncate">Pricing</span>
        <span className="px-1 py-0.5 text-zinc-500 truncate">Testimonial</span>
        <span className="px-1 py-0.5 text-zinc-500 truncate">FAQ</span>
        <span className="px-1 py-0.5 text-zinc-500 truncate">Footer</span>
      </div>
      {/* Code editor */}
      <div className="flex-1 border border-zinc-200 bg-zinc-900 p-2 flex flex-col gap-1 text-[8px] md:text-[9px] leading-snug">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-500 truncate">Hero.tsx</span>
        </div>
        <div className="text-zinc-500">
          <span className="text-violet-400">export</span>{""}
          <span className="text-violet-400">function</span>{""}
          <span className="text-amber-300">Hero</span>
          <span className="text-zinc-300">() {"{"}</span>
        </div>
        <div className="pl-2 text-zinc-300">
          <span className="text-violet-400">return</span>{""}
          <span className="text-zinc-500">&lt;</span>
          <span className="text-emerald-400">section</span>
          <span className="text-zinc-500">&gt;</span>
        </div>
        <div className="pl-4 text-orange-300 truncate">
          &quot;Built to sell&quot;
        </div>
        <div className="pl-2 text-zinc-500">
          &lt;/<span className="text-emerald-400">section</span>&gt;
        </div>
        <div className="text-zinc-500">{"}"}</div>
      </div>
    </div>
  );
}

// Branding — color system + type specimen on a real grid layout.
function BrandMock() {
  return (
    <div className="absolute inset-0 p-3 md:p-4 grid grid-cols-12 gap-2">
      {/* Big"Aa" type specimen */}
      <div className="col-span-5 border border-zinc-200 bg-white flex items-center justify-center">
        <span className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight leading-none">
          Aa
        </span>
      </div>
      {/* Color palette */}
      <div className="col-span-7 grid grid-cols-2 gap-2">
        {[
          { c:"#f97316", label:"Primary" },
          { c:"#18181b", label:"Ink" },
          { c:"#fafaf9", label:"Paper" },
          { c:"#fed7aa", label:"Tint" },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-zinc-200 bg-white overflow-hidden flex flex-col"
          >
            <span
              className="flex-1"
              style={{ background: s.c }}
              aria-hidden="true"
            />
            <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider text-zinc-500 border-t border-zinc-200 bg-white">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Motion Design — keyframe timeline with markers and a scrubbing
// playhead. Mirrors Framer / After Effects.
function MotionMock() {
  return (
    <div className="absolute inset-0 px-4 py-3 md:px-5 md:py-4 flex flex-col gap-1.5">
      {/* Time ruler */}
      <div className="flex justify-between text-[8px] font-mono text-zinc-400 mb-0.5">
        {["0.0s","0.2s","0.4s","0.6s","0.8s","1.0s"].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>

      {/* Tracks */}
      {[
        { color:"bg-orange-500", w:"w-2/3", offset:"left-0" },
        { color:"bg-blue-500", w:"w-1/3", offset:"left-1/4" },
        { color:"bg-emerald-500", w:"w-1/2", offset:"left-1/3" },
      ].map((t, i) => (
        <div
          key={i}
          className="relative h-2.5 md:h-3 bg-zinc-100 border border-zinc-200"
        >
          <div
            className={`absolute top-0 bottom-0 ${t.offset} ${t.w} ${t.color} opacity-90`}
          />
          {/* Diamond keyframe markers */}
          {[0, 0.5, 1].map((p) => (
            <span
              key={p}
              className="absolute top-1/2 w-1.5 h-1.5 bg-zinc-900 -translate-y-1/2 rotate-45"
              style={{ left: `${p * 100}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
      ))}

      {/* Playhead */}
      <div className="relative h-1 mt-0.5">
        <span className="absolute left-[55%] top-0 bottom-[-72px] w-px bg-orange-500/70" />
        <span className="absolute left-[55%] top-[-2px] -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45" />
      </div>
    </div>
  );
}
