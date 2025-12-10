import { Metadata } from "next";
import { HeroV2 } from "@/components/v2/hero";
import { NavbarV2 } from "@/components/v2/navbar";
import { ServicesGridV2 } from "@/components/v2/services-grid";
import { TrustedByV2 } from "@/components/v2/trusted-by";
import { DesignSectionV2 } from "@/components/v2/design-section";
import { WebSectionV2 } from "@/components/v2/web-section";
import { MobileSectionV2 } from "@/components/v2/mobile-section";
import { ComparisonV2 } from "@/components/v2/comparison";
import { ProcessV2 } from "@/components/v2/process";
import { WorkV2 } from "@/components/v2/work";
import { TestimonialsV2 } from "@/components/v2/testimonials";
import { PricingV2 } from "@/components/v2/pricing";
import { FAQV2 } from "@/components/v2/faq";
import { CTASectionV2 } from "@/components/v2/cta";
import { FooterV2 } from "@/components/v2/footer";
import { FAQStructuredData } from "@/components/seo/v2/faq-structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export const metadata: Metadata = {
  title: "Portfolio V2 | Rashid Iqbal - Web & Mobile Developer",
  description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps. Building with Next.js, Framer, Figma, Expo, and Flutter.",
  keywords: ["Freelance Developer", "Next.js Expert", "React Native Developer", "Web Design", "Framer Developer", "Landing Pages", "Mobile Apps"],
  openGraph: {
    title: "Portfolio V2 | Rashid Iqbal - Web & Mobile Developer",
    description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/v2`,
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
    title: "Portfolio V2 | Rashid Iqbal - Web & Mobile Developer",
    description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.",
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
    canonical: `${siteUrl}/v2`,
  },
};

export default function PageV2() {
  return (
    <>
      <FAQStructuredData />
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px] -z-10" />
        <NavbarV2 />
        <HeroV2 />
        <TrustedByV2 />
        <ServicesGridV2 />
        <DesignSectionV2 />
        <WebSectionV2 />
        <MobileSectionV2 />
        <ComparisonV2 />
        <ProcessV2 />
        <WorkV2 />
        <TestimonialsV2 />
        <PricingV2 />
        <FAQV2 />
        <CTASectionV2 />
        <FooterV2 />
      </main>
    </>
  );
}
