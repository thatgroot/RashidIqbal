"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { SOCIAL_LINKS } from "@/lib/constants";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const credentials = [
  { label: "Certified Framer Expert", link: "https://www.framer.com/@rashidiqbal" },
  { label: "Upwork Top Rated", link: SOCIAL_LINKS.upwork },
  { label: "53 Projects Shipped", link: "/work" },
];

const profiles = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { name: "Framer", href: "https://www.framer.com/@rashidiqbal" },
  { name: "Upwork", href: SOCIAL_LINKS.upwork },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

export function AboutSection() {
  return (
    <section className="bg-white" id="about">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer cols={2}>
          {/* Left: Bio */}
          <GridItem className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6 block">
                Who&apos;s Behind This
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
                  <p className="text-sm text-zinc-500">Figma &amp; Framer Expert</p>
                </div>
              </div>

              <p className="text-zinc-600 leading-relaxed mb-6">
                I&apos;ve been building conversion-focused websites since 2019. 53 projects
                shipped for clients across 12 countries. I design in Figma, write the UX copy,
                and build pixel-perfect in Framer. I also develop Chrome extensions for
                businesses that need custom browser tools.
              </p>

              <p className="text-zinc-600 leading-relaxed mb-8">
                Based in Pakistan, working remotely with startups and brands worldwide.
                Most of my clients are in the US, UK, Australia, and Europe. I respond
                within 24 hours and ship on time.
              </p>

              {/* Verify me */}
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

          {/* Right: Credentials */}
          <GridItem className="py-24 bg-zinc-50/30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-8 block">
                Credentials
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
