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
    jobTitle: "Freelance Web Developer & Designer",
    description: "Freelance Next.js and Framer developer based in Pakistan. Specializing in high-converting landing pages, web applications, and mobile apps.",
    email: "rashidiqbal.freelance@gmail.com",
    // Location for discoverability
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Pakistan",
    },
    nationality: {
      "@type": "Country",
      name: "Pakistan",
    },
    // Social profiles for cross-platform presence
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://www.behance.net/thatgroot",
      "https://contra.com/rashidiqbal",
      "https://github.com/thatgroot",
      "https://www.linkedin.com/in/callmerashidiqbal/",
      "https://x.com/rashidrealme",
      "https://wa.me/923554665643",
    ],
    knowsAbout: [
      "Next.js Development",
      "React Development",
      "Framer Development",
      "Figma Design",
      "Mobile App Development",
      "Expo Development",
      "Flutter Development",
      "Landing Page Design",
      "Web Application Development",
      "UI/UX Design",
      "TypeScript",
      "Tailwind CSS",
    ],
    knowsLanguage: ["English", "Urdu"],
    // Work context
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: "Rashid Iqbal - Next.js & Framer Developer (Pakistan)",
    alternateName: "Rashid Iqbal Web Development",
    description: "Hire a freelance Next.js and Framer developer from Pakistan. Specializing in high-converting landing pages, web applications, and mobile apps. Fast delivery, pixel-perfect design.",
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    telephone: "+923554665643",
    email: "rashidiqbal.freelance@gmail.com",
    // Location for local SEO
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
      {
        "@type": "Country",
        name: "Worldwide",
      },
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "Country",
        name: "Australia",
      },
    ],
    priceRange: "$$$",
    provider: {
      "@id": `${siteUrl}#person`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Development",
            description: "High-converting landing pages built with Framer and Next.js",
          },
          price: "4900",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Application Development",
            description: "Full-stack web applications built with Next.js and React",
          },
          price: "9500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Cross-platform mobile apps built with Expo and Flutter",
          },
          price: "8900",
          priceCurrency: "USD",
        },
      ],
    },
    // Aggregate rating placeholder
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Rashid Iqbal - Next.js & Framer Developer",
    alternateName: "aestho.xyz",
    description: "Hire a freelance Next.js and Framer developer from Pakistan. High-converting landing pages, web applications, and mobile apps.",
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
      "https://www.behance.net/thatgroot",
      "https://contra.com/rashidiqbal",
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
        item: `${siteUrl}/#work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing",
        item: `${siteUrl}/#pricing`,
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
