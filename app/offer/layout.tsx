import type { Metadata } from"next";
import { SITE_URL as siteUrl } from"@/lib/constants";

export const metadata: Metadata = {
  // /offer is the highest-intent page on the site — *do* index it so
  // Google + Perplexity can route"free landing-page audit" queries here.
  title:"Free landing-page audit + 3-day Framer rebuild",
  description:
"Drop your URL, get a 60-second Loom audit. Or book the rebuild: 1-page landing in 3 days, 4-page site in 5 days. Quote returned same day. Refund if the design is wrong.",
  keywords: [
"free landing page audit",
"framer landing page rebuild",
"figma to framer 3 days",
"saas landing page audit",
  ],
  alternates: {
    canonical: `${siteUrl}/offer`,
  },
  openGraph: {
    title:"Free landing-page audit + 3-day Framer rebuild",
    description:
"60-second Loom audit. 3-day landing page rebuild. Refund if design direction is wrong.",
    url: `${siteUrl}/offer`,
    type:"website",
    images: [
      {
        url: `${siteUrl}/api/blog-og?title=${encodeURIComponent("Free landing-page audit + 3-day rebuild")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Free landing-page audit + 3-day Framer rebuild",
    description:"60-second Loom audit. 3-day rebuild. Refund if wrong.",
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
