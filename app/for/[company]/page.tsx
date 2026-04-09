import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { SOCIAL_LINKS } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ company: string }>;
}

function formatCompanyName(slug: string): string {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { company } = await params;
    const name = formatCompanyName(company);
    return {
        title: `For ${name}`,
        description: `A personalized proposal for ${name}. Figma design, Framer development, and conversion optimization.`,
        robots: { index: false, follow: false },
    };
}

export default async function ProspectPage({ params }: Props) {
    const { company } = await params;
    const companyName = formatCompanyName(company);

    return (
        <main className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
            <PageBackground />
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-6">
                    {/* Header */}
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Prepared for {companyName}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                        Here&apos;s how I can help {companyName}
                    </h1>

                    <p className="text-lg text-zinc-500 leading-relaxed mb-12">
                        I looked at your current website and put together a few ideas. This isn&apos;t a
                        generic pitch. These are specific things I&apos;d do differently if I were
                        redesigning your site in Figma and building it on Framer.
                    </p>

                    {/* What I'd Do */}
                    <div className="border border-zinc-200 p-8 mb-8">
                        <h2 className="text-xl font-bold text-zinc-900 mb-6">What I&apos;d Change</h2>
                        <div className="space-y-4">
                            {[
                                "Redesign the hero section with a clearer value prop and stronger CTA",
                                "Rewrite UX copy throughout for conversion (headlines, CTAs, objection handling)",
                                "Build it on Framer so your team can update content without a developer",
                                "Optimize for mobile (59% of traffic) and page speed (sub-2s load time)",
                                "Add structured data and SEO fundamentals for search visibility",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                    <span className="text-sm text-zinc-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="border border-zinc-200 p-8 mb-8">
                        <h2 className="text-xl font-bold text-zinc-900 mb-4">Investment</h2>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold text-zinc-900">$1,000</span>
                            <span className="text-lg text-zinc-500">– $2,500</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6">
                            Depends on page count and complexity. Includes Figma design with UX copy,
                            Framer build, responsive, SEO, and analytics. Delivered in 2-3 weeks.
                        </p>
                        <a
                            href={SOCIAL_LINKS.calcom}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors"
                        >
                            Book a 15-min Call <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Social Proof */}
                    <div className="border border-zinc-200 p-8 mb-8">
                        <h2 className="text-xl font-bold text-zinc-900 mb-4">Recent Work</h2>
                        <p className="text-sm text-zinc-500 mb-4">
                            I&apos;ve built sites for UpdateAI (acquired by Gainsight), Crezco,
                            Composio, Vanos AI, and 50+ other companies.
                        </p>
                        <Link
                            href="/work"
                            className="text-sm font-medium text-orange-600 hover:text-orange-500"
                        >
                            See the full portfolio →
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="text-center py-12">
                        <p className="text-zinc-500 mb-4">
                            No pressure. Let&apos;s just talk about what {companyName} needs.
                        </p>
                        <a
                            href={SOCIAL_LINKS.calcom}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors"
                        >
                            Schedule a Free Call <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
