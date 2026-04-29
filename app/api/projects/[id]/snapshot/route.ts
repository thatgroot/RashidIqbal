import { NextRequest, NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor } from "@/lib/portal/access";

// One endpoint, all the project's live state. Drives the realtime
// experience for both portal and dashboard project pages.
//
// The hook polls this every 2.5s while the tab is focused and reads the
// ETag we set so unchanged ticks return 304 with no body. Cuts ~95% of
// the polling cost when nothing is happening on the project.

export const dynamic = "force-dynamic";

function pickProjectFields(p: typeof schema.projects.$inferSelect, isAdmin: boolean) {
  const base = {
    id: p.id,
    title: p.title,
    status: p.status,
    tier: p.tier,
    targetLaunchDate: p.targetLaunchDate?.toISOString() ?? null,
    launchedAt: p.launchedAt?.toISOString() ?? null,
    links: p.links ?? {},
    brief: p.brief ?? {},
    notesShared: p.notesShared ?? "",
    updatedAt: p.updatedAt.toISOString(),
    createdAt: p.createdAt.toISOString(),
  };
  if (isAdmin) {
    return { ...base, notesInternal: p.notesInternal ?? "" };
  }
  return base;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;

  const isAdmin = access.actor.kind === "admin";

  // Pull every concurrent piece of state in a single round trip.
  const [messages, todos, assets] = await Promise.all([
    db
      .select()
      .from(schema.projectMessages)
      .where(eq(schema.projectMessages.projectId, id))
      .orderBy(asc(schema.projectMessages.createdAt)),
    db
      .select()
      .from(schema.projectTodos)
      .where(eq(schema.projectTodos.projectId, id))
      .orderBy(asc(schema.projectTodos.sortOrder), asc(schema.projectTodos.createdAt)),
    db
      .select()
      .from(schema.projectAssets)
      .where(eq(schema.projectAssets.projectId, id))
      .orderBy(desc(schema.projectAssets.createdAt)),
  ]);

  // ETag: max(updatedAt across project + last row of each child table).
  // If the client's If-None-Match matches, we return 304 immediately.
  const project = access.project;
  const lastMsg = messages[messages.length - 1]?.createdAt;
  const lastTodo = todos[todos.length - 1]?.createdAt;
  const lastAsset = assets[0]?.createdAt; // assets ordered desc, so first is latest
  const stamps = [project.updatedAt, lastMsg, lastTodo, lastAsset]
    .filter(Boolean)
    .map((d) => (d as Date).getTime());
  const etag = `"${Math.max(...(stamps.length ? stamps : [0]))}"`;

  const ifNoneMatch = req.headers.get("if-none-match");
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(
    {
      project: pickProjectFields(project, isAdmin),
      actor: { kind: access.actor.kind },
      messages: messages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
        readByAdminAt: m.readByAdminAt?.toISOString() ?? null,
        readByClientAt: m.readByClientAt?.toISOString() ?? null,
      })),
      todos: todos.map((t) => ({
        ...t,
        completedAt: t.completedAt?.toISOString() ?? null,
        createdAt: t.createdAt.toISOString(),
      })),
      assets: assets.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() })),
      snapshotAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { ETag: etag, "Cache-Control": "no-store" },
    }
  );
}
