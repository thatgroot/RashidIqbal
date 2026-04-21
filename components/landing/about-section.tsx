"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const credentials = [
  { label: "Certified Framer Expert", link: "https://www.framer.com/@rashidiqbal" },
  { label: "Official Replit Expert on Contra", link: SOCIAL_LINKS.contra },
  { label: "Top Rated on Upwork", link: SOCIAL_LINKS.upwork },
  { label: "Shipping for clients since 2019", link: SOCIAL_LINKS.upwork },
];

const profiles = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { name: "Framer", href: "https://www.framer.com/@rashidiqbal" },
  { name: "Upwork", href: SOCIAL_LINKS.upwork },
  { name: "Contra", href: SOCIAL_LINKS.contra },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

export function AboutSection() {
  return (
    <section className="bg-white" id="about">
      <div className="max-w-container border-l border-zinc-100">
        {/* Credibility headline stat - answers "is this person credible?" at a glance */}
        <GridContainer>
          <GridItem className="py-10 bg-zinc-50/40" padding={false}>
            <div className="px-8 sm:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono text-orange-600 uppercase tracking-[0.2em] block mb-3">
                  Credibility
                </span>
                <p className="text-2xl md:text-3xl font-semibold text-zinc-900 leading-tight max-w-3xl">
                  Across <span className="text-orange-600">years of client work</span>, founders report an average <span className="text-orange-600">2.4x conversion lift</span>. <span className="text-orange-600">Top Rated on Upwork</span> and <span className="text-orange-600">Official Replit Expert</span> on Contra.
                </p>
              </div>
              <a
                href={SOCIAL_LINKS.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-orange-600 transition-colors whitespace-nowrap"
              >
                Verify on Upwork
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={2}>
          {/* Left: Who + What + How (Bio) */}
          <GridItem className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Who? */}
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6 block">
                Who
              </span>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 flex items-center justify-center">
                  <Image
                    src="/favicon.svg"
                    alt="Rashid Iqbal"
                    width={40}
                    height={40}
                    className="opacity-80"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Rashid Iqbal</h2>
                  <p className="text-sm text-zinc-500">Figma &amp; Framer Expert, since 2019</p>
                </div>
              </div>

              {/* What? */}
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3 block">
                What
              </span>
              <p className="text-zinc-600 leading-relaxed mb-8">
                I design in Figma, write the UX copy, and build in Framer. I also ship Chrome extensions for teams that need custom browser tools. Shipping for clients in 12 countries since 2019.
              </p>

              {/* How I work - methodology */}
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3 block">
                How
              </span>
              <ul className="space-y-2.5 text-sm text-zinc-700 mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>Copy first. Design after. Most people do it backwards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>Figma to Framer in two weeks, not two months.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>GA4, heatmaps, and conversion tracking on every launch.</span>
                </li>
              </ul>

              {/* Verify me (research-backed profiles) */}
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3 block">
                Verify
              </span>
              <div className="flex flex-wrap gap-3">
                {profiles.map((p, i) => (
                  <a
                    key={i}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {p.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </motion.div>
          </GridItem>

          {/* Right: Research / Credentials / Proof */}
          <GridItem className="py-24 bg-zinc-50/30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-8 block">
                Research / Proof
              </span>

              <div className="space-y-6 mb-10">
                {credentials.map((c, i) => (
                  <a
                    key={i}
                    href={c.link}
                    target={c.link.startsWith("http") ? "_blank" : undefined}
                    rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">
                        {c.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                  </a>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-200">
                <div>
                  <div className="text-2xl font-bold text-zinc-900">7+</div>
                  <div className="text-xs text-zinc-500">Years building websites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">12</div>
                  <div className="text-xs text-zinc-500">Countries served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">2 weeks</div>
                  <div className="text-xs text-zinc-500">Avg. delivery time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">24hr</div>
                  <div className="text-xs text-zinc-500">Response time</div>
                </div>
              </div>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
