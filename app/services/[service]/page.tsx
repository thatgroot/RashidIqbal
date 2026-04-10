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
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { TechnologyBadges } from "@/components/seo/internal-links";
import { RelatedContent } from "@/components/seo/related-content";
import { Check, ArrowRight, Plus, Minus } from "lucide-react";

// Hub-and-spoke: cross-links from service pages to blog posts and other pages
const SERVICE_RELATED_CONTENT: Record<string, { title: string; href: string; description: string }[]> = {
  "landing-pages": [
    { title: "What Does a Landing Page Actually Cost in 2026?", href: "/blog/landing-page-design-development-pricing", description: "Transparent pricing breakdown from DIY to agency, with what you get at each tier." },
    { title: "The Complete Blueprint for High-Converting Landing Pages", href: "/blog/building-high-converting-landing-pages", description: "Strategies and psychological triggers that transform visitors into customers." },
    { title: "Free Website Audit", href: "/audit", description: "Enter your URL and get instant performance, SEO, and accessibility scores." },
  ],
  "framer-development": [
    { title: "How to Hire a Framer Expert in 2026", href: "/blog/hiring-framer-expert-2026", description: "What to look for, what to avoid, and what a real Framer expert costs." },
    { title: "Next.js vs Framer: The Strategic Choice", href: "/blog/next-js-vs-framer-when-to-use-each", description: "When Framer wins, when Next.js makes sense, and when you need both." },
    { title: "View Portfolio", href: "/work", description: "53 Figma + Framer projects for SaaS, fintech, and personal brands." },
  ],
  "figma-to-code": [
    { title: "Figma to Code: The Complete Guide", href: "/blog/figma-to-code-complete-guide", description: "How to turn Figma designs into production websites without losing fidelity." },
    { title: "How to Hire a Framer Expert in 2026", href: "/blog/hiring-framer-expert-2026", description: "What separates a real Framer expert from someone who watched a few tutorials." },
    { title: "Free Website Audit", href: "/audit", description: "See how your current site scores on performance, SEO, and accessibility." },
  ],
  "chrome-extensions": [
    { title: "View Portfolio", href: "/work", description: "Chrome extensions and Framer sites shipped for SaaS and productivity companies." },
    { title: "For Agencies", href: "/partners", description: "White-label Figma and Framer development for agencies. Your brand, my execution." },
    { title: "Book a Free Call", href: "https://cal.com/rashid.iqbal", description: "Discuss your Chrome extension idea. No commitment." },
  ],
  "ux-copywriting": [
    { title: "The Complete Blueprint for High-Converting Landing Pages", href: "/blog/building-high-converting-landing-pages", description: "Copy frameworks and conversion triggers from 50+ real projects." },
    { title: "What Does a Landing Page Actually Cost in 2026?", href: "/blog/landing-page-design-development-pricing", description: "Why underspending on copy is the biggest mistake." },
    { title: "Free Website Audit", href: "/audit", description: "Get an instant UX and conversion audit of your current site." },
  ],
};

interface PageProps {
    params: Promise<{ service: string }>;
}

// Generate static params for all services
export async function generateStaticParams() {
    return getAllServiceSlugs().map((service) => ({ service }));
}

// Generate metadata for each service page
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

// Service page structured data
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

// FAQ Accordion component
function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
    return (
        <div className="divide-y divide-zinc-200">
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
                    <div className="pb-6 text-zinc-600 leading-relaxed">
                        {faq.answer}
                    </div>
                </details>
            ))}
        </div>
    );
}

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
                <PageBackground />
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-16 border-b border-zinc-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <Breadcrumb
                            items={[
                                { label: "Services", href: "/services" },
                                { label: service.shortTitle, href: `/services/${slug}` },
                            ]}
                            className="mb-8"
                        />

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    {service.shortTitle}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                                    {service.heroHeadline}
                                </h1>
                                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8">
                                    {service.heroSubheadline}
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
                                        href="/#work"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 text-zinc-700 font-medium rounded hover:border-zinc-300 transition-colors"
                                    >
                                        View Portfolio
                                    </Link>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="bg-zinc-50 rounded-xl p-8">
                                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                                    What&apos;s Included
                                </h2>
                                <ul className="space-y-4">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                            <span className="text-zinc-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-zinc-200">
                                    <p className="text-sm text-zinc-500 mb-1">Starting from</p>
                                    <p className="text-2xl font-bold text-zinc-900">{service.priceRange}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 border-b border-zinc-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">
                            Why Choose My {service.shortTitle} Service?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {service.benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-zinc-100 rounded-lg hover:border-orange-200 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-orange-600 font-bold">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-zinc-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technologies Section */}
                {service.relatedTechnologies.length > 0 && (
                    <section className="py-16 border-b border-zinc-100">
                        <div className="max-w-7xl mx-auto px-6">
                            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                                Technologies Used
                            </h2>
                            <TechnologyBadges technologies={service.relatedTechnologies} />
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                <section className="py-20 border-b border-zinc-100">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <FAQAccordion faqs={service.faqs} />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-zinc-900 text-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your {service.shortTitle} Project?
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Book a free 30-minute consultation to discuss your project requirements and get a custom quote.
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

                {/* Related Content (hub-and-spoke cross-linking) */}
                {SERVICE_RELATED_CONTENT[slug] && (
                    <section className="py-16 border-b border-zinc-100">
                        <div className="max-w-7xl mx-auto px-6">
                            <RelatedContent
                                title="Related Reading"
                                links={SERVICE_RELATED_CONTENT[slug]}
                            />
                        </div>
                    </section>
                )}

                {/* Related Services */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                            Other Services You Might Need
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {SERVICES.filter((s) => s.slug !== slug)
                                .slice(0, 3)
                                .map((relatedService) => (
                                    <Link
                                        key={relatedService.slug}
                                        href={`/services/${relatedService.slug}`}
                                        className="group p-6 border border-zinc-100 rounded-lg hover:border-orange-200 transition-colors"
                                    >
                                        <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                                            {relatedService.shortTitle}
                                        </h3>
                                        <p className="text-sm text-zinc-500 line-clamp-2">
                                            {relatedService.description}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-4">
                                            Learn more
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
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
