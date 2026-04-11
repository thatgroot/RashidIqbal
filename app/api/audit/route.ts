import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5;
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

    // Try Google PageSpeed Insights API
    const apiKey = process.env.GOOGLE_PSI_API_KEY;
    const categories = ["performance", "seo", "accessibility", "best-practices"];
    const keyParam = apiKey ? `&key=${apiKey}` : "";
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&strategy=mobile&${categories.map((c) => `category=${c}`).join("&")}${keyParam}`;

    try {
      const response = await fetch(apiUrl, { signal: AbortSignal.timeout(60000) });

      if (response.ok) {
        const data = await response.json();
        const lighthouse = data.lighthouseResult;

        if (lighthouse?.categories) {
          // Real PSI data available
          const scores = {
            performance: Math.round((lighthouse.categories.performance?.score || 0) * 100),
            seo: Math.round((lighthouse.categories.seo?.score || 0) * 100),
            accessibility: Math.round((lighthouse.categories.accessibility?.score || 0) * 100),
            bestPractices: Math.round((lighthouse.categories["best-practices"]?.score || 0) * 100),
          };

          const audits = lighthouse.audits || {};
          const diagnostics: Record<string, { title: string; score: number | null; description: string }[]> = {
            performance: [],
            seo: [],
            accessibility: [],
            bestPractices: [],
          };

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
            source: "lighthouse",
          });
        }
      }

      // If PSI API failed (rate limited, etc.), log it
      // PSI API unavailable, falling back to lightweight check
    } catch (psiError) {
      // PSI API error, using lightweight check
    }

    // Fallback: Do a lightweight check ourselves
    // Fetch the actual page and analyze basic signals
    try {
      const pageRes = await fetch(cleanUrl, {
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "AesthoAuditBot/1.0" },
        redirect: "follow",
      });

      const html = await pageRes.text();
      // Basic analysis
      const hasViewport = /name=["']viewport["']/i.test(html);
      const hasMetaDesc = /name=["']description["']/i.test(html);
      const hasTitle = /<title[^>]*>.+<\/title>/i.test(html);
      const hasH1 = /<h1[\s>]/i.test(html);
      const hasAltTags = /alt=["'][^"']+["']/i.test(html);
      const hasHttps = cleanUrl.startsWith("https");
      const htmlSize = html.length;
      const hasLargeHtml = htmlSize > 200000;
      const hasOGTags = /property=["']og:/i.test(html);
      const hasCanonical = /rel=["']canonical["']/i.test(html);
      const hasStructuredData = /application\/ld\+json/i.test(html);
      const hasLangAttr = /<html[^>]+lang=/i.test(html);
      const imgCount = (html.match(/<img[\s>]/gi) || []).length;
      const imgsWithAlt = (html.match(/<img[^>]+alt=["'][^"']+["']/gi) || []).length;
      const hasRobotsMeta = /name=["']robots["']/i.test(html);

      // Score calculation (rough but useful)
      let perfScore = 70;
      if (hasLargeHtml) perfScore -= 20;
      if (!hasViewport) perfScore -= 10;
      if (htmlSize < 100000) perfScore += 10;
      if (pageRes.ok) perfScore += 5;
      perfScore = Math.max(20, Math.min(95, perfScore));

      let seoScore = 50;
      if (hasTitle) seoScore += 10;
      if (hasMetaDesc) seoScore += 10;
      if (hasH1) seoScore += 8;
      if (hasOGTags) seoScore += 7;
      if (hasCanonical) seoScore += 5;
      if (hasStructuredData) seoScore += 5;
      if (hasRobotsMeta) seoScore += 3;
      if (hasHttps) seoScore += 2;
      seoScore = Math.min(98, seoScore);

      let a11yScore = 60;
      if (hasLangAttr) a11yScore += 10;
      if (hasViewport) a11yScore += 5;
      if (imgCount > 0 && imgsWithAlt / imgCount > 0.5) a11yScore += 15;
      else if (imgCount > 0) a11yScore -= 10;
      if (hasAltTags) a11yScore += 5;
      a11yScore = Math.max(30, Math.min(95, a11yScore));

      let bpScore = 60;
      if (hasHttps) bpScore += 15;
      if (hasViewport) bpScore += 10;
      if (!hasLargeHtml) bpScore += 5;
      bpScore = Math.max(30, Math.min(95, bpScore));

      const scores = {
        performance: perfScore,
        seo: seoScore,
        accessibility: a11yScore,
        bestPractices: bpScore,
      };

      // Build diagnostics from what we found
      const diagnostics: Record<string, { title: string; score: number | null; description: string }[]> = {
        performance: [],
        seo: [],
        accessibility: [],
        bestPractices: [],
      };

      if (hasLargeHtml) diagnostics.performance.push({ title: "Reduce HTML payload size", score: 0, description: `Page HTML is ${Math.round(htmlSize / 1024)}KB. Consider code splitting and lazy loading.` });
      if (!hasViewport) diagnostics.performance.push({ title: "Missing viewport meta tag", score: 0, description: "Add a viewport meta tag for proper mobile rendering." });

      if (!hasTitle) diagnostics.seo.push({ title: "Missing page title", score: 0, description: "Add a <title> tag for search engine visibility." });
      if (!hasMetaDesc) diagnostics.seo.push({ title: "Missing meta description", score: 0, description: "Add a meta description to improve click-through rates." });
      if (!hasH1) diagnostics.seo.push({ title: "Missing H1 heading", score: 0, description: "Add an H1 tag for the main page heading." });
      if (!hasOGTags) diagnostics.seo.push({ title: "Missing Open Graph tags", score: 0.5, description: "Add OG tags for better social media previews." });
      if (!hasCanonical) diagnostics.seo.push({ title: "Missing canonical URL", score: 0.5, description: "Add a canonical tag to prevent duplicate content." });
      if (!hasStructuredData) diagnostics.seo.push({ title: "No structured data found", score: 0.5, description: "Add JSON-LD schema for richer search results." });

      if (!hasLangAttr) diagnostics.accessibility.push({ title: "Missing lang attribute", score: 0, description: "Add a lang attribute to the <html> element." });
      if (imgCount > 0 && imgsWithAlt / imgCount < 0.5) diagnostics.accessibility.push({ title: "Images missing alt text", score: 0, description: `${imgCount - imgsWithAlt} of ${imgCount} images are missing alt attributes.` });

      if (!hasHttps) diagnostics.bestPractices.push({ title: "Site not using HTTPS", score: 0, description: "Switch to HTTPS for security and SEO benefits." });

      return NextResponse.json({
        url: cleanUrl,
        scores,
        diagnostics,
        fetchedAt: new Date().toISOString(),
        source: "lightweight",
      });
    } catch {
      return NextResponse.json(
        { error: "Could not reach this website. Make sure it's publicly accessible." },
        { status: 422 }
      );
    }
  } catch (error: unknown) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
