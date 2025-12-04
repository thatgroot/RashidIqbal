const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rashid.dev";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Rashid Iqbal",
    url: siteUrl,
    jobTitle: "Freelance Web Developer & Designer",
    description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps. Building with Next.js, Framer, Figma, Expo, and Flutter.",
    email: "rashidiqbal.freelance@gmail.com",
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
      "https://wa.me/923554665643",
    ],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "Framer",
      "Figma",
      "Mobile App Development",
      "Expo",
      "Flutter",
      "Landing Pages",
      "Web Applications",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Freelance Developer",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: "Rashid.dev - Web Development & Design Services",
    description: "Freelance web development and design services. Specializing in landing pages, web applications, and mobile apps built with Next.js, Framer, Figma, Expo, and Flutter.",
    url: siteUrl,
    provider: {
      "@id": `${siteUrl}#person`,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Web Design",
      "Mobile App Development",
      "Landing Page Design",
      "UI/UX Design",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Landing Page Development",
        description: "High-converting landing pages built with Framer and Figma",
        price: "4900",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Web Application Development",
        description: "Full-stack web applications built with Next.js",
        price: "9500",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Mobile App Development",
        description: "Mobile applications built with Expo and Flutter",
        price: "8900",
        priceCurrency: "USD",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Rashid.dev",
    description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.",
    publisher: {
      "@id": `${siteUrl}#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "Rashid.dev",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
    ],
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
        name: "Services",
        item: `${siteUrl}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Work",
        item: `${siteUrl}#work`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pricing",
        item: `${siteUrl}#pricing`,
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

