"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Rocket, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "discovery", label: "Discovery", sub: "Research & Strategy", icon: Search, color: "blue" },
  { id: "design", label: "Design", sub: "UI/UX & Prototyping", icon: Brain, color: "purple" },
  { id: "development", label: "Development", sub: "Code & Integration", icon: Code2, color: "pink" },
  { id: "deployment", label: "Deployment", sub: "Launch & Scale", icon: Rocket, color: "emerald" }
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                    "p-6 rounded-2xl border transition-all duration-500",
                    isActive ? `bg-zinc-900 border-${step.color}-500/50 shadow-lg` : "bg-black border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isActive ? `bg-${step.color}-500/20 text-${step.color}-400` : "bg-white/5 text-white/40"
                    )}>
                        <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-white/20">0{index + 1}</span>
                </div>
                <h3 className={cn("text-lg font-bold mb-1", isActive ? "text-white" : "text-white/60")}>{step.label}</h3>
                <p className="text-sm text-white/40">{step.sub}</p>
                
                {isActive && (
                    <motion.div 
                        className={`h-0.5 w-full bg-${step.color}-500 mt-4 rounded-full`}
                        layoutId="active-process-line"
                    />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
