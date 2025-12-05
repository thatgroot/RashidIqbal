"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { MessageSquare, Search, PenTool, Rocket, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

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

const STEP_DURATION = 2500; // ms per step

export function ProcessV2() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white" id="process">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl font-semibold text-zinc-900 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                The Recipe for Success.
              </motion.h2>
              <motion.p
                className="text-lg text-zinc-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Every great project starts with a conversation. We explore, prepare, cook, and serve, turning your vision into something real, polished, and built to last.
              </motion.p>
            </motion.div>
          </GridItem>
        </GridContainer>

        {/* 2x2 Layout */}
        <GridContainer cols={2}>
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <motion.div
                key={i}
                className="relative h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GridItem className="h-full relative overflow-hidden group" padding={false}>
                  <div className="p-8 md:p-12 h-full flex flex-col relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300 ${isActive ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-zinc-200 text-zinc-500'}`}
                      >
                        <step.icon className="w-6 h-6" />
                      </motion.div>
                      <span className="text-4xl font-bold text-zinc-100 select-none font-mono">
                        {step.id}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-zinc-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Progress Bar (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-100">
                      {isActive && (
                        <motion.div 
                          className="h-full bg-orange-500 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Background Highlight for Active State */}
                  <motion.div
                    className="absolute inset-0 bg-orange-50/30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </GridItem>
              </motion.div>
            );
          })}
        </GridContainer>

        <GridContainer>
          <GridItem className="pt-24 pb-48">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl font-semibold text-zinc-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Let&apos;s Travel to the Inbox.
              </motion.h2>
              <motion.p
                className="text-lg text-zinc-500 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                When it all comes together, the result feels effortless and complete. A polished, working product ready to perform and make an impact. Looking back, I feel proud of what your project will become.
              </motion.p>
              <motion.button
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
                className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center gap-2 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-orange-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                View Pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}

