import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { IndustryHirePage, type IndustryConfig } from "@/components/landing/industry-hire-page";

const PAGE_PATH = "/framer-expert-for-fintech";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Framer Expert for Fintech | Rashid Iqbal",
  description:
    "Hire a Certified Framer Expert for fintech landing pages. Trust-first design, regulator-friendly copy, two-week delivery.",
  keywords: [
    "framer expert for fintech",
    "fintech landing page designer",
    "framer expert for banking startups",
    "fintech website framer",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Framer Expert for Fintech | Rashid Iqbal",
    description: "Trust-first design, two-week delivery, ships fast.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Framer Expert for Fintech")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const config: IndustryConfig = {
  industryLabel: "Fintech",
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow: "Certified Framer Expert · Top Rated on Upwork",
  h1: "Framer Expert for Fintech",
  intro:
    "I build fintech marketing sites that lead with trust, list jurisdictions and compliance up front, and convert without sounding like every other neobank. Two-week delivery, copy + design + build under one roof.",
  clients: [],
  deliverables: [
    "Trust-first hero, jurisdictions, licensing, audited counterparties surfaced above the fold",
    "Plain-English copy that swaps fintech jargon for what the buyer actually needs",
    "Compliance-friendly design system: clear disclosures, footer disclaimers, accessible color contrast",
    "Framer build with CMS for press, careers, regulatory updates",
    "Lighthouse 90 plus on mobile, SEO meta wired",
    "Two-week delivery from kickoff to launch",
  ],
  processSteps: [
    { title: "Day 1 to 2: Strategy", body: "Audit your current site. Identify the buyer (CFO? finance ops? consumer?). Lock the trust narrative." },
    { title: "Day 3 to 7: Design + copy", body: "Figma design with regulator-friendly copy. One async review round, one live walkthrough." },
    { title: "Day 8 to 12: Build", body: "Framer build with CMS, forms, analytics, Cal.com. Disclosures formatted to your legal team's spec." },
    { title: "Day 13 to 14: Launch", body: "Domain, redirects, analytics, sitemap. You go live." },
  ],
  testimonial: {
    text: "Trust-first design takes the buyer's regulatory anxiety off the table before the feature pitch starts. The site leads with jurisdictions, audited counterparties, and disclosure transparency, then the conversion path opens up underneath it.",
    author: "Trust-first marketing for regulated buyers",
    title: "Fintech case study",
  },
  faqs: [
    {
      q: "Do you understand fintech compliance?",
      a: "I work alongside your legal/compliance team. I write the marketing copy; they sign off on the regulated language (disclosures, jurisdictions, licensing). I structure the site so legal text gets the prominence it needs without killing the conversion flow.",
    },
    {
      q: "Can you handle multiple regulated jurisdictions?",
      a: "Yes. I've shipped sites with separate footer disclaimers per region, geo-redirected disclosure pages, and per-country sales contact routing. Framer's CMS handles the multi-locale content cleanly.",
    },
    {
      q: "What about brand audits or rebrands?",
      a: "I can refresh the brand inside the project (logo cleanup, type system, color palette tuning) but full rebrands are usually a separate engagement with a brand specialist. Tell me what you have on the call and I'll be honest about scope.",
    },
  ],
};

export default function FintechHirePage() {
  return <IndustryHirePage config={config} />;
}
