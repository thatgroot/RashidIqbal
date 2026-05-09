import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  BarChart3,
  Users,
  Globe2,
  Activity,
  Filter,
  Inbox,
  FolderKanban,
  UserSquare2,
  FileText,
} from "lucide-react";
import { getCurrentSession } from "@/lib/auth/session";
import { inboxCounts } from "@/lib/dashboard/inbox-queries";

const NAV = [
  { group: "Analytics", items: [
    { href: "/dashboard", label: "Overview", Icon: BarChart3 },
    { href: "/dashboard/visitors", label: "Visitors", Icon: Users },
    { href: "/dashboard/pages", label: "Pages", Icon: Globe2 },
    { href: "/dashboard/funnels", label: "Funnels", Icon: Filter },
    { href: "/dashboard/realtime", label: "Realtime", Icon: Activity },
  ] },
  { group: "Work", items: [
    { href: "/dashboard/inbox", label: "Inbox", Icon: Inbox, badgeKey: "unread" as const },
    { href: "/dashboard/projects", label: "Projects", Icon: FolderKanban },
    { href: "/dashboard/clients", label: "Clients", Icon: UserSquare2 },
  ] },
  { group: "Content", items: [
    { href: "/dashboard/cms", label: "CMS", Icon: FileText },
  ] },
] as const;

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/dashboard/login");

  // Cheap read — feeds the unread badge on the Inbox nav entry. Fails open
  // to 0 so a transient DB blip doesn't 500 the whole layout.
  let unread = 0;
  try {
    const c = await inboxCounts();
    unread = c.unread;
  } catch (err) {
    console.error("[dashboard/layout] inboxCounts failed", err);
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292827] font-sans flex">
      <aside className="w-56 shrink-0 border-r border-[#e8e4dd] bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-[#e8e4dd]">
          <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em]">
            Aestho
          </p>
          <p className="text-sm font-bold text-[#292827] mt-0.5">Dashboard</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-4 overflow-auto">
          {NAV.map((g) => (
            <div key={g.group}>
              <p className="text-[9px] font-mono text-[#9a9794] uppercase tracking-[0.2em] px-3 mb-1.5">
                {g.group}
              </p>
              <div className="space-y-0.5">
                {g.items.map((item) => {
                  const showBadge =
                    "badgeKey" in item && item.badgeKey === "unread" && unread > 0;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#73706d] hover:bg-[#fafaf8] hover:text-[#292827] transition-colors rounded-sm"
                    >
                      <item.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="flex-1">{item.label}</span>
                      {showBadge && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold tabular-nums bg-[#1b1938] text-white rounded">
                          {unread}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#e8e4dd]">
          <p className="text-[10px] text-[#9a9794] mb-2 truncate" title={session.email}>
            {session.email}
          </p>
          <form action="/api/dashboard/auth/logout" method="post">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#73706d] border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
