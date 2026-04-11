import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    SERVICES,
    getServiceBySlug,
    getAllServiceSlugs,
} from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { GridContainer, GridItem } from "@/components/v2/grid-system";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { TechnologyBadges } from "@/components/seo/internal-links";
import { RelatedContent } from "@/components/seo/related-content";
import { Check, ArrowRight, Plus, Minus } from "lucide-react";

interface PageProps {
    params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
    return getAllServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service: slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return { title: "Service Not Found" };
    }

    return {
        title: service.title,
        description: service.metaDescription,
        keywords: [service.title, ...service.features.slice(0, 5)],
        openGraph: {
            title: service.title,
            description: service.metaDescription,
            type: "website",
            url: `${SITE_URL}/services/${slug}`,
            siteName: SITE_NAME,
            locale: "en_US",
            images: [
                {
                    url: `${SITE_URL}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: service.title,
            description: service.metaDescription,
            creator: "@rashidrealme",
        },
        alternates: {
            canonical: `${SITE_URL}/services/${slug}`,
        },
    };
}

function ServiceStructuredData({
    service,
    slug,
}: {
    service: (typeof SERVICES)[0];
    slug: string;
}) {
    const combinedSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                name: service.title,
                description: service.description,
                provider: {
                    "@type": "Person",
                    name: "Rashid Iqbal",
                    url: SITE_URL,
                },
                url: `${SITE_URL}/services/${slug}`,
                areaServed: {
                    "@type": "Place",
                    name: "Worldwide",
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: service.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
    );
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
    return (
        <div className="divide-y divide-zinc-100">
            {faqs.map((faq, index) => (
                <details
                    key={index}
                    className="group"
                    open={index === 0}
                >
                    <summary className="flex items-center justify-between cursor-pointer py-6 text-left">
                        <span className="font-medium text-zinc-900 pr-8">{faq.question}</span>
                        <span className="shrink-0">
                            <Plus className="w-5 h-5 text-zinc-500 group-open:hidden" />
                            <Minus className="w-5 h-5 text-zinc-500 hidden group-open:block" />
                        </span>
                    </summary>
                    <div className="pb-6 text-sm text-zinc-600 leading-relaxed">
                        {faq.answer}
                    </div>
                </details>
            ))}
        </div>
    );
}

// Hub-and-spoke cross-links
const SERVICE_RELATED_CONTENT: Record<string, { title: string; href: string; description: string }[]> = {
    "landing-pages": [
        { title: "What Does a Landing Page Actually Cost in 2026?", href: "/blog/landing-page-design-development-pricing", description: "Transparent pricing breakdown from DIY to agency." },
        { title: "The Complete Blueprint for High-Converting Landing Pages", href: "/blog/building-high-converting-landing-pages", description: "Strategies that transform visitors into customers." },
        { title: "Free Website Audit", href: "/audit", description: "Get instant performance, SEO, and accessibility scores." },
    ],
    "framer-development": [
        { title: "How to Hire a Framer Expert in 2026", href: "/blog/hiring-framer-expert-2026", description: "What to look for and what a real expert costs." },
        { title: "Next.js vs Framer: The Strategic Choice", href: "/blog/next-js-vs-framer-when-to-use-each", description: "When each platform makes sense." },
        { title: "View Portfolio", href: "/work", description: "53 projects for SaaS, fintech, and personal brands." },
    ],
    "figma-to-code": [
        { title: "Figma to Code: The Complete Guide", href: "/blog/figma-to-code-complete-guide", description: "How to turn Figma designs into production websites." },
        { title: "How to Hire a Framer Expert in 2026", href: "/blog/hiring-framer-expert-2026", description: "What separates a real expert from a beginner." },
        { title: "Free Website Audit", href: "/audit", description: "See how your current site scores." },
    ],
    "chrome-extensions": [
        { title: "View Portfolio", href: "/work", description: "Chrome extensions and websites shipped for SaaS companies." },
        { title: "For Agencies", href: "/partners", description: "White-label development for agencies." },
        { title: "Book a Free Call", href: "https://cal.com/rashid.iqbal", description: "Discuss your Chrome extension idea." },
    ],
    "ux-copywriting": [
        { title: "The Complete Blueprint for High-Converting Landing Pages", href: "/blog/building-high-converting-landing-pages", description: "Copy frameworks from 50+ real projects." },
        { title: "What Does a Landing Page Actually Cost in 2026?", href: "/blog/landing-page-design-development-pricing", description: "Why underspending on copy is the biggest mistake." },
        { title: "Free Website Audit", href: "/audit", description: "Get a UX and conversion audit of your current site." },
    ],
};

export default async function ServicePage({ params }: PageProps) {
    const { service: slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <ServiceStructuredData service={service} slug={slug} />
            <main
                id="main-content"
                className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
            >
                <Navbar />

                <section className="pt-16 bg-white">
                    <div className="max-w-container border-l border-zinc-100">
                        {/* Hero */}
                        <GridContainer cols={2}>
                            <GridItem className="py-24">
                                <Breadcrumb
                                    items={[
                                        { label: "Services", href: "/services" },
                                        { label: service.shortTitle, href: `/services/${slug}` },
                                    ]}
                                    className="mb-8"
                                />
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    {service.shortTitle}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-6 tracking-tight">
                                    {service.heroHeadline}
                                </h1>
                                <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                                    {service.heroSubheadline}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={SOCIAL_LINKS.calcom}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors"
                                    >
                                        Book a Free Call
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <Link
                                        href="/work"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-bold hover:border-zinc-900 transition-colors"
                                    >
                                        View Portfolio
                                    </Link>
                                </div>
                            </GridItem>

                            {/* Features */}
                            <GridItem className="py-24 bg-zinc-50/30">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6 block">
                                    What&apos;s Included
                                </span>
                                <ul className="space-y-4 mb-8">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-zinc-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-6 border-t border-zinc-200">
                                    <p className="text-xs text-zinc-500 mb-1">Starting from</p>
                                    <p className="text-2xl font-bold text-zinc-900">{service.priceRange}</p>
                                </div>
                            </GridItem>
                        </GridContainer>

                        {/* Benefits */}
                        <GridContainer>
                            <GridItem className="py-24">
                                <h2 className="text-3xl font-semibold text-zinc-900 mb-12">
                                    Why Choose My {service.shortTitle} Service?
                                </h2>
                            </GridItem>
                        </GridContainer>

                        <GridContainer cols={2}>
                            {service.benefits.map((benefit, index) => (
                                <GridItem key={index}>
                                    <div className="flex items-start gap-4">
                                        <span className="w-8 h-8 bg-orange-100 flex items-center justify-center shrink-0 text-orange-600 text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 mb-2">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </GridItem>
                            ))}
                        </GridContainer>

                        {/* Technologies */}
                        {service.relatedTechnologies.length > 0 && (
                            <GridContainer>
                                <GridItem className="py-12">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-6 block">
                                        Technologies Used
                                    </span>
                                    <TechnologyBadges technologies={service.relatedTechnologies} />
                                </GridItem>
                            </GridContainer>
                        )}

                        {/* FAQ */}
                        <GridContainer cols={2}>
                            <GridItem className="py-24">
                                <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-zinc-500">
                                    Common questions about my {service.shortTitle.toLowerCase()} service.
                                </p>
                            </GridItem>
                            <GridItem className="py-24">
                                <FAQAccordion faqs={service.faqs} />
                            </GridItem>
                        </GridContainer>

                        {/* CTA */}
                        <GridContainer>
                            <GridItem className="py-24 text-center">
                                <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
                                    Ready to Start Your {service.shortTitle} Project?
                                </h2>
                                <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
                                    Book a free 30-minute call to discuss your project and get a custom quote.
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

                        {/* Related Content */}
                        {SERVICE_RELATED_CONTENT[slug] && (
                            <GridContainer>
                                <GridItem className="py-12">
                                    <RelatedContent
                                        title="Related Reading"
                                        links={SERVICE_RELATED_CONTENT[slug]}
                                    />
                                </GridItem>
                            </GridContainer>
                        )}

                        {/* Related Services */}
                        <GridContainer>
                            <GridItem className="py-12">
                                <h2 className="text-xl font-bold text-zinc-900 mb-8">
                                    Other Services You Might Need
                                </h2>
                            </GridItem>
                        </GridContainer>

                        <GridContainer cols={3}>
                            {SERVICES.filter((s) => s.slug !== slug)
                                .slice(0, 3)
                                .map((relatedService) => (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/services/${relatedService.slug}`}
                                        className="group block"
                                    >
                                        <GridItem className="h-full hover:bg-zinc-50/50 transition-colors">
                                            <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                {relatedService.shortTitle}
                                            </h3>
                                            <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                                                {relatedService.description}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600">
                                                Learn more
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </GridItem>
                                    </Link>
                                ))}
                        </GridContainer>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
