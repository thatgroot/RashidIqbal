"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, Lock, Save, Users } from "lucide-react";

type Tab = "shared" | "internal";

// NotesPanel is controlled by useRealtimeProject. Server-side state arrives
// via props on every poll cycle. Local typing wins as long as the user is
// actively editing; once they stop, remote updates take over (Phase R3).

export function NotesPanel({
  projectId,
  remoteShared,
  remoteInternal,
  remoteUpdatedAt,
  viewer,
}: {
  projectId: string;
  remoteShared: string;
  remoteInternal: string;
  remoteUpdatedAt: string; // ISO of project.updatedAt — used for 409 conflict detection
  viewer: "admin" | "client";
}) {
  const [tab, setTab] = useState<Tab>("shared");
  const [shared, setShared] = useState(remoteShared);
  const [internal, setInternal] = useState(remoteInternal);
  const [savingTab, setSavingTab] = useState<Tab | null>(null);
  const [savedAt, setSavedAt] = useState<{ shared: string | null; internal: string | null }>({
    shared: null,
    internal: null,
  });
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Track what the server most recently returned. Used so the merge logic
  // knows what counts as "remote moved".
  const lastRemoteRef = useRef({
    shared: remoteShared,
    internal: remoteInternal,
    updatedAt: remoteUpdatedAt,
  });
  // Track what the user most recently saved. Used so debounced auto-save
  // knows it has nothing new to push.
  const lastSavedRef = useRef({ shared: remoteShared, internal: remoteInternal });
  // Track when the user last typed in each tab. We treat "typing" as activity
  // within the last ~2.5s so the merge layer doesn't yank text out from under
  // them.
  const lastTypedRef = useRef<{ shared: number; internal: number }>({
    shared: 0,
    internal: 0,
  });

  // ----- Remote → local reconciliation when the snapshot updates ---------
  useEffect(() => {
    const now = Date.now();
    const TYPING_GRACE_MS = 2500;

    // Shared note. If the user isn't actively typing AND the remote moved,
    // pull the remote in.
    if (
      remoteShared !== lastRemoteRef.current.shared &&
      now - lastTypedRef.current.shared > TYPING_GRACE_MS &&
      shared === lastRemoteRef.current.shared // local matches the previous remote = no unsaved diff
    ) {
      setShared(remoteShared);
      lastSavedRef.current.shared = remoteShared;
    }

    // Same logic for the admin-only internal note.
    if (
      remoteInternal !== lastRemoteRef.current.internal &&
      now - lastTypedRef.current.internal > TYPING_GRACE_MS &&
      internal === lastRemoteRef.current.internal
    ) {
      setInternal(remoteInternal);
      lastSavedRef.current.internal = remoteInternal;
    }

    lastRemoteRef.current = { shared: remoteShared, internal: remoteInternal, updatedAt: remoteUpdatedAt };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteShared, remoteInternal, remoteUpdatedAt]);

  // Debounced auto-save: 1.2s after typing stops, push the dirty tab.
  useEffect(() => {
    if (shared === lastSavedRef.current.shared) return;
    const t = window.setTimeout(() => save("shared"), 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shared]);

  useEffect(() => {
    if (internal === lastSavedRef.current.internal) return;
    if (viewer !== "admin") return;
    const t = window.setTimeout(() => save("internal"), 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internal, viewer]);

  async function save(which: Tab) {
    setSavingTab(which);
    setConflictWarning(null);
    try {
      const body =
        which === "shared"
          ? { sharedNotes: shared, baseUpdatedAt: lastRemoteRef.current.updatedAt }
          : { internalNotes: internal, baseUpdatedAt: lastRemoteRef.current.updatedAt };
      const res = await fetch(`/api/projects/${projectId}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 409) {
        // Remote moved. Show a warning, swallow the local edit (next snapshot
        // will pull the latest remote text in).
        setConflictWarning(
          which === "shared"
            ? "The other side edited this note. Pulled in the latest version."
            : "Internal note conflict — pulled in the latest version."
        );
        return;
      }
      if (res.ok) {
        lastSavedRef.current[which] = which === "shared" ? shared : internal;
        setSavedAt((s) => ({ ...s, [which]: new Date().toLocaleTimeString() }));
      }
    } finally {
      setSavingTab(null);
    }
  }

  function handleSharedChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setShared(e.target.value);
    lastTypedRef.current.shared = Date.now();
  }
  function handleInternalChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInternal(e.target.value);
    lastTypedRef.current.internal = Date.now();
  }

  const showInternalTab = viewer === "admin";
  const activeText = tab === "shared" ? shared : internal;
  const activeOnChange =
    tab === "shared"
      ? handleSharedChange
      : viewer === "admin"
        ? handleInternalChange
        : handleSharedChange;

  return (
    <div className="border border-[#e8e4dd] bg-white">
      <div className="flex items-center justify-between border-b border-[#e8e4dd] px-3 py-2">
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
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#9a9794]">
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
      {conflictWarning && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {conflictWarning}
          <button
            type="button"
            onClick={() => setConflictWarning(null)}
            className="ml-auto text-[#1b1938] hover:text-amber-900"
          >
            ✕
          </button>
        </div>
      )}
      <textarea
        value={activeText}
        onChange={activeOnChange}
        placeholder={
          tab === "shared"
            ? "Notes both you and Rashid can see and edit. Auto-saves as you type."
            : "Admin-only notes. Client never sees this."
        }
        rows={10}
        className="w-full px-4 py-3 text-sm leading-relaxed bg-white text-[#292827] placeholder:text-[#9a9794] focus:outline-none resize-y font-mono"
      />
      <div className="px-3 py-2 border-t border-[#e8e4dd] flex items-center justify-between bg-[#fafaf8]/40">
        <p className="text-[10px] text-[#9a9794]">
          {tab === "shared"
            ? "Visible to both client and Rashid. Updates live."
            : "Hidden from the client portal."}
        </p>
        <button
          type="button"
          onClick={() => save(tab)}
          disabled={savingTab === tab}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#73706d] border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors disabled:opacity-50"
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
        active ? "text-[#292827] font-bold" : "text-[#73706d] hover:text-[#292827]"
      }`}
    >
      {icon}
      {children}
      {active && (
        <span
          className="absolute -bottom-2 left-2 right-2 h-0.5 bg-[#1b1938]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
