import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";

// Both admin and client can list / add / toggle / delete todos. The
// resolver checks whichever cookie is present and confirms the project
// is accessible to that actor.

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;
  const rows = await db
    .select()
    .from(schema.projectTodos)
    .where(eq(schema.projectTodos.projectId, id))
    .orderBy(asc(schema.projectTodos.sortOrder), asc(schema.projectTodos.createdAt));
  return NextResponse.json({
    todos: rows.map((r) => ({
      ...r,
      completedAt: r.completedAt ? r.completedAt.toISOString() : null,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;

  const body = (await req.json().catch(() => ({}))) as { body?: string };
  const text = body.body?.trim();
  if (!text) return NextResponse.json({ error: "body required" }, { status: 400 });
  if (text.length > 1000)
    return NextResponse.json({ error: "too long" }, { status: 400 });

  const [row] = await db
    .insert(schema.projectTodos)
    .values({
      projectId: id,
      body: text,
      addedBy: access.actor.kind,
      sortOrder: Math.floor(Date.now() / 1000),
    })
    .returning();
  await touchProject(id);
  if (!row) return NextResponse.json({ error: "insert failed" }, { status: 500 });
  return NextResponse.json({
    todo: {
      ...row,
      completedAt: null,
      createdAt: row.createdAt.toISOString(),
    },
  });
}
