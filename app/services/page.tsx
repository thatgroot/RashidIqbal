import { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Services — Figma Design, Framer Development & Chrome Extensions",
    description: "Expert Figma design, Framer development, UX copywriting, and Chrome extension development. High-converting landing pages and tools for the Figma/Framer ecosystem.",
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
        title: "Services — Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, UX copywriting, and Chrome extensions for the design ecosystem.",
        type: "website",
        url: `${SITE_URL}/services`,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: "Services — Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, and Chrome extensions for UX and conversion.",
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
            <PageBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-6">
                    <Breadcrumb
                        items={[{ label: "Services", href: "/services" }]}
                        className="mb-8"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            Services
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                            Figma, Framer &amp; Chrome Extensions
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
                            I design in Figma, build in Framer, write conversion-focused UX copy,
                            and create Chrome extensions that supercharge the design workflow.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group block p-8 border border-zinc-100 rounded-xl hover:border-orange-200 hover:shadow-lg transition-all"
                            >
                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded">
                                        {service.shortTitle}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                                    {service.heroHeadline}
                                </h2>
                                <p className="text-zinc-600 mb-6 line-clamp-3">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-zinc-900">
                                        {service.priceRange}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:gap-2 transition-all">
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Not Sure Where to Start?
                    </h2>
                    <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Book a free call and I&apos;ll audit your current site for UX, copy,
                        and conversion opportunities.
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
