"use client";

import { Check } from "lucide-react";

const plans = [
  {
    name: "Design",
    price: "$2,900",
    description: "Perfect for startups needing a world-class brand & website design.",
    features: [
      "Brand Identity System",
      "High-Fidelity UI Design",
      "Interactive Prototypes",
      "Design System & Assets",
      "Unlimited Revisions"
    ],
    popular: false
  },
  {
    name: "Development",
    price: "$4,500",
    description: "For those who have a design and need it built pixel-perfect.",
    features: [
      "Next.js / React Implementation",
      "CMS Integration (Sanity/Strapi)",
      "Performance Optimization",
      "SEO Technical Setup",
      "Deployment & Training"
    ],
    popular: true
  },
  {
    name: "Full Package",
    price: "$6,900",
    description: "Strategy, Design, and Development. The complete solution.",
    features: [
      "Everything in Design",
      "Everything in Development",
      "Copywriting & Strategy",
      "Advanced Motion Graphics",
      "30 Days Post-Launch Support"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <section className="py-32 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            No hidden fees. No hourly billing surprises. Just high-quality work at a fixed price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                plan.popular 
                  ? "bg-zinc-900/50 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]" 
                  : "bg-black border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <p className="text-sm text-white/60">{plan.description}</p>
              </div>

              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                plan.popular
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
