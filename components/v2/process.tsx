"use client";

import { GridContainer, GridItem } from "./grid-system";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Talk",
    verb: "Discover",
    desc: "Every great project starts with a conversation. We dive into your vision, goals, and what success looks like for you."
  },
  {
    num: "02",
    title: "Prepare", 
    verb: "Design",
    desc: "Wireframes, mockups, and prototypes. You see the direction before a single line of code is written."
  },
  {
    num: "03",
    title: "Cook",
    verb: "Build",
    desc: "Your project comes alive. Pixel-perfect implementation with clean, scalable code that performs."
  },
  {
    num: "04",
    title: "Serve",
    verb: "Launch",
    desc: "Polished, tested, and deployed. Your product is live and ready to make an impact."
  }
];

export function ProcessV2() {
  return (
    <section className="bg-white" id="process">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                How We&apos;ll Work Together.
              </h2>
              <p className="text-lg text-zinc-500">
                A proven 4-step process that turns ideas into shipped products. No surprises, just results.
              </p>
            </div>
          </GridItem>
        </GridContainer>

        {/* Horizontal Steps */}
        <GridContainer cols={4}>
          {steps.map((step, i) => (
            <GridItem key={i} padding={false} className="h-full">
              <div className="p-6 md:p-8 h-full flex flex-col min-h-[280px]">
                {/* Step Number - Large */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-6xl md:text-7xl font-bold text-zinc-100 group-hover:text-orange-100 transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-orange-500 transition-colors">
                    {step.verb}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-zinc-900 mb-3">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                  {step.desc}
                </p>
              </div>
            </GridItem>
          ))}
        </GridContainer>

        {/* CTA Section */}
        <GridContainer>
          <GridItem className="py-24">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-lg">
                <h3 className="text-2xl font-semibold text-zinc-900 mb-3">
                  Ready to start?
                </h3>
                <p className="text-zinc-500">
                  Most projects go from first call to launch in 4-8 weeks.
                </p>
              </div>
              <button
                onClick={() => {
                  const pricingSection = document.querySelector('#pricing');
                  if (pricingSection) {
                    const offset = 64;
                    const elementPosition = pricingSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 shrink-0"
              >
                View Pricing <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
