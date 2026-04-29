import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";

// In-memory rate limit: 5 subscribes per IP per hour. Same envelope as
// the rest of the app's public POST routes.
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now - e.ts > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (e.count >= RATE_LIMIT) return true;
  e.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many sign-ups. Try again later." },
      { status: 429 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    name?: string;
    source?: string;
    botcheck?: string;
  };
  if (body.botcheck) {
    // Honeypot — silently 200 so bots don't retry.
    return NextResponse.json({ success: true });
  }
  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }

  // Upsert: same email subscribing twice is idempotent.
  const existing = await db
    .select()
    .from(schema.cmsSubscribers)
    .where(eq(schema.cmsSubscribers.email, email))
    .limit(1);
  if (existing[0]) {
    // If they were unsubscribed, re-confirm.
    if (existing[0].unsubscribedAt) {
      await db
        .update(schema.cmsSubscribers)
        .set({ unsubscribedAt: null, confirmedAt: new Date() })
        .where(eq(schema.cmsSubscribers.id, existing[0].id));
    }
    return NextResponse.json({ success: true, alreadySubscribed: true });
  }

  await db.insert(schema.cmsSubscribers).values({
    email,
    name: body.name?.trim() || null,
    source: body.source?.trim() || "unknown",
    confirmedAt: new Date(), // single-opt-in; can switch to double-opt-in later
  });
  return NextResponse.json({ success: true });
}
