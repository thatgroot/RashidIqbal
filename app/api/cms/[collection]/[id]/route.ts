import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { requireAuth } from "@/lib/auth/require";
import { COLLECTIONS, type CollectionKey } from "@/lib/cms/registry";

// PATCH /api/cms/[collection]/[id]  — partial update
// DELETE /api/cms/[collection]/[id] — hard delete
// GET /api/cms/[collection]/[id]    — fetch single row

function getDef(collection: string) {
  const def = COLLECTIONS[collection as CollectionKey];
  if (!def) return null;
  return def;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ collection: string; id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { collection, id } = await context.params;
  const def = getDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = def.table as any;
  const [row] = await db.select().from(t).where(eq(t.id, id)).limit(1);
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ row });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ collection: string; id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { collection, id } = await context.params;
  const def = getDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  delete body.id;
  delete body.createdAt;
  // Always bump updatedAt on writes
  body.updatedAt = new Date();
  for (const k of ["publishedAt", "sentAt", "confirmedAt", "unsubscribedAt"]) {
    if (typeof body[k] === "string" && body[k]) {
      body[k] = new Date(body[k] as string);
    } else if (body[k] === "" || body[k] === null) {
      body[k] = null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = def.table as any;
  await db.update(t).set(body).where(eq(t.id, id));
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ collection: string; id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { collection, id } = await context.params;
  const def = getDef(collection);
  if (!def) return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = def.table as any;
  await db.delete(t).where(eq(t.id, id));
  return NextResponse.json({ ok: true });
}
