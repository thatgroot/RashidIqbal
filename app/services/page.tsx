import { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { GridContainer, GridItem } from "@/components/v2/grid-system";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Services | Figma, Framer & Chrome Extensions",
    description: "Figma design with UX copy, Framer development, and Chrome extension builds. Landing pages from $1K, websites from $2K.",
    keywords: [
        "Figma design services",
        "Framer development",
        "Chrome extension development",
        "UX copywriting",
        "landing page design",
        "Framer expert",
        "Figma to Framer",
        "conversion optimization",
    ],
    openGraph: {
        title: "Services | Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, UX copywriting, and Chrome extensions.",
        type: "website",
        url: `${SITE_URL}/services`,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: "Services | Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, and Chrome extensions.",
    },
    alternates: {
        canonical: `${SITE_URL}/services`,
    },
};

export default function ServicesPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <Navbar />

            <section className="pt-16 bg-white">
                <div className="max-w-container border-l border-zinc-100">
                    {/* Hero */}
                    <GridContainer>
                        <GridItem className="py-24">
                            <Breadcrumb
                                items={[{ label: "Services", href: "/services" }]}
                                className="mb-8"
                            />
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    Services
                                </span>
                                <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-6 tracking-tight">
                                    Figma, Framer &amp; Chrome Extensions
                                </h1>
                                <p className="text-lg text-zinc-500 leading-relaxed">
                                    I design in Figma, build in Framer, write conversion-focused UX copy,
                                    and create Chrome extensions that solve real problems.
                                </p>
                            </div>
                        </GridItem>
                    </GridContainer>

                    {/* Services Grid */}
                    <GridContainer cols={3}>
                        {SERVICES.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group block"
                            >
                                <GridItem className="h-full flex flex-col hover:bg-zinc-50/50 transition-colors">
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium">
                                            {service.shortTitle}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                                        {service.heroHeadline}
                                    </h2>
                                    <p className="text-sm text-zinc-500 mb-6 flex-1 line-clamp-3">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                        <span className="text-sm font-bold text-zinc-900">
                                            {service.priceRange}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600">
                                            Learn more
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </GridItem>
                            </Link>
                        ))}
                    </GridContainer>

                    {/* CTA */}
                    <GridContainer>
                        <GridItem className="py-24 text-center">
                            <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
                                Not Sure Where to Start?
                            </h2>
                            <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
                                Book a free call and I&apos;ll audit your current site for UX, copy,
                                and conversion opportunities.
                            </p>
                            <a
                                href={SOCIAL_LINKS.calcom}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors"
                            >
                                Schedule Your Free Call
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </GridItem>
                    </GridContainer>
                </div>
            </section>

            <Footer />
        </main>
    );
}
