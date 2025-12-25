interface FAQ {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs?: FAQ[];
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "Do you work with early-stage startups?",
    answer: "Yes, that's my specialty. I help founders go from zero to one. I provide not just code, but product strategy and design direction to help you launch."
  },
  {
    question: "What tools do you use?",
    answer: "I use Figma for design, Framer for marketing sites, and Next.js (React) for web apps. For mobile, I build with React Native and Expo."
  },
  {
    question: "How do we handle the handoff?",
    answer: "You get everything. I provide docs, organized Figma files, and clean, type-safe code. I can even help onboard your future team."
  },
  {
    question: "How long does it take?",
    answer: "Usually 2-6 weeks. I work in weekly sprints, so you'll see progress every single week."
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
