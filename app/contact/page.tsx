import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { InquiryForm } from "@/components/v2/inquiry-form";
import { GridContainer, GridItem } from "@/components/v2/grid-system";
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
                    <GridContainer cols={2}>
                        {/* Left: Contact info */}
                        <GridItem className="py-24">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                Available Now
                            </span>
                            <h1 className="text-4xl font-semibold text-zinc-900 mb-4 tracking-tight">
                                Start a Project
                            </h1>
                            <p className="text-zinc-500 leading-relaxed mb-10">
                                Describe your project in as much detail as you can.
                                I&apos;ll get back to you within 24 hours with questions
                                or a rough scope.
                            </p>

                            <div className="space-y-6">
                                <a
                                    href={`mailto:${AUTHOR.email}`}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                        <Mail className="w-4 h-4 text-zinc-600 group-hover:text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">{AUTHOR.email}</p>
                                        <p className="text-xs text-zinc-500">Email directly</p>
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
                        </GridItem>

                        {/* Right: Form */}
                        <GridItem className="py-24 bg-zinc-50/30">
                            <InquiryForm variant="inline" />
                        </GridItem>
                    </GridContainer>
                </div>
            </section>

            <Footer />
        </main>
    );
}
