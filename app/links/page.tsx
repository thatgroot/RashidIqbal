// Server wrapper for /links.
//
// The visible page is rendered by the client component in links-content.tsx.
// This wrapper exists to emit Person + ProfilePage JSON-LD at document root
// — gives Google's Knowledge Graph a way to merge Rashid's identity across
// Framer / Upwork / Contra / Base44 / GitHub / LinkedIn / X.

import LinksContent from "./links-content";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600;

const LINKS_URL = `${SITE_URL}/links`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rashid Iqbal",
  alternateName: ["Aestho", "thatgroot"],
  url: SITE_URL,
  jobTitle: "Certified Framer Expert · Replit Expert · Base44 Partner",
  description:
    "Freelance Figma & Framer expert specializing in high-converting SaaS landing pages, UX copywriting, and Chrome extensions.",
  sameAs: [
    "https://framer.link/rashidiqbal",
    "https://www.upwork.com/freelancers/thatgroot",
    "https://contra.com/rashidiqbal",
    "https://app.base44.com/@rashid-iqbal",
    "https://www.linkedin.com/in/callmerashidiqbal/",
    "https://github.com/thatgroot",
    "https://x.com/rashidrealme",
    "https://www.behance.net/thatgroot",
    "https://dribbble.com/thatgroot",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Aestho · Rashid Iqbal",
    url: SITE_URL,
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Rashid Iqbal · Links",
  url: LINKS_URL,
  mainEntity: { "@id": SITE_URL },
};

export default function LinksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <LinksContent />
    </>
  );
}
