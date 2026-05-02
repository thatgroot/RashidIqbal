import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const PAGE_PATH = "/figma-to-framer";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Figma to Framer Conversion · 2-week delivery",
  description:
    "Convert your Figma design into a live Framer site in two weeks. Pixel-perfect, responsive, fast. CMS, forms, analytics included. Certified Framer Expert, Top Rated on Upwork.",
  keywords: [
    "figma to framer",
    "figma to framer freelancer",
    "figma to framer 2 week delivery",
    "high converting figma to framer landing page",
    "figma to framer service",
    "figma design to framer site",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Figma to Framer | Two-Week Delivery | Rashid Iqbal",
    description:
      "Pixel-perfect Figma to Framer conversion. Two-week delivery. CMS, forms, analytics included.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
          "Figma to Framer Conversion"
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figma to Framer in Two Weeks",
    description: "Pixel-perfect conversion. CMS, forms, analytics included.",
  },
};

const INCLUDED = [
  "Pixel-perfect parity with your Figma file across every breakpoint",
  "Smart Components for buttons, cards, nav, and hero variants",
  "Framer CMS for blog, case studies, careers, or any structured content",
  "Forms wired to your inbox, Resend, Mailchimp, or HubSpot",
  "Lighthouse 90 plus on mobile with image, font, and JS optimization",
  "SEO meta, Open Graph, sitemap, robots, and JSON-LD structured data",
  "Custom domain, HTTPS, redirects, and analytics handoff",
] as const;

const PROCESS = [
  {
    title: "Day 1: Audit your Figma",
    body: "I review the file, flag missing breakpoints, fix unconstrained layers, and document tokens.",
  },
  {
    title: "Day 2 to 8: Build the canvas",
    body: "Component library set up, sections built, breakpoints tuned, interactions wired.",
  },
  {
    title: "Day 9 to 11: CMS and integrations",
    body: "Blog or case studies modeled, content migrated, forms connected, analytics installed.",
  },
  {
    title: "Day 12 to 14: QA and launch",
    body: "Cross-browser QA, Lighthouse pass, redirects mapped, domain pointed, you go live.",
  },
] as const;

const PRICING = [
  {
    label: "Single landing page",
    price: "1 week",
    body: "One-page Figma to Framer conversion. Forms, analytics, custom domain, two revision rounds.",
  },
  {
    label: "Multi-page site",
    price: "2 weeks",
    body: "Five to ten pages with CMS, blog, case studies. Includes copy review and SEO setup.",
  },
  {
    label: "Migration from Webflow or WordPress",
    price: "2–3 weeks",
    body: "Full rebuild on Framer with 301 redirects, content migration, and SEO equity preserved.",
  },
] as const;

const FAQS = [
  {
    q: "How long does Figma to Framer conversion take?",
    a: "Single landing pages ship in one week. Full multi-page sites with CMS ship in two weeks. Migrations from Webflow or WordPress take two to three weeks.",
  },
  {
    q: "Do you handle responsive design?",
    a: "Yes. Every page is built across desktop, tablet, and mobile breakpoints. If your Figma is missing breakpoints, I extend the design to cover them at no extra cost.",
  },
  {
    q: "Can I edit the site after you hand off?",
    a: "Yes. Framer is built for designer and marketer editing. I record a 15-minute walkthrough showing how to update copy, swap images, add blog posts, and tweak components.",
  },
  {
    q: "What if my Figma is not Framer-ready?",
    a: "I fix it. Most Figma files need light cleanup before conversion: auto-layout fixes, token consolidation, missing variants. This is included, not extra.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Two async review rounds plus one live walkthrough are included. Additional rounds run at the standard rate, but most projects ship inside the included rounds.",
  },
  {
    q: "Why convert Figma to Framer instead of using a developer?",
    a: "Framer outputs production-grade sites with edge CDN, image optimization, and SEO defaults that take a Next.js developer weeks to replicate. For marketing sites, the speed and cost difference is real.",
  },
  {
    q: "Do you include UX copy?",
    a: "Yes when requested. I write headlines, subheads, CTAs, and FAQs tuned to your buyer. Add it to scope on the kickoff call.",
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
  name: "Figma to Framer Conversion",
  provider: { "@type": "Person", name: "Rashid Iqbal", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Figma to Framer conversion with two-week delivery",
  url: PAGE_URL,
  description:
    "Pixel-perfect Figma to Framer conversion in two weeks. CMS, forms, analytics, and SEO included.",
};

export default function FigmaToFramerPage() {
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
          Certified Framer Expert · Top Rated on Upwork · Two-week delivery
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          Figma to Framer in Two Weeks
        </h1>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
          Send me your Figma file. I convert it into a pixel-perfect, responsive Framer site
          with CMS, forms, and analytics wired in. Two-week delivery, fixed price, no agency
          overhead.
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
            Figma to Framer conversion turns a Figma design file into a live, responsive
            Framer site with CMS, forms, and analytics wired in. Rashid Iqbal, a Certified
            Framer Expert, ships single landing pages in one week and multi-page sites in
            two weeks. Migrations from Webflow or WordPress take two to three weeks with
            full 301 redirects and SEO equity preserved. Pricing is fixed per scope and
            quoted on the kickoff call.
          </p>
        </aside>

        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a scoping call
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

        <div className="border border-zinc-200 bg-white p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            What is included
          </h2>
          <ul className="space-y-3">
            {INCLUDED.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-zinc-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            Two-week timeline
          </h2>
          <ol className="space-y-4">
            {PROCESS.map((s) => (
              <li key={s.title} className="border-l-2 border-orange-500 pl-4">
                <p className="text-sm font-bold text-zinc-900">{s.title}</p>
                <p className="text-sm text-zinc-600 mt-1">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">Pricing</h2>
          <div className="space-y-4">
            {PRICING.map((p) => (
              <div
                key={p.label}
                className="border border-zinc-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-900">{p.label}</p>
                  <p className="text-sm text-zinc-600 mt-1">{p.body}</p>
                </div>
                <p className="text-base font-bold text-orange-700 shrink-0">{p.price}</p>
              </div>
            ))}
          </div>
        </div>

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
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">
            Send me your Figma file
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            One call to scope. Quote within 24 hours. Kickoff the same week.
          </p>
          <a
            href={SOCIAL_LINKS.calcom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25"
          >
            Book a scoping call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
