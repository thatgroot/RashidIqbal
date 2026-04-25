import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SITE_URL, SOCIAL_LINKS, AUTHOR } from "@/lib/constants";

const PAGE_PATH = "/about";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "About Rashid Iqbal | Figma & Framer Expert",
  description:
    "Rashid Iqbal is a Certified Framer Expert and Top Rated Upwork freelancer designing and building high-converting landing pages since 2019. Clients in 12 countries, 50 plus projects shipped.",
  keywords: [
    "about rashid iqbal",
    "rashid iqbal framer expert",
    "rashid iqbal figma designer",
    "freelance framer developer",
    "certified framer expert",
    "top rated upwork freelancer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Rashid Iqbal | Figma & Framer Expert",
    description:
      "Certified Framer Expert. Top Rated on Upwork. 50 plus projects shipped since 2019.",
    url: PAGE_URL,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
          "About Rashid Iqbal"
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rashid Iqbal",
    description: "Certified Framer Expert. Top Rated on Upwork. 50+ projects shipped.",
  },
};

const STATS = [
  { label: "Years shipping", value: "7+" },
  { label: "Countries served", value: "12" },
  { label: "Projects delivered", value: "50+" },
  { label: "Avg. conversion lift", value: "2.4x" },
] as const;

const CREDENTIALS = [
  {
    label: "Certified Framer Expert",
    href: "https://framer.link/rashidiqbal",
    note: "Verified by Framer's official directory.",
  },
  {
    label: "Official Replit Expert on Contra",
    href: SOCIAL_LINKS.contra,
    note: "Selected to the Replit Experts program.",
  },
  {
    label: "Top Rated on Upwork",
    href: SOCIAL_LINKS.upwork,
    note: "Top 10 percent of freelancers, since 2021.",
  },
  {
    label: "100 percent job success score",
    href: SOCIAL_LINKS.upwork,
    note: "Over 7,000 hours billed across 40 plus contracts.",
  },
] as const;

const SERVICES = [
  {
    title: "Landing pages and websites",
    body: "Figma design, Framer build, UX copy. Two-week delivery. Best for SaaS, agencies, and Y Combinator startups.",
    href: "/framer-expert-for-saas",
  },
  {
    title: "Figma to Framer conversion",
    body: "Pixel-perfect handoff with CMS, forms, and analytics wired in. Lighthouse 90 plus on mobile.",
    href: "/figma-to-framer",
  },
  {
    title: "Chrome extensions",
    body: "Manifest V3 extensions in React and TypeScript. Spec to Web Store submission in two to four weeks.",
    href: "/chrome-extension-developer",
  },
] as const;

const PRINCIPLES = [
  "Copy comes first. Design serves the message, not the other way around.",
  "Two-week delivery is the default, not a rush job. Scope fits the timeline.",
  "One specialist beats a team of three for marketing sites under twenty pages.",
  "Performance is a feature. Lighthouse 90 plus on mobile or it does not ship.",
  "Conversion data, not opinions, drives the second iteration after launch.",
] as const;

const CLIENTS = [
  "Relace",
  "Equals",
  "Hevn",
  "UpdateAI",
  "Crezco",
  "Vanos AI",
  "Space Dome",
  "Leanscale",
] as const;

const FAQS = [
  {
    q: "Where are you based and what hours do you work?",
    a: "Remote, working worldwide. Most client calls run between 9 AM and 7 PM UTC. Async communication on Slack, Linear, or email between meetings.",
  },
  {
    q: "Do you work solo or with a team?",
    a: "Solo for design and build. I bring in a trusted copywriter for long-form content, and a developer for back-end work outside Framer or Chrome extensions.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Single landing pages: 1 week. Multi-page sites with CMS: 2 weeks. Migrations from Webflow or WordPress: 2 to 3 weeks. Chrome extensions: 2 to 4 weeks.",
  },
  {
    q: "Do you take retainer clients?",
    a: "Yes. Monthly retainers cover ongoing design, build, and copy work. Best fit for SaaS marketing teams shipping new pages or experiments every month.",
  },
  {
    q: "What is your pricing model?",
    a: "Fixed-price per project, paid 50 percent upfront and 50 percent on launch. Retainers billed monthly. Pricing tiers listed at /#pricing.",
  },
  {
    q: "Can I see live client work?",
    a: "Yes. Case studies and testimonials run on the homepage. For private NDA work, I share examples on the kickoff call.",
  },
  {
    q: "What tools do you use?",
    a: "Figma, Framer, Cursor, Claude Code, Linear, Notion, Slack, GitHub, Vercel, Resend, PostHog, and Cal.com.",
  },
  {
    q: "How do I start working with you?",
    a: "Book a 30-minute call on Cal. We talk through scope, timeline, and budget. You get a fixed quote within 24 hours.",
  },
] as const;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: AUTHOR.name,
  url: SITE_URL,
  email: AUTHOR.email,
  jobTitle: "Figma & Framer Expert",
  description:
    "Certified Framer Expert and Top Rated Upwork freelancer designing and building high-converting landing pages since 2019.",
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.twitter,
    SOCIAL_LINKS.upwork,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.contra,
    SOCIAL_LINKS.framerExpert,
  ],
  knowsAbout: [
    "Framer development",
    "Figma design",
    "UX copywriting",
    "Landing page conversion",
    "Chrome extension development",
    "Manifest V3",
    "SaaS marketing sites",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Certified Framer Expert" },
    { "@type": "EducationalOccupationalCredential", name: "Official Replit Expert on Contra" },
    { "@type": "EducationalOccupationalCredential", name: "Top Rated on Upwork" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/40" />
      </div>

      <header className="max-w-3xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="" width={28} height={28} aria-hidden="true" />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </Link>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em] mb-4">
          About
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          I design and ship sites that turn visitors into customers.
        </h1>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
          I am Rashid Iqbal. Certified Framer Expert. Top Rated on Upwork. I have shipped
          50 plus projects for SaaS founders, Y Combinator startups, and agencies in 12
          countries since 2019. Copy first, design second, build third. Two-week delivery is
          the default.
        </p>

        {/* TL;DR — quotable answer block for AI search citation */}
        <aside
          aria-label="Summary"
          className="border-l-4 border-orange-500 bg-orange-50/50 px-5 py-4 mb-10"
        >
          <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em] mb-2">
            Summary
          </p>
          <p className="text-sm md:text-base text-zinc-800 leading-relaxed">
            Rashid Iqbal is a Certified Framer Expert and Top Rated Upwork freelancer who
            designs in Figma, writes UX copy, and builds in Framer. Based remote, working
            worldwide. Has shipped 50 plus landing pages and websites for SaaS founders and
            Y Combinator startups since 2019. Average client conversion lift: 2.4x.
            Two-week delivery is the standard timeline.
          </p>
        </aside>

        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a strategy call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="https://framer.link/rashidiqbal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-300 text-zinc-900 text-sm font-bold hover:bg-zinc-50 transition-colors"
          >
            Hire on Framer
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-y border-zinc-200 py-8 mb-12">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-zinc-900">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mb-12 prose prose-zinc max-w-none">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">The short story</h2>
          <p className="text-base text-zinc-600 leading-relaxed mb-4">
            I started as a Figma designer in 2019. Spent three years watching beautiful
            designs get built into slow, heavy WordPress sites that lost half the visitors.
            Switched to Framer in 2022 because the canvas felt like Figma and the output felt
            like a real site. Never went back.
          </p>
          <p className="text-base text-zinc-600 leading-relaxed mb-4">
            Today I design, write, and build the whole site myself. One specialist, one
            timeline, one bill. No handoff lag, no agency overhead, no creative-director
            tax. Most of my work is for B2B SaaS founders who need a marketing site that
            converts cold traffic into demos.
          </p>
          <p className="text-base text-zinc-600 leading-relaxed">
            On the side I build Chrome extensions. Manifest V3, React, TypeScript. Usually
            shipped to the Web Store inside three weeks for SaaS teams that need a custom
            browser tool their developers do not have time to build.
          </p>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">What I do</h2>
          <div className="space-y-4">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="block border border-zinc-200 bg-white p-5 hover:border-orange-300 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-900 group-hover:text-orange-700 transition-colors mb-1.5">
                      {s.title}
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed">{s.body}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* How I work */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">How I work</h2>
          <ul className="space-y-3">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-zinc-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Credentials */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">Credentials</h2>
          <div className="space-y-4">
            {CREDENTIALS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-4 group border-b border-zinc-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                    {c.label}
                  </p>
                  <p className="text-sm text-zinc-600 mt-1">{c.note}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Clients I have shipped for
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-zinc-700">
            {CLIENTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>

        {/* Profiles */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Verify me
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
              { name: "Framer", href: "https://framer.link/rashidiqbal" },
              { name: "Upwork", href: SOCIAL_LINKS.upwork },
              { name: "Contra", href: SOCIAL_LINKS.contra },
              { name: "GitHub", href: SOCIAL_LINKS.github },
              { name: "Twitter", href: SOCIAL_LINKS.twitter },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors"
              >
                {p.name}
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-bold text-zinc-900 mb-1.5">{f.q}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-zinc-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Want to work together?
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            Book a 30-minute call. We talk through scope, timeline, and budget. You get a
            fixed quote within 24 hours.
          </p>
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a strategy call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
