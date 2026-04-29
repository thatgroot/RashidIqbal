import { db, schema } from "@/db/client";
import { eq, desc } from "drizzle-orm";

// When a form is submitted via /api/lead or /api/contact, the client-side
// tracker should already emit a `form_submit` event into analytics_events.
// But trackers can be missed (DNT, ad-blockers, browser closing the tab
// before the flush, race with navigation). This helper emits the event
// server-side too, so the funnels + realtime + per-visitor timeline never
// lose a real conversion.
//
// We resolve the visitor and session by cookie value. If the visitor has
// no tracker cookies (tracker disabled, brand-new submission via curl),
// we silently skip — there's no session to attach the event to and the
// inbox row already covers durability.

export async function logAnalyticsFormSubmit(opts: {
  visitorCookie?: string | undefined;
  sessionCookie?: string | undefined;
  path?: string | undefined;
  target?: string | undefined;
  properties?: Record<string, unknown> | undefined;
}) {
  if (!opts.visitorCookie || !opts.sessionCookie) return;

  try {
    // Look up the visitor row by the aestho_v cookie value
    const [visitor] = await db
      .select({ id: schema.analyticsVisitors.id })
      .from(schema.analyticsVisitors)
      .where(eq(schema.analyticsVisitors.visitorId, opts.visitorCookie))
      .limit(1);
    if (!visitor) return;

    // Look up the session row by the aestho_s cookie value. If the cookie's
    // session is gone (rare race: cookie sliding expired between submit and
    // server processing), fall back to the visitor's most recent session.
    let session = (
      await db
        .select({ id: schema.analyticsSessions.id })
        .from(schema.analyticsSessions)
        .where(eq(schema.analyticsSessions.sessionToken, opts.sessionCookie))
        .limit(1)
    )[0];
    if (!session) {
      session = (
        await db
          .select({ id: schema.analyticsSessions.id })
          .from(schema.analyticsSessions)
          .where(eq(schema.analyticsSessions.visitorId, visitor.id))
          .orderBy(desc(schema.analyticsSessions.startedAt))
          .limit(1)
      )[0];
    }
    if (!session) return;

    await db.insert(schema.analyticsEvents).values({
      sessionId: session.id,
      visitorId: visitor.id,
      type: "form_submit",
      path: opts.path?.slice(0, 512) ?? null,
      target: opts.target?.slice(0, 200) ?? `server:${opts.target ?? "unknown"}`,
      properties: opts.properties ?? null,
    });
  } catch (err) {
    // Best-effort. Email already sent, inbox already logged. We don't
    // surface this failure to the visitor or to Rashid.
    console.error("[forms/log-analytics-event] insert failed", err);
  }
}
