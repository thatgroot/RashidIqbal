const faqs = [
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, that's my specialty. I help founders go from zero to one. I provide not just code, but product strategy and design direction to help you launch."
  },
  {
    q: "What tools do you use?",
    a: "I use Figma for design, Framer for marketing sites, and Next.js (React) for web apps. For mobile, I build with React Native and Expo."
  },
  {
    q: "How do we handle the handoff?",
    a: "You get everything. I provide docs, organized Figma files, and clean, type-safe code. I can even help onboard your future team."
  },
  {
    q: "How long does it take?",
    a: "Usually 2-6 weeks. I work in weekly sprints, so you'll see progress every single week."
  }
];

export function FAQStructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

