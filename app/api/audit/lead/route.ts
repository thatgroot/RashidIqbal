import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, url, scores } = await req.json();

    if (!email || !url) {
      return NextResponse.json({ error: "Email and URL are required" }, { status: 400 });
    }

    // Send lead to Web3Forms (free, sends to your email)
    const webhookKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "4b1bc50d-dffc-462f-9da4-564f12322121";

    if (webhookKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: webhookKey,
          subject: `New Audit Lead: ${url}`,
          from_name: "Aestho Audit Tool",
          email,
          message: `
New lead from the website audit tool.

Email: ${email}
Website: ${url}
Performance: ${scores?.performance || "N/A"}
SEO: ${scores?.seo || "N/A"}
Accessibility: ${scores?.accessibility || "N/A"}
Best Practices: ${scores?.bestPractices || "N/A"}

This person ran an audit on their site and wants the full report. Follow up!
          `.trim(),
        }),
      });
    } else {
      // Fallback: log to console (for development)
      console.log("AUDIT LEAD:", { email, url, scores });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
