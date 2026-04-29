import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db/client";
import { and, asc, eq } from "drizzle-orm";
import { getCurrentClientSession } from "@/lib/portal/auth";
import { emailNewMessage } from "@/lib/portal/message-email";
import { SITE_URL } from "@/lib/constants";
import { getPrimaryEmail } from "@/lib/auth/allowlist";

async function requireClientForProject(projectId: string) {
  const session = await getCurrentClientSession();
  if (!session) return { unauth: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };

  const [project] = await db
    .select()
    .from(schema.projects)
    .where(
      and(eq(schema.projects.id, projectId), eq(schema.projects.clientId, session.client.id))
    )
    .limit(1);
  if (!project) {
    return { unauth: NextResponse.json({ error: "not found" }, { status: 404 }) };
  }
  return { session, project };
}

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }
  const guard = await requireClientForProject(projectId);
  if ("unauth" in guard) return guard.unauth;

  const messages = await db
    .select()
    .from(schema.projectMessages)
    .where(eq(schema.projectMessages.projectId, projectId))
    .orderBy(asc(schema.projectMessages.createdAt));

  return NextResponse.json({
    messages: messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })),
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    projectId?: string;
    body?: string;
  };
  if (!body.projectId || !body.body || !body.body.trim()) {
    return NextResponse.json({ error: "projectId and body required" }, { status: 400 });
  }
  if (body.body.length > 8000) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }
  const guard = await requireClientForProject(body.projectId);
  if ("unauth" in guard) return guard.unauth;
  const { session, project } = guard;

  const [row] = await db
    .insert(schema.projectMessages)
    .values({
      projectId: project.id,
      senderType: "client",
      senderClientId: session.client.id,
      body: body.body.trim(),
    })
    .returning();
  if (!row) {
    return NextResponse.json({ error: "insert failed" }, { status: 500 });
  }

  // Bump project.updatedAt so the admin list sorts this one to the top.
  await db
    .update(schema.projects)
    .set({ updatedAt: new Date() })
    .where(eq(schema.projects.id, project.id));

  // Notify admin (fire-and-forget).
  emailNewMessage({
    to: getPrimaryEmail(),
    recipientType: "admin",
    fromName: session.client.name || session.client.email,
    fromEmail: session.client.email,
    projectTitle: project.title,
    body: row.body,
    portalLink: `${SITE_URL}/dashboard/projects/${project.id}`,
  }).catch(() => {});

  return NextResponse.json({
    message: { ...row, createdAt: row.createdAt.toISOString() },
  });
}
