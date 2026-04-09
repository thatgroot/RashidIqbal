import { Metadata } from "next";
import { SITE_URL as siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Links | Rashid Iqbal",
    description: "Connect with Rashid Iqbal across the web. Freelance Next.js & Framer Developer from Pakistan.",
    alternates: {
        canonical: `${siteUrl}/links`,
    },
};

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
