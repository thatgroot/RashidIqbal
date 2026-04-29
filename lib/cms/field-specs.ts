import type { FieldSpec } from "@/components/dashboard/cms-editor";

// Per-collection field schemas consumed by the generic CmsEditor.

export const TESTIMONIAL_FIELDS: FieldSpec[] = [
  { kind: "textarea", key: "quote", label: "Quote", rows: 4, placeholder: "The new design loads fast and converts way better than what we had before." },
  { kind: "text", key: "author", label: "Author name", required: true, placeholder: "Josh Schachter" },
  { kind: "text", key: "title", label: "Author title", placeholder: "Founder & CEO, UpdateAI" },
  { kind: "url", key: "avatarUrl", label: "Avatar URL", placeholder: "/testimonials/josh.jpg" },
  {
    kind: "select",
    key: "accent",
    label: "Accent color",
    options: [
      { value: "bg-orange-500", label: "Orange" },
      { value: "bg-blue-500", label: "Blue" },
      { value: "bg-emerald-500", label: "Emerald" },
      { value: "bg-purple-500", label: "Purple" },
      { value: "bg-pink-500", label: "Pink" },
      { value: "bg-zinc-700", label: "Charcoal" },
    ],
  },
  { kind: "number", key: "rating", label: "Rating (1-5)", min: 1, max: 5 },
  { kind: "number", key: "sortOrder", label: "Sort order (lower = earlier)" },
];

export const FAQ_FIELDS: FieldSpec[] = [
  { kind: "text", key: "question", label: "Question", required: true, placeholder: "What if the design isn't right?" },
  { kind: "markdown", key: "answer", label: "Answer", rows: 8 },
  {
    kind: "select",
    key: "surface",
    label: "Where it shows",
    options: [
      { value: "landing", label: "Landing page" },
      { value: "offer", label: "Offer page" },
      { value: "pricing", label: "Pricing section" },
      { value: "comparison", label: "Comparison pages" },
      { value: "all", label: "All surfaces" },
    ],
  },
  { kind: "number", key: "sortOrder", label: "Sort order" },
];

export const CASE_STUDY_FIELDS: FieldSpec[] = [
  { kind: "text", key: "slug", label: "URL slug", required: true, placeholder: "updateai-onboarding-rebuild" },
  { kind: "text", key: "title", label: "Project title", required: true },
  { kind: "text", key: "clientName", label: "Client name", required: true },
  { kind: "textarea", key: "summary", label: "Summary (1-2 sentences for cards)", rows: 2 },
  { kind: "markdown", key: "body", label: "Case-study body" },
  { kind: "url", key: "coverImage", label: "Cover image URL" },
  { kind: "url", key: "heroImage", label: "Hero image URL" },
  { kind: "url", key: "liveUrl", label: "Live site URL" },
  { kind: "json", key: "metrics", label: "Metrics (array of {label, value})", placeholder: '[{"label":"Onboarding signups","value":"+50%"}]' },
  { kind: "json", key: "tags", label: "Tags (array of strings)", placeholder: '["SaaS","AI","B2B"]' },
  { kind: "number", key: "sortOrder", label: "Sort order" },
];

export const BLOG_POST_FIELDS: FieldSpec[] = [
  { kind: "text", key: "slug", label: "URL slug", required: true },
  { kind: "text", key: "title", label: "Title", required: true },
  { kind: "textarea", key: "description", label: "Short description", rows: 2 },
  { kind: "markdown", key: "body", label: "Body", rows: 20 },
  { kind: "url", key: "coverImage", label: "Cover image URL" },
  { kind: "text", key: "category", label: "Category" },
  { kind: "text", key: "seoTitle", label: "SEO title (under 70 chars)" },
  { kind: "textarea", key: "seoDescription", label: "SEO description", rows: 2 },
  { kind: "json", key: "tags", label: "Tags", placeholder: '["framer","saas"]' },
  { kind: "select", key: "featured", label: "Featured", options: [{ value: "false", label: "No" }, { value: "true", label: "Yes" }] },
];

export const INDUSTRY_PAGE_FIELDS: FieldSpec[] = [
  { kind: "text", key: "slug", label: "URL slug", required: true, placeholder: "framer-expert-for-fintech" },
  { kind: "text", key: "industry", label: "Industry name", required: true, placeholder: "Fintech" },
  { kind: "text", key: "headline", label: "Headline", required: true },
  { kind: "textarea", key: "subheadline", label: "Subheadline", rows: 2 },
  { kind: "markdown", key: "body", label: "Body" },
  { kind: "json", key: "namedClients", label: "Named clients (array of strings)", placeholder: '["Stripe","Mercury"]' },
  { kind: "json", key: "metrics", label: "Metrics", placeholder: '[{"label":"Avg lift","value":"2.4x"}]' },
];

export const RESEARCH_REPORT_FIELDS: FieldSpec[] = [
  { kind: "text", key: "slug", label: "URL slug", required: true },
  { kind: "text", key: "title", label: "Title", required: true },
  { kind: "textarea", key: "summary", label: "Summary", rows: 3 },
  { kind: "markdown", key: "body", label: "Body" },
  { kind: "url", key: "pdfUrl", label: "Downloadable PDF URL" },
  { kind: "url", key: "coverImage", label: "Cover image URL" },
  { kind: "json", key: "findings", label: "Headline findings", placeholder: '[{"stat":"2.4x","context":"avg lift on landing-page rebuilds"}]' },
];

export const NEWSLETTER_ISSUE_FIELDS: FieldSpec[] = [
  { kind: "text", key: "subject", label: "Subject line", required: true },
  { kind: "markdown", key: "body", label: "Body", rows: 16 },
];

export const SUBSCRIBER_FIELDS: FieldSpec[] = [
  { kind: "text", key: "email", label: "Email", required: true },
  { kind: "text", key: "name", label: "Name" },
  { kind: "text", key: "source", label: "Source" },
];
