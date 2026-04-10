import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

// IndexNow: Instantly notify Bing (which powers ChatGPT search) when content changes
// This reduces indexing lag from hours/days to minutes
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "aestho-indexnow-key";

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array required" }, { status: 400 });
    }

    // Submit to IndexNow (Bing + Yandex)
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map((u: string) => u.startsWith("http") ? u : `${SITE_URL}${u}`),
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      submitted: urls.length,
    });
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json({ error: "IndexNow submission failed" }, { status: 500 });
  }
}

// GET: Return the IndexNow key for verification
export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    headers: { "Content-Type": "text/plain" },
  });
}
