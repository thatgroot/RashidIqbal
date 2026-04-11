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
import { GridContainer, GridItem } from "@/components/v2/grid-system";
import { Check, ArrowRight, Clock, Globe, MapPin, Layout } from "lucide-react";

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
                <section className="pt-16 bg-white relative">
                    <div className="max-w-container border-l border-zinc-100 relative">
                        <GridContainer cols={1}>
                            <GridItem className="border-t pt-16 pb-12" padding={false}>
                                <div className="px-8 sm:px-12">
                                    <Breadcrumb
                                        items={[
                                            { label: "Hire", href: "/hire" },
                                            { label: location.country, href: `/hire/${slug}` },
                                        ]}
                                        className="mb-8"
                                    />
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-mono uppercase tracking-widest mb-6">
                                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                                        {location.region}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-6 tracking-tight leading-[0.95]">
                                        {location.heroHeadline}
                                    </h1>
                                    <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8 max-w-2xl">
                                        {location.heroSubheadline}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={SOCIAL_LINKS.calcom}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-700 text-white font-bold text-sm hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                                        >
                                            Book a Free Call
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </a>
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-zinc-200 text-zinc-700 font-bold text-sm hover:border-zinc-900 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                                        >
                                            View Services
                                        </Link>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        {/* Working With Me Info Grid */}
                        <GridContainer cols={2}>
                            <GridItem>
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">
                                    Working With Me
                                </span>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                                            <Clock className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-zinc-900 mb-1">Timezone</h3>
                                            <p className="text-sm text-zinc-500">{location.timezone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                                            <Globe className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-zinc-900 mb-1">Availability</h3>
                                            <p className="text-sm text-zinc-500">{location.availability}</p>
                                        </div>
                                    </div>
                                </div>
                            </GridItem>

                            <GridItem>
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">
                                    Why Hire Me for {location.country}
                                </span>
                                <ul className="space-y-3">
                                    {location.localBenefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="text-sm text-zinc-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </GridItem>
                        </GridContainer>
                    </div>
                </section>

                {/* Services Section */}
                <section className="bg-white">
                    <div className="max-w-container border-l border-zinc-100">
                        <GridContainer cols={1}>
                            <GridItem>
                                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
                                    Services Available for {location.country}
                                </h2>
                                <p className="text-lg text-zinc-500 max-w-2xl">
                                    All my services are available for clients in {location.country}.
                                    Here&apos;s what I can help you build.
                                </p>
                            </GridItem>
                        </GridContainer>

                        <GridContainer cols={3}>
                            {SERVICES.map((service, i) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="block group"
                                    aria-label={`${service.shortTitle} service`}
                                >
                                    <GridItem className="h-full flex flex-col min-h-[200px]">
                                        <div className="w-9 h-9 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                            <Layout className="w-4 h-4 text-zinc-600 group-hover:text-orange-600 transition-colors" aria-hidden="true" />
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">0{i + 1}</span>
                                        <h3 className="text-lg font-medium text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                            {service.shortTitle}
                                        </h3>
                                        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 flex-1">
                                            {service.description}
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
                </section>

                {/* CTA Section */}
                <section className="bg-white">
                    <div className="max-w-container border-l border-zinc-100">
                        <GridContainer cols={1}>
                            <GridItem className="py-20 text-center">
                                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-6">
                                    Ready to Start Your Project?
                                </h2>
                                <p className="text-lg text-zinc-500 mb-8 max-w-2xl mx-auto">
                                    Book a free consultation to discuss your project. I work with clients
                                    in {location.country} and worldwide.
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

                {/* Other Locations */}
                <section className="bg-white">
                    <div className="max-w-container border-l border-zinc-100">
                        <GridContainer cols={1}>
                            <GridItem>
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">
                                    Also Serving Clients In
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {LOCATIONS.filter((l) => l.slug !== slug).map((otherLocation) => (
                                        <Link
                                            key={otherLocation.slug}
                                            href={`/hire/${otherLocation.slug}`}
                                            className="px-4 py-2 border border-zinc-200 text-sm text-zinc-600 hover:border-orange-500 hover:text-orange-600 transition-colors font-mono"
                                        >
                                            {otherLocation.country}
                                        </Link>
                                    ))}
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
