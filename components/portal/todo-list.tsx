"use client";

import { useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import type { SnapshotTodo } from "@/lib/portal/use-realtime-project";

export function TodoList({
  projectId,
  todos,
  viewer,
  onLocalUpsert,
  onLocalRemove,
  onRevalidate,
}: {
  projectId: string;
  todos: SnapshotTodo[];
  viewer: "admin" | "client";
  onLocalUpsert: (t: SnapshotTodo) => void;
  onLocalRemove: (id: string) => void;
  onRevalidate: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) {
        setError("Couldn't add — try again.");
        return;
      }
      const j = (await res.json()) as { todo: SnapshotTodo };
      onLocalUpsert(j.todo);
      onRevalidate();
      setDraft("");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(t: SnapshotTodo, next: boolean) {
    // Optimistic + rollback (A4): snapshot, mutate, then revert on failure.
    const before = t;
    onLocalUpsert({ ...t, completedAt: next ? new Date().toISOString() : null });
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/todos/${t.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: next }),
      });
      if (!res.ok) {
        onLocalUpsert(before);
        setError("Couldn't save — try again.");
        return;
      }
      onRevalidate();
    } catch {
      onLocalUpsert(before);
      setError("Network error — try again.");
    }
  }

  async function remove(t: SnapshotTodo) {
    const before = t;
    onLocalRemove(t.id);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/todos/${t.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        onLocalUpsert(before);
        setError("Couldn't delete — try again.");
        return;
      }
      onRevalidate();
    } catch {
      onLocalUpsert(before);
      setError("Network error — try again.");
    }
  }

  const open = todos.filter((t) => !t.completedAt);
  const done = todos.filter((t) => t.completedAt);

  return (
    <div className="border border-zinc-200 bg-white">
      <div className="px-5 py-3 border-b border-zinc-100 flex items-center justify-between">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em]">
          {open.length} open
          {done.length > 0 ? ` · ${done.length} done` : ""}
        </p>
        {error && <p className="text-[10px] text-red-600">{error}</p>}
      </div>

      <ul className="divide-y divide-zinc-100">
        {todos.length === 0 && (
          <li className="px-5 py-6 text-sm text-zinc-500 text-center">
            No todos yet. Add the first one below.
          </li>
        )}
        {[...open, ...done].map((t) => {
          const isDone = !!t.completedAt;
          return (
            <li
              key={t.id}
              className={`flex items-start gap-3 px-5 py-2.5 ${
                isDone ? "bg-zinc-50/40" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(t, !isDone)}
                aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                className={`mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-colors ${
                  isDone
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-zinc-300 hover:border-orange-400"
                }`}
              >
                {isDone && <Check className="w-3 h-3" aria-hidden="true" />}
              </button>
              <span
                className={`flex-1 text-sm whitespace-pre-wrap break-words ${
                  isDone ? "line-through text-zinc-400" : "text-zinc-900"
                }`}
              >
                {t.body}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 capitalize shrink-0 mt-0.5">
                {t.addedBy === viewer ? "you" : t.addedBy}
              </span>
              <button
                type="button"
                onClick={() => remove(t)}
                aria-label="Delete"
                className="text-zinc-300 hover:text-red-600 transition-colors mt-0.5 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={add}
        className="border-t border-zinc-100 p-3 bg-zinc-50/40 flex items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a todo and press Enter…"
          maxLength={1000}
          className="flex-1 px-3 py-2 text-sm border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={!draft.trim() || busy}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Add
            </>
          )}
        </button>
      </form>
    </div>
  );
}
