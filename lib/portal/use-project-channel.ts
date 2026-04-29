"use client";

import { useEffect, useRef, useState } from "react";
import Pusher, { type Channel } from "pusher-js";
import { EV, PROJECT_CHANNEL } from "@/lib/pusher/channels";

// Singleton Pusher client. Multiple components on the same page share
// one connection. Initialized lazily so SSR + Pusher-not-configured
// never throws.

declare global {
  // eslint-disable-next-line no-var
  var __pusherClient: Pusher | null | undefined;
}

function getPusherClient(): Pusher | null {
  if (typeof window === "undefined") return null;
  if (global.__pusherClient !== undefined) return global.__pusherClient;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
  if (!key || !cluster) {
    global.__pusherClient = null;
    return null;
  }
  global.__pusherClient = new Pusher(key, {
    cluster,
    authEndpoint: "/api/pusher/auth",
    forceTLS: true,
  });
  return global.__pusherClient;
}

export type TypingPayload = { who: "admin" | "client"; name?: string };

export type ProjectChannelHandlers = {
  onMessage?: (m: unknown) => void;
  onTodoUpsert?: (t: unknown) => void;
  onTodoDelete?: (id: string) => void;
  onAssetUpsert?: (a: unknown) => void;
  onAssetDelete?: (id: string) => void;
  onNotesUpdate?: (p: unknown) => void;
  onProjectUpdate?: (p: unknown) => void;
  onTyping?: (p: TypingPayload) => void;
};

/**
 * Subscribe to the project's private Pusher channel and dispatch
 * incoming events to the supplied handlers. Returns a `connected`
 * flag and a `triggerTyping(name)` callback for emitting the
 * client-typing event.
 *
 * If Pusher isn't configured (env vars missing), the hook is a no-op
 * and returns connected: false. Callers should keep their existing
 * polling fallback active in that case.
 */
export function useProjectChannel(projectId: string, handlers: ProjectChannelHandlers) {
  const [connected, setConnected] = useState(false);
  const channelRef = useRef<Channel | null>(null);
  const handlersRef = useRef(handlers);
  // Keep the latest handlers in a ref so the subscribe effect can stay
  // stable while still calling current callbacks.
  handlersRef.current = handlers;

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe(PROJECT_CHANNEL(projectId));
    channelRef.current = channel;

    const onSubSucceeded = () => setConnected(true);
    const onSubError = () => setConnected(false);
    channel.bind("pusher:subscription_succeeded", onSubSucceeded);
    channel.bind("pusher:subscription_error", onSubError);

    const handle = (eventName: string, dispatch: (payload: unknown) => void) => {
      const fn = (data: unknown) => dispatch(data);
      channel.bind(eventName, fn);
      return () => channel.unbind(eventName, fn);
    };

    const cleanups = [
      handle(EV.MESSAGE_NEW, (p) => handlersRef.current.onMessage?.(p)),
      handle(EV.TODO_UPSERT, (p) => handlersRef.current.onTodoUpsert?.(p)),
      handle(EV.TODO_DELETE, (p) =>
        handlersRef.current.onTodoDelete?.((p as { id: string }).id)
      ),
      handle(EV.ASSET_UPSERT, (p) => handlersRef.current.onAssetUpsert?.(p)),
      handle(EV.ASSET_DELETE, (p) =>
        handlersRef.current.onAssetDelete?.((p as { id: string }).id)
      ),
      handle(EV.NOTES_UPDATE, (p) => handlersRef.current.onNotesUpdate?.(p)),
      handle(EV.PROJECT_UPDATE, (p) => handlersRef.current.onProjectUpdate?.(p)),
      handle(EV.TYPING, (p) =>
        handlersRef.current.onTyping?.(p as TypingPayload)
      ),
    ];

    return () => {
      channel.unbind("pusher:subscription_succeeded", onSubSucceeded);
      channel.unbind("pusher:subscription_error", onSubError);
      cleanups.forEach((c) => c());
      pusher.unsubscribe(PROJECT_CHANNEL(projectId));
      channelRef.current = null;
      setConnected(false);
    };
  }, [projectId]);

  // Throttle typing events: at most one per 1.5s on the wire.
  const lastTypingRef = useRef(0);
  function triggerTyping(payload: TypingPayload) {
    const channel = channelRef.current;
    if (!channel) return;
    const now = Date.now();
    if (now - lastTypingRef.current < 1500) return;
    lastTypingRef.current = now;
    try {
      channel.trigger(EV.TYPING, payload);
    } catch {
      // Pusher rejects client-events when disabled in the dashboard.
      // Fail silent — typing is non-critical.
    }
  }

  return { connected, triggerTyping };
}
