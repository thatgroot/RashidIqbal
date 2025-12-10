import { Metadata } from "next";
import { HeroV2 as Hero } from "@/components/hero";
import { NavbarV2 as Navbar } from "@/components/navbar";
import { ServicesGridV2 as ServicesGrid } from "@/components/services-grid";
import { TrustedByV2 as TrustedBy } from "@/components/trusted-by";
import { ComparisonV2 as Comparison } from "@/components/comparison";
import { ProcessV2 as Process } from "@/components/process";
import { Tools } from "@/components/tools";
import { WorkV2 as Work } from "@/components/work";
import { TestimonialsV2 as Testimonials } from "@/components/testimonials";
import { PricingV2 as Pricing } from "@/components/pricing";
import { FAQV2 as FAQ } from "@/components/faq";
import { CTASectionV2 as CTASection } from "@/components/cta";
import { FooterV2 as Footer } from "@/components/footer";
import { SectionSpacer } from "@/components/section-spacer";


export const metadata: Metadata = {
  title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
  description: "Expert freelance developer specializing in high-converting landing pages, scalable Next.js web apps, and native mobile applications. Turn your vision into a polished product.",
  keywords: ["Freelance Developer", "Next.js Expert", "React Native Developer", "Web Design", "Framer Developer", "High Performance Web"],
  openGraph: {
    title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
    description: "Expert freelance developer specializing in high-converting landing pages, scalable Next.js web apps, and native mobile applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
    description: "Turn your vision into a polished product with expert web and mobile development.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden">
      {/* Enhanced Background with animated gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/50" />
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/2 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <Hero />
      <TrustedBy />
        <SectionSpacer />
      <ServicesGrid />
        <SectionSpacer />
      <Comparison />
        <SectionSpacer />
      <Process />
        <SectionSpacer />
        <Tools />
        <SectionSpacer />
      <Work />
        <SectionSpacer />
      <Testimonials />
        <SectionSpacer />
      <Pricing />
        <SectionSpacer />
      <FAQ />
        <SectionSpacer />
      <CTASection />
      <Footer />
    </main>
  );
}
