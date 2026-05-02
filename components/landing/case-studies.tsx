"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

// Light-theme proof showcase — sits directly under the hero.
//
//   1. "Book a FREE 30 minute call" pill at top.
//   2. Featured project gallery with real screenshots from
//      /public/work-screenshots/.
//   3. Brand strip below using Google's favicon service so each name
//      ships with the actual mark from the live site.
//
// CMS case-study items can flow in via the `items` prop (used to keep
// /work and the homepage in sync); when no items match a screenshot,
// the static FEATURED_PROJECTS list takes over.

export type CaseStudyCard = {
  client: string;
  result: string;
  detail?: string;
  link: string;
  tags: string[];
  screenshot?: string;
};

// Static featured projects — everything Rashid has a polished cover
// shot for. Ordered for hero-card prominence: Vanos AI first because
// it's also a full case study at /work/vanos-ai.
type FeaturedProject = {
  client: string;
  domain: string;
  href: string;
  screenshot: string;
  outcome?: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    client: "Vanos AI",
    domain: "vanos.ai",
    href: "/work/vanos-ai",
    screenshot: "/work-screenshots/vanos-ai.png",
    outcome: "Weekly active devs 2×",
  },
  {
    client: "Circleback",
    domain: "circleback.ai",
    href: "https://circleback.ai",
    screenshot: "/work-screenshots/circleback.png",
    outcome: "AI meeting intelligence",
  },
  {
    client: "Karumi",
    domain: "karumi.ai",
    href: "https://karumi.ai",
    screenshot: "/work-screenshots/karumi.png",
    outcome: "Code-AI / dev tooling",
  },
  {
    client: "Keel",
    domain: "keel.so",
    href: "https://keel.so",
    screenshot: "/work-screenshots/keel.png",
    outcome: "Backend platform for builders",
  },
  {
    client: "Liftoff",
    domain: "liftoff.xyz",
    href: "https://liftoff.xyz",
    screenshot: "/work-screenshots/liftoff.png",
    outcome: "Launch-grade marketing site",
  },
  {
    client: "Page Loop",
    domain: "pageloop.ai",
    href: "https://pageloop.ai",
    screenshot: "/work-screenshots/pageloop.png",
    outcome: "AI for landing pages",
  },
  {
    client: "Solidroad",
    domain: "solidroad.com",
    href: "https://solidroad.com",
    screenshot: "/work-screenshots/solidroad.png",
    outcome: "Sales coaching SaaS",
  },
];

// Trust strip — every client name with the favicon pulled from the
// live site via Google's S2 favicon service. No auth, cached at the
// edge; works for any public domain.
const TRUST_BRANDS = [
  { name: "UpdateAI", domain: "update.ai" },
  { name: "Vanos AI", domain: "vanos.ai" },
  { name: "SpaceDome", domain: "spacedome.ai" },
  { name: "Cartage", domain: "cartage.ai" },
  { name: "Solidroad", domain: "solidroad.com" },
  { name: "Karumi", domain: "karumi.ai" },
  { name: "Liftoff", domain: "liftoff.xyz" },
  { name: "Keel", domain: "keel.so" },
  { name: "Circleback", domain: "circleback.ai" },
  { name: "Pageloop", domain: "pageloop.ai" },
  { name: "ATQLeads", domain: "atqleads.com" },
  { name: "Localyzer", domain: "localyzer.io" },
  { name: "Crezco", domain: "crezco.co.uk" },
  { name: "Melissa Ambrosini", domain: "melissaambrosini.com" },
  { name: "Nick Broadhurst", domain: "nickbroadhurst.com" },
];

function faviconUrl(domain: string, size = 64) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function CaseStudies({ items: _items }: { items?: CaseStudyCard[] }) {
  // Items prop is accepted for API parity with /work but the homepage
  // showcase pulls its visuals from the static FEATURED_PROJECTS list
  // since those are the projects with polished cover shots.
  void _items;

  return (
    <section id="case-studies" className="bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-20 md:pb-24">
        {/* Top pill */}
        <div className="flex justify-center mb-12 md:mb-16">
          <a
            href="#booking-calendar"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#booking-calendar")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-900 text-sm font-semibold shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
          >
            <Calendar className="w-4 h-4 text-orange-500" aria-hidden="true" />
            Book a FREE 30 minute call
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
          </a>
        </div>

        {/* Featured-project gallery — horizontal scroll-snap. */}
        <ProjectShowcase projects={FEATURED_PROJECTS} />

        {/* Trust strip with favicons */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-[0.22em] mb-6">
            Trusted by brands around the world
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-4">
            {TRUST_BRANDS.map((b) => (
              <a
                key={b.name}
                href={`https://${b.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${b.name}`}
                className="group inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <span className="w-5 h-5 rounded-sm bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-zinc-200 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={faviconUrl(b.domain, 64)}
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-xs md:text-sm font-medium">{b.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ projects }: { projects: FeaturedProject[] }) {
  return (
    <div className="relative -mx-6 md:-mx-8">
      <div
        className="case-studies-scroll flex gap-4 md:gap-5 overflow-x-auto px-6 md:px-8 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.client} project={p} index={i} />
        ))}
      </div>
      <style>{`.case-studies-scroll::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const isExternal = project.href.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.a
      href={project.href}
      {...linkProps}
      aria-label={`View ${project.client} project`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative shrink-0 w-[280px] md:w-[360px] lg:w-[440px] rounded-2xl overflow-hidden border border-zinc-200 bg-white snap-start hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all"
    >
      <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
        <Image
          src={project.screenshot}
          alt={`${project.client} site preview`}
          fill
          sizes="(min-width: 1024px) 440px, (min-width: 768px) 360px, 280px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-4 md:p-5 flex items-start justify-between gap-3 border-t border-zinc-100">
        <div className="min-w-0">
          <p className="text-sm md:text-base font-bold text-zinc-900 truncate">
            {project.client}
          </p>
          {project.outcome && (
            <p className="text-[11px] md:text-xs font-mono text-orange-600 uppercase tracking-wider mt-0.5 truncate">
              {project.outcome}
            </p>
          )}
        </div>
        <ArrowUpRight
          className="w-5 h-5 text-zinc-300 shrink-0 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          aria-hidden="true"
        />
      </div>
    </motion.a>
  );
}
