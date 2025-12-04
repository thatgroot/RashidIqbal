"use client";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "I offer a comprehensive range of services including copywriting, web design, product design, development, branding, and motion design. My goal is to deliver cohesive, high-quality solutions that boost engagement and conversions for your brand."
  },
  {
    question: "How do you ensure project consistency and quality?",
    answer: "With a comprehensive expertise in copywriting, design, and development, I handle all aspects of your project in-house. This ensures a cohesive approach and consistent quality, unlike fragmented projects managed by multiple freelancers or agencies."
  },
  {
    question: "What sets you apart from freelancers & agencies?",
    answer: "I provide a one-stop service, saving you time and money. My marketing-driven solutions are tailored to your goals, ensuring higher engagement. Additionally, I offer dedicated, personalized attention, focusing solely on one project at a time."
  },
  {
    question: "How do you approach deadlines?",
    answer: "I have a proven track record of delivering high-quality results on time and within budget. My cost-effective services eliminate the need for multiple hires and complex management."
  }
];

export function FAQ() {
  return (
    <section className="py-32 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Got Questions?</h2>
          <p className="text-white/60">I have the answers.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl bg-zinc-900/20 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {faq.question}
              </h3>
              <p className="text-white/60 leading-relaxed pl-4 border-l border-white/10 ml-0.5">
                  {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
