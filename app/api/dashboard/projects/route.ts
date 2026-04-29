import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db/client";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/require";

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    clientEmail?: string;
    clientName?: string;
    tier?: string | null;
    status?: string;
    targetLaunchDate?: string | null;
    sourceFormId?: string | null;
    brief?: Record<string, unknown>;
  };

  const title = body.title?.trim();
  const clientEmail = body.clientEmail?.trim().toLowerCase();
  if (!title || !clientEmail || !clientEmail.includes("@")) {
    return NextResponse.json(
      { error: "title and clientEmail required" },
      { status: 400 }
    );
  }

  // Upsert client by email. We never overwrite an existing name (might
  // have been edited manually); only fill it in when missing.
  const existing = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.email, clientEmail))
    .limit(1);

  let clientRowId: string;
  if (existing[0]) {
    clientRowId = existing[0].id;
    if (!existing[0].name && body.clientName) {
      await db
        .update(schema.clients)
        .set({ name: body.clientName.trim() })
        .where(eq(schema.clients.id, clientRowId));
    }
  } else {
    const [created] = await db
      .insert(schema.clients)
      .values({
        email: clientEmail,
        name: body.clientName?.trim() || null,
      })
      .returning({ id: schema.clients.id });
    if (!created) {
      return NextResponse.json({ error: "client insert failed" }, { status: 500 });
    }
    clientRowId = created.id;
  }

  const [project] = await db
    .insert(schema.projects)
    .values({
      clientId: clientRowId,
      title,
      tier: body.tier || null,
      status: body.status || "kickoff",
      targetLaunchDate: body.targetLaunchDate ? new Date(body.targetLaunchDate) : null,
      sourceFormId: body.sourceFormId || null,
      brief: body.brief && Object.keys(body.brief).length ? body.brief : null,
    })
    .returning({ id: schema.projects.id });
  if (!project) {
    return NextResponse.json({ error: "project insert failed" }, { status: 500 });
  }
  return NextResponse.json({ id: project.id });
}
