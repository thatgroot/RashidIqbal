import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string; todoId: string }> }
) {
  const { id, todoId } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;

  const body = (await req.json().catch(() => ({}))) as {
    completed?: boolean;
    body?: string;
  };
  const update: Record<string, unknown> = {};
  if (typeof body.completed === "boolean") {
    update.completedAt = body.completed ? new Date() : null;
  }
  if (typeof body.body === "string" && body.body.trim()) {
    if (body.body.length > 1000)
      return NextResponse.json({ error: "too long" }, { status: 400 });
    update.body = body.body.trim();
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "no fields" }, { status: 400 });
  }
  await db
    .update(schema.projectTodos)
    .set(update)
    .where(
      and(eq(schema.projectTodos.id, todoId), eq(schema.projectTodos.projectId, id))
    );
  await touchProject(id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string; todoId: string }> }
) {
  const { id, todoId } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;
  await db
    .delete(schema.projectTodos)
    .where(
      and(eq(schema.projectTodos.id, todoId), eq(schema.projectTodos.projectId, id))
    );
  await touchProject(id);
  return NextResponse.json({ ok: true });
}
