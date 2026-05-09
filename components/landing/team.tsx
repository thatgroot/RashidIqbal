"use client";

// Aestho team — Superhuman + cap.so. Lead inverts to indigo (mirrors
// pricing-featured pattern), other 7 sit on canvas-soft cards. Hover:
// lift 4px and a violet-soft ring fades in. Each member carries a tiny
//"→ N projects shipped" tag for proof + retention.

import { motion } from"framer-motion";

const ACCENTS = [
"c9b4fa",
"ddd6ff",
"e8e4dd",
"fafaf8",
"c9b4fa",
"ddd6ff",
"e8e4dd",
"fafaf8",
];

type Member = {
  name: string;
  role: string;
  slug: string;
  href?: string;
  shipped: string;
};

const TEAM: Member[] = [
  { name:"Rashid Iqbal", role:"Lead · Figma + UX Copy", slug:"rashid-iqbal", href:"https://www.framer.com/@risiq", shipped:"50+ projects" },
  { name:"Mehdi Hassan", role:"Figma + Framer Expert", slug:"mehdi-hassan", shipped:"30+ projects" },
  { name:"Rehbaz Ali", role:"Figma · Framer Expert", slug:"rehbaz-ali", shipped:"25+ projects" },
  { name:"Ans Ali", role:"Framer Expert", slug:"ans-ali", shipped:"20+ projects" },
  { name:"Qasid Hussain", role:"Framer Expert", slug:"qasid-hussain", shipped:"18+ projects" },
  { name:"Irtiqa Shah", role:"Figma Designer", slug:"irtiqa-shah", shipped:"15+ projects" },
  { name:"Iqtidar Hassan", role:"Motion · After Effects", slug:"iqtidar-hassan", shipped:"12+ films" },
  { name:"Mir Anees", role:"Video Editor", slug:"mir-anees", shipped:"20+ cuts" },
];

function avatarUrl(name: string, color: string) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=${color}&fontFamily=Inter&chars=2`;
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="bg-white scroll-mt-16 border-y border-[#e5e5e5]"
    >
      <div className="max-w-container mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32">
        {/* Editorial opener */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin:"-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <p
            className="text-[11px] uppercase tracking-[0.22em] text-[#737373] mb-4"
            style={{ fontVariationSettings: '"wght" 540' }}
          >
            03 · The studio
          </p>
          <h2
            className="text-[clamp(38px,5.6vw,68px)] tracking-[-0.024em] leading-[0.96] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 460' }}
          >
            A studio,
            <br className="hidden md:inline" />
            <span className="text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 540' }}>
              {""}not a freelancer.
            </span>
          </h2>
          <p
            className="mt-6 text-[18px] md:text-[19px] text-[#737373] leading-[1.5] max-w-2xl"
            style={{ fontVariationSettings: '"wght" 460' }}
          >
            Eight specialists across Figma, Framer, UX copy, motion, and
            video. One project lead. One contract. One conversation.
          </p>
        </motion.div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {TEAM.map((m, i) => {
            const color = ACCENTS[i % ACCENTS.length] ??"c9b4fa";
            const isLead = i === 0;
            const inner = (
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin:"-40px" }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.05, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={`group relative h-full p-5 md:p-6 rounded-lg transition-all border ${
                  isLead
                    ?"bg-white border-[#fde8a3]"
                    :"bg-[#fafafa] border-[#e5e5e5] hover:border-[#fde8a3] hover:bg-white"
                }`}
                style={{
                  backgroundImage: isLead
                    ?"radial-gradient(80% 100% at 100% 100%, rgba(230,180,49,0.18) 0%, rgba(248,200,77,0.10) 35%, rgba(255,255,255,0) 70%)"
                    :"none",
                }}
              >
                <div className="flex flex-col gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/team/${m.slug}.jpg`}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.dataset.fallback) return;
                      img.dataset.fallback ="true";
                      img.src = avatarUrl(m.name, color);
                    }}
                    alt={m.name}
                    width={96}
                    height={96}
                    loading="lazy"
                    className={`w-16 h-16 md:w-[72px] md:h-[72px] object-cover rounded-md transition-all ${
                      isLead ?"ring-2 ring-[#fde8a3]" :"bg-[#e5e5e5] group-hover:ring-2 group-hover:ring-[#fde8a3]"
                    }`}
                  />
                  <div className="min-w-0">
                    <p
                      className="text-[15px] md:text-base leading-tight truncate text-[#0a0a0a]"
                      style={{ fontVariationSettings: '"wght" 540' }}
                    >
                      {m.name}
                    </p>
                    <p
                      className="text-[12px] md:text-[13px] leading-[1.4] mt-1 text-[#737373]"
                      style={{ fontVariationSettings: '"wght" 460' }}
                    >
                      {m.role}
                    </p>
                    <p
                      className={`mt-3 text-[10px] uppercase tracking-[0.18em] ${
                        isLead ?"text-[#9c7307]" :"text-[#a3a3a3]"
                      }`}
                      style={{ fontVariationSettings: '"wght" 600' }}
                    >
                      → {m.shipped}
                    </p>
                    {isLead && (
                      <p
                        className="text-[10px] uppercase tracking-[0.22em] mt-1.5 text-[#9c7307]"
                        style={{ fontVariationSettings: '"wght" 600' }}
                      >
                        Lead · Studio founder
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
            return (
              <li key={m.slug}>
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} — ${m.role}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] rounded-lg"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>

        <p
          className="text-[14px] text-[#a3a3a3] mt-12 md:mt-14 max-w-xl leading-[1.6]"
          style={{ fontVariationSettings: '"wght" 460' }}
        >
          Project ownership stays with Rashid throughout the engagement. You
          ping one person; the team executes.
        </p>
      </div>
    </section>
  );
}
