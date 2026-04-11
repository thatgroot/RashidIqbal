import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { PageBackground } from "@/components/ui/page-background";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants";
import { ArrowRight, Check, Shield, Clock, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "White-Label Figma & Framer for Agencies",
    description: "White-label Figma design and Framer development for agencies. I become your design and dev department. Your brand, my execution.",
    openGraph: {
        title: "White-Label Figma & Framer for Agencies",
        description: "White-label Figma and Framer services for agencies.",
        url: `${SITE_URL}/partners`,
    },
    alternates: { canonical: `${SITE_URL}/partners` },
};

const benefits = [
    {
        icon: Shield,
        title: "Full NDA and White-Label",
        desc: "Your brand on everything. Your clients never know I exist. Signed NDA before we start.",
    },
    {
        icon: Clock,
        title: "48hr Response SLA",
        desc: "Dedicated Slack channel. I respond within a business day and deliver on agreed timelines.",
    },
    {
        icon: Users,
        title: "Seamless Handoff",
        desc: "I work in your Figma workspace, use your naming conventions, follow your design system.",
    },
    {
        icon: Zap,
        title: "Overflow Ready",
        desc: "When your team is maxed out, I pick up the overflow. No onboarding needed after the first project.",
    },
];

const services = [
    "Figma design (landing pages, marketing sites, web apps)",
    "UX copywriting (headlines, CTAs, page flow)",
    "Framer development (pixel-perfect builds from Figma)",
    "Chrome extension development",
    "Conversion optimization and CRO audits",
    "Responsive QA and performance optimization",
];

export default function PartnersPage() {
    return (
        <main className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
            <PageBackground />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 border-b border-zinc-100">
                <div className="max-w-4xl mx-auto px-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        For Agencies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                        I become your Figma and Framer department.
                    </h1>
                    <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-2xl">
                        You sell. I build. Your brand goes on everything. No onboarding headaches,
                        no flaky freelancers, no missed deadlines. Just clean Figma designs and
                        pixel-perfect Framer builds, delivered on time under your banner.
                    </p>
                    <a
                        href={SOCIAL_LINKS.calcom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold text-sm hover:bg-orange-500 transition-colors"
                    >
                        Talk Partnership <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {benefits.map((b, i) => (
                            <div key={i} className="p-6 border border-zinc-100">
                                <b.icon className="w-5 h-5 text-orange-500 mb-4" />
                                <h3 className="font-bold text-zinc-900 mb-2">{b.title}</h3>
                                <p className="text-sm text-zinc-500">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-zinc-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                        What I Handle for Your Agency
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {services.map((s, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-zinc-700">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-8">How It Works</h2>
                    <div className="space-y-6">
                        {[
                            { num: "01", title: "Intro call", desc: "We talk about your agency, your clients, and what kind of work you need covered." },
                            { num: "02", title: "First project at discount", desc: "We do one project together at a reduced rate so you can evaluate quality and communication." },
                            { num: "03", title: "Retainer agreement", desc: "If it works, we set up a monthly retainer. Dedicated Slack channel, agreed SLAs, recurring billing." },
                            { num: "04", title: "Ongoing", desc: "You sell, I build. I join your team meetings when needed, use your tools, follow your processes." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <span className="text-3xl font-bold text-zinc-200 shrink-0 w-10">{step.num}</span>
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-1">{step.title}</h3>
                                    <p className="text-sm text-zinc-500">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Let&apos;s see if we&apos;re a fit.
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                        I work with a limited number of agency partners to keep quality high.
                        Book a quick call and let&apos;s talk about what you need.
                    </p>
                    <a
                        href={SOCIAL_LINKS.calcom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors"
                    >
                        Schedule a Partnership Call <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
