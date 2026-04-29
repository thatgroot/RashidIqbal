import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";

export const ASSET_KINDS = [
  "figma",
  "framer",
  "notion",
  "google",
  "github",
  "video",
  "image",
  "link",
] as const;

// Sniff a sensible kind from the URL so the user doesn't have to pick.
function detectKind(url: string): (typeof ASSET_KINDS)[number] {
  const u = url.toLowerCase();
  if (u.includes("figma.com")) return "figma";
  if (u.includes("framer.com") || u.includes("framer.website")) return "framer";
  if (u.includes("notion.so") || u.includes("notion.site")) return "notion";
  if (
    u.includes("docs.google.com") ||
    u.includes("drive.google.com") ||
    u.includes("sheets.google.com") ||
    u.includes("slides.google.com")
  )
    return "google";
  if (u.includes("github.com")) return "github";
  if (
    u.includes("youtube.com") ||
    u.includes("youtu.be") ||
    u.includes("loom.com") ||
    u.includes("vimeo.com")
  )
    return "video";
  if (/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(u)) return "image";
  return "link";
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;
  const rows = await db
    .select()
    .from(schema.projectAssets)
    .where(eq(schema.projectAssets.projectId, id))
    .orderBy(desc(schema.projectAssets.createdAt));
  return NextResponse.json({
    assets: rows.map((r) => ({
      ...r,
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

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    url?: string;
    kind?: string;
  };
  const name = body.name?.trim();
  const url = body.url?.trim();
  if (!name || !url) {
    return NextResponse.json({ error: "name and url required" }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "url must start with http(s)://" }, { status: 400 });
  }
  if (name.length > 200 || url.length > 1000) {
    return NextResponse.json({ error: "too long" }, { status: 400 });
  }
  const kind =
    body.kind && (ASSET_KINDS as readonly string[]).includes(body.kind)
      ? body.kind
      : detectKind(url);

  const [row] = await db
    .insert(schema.projectAssets)
    .values({
      projectId: id,
      name,
      url,
      kind,
      addedBy: access.actor.kind,
    })
    .returning();
  await touchProject(id);
  if (!row) return NextResponse.json({ error: "insert failed" }, { status: 500 });
  return NextResponse.json({
    asset: { ...row, createdAt: row.createdAt.toISOString() },
  });
}
