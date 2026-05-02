"use client";

import { motion } from "framer-motion";
import {
  Type,
  LayoutGrid,
  Smartphone,
  Code,
  Palette,
  Film,
} from "lucide-react";

// Dark "My Services" grid — six service cards in a 2 × 3 layout. Each
// card has a title, a one-line description, and a small visual mock so
// the section reads as a portfolio of capabilities rather than a list
// of nouns.

type Service = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  Mock: React.ComponentType;
};

const services: Service[] = [
  {
    title: "Copywriting",
    desc:
      "Conversion copy written before the design starts. Headlines, CTAs, and microcopy tuned to the buyer's actual objections — not generic feature lists.",
    Icon: Type,
    Mock: CopyMock,
  },
  {
    title: "Web Design",
    desc:
      "Visually stunning, user-friendly websites and landing pages that captivate visitors. Turning clicks into customers with intuitive design.",
    Icon: LayoutGrid,
    Mock: WebDesignMock,
  },
  {
    title: "Product Design",
    desc:
      "Intuitive product designs that resonate with users. Enhancing user experience and retention through clear hierarchy and considered interaction.",
    Icon: Smartphone,
    Mock: ProductMock,
  },
  {
    title: "Development",
    desc:
      "Building robust, scalable applications using the latest technologies. Bringing your ideas to life seamlessly — Framer, Next.js, or React.",
    Icon: Code,
    Mock: DevMock,
  },
  {
    title: "Branding",
    desc:
      "Cohesive brand identities that reflect your core values. Making your brand unforgettable and instantly recognizable across every surface.",
    Icon: Palette,
    Mock: BrandMock,
  },
  {
    title: "Motion Design",
    desc:
      "Dynamic motion graphics that engage and entertain. Capturing attention with every movement, telling your story visually.",
    Icon: Film,
    Mock: MotionMock,
  },
];

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative bg-zinc-950 text-white scroll-mt-16 overflow-hidden"
    >
      {/* Subtle radial highlight behind the heading pill. */}
      <div className="absolute inset-x-0 top-0 h-72 pointer-events-none">
        <div className="mx-auto w-[60vw] h-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        {/* Eyebrow pill */}
        <div className="flex justify-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/70 backdrop-blur text-xs md:text-sm text-zinc-200">
            <span
              className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"
              aria-hidden="true"
            />
            My Services
          </span>
        </div>

        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl mx-auto mb-16 md:mb-20">
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 md:p-8 overflow-hidden hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 shrink-0">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 max-w-[44ch]">
        {desc}
      </p>

      {/* Visual mock — varies per service, sits in a sub-frame so each
          card looks like a real preview. */}
      <div className="relative aspect-video rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
        <Mock />
      </div>
    </motion.article>
  );
}

// ----------------------------------------------------------------------------
// Per-service mock — purely visual, all CSS / SVG, no images. Cheap to
// render and scales without aliasing.
// ----------------------------------------------------------------------------

function CopyMock() {
  return (
    <div className="absolute inset-0 p-4 md:p-5 flex flex-col gap-2 text-[10px] font-mono">
      <div className="flex items-center gap-2 mb-1">
        <span className="px-2 py-0.5 rounded bg-orange-500/15 text-orange-300">Landing</span>
        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">In progress</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-zinc-500">Hero · headline</span>
          <span className="text-emerald-400">Done</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Pricing · objections</span>
          <span className="text-amber-300">Review</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">CTA · button copy</span>
          <span className="text-orange-300">Drafting</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">FAQ · 5 entries</span>
          <span className="text-zinc-600">Queued</span>
        </div>
      </div>
    </div>
  );
}

function WebDesignMock() {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div className="w-full max-w-[80%] rounded border border-zinc-700 bg-zinc-900 overflow-hidden shadow-lg">
        <div className="h-4 bg-zinc-800 flex items-center gap-1 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-zinc-700" />
          <div className="h-2 w-1/2 rounded bg-zinc-700" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-5 w-12 rounded bg-orange-500" />
            <div className="h-5 w-10 rounded border border-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductMock() {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-12 md:w-14 aspect-[9/16] rounded-md border border-zinc-700 bg-zinc-900 p-1.5 flex flex-col gap-1"
        >
          <div className="h-1 w-2/3 rounded bg-zinc-700" />
          <div className="h-1 w-1/2 rounded bg-zinc-700" />
          <div className="mt-auto flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-orange-500/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DevMock() {
  return (
    <div className="absolute inset-0 p-4 font-mono text-[10px] leading-relaxed text-zinc-400">
      <div className="space-y-1">
        <div>
          <span className="text-zinc-600">$</span> next build{" "}
          <span className="text-emerald-400">✓ ready in 2.3s</span>
        </div>
        <div>
          <span className="text-zinc-600">▲</span> Lighthouse{" "}
          <span className="text-emerald-400">98 / 100</span>
        </div>
        <div>
          <span className="text-zinc-600">⏱</span> LCP{" "}
          <span className="text-emerald-400">1.2s</span> · INP{" "}
          <span className="text-emerald-400">42ms</span>
        </div>
        <div>
          <span className="text-zinc-600">→</span> deploy{" "}
          <span className="text-orange-300">live</span>
        </div>
      </div>
    </div>
  );
}

function BrandMock() {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center gap-3">
      {["#f97316", "#18181b", "#fafaf9"].map((c) => (
        <span
          key={c}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700"
          style={{ background: c }}
          aria-hidden="true"
        />
      ))}
      <span className="text-3xl md:text-4xl font-semibold text-white tracking-tight ml-2">
        Aa
      </span>
    </div>
  );
}

function MotionMock() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-4 gap-2">
      <div className="text-[10px] font-mono text-zinc-500 flex justify-between mb-1">
        <span>0:00</span>
        <span>0:08</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse" />
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-blue-400 animate-pulse"
          style={{ animationDelay: "200ms" }}
        />
      </div>
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 animate-pulse"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
}
