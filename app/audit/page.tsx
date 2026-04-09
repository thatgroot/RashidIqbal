import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { AuditPageClient } from "@/components/v2/audit/audit-page-client";
import { PageBackground } from "@/components/ui/page-background";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Free Website Audit",
    description: "Get a free performance, SEO, and accessibility audit of your website in seconds. See what's working and what's costing you conversions.",
    openGraph: {
        title: "Free Website Audit",
        description: "Instant performance, SEO, and accessibility scores for any website.",
        type: "website",
        url: `${SITE_URL}/audit`,
    },
    alternates: {
        canonical: `${SITE_URL}/audit`,
    },
};

export default function AuditPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <PageBackground />
            <Navbar />
            <div className="pt-16">
                <AuditPageClient />
            </div>
            <Footer />
        </main>
    );
}
