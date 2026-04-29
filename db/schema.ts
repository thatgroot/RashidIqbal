import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  bigserial,
  index,
} from "drizzle-orm/pg-core";

// ----------------------------------------------------------------------------
// Analytics — visitor / session / event triples
// ----------------------------------------------------------------------------

export const analyticsVisitors = pgTable(
  "analytics_visitors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitorId: text("visitor_id").notNull().unique(), // aestho_v cookie value
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    country: text("country"),
    region: text("region"),
    city: text("city"),
    timezone: text("timezone"),
    userAgent: text("user_agent"),
    deviceType: text("device_type"), // mobile | tablet | desktop | bot
    browser: text("browser"),
    os: text("os"),
    ipHash: text("ip_hash"), // sha256(ip + daily salt)
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    referrerFirst: text("referrer_first"),
  },
  (t) => ({
    lastSeenIdx: index("analytics_visitors_last_seen_idx").on(t.lastSeenAt),
    countryIdx: index("analytics_visitors_country_idx").on(t.country),
  })
);

export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitorId: uuid("visitor_id")
      .notNull()
      .references(() => analyticsVisitors.id, { onDelete: "cascade" }),
    sessionToken: text("session_token").notNull().unique(), // aestho_s cookie value
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    durationSec: integer("duration_sec"),
    landingPath: text("landing_path"),
    exitPath: text("exit_path"),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    pageviewCount: integer("pageview_count").notNull().default(0),
    eventCount: integer("event_count").notNull().default(0),
    isBounce: boolean("is_bounce").notNull().default(true),
    country: text("country"), // denormalized for fast filtering
    deviceType: text("device_type"),
    clarityId: text("clarity_id"), // _clck cookie tail, deep-link target
  },
  (t) => ({
    startedIdx: index("analytics_sessions_started_idx").on(t.startedAt),
    visitorIdx: index("analytics_sessions_visitor_idx").on(t.visitorId),
  })
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => analyticsSessions.id, { onDelete: "cascade" }),
    visitorId: uuid("visitor_id")
      .notNull()
      .references(() => analyticsVisitors.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // pageview | click | scroll | form_view | form_submit | cta_click | custom
    path: text("path"),
    target: text("target"), // hero.cta.email, offer.tier.four-page, etc.
    properties: jsonb("properties").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    createdIdx: index("analytics_events_created_idx").on(t.createdAt),
    sessionIdx: index("analytics_events_session_idx").on(t.sessionId),
    pathTypeIdx: index("analytics_events_path_type_idx").on(t.path, t.type),
  })
);

// ----------------------------------------------------------------------------
// Auth — OTP codes + admin sessions
// ----------------------------------------------------------------------------

export const authOtpCodes = pgTable(
  "auth_otp_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    ip: text("ip"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailExpiresIdx: index("auth_otp_codes_email_expires_idx").on(t.email, t.expiresAt),
  })
);

export const authSessions = pgTable(
  "auth_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    ip: text("ip"),
    userAgent: text("user_agent"),
  },
  (t) => ({
    expiresIdx: index("auth_sessions_expires_idx").on(t.expiresAt),
  })
);

// ----------------------------------------------------------------------------
// Forms inbox — every lead / contact / pricing / offer submission lands
// here in addition to the email dispatch, so the dashboard has a queryable
// inbox.
// ----------------------------------------------------------------------------

export const formSubmissions = pgTable(
  "form_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Where the submission came from. Mirrors the `source` field in /api/lead
    // (offer-paid, pricing, offer-lp, exit-intent, service-builder, contact, ...)
    source: text("source").notNull(),
    // Identity
    email: text("email").notNull(),
    name: text("name"),
    website: text("website"),
    // Pre-rendered subject so the inbox table doesn't need to recompute it
    subject: text("subject").notNull(),
    // Full payload (description, plan, mode, services, stack, budget,
    // timeline, concern, location, page count, etc.)
    body: jsonb("body").$type<Record<string, unknown>>(),
    // Optional analytics correlation. We store the aestho_v cookie value;
    // the dashboard joins to analytics_visitors at read time when needed.
    visitorCookie: text("visitor_cookie"),
    sessionCookie: text("session_cookie"),
    // Inbox state
    readAt: timestamp("read_at", { withTimezone: true }),
    starred: boolean("starred").notNull().default(false),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    // Resend message handles for traceability
    internalEmailId: text("internal_email_id"),
    clientAckEmailId: text("client_ack_email_id"),
    // Network meta
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    createdIdx: index("form_submissions_created_idx").on(t.createdAt),
    inboxIdx: index("form_submissions_inbox_idx").on(t.archivedAt, t.readAt),
    sourceIdx: index("form_submissions_source_idx").on(t.source),
  })
);

// ----------------------------------------------------------------------------
// Client portal — separate auth space + project + thread.
// Admin and clients share the data via the same Postgres tables; auth state
// distinguishes who's looking. Clients are auto-provisioned the first time
// an admin converts a form_submissions row into a project.
// ----------------------------------------------------------------------------

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name"),
    company: text("company"),
    timezone: text("timezone"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (t) => ({
    emailIdx: index("clients_email_idx").on(t.email),
  })
);

export const clientOtpCodes = pgTable(
  "client_otp_codes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    ip: text("ip"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailExpiresIdx: index("client_otp_codes_email_expires_idx").on(t.email, t.expiresAt),
  })
);

export const clientSessions = pgTable(
  "client_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    ip: text("ip"),
    userAgent: text("user_agent"),
  },
  (t) => ({
    expiresIdx: index("client_sessions_expires_idx").on(t.expiresAt),
  })
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    // Optional link back to the inbox row that started this project
    sourceFormId: uuid("source_form_id").references(() => formSubmissions.id, {
      onDelete: "set null",
    }),
    // landing-page | four-page-site | custom
    tier: text("tier"),
    // kickoff | design | build | review | launch | live | paused | cancelled
    status: text("status").notNull().default("kickoff"),
    startDate: timestamp("start_date", { withTimezone: true }),
    targetLaunchDate: timestamp("target_launch_date", { withTimezone: true }),
    launchedAt: timestamp("launched_at", { withTimezone: true }),
    // Onboarding answers + brief (positioning, ICP, references, copy notes)
    brief: jsonb("brief").$type<Record<string, unknown>>(),
    // Quick-jump links: { figma, staging, live, notion, drive, ... }
    links: jsonb("links").$type<Record<string, string>>(),
    notesInternal: text("notes_internal"), // admin-only
    notesShared: text("notes_shared"), // visible + editable by client and admin
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    clientIdx: index("projects_client_idx").on(t.clientId),
    statusIdx: index("projects_status_idx").on(t.status),
  })
);

// ----------------------------------------------------------------------------
// Per-project todos and assets — shared between admin and client.
// ----------------------------------------------------------------------------

export const projectTodos = pgTable(
  "project_todos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    // 'admin' | 'client'
    addedBy: text("added_by").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    projectIdx: index("project_todos_project_idx").on(t.projectId, t.sortOrder),
  })
);

export const projectAssets = pgTable(
  "project_assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    url: text("url").notNull(),
    // figma | framer | notion | google | github | video | image | link
    kind: text("kind").notNull().default("link"),
    addedBy: text("added_by").notNull(), // 'admin' | 'client'
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    projectIdx: index("project_assets_project_idx").on(t.projectId, t.createdAt),
  })
);

export const projectMessages = pgTable(
  "project_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    // 'admin' | 'client'
    senderType: text("sender_type").notNull(),
    // null when senderType = 'admin' (single-admin world); set to clients.id when 'client'
    senderClientId: uuid("sender_client_id").references(() => clients.id, {
      onDelete: "set null",
    }),
    body: text("body").notNull(),
    // Future: file uploads. For MVP, links: [{ name, url }]
    attachments: jsonb("attachments").$type<{ name: string; url: string }[]>(),
    readByAdminAt: timestamp("read_by_admin_at", { withTimezone: true }),
    readByClientAt: timestamp("read_by_client_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    projectCreatedIdx: index("project_messages_project_created_idx").on(
      t.projectId,
      t.createdAt
    ),
  })
);

// ----------------------------------------------------------------------------
// CMS — content collections managed by the admin from /dashboard/cms.
// All eight tables share the same row shape: a primary key, a sort_order
// for explicit ordering, and a published_at nullable so admin can stage
// drafts. Type-specific columns differ per collection.
// ----------------------------------------------------------------------------

export const cmsTestimonials = pgTable(
  "cms_testimonials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quote: text("quote").notNull(),
    author: text("author").notNull(),
    title: text("title"), // "Founder & CEO, UpdateAI"
    avatarUrl: text("avatar_url"),
    accent: text("accent"), // tailwind color token, e.g. "bg-orange-500"
    rating: integer("rating").default(5),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    sortIdx: index("cms_testimonials_sort_idx").on(t.sortOrder),
  })
);

export const cmsFaqs = pgTable(
  "cms_faqs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    // Where the FAQ shows: "landing", "offer", "pricing", "comparison", "all"
    surface: text("surface").notNull().default("landing"),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    surfaceSortIdx: index("cms_faqs_surface_sort_idx").on(t.surface, t.sortOrder),
  })
);

export const cmsCaseStudies = pgTable(
  "cms_case_studies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    clientName: text("client_name").notNull(),
    summary: text("summary"), // 1-2 sentence card description
    body: text("body"), // markdown
    coverImage: text("cover_image"),
    heroImage: text("hero_image"),
    metrics: jsonb("metrics").$type<{ label: string; value: string }[]>(),
    tags: jsonb("tags").$type<string[]>(),
    liveUrl: text("live_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: index("cms_case_studies_slug_idx").on(t.slug),
    sortIdx: index("cms_case_studies_sort_idx").on(t.sortOrder),
  })
);

export const cmsBlogPosts = pgTable(
  "cms_blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    body: text("body").notNull(), // markdown
    coverImage: text("cover_image"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    tags: jsonb("tags").$type<string[]>(),
    category: text("category"),
    featured: boolean("featured").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: index("cms_blog_posts_slug_idx").on(t.slug),
    publishedIdx: index("cms_blog_posts_published_idx").on(t.publishedAt),
  })
);

export const cmsIndustryPages = pgTable(
  "cms_industry_pages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    industry: text("industry").notNull(), // "fintech", "ai-startups"
    headline: text("headline").notNull(),
    subheadline: text("subheadline"),
    body: text("body"), // markdown
    namedClients: jsonb("named_clients").$type<string[]>(),
    metrics: jsonb("metrics").$type<{ label: string; value: string }[]>(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: index("cms_industry_pages_slug_idx").on(t.slug),
  })
);

export const cmsResearchReports = pgTable(
  "cms_research_reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    summary: text("summary"),
    body: text("body"), // markdown
    pdfUrl: text("pdf_url"),
    coverImage: text("cover_image"),
    findings: jsonb("findings").$type<{ stat: string; context: string }[]>(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: index("cms_research_reports_slug_idx").on(t.slug),
  })
);

export const cmsSubscribers = pgTable(
  "cms_subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name"),
    source: text("source"), // "blog-footer", "homepage-sticky", "research-report"
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: index("cms_subscribers_email_idx").on(t.email),
  })
);

export const cmsNewsletterIssues = pgTable(
  "cms_newsletter_issues",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subject: text("subject").notNull(),
    body: text("body").notNull(), // markdown
    sentAt: timestamp("sent_at", { withTimezone: true }),
    sentToCount: integer("sent_to_count"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  }
);

// ----------------------------------------------------------------------------
// Email drip — onboarding sequence kicked off by every form submission.
// One job row per (submission × step). The hourly cron picks up due steps.
// ----------------------------------------------------------------------------

export const emailDripJobs = pgTable(
  "email_drip_jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => formSubmissions.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    step: integer("step").notNull(), // 1..5
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    skipReason: text("skip_reason"), // "unsubscribed", "replied", "manual-cancel"
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    dueIdx: index("email_drip_jobs_due_idx").on(t.dueAt, t.sentAt),
    submissionIdx: index("email_drip_jobs_submission_idx").on(t.submissionId),
  })
);

// Type helpers consumed across the app
export type Visitor = typeof analyticsVisitors.$inferSelect;
export type Session = typeof analyticsSessions.$inferSelect;
export type Event = typeof analyticsEvents.$inferSelect;
export type AuthSession = typeof authSessions.$inferSelect;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type ClientSession = typeof clientSessions.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectMessage = typeof projectMessages.$inferSelect;
export type ProjectTodo = typeof projectTodos.$inferSelect;
export type ProjectAsset = typeof projectAssets.$inferSelect;
export type CmsTestimonial = typeof cmsTestimonials.$inferSelect;
export type CmsFaq = typeof cmsFaqs.$inferSelect;
export type CmsCaseStudy = typeof cmsCaseStudies.$inferSelect;
export type CmsBlogPost = typeof cmsBlogPosts.$inferSelect;
export type CmsIndustryPage = typeof cmsIndustryPages.$inferSelect;
export type CmsResearchReport = typeof cmsResearchReports.$inferSelect;
export type CmsSubscriber = typeof cmsSubscribers.$inferSelect;
export type CmsNewsletterIssue = typeof cmsNewsletterIssues.$inferSelect;
export type EmailDripJob = typeof emailDripJobs.$inferSelect;

// Suppress unused-import warning when sql isn't used; kept for future raw migrations.
void sql;
