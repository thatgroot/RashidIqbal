import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { ComparisonPage, type ComparisonConfig } from "@/components/landing/comparison-page";

const PAGE_PATH = "/hire-framer-expert-vs-agency";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Hire a Framer Expert vs an Agency (2026)",
  description:
    "Should you hire a solo Framer expert or a creative agency? Direct answer: for marketing sites under 20 pages, the solo expert ships 4× faster at 1/4 the cost. Full breakdown.",
  keywords: ["hire framer expert vs agency", "freelance framer vs agency", "design agency alternative"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hire a Framer Expert vs an Agency",
    description: "Solo specialist or full agency? Honest breakdown.",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Framer Expert vs Agency")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const config: ComparisonConfig = {
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow: "Comparison · 2026",
  h1: "Hiring a Framer expert vs hiring an agency",
  directAnswer:
    "For a marketing site under 20 pages, hire a solo Framer expert. You ship in 2 weeks. Agencies quote 6–12 weeks for the same scope, mostly because layered roles (creative director, project manager, account exec, junior designer) all bill against your invoice — the multiplier on cost is roughly 4×.",
  intro:
    "Agencies make sense when scope is large, the brand work is deep, or multiple stakeholders need wrangling. Solo specialists make sense for a fast-moving marketing site where speed and clarity matter more than process.",
  leftLabel: "Solo Framer Expert",
  rightLabel: "Creative Agency",
  rows: [
    { feature: "Typical timeline (single-page site)", left: "1–2 weeks", right: "4–8 weeks" },
    { feature: "Typical timeline (single-page site)", left: "1–2 weeks", right: "6–12 weeks" },
    { feature: "Number of people on the project", left: "1", right: "3–7" },
    { feature: "Daily standups / status calls", left: "no", right: "yes" },
    { feature: "Account-management overhead", left: "no", right: "yes" },
    { feature: "Brand strategy + brand book", left: "partial", right: "yes" },
    { feature: "Custom illustration / motion design", left: "partial", right: "yes" },
    { feature: "Multi-stakeholder approval flows", left: "no", right: "yes" },
    { feature: "Direct access to the maker", left: "yes", right: "no" },
    { feature: "Ownership of files + code", left: "yes", right: "yes" },
    { feature: "Refund / risk reversal", left: "yes", right: "rare" },
  ],
  whoShould: [
    {
      name: "Hire a solo Framer expert if",
      bullets: [
        "You have a marketing site under 20 pages",
        "You need to ship before a launch / demo day",
        "Timeline matters more than committee approval",
        "You want to talk directly to the person doing the work",
      ],
    },
    {
      name: "Hire an agency if",
      bullets: [
        "You need a full brand identity (logo, type, color, guidelines)",
        "Stakeholder count is 5+ on the buy side",
        "Project includes complex motion / 3D / interactive components",
        "Timeline is flexible and stakeholder count is high",
      ],
    },
  ],
  faqs: [
    {
      q: "Why is the solo expert so much cheaper?",
      a: "An agency invoices for a creative director (marking up the work), a project manager (running daily standups), an account exec (writing emails), and a junior designer (doing the actual work). A solo specialist cuts those layers — you're paying for one brain doing all four jobs, which is faster and cheaper.",
    },
    {
      q: "What if I need brand work too?",
      a: "Most solo Framer experts (myself included) refresh brand inside a project — color tuning, typography fixes, layout system. Full identity work (new logo, brand book, guidelines) is usually a separate engagement with a brand specialist. I'll tell you honestly on the call which side of the line you're on.",
    },
    {
      q: "Can a solo person actually handle a SaaS-grade site?",
      a: "Yes for marketing sites. UpdateAI, Vanos AI, SpaceDome, ATQLeads, Karumi, Keel — all funded SaaS companies, all shipped by a solo specialist (me). The constraint isn't capacity; it's scope. If your project needs 50 pages, dozens of stakeholders, and a brand strategist, hire an agency.",
    },
    {
      q: "What about quality?",
      a: "Quality scales with the maker, not the headcount. The right solo specialist with 7+ years of experience usually ships better marketing-page work than a junior at an agency. Look at portfolios, named clients, and conversion data — not how many people are on the team.",
    },
  ],
};

export default function HireExpertVsAgencyPage() {
  return <ComparisonPage config={config} />;
}
