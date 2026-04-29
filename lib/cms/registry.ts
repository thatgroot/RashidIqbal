import { schema } from "@/db/client";

// Single source of truth for which CMS collections exist + which Drizzle
// table backs each one. Admin pages and API routes consult this map so
// adding a new collection means: add the table to db/schema.ts, register
// it here, scaffold a list page; that's it.

export type CollectionKey =
  | "testimonials"
  | "faqs"
  | "case-studies"
  | "blog"
  | "industries"
  | "research"
  | "subscribers"
  | "newsletter";

export type CollectionDef = {
  key: CollectionKey;
  label: string;
  description: string;
  // The Drizzle table — typed loosely because Drizzle's table types vary
  // shape per definition.
  table: unknown;
};

export const COLLECTIONS: Record<CollectionKey, CollectionDef> = {
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    description: "Client quotes carried on the homepage carousel.",
    table: schema.cmsTestimonials,
  },
  faqs: {
    key: "faqs",
    label: "FAQs",
    description: "Question / answer rows for landing-page FAQ blocks.",
    table: schema.cmsFaqs,
  },
  "case-studies": {
    key: "case-studies",
    label: "Case studies",
    description: "Project deep-dives surfaced under /work and on the homepage.",
    table: schema.cmsCaseStudies,
  },
  blog: {
    key: "blog",
    label: "Blog posts",
    description: "DB-backed blog entries (filesystem posts still render).",
    table: schema.cmsBlogPosts,
  },
  industries: {
    key: "industries",
    label: "Industry pages",
    description: "Per-industry hire pages (fintech, AI startups, YC, etc.).",
    table: schema.cmsIndustryPages,
  },
  research: {
    key: "research",
    label: "Research reports",
    description: "Original-data reports for AI search citation.",
    table: schema.cmsResearchReports,
  },
  subscribers: {
    key: "subscribers",
    label: "Newsletter subscribers",
    description: "Everyone who signed up via the newsletter form.",
    table: schema.cmsSubscribers,
  },
  newsletter: {
    key: "newsletter",
    label: "Newsletter issues",
    description: "Compose + send newsletter blasts via Resend.",
    table: schema.cmsNewsletterIssues,
  },
};
