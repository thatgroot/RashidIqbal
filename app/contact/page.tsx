import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceBuilder } from "@/components/shared/service-builder";
import { SITE_URL, SOCIAL_LINKS, AUTHOR } from "@/lib/constants";
import { Mail, Phone, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "Start a Figma, Framer, or Chrome Extension Project",
    description: "Tell me about your project. Figma design, Framer development, or Chrome extensions. I respond within 24 hours with a scope and quote.",
    openGraph: {
        title: "Start a Figma, Framer, or Chrome Extension Project",
        description: "Describe your project and get a response within 24 hours.",
        type: "website",
        url: `${SITE_URL}/contact`,
    },
    alternates: {
        canonical: `${SITE_URL}/contact`,
    },
};

export default function ContactPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <Navbar />

            <section className="pt-16 bg-white">
                <div className="max-w-container border-l border-zinc-100">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-0 border-b border-zinc-100">
                        {/* Main: Service Builder */}
                        <div className="py-24 px-6 md:px-12 lg:px-16">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                Accepting New Projects
                            </span>
                            <ServiceBuilder />
                        </div>

                        {/* Sidebar: Contact Info */}
                        <div className="py-24 px-6 lg:px-8 border-l border-zinc-100 bg-zinc-50/30">
                            <h3 className="text-lg font-bold text-zinc-900 mb-6">
                                Prefer to talk first?
                            </h3>

                            <div className="space-y-6">
                                <a
                                    href={`mailto:${AUTHOR.email}`}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                        <Mail className="w-4 h-4 text-zinc-600 group-hover:text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">Email me</p>
                                        <p className="text-xs text-zinc-500">Direct to my inbox</p>
                                    </div>
                                </a>

                                <a
                                    href={SOCIAL_LINKS.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                        <Phone className="w-4 h-4 text-zinc-600 group-hover:text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">WhatsApp</p>
                                        <p className="text-xs text-zinc-500">Quick chat</p>
                                    </div>
                                </a>

                                <a
                                    href={SOCIAL_LINKS.calcom}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                        <Calendar className="w-4 h-4 text-zinc-600 group-hover:text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">Book a Call</p>
                                        <p className="text-xs text-zinc-500">30 min, free</p>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-10 p-4 bg-white border border-zinc-200">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                                    Why work with me?
                                </h4>
                                <ul className="space-y-2.5">
                                    {[
                                        "Direct communication",
                                        "High-quality delivery",
                                        "24hr response guarantee",
                                        "Transparent pricing",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-zinc-600">
                                            <span className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
