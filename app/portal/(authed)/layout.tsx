import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { getCurrentClientSession } from "@/lib/portal/auth";

export default async function AuthedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentClientSession();
  if (!session) redirect("/portal/login");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/portal" className="flex items-center gap-3 group">
            <Image src="/favicon.svg" alt="" width={28} height={28} aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em]">
                Project portal
              </p>
              <p className="text-sm font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                Aestho · Rashid Iqbal
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-zinc-900 truncate max-w-[200px]">
                {session.client.name || session.client.email}
              </p>
              <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">
                {session.client.email}
              </p>
            </div>
            <form action="/api/portal/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-600 border border-zinc-200 hover:border-orange-300 hover:text-orange-700 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
