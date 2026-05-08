"use client";

// Aestho team — 8 specialists across Figma design, Framer development,
// motion, and video. Rashid is the lead. Each card uses a local
// portrait at /public/team/<slug>.jpg when present, falling back to a
// DiceBear "initials" SVG if the file is missing — so the section
// stays visible even when a photo hasn't shipped yet.
//
// Marked "use client" because the avatar fallback chain uses an
// onError handler on <img>, which is a DOM event and only valid on
// client components.

const ACCENTS = [
  "fed7aa", // peach
  "fcd34d", // amber
  "a7f3d0", // mint
  "bfdbfe", // sky
  "fbcfe8", // pink
  "ddd6fe", // violet
  "bbf7d0", // emerald
  "fde68a", // yellow
  "fed7aa",
];

type Member = {
  name: string;
  role: string;
  slug: string;
  /** Optional Twitter / LinkedIn / personal URL — wraps the card if set. */
  href?: string;
};

const TEAM: Member[] = [
  {
    name: "Rashid Iqbal",
    role: "Lead · Figma + UX Copy",
    slug: "rashid-iqbal",
    href: "https://www.framer.com/@risiq",
  },
  {
    name: "Mehdi Hassan",
    role: "Figma + Framer Expert",
    slug: "mehdi-hassan",
  },
  {
    name: "Rehbaz Ali",
    role: "Figma Designer · Framer Expert",
    slug: "rehbaz-ali",
  },
  {
    name: "Ans Ali",
    role: "Framer Expert",
    slug: "ans-ali",
  },
  {
    name: "Qasid Hussain",
    role: "Framer Expert",
    slug: "qasid-hussain",
  },
  {
    name: "Irtiqa Shah",
    role: "Figma Designer",
    slug: "irtiqa-shah",
  },
  {
    name: "Iqtidar Hassan",
    role: "Motion Designer · After Effects",
    slug: "iqtidar-hassan",
  },
  {
    name: "Mir Anees",
    role: "Video Editor",
    slug: "mir-anees",
  },
];

function avatarUrl(name: string, color: string) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=${color}&fontFamily=Inter&chars=2`;
}

export function TeamSection() {
  return (
    <section id="team" className="bg-white scroll-mt-16 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        {/* Eyebrow + headline */}
        <div className="flex justify-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-xs md:text-sm text-zinc-700">
            <span
              className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"
              aria-hidden="true"
            />
            The Aestho Team
          </span>
        </div>
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-zinc-900 max-w-3xl mx-auto mb-5">
          A studio, not a freelancer.
        </h2>
        <p className="text-center text-base md:text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-14 md:mb-20">
          Eight specialists across Figma design, Framer development,
          UX copy, motion, and video. One project lead.
          One contract. One conversation.
        </p>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {TEAM.map((m, i) => {
            const color = ACCENTS[i % ACCENTS.length] ?? "fed7aa";
            const isLead = i === 0;
            const inner = (
              <article
                className={`group h-full border bg-white p-5 md:p-6 transition-all hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5 ${
                  isLead ? "border-orange-200" : "border-zinc-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Local portrait → fall back to a DiceBear SVG.
                      Plain <img> so the dicebear domain doesn't need
                      a next/image whitelist; lazy-loaded. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/team/${m.slug}.jpg`}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.dataset.fallback) return;
                      img.dataset.fallback = "true";
                      img.src = avatarUrl(m.name, color);
                    }}
                    alt={m.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-14 h-14 md:w-16 md:h-16 object-cover bg-zinc-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base font-bold text-zinc-900 leading-tight truncate">
                      {m.name}
                    </p>
                    <p className="text-[11px] md:text-xs text-zinc-500 leading-snug mt-0.5">
                      {m.role}
                    </p>
                    {isLead && (
                      <p className="text-[10px] font-mono text-orange-600 uppercase tracking-[0.18em] mt-1.5">
                        Lead
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
            return (
              <li key={m.slug}>
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} — ${m.role}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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

        <p className="text-center text-xs md:text-sm text-zinc-500 mt-10 md:mt-14">
          Project ownership stays with Rashid throughout the engagement.
          You ping one person; the team executes.
        </p>
      </div>
    </section>
  );
}
