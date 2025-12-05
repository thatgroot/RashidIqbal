"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Talk",
    verb: "Discover",
    desc: "Every great project starts with a conversation. We dive into your vision, goals, and what success looks like."
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

const STEP_DURATION = 3000;

export function ProcessV2() {
  const [activeStep, setActiveStep] = useState(0);
  const [cycleKey, setCycleKey] = useState(0); // Forces re-render of progress bar

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        // Increment cycle key to force fresh animation
        setCycleKey((k) => k + 1);
        return next;
      });
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white" id="process">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                How We&apos;ll Work Together.
              </h2>
              <p className="text-lg text-zinc-500">
                A proven 4-step process that turns ideas into shipped products. No surprises, just results.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        {/* Horizontal Steps - Full Width */}
        <GridContainer cols={4}>
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            
            return (
              <div
                key={i}
                onClick={() => {
                  setActiveStep(i);
                  setCycleKey((k) => k + 1);
                }}
                className="cursor-pointer relative h-full"
              >
                <GridItem padding={false} className="h-full">
                  <motion.div 
                    className="p-6 md:p-8 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Step Number - Large */}
                    <div className="flex items-baseline justify-between mb-6">
                      <span className={`text-6xl md:text-7xl font-bold transition-colors duration-500 ${
                        isActive ? 'text-orange-500' : 'text-zinc-100'
                      }`}>
                        {step.num}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? 'text-orange-500' : 'text-zinc-400'
                      }`}>
                        {step.verb}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isActive ? 'text-zinc-900' : 'text-zinc-700'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {step.desc}
                    </p>
                  </motion.div>
                </GridItem>
                
                {/* Progress Indicator - Only shows on active step */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100 overflow-hidden z-10">
                  {isActive && (
                    <motion.div
                      key={`progress-${cycleKey}`}
                      className="h-full bg-orange-500 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </GridContainer>

        {/* CTA Section */}
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-lg">
                <h3 className="text-2xl font-semibold text-zinc-900 mb-3">
                  Ready to start?
                </h3>
                <p className="text-zinc-500">
                  Most projects go from first call to launch in 4-8 weeks.
                </p>
              </div>
              <motion.button
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Pricing <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}

