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

// "My Services" grid — six cards in a 2 × 3 layout. Light theme to match
// the rest of the site (white bg, zinc-100 borders, orange accents).

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
      className="bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        {/* Eyebrow pill */}
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 overflow-hidden hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-100 transition-colors">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-6 max-w-[44ch]">
        {desc}
      </p>

      {/* Visual mock — purely CSS / SVG, no images. */}
      <div className="relative aspect-video rounded-lg border border-zinc-100 bg-zinc-50 overflow-hidden">
        <Mock />
      </div>
    </motion.article>
  );
}

// ----------------------------------------------------------------------------
// Per-service visual mocks — light theme.
// ----------------------------------------------------------------------------

function CopyMock() {
  return (
    <div className="absolute inset-0 p-4 md:p-5 flex flex-col gap-2 text-[10px] font-mono">
      <div className="flex items-center gap-2 mb-1">
        <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700">Landing</span>
        <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-500">In progress</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-zinc-500">Hero · headline</span>
          <span className="text-emerald-600">Done</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Pricing · objections</span>
          <span className="text-amber-600">Review</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">CTA · button copy</span>
          <span className="text-orange-600">Drafting</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">FAQ · 5 entries</span>
          <span className="text-zinc-400">Queued</span>
        </div>
      </div>
    </div>
  );
}

function WebDesignMock() {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div className="w-full max-w-[80%] rounded border border-zinc-200 bg-white overflow-hidden shadow-sm">
        <div className="h-4 bg-zinc-100 flex items-center gap-1 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-2 w-3/4 rounded bg-zinc-200" />
          <div className="h-2 w-1/2 rounded bg-zinc-200" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-5 w-12 rounded bg-orange-500" />
            <div className="h-5 w-10 rounded border border-zinc-200" />
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
          className="w-12 md:w-14 aspect-[9/16] rounded-md border border-zinc-200 bg-white p-1.5 flex flex-col gap-1 shadow-sm"
        >
          <div className="h-1 w-2/3 rounded bg-zinc-200" />
          <div className="h-1 w-1/2 rounded bg-zinc-200" />
          <div className="mt-auto flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-orange-500/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DevMock() {
  return (
    <div className="absolute inset-0 p-4 font-mono text-[10px] leading-relaxed text-zinc-500">
      <div className="space-y-1">
        <div>
          <span className="text-zinc-400">$</span> next build{" "}
          <span className="text-emerald-600">✓ ready in 2.3s</span>
        </div>
        <div>
          <span className="text-zinc-400">▲</span> Lighthouse{" "}
          <span className="text-emerald-600">98 / 100</span>
        </div>
        <div>
          <span className="text-zinc-400">⏱</span> LCP{" "}
          <span className="text-emerald-600">1.2s</span> · INP{" "}
          <span className="text-emerald-600">42ms</span>
        </div>
        <div>
          <span className="text-zinc-400">→</span> deploy{" "}
          <span className="text-orange-600">live</span>
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
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-200 shadow-sm"
          style={{ background: c }}
          aria-hidden="true"
        />
      ))}
      <span className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight ml-2">
        Aa
      </span>
    </div>
  );
}

function MotionMock() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-4 gap-2">
      <div className="text-[10px] font-mono text-zinc-400 flex justify-between mb-1">
        <span>0:00</span>
        <span>0:08</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse" />
      </div>
      <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-blue-400 animate-pulse"
          style={{ animationDelay: "200ms" }}
        />
      </div>
      <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
        <div
          className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 animate-pulse"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
}
