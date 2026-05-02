import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { IndustryHirePage, type IndustryConfig } from "@/components/landing/industry-hire-page";

const PAGE_PATH = "/framer-expert-for-yc-startups";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Framer Expert for Y Combinator Startups | Rashid Iqbal",
  description:
    "Hire a Certified Framer Expert for YC startups. Demo-day-ready landing pages in 2 weeks. Clients: UpdateAI, Vanos AI, SpaceDome, ATQLeads, Crezco.",
  keywords: [
    "framer expert for yc startups",
    "y combinator landing page",
    "framer for yc batch",
    "demo day landing page designer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Framer Expert for Y Combinator Startups | Rashid Iqbal",
    description: "Demo-day-ready in 2 weeks.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
          "Framer Expert for YC Startups"
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const config: IndustryConfig = {
  industryLabel: "YC startups",
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow: "Certified Framer Expert · Top Rated on Upwork",
  h1: "Framer Expert for Y Combinator startups",
  intro:
    "Demo day is in two weeks and your landing page is still last batch's. I ship YC-grade marketing sites in 14 days — copy, design, build, launch. Past YC clients include UpdateAI, Vanos AI, SpaceDome, ATQLeads, and Crezco.",
  clients: ["UpdateAI", "Vanos AI", "SpaceDome", "ATQLeads", "Crezco", "Karumi", "Keel"],
  deliverables: [
    "Demo-day-ready landing page: hero, features, pricing, social proof, CTA — all crisp",
    "Investor-friendly first scroll: traction, named users, $ARR or growth slope visible above the fold",
    "Lead capture wired to your CRM (Hubspot, Attio, Pipedrive, Notion CRM)",
    "Founders' page so investors can see who they're betting on",
    "Performance: Lighthouse 90+ on mobile, sub-1s LCP",
    "Two-week delivery from kickoff to launch — fits the demo-day cycle",
  ],
  processSteps: [
    { title: "Day 1 to 2: Strategy", body: "30-min kickoff. Pitch, ICP, traction story locked. Quote returned same day." },
    { title: "Day 3 to 7: Design + copy", body: "Figma design with copy that sounds like the founder, not a content writer." },
    { title: "Day 8 to 12: Build", body: "Framer build with CMS, blog, lead capture, founders page. Live URL inside 48 hours." },
    { title: "Day 13 to 14: Launch", body: "Domain, redirects, analytics, sitemap. You ship before demo day." },
  ],
  testimonial: {
    text: "The new design loads fast and converts way better than what we had before. Onboarding signups went up by half.",
    author: "Josh Schachter",
    title: "Founder & CEO, UpdateAI",
  },
  faqs: [
    {
      q: "Can you actually ship in 2 weeks during demo-day prep?",
      a: "Yes. Every YC client I've worked with has shipped on or before demo day. Two weeks is the default; one week is doable for a single-page launch site. The constraint is usually founder availability, not mine.",
    },
    {
      q: "Do you handle the deck, the pitch, the data room?",
      a: "Just the landing page. Decks, pitch coaching, and data rooms are out of scope — I'll point you to specialists I trust if you need referrals.",
    },
    {
      q: "Is there a YC discount?",
      a: "I treat YC startups the same way I treat all clients — scoped pricing, fixed rate, full ownership. The 'discount' is the speed: agencies quote 8 weeks for the same scope at 4× the cost.",
    },
  ],
};

export default function YcHirePage() {
  return <IndustryHirePage config={config} />;
}
