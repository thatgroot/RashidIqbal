import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    TECHNOLOGIES,
    SERVICES,
    getTechnologyBySlug,
    getAllTechnologySlugs,
} from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Check, ArrowRight, Code2 } from "lucide-react";

interface PageProps {
    params: Promise<{ technology: string }>;
}

// Generate static params for all technologies
export async function generateStaticParams() {
    return getAllTechnologySlugs().map((technology) => ({ technology }));
}

// Generate metadata for each technology page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { technology: slug } = await params;
    const technology = getTechnologyBySlug(slug);

    if (!technology) {
        return { title: "Technology Not Found" };
    }

    return {
        title: technology.title,
        description: technology.metaDescription,
        keywords: [
            technology.name,
            `${technology.name} developer`,
            `hire ${technology.name} developer`,
            ...technology.expertise.slice(0, 3),
        ],
        openGraph: {
            title: technology.title,
            description: technology.metaDescription,
            type: "website",
            url: `${SITE_URL}/developer/${slug}`,
            siteName: SITE_NAME,
            locale: "en_US",
            images: [
                {
                    url: `${SITE_URL}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: technology.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: technology.title,
            description: technology.metaDescription,
            creator: "@rashidrealme",
        },
        alternates: {
            canonical: `${SITE_URL}/developer/${slug}`,
        },
    };
}

// Technology page structured data
function TechnologyStructuredData({
    technology,
    slug,
}: {
    technology: (typeof TECHNOLOGIES)[0];
    slug: string;
}) {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: technology.title,
        description: technology.metaDescription,
        provider: {
            "@type": "Person",
            name: "Rashid Iqbal",
            url: SITE_URL,
            knowsAbout: [technology.name, ...technology.expertise],
        },
        url: `${SITE_URL}/developer/${slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
    );
}

export default async function TechnologyPage({ params }: PageProps) {
    const { technology: slug } = await params;
    const technology = getTechnologyBySlug(slug);

    if (!technology) {
        notFound();
    }

    // Get related services
    const relatedServices = SERVICES.filter((s) =>
        technology.relatedServices.includes(s.slug)
    );

    return (
        <>
            <TechnologyStructuredData technology={technology} slug={slug} />
            <main
                id="main-content"
                className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
            >
                <PageBackground variant="gradient" />
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-16 border-b border-zinc-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <Breadcrumb
                            items={[
                                { label: "Developer", href: "/developer" },
                                { label: technology.name, href: `/developer/${slug}` },
                            ]}
                            className="mb-8"
                        />

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider">
                                        <Code2 className="w-3.5 h-3.5" />
                                        {technology.name}
                                    </span>
                                    {technology.certification && (
                                        technology.certification.link ? (
                                            <a
                                                href={technology.certification.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-mono uppercase tracking-wider hover:bg-blue-100 transition-colors"
                                            >
                                                <Check className="w-3 h-3 text-blue-500" />
                                                {technology.certification.name}
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-mono uppercase tracking-wider">
                                                <Check className="w-3 h-3 text-blue-500" />
                                                {technology.certification.name}
                                            </span>
                                        )
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                                    {technology.heroHeadline}
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8">
                                    {technology.heroSubheadline}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={SOCIAL_LINKS.calcom}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded hover:bg-zinc-800 transition-colors"
                                    >
                                        Hire Me for {technology.name}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 text-zinc-700 font-medium rounded hover:border-zinc-300 transition-colors"
                                    >
                                        View All Services
                                    </Link>
                                </div>
                            </div>

                            {/* Expertise List */}
                            <div className="bg-zinc-50 rounded-xl p-8">
                                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                                    My {technology.name} Expertise
                                </h2>
                                <ul className="space-y-4">
                                    {technology.expertise.map((skill, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                            <span className="text-zinc-700">{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="py-20 border-b border-zinc-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-zinc-900 mb-4 text-center">
                            What I Build With {technology.name}
                        </h2>
                        <p className="text-lg text-zinc-500 mb-12 text-center max-w-2xl mx-auto">
                            {technology.name} is perfect for a wide range of applications.
                            Here are some of the projects I typically work on.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {technology.useCases.map((useCase, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-zinc-100 rounded-lg"
                                >
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-orange-600 font-bold">{index + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-zinc-900">
                                        {useCase}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="py-16 border-b border-zinc-100">
                        <div className="max-w-7xl mx-auto px-6">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                                Services Using {technology.name}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {relatedServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group p-6 border border-zinc-100 rounded-lg hover:border-orange-200 transition-colors"
                                    >
                                        <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                            {service.shortTitle}
                                        </h3>
                                        <p className="text-sm text-zinc-500 line-clamp-2">
                                            {service.description}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-4">
                                            View service
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-zinc-900 text-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Need a {technology.name} Developer?
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Book a free consultation to discuss your {technology.name} project
                            and get a custom quote.
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

                {/* Other Technologies */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                            Other Technologies I Work With
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {TECHNOLOGIES.filter((t) => t.slug !== slug).map((tech) => (
                                <Link
                                    key={tech.slug}
                                    href={`/developer/${tech.slug}`}
                                    className="px-4 py-2 border border-zinc-200 rounded-full text-sm text-zinc-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    {tech.name}
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
