import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { WorkV2 as Work } from "@/components/v2/work";
import { PageBackground } from "@/components/ui/page-background";
import { BeforeAfterSlider } from "@/components/v2/before-after-slider";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "53 Figma & Framer Projects | Portfolio",
    description: "53 Figma design and Framer development projects. Landing pages, marketing sites, and full websites for SaaS, fintech, and personal brands.",
    keywords: [
        "Framer portfolio",
        "Figma design work",
        "landing page examples",
        "Framer website examples",
        "web design portfolio",
    ],
    openGraph: {
        title: "Work & Portfolio",
        description: "53 Figma + Framer projects for SaaS, fintech, and personal brands.",
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

            {/* Before/After Showcase */}
            <section className="bg-white border-t border-zinc-100">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <h2 className="text-3xl font-bold text-zinc-900 mb-3">
                        Before & After
                    </h2>
                    <p className="text-zinc-500 mb-10 max-w-xl">
                        Drag the slider to see the difference. These are real redesigns, not mockups.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <BeforeAfterSlider
                                beforeSrc="/work-screenshots/updateai.png"
                                afterSrc="/work-screenshots/updateai.png"
                                beforeAlt="UpdateAI website before redesign"
                                afterAlt="UpdateAI website after Framer redesign"
                            />
                            <p className="text-sm text-zinc-500 mt-3">
                                <span className="font-medium text-zinc-900">UpdateAI</span> — Full Framer redesign. Onboarding signups up 50%.
                            </p>
                        </div>
                        <div>
                            <BeforeAfterSlider
                                beforeSrc="/work-screenshots/nick-broadhurst.png"
                                afterSrc="/work-screenshots/nick-broadhurst.png"
                                beforeAlt="Nick Broadhurst website before redesign"
                                afterAlt="Nick Broadhurst website after Framer build"
                            />
                            <p className="text-sm text-zinc-500 mt-3">
                                <span className="font-medium text-zinc-900">Nick Broadhurst</span> — Personal brand site. 90+ Lighthouse in 9 days.
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-zinc-400 mt-6">
                        Replace with actual before screenshots when available. Current images show the final result on both sides.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-zinc-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Want your site on this page?
                    </h2>
                    <p className="text-zinc-400 mb-8">
                        Book a free call and I&apos;ll show you what I&apos;d change about your current site.
                    </p>
                    <a
                        href={SOCIAL_LINKS.calcom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors"
                    >
                        Book a Free Call <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
