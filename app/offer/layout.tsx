import type { Metadata } from "next";
import { SITE_URL as siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  // /offer is the highest-intent page on the site — *do* index it so
  // Google + Perplexity can route "free landing-page audit" queries here.
  title:
    "Free landing-page audit + Framer rebuild from $1,000 | Rashid Iqbal",
  description:
    "Drop your URL, get a 60-second Loom audit. Or book the rebuild: 1-page landing in 3 days from $1,000, 4-page site in 5 days from $1,500. Refund if the design is wrong.",
  keywords: [
    "free landing page audit",
    "framer landing page rebuild",
    "figma to framer 3 days",
    "$1000 landing page",
    "saas landing page audit",
  ],
  alternates: {
    canonical: `${siteUrl}/offer`,
  },
  openGraph: {
    title: "Free landing-page audit + Framer rebuild from $1,000",
    description:
      "60-second Loom audit. 3-day landing page from $1,000. Refund if design direction is wrong.",
    url: `${siteUrl}/offer`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/api/blog-og?title=${encodeURIComponent("Free landing-page audit + rebuild from $1,000")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free landing-page audit + Framer rebuild from $1,000",
    description: "60-second Loom audit. 3-day rebuild. Refund if wrong.",
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
