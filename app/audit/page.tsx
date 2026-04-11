import { Metadata } from "next";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { InquiryForm } from "@/components/v2/inquiry-form";
import { PageBackground } from "@/components/ui/page-background";
import { SITE_URL } from "@/lib/constants";
import { Check } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Website Audit",
    description: "Request a free UX, performance, and conversion audit of your website. I'll record a personalized Loom walkthrough of what's working and what's costing you conversions.",
    openGraph: {
        title: "Free Website Audit",
        description: "Get a personalized video audit of your website. UX, performance, and conversion analysis.",
        type: "website",
        url: `${SITE_URL}/audit`,
    },
    alternates: {
        canonical: `${SITE_URL}/audit`,
    },
};

export default function AuditPage() {
    return (
        <main
            id="main-content"
            className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
        >
            <PageBackground />
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left: Info */}
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                Free
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                                Get a Free Website Audit
                            </h1>
                            <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                                Drop your URL and I&apos;ll send you a personalized Loom video
                                walking through your site&apos;s UX, copy, performance, and
                                conversion issues. No generic reports. Real feedback you can
                                act on.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Personalized Loom video walkthrough",
                                    "UX copy and conversion analysis",
                                    "Performance and SEO quick checks",
                                    "Specific recommendations you can implement",
                                    "Delivered within 48 hours",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                        <span className="text-sm text-zinc-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-zinc-50 border border-zinc-100">
                                <p className="text-xs text-zinc-500">
                                    <span className="font-medium text-zinc-700">Why free?</span> Most
                                    audits surface issues I can fix. If you like the audit, we can
                                    talk about working together. If not, you keep the video and
                                    the insights. No strings.
                                </p>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="border border-zinc-200 p-8">
                            <InquiryForm
                                variant="inline"
                                heading="Request Your Free Audit"
                                subheading="I'll review your site and send a Loom within 48 hours."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
