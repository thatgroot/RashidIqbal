"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";

const credentials = [
  { label: "Certified Framer Expert", link: "https://www.framer.com/@risiq" },
  { label: "Official Replit Expert on Contra", link: SOCIAL_LINKS.contra },
  { label: "Top Rated on Upwork", link: SOCIAL_LINKS.upwork },
  { label: "Shipping for clients since 2019", link: SOCIAL_LINKS.upwork },
];

const profiles = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { name: "Framer", href: "https://www.framer.com/@risiq" },
  { name: "Upwork", href: SOCIAL_LINKS.upwork },
  { name: "Contra", href: SOCIAL_LINKS.contra },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

export function AboutSection() {
  return (
    <section className="bg-white" id="about">
      <div className="max-w-container border-l border-[#e8e4dd]">
        {/* Credibility headline stat - answers "is this person credible?" at a glance */}
        <GridContainer>
          <GridItem className="py-10 bg-[#fafaf8]/40" padding={false}>
            <div className="px-8 sm:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[0.625rem] font-mono text-[#1b1938] uppercase tracking-[0.2em] block mb-3">
                  Credibility
                </span>
                <p className="text-2xl md:text-3xl font-semibold text-[#292827] leading-tight max-w-3xl">
                  Across <span className="text-[#1b1938]">years of client work</span>, founders report an average <span className="text-[#1b1938]">2.4x conversion lift</span>. <span className="text-[#1b1938]">Top Rated on Upwork</span> and <span className="text-[#1b1938]">Official Replit Expert</span> on Contra.
                </p>
              </div>
              <a
                href={SOCIAL_LINKS.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#73706d] hover:text-[#1b1938] transition-colors whitespace-nowrap"
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
              <span className="text-[0.625rem] font-mono text-[#73706d] uppercase tracking-[0.2em] mb-6 block">
                Who
              </span>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#fafaf8] rounded-full overflow-hidden border border-[#e8e4dd] flex items-center justify-center">
                  <Image
                    src="/favicon.svg"
                    alt="Rashid Iqbal"
                    width={40}
                    height={40}
                    className="opacity-80"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#292827]">Rashid Iqbal</h2>
                  <p className="text-sm text-[#73706d]">Figma &amp; Framer Expert, since 2019</p>
                </div>
              </div>

              {/* What? */}
              <span className="text-[0.625rem] font-mono text-[#73706d] uppercase tracking-[0.2em] mb-3 block">
                What
              </span>
              <p className="text-[#73706d] leading-relaxed mb-8">
                I design in Figma, write the UX copy, and build in Framer. I also ship Chrome extensions for teams that need custom browser tools. Shipping for clients in 12 countries since 2019.
              </p>

              {/* How I work - methodology */}
              <span className="text-[0.625rem] font-mono text-[#73706d] uppercase tracking-[0.2em] mb-3 block">
                How
              </span>
              <ul className="space-y-2.5 text-sm text-[#292827] mb-8">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b1938] mt-2 shrink-0" />
                  <span>Copy first. Design after. Most people do it backwards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b1938] mt-2 shrink-0" />
                  <span>Figma to Framer in two weeks, not two months.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b1938] mt-2 shrink-0" />
                  <span>GA4, heatmaps, and conversion tracking on every launch.</span>
                </li>
              </ul>

              {/* Verify me (research-backed profiles) */}
              <span className="text-[0.625rem] font-mono text-[#73706d] uppercase tracking-[0.2em] mb-3 block">
                Verify
              </span>
              <div className="flex flex-wrap gap-3">
                {profiles.map((p, i) => (
                  <a
                    key={i}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#73706d] border border-[#e8e4dd] hover:border-[#e8c773] hover:text-[#1b1938] transition-colors"
                  >
                    {p.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </motion.div>
          </GridItem>

          {/* Right: Research / Credentials / Proof */}
          <GridItem className="py-24 bg-[#fafaf8]/30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[0.625rem] font-mono text-[#73706d] uppercase tracking-[0.2em] mb-8 block">
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
                      <div className="w-2 h-2 bg-[#1b1938] rounded-full" />
                      <span className="font-medium text-[#292827] group-hover:text-[#1b1938] transition-colors">
                        {c.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#9a9794] group-hover:text-[#1b1938] transition-colors" />
                  </a>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#e8e4dd]">
                <div>
                  <div className="text-2xl font-bold text-[#292827]">7+</div>
                  <div className="text-xs text-[#73706d]">Years building websites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#292827]">12</div>
                  <div className="text-xs text-[#73706d]">Countries served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#292827]">2 weeks</div>
                  <div className="text-xs text-[#73706d]">Avg. delivery time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#292827]">24hr</div>
                  <div className="text-xs text-[#73706d]">Response time</div>
                </div>
              </div>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
