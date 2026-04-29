import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project portal",
  description: "Aestho client project portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
