import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { ComparisonPage, type ComparisonConfig } from "@/components/landing/comparison-page";

const PAGE_PATH = "/framer-vs-webflow-for-saas";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Framer vs Webflow for SaaS Landing Pages (2026)",
  description:
    "Framer or Webflow for a B2B SaaS marketing site? Direct answer: Framer ships faster and converts higher; Webflow has a deeper CMS. Full comparison + when to pick which.",
  keywords: ["framer vs webflow", "framer vs webflow saas", "best builder for saas landing page"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Framer vs Webflow for SaaS Landing Pages (2026)",
    description:
      "Framer ships faster and converts higher; Webflow has a deeper CMS. When to pick which, with a side-by-side comparison and FAQs.",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Framer vs Webflow for SaaS")}`,
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
  h1: "Framer vs Webflow for SaaS landing pages",
  directAnswer:
    "For a B2B SaaS marketing site under 20 pages, pick Framer. It ships faster, has better Core Web Vitals out of the box, and the AI layout tools cut design time in half. Pick Webflow when you need a deep CMS, e-commerce, or have an existing Webflow team.",
  intro:
    "Both platforms output production websites without a separate developer. The differences matter most at the edges — speed of iteration, performance defaults, and the size of your CMS. Below is the side-by-side I run for SaaS founders deciding between them.",
  leftLabel: "Framer",
  rightLabel: "Webflow",
  rows: [
    { feature: "Time to first published page", left: "Hours", right: "1–2 days" },
    { feature: "Visual canvas similar to Figma", left: "yes", right: "partial" },
    { feature: "AI layout / Workshop generation", left: "yes", right: "no" },
    { feature: "Lighthouse mobile (default)", left: "90+", right: "70–85" },
    { feature: "CMS depth (collections, references)", left: "partial", right: "yes" },
    { feature: "E-commerce native", left: "no", right: "yes" },
    { feature: "Multi-locale / i18n", left: "yes", right: "yes" },
    { feature: "Custom code components", left: "yes", right: "yes" },
    { feature: "Free tier with custom domain", left: "no (Basic $10)", right: "no (Basic $14)" },
    { feature: "Editor-team experience for non-designers", left: "yes", right: "yes" },
    { feature: "Headless CMS via API", left: "no", right: "yes" },
    { feature: "Audit logs / SSO (Enterprise)", left: "yes", right: "yes" },
  ],
  whoShould: [
    {
      name: "Pick Framer if",
      bullets: [
        "Marketing site is under 20 pages",
        "You want to ship in 2 weeks, not 6",
        "Designer is the primary owner of the site",
        "Mobile speed matters more than CMS depth",
      ],
    },
    {
      name: "Pick Webflow if",
      bullets: [
        "Site has 200+ CMS entries (case studies, courses, articles)",
        "E-commerce or Webflow Logic flows are required",
        "You already have a Webflow developer in-house",
        "You need direct CMS API access for headless reuse",
      ],
    },
  ],
  faqs: [
    {
      q: "Is Framer faster than Webflow in 2026?",
      a: "On default Lighthouse mobile scores, yes — Framer averages 90+ where Webflow averages 70–85 without optimization. Both can hit 90+ with manual tuning, but Framer's runtime ships less JavaScript by default.",
    },
    {
      q: "Can I migrate from Webflow to Framer?",
      a: "Yes. I migrate Webflow sites to Framer in 2–3 weeks including 301 redirects, content migration, and SEO equity preservation. The CMS structure usually maps cleanly; e-commerce parts have to be rebuilt or moved to Shopify.",
    },
    {
      q: "Which has the better blog?",
      a: "Both are fine for blogs under 200 posts. Above that, Webflow's CMS is sturdier — pagination, references, and Webflow's API for headless reuse all work well. Framer's CMS is simpler but starts to feel slow above 500 posts.",
    },
    {
      q: "Does Framer have a CMS?",
      a: "Yes. Collections, dynamic routes, in-place editing, and Auto Translate. Less depth than Webflow's CMS but enough for blogs, case studies, careers, and team pages.",
    },
  ],
};

export default function FramerVsWebflowPage() {
  return <ComparisonPage config={config} />;
}
