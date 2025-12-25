import { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ArrowRight, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Hire a Freelance Developer - Worldwide Availability",
    description: "Hire a freelance web developer for your next project. Serving clients worldwide from Pakistan with flexible timezone availability. Next.js, React, mobile apps.",
    keywords: [
        "hire freelance developer",
        "remote developer",
        "web developer for hire",
        "Next.js developer",
        "React developer",
    ],
    openGraph: {
        title: "Hire a Freelance Developer - Worldwide Availability",
        description: "Hire a freelance web developer for your next project. Serving clients worldwide.",
        type: "website",
        url: `${SITE_URL}/hire`,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: "Hire a Freelance Developer",
        description: "Serving clients worldwide with flexible timezone availability.",
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
            <section className="pt-32 pb-16 border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-6">
                    <Breadcrumb
                        items={[{ label: "Hire", href: "/hire" }]}
                        className="mb-8"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                            <Globe className="w-3.5 h-3.5" />
                            Worldwide
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                            Hire a Developer
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8">
                            I work with clients worldwide, providing high-quality web and mobile
                            development with flexible scheduling to match your timezone.
                        </p>
                        <a
                            href={SOCIAL_LINKS.calcom}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded hover:bg-zinc-800 transition-colors"
                        >
                            Book a Free Call
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Locations Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {Object.entries(locationsByRegion).map(([region, locations]) => (
                        <div key={region} className="mb-16 last:mb-0">
                            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                                {region}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {locations.map((location) => (
                                    <Link
                                        key={location.slug}
                                        href={`/hire/${location.slug}`}
                                        className="group block p-6 border border-zinc-100 rounded-xl hover:border-orange-200 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                                <MapPin className="w-5 h-5 text-zinc-600 group-hover:text-orange-600 transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                                                    {location.country}
                                                </h3>
                                                <p className="text-sm text-zinc-500">{location.timezone}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                                            {location.availability}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                                            Learn more
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Don&apos;t See Your Location?
                    </h2>
                    <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                        I work with clients from any country. Book a call to discuss your
                        project and timezone requirements.
                    </p>
                    <a
                        href={SOCIAL_LINKS.calcom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-500 transition-colors"
                    >
                        Schedule Your Free Call
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
