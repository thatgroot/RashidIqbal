import { Metadata } from "next";
import Link from "next/link";
import { TECHNOLOGIES } from "@/lib/seo-data";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ArrowRight, Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Expertise | Figma, Framer & Chrome Extensions",
    description: "Deep expertise in Figma design, Framer development, Chrome extensions, and UX copywriting. See what I can do for your project.",
    keywords: [
        "Figma expert",
        "Framer expert",
        "Chrome extension developer",
        "UX copywriting",
        "Framer developer",
        "conversion optimization",
    ],
    openGraph: {
        title: "Expertise | Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, Chrome extensions, and UX copywriting expertise.",
        type: "website",
        url: `${SITE_URL}/developer`,
        siteName: SITE_NAME,
    },
    twitter: {
        card: "summary_large_image",
        title: "Expertise | Figma, Framer & Chrome Extensions",
        description: "Figma design, Framer development, and Chrome extension expertise.",
    },
    alternates: {
        canonical: `${SITE_URL}/developer`,
    },
};

export default function DeveloperPage() {
    return (
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
                        items={[{ label: "Developer", href: "/developer" }]}
                        className="mb-8"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                            <Code2 className="w-3.5 h-3.5" />
                            Technologies
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                            Tools &amp; Expertise
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-8">
                            Figma for design, Framer for builds, Chrome extensions for the ecosystem,
                            and UX copywriting that converts. Explore my expertise.
                        </p>
                        <a
                            href={SOCIAL_LINKS.calcom}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded hover:bg-zinc-800 transition-colors"
                        >
                            Discuss Your Project
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Technologies Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TECHNOLOGIES.map((tech) => (
                            <Link
                                key={tech.slug}
                                href={`/developer/${tech.slug}`}
                                className="group block p-8 border border-zinc-100 rounded-xl hover:border-orange-200 hover:shadow-lg transition-all"
                            >
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                        <Code2 className="w-3.5 h-3.5" />
                                        {tech.name}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                                    {tech.heroHeadline}
                                </h2>
                                <p className="text-zinc-600 mb-6 line-clamp-2">
                                    {tech.heroSubheadline}
                                </p>
                                <ul className="space-y-2 mb-6">
                                    {tech.expertise.slice(0, 3).map((skill, index) => (
                                        <li key={index} className="text-sm text-zinc-500">
                                            • {skill}
                                        </li>
                                    ))}
                                </ul>
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:gap-2 transition-all">
                                    View expertise
                                    <ArrowRight className="w-4 h-4" />
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
                        Have a Figma or Framer Project?
                    </h2>
                    <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Whether it&apos;s a landing page, full website, or a Chrome extension
                        for your design workflow — let&apos;s talk about what you need.
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
