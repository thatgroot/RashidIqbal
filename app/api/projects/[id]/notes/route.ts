import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";

// PATCH /api/projects/[id]/notes
//   { sharedNotes?: string, internalNotes?: string }
//
// `sharedNotes` is editable by both client and admin (visible in both the
// portal detail page and admin detail page). `internalNotes` is admin-
// only — silently ignored when a client tries to set it.

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
  };

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
  return NextResponse.json({ ok: true });
}
