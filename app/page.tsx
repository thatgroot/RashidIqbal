import { Metadata } from "next";
import { HeroV2 as Hero } from "@/components/v2/hero";
import { NavbarV2 as Navbar } from "@/components/v2/navbar";
import { ServicesGridV2 as ServicesGrid } from "@/components/v2/services-grid";
import { TrustedByV2 as TrustedBy } from "@/components/v2/trusted-by";
import { ComparisonV2 as Comparison } from "@/components/v2/comparison";
import { ProcessV2 as Process } from "@/components/v2/process";
import { TestimonialsV2 as Testimonials } from "@/components/v2/testimonials";
import { PricingV2 as Pricing } from "@/components/v2/pricing";
import { FAQV2 as FAQ } from "@/components/v2/faq";
import { CTASectionV2 as CTASection } from "@/components/v2/cta";
import { FooterV2 as Footer } from "@/components/v2/footer";
import { SectionSpacer } from "@/components/section-spacer";


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export const metadata: Metadata = {
  title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
  description: "Expert freelance developer specializing in high-converting landing pages, scalable Next.js web apps, and native mobile applications. Turn your vision into a polished product.",
  keywords: ["Freelance Developer", "Next.js Expert", "React Native Developer", "Web Design", "Framer Developer", "High Performance Web", "Landing Pages", "Mobile Apps", "Expo Developer", "Flutter Developer"],
  openGraph: {
    title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
    description: "Expert freelance developer specializing in high-converting landing pages, scalable Next.js web apps, and native mobile applications.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rashid Iqbal",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal - Your Vision, Built Right",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rashidiqbal",
    creator: "@rashidiqbal",
    title: "Rashid Iqbal | High-Performance Web & Mobile Developer",
    description: "Turn your vision into a polished product with expert web and mobile development.",
    images: [
      {
        url: `${siteUrl}/twitter-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal - Your Vision, Built Right",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function Page() {
  return (
    <>

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
        <Comparison />
        <SectionSpacer />
        <ServicesGrid />
        <SectionSpacer />
        <Process />
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
    </>
  );
}
