import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { requireAuth } from "@/lib/auth/require";
import { emailNewMessage } from "@/lib/portal/message-email";
import { SITE_URL } from "@/lib/constants";
import { triggerProjectEvent } from "@/lib/pusher/server";
import { EV } from "@/lib/pusher/channels";

async function loadProject(projectId: string) {
  const [row] = await db
    .select({
      project: schema.projects,
      client: schema.clients,
    })
    .from(schema.projects)
    .innerJoin(schema.clients, eq(schema.projects.clientId, schema.clients.id))
    .where(eq(schema.projects.id, projectId))
    .limit(1);
  return row ?? null;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { id } = await context.params;
  const messages = await db
    .select()
    .from(schema.projectMessages)
    .where(eq(schema.projectMessages.projectId, id))
    .orderBy(asc(schema.projectMessages.createdAt));
  return NextResponse.json({
    messages: messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })),
  });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { id } = await context.params;
  const body = (await req.json().catch(() => ({}))) as { body?: string };
  if (!body.body || !body.body.trim()) {
    return NextResponse.json({ error: "body required" }, { status: 400 });
  }
  if (body.body.length > 8000) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }
  const ctx = await loadProject(id);
  if (!ctx) return NextResponse.json({ error: "not found" }, { status: 404 });

  const [row] = await db
    .insert(schema.projectMessages)
    .values({
      projectId: id,
      senderType: "admin",
      body: body.body.trim(),
    })
    .returning();
  if (!row) return NextResponse.json({ error: "insert failed" }, { status: 500 });

  await db
    .update(schema.projects)
    .set({ updatedAt: new Date() })
    .where(eq(schema.projects.id, id));

  triggerProjectEvent(id, EV.MESSAGE_NEW, {
    ...row,
    createdAt: row.createdAt.toISOString(),
    readByAdminAt: row.readByAdminAt?.toISOString() ?? null,
    readByClientAt: row.readByClientAt?.toISOString() ?? null,
  }).catch(() => {});

  // Email the client (fire-and-forget).
  emailNewMessage({
    to: ctx.client.email,
    recipientType: "client",
    fromName: "Rashid Iqbal",
    fromEmail:
      process.env.RESEND_FROM_EMAIL?.replace(/^[^<]*<|>$/g, "").trim() ||
      "rashidiqbal.freelance@gmail.com",
    projectTitle: ctx.project.title,
    body: row.body,
    portalLink: `${SITE_URL}/portal/projects/${ctx.project.id}`,
  }).catch(() => {});

  return NextResponse.json({
    message: { ...row, createdAt: row.createdAt.toISOString() },
  });
}
