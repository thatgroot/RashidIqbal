export interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  desc: string;
  idealFor: string;
  baseFeatures: string[];
  deliveryTime: string;
  popular?: boolean;
  highlight: string | null;
}

// One-time tiers — buyer-stage names instead of generic deliverable
// labels. "Audit + Rewrite" tells a Series A founder this is the
// scope they want; "Marketing Site" tells a growth lead this is the
// 4-page bundle. Each tier names the founder/team stage that should
// pick it.
export const ONE_TIME_PLANS: PricingPlan[] = [
  {
    name: "Audit + Rewrite",
    tagline: "1-page landing, 5 days, $1,200",
    price: "From $1,200",
    priceSuffix: "",
    desc: "Audit your current page, rewrite the copy, rebuild it in Framer. You get the Figma file, the Framer project, and a 15-min Loom walkthrough. Refund if the design direction is wrong.",
    idealFor: "Pre-PMF / seed-stage SaaS",
    baseFeatures: [
      "Copy audit + full rewrite",
      "Figma design (mobile + desktop)",
      "Framer build with custom domain",
      "Lighthouse 90+ on mobile, SEO meta wired",
      "2 revision rounds",
    ],
    deliveryTime: "5 days",
    highlight: null,
  },
  {
    name: "Marketing Site",
    tagline: "4–8 pages with CMS, $3,500, 3 weeks",
    price: "From $3,500",
    priceSuffix: "",
    desc: "4–8 page marketing site with blog/case-study CMS, lead capture, and analytics wired. You own Figma + Framer + your data. Agency lead times: 6+ weeks. Ours: 21 days.",
    idealFor: "Series A+ B2B SaaS",
    baseFeatures: [
      "4–8 pages, fully responsive",
      "CMS for blog + case studies",
      "Lead capture wired to your CRM or Slack",
      "GA4, PostHog, Microsoft Clarity installed",
      "Performance + CRO instrumented",
    ],
    deliveryTime: "3 weeks",
    popular: true,
    highlight: "Best value",
  },
  {
    name: "Custom Tool",
    tagline: "Chrome extension, $2,500, 3 weeks",
    price: "From $2,500",
    priceSuffix: "",
    desc: "Standalone Chrome extension in React + TypeScript + Manifest V3. SaaS companion, productivity tool, internal admin panel. Shipped to the Chrome Web Store; client owns the GitHub.",
    idealFor: "SaaS + productivity teams",
    baseFeatures: [
      "UX flow + Figma design",
      "React + Manifest V3 build",
      "API / OAuth integration",
      "Chrome Web Store submission",
      "20+ active users typical for v1",
    ],
    deliveryTime: "3–4 weeks",
    highlight: null,
  },
];

// Retainer tiers — buyer-stage names. "Marketing Ops" / "Growth
// Partner" / "Embedded Designer" each name the role being filled,
// not a vague tier label.
export const RETAINER_PLANS: PricingPlan[] = [
  {
    name: "Marketing Ops",
    tagline: "Pages + campaigns, 48-hour turnaround",
    price: "$2,000",
    priceSuffix: "/mo",
    desc: "Ongoing Figma + Framer for new pages, hero refreshes, and campaign landings. No waitlist. 48-hour turnaround on every brief.",
    idealFor: "Scaling startups shipping weekly",
    baseFeatures: [
      "Unlimited Figma + Framer requests",
      "UX copy for new campaigns",
      "48-hour first-pass turnaround",
      "Monthly site audit",
    ],
    deliveryTime: "Ongoing",
    highlight: null,
  },
  {
    name: "Growth Partner",
    tagline: "Everything in Ops + monthly CRO",
    price: "$2,500",
    priceSuffix: "/mo",
    desc: "Everything in Marketing Ops plus conversion-rate optimization. Monthly A/B tests, full conversion audits, priority Slack support.",
    idealFor: "Series B+, serious about CAC payback",
    baseFeatures: [
      "Everything in Marketing Ops",
      "CRO + A/B test design",
      "Monthly conversion audit + report",
      "Priority Slack support",
    ],
    deliveryTime: "Ongoing",
    popular: true,
    highlight: "Most popular",
  },
  {
    name: "Embedded Designer",
    tagline: "Same-day responses, design-system ownership",
    price: "$3,000",
    priceSuffix: "/mo",
    desc: "I show up in your Slack like an in-house designer. Unlimited requests, same-day responses, full ownership of the design system.",
    idealFor: "Funded startups, in-house team capacity",
    baseFeatures: [
      "Unlimited design + dev requests",
      "Same-day Slack responses",
      "Design system ownership",
      "Dedicated Slack channel",
    ],
    deliveryTime: "Ongoing",
    highlight: "White-glove",
  },
];
