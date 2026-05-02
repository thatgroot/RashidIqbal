import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { IndustryHirePage, type IndustryConfig } from "@/components/landing/industry-hire-page";

const PAGE_PATH = "/framer-expert-for-ai-startups";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Framer Expert for AI Startups | Rashid Iqbal",
  description:
    "Hire a Framer expert who designs and writes for AI/ML buyers. Two-week delivery. Clients: UpdateAI, Vanos AI, Karumi, Circleback, Pageloop.",
  keywords: [
    "framer expert for ai startups",
    "ai startup landing page designer",
    "framer for ml saas",
    "ai company website framer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Framer Expert for AI Startups | Rashid Iqbal",
    description: "Designed for the AI buyer. Two-week delivery.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Framer Expert for AI Startups")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const config: IndustryConfig = {
  industryLabel: "AI startups",
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow: "Certified Framer Expert · Top Rated on Upwork",
  h1: "Framer Expert for AI Startups",
  intro:
    "I build sites for AI/ML companies that read as serious to engineers and credible to budget holders. Pricing copy that handles tokens, eval results that actually look trustworthy, and demos that load in <1s. Two-week delivery, copy + design + build.",
  clients: ["UpdateAI", "Vanos AI", "Karumi", "Circleback", "Pageloop", "Ask Dialog"],
  deliverables: [
    "Hero positioning: model, capability, eval signal — not 'AI-powered' platitudes",
    "Pricing copy that handles per-token, seat-based, and usage-based without confusing buyers",
    "Live demo embed (or interactive component) on the landing page",
    "Engineer-credible technical copy: vector dim, latency, model lineage when it matters",
    "Investor-ready trust: founders, advisors, deployment scale",
    "Two-week delivery from kickoff to launch",
  ],
  processSteps: [
    { title: "Day 1 to 2: Buyer + ICP", body: "Engineer? CTO? Eng leader? VP product? Each one needs a different first line. We pick one and lead with it." },
    { title: "Day 3 to 7: Design + copy", body: "Figma layout. Eval results visualized. Pricing copy benchmarked against your closest competitor's page." },
    { title: "Day 8 to 12: Build", body: "Framer build with demo embed, CMS for case studies, lead capture wired to your CRM." },
    { title: "Day 13 to 14: Launch", body: "Domain, redirects, analytics, GA + PostHog wired. Lighthouse 90+ on mobile." },
  ],
  testimonial: {
    text: "Vanos AI builds autonomous orchestration tooling for AI engineers. We rebuilt the site for the engineer who already knows the space — clear comparison, eval results, docs equal weight to demo. Weekly active developers in docs doubled in 30 days.",
    author: "Vanos AI",
    title: "Case study",
  },
  faqs: [
    {
      q: "Do you understand the AI buyer?",
      a: "I've built for autonomous orchestration tooling (Vanos AI), workflow AI for customer-success teams (UpdateAI), AI meeting intelligence (Circleback), and code-AI / dev tooling (Karumi, Pageloop). The buyer voice is different in each segment. We pick one on the kickoff call and tune copy specifically.",
    },
    {
      q: "Can you handle live demos and interactive components?",
      a: "Yes — Framer supports custom code components, so I can embed a working playground, a token-cost calculator, a model-comparison widget, etc. If your demo is too heavy for Framer's runtime, I host it separately and iframe it in.",
    },
    {
      q: "What about pricing pages with token math?",
      a: "I've shipped pricing pages with per-token sliders, plan toggles, and live cost estimators. Most buyers want to feel the cost, not just see numbers. We design for that.",
    },
  ],
};

export default function AiStartupHirePage() {
  return <IndustryHirePage config={config} />;
}
