import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { WorkV2 as Work } from "@/components/v2/work";
import { PageBackground } from "@/components/ui/page-background";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Work & Portfolio",
    description: "Selected Figma design and Framer development projects. Landing pages, marketing sites, and full websites for SaaS, fintech, and personal brands.",
    keywords: [
        "Framer portfolio",
        "Figma design work",
        "landing page examples",
        "Framer website examples",
        "web design portfolio",
    ],
    openGraph: {
        title: "Work & Portfolio",
        description: "Selected Figma design and Framer development projects for SaaS, fintech, and personal brands.",
        type: "website",
        url: `${SITE_URL}/work`,
    },
    alternates: {
        canonical: `${SITE_URL}/work`,
    },
};

export default function WorkPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <PageBackground />
            <Navbar />

            <div className="pt-16">
                <Work />
            </div>

            <Footer />
        </main>
    );
}
