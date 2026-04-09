import { SITE_URL as siteUrl } from "@/lib/constants";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Rashid Iqbal",
    givenName: "Rashid",
    familyName: "Iqbal",
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    jobTitle: "Figma & Framer Expert, Chrome Extension Developer",
    description: "Figma and Framer expert specializing in high-converting landing pages, UX copywriting, and Chrome extension development. 50+ projects delivered.",
    email: "rashidiqbal.freelance@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Pakistan",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://www.framer.com/@rashidiqbal",
      "https://www.behance.net/thatgroot",
      "https://contra.com/rashidiqbal",
      "https://github.com/thatgroot",
      "https://www.linkedin.com/in/callmerashidiqbal/",
      "https://x.com/rashidrealme",
      "https://wa.me/923554665643",
    ],
    knowsAbout: [
      "Figma Design",
      "Framer Development",
      "Chrome Extension Development",
      "UX Copywriting",
      "Conversion Rate Optimization",
      "Landing Page Design",
      "Next.js Development",
      "React Development",
      "UI/UX Design",
      "TypeScript",
    ],
    knowsLanguage: ["English", "Urdu"],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: "Rashid Iqbal - Figma & Framer Expert",
    alternateName: "Aestho",
    description: "Figma and Framer expert specializing in high-converting landing pages with UX copywriting, and standalone Chrome extension development. 50+ projects delivered worldwide.",
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    telephone: "+923554665643",
    email: "rashidiqbal.freelance@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Pakistan",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.3753",
      longitude: "69.3451",
    },
    areaServed: [
      { "@type": "Country", name: "Worldwide" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
    priceRange: "$$",
    provider: {
      "@id": `${siteUrl}#person`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Design & Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Design & Framer Development",
            description: "High-converting landing pages designed in Figma with UX copy, built pixel-perfect in Framer. 3-4 pages, responsive, SEO-ready.",
          },
          price: "1000",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Page Framer Website",
            description: "Full website with 5-8+ pages, CMS, blog, and dynamic content. Designed in Figma with conversion-focused UX copy, built in Framer.",
          },
          price: "2000",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chrome Extension Development",
            description: "Standalone Chrome extensions built from scratch with React and Manifest V3. Design, development, and Chrome Web Store publishing.",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Rashid Iqbal - Figma & Framer Expert",
    alternateName: "aestho.xyz",
    description: "Figma and Framer expert building high-converting landing pages, websites, and Chrome extensions. UX copywriting and conversion optimization included.",
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteUrl}#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Rashid Iqbal",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.svg`,
      width: "512",
      height: "512",
    },
    founder: {
      "@id": `${siteUrl}#person`,
    },
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://www.framer.com/@rashidiqbal",
      "https://www.behance.net/thatgroot",
      "https://github.com/thatgroot",
      "https://www.linkedin.com/in/callmerashidiqbal/",
      "https://x.com/rashidrealme",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "rashidiqbal.freelance@gmail.com",
      availableLanguage: ["English", "Urdu"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteUrl}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  },
];

export function StructuredData() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
