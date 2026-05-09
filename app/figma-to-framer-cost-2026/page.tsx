import type { Metadata } from"next";
import { SITE_URL } from"@/lib/constants";
import { ComparisonPage, type ComparisonConfig } from"@/components/landing/comparison-page";

const PAGE_PATH ="/figma-to-framer-cost-2026";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:"Figma to Framer Cost in 2026 · What You'll Actually Pay",
  description:
"How much does Figma to Framer conversion cost in 2026? Direct answer: agency-grade scope shipped in 1 week for a single page, 2 weeks for a 4-page site. Quote returned same day.",
  keywords: ["figma to framer cost","framer pricing 2026","figma to framer conversion price"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:"Figma to Framer Cost in 2026",
    description:
"Figma to Framer pricing in 2026: 1 week for a single page, 2 weeks for a 4-page site. Quote returned same day. Tier-by-tier breakdown.",
    url: PAGE_URL,
    type:"article",
  },
};

const config: ComparisonConfig = {
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow:"Pricing · 2026",
  h1:"Figma to Framer cost in 2026, what you'll actually pay",
  directAnswer:
"Pixel-perfect Figma to Framer conversion takes about 1 week for a single landing page, 2 weeks for a 4-page marketing site, and 2-3 weeks for a Webflow / WordPress migration with redirects. Solo specialists deliver the same scope much faster than agencies. Quote returned same day.",
  intro:
"Pricing varies based on page count, CMS depth, and whether the design is fully production-ready or needs cleanup. The biggest cost driver is not the build itself, it's how production-ready the Figma file is when handed off. Below is the going rate at each tier in 2026 plus the cheaper / more expensive alternatives.",
  leftLabel:"Solo specialist",
  rightLabel:"Agency",
  rows: [
    { feature:"Single landing page", left:"1 week", right:"6+ weeks" },
    { feature:"Multi-page site (4–10 pages)", left:"2 weeks", right:"10+ weeks" },
    { feature:"Migration (Webflow / WordPress)", left:"2–3 weeks", right:"12+ weeks" },
    { feature:"Includes UX copy", left:"yes", right:"partial" },
    { feature:"Includes Figma cleanup", left:"yes", right:"partial" },
    { feature:"Lighthouse 90+ mobile target", left:"yes", right:"yes" },
    { feature:"Timeline", left:"1–3 weeks", right:"4–10 weeks" },
    { feature:"Refund / risk reversal", left:"yes", right:"rare" },
  ],
  whoShould: [
    {
      name:"Solo specialist range fits when",
      bullets: [
"Marketing site under 20 pages",
"Figma file is mostly production-ready (auto-layout, components)",
"Single decision-maker on the buy side",
"Want one person responsible end-to-end",
      ],
    },
    {
      name:"Agency range makes sense when",
      bullets: [
"Site is 30+ pages with complex CMS schemas",
"Need full brand identity + Figma + Framer in one engagement",
"Multiple stakeholders + formal change-control process",
"Timeline is flexible and stakeholder count is high",
      ],
    },
  ],
  faqs: [
    {
      q:"Why the wide price range for a single landing page?",
      a:"Three drivers. First, scope: 1 hero or 6 sections? Second, Figma readiness, if I have to fix auto-layout, normalize tokens, and add missing breakpoints, that adds days. Third, copy: if you're handing me final copy, the build is faster; if I'm writing the copy too, that's part of the price.",
    },
    {
      q:"Is the price fixed or hourly?",
      a:"Fixed for the scope agreed on the kickoff call. I quote a number, you accept, I deliver. Scope creep gets a separate quote, not a surprise invoice. Hourly billing on creative work usually punishes the client (slower delivery = bigger invoice), which is why I avoid it.",
    },
    {
      q:"What about ongoing costs after launch?",
      a:"Framer hosting is paid by the client directly to Framer (Basic for a single domain, Pro for unlimited CMS). No additional dev cost unless you want a retainer for ongoing edits. Most clients self-serve content updates after a 15-min handoff Loom.",
    },
    {
      q:"Can I get a faster quote?",
      a:"Send your Figma file + a one-line scope description and I will reply with a fixed quote within 24 hours. No discovery call required for smaller-scope projects.",
    },
  ],
};

export default function FigmaToFramerCostPage() {
  return <ComparisonPage config={config} />;
}
