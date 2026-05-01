import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { ComparisonPage, type ComparisonConfig } from "@/components/landing/comparison-page";

const PAGE_PATH = "/figma-to-framer-cost-2026";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Figma to Framer Cost in 2026 — What You'll Actually Pay",
  description:
    "How much does Figma to Framer conversion cost in 2026? Direct answer: $1k–$3k for a single page in 1 week, $1.5k–$5k for a 4-page site in 2 weeks. Full breakdown.",
  keywords: ["figma to framer cost", "framer pricing 2026", "figma to framer conversion price"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Figma to Framer Cost in 2026",
    description:
      "Figma to Framer pricing in 2026: $1k–$3k for a single page in 1 week, $1.5k–$5k for a 4-page site in 2 weeks. Tier-by-tier breakdown.",
    url: PAGE_URL,
    type: "article",
  },
};

const config: ComparisonConfig = {
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow: "Pricing · 2026",
  h1: "Figma to Framer cost in 2026 — what you'll actually pay",
  directAnswer:
    "Pixel-perfect Figma to Framer conversion costs $1,000–$3,000 for a single landing page in 1 week, $1,500–$5,000 for a 4-page site in 2 weeks, and $3,000–$8,000 for a Webflow / WordPress migration with redirects in 2–3 weeks. Solo specialists cost ~75% less than agencies for the same scope.",
  intro:
    "Pricing varies based on page count, CMS depth, and whether the design is fully production-ready or needs cleanup. The biggest cost driver is not the build itself — it's how production-ready the Figma file is when handed off. Below is the going rate at each tier in 2026 plus the cheaper / more expensive alternatives.",
  leftLabel: "Solo specialist",
  rightLabel: "Agency",
  rows: [
    { feature: "Single landing page", left: "$1k–$3k", right: "$5k–$15k" },
    { feature: "Multi-page site (4–10 pages)", left: "$1.5k–$5k", right: "$15k–$40k" },
    { feature: "Migration (Webflow / WordPress)", left: "$3k–$8k", right: "$25k–$60k" },
    { feature: "Includes UX copy", left: "yes", right: "partial" },
    { feature: "Includes Figma cleanup", left: "yes", right: "partial" },
    { feature: "Lighthouse 90+ mobile target", left: "yes", right: "yes" },
    { feature: "Timeline", left: "1–3 weeks", right: "4–10 weeks" },
    { feature: "Refund / risk reversal", left: "yes", right: "rare" },
  ],
  whoShould: [
    {
      name: "Solo specialist range fits when",
      bullets: [
        "Marketing site under 20 pages",
        "Figma file is mostly production-ready (auto-layout, components)",
        "Single decision-maker on the buy side",
        "Want one person responsible end-to-end",
      ],
    },
    {
      name: "Agency range makes sense when",
      bullets: [
        "Site is 30+ pages with complex CMS schemas",
        "Need full brand identity + Figma + Framer in one engagement",
        "Multiple stakeholders + formal change-control process",
        "Budget is $20k+ and timeline is flexible",
      ],
    },
  ],
  faqs: [
    {
      q: "Why the wide price range for a single landing page?",
      a: "Three drivers. First, scope: 1 hero or 6 sections? Second, Figma readiness — if I have to fix auto-layout, normalize tokens, and add missing breakpoints, that adds days. Third, copy: if you're handing me final copy, the build is faster; if I'm writing the copy too, that's part of the price.",
    },
    {
      q: "Is the price fixed or hourly?",
      a: "Fixed for the scope agreed on the kickoff call. I quote a number, you accept, I deliver. Scope creep gets a separate quote, not a surprise invoice. Hourly billing on creative work usually punishes the client (slower delivery = bigger invoice), which is why I avoid it.",
    },
    {
      q: "What about ongoing costs after launch?",
      a: "Framer hosting is $10/month for Basic (single domain) or $30/month for Pro (CMS unlimited). No additional dev cost unless you want a retainer for ongoing edits. Most clients self-serve content updates after a 15-min handoff Loom.",
    },
    {
      q: "Can I get a faster quote?",
      a: "Send your Figma file + a one-line scope description and I will reply with a fixed quote within 24 hours. No discovery call required for projects under $5k.",
    },
  ],
};

export default function FigmaToFramerCostPage() {
  return <ComparisonPage config={config} />;
}
