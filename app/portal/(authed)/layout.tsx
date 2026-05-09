import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, LogOut, ShieldCheck } from "lucide-react";
import { getCurrentPortalViewer } from "@/lib/portal/auth";

export default async function AuthedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewer = await getCurrentPortalViewer();
  if (!viewer) redirect("/portal/login");

  const isPreview = viewer.kind === "admin-preview";
  const displayName =
    viewer.kind === "client"
      ? viewer.client.name || viewer.client.email
      : "Admin preview";
  const displayEmail =
    viewer.kind === "client" ? viewer.client.email : viewer.adminEmail;

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#292827] font-sans">
      {isPreview && (
        <div className="bg-amber-100 border-b border-amber-200 text-amber-900">
          <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="font-bold">Admin preview</span>
              <span className="text-amber-700/80 truncate">
                · You&rsquo;re viewing the portal as the owner. Anything you do
                here is attributed to admin.
              </span>
            </div>
            <Link
              href="/dashboard"
              className="font-bold whitespace-nowrap hover:underline"
            >
              Back to dashboard →
            </Link>
          </div>
        </div>
      )}
      <header className="border-b border-[#e8e4dd] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/portal" className="flex items-center gap-3 group">
            <Image src="/favicon.svg" alt="" width={28} height={28} aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em]">
                Project portal
              </p>
              <p className="text-sm font-bold text-[#292827] group-hover:text-[#1b1938] transition-colors">
                Aestho · Rashid Iqbal
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-[#292827] truncate max-w-[220px] flex items-center gap-1.5 justify-end">
                {isPreview && (
                  <ShieldCheck className="w-3 h-3 text-[#1b1938]" aria-hidden="true" />
                )}
                {displayName}
              </p>
              <p className="text-[10px] text-[#9a9794] truncate max-w-[220px]">
                {displayEmail}
              </p>
            </div>
            {isPreview ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#73706d] border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                Exit preview
              </Link>
            ) : (
              <form action="/api/portal/auth/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#73706d] border border-[#e8e4dd] hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  Sign out
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
