"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

const FOCUSED_INTERVAL_MS = 2500;
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
  const etagRef = useRef<string | null>(null);
  const inFlightRef = useRef<AbortController | null>(null);
  const timerRef = useRef<number | null>(null);

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

  // Poll loop with visibility awareness.
  useEffect(() => {
    if (typeof window === "undefined") return;

    function schedule() {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      const delay =
        document.visibilityState === "visible" ? FOCUSED_INTERVAL_MS : BLURRED_INTERVAL_MS;
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

  // Public revalidate — components call after their own mutations.
  const revalidate = useCallback(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  // Imperative state-merging helpers. Components call these for optimistic
  // local mutations (add a message, toggle a todo) without waiting for a
  // round trip. The next poll naturally reconciles.
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

  return {
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
