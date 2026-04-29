import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/require";
import { triggerProjectEvent } from "@/lib/pusher/server";
import { EV } from "@/lib/pusher/channels";

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

  // Broadcast the updated fields so both project pages sync without poll.
  // notesInternal stays admin-only by design — never include it here even
  // though admin is the only one who can set it. The portal-side hook
  // doesn't render internal notes, but defensive omission protects against
  // future changes that might.
  const broadcast: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };
  for (const k of [
    "title",
    "status",
    "tier",
    "targetLaunchDate",
    "launchedAt",
    "links",
    "brief",
    "notesShared",
  ] as const) {
    if (k in update) {
      const v = update[k];
      broadcast[k] = v instanceof Date ? v.toISOString() : v;
    }
  }
  triggerProjectEvent(id, EV.PROJECT_UPDATE, broadcast).catch(() => {});
  return NextResponse.json({ ok: true });
}
