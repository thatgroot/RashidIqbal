import { Metadata } from "next";
import { SITE_URL as siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Links | Rashid Iqbal — Framer + Replit + Base44",
    description:
        "All my profiles in one place: Framer Experts directory, Upwork (Top Rated), Contra, Base44, LinkedIn, GitHub, X. Rashid Iqbal · aestho.xyz.",
    alternates: {
        canonical: `${siteUrl}/links`,
    },
    openGraph: {
        title: "Rashid Iqbal · Links",
        description:
            "Framer Expert · Replit Expert · Base44 Partner — all profiles in one place.",
        url: `${siteUrl}/links`,
        type: "profile",
        images: [
            {
                url: `${siteUrl}/api/blog-og?title=${encodeURIComponent("Rashid Iqbal · all profiles")}`,
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Rashid Iqbal · Links",
        description: "Framer Expert · Replit Expert · Base44 Partner.",
        images: [
            `${siteUrl}/api/blog-og?title=${encodeURIComponent("Rashid Iqbal · all profiles")}`,
        ],
    },
};

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
