// Typographic Service section. Light theme matching the rest of the
// site — white background, oversized "Service" wordmark in zinc-900,
// numbered service table, and three big outcome stats.
//
// Server component — no client-side state, no animation libraries.

import Link from "next/link";

const SERVICES = [
  {
    n: "01",
    label: "Framer Websites",
    desc: "Conversion-focused Framer websites for startups, SaaS products, personal brands, and modern service businesses built for clarity, speed, and growth.",
  },
  {
    n: "02",
    label: "Landing Pages",
    desc: "High-performance landing pages for launches, campaigns, offers, waitlists, and product storytelling.",
  },
  {
    n: "03",
    label: "UI/UX Design",
    desc: "Clear, modern interface design for websites, dashboards, and digital products with strong hierarchy, structure, and usability.",
  },
  {
    n: "04",
    label: "MVP Design & Development",
    desc: "From early concept to launch-ready MVP, I help founders design, validate, and build products without wasting cycles.",
  },
  {
    n: "05",
    label: "Web Apps & Dashboards",
    desc: "Scalable internal tools, portals, and SaaS interfaces designed to feel intuitive, useful, and business-ready.",
  },
  {
    n: "06",
    label: "Design Systems & Product Thinking",
    desc: "Reusable systems, cleaner workflows, and product decisions that make growth easier after launch.",
  },
  {
    n: "07",
    label: "Product Strategy",
    desc: "Positioning, user-flow thinking, and launch planning that helps teams make better decisions before they spend time building.",
  },
  {
    n: "08",
    label: "Brand & Positioning",
    desc: "Sharper messaging and identity direction for startups that need their product to feel clear, credible, and ready to scale.",
  },
];

const OUTCOMES = [
  { value: "$73M+", label: "Seed funding raised by clients I've shipped for" },
  { value: "10×", label: "Average revenue growth in the first 6 months post-launch" },
  { value: "784%", label: "Highest measured organic traffic growth on a single launch" },
];

export function ServiceList() {
  return (
    <section className="relative bg-white border-y border-zinc-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-24">
        {/* Oversized 'Service' wordmark — clipped on the sides at narrow
            viewports so the type feels editorial. */}
        <div className="overflow-hidden -mb-2 md:-mb-4">
          <h2
            aria-label="Service"
            className="font-semibold tracking-[-0.04em] leading-[0.85] text-zinc-900 text-[26vw] md:text-[18vw] lg:text-[18rem] whitespace-nowrap"
          >
            Service
          </h2>
        </div>

        {/* Column headers — small, like a product spec sheet. */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 pt-10 md:pt-14 pb-3 border-b border-zinc-200 text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
          <div className="col-span-2 md:col-span-1">№</div>
          <div className="col-span-10 md:col-span-4">Discipline</div>
          <div className="hidden md:block md:col-span-7">What it is</div>
        </div>

        {/* Services table */}
        <ol className="divide-y divide-zinc-100">
          {SERVICES.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-12 gap-4 md:gap-6 py-5 md:py-7 group hover:bg-zinc-50/60 transition-colors"
            >
              <div className="col-span-2 md:col-span-1 text-xs md:text-sm font-mono text-zinc-400">
                ({s.n})
              </div>
              <div className="col-span-10 md:col-span-4 text-base md:text-lg lg:text-xl text-zinc-900 font-medium tracking-tight leading-tight group-hover:text-orange-700 transition-colors">
                {s.label}
              </div>
              <p className="col-span-12 md:col-span-7 text-sm md:text-[15px] text-zinc-600 leading-relaxed">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* Client outcomes */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-t border-zinc-200 pt-10 md:pt-14">
          <div className="md:col-span-3">
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
              Client outcomes
            </p>
          </div>
          {OUTCOMES.map((o) => (
            <div key={o.value} className="md:col-span-3">
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
                {o.label}
              </p>
              <p className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none text-zinc-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-500 to-orange-700">
                  {o.value}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Mid-section CTA */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-8">
          <p className="text-sm md:text-base text-zinc-500 max-w-md">
            Want a teardown of your site through the same lens? I record a
            free 60-second Loom audit on request.
          </p>
          <Link
            href="/offer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Get my free audit
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
