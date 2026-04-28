// OTP email template. Standalone (not coupled to lead-email-template.ts) so
// we can swap copy without thinking about lead branches.

function esc(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildOtpEmail(opts: {
  code: string;
  expiresAt: Date;
  ip?: string | undefined;
  userAgent?: string | undefined;
}) {
  const { code, expiresAt, ip, userAgent } = opts;
  const ttlMin = Math.max(1, Math.round((expiresAt.getTime() - Date.now()) / 60000));

  const subject = `Your Aestho dashboard code is ${code}`;

  const meta: string[] = [];
  if (ip) meta.push(`IP: ${ip}`);
  if (userAgent) meta.push(`Device: ${userAgent.slice(0, 80)}`);

  const text = [
    `Your Aestho dashboard code:`,
    ``,
    `    ${code}`,
    ``,
    `Code expires in ${ttlMin} minutes. One-time use.`,
    ``,
    `If you didn't request this, ignore this email.`,
    meta.length ? `\nRequest details: ${meta.join(" · ")}` : "",
    ``,
    `— Aestho`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafa;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="440" cellspacing="0" cellpadding="0" style="max-width:440px;background:#ffffff;border:1px solid #e4e4e7;">
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <p style="margin:0;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:10px;color:#ea580c;text-transform:uppercase;letter-spacing:0.22em;">Sign in code</p>
              <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;letter-spacing:-0.01em;color:#18181b;">Your dashboard code</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;">
              <div style="background:#fafafa;border:1px solid #e4e4e7;text-align:center;padding:28px 16px;">
                <span style="font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:36px;font-weight:700;letter-spacing:0.4em;color:#18181b;">${esc(code)}</span>
              </div>
              <p style="margin:18px 0 0 0;font-size:14px;line-height:1.5;color:#52525b;">
                Enter this code in the dashboard sign-in page. It expires in
                <strong style="color:#18181b;">${ttlMin} minute${ttlMin === 1 ? "" : "s"}</strong> and can be used once.
              </p>
              <p style="margin:14px 0 0 0;font-size:13px;line-height:1.5;color:#a1a1aa;">
                If you didn't request this code, ignore this email — no one can sign in without it.
              </p>
            </td>
          </tr>
          ${
            meta.length
              ? `<tr>
                  <td style="padding:0 32px 24px 32px;">
                    <div style="border-top:1px solid #f4f4f5;padding-top:16px;">
                      <p style="margin:0 0 6px 0;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;font-size:9px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.18em;">Request details</p>
                      <p style="margin:0;font-size:12px;color:#71717a;line-height:1.5;">${meta.map(esc).join(" &middot; ")}</p>
                    </div>
                  </td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding:16px 32px 28px 32px;background:#fafafa;border-top:1px solid #f4f4f5;">
              <p style="margin:0;font-size:11px;color:#a1a1aa;font-family:'SFMono-Regular',ui-monospace,Menlo,monospace;letter-spacing:0.12em;text-transform:uppercase;">Aestho &middot; Rashid Iqbal</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
