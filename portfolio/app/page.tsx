import { Metadata } from "next";
import { HeroV2 } from "@/components/hero";
import { NavbarV2 } from "@/components/navbar";
import { ServicesGridV2 } from "@/components/services-grid";
import { TrustedByV2 } from "@/components/trusted-by";
import { DesignSectionV2 } from "@/components/design-section";
import { WebSectionV2 } from "@/components/web-section";
import { MobileSectionV2 } from "@/components/mobile-section";
import { ComparisonV2 } from "@/components/comparison";
import { ProcessV2 } from "@/components/process";
import { WorkV2 } from "@/components/work";
import { TestimonialsV2 } from "@/components/testimonials";
import { PricingV2 } from "@/components/pricing";
import { FAQV2 } from "@/components/faq";
import { CTASectionV2 } from "@/components/cta";
import { FooterV2 } from "@/components/footer";
 

export const metadata: Metadata = {
  description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps. Building with Next.js, Framer, Figma, Expo, and Flutter.",
};

export default function PageV2() {
  return (
    <>
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
