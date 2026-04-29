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

// Type helpers consumed across the app
export type Visitor = typeof analyticsVisitors.$inferSelect;
export type Session = typeof analyticsSessions.$inferSelect;
export type Event = typeof analyticsEvents.$inferSelect;
export type AuthSession = typeof authSessions.$inferSelect;
export type FormSubmission = typeof formSubmissions.$inferSelect;

// Suppress unused-import warning when sql isn't used; kept for future raw migrations.
void sql;
