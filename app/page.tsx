import { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/layout/navbar";
import { ServicesGrid } from "@/components/landing/services-grid";
import { CaseStudies } from "@/components/landing/case-studies";
import { ServiceList } from "@/components/landing/service-list";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";
import { SectionSpacer } from "@/components/shared/section-spacer";
import { ScrollCTA } from "@/components/shared/scroll-cta";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { SITE_URL as siteUrl } from "@/lib/constants";




export const metadata: Metadata = {
  title: "Figma & Framer Expert | Websites That Convert",
  description: "I design in Figma, build in Framer, and develop Chrome extensions. High-converting landing pages and websites with UX copy baked in. 50+ projects.",
  keywords: ["Figma expert", "Framer expert", "Chrome extensions Figma", "UX copywriting", "landing page designer", "Framer developer", "Figma to Framer", "conversion optimization", "Chrome extension developer", "landing page conversion"],
  openGraph: {
    title: "Figma & Framer Expert | Websites That Convert",
    description: "Figma design, Framer builds, Chrome extensions. Websites that convert with UX copy baked in. 50+ projects shipped.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rashid Iqbal",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal. Figma & Framer Expert",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rashidrealme",
    creator: "@rashidrealme",
    title: "Figma & Framer Expert | Websites That Convert",
    description: "Figma design, Framer builds, Chrome extensions. Websites that convert with UX copy baked in.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal. Figma & Framer Expert",
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

// Pull CMS-managed sections at SSR. Each query is best-effort and
// silently empty when the CMS is empty (the components fall back to
// their hardcoded defaults).
import {
  listPublishedTestimonials,
  listPublishedFaqs,
  listPublishedCaseStudies,
} from "@/lib/cms/queries";
import type { CaseStudyCard } from "@/components/landing/case-studies";

// ISR: regenerate every 30 minutes so CMS edits propagate without
// giving up static delivery (force-dynamic killed TTFB + Core Web Vitals).
export const revalidate = 1800;

export default async function Page() {
  const [cmsTestimonials, cmsFaqs, cmsCases] = await Promise.all([
    listPublishedTestimonials().catch(() => []),
    listPublishedFaqs("landing").catch(() => []),
    listPublishedCaseStudies().catch(() => []),
  ]);

  const testimonialItems = cmsTestimonials.map((t) => ({
    text: t.quote,
    author: t.author,
    role: t.title || "",
    accent: t.accent || "bg-orange-500",
    ...(t.avatarUrl ? { avatarUrl: t.avatarUrl } : {}),
  }));

  const faqItems = cmsFaqs.map((f) => ({ q: f.question, a: f.answer }));

  // Map CMS case-study rows onto the homepage card shape. The CMS row
  // doesn't carry separate problem/solution columns yet — only summary
  // + body — so the card renders summary as the "result" line and the
  // body deep-dive lives at /work/<slug>.
  // Slug → screenshot path. Mirrors files in public/work-screenshots/.
  const screenshotForSlug: Record<string, string> = {
    updateai: "/work-screenshots/updateai.png",
    "vanos-ai": "/work-screenshots/vanos-ai.png",
    "spacedome-ai": "/work-screenshots/space-dome.png",
    atqleads: "/work-screenshots/funnel-labs.png",
  };

  const caseItems: CaseStudyCard[] = cmsCases.map((c) => ({
    client: c.clientName,
    result: c.summary || c.title,
    ...(c.metrics?.[0] ? { detail: `${c.metrics[0].value} · ${c.metrics[0].label}` } : {}),
    link: c.liveUrl || `/work/${c.slug}`,
    tags: c.tags ?? [],
    ...(c.coverImage ? { screenshot: c.coverImage } : screenshotForSlug[c.slug] ? { screenshot: screenshotForSlug[c.slug]! } : {}),
  }));

  return _renderPage({ testimonialItems, faqItems, caseItems });
}

function _renderPage({
  testimonialItems,
  faqItems,
  caseItems,
}: {
  testimonialItems: Array<{ text: string; author: string; role: string; accent: string; avatarUrl?: string }>;
  faqItems: Array<{ q: string; a: string }>;
  caseItems: CaseStudyCard[];
}) {
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

        <Navbar variant="homepage" />
        {/* HOOK */}
        <Hero />
        {/* PROOF — case studies showcase + trust strip moved directly
            below the hero so the visitor sees real outcomes before they
            scroll into anything else. */}
        <CaseStudies {...(caseItems.length > 0 ? { items: caseItems } : {})} />
        <SectionSpacer />
        {/* SERVICES — My Services grid. */}
        <ServicesGrid />
        <SectionSpacer />
        {/* SERVICE LIST — typographic numbered services + client outcomes
            (replaces the old credibility / about block). */}
        <ServiceList />
        <SectionSpacer />
        <Testimonials
          {...(testimonialItems.length > 0 ? { items: testimonialItems } : {})}
        />
        <SectionSpacer />
        <Pricing />
        <SectionSpacer />
        <FAQ {...(faqItems.length > 0 ? { items: faqItems } : {})} />
        <SectionSpacer />
        <CTASection />
        <Footer />
        <ScrollCTA />
        <AvailabilityBadge variant="floating" spotsLeft={2} />
      </main>
    </>
  );
}
