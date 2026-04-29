import { Resend } from "resend";

function esc(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function senderFor(displayName: string) {
  const base =
    process.env.RESEND_FROM_EMAIL?.replace(/^[^<]*<|>$/g, "").trim() ||
    "onboarding@resend.dev";
  return `${displayName} <${base}>`;
}

export async function emailNewMessage(opts: {
  to: string;
  recipientType: "admin" | "client";
  fromName: string; // who wrote it
  fromEmail: string; // for replyTo
  projectTitle: string;
  body: string;
  portalLink: string; // /portal/projects/<id> or /dashboard/projects/<id>
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[portal/email] RESEND_API_KEY not configured");
    return;
  }
  const senderDisplay = opts.recipientType === "client" ? "Rashid Iqbal" : "Aestho Portal";
  const subject =
    opts.recipientType === "client"
      ? `New message on "${opts.projectTitle}"`
      : `New message from ${opts.fromName} · ${opts.projectTitle}`;

  const text = [
    `${opts.fromName} sent a new message on "${opts.projectTitle}":`,
    "",
    opts.body,
    "",
    `Reply in the portal: ${opts.portalLink}`,
    "",
    "— Aestho",
  ].join("\n");

  const bodyHtml = esc(opts.body).replace(/\n/g, "<br/>");

  const html = /* html */ `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>${esc(subject)}</title></head>
<body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafa;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border:1px solid #e4e4e7;">
        <tr><td style="padding:24px 28px 0 28px;">
          <p style="margin:0;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:10px;color:#ea580c;text-transform:uppercase;letter-spacing:0.22em;">New message · ${esc(opts.projectTitle)}</p>
          <h1 style="margin:6px 0 0 0;font-size:20px;font-weight:700;letter-spacing:-0.01em;color:#18181b;">From ${esc(opts.fromName)}</h1>
        </td></tr>
        <tr><td style="padding:18px 28px 4px 28px;">
          <div style="background:#fafafa;border-left:3px solid #ea580c;padding:14px 16px;font-size:14px;line-height:1.55;color:#27272a;">${bodyHtml}</div>
        </td></tr>
        <tr><td style="padding:20px 28px 24px 28px;">
          <a href="${esc(opts.portalLink)}" style="display:inline-block;padding:10px 18px;background:#18181b;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.01em;">Open the portal &rarr;</a>
          <p style="margin:14px 0 0 0;font-size:12px;color:#a1a1aa;">Reply directly to this email and Rashid will see it too.</p>
        </td></tr>
        <tr><td style="padding:14px 28px 22px 28px;background:#fafafa;border-top:1px solid #f4f4f5;">
          <p style="margin:0;font-size:11px;color:#a1a1aa;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;letter-spacing:0.12em;text-transform:uppercase;">Aestho · Rashid Iqbal</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: senderFor(senderDisplay),
      to: opts.to,
      replyTo: opts.fromEmail,
      subject,
      html,
      text,
    });
  } catch (err) {
    // Best-effort. Message already saved to DB; UI rendering is unaffected.
    console.error("[portal/email] send failed", err);
  }
}
