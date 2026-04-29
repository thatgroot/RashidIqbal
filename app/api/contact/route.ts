import { NextRequest, NextResponse } from "next/server";
import { logFormSubmission } from "@/lib/forms/log-submission";
import { logAnalyticsFormSubmit } from "@/lib/forms/log-analytics-event";

// Where inquiry/lead emails should land
const RECIPIENT_EMAIL = "rashidiqbal.freelance@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, website, location, pageCount, budget, timeline, description, services, subject, to, cc, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // Persist to the inbox before the dispatch. Logging is best-effort and
    // never blocks the email send.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    await logFormSubmission({
      source: source || "contact",
      email,
      subject: subject || "New Portfolio Inquiry",
      name,
      website,
      body: { location, pageCount, budget, timeline, description, services, to, cc },
      visitorCookie: req.cookies.get("aestho_v")?.value,
      sessionCookie: req.cookies.get("aestho_s")?.value,
      ip,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    // Server-only environment variable
    const accessKey = process.env.WEB3FORMS_KEY;

    if (!accessKey) {
      console.error("[contact-api] WEB3FORMS_KEY is not configured.");
      return NextResponse.json(
        { error: "Email delivery not configured on the server." },
        { status: 500 }
      );
    }

    // Build the final message content for Web3Forms
    let finalMessage = "";
    
    if (source === "exit-intent") {
        finalMessage = `New audit request from exit intent popup.\n\nEmail: ${email}\nWebsite: ${website || "N/A"}`;
    } else {
        finalMessage = `New project inquiry from ${name || "Client"}.

Name: ${name || "N/A"}
Email: ${email}
Website: ${website || "N/A"}
Location: ${location || "N/A"}
Services: ${services || "N/A"}
${pageCount ? `Approximate Pages: ${pageCount}\n` : ""}Budget: ${budget || "N/A"}
Timeline: ${timeline || "N/A"}

Description:
${description || "N/A"}`;
    }

    // Build FormData for more reliable server-side submission
    const submitData = new FormData();
    submitData.append("access_key", accessKey);
    submitData.append("to", to || RECIPIENT_EMAIL);
    if (cc) submitData.append("cc", cc);
    submitData.append("subject", subject || "New Portfolio Inquiry");
    submitData.append("from_name", "Aestho Portfolio");
    submitData.append("email", email);
    submitData.append("replyto", email);
    submitData.append("message", finalMessage.trim());
    submitData.append("botcheck", "");

    // Submit to Web3Forms server-side
    const w3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: submitData,
    });

    const w3Body = await w3Res.json().catch(() => ({}));

    if (!w3Res.ok || w3Body?.success === false) {
      console.error("[contact-api] Web3Forms Error:", w3Res.status, w3Body);
      return NextResponse.json(
        { error: w3Body?.message || "Failed to deliver the message. Please email directly." },
        { status: 502 }
      );
    }

    // Belt-and-suspenders form_submit event so funnels reflect the
    // conversion even if the client tracker missed it.
    logAnalyticsFormSubmit({
      visitorCookie: req.cookies.get("aestho_v")?.value,
      sessionCookie: req.cookies.get("aestho_s")?.value,
      path: req.headers.get("referer") || undefined,
      target: `server.contact.${source || "contact"}`,
      properties: { services, budget, timeline },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact-api] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send. Try again." }, { status: 500 });
  }
}
