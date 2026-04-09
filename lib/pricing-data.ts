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

export const ONE_TIME_PLANS: PricingPlan[] = [
  {
    name: "Landing Page",
    tagline: "Figma + Framer",
    price: "$1,000",
    priceSuffix: " – $1,600",
    desc: "A high-converting landing page designed in Figma with UX copy, built pixel-perfect in Framer. 3-4 pages, responsive, SEO-ready.",
    idealFor: "Marketing & Lead Gen",
    baseFeatures: ["Figma Design + UX Copy", "Framer Development (3-4 pages)", "Responsive + Mobile-First", "SEO + Analytics Setup"],
    deliveryTime: "2 weeks",
    highlight: null,
  },
  {
    name: "Multi-Page Website",
    tagline: "Figma + Framer + CMS",
    price: "$2,000",
    priceSuffix: " – $5,000",
    desc: "Full website with 5-8+ pages, CMS, blog, and dynamic content. Designed in Figma with conversion-focused UX copy, built in Framer.",
    idealFor: "Business & Startups",
    baseFeatures: ["Figma Design System + UX Copy", "Framer CMS + Dynamic Pages", "Blog + Content Management", "Performance + CRO Optimized"],
    deliveryTime: "3-4 weeks",
    popular: true,
    highlight: "Best Value",
  },
  {
    name: "Chrome Extension",
    tagline: "React + Manifest V3",
    price: "Custom",
    priceSuffix: "",
    desc: "A standalone Chrome extension built from scratch. Productivity tools, SaaS companions, workflow automations. Designed, developed, and shipped.",
    idealFor: "SaaS & Productivity",
    baseFeatures: ["Chrome Extension Development", "React UI + Manifest V3", "API Integrations", "Chrome Web Store Launch"],
    deliveryTime: "2-4 weeks",
    highlight: "New",
  },
];

export const RETAINER_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "Design + Dev Support",
    price: "$2,000",
    priceSuffix: "/mo",
    desc: "Ongoing Figma design and Framer updates for your marketing site. Perfect for teams shipping new pages and campaigns regularly.",
    idealFor: "Growing Teams",
    baseFeatures: ["Figma Design Requests", "Framer Updates & New Pages", "UX Copy for Campaigns", "48hr Turnaround"],
    deliveryTime: "Ongoing",
    highlight: null,
  },
  {
    name: "Growth",
    tagline: "Full Design + Dev + CRO",
    price: "$2,500",
    priceSuffix: "/mo",
    desc: "Everything in Starter plus conversion optimization, A/B test design, and priority support. For teams serious about growth.",
    idealFor: "Scaling Startups",
    baseFeatures: ["Everything in Starter", "CRO + A/B Test Design", "Monthly Conversion Audit", "Priority Slack Support"],
    deliveryTime: "Ongoing",
    popular: true,
    highlight: "Most Popular",
  },
  {
    name: "Scale",
    tagline: "Embedded Designer + Dev",
    price: "$3,000",
    priceSuffix: "/mo",
    desc: "I work as your embedded design and dev resource. Unlimited requests, same-day responses, full design system ownership.",
    idealFor: "Funded Startups",
    baseFeatures: ["Unlimited Design + Dev Requests", "Same-Day Responses", "Design System Management", "Dedicated Slack Channel"],
    deliveryTime: "Ongoing",
    highlight: "White Glove",
  },
];
