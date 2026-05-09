"use client";

import Image from"next/image";
import { ArrowUpRight } from"lucide-react";
import { motion } from"framer-motion";

//"Selected work" — Codex card pattern. Centred chip + bold black
// headline + sub. 3-col grid of equal-height cards (h-full + flex)
// with macOS browser chrome above each screenshot,"Live" pill, and
// title + outcome footer.

export type CaseStudyCard = {
  client: string;
  result: string;
  detail?: string;
  link: string;
  tags: string[];
  screenshot?: string;
};

type FeaturedProject = {
  client: string;
  domain: string;
  href: string;
  screenshot: string;
  outcome?: string;
  tag?: string;
  shippedAgo?: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  { client:"UpdateAI", domain:"update.ai", href:"/work/updateai", screenshot:"/work-screenshots/updateai.png", outcome:"Signups +50% in 60 days", tag:"B2B SaaS", shippedAgo:"3 weeks ago" },
  { client:"Vanos AI", domain:"vanos.ai", href:"/work/vanos-ai", screenshot:"/work-screenshots/vanos-ai.png", outcome:"Weekly devs 2× post-launch", tag:"AI · Voice", shippedAgo:"5 weeks ago" },
  { client:"SpaceDome", domain:"spacedome.ai", href:"/work/spacedome-ai", screenshot:"/work-screenshots/space-dome.png", outcome:"Signups 3× from launch wave", tag:"AI · Spatial", shippedAgo:"2 months ago" },
  { client:"ATQLeads", domain:"atqleads.com", href:"/work/atqleads", screenshot:"/work-screenshots/funnel-labs.png", outcome:"2 closed-won in week one", tag:"Outbound", shippedAgo:"6 weeks ago" },
  { client:"Melissa Ambrosini", domain:"melissaambrosini.com", href:"https://melissaambrosini.com", screenshot:"/work-screenshots/melissa-ambrosini.png", outcome:"Author + creator brand", tag:"Personal", shippedAgo:"3 months ago" },
  { client:"Nick Broadhurst", domain:"nickbroadhurst.com", href:"https://nickbroadhurst.com", screenshot:"/work-screenshots/nick-broadhurst.png", outcome:"90+ Lighthouse, refreshed brand", tag:"Music", shippedAgo:"4 months ago" },
];

export function CaseStudies({ items: _items }: { items?: CaseStudyCard[] }) {
  void _items;
  return (
    <section id="case-studies" className="relative bg-white scroll-mt-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 codex-section-glow pointer-events-none"
      />
      <div className="relative max-w-container mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-32 md:pb-40">
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
              className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[9px]"
              style={{
                background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
                fontVariationSettings: '"wght" 700',
              }}
            >
              ⌘
            </span>
            Selected work
          </span>
          <h2
            className="mt-7 text-[clamp(40px,5.6vw,72px)] tracking-[-0.028em] leading-[1.04] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Six recent live builds.
          </h2>
          <p className="mt-5 text-[19px] leading-[1.5] text-[#404040] max-w-2xl mx-auto">
            Click any card for the brief, the rewrite, and the number we moved.
          </p>
        </motion.div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard key={p.domain} project={p} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/work"
            className="group inline-flex items-center gap-2 text-[15px] text-[#0a0a0a] hover:text-[#9c7307] transition-colors"
            style={{ fontVariationSettings: '"wght" 500' }}
          >
            See the full archive
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const isExternal = project.href.startsWith("http");
  const linkProps = isExternal ? { target:"_blank", rel:"noopener noreferrer" as const } : {};
  return (
    <motion.a
      href={project.href}
      {...linkProps}
      aria-label={`View ${project.client} project`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin:"-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-all"
    >
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#fafafa] border-b border-[#e5e5e5]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[11px] text-[#737373] truncate" style={{ fontVariationSettings: '"wght" 500' }}>
          {project.domain}
        </span>
        {project.tag ? (
          <span
            className="ml-auto text-[10px] uppercase tracking-[0.16em] text-[#9c7307] px-2 py-0.5 rounded-full bg-white border border-[#fde8a3]"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            {project.tag}
          </span>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] bg-[#fafafa] overflow-hidden">
        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-[#e5e5e5]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27c93f]/70 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#27c93f]" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 600' }}>
            Live
          </span>
        </span>
        <Image
          src={project.screenshot}
          alt={`${project.client} site preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-6 py-5 flex items-start justify-between gap-3 border-t border-[#e5e5e5] mt-auto">
        <div className="min-w-0">
          <p className="text-[18px] text-[#0a0a0a] truncate" style={{ fontVariationSettings: '"wght" 600' }}>
            {project.client}
          </p>
          {project.outcome ? (
            <p className="text-[14px] text-[#737373] mt-1 truncate">{project.outcome}</p>
          ) : null}
          {project.shippedAgo ? (
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3] mt-2" style={{ fontVariationSettings: '"wght" 600' }}>
              Shipped {project.shippedAgo}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 w-9 h-9 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:border-[#0a0a0a] transition-colors">
          <ArrowUpRight
            className="w-4 h-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-hidden="true"
          />
        </span>
      </div>
    </motion.a>
  );
}
