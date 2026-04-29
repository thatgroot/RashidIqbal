import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { requireAuth } from "@/lib/auth/require";
import { COLLECTIONS, type CollectionKey } from "@/lib/cms/registry";

// POST /api/cms/[collection]
// Body: any subset of the collection's columns, no id/createdAt/updatedAt.
// Inserts a row, returns it.

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ collection: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { collection } = await context.params;
  const def = COLLECTIONS[collection as CollectionKey];
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  // Strip server-managed columns
  delete body.id;
  delete body.createdAt;
  delete body.updatedAt;

  // Coerce ISO strings to Date for known timestamp fields the editor sends back.
  for (const k of ["publishedAt", "sentAt", "confirmedAt", "unsubscribedAt"]) {
    if (typeof body[k] === "string" && body[k]) {
      body[k] = new Date(body[k] as string);
    } else if (body[k] === "" || body[k] === null) {
      body[k] = null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [row] = await db.insert(def.table as any).values(body as any).returning();
  return NextResponse.json({ row });
}
