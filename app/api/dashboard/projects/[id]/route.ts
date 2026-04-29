import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/require";

// PATCH /api/dashboard/projects/[id] — partial update of any project field.
// Accepts: title, status, tier, targetLaunchDate (ISO date or null),
// launchedAt (ISO or null), notesInternal, links (jsonb), brief (jsonb).

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { id } = await context.params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.title === "string" && body.title.trim()) update.title = body.title.trim();
  if (typeof body.status === "string") update.status = body.status;
  if ("tier" in body) update.tier = body.tier ? String(body.tier) : null;
  if ("targetLaunchDate" in body)
    update.targetLaunchDate = body.targetLaunchDate
      ? new Date(String(body.targetLaunchDate))
      : null;
  if ("launchedAt" in body)
    update.launchedAt = body.launchedAt ? new Date(String(body.launchedAt)) : null;
  if ("notesInternal" in body)
    update.notesInternal =
      typeof body.notesInternal === "string" ? body.notesInternal : null;
  if ("notesShared" in body)
    update.notesShared =
      typeof body.notesShared === "string" ? body.notesShared : null;
  if (body.links && typeof body.links === "object") update.links = body.links;
  if (body.brief && typeof body.brief === "object") update.brief = body.brief;

  await db.update(schema.projects).set(update).where(eq(schema.projects.id, id));
  return NextResponse.json({ ok: true });
}
