import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";
import { triggerProjectEvent } from "@/lib/pusher/server";
import { EV } from "@/lib/pusher/channels";

// PATCH /api/projects/[id]/notes
//   { sharedNotes?: string, internalNotes?: string, baseUpdatedAt?: ISO }
//
// `sharedNotes` is editable by both client and admin. `internalNotes` is
// admin-only — silently ignored when a client tries to set it.
//
// Concurrency (Phase A2): when `baseUpdatedAt` is supplied, the server
// rejects the patch with 409 if `projects.updated_at` has moved since the
// client's last snapshot. Clients on receipt clear their local edit and
// pull the latest remote text in via the next snapshot poll.

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;

  const body = (await req.json().catch(() => ({}))) as {
    sharedNotes?: string | null;
    internalNotes?: string | null;
    baseUpdatedAt?: string;
  };

  // Conflict detection: if the caller provided a baseUpdatedAt and the
  // project has moved since, refuse the write.
  if (body.baseUpdatedAt) {
    const baseTime = new Date(body.baseUpdatedAt).getTime();
    const currentTime = new Date(access.project.updatedAt).getTime();
    // Allow a tiny grace window (1500ms) so back-to-back saves from the
    // same client don't trip on themselves.
    if (Number.isFinite(baseTime) && currentTime - baseTime > 1500) {
      return NextResponse.json(
        { error: "conflict", currentUpdatedAt: access.project.updatedAt.toISOString() },
        { status: 409 }
      );
    }
  }

  const update: Record<string, unknown> = {};
  if ("sharedNotes" in body) {
    update.notesShared =
      typeof body.sharedNotes === "string" ? body.sharedNotes : null;
  }
  if ("internalNotes" in body && access.actor.kind === "admin") {
    update.notesInternal =
      typeof body.internalNotes === "string" ? body.internalNotes : null;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "no fields" }, { status: 400 });
  }
  await db.update(schema.projects).set(update).where(eq(schema.projects.id, id));
  await touchProject(id);
  // Only broadcast the field that actually moved. The internal note never
  // leaves the server when the actor isn't admin (the access guard above
  // dropped it from `update`).
  const broadcast: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if ("notesShared" in body) broadcast.notesShared = body.sharedNotes ?? "";
  if ("internalNotes" in body && access.actor.kind === "admin") {
    broadcast.notesInternal = body.internalNotes ?? "";
  }
  triggerProjectEvent(id, EV.NOTES_UPDATE, broadcast).catch(() => {});
  return NextResponse.json({ ok: true });
}
