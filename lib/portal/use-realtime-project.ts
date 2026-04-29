"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProjectChannel, type TypingPayload } from "./use-project-channel";

// Types must stay in sync with the snapshot endpoint payload.

export type SnapshotMessage = {
  id: string;
  projectId: string;
  senderType: string;
  senderClientId: string | null;
  body: string;
  createdAt: string;
  readByAdminAt: string | null;
  readByClientAt: string | null;
  attachments: { name: string; url: string }[] | null;
};

export type SnapshotTodo = {
  id: string;
  body: string;
  completedAt: string | null;
  addedBy: string;
  sortOrder: number;
  createdAt: string;
};

export type SnapshotAsset = {
  id: string;
  name: string;
  url: string;
  kind: string;
  addedBy: string;
  createdAt: string;
};

export type SnapshotProject = {
  id: string;
  title: string;
  status: string;
  tier: string | null;
  targetLaunchDate: string | null;
  launchedAt: string | null;
  links: Record<string, string>;
  brief: Record<string, unknown>;
  notesShared: string;
  notesInternal?: string;
  updatedAt: string;
  createdAt: string;
};

export type Snapshot = {
  project: SnapshotProject;
  actor: { kind: "admin" | "client" };
  messages: SnapshotMessage[];
  todos: SnapshotTodo[];
  assets: SnapshotAsset[];
  snapshotAt: string;
};

type Initial = {
  project: SnapshotProject;
  messages: SnapshotMessage[];
  todos: SnapshotTodo[];
  assets: SnapshotAsset[];
};

// When Pusher is connected, polling drops to a slow safety-net cadence
// — the WS pushes mutations within milliseconds; the poll only catches
// missed events after a reconnect.
const FOCUSED_INTERVAL_MS_FAST = 2500;
const FOCUSED_INTERVAL_MS_WS = 60_000;
const BLURRED_INTERVAL_MS = 30_000;

/**
 * One hook to drive the live state of a project page. Polls the snapshot
 * endpoint and merges results into local state. Visibility-aware: 2.5s
 * cadence while the tab is focused, 30s while it isn't, immediate refresh
 * on focus or network reconnect.
 *
 * Components consuming the hook should call `revalidate()` after any
 * mutation they perform (POST/PATCH/DELETE) so the next poll cycle isn't
 * the only path to seeing their own change.
 */
export function useRealtimeProject(projectId: string, initial: Initial) {
  const [state, setState] = useState<Initial>(initial);
  const [remoteTyping, setRemoteTyping] = useState<TypingPayload | null>(null);
  const etagRef = useRef<string | null>(null);
  const inFlightRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);
  const typingClearRef = useRef<number | null>(null);

  const fetchSnapshot = useCallback(async () => {
    inFlightRef.current?.abort();
    const ctrl = new AbortController();
    inFlightRef.current = ctrl;
    try {
      const headers: Record<string, string> = {};
      if (etagRef.current) headers["If-None-Match"] = etagRef.current;
      const res = await fetch(`/api/projects/${projectId}/snapshot`, {
        cache: "no-store",
        headers,
        signal: ctrl.signal,
      });
      if (res.status === 304) return; // unchanged — skip
      if (!res.ok) return;
      const next = (await res.json()) as Snapshot;
      const newEtag = res.headers.get("ETag");
      if (newEtag) etagRef.current = newEtag;
      setState({
        project: next.project,
        messages: next.messages,
        todos: next.todos,
        assets: next.assets,
      });
    } catch {
      // Aborted / network error — next tick retries.
    }
  }, [projectId]);

  // ---- Pusher subscription ----------------------------------------------
  // Mutations from the other side push directly into local state with no
  // wait. The polling loop below stays as a safety net.

  const upsertLocalMessage = useCallback((m: SnapshotMessage) => {
    setState((s) => ({
      ...s,
      messages: s.messages.some((x) => x.id === m.id)
        ? s.messages.map((x) => (x.id === m.id ? m : x))
        : [...s.messages, m],
    }));
  }, []);

  const upsertLocalTodo = useCallback((t: SnapshotTodo) => {
    setState((s) => ({
      ...s,
      todos: s.todos.some((x) => x.id === t.id)
        ? s.todos.map((x) => (x.id === t.id ? t : x))
        : [...s.todos, t],
    }));
  }, []);

  const removeLocalTodo = useCallback((id: string) => {
    setState((s) => ({ ...s, todos: s.todos.filter((x) => x.id !== id) }));
  }, []);

  const upsertLocalAsset = useCallback((a: SnapshotAsset) => {
    setState((s) => ({
      ...s,
      assets: s.assets.some((x) => x.id === a.id)
        ? s.assets.map((x) => (x.id === a.id ? a : x))
        : [a, ...s.assets],
    }));
  }, []);

  const removeLocalAsset = useCallback((id: string) => {
    setState((s) => ({ ...s, assets: s.assets.filter((x) => x.id !== id) }));
  }, []);

  const patchLocalProject = useCallback((patch: Partial<SnapshotProject>) => {
    setState((s) => ({ ...s, project: { ...s.project, ...patch } }));
  }, []);

  const { connected: wsConnected, triggerTyping } = useProjectChannel(projectId, {
    onMessage: (raw) => upsertLocalMessage(raw as SnapshotMessage),
    onTodoUpsert: (raw) => upsertLocalTodo(raw as SnapshotTodo),
    onTodoDelete: (id) => removeLocalTodo(id),
    onAssetUpsert: (raw) => upsertLocalAsset(raw as SnapshotAsset),
    onAssetDelete: (id) => removeLocalAsset(id),
    onNotesUpdate: (raw) => {
      const p = raw as { notesShared?: string; notesInternal?: string; updatedAt?: string };
      patchLocalProject({
        ...(p.notesShared !== undefined ? { notesShared: p.notesShared } : {}),
        ...(p.notesInternal !== undefined ? { notesInternal: p.notesInternal } : {}),
        ...(p.updatedAt ? { updatedAt: p.updatedAt } : {}),
      });
    },
    onProjectUpdate: (raw) => patchLocalProject(raw as Partial<SnapshotProject>),
    onTyping: (p) => {
      setRemoteTyping(p);
      if (typingClearRef.current !== null) window.clearTimeout(typingClearRef.current);
      // WhatsApp behavior: fade out 4s after the last typing event.
      typingClearRef.current = window.setTimeout(() => setRemoteTyping(null), 4000);
    },
  });

  // Poll loop with visibility awareness.
  useEffect(() => {
    if (typeof window === "undefined") return;

    function schedule() {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      const focused = document.visibilityState === "visible";
      const delay = !focused
        ? BLURRED_INTERVAL_MS
        : wsConnected
          ? FOCUSED_INTERVAL_MS_WS
          : FOCUSED_INTERVAL_MS_FAST;
      timerRef.current = window.setTimeout(async () => {
        await fetchSnapshot();
        schedule();
      }, delay);
    }

    function onVisibility() {
      if (document.visibilityState === "visible") {
        // Immediate refresh on refocus.
        fetchSnapshot();
      }
      schedule();
    }
    function onOnline() {
      fetchSnapshot();
      schedule();
    }

    // Kick off the first poll quickly so the initial server render
    // catches any change that happened in the few ms before mount.
    timerRef.current = window.setTimeout(async () => {
      await fetchSnapshot();
      schedule();
    }, 100);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", onOnline);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      inFlightRef.current?.abort();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", onOnline);
    };
  }, [fetchSnapshot]);

  // Public revalidate — components call after their own mutations to make
  // sure the WS event raced ahead doesn't leave the local view stale.
  const revalidate = useCallback(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  return {
    wsConnected,
    triggerTyping,
    remoteTyping,
    project: state.project,
    messages: state.messages,
    todos: state.todos,
    assets: state.assets,
    revalidate,
    upsertLocalMessage,
    upsertLocalTodo,
    removeLocalTodo,
    upsertLocalAsset,
    removeLocalAsset,
    patchLocalProject,
  };
}
