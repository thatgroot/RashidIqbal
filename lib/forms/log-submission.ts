import { db, schema } from "@/db/client";

// Server-side helper called from form-handling API routes (/api/lead,
// /api/contact, /api/audit/lead, etc.) right after the Resend dispatch.
// Persists the submission so the dashboard can render an inbox view, and
// returns the new row id so the route can attach Resend message ids
// after the email send completes.

export type LogSubmissionInput = {
  source: string;
  email: string;
  subject: string;
  name?: string | undefined;
  website?: string | undefined;
  body: Record<string, unknown>;
  visitorCookie?: string | undefined;
  sessionCookie?: string | undefined;
  ip?: string | undefined;
  userAgent?: string | undefined;
};

export async function logFormSubmission(input: LogSubmissionInput): Promise<string | null> {
  try {
    const [row] = await db
      .insert(schema.formSubmissions)
      .values({
        source: input.source,
        email: input.email.trim().toLowerCase(),
        subject: input.subject,
        name: input.name?.trim() || null,
        website: input.website?.trim() || null,
        body: input.body,
        visitorCookie: input.visitorCookie || null,
        sessionCookie: input.sessionCookie || null,
        ip: input.ip || null,
        userAgent: input.userAgent?.slice(0, 500) || null,
      })
      .returning({ id: schema.formSubmissions.id });
    return row?.id ?? null;
  } catch (err) {
    // Never fail the request because logging failed. The email still went
    // out, the lead is still recoverable from the inbox; we just lose the
    // dashboard surface for this one submission.
    console.error("[forms/log-submission] insert failed", err);
    return null;
  }
}

export async function attachEmailIds(
  submissionId: string,
  ids: { internalEmailId?: string | null; clientAckEmailId?: string | null }
) {
  try {
    await db
      .update(schema.formSubmissions)
      .set({
        internalEmailId: ids.internalEmailId ?? null,
        clientAckEmailId: ids.clientAckEmailId ?? null,
      })
      .where(eq(schema.formSubmissions.id, submissionId));
  } catch (err) {
    console.error("[forms/log-submission] attach failed", err);
  }
}

// Hoisted import — keeps the helper file self-contained
import { eq } from "drizzle-orm";
