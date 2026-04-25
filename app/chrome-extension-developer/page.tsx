import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

const PAGE_PATH = "/chrome-extension-developer";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Chrome Extension Developer for SaaS | Rashid Iqbal",
  description:
    "Hire a freelance Chrome extension developer. Manifest V3, React, TypeScript. Built extensions for Figma, Framer, and SaaS workflows. Two to four week delivery.",
  keywords: [
    "chrome extension developer for saas",
    "custom chrome extension manifest v3 developer",
    "chrome extension freelancer",
    "figma chrome extension",
    "framer chrome extension",
    "browser extension developer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Chrome Extension Developer for SaaS | Rashid Iqbal",
    description:
      "Manifest V3, React, TypeScript. Built and shipped extensions used by SaaS teams.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
          "Chrome Extension Developer for SaaS"
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chrome Extension Developer for SaaS",
    description: "Manifest V3, React, TypeScript. Two to four week delivery.",
  },
};

const CAPABILITIES = [
  "Manifest V3 architecture with service worker background scripts",
  "Content scripts that read and modify the active tab safely",
  "OAuth flows for Google, Notion, Linear, Slack, and custom IdPs",
  "React + TypeScript popup UI with Tailwind styling",
  "Chrome Web Store listing, screenshots, and review submission",
  "Privacy policy, permissions audit, and review-friendly architecture",
] as const;

const USE_CASES = [
  {
    title: "Productivity tools for SaaS teams",
    body: "Quick-capture extensions that send selections to your app. One-click context, zero copy-paste.",
  },
  {
    title: "Sales and outbound enrichment",
    body: "LinkedIn, GitHub, or directory scrapers that push enriched contacts into your CRM through a webhook.",
  },
  {
    title: "Internal QA and admin tools",
    body: "Hidden admin panels gated by domain, exposing feature flags or internal actions on staging environments.",
  },
  {
    title: "Design and engineering helpers",
    body: "Color pickers, asset extractors, accessibility audits, or Figma-to-code shortcuts.",
  },
] as const;

const PROCESS = [
  {
    title: "Week 1: Spec",
    body: "Permissions audit, flow diagrams, mock UI, Manifest V3 architecture decisions documented.",
  },
  {
    title: "Week 2: Build",
    body: "Popup, content scripts, background service worker. CI set up. First test build sideloadable.",
  },
  {
    title: "Week 3: Polish + submit",
    body: "Icons, screenshots, listing copy. Web Store submission. Privacy policy hosted.",
  },
  {
    title: "Optional Week 4: Iterate",
    body: "Review feedback addressed, edge cases fixed, analytics wired through PostHog or similar.",
  },
] as const;

const FAQS = [
  {
    q: "Do you build with Manifest V3?",
    a: "Yes. Every extension I ship in 2025 and 2026 is Manifest V3 native. Manifest V2 is deprecated and Chrome stops accepting V2 submissions for most cases.",
  },
  {
    q: "Can you publish the extension to the Chrome Web Store for me?",
    a: "Yes. I prepare the listing, write the description, generate screenshots, and submit on your developer account. Review usually takes one to three days.",
  },
  {
    q: "How much does a Chrome extension cost?",
    a: "Simple extensions with a popup and one content script start at $1,500. SaaS-integrated extensions with auth and webhooks run $3,000 to $6,000. Enterprise builds are quoted after spec.",
  },
  {
    q: "Do you support Firefox and Edge too?",
    a: "Yes. Modern Manifest V3 builds with cross-browser polyfills run on Edge directly and Firefox with minimal adjustments. I build cross-browser when requested.",
  },
  {
    q: "Can the extension talk to my SaaS backend?",
    a: "Yes. OAuth flows, JWT auth, signed webhooks, and direct API calls are all standard. I work with your engineering team to keep the auth boundary clean.",
  },
  {
    q: "What stack do you use?",
    a: "React, TypeScript, Vite for bundling, Tailwind for styling, and Plasmo or a custom build pipeline depending on scope. PostHog for analytics. Sentry for error tracking.",
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
  name: "Chrome Extension Developer",
  provider: { "@type": "Person", name: "Rashid Iqbal", url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Chrome extension development with Manifest V3",
  url: PAGE_URL,
  description:
    "Freelance Chrome extension developer building Manifest V3 extensions in React and TypeScript for SaaS teams.",
};

export default function ChromeExtensionDeveloperPage() {
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
          Manifest V3 · React · TypeScript
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1]">
          Chrome Extension Developer for SaaS
        </h1>

        <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8">
          I build Chrome extensions for SaaS teams. Manifest V3, React, TypeScript. From spec
          to Web Store submission in two to four weeks. One developer, one timeline, one
          shipped extension.
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
            Rashid Iqbal is a freelance Chrome extension developer building Manifest V3
            extensions in React and TypeScript. Typical projects ship from spec to Web
            Store submission in two to four weeks. Pricing starts at $1,500 for a popup
            extension with one content script and ranges $3,000 to $6,000 for SaaS-
            integrated extensions with OAuth and webhooks. Cross-browser builds for Edge
            and Firefox available on request.
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
            href={SOCIAL_LINKS.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-300 text-zinc-900 text-sm font-bold hover:bg-zinc-50 transition-colors"
          >
            Hire on Upwork
          </a>
        </div>

        <div className="border border-zinc-200 bg-white p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">What I build</h2>
          <ul className="space-y-3">
            {CAPABILITIES.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-zinc-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">Use cases</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {USE_CASES.map((u) => (
              <div key={u.title} className="border border-zinc-200 bg-white p-5">
                <p className="text-sm font-bold text-zinc-900 mb-1.5">{u.title}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-5">
            How a project runs
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
            Have a Chrome extension idea?
          </h2>
          <p className="text-sm text-zinc-600 mb-5">
            Send me the rough spec. I will scope it on a 30-minute call.
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
