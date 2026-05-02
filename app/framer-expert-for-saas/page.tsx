import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Star } from "lucide-react";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const PAGE_PATH = "/framer-expert-for-saas";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Framer Expert for SaaS Landing Pages | Rashid Iqbal",
  description:
    "Hire a Certified Framer Expert for B2B SaaS landing pages. Two-week delivery. Figma design, Framer build, UX copy included. Clients: UpdateAI, Vanos AI, SpaceDome, ATQLeads, Keel.",
  keywords: [
    "framer expert for saas",
    "saas landing page designer",
    "b2b saas framer expert",
    "framer expert for y combinator startups",
    "framer expert for landing page",
    "high converting figma to framer landing page",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Framer Expert for SaaS Landing Pages | Rashid Iqbal",
    description:
      "Certified Framer Expert building high-converting B2B SaaS landing pages. Two-week delivery.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
          "Framer Expert for SaaS Landing Pages"
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Framer Expert for SaaS Landing Pages",
    description:
      "Certified Framer Expert. Two-week delivery. Copy + design + build.",
  },
};

const CLIENTS = ["UpdateAI", "Vanos AI", "SpaceDome", "ATQLeads", "Keel", "Cartage", "Karumi"] as const;

const DELIVERABLES = [
  "Conversion-focused information architecture for the funnel",
  "UX copy written by a copywriter, not laid out from your draft",
  "Figma design tuned for SaaS buyer scanning patterns",
  "Framer build with CMS, blog, and lead capture wired in",
  "Performance tuned for Core Web Vitals on mobile",
  "Two-week delivery from kickoff to launch",
] as const;

const PROCESS_STEPS = [
  {
    title: "Day 1 to 2: Strategy",
    body: "Kickoff call, audit of your current page, positioning sharpened, ICP narrowed to one buyer.",
  },
  {
    title: "Day 3 to 7: Design and copy",
    body: "Figma layout with final copy in place. One async review round, one live walkthrough.",
  },
  {
    title: "Day 8 to 12: Build",
    body: "Framer build with CMS, forms, analytics, and Cal.com booking. Lighthouse passes 90 plus.",
  },
  {
    title: "Day 13 to 14: Launch",
    body: "Domain pointed, redirects mapped, sitemap submitted, GA and PostHog wired. You go live.",
  },
] as const;

const FAQS = [
  {
    q: "What does a Framer expert for SaaS actually deliver?",
    a: "A complete marketing site: hero, features, pricing, blog, lead capture, and Cal.com booking. Built on Framer, written for B2B buyers, designed to turn cold visitors into demos.",
  },
  {
    q: "Do you work with Y Combinator startups?",
    a: "Yes. I have built and rebuilt sites for YC and post-YC startups including UpdateAI, Vanos AI, SpaceDome, ATQLeads, Karumi, and Keel. Two-week timeline fits launch and demo-day cycles.",
  },
  {
    q: "How much does a SaaS landing page cost?",
    a: "Single landing page projects ship in one week. Full multi-page marketing sites with CMS ship in two to three weeks. Pricing is fixed per scope and quoted on the kickoff call.",
  },
  {
    q: "Do you write the copy?",
    a: "Yes. Copy is included in every project, not an upsell. I interview your founders, study your competitors, and write the page before I design it.",
  },
  {
    q: "Can you migrate my existing Webflow or WordPress site to Framer?",
    a: "Yes. I rebuild the site in Framer, set up 301 redirects, and preserve SEO equity. Migrations usually run two to three weeks depending on page count.",
  },
  {
    q: "Why Framer instead of Webflow for SaaS?",
    a: "Framer ships better Core Web Vitals out of the box, has a faster canvas for design iteration, and supports AI-assisted layout generation. Read the full comparison at /blog/why-framer-2026-wordpress-webflow.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Framer Expert for SaaS Landing Pages",
  provider: { "@type": "Person", name: "Rashid Iqbal", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Framer development for B2B SaaS",
  url: PAGE_URL,
  description:
    "Certified Framer Expert building high-converting B2B SaaS landing pages with copy, design, and CMS in two weeks.",
};

export default function FramerExpertSaasPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
          Certified Framer Expert · Top Rated on Upwork
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          Framer Expert for SaaS Landing Pages
        </h1>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
          I build high-converting B2B SaaS landing pages on Framer. Copy, design, and build in
          two weeks. Clients include UpdateAI, Vanos AI, SpaceDome, and ATQLeads. One specialist, one
          timeline, one offer.
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
            Rashid Iqbal is a Certified Framer Expert who builds B2B SaaS landing pages
            with copy, design, and Framer development bundled into a single two-week
            delivery. Past SaaS clients include UpdateAI, Vanos AI, SpaceDome, ATQLeads, Keel,
            and Vanos AI. Single landing pages ship in one week; multi-page sites with
            CMS, blog, and lead capture ship in two to three weeks. Pricing is fixed per
            scope and quoted on the kickoff call.
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

        <div className="mb-12">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3">
            SaaS clients shipped
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-zinc-700">
            {CLIENTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>

        <div className="border border-zinc-200 bg-white p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">What you get</h2>
          <ul className="space-y-3">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-zinc-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Two-week delivery, day by day
          </h2>
          <ol className="space-y-4">
            {PROCESS_STEPS.map((s) => (
              <li key={s.title} className="border-l-2 border-orange-500 pl-4">
                <p className="text-sm font-bold text-zinc-900">{s.title}</p>
                <p className="text-sm text-zinc-600 mt-1">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="border border-zinc-100 bg-white px-6 py-8 mb-12">
          <div className="flex gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-orange-500 text-orange-500"
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="text-base md:text-lg text-zinc-900 leading-relaxed font-medium mb-4">
            &ldquo;The new design loads fast and converts way better than what we had before.
            Onboarding signups went up by half.&rdquo;
          </blockquote>
          <figcaption className="text-sm">
            <span className="font-bold text-zinc-900">Josh Schachter</span>{" "}
            <span className="text-zinc-500">· Founder &amp; CEO, UpdateAI</span>
          </figcaption>
        </figure>

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

        <div className="border-t border-zinc-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Ready to ship?</h2>
          <p className="text-sm text-zinc-600 mb-5">
            One call decides if we are a fit. No pitch, no upsell.
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
