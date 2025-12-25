import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    LOCATIONS,
    SERVICES,
    getLocationBySlug,
    getAllLocationSlugs,
} from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS, AUTHOR } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Check, ArrowRight, Clock, Globe, MapPin } from "lucide-react";

interface PageProps {
    params: Promise<{ location: string }>;
}

// Generate static params for all locations
export async function generateStaticParams() {
    return getAllLocationSlugs().map((location) => ({ location }));
}

// Generate metadata for each location page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { location: slug } = await params;
    const location = getLocationBySlug(slug);

    if (!location) {
        return { title: "Location Not Found" };
    }

    return {
        title: location.title,
        description: location.metaDescription,
        keywords: [
            `${location.country} developer`,
            `hire developer ${location.country}`,
            "freelance developer",
            "web developer",
            "Next.js developer",
        ],
        openGraph: {
            title: location.title,
            description: location.metaDescription,
            type: "website",
            url: `${SITE_URL}/hire/${slug}`,
            siteName: SITE_NAME,
            locale: "en_US",
            images: [
                {
                    url: `${SITE_URL}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: location.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: location.title,
            description: location.metaDescription,
            creator: "@rashidrealme",
        },
        alternates: {
            canonical: `${SITE_URL}/hire/${slug}`,
        },
    };
}

// Location page structured data
function LocationStructuredData({
    location,
    slug,
}: {
    location: (typeof LOCATIONS)[0];
    slug: string;
}) {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `Rashid Iqbal - Web Developer for ${location.country}`,
        description: location.metaDescription,
        provider: {
            "@type": "Person",
            name: "Rashid Iqbal",
            url: SITE_URL,
        },
        url: `${SITE_URL}/hire/${slug}`,
        areaServed: {
            "@type": "Country",
            name: location.country,
        },
        telephone: AUTHOR.phone,
        email: AUTHOR.email,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
    );
}

export default async function LocationPage({ params }: PageProps) {
    const { location: slug } = await params;
    const location = getLocationBySlug(slug);

    if (!location) {
        notFound();
    }

    return (
        <>
            <LocationStructuredData location={location} slug={slug} />
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
                            items={[
                                { label: "Hire", href: "/hire" },
                                { label: location.country, href: `/hire/${slug}` },
                            ]}
                            className="mb-8"
                        />

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {location.region}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                                    {location.heroHeadline}
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8">
                                    {location.heroSubheadline}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={SOCIAL_LINKS.calcom}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded hover:bg-zinc-800 transition-colors"
                                    >
                                        Book a Free Call
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 text-zinc-700 font-medium rounded hover:border-zinc-300 transition-colors"
                                    >
                                        View Services
                                    </Link>
                                </div>
                            </div>

                            {/* Timezone & Availability Info */}
                            <div className="bg-zinc-50 rounded-xl p-8">
                                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                                    Working With Me
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-zinc-900 mb-1">Timezone</h3>
                                            <p className="text-zinc-600">{location.timezone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                            <Globe className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-zinc-900 mb-1">Availability</h3>
                                            <p className="text-zinc-600">{location.availability}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-zinc-200">
                                    <h3 className="font-medium text-zinc-900 mb-4">Why hire me for {location.country} projects?</h3>
                                    <ul className="space-y-3">
                                        {location.localBenefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-zinc-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 border-b border-zinc-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-zinc-900 mb-4 text-center">
                            Services Available for {location.country}
                        </h2>
                        <p className="text-lg text-zinc-500 mb-12 text-center max-w-2xl mx-auto">
                            All my services are available for clients in {location.country}.
                            Here&apos;s what I can help you build.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SERVICES.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="group p-6 border border-zinc-100 rounded-lg hover:border-orange-200 transition-colors"
                                >
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {service.shortTitle}
                                    </h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                                        {service.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                                        Learn more
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-zinc-900 text-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Book a free consultation to discuss your project. I work with clients
                            in {location.country} and worldwide.
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

                {/* Other Locations */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                            Also Serving Clients In
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {LOCATIONS.filter((l) => l.slug !== slug).map((otherLocation) => (
                                <Link
                                    key={otherLocation.slug}
                                    href={`/hire/${otherLocation.slug}`}
                                    className="px-4 py-2 border border-zinc-200 rounded-full text-sm text-zinc-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    {otherLocation.country}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
