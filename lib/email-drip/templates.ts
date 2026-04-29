// 5-email onboarding drip dispatched after every form submission.
//
// Cadence: +1d, +3d, +5d, +9d, +14d after the submission lands.
// The existing /api/lead handler already sends an instant client ack at T+0,
// so step 1 starts a day later to avoid double-emailing on day-of.
//
// Each template is plain HTML + a text fallback. Resend handles MIME packing.
// Keep copy short, conversational, and signed by Rashid — these are
// onboarding-tone follow-ups, not marketing blasts.

import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export type DripStep = {
  step: number;
  delayDays: number;
  subject: (ctx: DripContext) => string;
  html: (ctx: DripContext) => string;
  text: (ctx: DripContext) => string;
};

export type DripContext = {
  email: string;
  name?: string | undefined;
  submissionId: string;
};

function firstName(name: string | undefined): string {
  if (!name) return "there";
  const f = name.trim().split(/\s+/)[0];
  return f || "there";
}

function unsubLine(email: string, submissionId: string): string {
  const url = `${SITE_URL}/api/email-drip/unsubscribe?id=${submissionId}&e=${encodeURIComponent(email)}`;
  return `If you'd rather not get follow-ups, ${url} (one click, no questions).`;
}

function unsubHtml(email: string, submissionId: string): string {
  const url = `${SITE_URL}/api/email-drip/unsubscribe?id=${submissionId}&e=${encodeURIComponent(email)}`;
  return `<p style="margin:24px 0 0;font-size:11px;color:#a1a1aa">Don't want follow-ups? <a href="${url}" style="color:#71717a">Unsubscribe in one click</a>.</p>`;
}

function shell(body: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#18181b;line-height:1.55;font-size:15px">
${body}
<p style="margin:32px 0 4px;color:#52525b">— Rashid</p>
<p style="margin:0;font-size:12px;color:#a1a1aa"><a href="${SITE_URL}" style="color:#a1a1aa">aestho.xyz</a> · Certified Framer Expert</p>
</div>`;
}

// ----------------------------------------------------------------------------
// Step 1 — T+1d. Soft check-in + free 60-second Loom audit offer.
// ----------------------------------------------------------------------------
const step1: DripStep = {
  step: 1,
  delayDays: 1,
  subject: (c) => `Quick follow-up, ${firstName(c.name)}`,
  html: (c) =>
    shell(`
<p>Hey ${firstName(c.name)},</p>
<p>Just making sure my reply yesterday hit your inbox (and not the spam fold).</p>
<p>While you're thinking it over: if you'd like, I can record a free 60-second Loom audit of your site. I'll show you exactly where you're leaking visitors, no pitch attached.</p>
<p>Just hit reply with the URL and I'll send the Loom over within 48 hours.</p>
${unsubHtml(c.email, c.submissionId)}
`),
  text: (c) =>
    `Hey ${firstName(c.name)},

Just making sure my reply yesterday hit your inbox (and not the spam fold).

While you're thinking it over: if you'd like, I can record a free 60-second Loom audit of your site. I'll show you exactly where you're leaking visitors, no pitch attached.

Just hit reply with the URL and I'll send the Loom over within 48 hours.

— Rashid
${SITE_URL}

${unsubLine(c.email, c.submissionId)}`,
};

// ----------------------------------------------------------------------------
// Step 2 — T+3d. One concrete case study to build conviction.
// ----------------------------------------------------------------------------
const step2: DripStep = {
  step: 2,
  delayDays: 3,
  subject: () => `How UpdateAI lifted signups 50%`,
  html: (c) =>
    shell(`
<p>Hi ${firstName(c.name)},</p>
<p>Sharing a quick case study because it's the closest fit to what most folks ask me to fix:</p>
<p><strong>UpdateAI</strong> — onboarding signups went up 50% after the relaunch. The one change that mattered most: replacing the generic "Get started" hero with a single sentence that named the buyer's exact problem in their own words.</p>
<p>Read the full breakdown: <a href="${SITE_URL}/work" style="color:#c2410c">${SITE_URL}/work</a></p>
<p>If anything in there sparks an idea for your site, just reply.</p>
${unsubHtml(c.email, c.submissionId)}
`),
  text: (c) =>
    `Hi ${firstName(c.name)},

Sharing a quick case study because it's the closest fit to what most folks ask me to fix:

UpdateAI — onboarding signups went up 50% after the relaunch. The one change that mattered most: replacing the generic "Get started" hero with a single sentence that named the buyer's exact problem in their own words.

Full breakdown: ${SITE_URL}/work

If anything in there sparks an idea for your site, just reply.

— Rashid

${unsubLine(c.email, c.submissionId)}`,
};

// ----------------------------------------------------------------------------
// Step 3 — T+5d. Risk reversal — refund + ownership terms.
// ----------------------------------------------------------------------------
const step3: DripStep = {
  step: 3,
  delayDays: 5,
  subject: () => `If the design is wrong, you get the deposit back`,
  html: (c) =>
    shell(`
<p>${firstName(c.name)},</p>
<p>Most folks don't ask, so I'll volunteer it: my terms are deliberately founder-friendly.</p>
<ul style="padding-left:18px;margin:12px 0">
<li><strong>Unlimited revisions on Figma</strong> before I ever touch Framer.</li>
<li><strong>Wrong direction after the first review? Refund.</strong> Has happened exactly once in years.</li>
<li><strong>You own everything from day one</strong> — Figma file, Framer project, code. No "works only while on retainer" lock-in.</li>
</ul>
<p>The only way I can sleep at night is if the worst case for you is "lost a week and got the deposit back."</p>
${unsubHtml(c.email, c.submissionId)}
`),
  text: (c) =>
    `${firstName(c.name)},

Most folks don't ask, so I'll volunteer it: my terms are deliberately founder-friendly.

- Unlimited revisions on Figma before I ever touch Framer.
- Wrong direction after the first review? Refund. Has happened exactly once in years.
- You own everything from day one — Figma file, Framer project, code. No "works only while on retainer" lock-in.

The only way I can sleep at night is if the worst case for you is "lost a week and got the deposit back."

— Rashid

${unsubLine(c.email, c.submissionId)}`,
};

// ----------------------------------------------------------------------------
// Step 4 — T+9d. Booking nudge — direct link to Dribbble schedule.
// ----------------------------------------------------------------------------
const step4: DripStep = {
  step: 4,
  delayDays: 9,
  subject: () => `30 minutes, one honest answer`,
  html: (c) =>
    shell(`
<p>${firstName(c.name)},</p>
<p>If you've been on the fence, here's the lowest-friction next step:</p>
<p>Pick a 30-minute slot on my Dribbble scheduling page → I'll review whatever you have today (URL or Figma file) and tell you, honestly, whether I can move the needle.</p>
<p><a href="${SOCIAL_LINKS.calcom}" style="display:inline-block;background:#c2410c;color:#fff;padding:12px 20px;text-decoration:none;font-weight:700;font-size:14px">Book a 30-minute call →</a></p>
<p>No pitch. No credit card. If I can't help, I'll say so and refer you to someone who can.</p>
${unsubHtml(c.email, c.submissionId)}
`),
  text: (c) =>
    `${firstName(c.name)},

If you've been on the fence, here's the lowest-friction next step:

Pick a 30-minute slot on my Dribbble scheduling page — I'll review whatever you have today (URL or Figma file) and tell you, honestly, whether I can move the needle.

Book here: ${SOCIAL_LINKS.calcom}

No pitch. No credit card. If I can't help, I'll say so and refer you to someone who can.

— Rashid

${unsubLine(c.email, c.submissionId)}`,
};

// ----------------------------------------------------------------------------
// Step 5 — T+14d. Polite break-up email. Last touch, opens the door later.
// ----------------------------------------------------------------------------
const step5: DripStep = {
  step: 5,
  delayDays: 14,
  subject: () => `Closing the loop`,
  html: (c) =>
    shell(`
<p>${firstName(c.name)},</p>
<p>I'll stop the follow-ups here so I'm not cluttering your inbox.</p>
<p>If the timing's wrong, no problem — file my email and ping me whenever the project gets greenlit. I'll usually have something in the calendar within a week.</p>
<p>And if you ever want a quick second opinion on a landing page, I'll always do a free 60-second Loom audit. Just reply with the URL.</p>
<p>Best of luck with whatever you're shipping next.</p>
${unsubHtml(c.email, c.submissionId)}
`),
  text: (c) =>
    `${firstName(c.name)},

I'll stop the follow-ups here so I'm not cluttering your inbox.

If the timing's wrong, no problem — file my email and ping me whenever the project gets greenlit. I'll usually have something in the calendar within a week.

And if you ever want a quick second opinion on a landing page, I'll always do a free 60-second Loom audit. Just reply with the URL.

Best of luck with whatever you're shipping next.

— Rashid
${SITE_URL}

${unsubLine(c.email, c.submissionId)}`,
};

export const DRIP_STEPS: DripStep[] = [step1, step2, step3, step4, step5];

export function getStep(n: number): DripStep | undefined {
  return DRIP_STEPS.find((s) => s.step === n);
}
