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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex">
      <aside className="w-56 shrink-0 border-r border-zinc-200 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-100">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em]">
            Aestho
          </p>
          <p className="text-sm font-bold text-zinc-900 mt-0.5">Dashboard</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-4 overflow-auto">
          {NAV.map((g) => (
            <div key={g.group}>
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em] px-3 mb-1.5">
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
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors rounded-sm"
                    >
                      <item.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="flex-1">{item.label}</span>
                      {showBadge && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold tabular-nums bg-orange-500 text-white rounded">
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
        <div className="p-3 border-t border-zinc-100">
          <p className="text-[10px] text-zinc-400 mb-2 truncate" title={session.email}>
            {session.email}
          </p>
          <form action="/api/dashboard/auth/logout" method="post">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors"
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
