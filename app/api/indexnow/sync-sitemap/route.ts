import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

// IndexNow auto-sync: fetch the live sitemap and submit every URL inside to
// api.indexnow.org in one shot. Designed to be triggered:
//
//   1. By Vercel's built-in cron (vercel.json) — fires daily and Vercel
//      attaches Authorization: Bearer ${CRON_SECRET} automatically.
//   2. Manually after a deploy (GitHub Action, deploy webhook, curl) — pass
//      ?secret=… or `Authorization: Bearer …` matching INDEXNOW_SYNC_SECRET.
//
// If neither secret is configured we accept any caller. The endpoint is
// idempotent (IndexNow dedupes), low-rate, and only re-pings Bing for URLs
// already on the sitemap, so there is no abuse vector even when unsecured —
// adding a secret is hardening, not a hard requirement.
//
// IndexNow accepts up to 10,000 URLs per request; we batch at 1,000 to keep
// individual responses small and to stay polite under their rate limits.

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // never cache; always fetch fresh sitemap

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "fb384adffefd4410b19bc7fa7e6c8b21";
const HOST = new URL(SITE_URL).hostname;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const BATCH_SIZE = 1000;

// Auth: accept either Vercel's CRON_SECRET (for the scheduled job) or our
// own INDEXNOW_SYNC_SECRET (for manual deploy hooks). If neither env var is
// set, the endpoint is open — see comment block above for the rationale.
function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const ourSecret = process.env.INDEXNOW_SYNC_SECRET;

  if (!cronSecret && !ourSecret) return true;

  const url = new URL(req.url);
  const queryToken = url.searchParams.get("secret") ?? "";
  const authHeader = req.headers.get("authorization") ?? "";
  const headerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (cronSecret && headerToken === cronSecret) return true;
  if (ourSecret && (queryToken === ourSecret || headerToken === ourSecret)) return true;

  return false;
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { "User-Agent": "aestho-indexnow-sync/1.0" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status}`);
  }
  const xml = await res.text();
  // Extract <loc>...</loc> URLs. Sitemap is well-formed so a regex is fine
  // for this scale; switch to a real XML parser if we ever ship a sitemap
  // with CDATA or namespace prefixes that confuse the simple match.
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) ?? [];
  const urls = matches.map((m) => m.slice(5, -6).trim()).filter(Boolean);

  // Filter to URLs that actually belong to our host. IndexNow rejects
  // off-host URLs with a 422.
  return urls.filter((u) => {
    try {
      return new URL(u).hostname === HOST;
    } catch {
      return false;
    }
  });
}

type BatchResult = {
  ok: boolean;
  status: number;
  count: number;
  body: string;
};

async function submitBatch(urls: string[]): Promise<BatchResult> {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });
    return {
      ok: res.ok,
      status: res.status,
      count: urls.length,
      body: (await res.text().catch(() => "")) || "",
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      count: urls.length,
      body: err instanceof Error ? err.message : "unknown fetch error",
    };
  }
}

async function handle(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let urls: string[];
  try {
    urls = await fetchSitemapUrls();
  } catch (err) {
    console.error("[indexnow-sync] sitemap fetch failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sitemap fetch failed" },
      { status: 502 }
    );
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { error: "Sitemap returned 0 URLs on this host" },
      { status: 502 }
    );
  }

  // Split into batches of BATCH_SIZE and submit in parallel
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }
  const results = await Promise.all(batches.map(submitBatch));

  const allOk = results.every((r) => r.ok);
  return NextResponse.json(
    {
      success: allOk,
      submitted: urls.length,
      batches: results.length,
      results: results.map((r) => ({
        status: r.status,
        count: r.count,
        body: r.body || null,
      })),
    },
    { status: allOk ? 200 : 502 }
  );
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
