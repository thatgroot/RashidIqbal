import type { Metadata } from "next";

// Outer dashboard layout. Just metadata + a noindex declaration. The
// sidebar + auth guard live in app/dashboard/(authed)/layout.tsx so that
// app/dashboard/login (a sibling of the (authed) group) can render
// without the chrome.

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Aestho admin dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
