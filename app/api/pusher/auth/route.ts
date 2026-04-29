import { NextRequest, NextResponse } from "next/server";
import { getPusherServer } from "@/lib/pusher/server";
import { resolveProjectActor } from "@/lib/portal/access";

// Pusher private-channel handshake.
//
// Browser does: pusher.subscribe("private-project-<id>").
// pusher-js POSTs here with { socket_id, channel_name }; we authorize
// the subscription only if the visitor is allowed to view the project
// (admin OR the client that owns it). Returns Pusher's signed auth
// blob.
//
// Channels look like `private-project-<UUID>`. Anything else is
// rejected so a malicious client can't sniff arbitrary channels.

const CHANNEL_RE = /^private-project-([0-9a-f-]{36})$/i;

export async function POST(req: NextRequest) {
  const pusher = getPusherServer();
  if (!pusher) {
    return NextResponse.json({ error: "realtime disabled" }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const socketId = form?.get("socket_id")?.toString();
  const channel = form?.get("channel_name")?.toString();
  if (!socketId || !channel) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const m = CHANNEL_RE.exec(channel);
  if (!m) {
    return NextResponse.json({ error: "channel not allowed" }, { status: 403 });
  }
  const projectId = m[1]!;

  const access = await resolveProjectActor(req, projectId);
  if ("unauth" in access) return access.unauth;

  // pusher.authorizeChannel returns the signed payload Pusher expects.
  const auth = pusher.authorizeChannel(socketId, channel);
  return NextResponse.json(auth);
}
