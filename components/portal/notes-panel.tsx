"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Save, Lock, Users } from "lucide-react";

type Tab = "shared" | "internal";

export function NotesPanel({
  projectId,
  initialShared,
  initialInternal,
  viewer,
}: {
  projectId: string;
  initialShared: string;
  initialInternal: string;
  viewer: "admin" | "client";
}) {
  const [tab, setTab] = useState<Tab>("shared");
  const [shared, setShared] = useState(initialShared);
  const [internal, setInternal] = useState(initialInternal);
  const [savingTab, setSavingTab] = useState<Tab | null>(null);
  const [savedAt, setSavedAt] = useState<{ shared: string | null; internal: string | null }>({
    shared: null,
    internal: null,
  });
  const lastSavedRef = useRef<{ shared: string; internal: string }>({
    shared: initialShared,
    internal: initialInternal,
  });

  // Debounced auto-save: 1 s after typing stops, push the dirty tab.
  useEffect(() => {
    if (shared === lastSavedRef.current.shared) return;
    const t = window.setTimeout(() => save("shared"), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shared]);

  useEffect(() => {
    if (internal === lastSavedRef.current.internal) return;
    if (viewer !== "admin") return;
    const t = window.setTimeout(() => save("internal"), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internal, viewer]);

  async function save(which: Tab) {
    setSavingTab(which);
    try {
      const body =
        which === "shared"
          ? { sharedNotes: shared }
          : { internalNotes: internal };
      const res = await fetch(`/api/projects/${projectId}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        lastSavedRef.current[which] =
          which === "shared" ? shared : internal;
        setSavedAt((s) => ({ ...s, [which]: new Date().toLocaleTimeString() }));
      }
    } finally {
      setSavingTab(null);
    }
  }

  const showInternalTab = viewer === "admin";
  const activeText = tab === "shared" ? shared : internal;
  const setActiveText =
    tab === "shared" ? setShared : viewer === "admin" ? setInternal : setShared;

  return (
    <div className="border border-zinc-200 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
        <div className="flex">
          <TabButton
            active={tab === "shared"}
            onClick={() => setTab("shared")}
            icon={<Users className="w-3.5 h-3.5" aria-hidden="true" />}
          >
            Shared notes
          </TabButton>
          {showInternalTab && (
            <TabButton
              active={tab === "internal"}
              onClick={() => setTab("internal")}
              icon={<Lock className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Internal
            </TabButton>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          {savingTab === tab ? (
            <span className="inline-flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
              Saving…
            </span>
          ) : savedAt[tab] ? (
            <span>Saved {savedAt[tab]}</span>
          ) : null}
        </div>
      </div>
      <textarea
        value={activeText}
        onChange={(e) => setActiveText(e.target.value)}
        placeholder={
          tab === "shared"
            ? "Notes both you and Rashid can see and edit. Auto-saves as you type."
            : "Admin-only notes. Client never sees this."
        }
        rows={10}
        className="w-full px-4 py-3 text-sm leading-relaxed bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-y font-mono"
      />
      <div className="px-3 py-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/40">
        <p className="text-[10px] text-zinc-400">
          {tab === "shared"
            ? "Visible to both client and Rashid."
            : "Hidden from the client portal."}
        </p>
        <button
          type="button"
          onClick={() => save(tab)}
          disabled={savingTab === tab}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-3 h-3" aria-hidden="true" />
          Save now
        </button>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
        active ? "text-zinc-900 font-bold" : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      {icon}
      {children}
      {active && (
        <span
          className="absolute -bottom-2 left-2 right-2 h-0.5 bg-orange-500"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
