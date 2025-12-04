"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { MessageSquare, Search, PenTool, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Talk",
    desc: "Every great project starts with a conversation. We dive into your vision, goals, and ideas so we know exactly what success looks like.",
    icon: MessageSquare
  },
  {
    id: "02",
    title: "Prepare",
    desc: "We gather inspiration, mockups, and test samples. You get a taste of the direction before anything is fully built, so there are no surprises.",
    icon: Search
  },
  {
    id: "03",
    title: "Cook",
    desc: "This is where your project comes alive. Every piece is crafted carefully, refined, and brought together until it&apos;s ready to impress.",
    icon: PenTool
  },
  {
    id: "04",
    title: "Serve",
    desc: "Finally, your project is delivered polished, complete, and ready to create impact. What started as an idea now becomes tangible and high-performing.",
    icon: Rocket
  }
];

export function ProcessV2() {
  return (
    <section className="bg-white" id="process">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer  > 
          <GridItem className="py-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                The Recipe for Success.
              </h2>
              <p className="text-lg text-zinc-500">
                Every great project starts with a conversation. We explore, prepare, cook, and serve, turning your vision into something real, polished, and built to last.
              </p>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={4}  > 
            {/* Connecting Line */}
            <div 
                className="hidden md:block absolute h-[2px] bg-zinc-100 z-0 overflow-hidden"
                style={{ 
                    top: '3.25rem', 
                    left: '3.25rem', 
                    width: '75%' 
                }}
            >
                <motion.div 
                    className="h-full bg-orange-500"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {steps.map((step, i) => (
            <GridItem key={i} className="group" padding={true}>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 bg-white border-2 border-zinc-100 rounded-full flex items-center justify-center mb-6 group-hover:border-orange-500 transition-colors relative">
                  <step.icon className="w-4 h-4 text-zinc-500 group-hover:text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500">{step.desc}</p>
              </div>
            </GridItem>
          ))}
        </GridContainer>

          <GridContainer  > 
          <GridItem className="pt-24 pb-48">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-zinc-900 mb-4">
                Let&apos;s Travel to the Inbox.
              </h2>
              <p className="text-lg text-zinc-500 mb-8">
                When it all comes together, the result feels effortless and complete. A polished, working product ready to perform and make an impact. Looking back, I feel proud of what your project will become.
              </p>
              <button 
                onClick={() => {
                  const pricingSection = document.querySelector('#pricing');
                  if (pricingSection) {
                    const offset = 64;
                    const elementPosition = pricingSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
                className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 group"
              >
                View Pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </GridItem>
          </GridContainer>
      </div>
    </section>
  );
}
