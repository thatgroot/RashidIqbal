"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Plus, X } from "lucide-react";
import { STATUS_KEYS } from "@/lib/portal/constants";

const TIERS = [
  { value: "", label: "Custom" },
  { value: "landing-page", label: "Landing Page · 3 days" },
  { value: "four-page-site", label: "4-Page Website · 5 days" },
] as const;

export type EditorState = {
  title: string;
  status: string;
  tier: string;
  targetLaunchDate: string;
  launchedAt: string;
  notesInternal: string;
  links: Record<string, string>;
};

export function ProjectEditor({
  projectId,
  initial,
}: {
  projectId: string;
  initial: EditorState;
}) {
  const router = useRouter();
  const [state, setState] = useState<EditorState>(initial);
  const [linkKey, setLinkKey] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function addLink() {
    if (!linkKey.trim() || !linkValue.trim()) return;
    setState((s) => ({
      ...s,
      links: { ...s.links, [linkKey.trim()]: linkValue.trim() },
    }));
    setLinkKey("");
    setLinkValue("");
  }

  function removeLink(key: string) {
    setState((s) => {
      const next = { ...s.links };
      delete next[key];
      return { ...s, links: next };
    });
  }

  // After save, when the status changed, surface a one-click "send the
  // client an update" composer so admin doesn't silently change state.
  const [statusBefore, setStatusBefore] = useState(initial.status);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.title,
          status: state.status,
          tier: state.tier || null,
          targetLaunchDate: state.targetLaunchDate || null,
          launchedAt: state.launchedAt || null,
          notesInternal: state.notesInternal || null,
          links: state.links,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Could not save. Try again.");
        return;
      }
      setSavedAt(new Date().toLocaleTimeString());
      // Status changed → invite admin to broadcast
      if (state.status !== statusBefore) {
        setShowStatusUpdate(true);
      }
      setStatusBefore(state.status);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="border border-[#e8e4dd] bg-white p-5 space-y-4">
      <Field label="Title">
        <input
          type="text"
          value={state.title}
          onChange={(e) => setField("title", e.target.value)}
          className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Status">
          <select
            value={state.status}
            onChange={(e) => setField("status", e.target.value)}
            className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm capitalize focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          >
            {STATUS_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tier">
          <select
            value={state.tier}
            onChange={(e) => setField("tier", e.target.value)}
            className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          >
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Target launch">
          <input
            type="date"
            value={state.targetLaunchDate}
            onChange={(e) => setField("targetLaunchDate", e.target.value)}
            className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          />
        </Field>
        <Field label="Launched on">
          <input
            type="date"
            value={state.launchedAt}
            onChange={(e) => setField("launchedAt", e.target.value)}
            className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          />
        </Field>
      </div>

      {/* Links editor */}
      <div>
        <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] mb-2">
          Project links (visible to client)
        </p>
        <ul className="space-y-1.5 mb-2">
          {Object.entries(state.links).map(([k, v]) => (
            <li
              key={k}
              className="flex items-center gap-2 text-xs border border-[#e8e4dd] px-2 py-1.5 bg-[#fafaf8]/40"
            >
              <span className="font-bold text-[#292827] capitalize w-20 shrink-0">{k}</span>
              <span className="font-mono text-[#73706d] flex-1 truncate">{v}</span>
              <button
                type="button"
                onClick={() => removeLink(k)}
                className="text-[#9a9794] hover:text-red-600"
                aria-label={`Remove ${k} link`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="figma"
            value={linkKey}
            onChange={(e) => setLinkKey(e.target.value)}
            className="w-24 px-2 py-1.5 border border-[#e8e4dd] bg-white text-xs focus:outline-none focus:border-[#1b1938]"
          />
          <input
            type="url"
            placeholder="https://…"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            className="flex-1 px-2 py-1.5 border border-[#e8e4dd] bg-white text-xs font-mono focus:outline-none focus:border-[#1b1938]"
          />
          <button
            type="button"
            onClick={addLink}
            className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#e8e4dd] text-xs font-bold hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>

      <Field label="Internal notes (admin only)">
        <textarea
          rows={3}
          value={state.notesInternal}
          onChange={(e) => setField("notesInternal", e.target.value)}
          placeholder="Stuff the client should never see"
          className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938] resize-none"
        />
      </Field>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          Save changes
        </button>
        {savedAt && <span className="text-[11px] text-[#9a9794]">Saved at {savedAt}</span>}
      </div>
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">
          {error}
        </p>
      )}

      {showStatusUpdate && (
        <StatusUpdateComposer
          projectId={projectId}
          status={state.status}
          onClose={() => setShowStatusUpdate(false)}
        />
      )}
    </form>
  );
}

// Small inline composer that drafts a status-change message for the
// client and posts it via the existing /api/dashboard/projects/[id]/
// messages route. The thread is realtime via Pusher, the client also
// receives an email via Resend — same pipeline as a manual reply.
function StatusUpdateComposer({
  projectId,
  status,
  onClose,
}: {
  projectId: string;
  status: string;
  onClose: () => void;
}) {
  const [body, setBody] = useState(
    `Quick update — we just moved this project to "${status}". I'll follow up with the next concrete step shortly.`
  );
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function send() {
    if (!body.trim() || sending) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(`/api/dashboard/projects/${projectId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: body.trim() }),
      });
      if (!res.ok) {
        setErr("Couldn't send. Try again.");
        return;
      }
      setSent(true);
      window.setTimeout(onClose, 1500);
    } catch {
      setErr("Network error. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border border-[#e8e4dd] bg-[#fafaf8]/30 p-4 mt-2 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.18em] mb-0.5">
            Status changed → send the client an update?
          </p>
          <p className="text-xs text-[#73706d]">
            One click drafts a message into the project thread + sends an
            email via Resend.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Skip"
          className="text-[#9a9794] hover:text-[#292827]"
        >
          ✕
        </button>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-[#e8e4dd] bg-white text-sm focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={send}
          disabled={!body.trim() || sending || sent}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors disabled:opacity-60"
        >
          {sending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : sent ? (
            "Sent ✓"
          ) : (
            "Send update"
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-[#73706d] hover:text-[#292827]"
        >
          Skip
        </button>
        {err && <span className="text-[11px] text-red-600 ml-auto">{err}</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
