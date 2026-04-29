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
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    clientIdx: index("projects_client_idx").on(t.clientId),
    statusIdx: index("projects_status_idx").on(t.status),
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

// Suppress unused-import warning when sql isn't used; kept for future raw migrations.
void sql;
