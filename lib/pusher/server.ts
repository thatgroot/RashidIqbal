import Pusher from "pusher";
import { PROJECT_CHANNEL } from "./channels";

// Singleton Pusher server. Constructed lazily so route handlers that
// don't touch realtime never instantiate one — and so the absence of
// env vars (e.g. on a fresh local checkout) doesn't crash the build.

declare global {
  // eslint-disable-next-line no-var
  var __pusherServer: Pusher | null | undefined;
}

export function getPusherServer(): Pusher | null {
  if (global.__pusherServer !== undefined) return global.__pusherServer;
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.PUSHER_CLUSTER;
  if (!appId || !key || !secret || !cluster) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[pusher] env vars missing; realtime disabled. Set PUSHER_APP_ID / PUSHER_KEY / PUSHER_SECRET / PUSHER_CLUSTER."
      );
    }
    global.__pusherServer = null;
    return null;
  }
  global.__pusherServer = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });
  return global.__pusherServer;
}

/**
 * Fire-and-forget broadcast. Best-effort — if Pusher is offline or env
 * vars are missing, the call resolves silently. Clients still pick up
 * the change via the polling fallback in useRealtimeProject.
 */
export async function triggerProjectEvent(
  projectId: string,
  event: string,
  payload: unknown
): Promise<void> {
  const pusher = getPusherServer();
  if (!pusher) return;
  try {
    await pusher.trigger(PROJECT_CHANNEL(projectId), event, payload);
  } catch (err) {
    // Network blip / Pusher outage — don't surface to the API caller.
    console.error("[pusher] trigger failed", { projectId, event, err });
  }
}
