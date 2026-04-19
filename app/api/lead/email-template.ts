// Email HTML for lead notifications. Inline styles only — most email clients
// strip <style> blocks. Tables for layout — flexbox/grid unreliable in email.
// Palette matches the aestho.xyz site: zinc neutrals + orange accent.

export interface LeadFields {
  source: string;
  subject: string;
  email: string;
  name?: string | undefined;
  website?: string | undefined;
  concern?: string | undefined;
  location?: string | undefined;
  services?: string | undefined;
  stack?: string | undefined;
  pageCount?: string | number | undefined;
  budget?: string | undefined;
  timeline?: string | undefined;
  description?: string | undefined;
}

// Rotate a short, CRO-flavored reminder so the inbox doesn't feel boilerplate.
const CRO_REMINDERS = [
  "Reply within the first hour. Conversion odds drop 10x after 24 hours.",
  "A lead contacted on day 1 is 21x more likely to qualify than one contacted on day 5.",
  "Speed-to-lead beats polish. A fast &lsquo;hey, saw your form&rsquo; outperforms a perfect pitch sent tomorrow.",
  "Every hour of delay costs ~10% of close probability. Fast reply = won deal.",
];

function pickReminder(): string {
  return CRO_REMINDERS[Math.floor(Math.random() * CRO_REMINDERS.length)];
}

// Escape to prevent HTML injection from user input.
function esc(raw: unknown): string {
  const s = String(raw ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Render a single key/value row in the details table with a top border —
// mirrors the grid-item border treatment on the site.
function row(label: string, value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") return "";
  const safeValue = String(value).replace(/\n/g, "<br>");
  return `
    <tr>
      <td style="padding: 14px 0; border-top: 1px solid #f4f4f5; vertical-align: top; width: 140px;">
        <span style="font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.18em;">${esc(label)}</span>
      </td>
      <td style="padding: 14px 0 14px 16px; border-top: 1px solid #f4f4f5; font-size: 14px; color: #18181b; line-height: 1.55;">
        ${safeValue}
      </td>
    </tr>`;
}

// Linkify a URL safely.
function link(url: string | undefined, display?: string): string {
  if (!url) return "";
  const href = url.startsWith("http") ? url : `https://${url}`;
  return `<a href="${esc(href)}" style="color: #c2410c; text-decoration: none;">${esc(display || url)}</a>`;
}

export function buildLeadEmailHtml(fields: LeadFields): string {
  const year = new Date().getFullYear();
  const cro = pickReminder();
  const sourceLabel = fields.source.replace(/-/g, " ");

  const detailsRows = [
    row("Email", link(`mailto:${fields.email}`, fields.email)),
    row("Name", fields.name),
    row("Website", fields.website ? link(fields.website) : undefined),
    row("Location", fields.location),
    row("Services", fields.services),
    row("Stack", fields.stack),
    row("Pages", fields.pageCount),
    row("Budget", fields.budget),
    row("Timeline", fields.timeline),
    row("Concern", fields.concern),
    row("Description", fields.description),
  ]
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(fields.subject)}</title>
</head>
<body style="margin: 0; padding: 0; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #18181b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background: #ffffff; border: 1px solid #f4f4f5; border-collapse: collapse;">

          <!-- Header: brand + status tag -->
          <tr>
            <td style="padding: 20px 32px; border-bottom: 1px solid #f4f4f5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle;">
                          <div style="width: 22px; height: 22px; background: #ea580c; border-radius: 4px; display: inline-block; vertical-align: middle;"></div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 10px;">
                          <strong style="font-size: 14px; color: #18181b; letter-spacing: -0.01em;">Rashid Iqbal</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; padding: 4px 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 999px; font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #c2410c; text-transform: uppercase; letter-spacing: 0.15em;">Lead captured</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject block -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <span style="font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #ea580c; text-transform: uppercase; letter-spacing: 0.22em;">Source · ${esc(sourceLabel)}</span>
              <h1 style="margin: 10px 0 0; font-size: 22px; font-weight: 600; color: #18181b; line-height: 1.3; letter-spacing: -0.01em;">${esc(fields.subject)}</h1>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                ${detailsRows}
              </table>
            </td>
          </tr>

          <!-- CRO reminder strip -->
          <tr>
            <td style="padding: 18px 32px; background: #fff7ed; border-top: 1px solid #f4f4f5;">
              <p style="margin: 0; font-size: 13px; color: #9a3412; line-height: 1.5;">
                <strong style="color: #c2410c;">CRO reminder:</strong> ${cro}
              </p>
            </td>
          </tr>

          <!-- Quick actions -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #f4f4f5;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="mailto:${esc(fields.email)}?subject=Re%3A%20${encodeURIComponent(fields.subject)}" style="display: inline-block; padding: 10px 18px; background: #ea580c; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; letter-spacing: 0.01em;">Reply now</a>
                  </td>
                  ${
                    fields.website
                      ? `<td><a href="${esc(fields.website.startsWith("http") ? fields.website : `https://${fields.website}`)}" style="display: inline-block; padding: 10px 18px; background: #ffffff; border: 1px solid #e4e4e7; color: #18181b; font-size: 13px; font-weight: 700; text-decoration: none;">Open their site</a></td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Social / profile footer -->
          <tr>
            <td style="padding: 22px 32px; border-top: 1px solid #f4f4f5; background: #fafafa;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #71717a;">
                    <a href="https://www.linkedin.com/in/callmerashidiqbal/" style="color: #52525b; text-decoration: none; margin-right: 14px;">LinkedIn</a>
                    <a href="https://www.upwork.com/freelancers/~01b24c107f5b5af596" style="color: #52525b; text-decoration: none; margin-right: 14px;">Upwork</a>
                    <a href="https://www.framer.com/@rashidiqbal" style="color: #52525b; text-decoration: none; margin-right: 14px;">Framer</a>
                    <a href="https://x.com/rashidrealme" style="color: #52525b; text-decoration: none;">X/Twitter</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px; font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.15em;">
                    © ${year} Rashid Iqbal · Sent from aestho.xyz
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Plain-text fallback for mail clients that don't render HTML.
export function buildLeadEmailText(fields: LeadFields): string {
  const lines = [
    `Source: ${fields.source}`,
    fields.subject ? `Subject: ${fields.subject}` : null,
    "",
    `Email: ${fields.email}`,
    fields.name ? `Name: ${fields.name}` : null,
    fields.website ? `Website: ${fields.website}` : null,
    fields.location ? `Location: ${fields.location}` : null,
    fields.services ? `Services: ${fields.services}` : null,
    fields.stack ? `Stack: ${fields.stack}` : null,
    fields.pageCount ? `Pages: ${fields.pageCount}` : null,
    fields.budget ? `Budget: ${fields.budget}` : null,
    fields.timeline ? `Timeline: ${fields.timeline}` : null,
    fields.concern ? `\nConcern:\n${fields.concern}` : null,
    fields.description ? `\nDescription:\n${fields.description}` : null,
    "",
    "--",
    "Rashid Iqbal — aestho.xyz",
    "LinkedIn · Upwork · Framer · X/Twitter",
  ];
  return lines.filter((l) => l !== null && l !== undefined).join("\n");
}

// ============================================================================
// Client-facing acknowledgement email
// ============================================================================
// Separate, warmer email sent directly to the submitter. NOT the same as the
// internal lead notification that goes to Rashid. Personalized by first name,
// source-aware "what happens next" block, and signed off like a personal note.

export interface ClientAckFields {
  source: string;
  email: string;
  name?: string | undefined;
  website?: string | undefined;
  concern?: string | undefined;
  services?: string | undefined;
  stack?: string | undefined;
  budget?: string | undefined;
  timeline?: string | undefined;
  description?: string | undefined;
}

// Returns first name only for a warmer greeting. Falls back to "there" when
// the form didn't collect a name.
function firstName(raw?: string | undefined): string {
  if (!raw) return "there";
  const first = raw.trim().split(/\s+/)[0];
  return first || "there";
}

// Per-source "what you'll hear back" copy. The acknowledgement feels
// specific to what the visitor actually asked for.
function nextStepsFor(source: string): { heading: string; steps: string[]; ctaTitle: string } {
  if (source === "offer-lp") {
    return {
      heading: "Your free audit is in the queue.",
      steps: [
        "I will review your live page today and record a 15-minute video walkthrough.",
        "You will receive the video plus the 3 highest-impact fixes within 48 hours.",
        "If you want to talk through it, we can jump on a 30-minute call — no pitch, no commitment.",
      ],
      ctaTitle: "Free audit confirmed",
    };
  }
  if (source === "exit-intent") {
    return {
      heading: "Your audit request is confirmed.",
      steps: [
        "I will look at your page and record a short audit video this week.",
        "You will get it in your inbox within 48 hours.",
        "Reply to this email with any extra context that might help.",
      ],
      ctaTitle: "Audit request confirmed",
    };
  }
  // service-builder / default
  return {
    heading: "Your project inquiry is in.",
    steps: [
      "I will review the scope, stack, budget, and timeline you shared.",
      "Within 24 hours I will reply with either a rough scope and quote, or questions to tighten it up.",
      "If it looks like a fit on both sides, we set up a 30-minute intro call.",
    ],
    ctaTitle: "Inquiry received",
  };
}

// Summarize what the visitor submitted so they can see it wasn't lost in the
// void. Only renders fields that actually exist.
function clientSummaryRows(fields: ClientAckFields): string {
  const rows = [
    fields.website ? row("Website", link(fields.website)) : "",
    fields.services ? row("Services", fields.services) : "",
    fields.stack ? row("Stack", fields.stack) : "",
    fields.budget ? row("Budget", fields.budget) : "",
    fields.timeline ? row("Timeline", fields.timeline) : "",
    fields.concern ? row("Your concern", fields.concern) : "",
    fields.description ? row("Description", fields.description) : "",
  ]
    .filter(Boolean)
    .join("");
  if (!rows) return "";
  return `
    <tr>
      <td style="padding: 28px 32px 0;">
        <span style="font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.18em;">Your submission</span>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 6px;">
          ${rows}
        </table>
      </td>
    </tr>`;
}

export function buildClientEmailHtml(fields: ClientAckFields): string {
  const year = new Date().getFullYear();
  const greeting = firstName(fields.name);
  const next = nextStepsFor(fields.source);

  const stepsList = next.steps
    .map(
      (step, i) => `
      <tr>
        <td style="padding: 8px 0; vertical-align: top; width: 28px;">
          <span style="display: inline-block; width: 22px; height: 22px; background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 11px; font-weight: 700; text-align: center; line-height: 20px; border-radius: 999px;">${i + 1}</span>
        </td>
        <td style="padding: 8px 0 8px 14px; font-size: 14px; color: #27272a; line-height: 1.55;">
          ${esc(step)}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(next.heading)}</title>
</head>
<body style="margin: 0; padding: 0; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #18181b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #fafafa; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background: #ffffff; border: 1px solid #f4f4f5; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td style="padding: 20px 32px; border-bottom: 1px solid #f4f4f5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle;">
                          <div style="width: 22px; height: 22px; background: #ea580c; border-radius: 4px; display: inline-block; vertical-align: middle;"></div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 10px;">
                          <strong style="font-size: 14px; color: #18181b; letter-spacing: -0.01em;">Rashid Iqbal</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; padding: 4px 10px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 999px; font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #c2410c; text-transform: uppercase; letter-spacing: 0.15em;">${esc(next.ctaTitle)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting + next-steps heading -->
          <tr>
            <td style="padding: 32px 32px 8px;">
              <p style="margin: 0 0 18px; font-size: 15px; color: #27272a; line-height: 1.6;">
                Hey <strong style="color: #18181b;">${esc(greeting)}</strong>,
              </p>
              <p style="margin: 0 0 8px; font-size: 15px; color: #27272a; line-height: 1.6;">
                Thanks for reaching out. ${esc(next.heading)}
              </p>
            </td>
          </tr>

          <!-- Numbered next-steps list -->
          <tr>
            <td style="padding: 8px 32px 4px;">
              <span style="font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #ea580c; text-transform: uppercase; letter-spacing: 0.22em;">What happens next</span>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                ${stepsList}
              </table>
            </td>
          </tr>

          <!-- Submission recap (only if fields present) -->
          ${clientSummaryRows(fields)}

          <!-- Personal sign-off -->
          <tr>
            <td style="padding: 28px 32px 4px;">
              <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.6;">
                In the meantime, if anything changes about your scope or timeline,
                just reply to this email. It goes straight to my inbox.
              </p>
              <p style="margin: 18px 0 0; font-size: 14px; color: #18181b; line-height: 1.6;">
                Talk soon,<br>
                <strong>Rashid</strong>
              </p>
            </td>
          </tr>

          <!-- Portfolio links -->
          <tr>
            <td style="padding: 22px 32px 10px;">
              <span style="font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 0.18em;">Recent work</span>
              <p style="margin: 8px 0 0; font-size: 13px; color: #52525b; line-height: 1.7;">
                <a href="https://composio.dev" style="color: #c2410c; text-decoration: none;">Composio</a> ·
                <a href="https://www.crezco.com" style="color: #c2410c; text-decoration: none;">Crezco</a> ·
                <a href="https://vanos.ai" style="color: #c2410c; text-decoration: none;">Vanos AI</a> ·
                <a href="https://update.ai" style="color: #c2410c; text-decoration: none;">UpdateAI</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 32px; border-top: 1px solid #f4f4f5; background: #fafafa;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #71717a;">
                    <a href="https://www.linkedin.com/in/callmerashidiqbal/" style="color: #52525b; text-decoration: none; margin-right: 14px;">LinkedIn</a>
                    <a href="https://www.upwork.com/freelancers/~01b24c107f5b5af596" style="color: #52525b; text-decoration: none; margin-right: 14px;">Upwork</a>
                    <a href="https://www.framer.com/@rashidiqbal" style="color: #52525b; text-decoration: none; margin-right: 14px;">Framer</a>
                    <a href="https://x.com/rashidrealme" style="color: #52525b; text-decoration: none;">X/Twitter</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 10px; font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace; font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.15em;">
                    © ${year} Rashid Iqbal · aestho.xyz
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildClientEmailText(fields: ClientAckFields): string {
  const greeting = firstName(fields.name);
  const next = nextStepsFor(fields.source);
  const submissionSummary = [
    fields.website ? `Website: ${fields.website}` : null,
    fields.services ? `Services: ${fields.services}` : null,
    fields.stack ? `Stack: ${fields.stack}` : null,
    fields.budget ? `Budget: ${fields.budget}` : null,
    fields.timeline ? `Timeline: ${fields.timeline}` : null,
    fields.concern ? `Your concern: ${fields.concern}` : null,
    fields.description ? `\nDescription:\n${fields.description}` : null,
  ].filter(Boolean);

  const lines = [
    `Hey ${greeting},`,
    "",
    `Thanks for reaching out. ${next.heading}`,
    "",
    "What happens next:",
    ...next.steps.map((step, i) => `  ${i + 1}. ${step}`),
    "",
    ...(submissionSummary.length
      ? ["Your submission:", ...submissionSummary.map((line) => `  ${line}`), ""]
      : []),
    "In the meantime, if anything changes about your scope or timeline,",
    "just reply to this email. It goes straight to my inbox.",
    "",
    "Talk soon,",
    "Rashid",
    "",
    "--",
    "Rashid Iqbal — aestho.xyz",
    "LinkedIn · Upwork · Framer · X/Twitter",
  ];
  return lines.join("\n");
}
