import { db, schema } from "@/db/client";
import { and, eq, inArray, isNull, lte } from "drizzle-orm";
import { DRIP_STEPS, getStep } from "./templates";
import { Resend } from "resend";

// Sequencer: schedules + dispatches the 5-step email drip.
//
// scheduleDrip() — called once after a form submission lands. Inserts 5
// email_drip_jobs rows, each with a future due_at.
//
// dispatchDueSteps() — called by the hourly cron. Picks up rows where
// due_at <= now() AND sent_at IS NULL, sends each via Resend, marks sent.
//
// cancelDripForEmail() — used when a recipient unsubscribes or replies.
// Marks all unsent rows as skipped so the cron stops dispatching.

const SENDER_BASE =
  process.env.RESEND_FROM_EMAIL?.replace(/^[^<]*<|>$/g, "").trim() ||
  "onboarding@resend.dev";
const SENDER = `Rashid Iqbal <${SENDER_BASE}>`;
const REPLY_TO = "rashidiqbal.freelance@gmail.com";

export async function scheduleDrip(params: {
  submissionId: string;
  email: string;
}): Promise<void> {
  const { submissionId, email } = params;
  const now = Date.now();
  const rows = DRIP_STEPS.map((s) => ({
    submissionId,
    email,
    step: s.step,
    dueAt: new Date(now + s.delayDays * 24 * 60 * 60 * 1000),
  }));
  try {
    await db.insert(schema.emailDripJobs).values(rows);
  } catch (e) {
    console.error("[email-drip] scheduleDrip insert failed", e);
  }
}

export async function cancelDripForSubmission(params: {
  submissionId: string;
  reason: string;
}): Promise<number> {
  const result = await db
    .update(schema.emailDripJobs)
    .set({ skipReason: params.reason, sentAt: new Date() })
    .where(
      and(
        eq(schema.emailDripJobs.submissionId, params.submissionId),
        isNull(schema.emailDripJobs.sentAt)
      )
    )
    .returning({ id: schema.emailDripJobs.id });
  return result.length;
}

export async function cancelDripForEmail(params: {
  email: string;
  reason: string;
}): Promise<number> {
  const result = await db
    .update(schema.emailDripJobs)
    .set({ skipReason: params.reason, sentAt: new Date() })
    .where(
      and(
        eq(schema.emailDripJobs.email, params.email),
        isNull(schema.emailDripJobs.sentAt)
      )
    )
    .returning({ id: schema.emailDripJobs.id });
  return result.length;
}

export type DispatchResult = {
  picked: number;
  sent: number;
  failed: number;
  skipped: number;
};

export async function dispatchDueSteps(limit = 50): Promise<DispatchResult> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email-drip] RESEND_API_KEY missing — skipping dispatch");
    return { picked: 0, sent: 0, failed: 0, skipped: 0 };
  }

  const due = await db
    .select({
      id: schema.emailDripJobs.id,
      submissionId: schema.emailDripJobs.submissionId,
      email: schema.emailDripJobs.email,
      step: schema.emailDripJobs.step,
    })
    .from(schema.emailDripJobs)
    .where(
      and(
        isNull(schema.emailDripJobs.sentAt),
        lte(schema.emailDripJobs.dueAt, new Date())
      )
    )
    .limit(limit);

  if (due.length === 0) {
    return { picked: 0, sent: 0, failed: 0, skipped: 0 };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  // Resolve recipient names from form_submissions in one query.
  const submissionIds = Array.from(new Set(due.map((j) => j.submissionId)));
  const subs = await db
    .select({
      id: schema.formSubmissions.id,
      name: schema.formSubmissions.name,
    })
    .from(schema.formSubmissions)
    .where(inArray(schema.formSubmissions.id, submissionIds))
    .catch(() => [] as { id: string; name: string | null }[]);

  const nameMap = new Map<string, string | null>();
  subs.forEach((s) => nameMap.set(s.id, s.name));

  for (const job of due) {
    const tpl = getStep(job.step);
    if (!tpl) {
      console.warn("[email-drip] no template for step", job.step);
      skipped++;
      await db
        .update(schema.emailDripJobs)
        .set({ skipReason: "no-template", sentAt: new Date() })
        .where(eq(schema.emailDripJobs.id, job.id));
      continue;
    }

    const recipientName = nameMap.get(job.submissionId) ?? undefined;

    const ctx = {
      email: job.email,
      name: recipientName ?? undefined,
      submissionId: job.submissionId,
    };

    try {
      const res = await resend.emails.send({
        from: SENDER,
        to: job.email,
        replyTo: REPLY_TO,
        subject: tpl.subject(ctx),
        html: tpl.html(ctx),
        text: tpl.text(ctx),
      });
      if (res.error) {
        console.error("[email-drip] send failed", job.id, res.error);
        failed++;
        continue;
      }
      await db
        .update(schema.emailDripJobs)
        .set({ sentAt: new Date() })
        .where(eq(schema.emailDripJobs.id, job.id));
      sent++;
    } catch (e) {
      console.error("[email-drip] send threw", job.id, e);
      failed++;
    }
  }

  return { picked: due.length, sent, failed, skipped };
}
