import { Metadata } from"next";
import { Navbar } from"@/components/layout/navbar";
import { Pricing } from"@/components/landing/pricing";
import { ClosingBand } from"@/components/landing/closing-band";
import { SITE_URL } from"@/lib/constants";

export const metadata: Metadata = {
  title:"Pricing · Aestho",
  description:
"Real, visible pricing for Aestho. Landing page from $2,000, 5-page marketing site $5,000, branded site with logo $11,000. Monthly retainers from $4,000.",
  openGraph: {
    title:"Pricing · Aestho",
    description:
"Three one-time tiers and three monthly retainers. Fixed scope, fixed price, no sales call required first.",
    type:"website",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
"Pricing · Aestho",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Pricing · Aestho",
    description:
"Three one-time tiers and three monthly retainers. Fixed scope, fixed price.",
    images: [
      `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Pricing · Aestho")}`,
    ],
  },
  alternates: { canonical: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-[#0a0a0a] font-sans"
    >
      <Navbar />
      <Pricing />
      <ClosingBand
        headline="Want to talk through your scope first?"
        sub="A 30-min call usually gets you a fixed quote same day. No pitch deck, no follow-up sequence."
        ctaLabel="Book a strategy call"
      />
    </main>
  );
}
