"use client";

import { useState } from "react";
import {
  ExternalLink,
  Trash2,
  Plus,
  Loader2,
  FileText,
  Image as ImageIcon,
  Video,
  Github,
  Globe,
  BookOpen,
  Box,
  PenTool,
} from "lucide-react";
import type { SnapshotAsset } from "@/lib/portal/use-realtime-project";

const KIND_META: Record<
  string,
  { label: string; Icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  figma: { label: "Figma", Icon: PenTool, tone: "bg-purple-50 text-purple-700 border-purple-200" },
  framer: { label: "Framer", Icon: Box, tone: "bg-[#1b1938] text-white border-[#1b1938]" },
  notion: { label: "Notion", Icon: BookOpen, tone: "bg-[#fafaf8] text-[#292827] border-[#e8e4dd]" },
  google: { label: "Google", Icon: FileText, tone: "bg-blue-50 text-blue-700 border-blue-200" },
  github: { label: "GitHub", Icon: Github, tone: "bg-[#1b1938] text-white border-[#1b1938]" },
  video: { label: "Video", Icon: Video, tone: "bg-red-50 text-red-700 border-red-200" },
  image: { label: "Image", Icon: ImageIcon, tone: "bg-[#fafaf8] text-emerald-700 border-[#e8e4dd]" },
  link: { label: "Link", Icon: Globe, tone: "bg-[#fafaf8] text-[#292827] border-[#e8e4dd]" },
};

export function AssetGrid({
  projectId,
  assets,
  viewer,
  onLocalUpsert,
  onLocalRemove,
  onRevalidate,
}: {
  projectId: string;
  assets: SnapshotAsset[];
  viewer: "admin" | "client";
  onLocalUpsert: (a: SnapshotAsset) => void;
  onLocalRemove: (id: string) => void;
  onRevalidate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/assets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), url: url.trim() }),
      });
      const j = (await res.json().catch(() => ({}))) as {
        asset?: SnapshotAsset;
        error?: string;
      };
      if (!res.ok || !j.asset) {
        setError(j.error || "Could not add. Try again.");
        return;
      }
      onLocalUpsert(j.asset);
      onRevalidate();
      setName("");
      setUrl("");
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function remove(a: SnapshotAsset) {
    if (!confirm("Remove this asset?")) return;
    const before = a;
    onLocalRemove(a.id);
    try {
      const res = await fetch(`/api/projects/${projectId}/assets/${a.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        onLocalUpsert(before);
        return;
      }
      onRevalidate();
    } catch {
      onLocalUpsert(before);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em]">
          Assets &amp; links
        </p>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#73706d] border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          {open ? "Cancel" : "Add asset"}
        </button>
      </div>

      {open && (
        <form
          onSubmit={add}
          className="border border-[#e8e4dd] bg-white p-4 mb-3 space-y-2"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Asset name (e.g. Figma source file)"
            required
            maxLength={200}
            className="w-full px-3 py-2 text-sm border border-[#e8e4dd] bg-white focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://figma.com/file/…"
            required
            maxLength={1000}
            className="w-full px-3 py-2 text-sm font-mono border border-[#e8e4dd] bg-white focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              Save asset
            </button>
            <p className="text-[10px] text-[#9a9794]">
              Type is auto-detected from the URL.
            </p>
          </div>
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">
              {error}
            </p>
          )}
        </form>
      )}

      {assets.length === 0 ? (
        <div className="border border-[#e8e4dd] bg-white p-6 text-center">
          <p className="text-sm text-[#73706d]">
            No assets yet. Drop a Figma file, Framer build, doc, or any URL.
          </p>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {assets.map((a) => {
            const meta = KIND_META[a.kind] || KIND_META.link!;
            return (
              <li
                key={a.id}
                className="border border-[#e8e4dd] bg-white p-3 flex items-start gap-3 group hover:border-[#c9b4fa] transition-colors"
              >
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-8 h-8 border ${meta.tone}`}
                >
                  <meta.Icon className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-bold text-[#292827] hover:text-[#1b1938] transition-colors truncate"
                  >
                    {a.name}
                  </a>
                  <p className="text-[11px] font-mono text-[#9a9794] truncate">
                    {a.url.replace(/^https?:\/\//, "")}
                  </p>
                  <p className="text-[10px] font-mono text-[#9a9794] uppercase tracking-[0.18em] mt-1">
                    {meta.label} · added by {a.addedBy === viewer ? "you" : a.addedBy}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[#9a9794] hover:text-[#1b1938]"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => remove(a)}
                    className="p-1 text-[#9a9794] hover:text-red-600"
                    aria-label="Remove asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
