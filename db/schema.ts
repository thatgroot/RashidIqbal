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

// Type helpers consumed across the app
export type Visitor = typeof analyticsVisitors.$inferSelect;
export type Session = typeof analyticsSessions.$inferSelect;
export type Event = typeof analyticsEvents.$inferSelect;
export type AuthSession = typeof authSessions.$inferSelect;

// Suppress unused-import warning when sql isn't used; kept for future raw migrations.
void sql;
