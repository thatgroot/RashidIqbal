"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    verb: "Discover",
    desc: "Every great project starts with a conversation. We dive into your vision, goals, and what success looks like for you."
  },
  {
    num: "02",
    title: "Design Sprint", 
    verb: "Design",
    desc: "Wireframes, mockups, and prototypes. You see the direction before a single line of code is written."
  },
  {
    num: "03",
    title: "Development",
    verb: "Build",
    desc: "Your project comes alive. Pixel-perfect implementation with clean, scalable code that performs."
  },
  {
    num: "04",
    title: "Launch Day",
    verb: "Launch",
    desc: "Polished, tested, and deployed. Your product is live and ready to make an impact."
  }
];

const STEP_DURATION = 4000; // 4 seconds per step

export function ProcessV2() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    
    return () => clearInterval(timer);
  }, [isInView]);

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
              onViewportEnter={() => setIsInView(true)}
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

        {/* Horizontal Steps */}
        <GridContainer cols={4}>
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            
            return (
              <GridItem key={i} padding={false} className="h-full">
                <motion.div 
                  className="relative p-6 md:p-8 h-full flex flex-col min-h-[280px] overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {/* Glowing Gradient Border - Active State */}
                  <AnimatePresence>
                    {isActive && (
                      <>
                        {/* Gradient glow background */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 -z-10"
                        >
                          {/* Animated gradient border */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-300/10 to-amber-500/20 animate-pulse" />
                          
                          {/* Top border glow */}
                          <motion.div 
                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                          />
                          
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        
                        {/* Corner accents */}
                        <motion.div 
                          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                        <motion.div 
                          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                        <motion.div 
                          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                        <motion.div 
                          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                  
                  {/* Completed state indicator */}
                  {isPast && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 to-emerald-500/50" />
                  )}

                  {/* Step Number - Large */}
                  <div className="flex items-baseline justify-between mb-6 relative z-10">
                    <motion.span 
                      className={`text-6xl md:text-7xl font-bold transition-colors duration-500 ${
                        isActive ? 'text-orange-500' : isPast ? 'text-emerald-200' : 'text-zinc-100'
                      }`}
                      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.num}
                    </motion.span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${
                      isActive ? 'text-orange-500' : isPast ? 'text-emerald-500' : 'text-zinc-500'
                    }`}>
                      {step.verb}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                    isActive ? 'text-zinc-900' : isPast ? 'text-zinc-700' : 'text-zinc-900'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm leading-relaxed flex-1 transition-colors duration-500 ${
                    isActive ? 'text-zinc-700' : 'text-zinc-500'
                  }`}>
                    {step.desc}
                  </p>
                  
                  {/* Step indicator dots */}
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-100">
                    {steps.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          dotIndex === activeStep 
                            ? 'bg-orange-500 w-6' 
                            : dotIndex < activeStep 
                              ? 'bg-emerald-400 w-1.5' 
                              : 'bg-zinc-200 w-1.5'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </GridItem>
            );
          })}
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
