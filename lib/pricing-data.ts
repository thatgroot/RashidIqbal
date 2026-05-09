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

// Real, visible prices. cap.so audit fix #3/#4 — pricing is not
// hidden; it's anchored, weighted, and visible. Prices are starting
// numbers; final scope is shaped on the kickoff call.
export const ONE_TIME_PLANS: PricingPlan[] = [
  {
    name: "Landing Page",
    tagline: "1-page · Figma + Framer · 5 days",
    price: "$2,000",
    priceSuffix: "",
    desc: "Single landing page designed in Figma and built in Framer. Copy rewrite, mobile + desktop, custom domain, 15-min Loom walkthrough. Refund if the design direction is wrong.",
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
    tagline: "Up to 5 pages · CMS + analytics · 3 weeks",
    price: "$5,000",
    priceSuffix: "",
    desc: "Up to 5 page marketing site with blog/case-study CMS, lead capture, and analytics wired. You own Figma + Framer + your data. Agency lead times: 6+ weeks. Ours: 21 days.",
    idealFor: "Series A+ B2B SaaS",
    baseFeatures: [
      "Up to 5 pages, fully responsive",
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
    name: "Branded Website",
    tagline: "Logo + brand + up to 10 pages · 6 weeks",
    price: "$11,000",
    priceSuffix: "",
    desc: "Full brand identity plus a 10-page Framer site. Logo, type, colour, brand guidelines, then the design and build. You walk away with the system, the source files, and the live site.",
    idealFor: "Funded teams launching or rebranding",
    baseFeatures: [
      "Logo + full brand identity",
      "Brand guidelines (PDF + Figma)",
      "Up to 10 pages, fully responsive",
      "CMS, lead capture, analytics wired",
      "Source files: Figma + Framer + brand kit",
    ],
    deliveryTime: "6 weeks",
    highlight: null,
  },
];

export const RETAINER_PLANS: PricingPlan[] = [
  {
    name: "Marketing Ops",
    tagline: "Pages + campaigns · 48-hour turnaround",
    price: "$4,000",
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
    tagline: "Complex sites + monthly CRO",
    price: "$6,000",
    priceSuffix: "/mo",
    desc: "Marketing Ops plus complex-site work and conversion-rate optimization. Monthly A/B tests, full conversion audits, priority Slack support.",
    idealFor: "Series B+, serious about CAC payback",
    baseFeatures: [
      "Everything in Marketing Ops",
      "Complex site work (multi-page, CMS, integrations)",
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
    tagline: "Same-day responses · design-system ownership",
    price: "$7,500",
    priceSuffix: "/mo",
    desc: "We show up in your Slack like an in-house designer. Unlimited requests, same-day responses, full ownership of the design system.",
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
