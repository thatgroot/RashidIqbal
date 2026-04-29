function esc(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildPortalOtpEmail(opts: {
  code: string;
  expiresAt: Date;
  clientName?: string | undefined;
}) {
  const { code, expiresAt, clientName } = opts;
  const ttlMin = Math.max(1, Math.round((expiresAt.getTime() - Date.now()) / 60000));
  const subject = `Your project portal sign-in code · ${code}`;
  const greeting = clientName ? `Hi ${clientName.split(" ")[0]},` : "Hi,";

  const text = [
    greeting,
    "",
    `Use this code to sign in to your project portal:`,
    "",
    `    ${code}`,
    "",
    `Expires in ${ttlMin} minutes. One-time use.`,
    "",
    "If you didn't try to sign in, ignore this email.",
    "",
    "— Rashid",
  ].join("\n");

  const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>${esc(subject)}</title></head>
<body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafa;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="440" cellspacing="0" cellpadding="0" style="max-width:440px;background:#ffffff;border:1px solid #e4e4e7;">
        <tr><td style="padding:32px 32px 0 32px;">
          <p style="margin:0;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:10px;color:#ea580c;text-transform:uppercase;letter-spacing:0.22em;">Your sign-in code</p>
          <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;letter-spacing:-0.01em;color:#18181b;">${esc(greeting)}</h1>
        </td></tr>
        <tr><td style="padding:24px 32px;">
          <p style="margin:0 0 16px 0;font-size:14px;line-height:1.5;color:#52525b;">
            Use this code to sign in to your project portal.
          </p>
          <div style="background:#fafafa;border:1px solid #e4e4e7;text-align:center;padding:28px 16px;">
            <span style="font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:36px;font-weight:700;letter-spacing:0.4em;color:#18181b;">${esc(code)}</span>
          </div>
          <p style="margin:18px 0 0 0;font-size:14px;line-height:1.5;color:#52525b;">
            Expires in <strong style="color:#18181b;">${ttlMin} minute${ttlMin === 1 ? "" : "s"}</strong>. One-time use.
          </p>
          <p style="margin:14px 0 0 0;font-size:13px;line-height:1.5;color:#a1a1aa;">
            If you didn't request this code, ignore this email.
          </p>
        </td></tr>
        <tr><td style="padding:16px 32px 28px 32px;background:#fafafa;border-top:1px solid #f4f4f5;">
          <p style="margin:0;font-size:11px;color:#a1a1aa;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;letter-spacing:0.12em;text-transform:uppercase;">Aestho · Rashid Iqbal</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}
