import { NextRequest, NextResponse } from "next/server";
import { cancelDripForSubmission, cancelDripForEmail } from "@/lib/email-drip/sequencer";

// One-click unsubscribe for the 5-step drip. Linked from every drip email.
// We cancel by submission id (preferred — narrow scope) and also by email
// (defensive — covers the case where the same address has multiple
// submissions and the recipient really wants no more drip mail at all).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || "";
  const email = url.searchParams.get("e") || "";

  let canceled = 0;
  if (id) {
    canceled += await cancelDripForSubmission({
      submissionId: id,
      reason: "unsubscribed",
    }).catch(() => 0);
  }
  if (email) {
    canceled += await cancelDripForEmail({
      email,
      reason: "unsubscribed",
    }).catch(() => 0);
  }

  return new NextResponse(
    `<!doctype html>
<meta charset="utf-8">
<title>Unsubscribed</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafaf9;color:#18181b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px}
.card{max-width:420px;background:#fff;border:1px solid #e4e4e7;padding:32px;text-align:center}
h1{font-size:20px;margin:0 0 8px}
p{font-size:14px;color:#52525b;line-height:1.6;margin:0 0 16px}
a{color:#c2410c;text-decoration:none;font-weight:600}
</style>
<div class="card">
<h1>You're unsubscribed.</h1>
<p>No more follow-ups will go to ${email ? email.replace(/[<>"']/g, "") : "you"}.${
      canceled ? ` (${canceled} pending message${canceled === 1 ? "" : "s"} canceled.)` : ""
    }</p>
<p>If this was a mistake, just reply to any of the previous emails — I'll re-add you manually.</p>
<p><a href="/">Back to aestho.xyz</a></p>
</div>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
