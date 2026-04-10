interface FAQ {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs?: FAQ[];
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "What exactly do you do?",
    answer: "Three things. I design pages in Figma with UX copy and conversion strategy baked in. I build them pixel-perfect in Framer. And I develop standalone Chrome extensions for businesses that need custom browser tools."
  },
  {
    question: "Do you write the copy too, or just design?",
    answer: "Both. I write the headlines, CTAs, value props, and page flow as part of the Figma design. Good design without good copy doesn't convert."
  },
  {
    question: "What kind of Chrome extensions do you build?",
    answer: "Standalone tools for businesses. Productivity apps, SaaS companion extensions, workflow automation tools. If it runs in Chrome, I can build it."
  },
  {
    question: "How long does a typical project take?",
    answer: "A 3-4 page Framer site takes about 2 weeks. Larger multi-page sites with CMS run 3-4 weeks. Chrome extensions depend on complexity but usually 2-4 weeks."
  },
  {
    question: "What if I'm not happy with the design?",
    answer: "You get unlimited revisions on the Figma design before I build anything in Framer. If the direction isn't right after the first round, I refund your deposit."
  },
  {
    question: "How much does a landing page cost?",
    answer: "A 3-4 page landing page with Figma design, UX copy, and Framer build runs $1,000 to $1,600. Larger multi-page websites with CMS land between $2,000 and $5,000."
  }
];

export function FAQStructuredData({ faqs = DEFAULT_FAQS }: FAQStructuredDataProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
