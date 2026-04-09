import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a few minutes." },
        { status: 429 }
      );
    }

    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    let cleanUrl: string;
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      cleanUrl = parsed.toString();
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Call Google PageSpeed Insights API (free, no key required for basic usage)
    const categories = ["performance", "seo", "accessibility", "best-practices"];
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&strategy=mobile&${categories.map((c) => `category=${c}`).join("&")}`;

    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });

    if (!response.ok) {
      const text = await response.text();
      console.error("PSI API error:", text);
      return NextResponse.json(
        { error: "Could not analyze this URL. Make sure the site is publicly accessible." },
        { status: 422 }
      );
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;

    if (!lighthouse?.categories) {
      return NextResponse.json(
        { error: "Could not get results for this URL." },
        { status: 422 }
      );
    }

    // Extract scores
    const scores = {
      performance: Math.round((lighthouse.categories.performance?.score || 0) * 100),
      seo: Math.round((lighthouse.categories.seo?.score || 0) * 100),
      accessibility: Math.round((lighthouse.categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((lighthouse.categories["best-practices"]?.score || 0) * 100),
    };

    // Extract top diagnostics per category
    const audits = lighthouse.audits || {};
    const diagnostics: Record<string, { title: string; score: number | null; description: string }[]> = {
      performance: [],
      seo: [],
      accessibility: [],
      bestPractices: [],
    };

    // Get failed/warning audits for each category
    for (const cat of categories) {
      const catKey = cat === "best-practices" ? "bestPractices" : cat;
      const refs = lighthouse.categories[cat]?.auditRefs || [];
      const issues = refs
        .filter((ref: { id: string; weight: number }) => {
          const audit = audits[ref.id];
          return audit && audit.score !== null && audit.score < 1 && ref.weight > 0;
        })
        .sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight)
        .slice(0, 5)
        .map((ref: { id: string }) => {
          const audit = audits[ref.id];
          return {
            title: audit.title,
            score: audit.score,
            description: (audit.description || "").split("[Learn more]")[0].trim(),
          };
        });
      diagnostics[catKey] = issues;
    }

    return NextResponse.json({
      url: cleanUrl,
      scores,
      diagnostics,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
