"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArchiveRestore,
  ExternalLink,
  FolderPlus,
  Loader2,
  Mail as MailIcon,
  MailOpen,
  Star,
} from "lucide-react";

export type InboxRow = {
  id: string;
  source: string;
  email: string;
  name: string | null;
  subject: string;
  preview: string;
  createdAt: string; // ISO
  readAt: string | null;
  starred: boolean;
  archivedAt: string | null;
};

const SOURCE_LABELS: Record<string, string> = {
  "offer-paid": "Offer · Booking",
  "offer-lp": "Free Audit",
  "exit-intent": "Exit-Intent Audit",
  "service-builder": "Project Inquiry",
  pricing: "Pricing Inquiry",
  contact: "Contact",
};

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString();
}

type Pos = { x: number; y: number };

export function InboxListRow({ row }: { row: InboxRow }) {
  const router = useRouter();
  const [unread, setUnread] = useState(!row.readAt && !row.archivedAt);
  const [starred, setStarred] = useState(row.starred);
  const [archived, setArchived] = useState(!!row.archivedAt);
  const [menu, setMenu] = useState<Pos | null>(null);
  const [busy, setBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    function close(e: MouseEvent | KeyboardEvent) {
      if (e instanceof KeyboardEvent && e.key === "Escape") setMenu(null);
      if (e instanceof MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenu(null);
        }
      }
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menu]);

  async function patch(patchBody: Record<string, boolean>) {
    setBusy(true);
    try {
      await fetch(`/api/dashboard/inbox/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchBody),
      });
    } finally {
      setBusy(false);
    }
  }

  async function toggleRead() {
    const next = !unread;
    setUnread(next);
    await patch({ read: !next });
    setMenu(null);
    router.refresh();
  }

  async function toggleStar() {
    const next = !starred;
    setStarred(next);
    await patch({ starred: next });
    setMenu(null);
    router.refresh();
  }

  async function toggleArchive() {
    const next = !archived;
    setArchived(next);
    await patch({ archived: next });
    setMenu(null);
    router.refresh();
  }

  function onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    const margin = 8;
    const menuW = 240;
    const menuH = 240;
    let x = e.clientX;
    let y = e.clientY;
    if (typeof window !== "undefined") {
      if (x + menuW + margin > window.innerWidth) x = window.innerWidth - menuW - margin;
      if (y + menuH + margin > window.innerHeight) y = window.innerHeight - menuH - margin;
    }
    setMenu({ x, y });
  }

  // Hide row when archived from a non-archived folder (Gmail-like). Server
  // refresh re-paginates on the next render; keep the optimistic dim here.
  return (
    <li
      onContextMenu={onContextMenu}
      className={`relative ${archived && !row.archivedAt ? "opacity-50" : ""}`}
    >
      <Link
        href={`/dashboard/inbox/${row.id}`}
        className={`flex items-center gap-3 px-4 py-3 hover:bg-zinc-50/60 transition-colors ${
          unread ? "bg-orange-50/30" : ""
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            unread ? "bg-orange-500" : "bg-transparent"
          }`}
          aria-hidden="true"
        />
        {starred ? (
          <Star
            className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0"
            aria-hidden="true"
          />
        ) : (
          <span className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        )}
        <div className="w-44 shrink-0 flex flex-col">
          <span
            className={`text-sm truncate ${
              unread ? "font-bold text-zinc-900" : "text-zinc-700"
            }`}
          >
            {row.name || row.email.split("@")[0]}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 truncate">
            {SOURCE_LABELS[row.source] || row.source}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm truncate ${
              unread ? "text-zinc-900 font-medium" : "text-zinc-600"
            }`}
          >
            {row.subject}
          </p>
          {row.preview && (
            <p className="text-[12px] text-zinc-400 truncate">{row.preview}</p>
          )}
        </div>
        {archived && (
          <Archive
            className="w-3.5 h-3.5 text-zinc-300 shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="text-[11px] text-zinc-400 font-mono tabular-nums shrink-0 w-12 text-right">
          {timeAgo(row.createdAt)}
        </span>
      </Link>

      {menu && (
        <div
          ref={menuRef}
          role="menu"
          style={{ position: "fixed", left: menu.x, top: menu.y }}
          className="z-50 w-60 bg-white border border-zinc-200 shadow-xl py-1.5"
        >
          <p className="px-3 pb-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.18em] truncate">
            {row.name || row.email}
          </p>
          <MenuLink
            href={`/dashboard/inbox/${row.id}`}
            icon={<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />}
          >
            Open
          </MenuLink>
          <MenuLink
            href={`/dashboard/projects/new?from=${row.id}`}
            icon={<FolderPlus className="w-3.5 h-3.5 text-orange-600" aria-hidden="true" />}
            accent
          >
            Convert to project
          </MenuLink>
          <div className="border-t border-zinc-100 my-1" />
          <MenuButton
            onClick={toggleRead}
            disabled={busy}
            icon={
              unread ? (
                <MailOpen className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <MailIcon className="w-3.5 h-3.5" aria-hidden="true" />
              )
            }
          >
            {unread ? "Mark as read" : "Mark as unread"}
          </MenuButton>
          <MenuButton
            onClick={toggleStar}
            disabled={busy}
            icon={
              <Star
                className={`w-3.5 h-3.5 ${starred ? "fill-orange-500 text-orange-500" : ""}`}
                aria-hidden="true"
              />
            }
          >
            {starred ? "Unstar" : "Star"}
          </MenuButton>
          <MenuButton
            onClick={toggleArchive}
            disabled={busy}
            icon={
              archived ? (
                <ArchiveRestore className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Archive className="w-3.5 h-3.5" aria-hidden="true" />
              )
            }
          >
            {archived ? "Unarchive" : "Archive"}
          </MenuButton>
          {busy && (
            <div className="px-3 pt-1 pb-0.5 text-[10px] text-zinc-400 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
              Working…
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function MenuLink({
  href,
  icon,
  children,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className={`flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-zinc-50 transition-colors ${
        accent ? "font-bold text-orange-700" : "text-zinc-700"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}

function MenuButton({
  onClick,
  icon,
  disabled,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 transition-colors text-left disabled:opacity-50"
    >
      {icon}
      {children}
    </button>
  );
}
