import { SITE_URL as siteUrl } from "@/lib/constants";

const schemas = [
  // Person Entity - Core identity for Knowledge Graph
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
    description: "Figma and Framer expert who has built 53 websites since 2019. Specializing in high-converting landing pages with UX copywriting, and Chrome extension development.",
    email: "rashid@founderfist.com",
    telephone: "+923554665643",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    // Entity disambiguation - connect all profiles
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://www.framer.com/@rashidiqbal",
      "https://www.behance.net/thatgroot",
      "https://contra.com/rashidiqbal",
      "https://github.com/thatgroot",
      "https://www.linkedin.com/in/callmerashidiqbal/",
      "https://x.com/rashidrealme",
      "https://wa.me/923554665643",
      "https://dribbble.com/thatgroot",
      "https://bsky.app/profile/rashidiqbal.bsky.social",
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
      "Web Performance Optimization",
      "Search Engine Optimization",
    ],
    knowsLanguage: ["English", "Urdu"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Certified Framer Expert",
        recognizedBy: {
          "@type": "Organization",
          name: "Framer",
          url: "https://www.framer.com",
        },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Aestho",
      url: siteUrl,
    },
    memberOf: [
      {
        "@type": "Organization",
        name: "Framer Expert Community",
        url: "https://www.framer.com/@rashidiqbal",
      },
    ],
  },
  // ProfilePage - tells Google this is an author/expert profile
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profilepage`,
    mainEntity: { "@id": `${siteUrl}#person` },
    dateCreated: "2019-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  },
  // ProfessionalService - for local/service search
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: "Rashid Iqbal - Figma & Framer Expert",
    alternateName: "Aestho",
    description: "Figma and Framer expert. I design high-converting landing pages with UX copy, build pixel-perfect Framer sites, and develop Chrome extensions. 53 projects shipped for clients in 12 countries since 2019.",
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    telephone: "+923554665643",
    email: "rashid@founderfist.com",
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
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
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Norway" },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Bank Transfer, PayPal, Wise, Stripe",
    provider: { "@id": `${siteUrl}#person` },
    // Aggregate rating from Upwork
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "30",
      reviewCount: "30",
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
            description: "High-converting landing pages designed in Figma with UX copy, built pixel-perfect in Framer. 3-4 pages, responsive, SEO-ready. Delivered in 2 weeks.",
            url: `${siteUrl}/#services`,
          },
          price: "1000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "1000",
            maxPrice: "1600",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi-Page Framer Website",
            description: "Full website with 5-8+ pages, CMS, blog, and dynamic content. Designed in Figma with conversion-focused UX copy. Delivered in 3-4 weeks.",
            url: `${siteUrl}/#services`,
          },
          price: "2000",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "2000",
            maxPrice: "5000",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chrome Extension Development",
            description: "Standalone Chrome extensions built from scratch with React and Manifest V3. Design, development, and Chrome Web Store publishing.",
            url: `${siteUrl}/#services`,
          },
        },
      ],
    },
  },
  // WebSite
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Rashid Iqbal - Figma & Framer Expert",
    alternateName: "aestho.xyz",
    description: "Figma and Framer expert building high-converting landing pages, websites, and Chrome extensions. 53 projects shipped since 2019.",
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}#person` },
    datePublished: "2019-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  // Organization
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Aestho",
    legalName: "Rashid Iqbal",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.svg`,
      width: "512",
      height: "512",
    },
    founder: { "@id": `${siteUrl}#person` },
    foundingDate: "2019",
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://www.framer.com/@rashidiqbal",
      "https://www.behance.net/thatgroot",
      "https://contra.com/rashidiqbal",
      "https://github.com/thatgroot",
      "https://www.linkedin.com/in/callmerashidiqbal/",
      "https://x.com/rashidrealme",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "rashid@founderfist.com",
      telephone: "+923554665643",
      availableLanguage: ["English", "Urdu"],
      areaServed: "Worldwide",
    },
  },
  // BreadcrumbList
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: "Contact", item: `${siteUrl}/contact` },
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
          suppressHydrationWarning
        />
      ))}
    </>
  );
}
