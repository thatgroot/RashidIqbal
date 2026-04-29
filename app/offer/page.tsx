// Server wrapper for /offer.
//
// The visible page is rendered by the client component in offer-content.tsx
// (motion / state / posthog). This wrapper exists so we can emit Service +
// Offer + FAQPage JSON-LD at the document root — client components cannot
// inject schema this way, and AI search engines lift outcomes from
// structured data heavily.

import OfferContent from "./offer-content";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600;

const OFFER_URL = `${SITE_URL}/offer`;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Landing page design + Framer development",
  provider: {
    "@type": "Person",
    name: "Rashid Iqbal",
    url: SITE_URL,
    sameAs: [
      "https://framer.link/rashidiqbal",
      "https://www.upwork.com/freelancers/thatgroot",
      "https://contra.com/rashidiqbal",
      "https://app.base44.com/@rashid-iqbal",
    ],
  },
  areaServed: { "@type": "Place", name: "Worldwide (remote)" },
  url: OFFER_URL,
  description:
    "Free 60-second Loom audit of any landing page. Or book the rebuild: 1-page in 3 days from $1,000, 4-page site in 5 days from $1,500.",
  offers: [
    {
      "@type": "Offer",
      name: "Landing page (Figma to Framer, 3 days)",
      price: "1000",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      url: OFFER_URL,
    },
    {
      "@type": "Offer",
      name: "4-page marketing site (5 days)",
      price: "1500",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      url: OFFER_URL,
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Free audit + offer", item: OFFER_URL },
  ],
};

export default function OfferPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OfferContent />
    </>
  );
}
