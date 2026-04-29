import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require";
import { markRead, setArchived, setStar } from "@/lib/dashboard/inbox-queries";

// PATCH /api/dashboard/inbox/[id]
//   { read?: boolean, starred?: boolean, archived?: boolean }
//
// Each field is optional; passing only the fields that should change
// avoids race conditions between two open browser tabs.

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { id } = await context.params;
  const body = (await req.json().catch(() => ({}))) as {
    read?: boolean;
    starred?: boolean;
    archived?: boolean;
  };

  if (typeof body.read === "boolean") await markRead(id, body.read);
  if (typeof body.starred === "boolean") await setStar(id, body.starred);
  if (typeof body.archived === "boolean") await setArchived(id, body.archived);

  return NextResponse.json({ ok: true });
}
