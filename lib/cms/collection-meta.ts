// Per-collection rendering meta + field-spec dispatch.
// Centralizes the cluster of "for this collection key, what label do we
// show, what fields does the editor render, what does each list row look
// like" so the generic admin pages stay tiny.

import type { FieldSpec } from "@/components/dashboard/cms-editor";
import {
  TESTIMONIAL_FIELDS,
  FAQ_FIELDS,
  CASE_STUDY_FIELDS,
  BLOG_POST_FIELDS,
  INDUSTRY_PAGE_FIELDS,
  RESEARCH_REPORT_FIELDS,
  NEWSLETTER_ISSUE_FIELDS,
  SUBSCRIBER_FIELDS,
} from "./field-specs";

export type RowLike = Record<string, unknown> & {
  id: string;
  publishedAt?: Date | string | null;
  sortOrder?: number;
};

export type CollectionMeta = {
  label: string;
  description: string;
  fields: FieldSpec[];
  // Default values when a new row is created
  initial: Record<string, unknown>;
  // Render a list row as { primary, secondary?, meta? }. The optional
  // fields explicitly allow `undefined` so they pass under
  // tsconfig `exactOptionalPropertyTypes: true`.
  toListRow: (r: RowLike) => {
    primary: string;
    secondary?: string | undefined;
    meta?: string | undefined;
    isPublished?: boolean | undefined;
  };
  // Singular label for the editor h1 ("New testimonial")
  singular: string;
  // Title rendered above the editor when editing an existing row
  toEditTitle: (r: RowLike) => string;
};

export const COLLECTION_META: Record<string, CollectionMeta> = {
  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    description: "Client quotes for the homepage carousel. Sort with the order field.",
    fields: TESTIMONIAL_FIELDS,
    initial: { rating: 5, sortOrder: 0, accent: "bg-orange-500" },
    toListRow: (r) => ({
      primary: `${r.author ?? "(no author)"} ${r.title ? `· ${r.title}` : ""}`,
      secondary: typeof r.quote === "string" ? r.quote.slice(0, 140) : undefined,
      meta: typeof r.sortOrder === "number" ? `#${r.sortOrder}` : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.author ?? "Testimonial"),
  },
  faqs: {
    label: "FAQs",
    singular: "FAQ",
    description: "Question / answer rows shown on the landing page and elsewhere.",
    fields: FAQ_FIELDS,
    initial: { surface: "landing", sortOrder: 0 },
    toListRow: (r) => ({
      primary: String(r.question ?? "(no question)"),
      secondary: typeof r.answer === "string" ? r.answer.slice(0, 140) : undefined,
      meta: r.surface ? String(r.surface) : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.question ?? "FAQ"),
  },
  "case-studies": {
    label: "Case studies",
    singular: "Case study",
    description: "Project deep-dives surfaced under /work and on the homepage.",
    fields: CASE_STUDY_FIELDS,
    initial: { sortOrder: 0 },
    toListRow: (r) => ({
      primary: `${r.clientName ?? ""} · ${r.title ?? ""}`,
      secondary: typeof r.summary === "string" ? r.summary.slice(0, 140) : undefined,
      meta: r.slug ? `/work/${r.slug}` : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.title ?? "Case study"),
  },
  blog: {
    label: "Blog posts",
    singular: "Blog post",
    description: "DB-backed posts. Existing markdown files keep rendering too.",
    fields: BLOG_POST_FIELDS,
    initial: { featured: false },
    toListRow: (r) => ({
      primary: String(r.title ?? "(untitled)"),
      secondary: typeof r.description === "string" ? r.description.slice(0, 140) : undefined,
      meta: r.slug ? `/blog/${r.slug}` : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.title ?? "Blog post"),
  },
  industries: {
    label: "Industry pages",
    singular: "Industry page",
    description: "Per-industry hire pages.",
    fields: INDUSTRY_PAGE_FIELDS,
    initial: {},
    toListRow: (r) => ({
      primary: String(r.industry ?? "(untitled)"),
      secondary: typeof r.headline === "string" ? r.headline : undefined,
      meta: r.slug ? `/${r.slug}` : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.industry ?? "Industry page"),
  },
  research: {
    label: "Research reports",
    singular: "Research report",
    description: "Original-data reports for AI-search citation.",
    fields: RESEARCH_REPORT_FIELDS,
    initial: {},
    toListRow: (r) => ({
      primary: String(r.title ?? "(untitled)"),
      secondary: typeof r.summary === "string" ? r.summary.slice(0, 140) : undefined,
      meta: r.slug ? `/research/${r.slug}` : undefined,
      isPublished: !!r.publishedAt,
    }),
    toEditTitle: (r) => String(r.title ?? "Research report"),
  },
  subscribers: {
    label: "Subscribers",
    singular: "Subscriber",
    description: "Newsletter sign-ups.",
    fields: SUBSCRIBER_FIELDS,
    initial: {},
    toListRow: (r) => ({
      primary: String(r.email ?? "(no email)"),
      secondary: r.name ? String(r.name) : undefined,
      meta: r.source ? String(r.source) : undefined,
      isPublished: !!r.confirmedAt,
    }),
    toEditTitle: (r) => String(r.email ?? "Subscriber"),
  },
  newsletter: {
    label: "Newsletter issues",
    singular: "Newsletter issue",
    description: "Compose + send via Resend.",
    fields: NEWSLETTER_ISSUE_FIELDS,
    initial: {},
    toListRow: (r) => ({
      primary: String(r.subject ?? "(no subject)"),
      meta: r.sentAt ? "Sent" : "Draft",
      isPublished: !!r.sentAt,
    }),
    toEditTitle: (r) => String(r.subject ?? "Issue"),
  },
};
