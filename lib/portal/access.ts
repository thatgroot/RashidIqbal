import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { readSession, SESSION_COOKIE } from "@/lib/auth/session";
import { readClientSession, PORTAL_COOKIE } from "@/lib/portal/auth";

export type Actor = { kind: "admin"; email: string } | { kind: "client"; clientId: string };

// Resolve who's making the request and whether they're allowed to act on
// the given project. Either an authed admin (sessionCookie aestho_admin)
// or the client that owns the project (aestho_client). Returns either
// { actor, project } or a NextResponse to short-circuit the handler.
export async function resolveProjectActor(
  req: NextRequest,
  projectId: string
): Promise<
  | { actor: Actor; project: typeof schema.projects.$inferSelect }
  | { unauth: NextResponse }
> {
  // Try admin first
  const adminJwt = req.cookies.get(SESSION_COOKIE)?.value;
  const adminSession = await readSession(adminJwt);
  if (adminSession) {
    const [project] = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.id, projectId))
      .limit(1);
    if (!project) {
      return { unauth: NextResponse.json({ error: "not found" }, { status: 404 }) };
    }
    return { actor: { kind: "admin", email: adminSession.email }, project };
  }

  // Then try client
  const clientJwt = req.cookies.get(PORTAL_COOKIE)?.value;
  const clientSession = await readClientSession(clientJwt);
  if (clientSession) {
    const [project] = await db
      .select()
      .from(schema.projects)
      .where(
        and(
          eq(schema.projects.id, projectId),
          eq(schema.projects.clientId, clientSession.client.id)
        )
      )
      .limit(1);
    if (!project) {
      return { unauth: NextResponse.json({ error: "not found" }, { status: 404 }) };
    }
    return {
      actor: { kind: "client", clientId: clientSession.client.id },
      project,
    };
  }

  return { unauth: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
}

// Bump project.updated_at — a small write executed after most mutations
// so the admin project list sorts by recent activity.
export async function touchProject(projectId: string) {
  await db
    .update(schema.projects)
    .set({ updatedAt: new Date() })
    .where(eq(schema.projects.id, projectId));
}
