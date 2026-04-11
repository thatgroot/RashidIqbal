import { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { GridContainer, GridItem } from "@/components/v2/grid-system";
import { ArrowRight, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Hire a Figma & Framer Expert | Worldwide",
    description: "Hire a Figma and Framer expert for landing pages, websites, and Chrome extensions. Worldwide availability, flexible timezone.",
    keywords: [
        "hire Framer expert",
        "hire Figma expert",
        "Framer developer for hire",
        "freelance Figma designer",
        "UX copywriter",
    ],
    openGraph: {
        title: "Hire a Figma & Framer Expert | Worldwide",
        description: "Hire a Figma and Framer expert. Conversion-focused design, UX copywriting, and Chrome extensions.",
        type: "website",
        url: `${SITE_URL}/hire`,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: "Hire a Figma & Framer Expert",
        description: "Conversion-focused Figma design, Framer development, and Chrome extensions. Worldwide availability.",
    },
    alternates: {
        canonical: `${SITE_URL}/hire`,
    },
};

export default function HirePage() {
    // Group locations by region
    const locationsByRegion = LOCATIONS.reduce((acc, loc) => {
        if (!acc[loc.region]) acc[loc.region] = [];
        acc[loc.region].push(loc);
        return acc;
    }, {} as Record<string, typeof LOCATIONS>);

    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <PageBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-16 bg-white relative">
                <div className="max-w-container border-l border-zinc-100 relative">
                    <GridContainer cols={1}>
                        <GridItem className="border-t pt-16 pb-12" padding={false}>
                            <div className="px-8 sm:px-12">
                                <Breadcrumb
                                    items={[{ label: "Hire", href: "/hire" }]}
                                    className="mb-8"
                                />
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-mono uppercase tracking-widest mb-6">
                                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                                    Worldwide
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-6 tracking-tight leading-[0.95]">
                                    Hire a Figma &amp; Framer Expert
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8 max-w-2xl">
                                    I work with clients worldwide — designing in Figma, building in Framer,
                                    writing conversion copy, and creating Chrome extensions for the design ecosystem.
                                </p>
                                <a
                                    href={SOCIAL_LINKS.calcom}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-700 text-white font-bold text-sm hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                                >
                                    Book a Free Call
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </a>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </section>

            {/* Locations Grid */}
            <section className="bg-white">
                <div className="max-w-container border-l border-zinc-100">
                    {Object.entries(locationsByRegion).map(([region, locations]) => (
                        <div key={region}>
                            {/* Region Label Row */}
                            <GridContainer cols={1}>
                                <GridItem padding={false} className="py-6 px-8 sm:px-12">
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                        {region}
                                    </span>
                                </GridItem>
                            </GridContainer>

                            {/* Location Cards using Grid */}
                            <GridContainer cols={3}>
                                {locations.map((location) => (
                                    <Link
                                        key={location.slug}
                                        href={`/hire/${location.slug}`}
                                        className="block group"
                                        aria-label={`Hire in ${location.country}`}
                                    >
                                        <GridItem className="h-full flex flex-col min-h-[200px]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                                    <MapPin className="w-4 h-4 text-zinc-500 group-hover:text-orange-600 transition-colors" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                                                        {location.country}
                                                    </h3>
                                                    <p className="text-xs font-mono text-zinc-500">{location.timezone}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1 line-clamp-2">
                                                {location.availability}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                                                Learn more
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                            </span>
                                        </GridItem>
                                    </Link>
                                ))}
                            </GridContainer>
                        </div>
                    ))}

                    {/* CTA Row */}
                    <GridContainer cols={1}>
                        <GridItem className="py-20 text-center">
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-6">
                                Don&apos;t See Your Location?
                            </h2>
                            <p className="text-lg text-zinc-500 mb-8 max-w-2xl mx-auto">
                                I work with clients from any country. Book a call to discuss your
                                project and timezone requirements.
                            </p>
                            <a
                                href={SOCIAL_LINKS.calcom}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-700 text-white font-bold text-sm hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                            >
                                Schedule Your Free Call
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </a>
                        </GridItem>
                    </GridContainer>
                </div>
            </section>

            <Footer />
        </main>
    );
}
