"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Archive, ArchiveRestore, Mail, Reply, Loader2 } from "lucide-react";

export function InboxToolbar({
  id,
  starred: initialStarred,
  archived: initialArchived,
  email,
}: {
  id: string;
  starred: boolean;
  archived: boolean;
  email: string;
}) {
  const router = useRouter();
  const [starred, setStarred] = useState(initialStarred);
  const [archived, setArchived] = useState(initialArchived);
  const [busy, setBusy] = useState(false);

  async function patch(patchBody: Record<string, boolean>) {
    setBusy(true);
    try {
      await fetch(`/api/dashboard/inbox/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchBody),
      });
    } finally {
      setBusy(false);
    }
  }

  async function toggleStar() {
    const next = !starred;
    setStarred(next);
    await patch({ starred: next });
  }

  async function toggleArchive() {
    const next = !archived;
    setArchived(next);
    await patch({ archived: next });
    // Send the user back to the inbox after archiving — matches Gmail UX.
    if (next) router.push("/dashboard/inbox");
    else router.refresh();
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={toggleStar}
        disabled={busy}
        title={starred ? "Unstar" : "Star"}
        aria-label={starred ? "Unstar" : "Star"}
        className={`inline-flex items-center justify-center w-8 h-8 border transition-colors disabled:opacity-50 ${
          starred
            ? "border-orange-300 text-orange-500 bg-orange-50/40"
            : "border-zinc-200 text-zinc-500 hover:border-orange-300 hover:text-orange-500"
        }`}
      >
        <Star
          className={`w-4 h-4 ${starred ? "fill-orange-500 text-orange-500" : ""}`}
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        onClick={toggleArchive}
        disabled={busy}
        title={archived ? "Unarchive" : "Archive"}
        aria-label={archived ? "Unarchive" : "Archive"}
        className="inline-flex items-center justify-center w-8 h-8 border border-zinc-200 text-zinc-500 hover:border-orange-300 hover:text-orange-700 transition-colors disabled:opacity-50"
      >
        {archived ? (
          <ArchiveRestore className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Archive className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
      <a
        href={`mailto:${email}`}
        title="Reply"
        aria-label="Reply"
        className="inline-flex items-center justify-center w-8 h-8 border border-zinc-200 text-zinc-500 hover:border-orange-300 hover:text-orange-700 transition-colors"
      >
        <Reply className="w-4 h-4" aria-hidden="true" />
      </a>
      {busy && <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />}
      {/* Hidden token to silence unused-import warnings if Mail icon ever drops */}
      <span className="hidden">
        <Mail aria-hidden="true" className="w-0 h-0" />
      </span>
    </div>
  );
}
