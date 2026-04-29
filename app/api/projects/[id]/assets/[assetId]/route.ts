import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { resolveProjectActor, touchProject } from "@/lib/portal/access";
import { triggerProjectEvent } from "@/lib/pusher/server";
import { EV } from "@/lib/pusher/channels";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string; assetId: string }> }
) {
  const { id, assetId } = await context.params;
  const access = await resolveProjectActor(req, id);
  if ("unauth" in access) return access.unauth;
  await db
    .delete(schema.projectAssets)
    .where(
      and(
        eq(schema.projectAssets.id, assetId),
        eq(schema.projectAssets.projectId, id)
      )
    );
  await touchProject(id);
  triggerProjectEvent(id, EV.ASSET_DELETE, { id: assetId }).catch(() => {});
  return NextResponse.json({ ok: true });
}
