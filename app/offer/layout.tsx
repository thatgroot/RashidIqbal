import type { Metadata } from "next";
import { SITE_URL as siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Book my strategy call | Rashid Iqbal",
  description: "30-minute strategy call. I tell you exactly what is losing you visitors and what to fix first. No pitch. No commitment.",
  alternates: {
    canonical: `${siteUrl}/offer`,
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
