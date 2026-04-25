import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

// IndexNow protocol: instantly notify Bing (which powers ChatGPT search) and
// Yandex when content changes. Reduces indexing lag from hours/days to minutes.
//
// Setup, per https://www.bing.com/indexnow/getstarted :
//   1. Set INDEXNOW_KEY in env (committed default below as a safe fallback —
//      the key is public-by-design and only matches submissions to this host).
//   2. Host a UTF-8 text file at /<key>.txt containing the same key. Lives at
//      /public/<key>.txt and serves at the site root.
//   3. POST {urls: [...]} to /api/indexnow to push URLs to api.indexnow.org.
//
// IndexNow response codes:
//   200 OK             — URLs accepted (does not guarantee indexing)
//   400 Bad Request    — invalid format
//   403 Forbidden      — key invalid (file missing or content mismatch)
//   422 Unprocessable  — URLs do not belong to host, or key/schema mismatch
//   429 Too Many       — rate limited
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "fb384adffefd4410b19bc7fa7e6c8b21";
const HOST = new URL(SITE_URL).hostname;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

function absolutize(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? `${SITE_URL}${url}` : `${SITE_URL}/${url}`;
}

function belongsToHost(url: string): boolean {
  try {
    return new URL(url).hostname === HOST;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: { urls?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawUrls = body.urls;
  if (!Array.isArray(rawUrls) || rawUrls.length === 0) {
    return NextResponse.json(
      { error: "`urls` must be a non-empty array of strings" },
      { status: 400 }
    );
  }

  // Normalize to absolute URLs and validate they belong to our host. IndexNow
  // returns 422 if any URL is off-host, so we reject early with a clearer
  // error and the offending URL list.
  const absolute = rawUrls.map((u) => absolutize(String(u)));
  const offHost = absolute.filter((u) => !belongsToHost(u));
  if (offHost.length > 0) {
    return NextResponse.json(
      {
        error: `URLs must be on host ${HOST}`,
        invalidUrls: offHost,
      },
      { status: 400 }
    );
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: absolute,
      }),
    });

    // IndexNow returns 200 with empty body on success and an error code with a
    // human-readable message on failure. Echo both so callers can debug.
    const responseText = await res.text().catch(() => "");

    return NextResponse.json(
      {
        success: res.ok,
        status: res.status,
        submitted: absolute.length,
        urls: absolute,
        indexnowResponse: responseText || null,
      },
      { status: res.ok ? 200 : res.status }
    );
  } catch (err) {
    console.error("[indexnow] submission failed:", err);
    return NextResponse.json(
      { error: "IndexNow submission failed" },
      { status: 500 }
    );
  }
}

// GET returns the IndexNow config as JSON for sanity-checking from a browser.
// Useful when verifying that the deployed env actually carries the key and
// that keyLocation resolves to the file you hosted in /public.
export async function GET() {
  return NextResponse.json({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    docs: "https://www.bing.com/indexnow/getstarted",
    submit: {
      method: "POST",
      url: `${SITE_URL}/api/indexnow`,
      body: { urls: ["/blog/example-slug", `${SITE_URL}/blog/another`] },
    },
  });
}
