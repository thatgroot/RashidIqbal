"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Check, ArrowRight, Layout, Code2, Smartphone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";

type ServiceType = "landing" | "web" | "mobile";

const plans = [
  {
    name: "Starter",
    label: "Design",
    desc: "Validate your idea with world-class design. Professional Figma designs for your product.",
    baseFeatures: ["Figma Design System", "Brand Identity", "Component Library", "2 Weeks Turnaround"],
    serviceFeatures: {
        landing: ["High-Converting Layouts", "Desktop & Mobile Views"],
        web: ["Dashboard UI Kit", "User Flow Prototyping"],
        mobile: ["iOS & Android Screens", "Interactive Prototypes"]
    }
  },
  {
    name: "Growth",
    label: "Development",
    desc: "Bring your designs to life. Pixel-perfect frontend development ready for growth.",
    baseFeatures: ["Clean Code Architecture", "Smooth Animations", "Performance First", "4 Weeks Turnaround"],
    serviceFeatures: {
        landing: ["Framer Development", "CMS Integration"],
        web: ["Next.js Application", "Responsive Implementation"],
        mobile: ["Expo / React Native", "Native Feel & Gestures"]
    },
    popular: true
  },
  {
    name: "Scale",
    label: "Full Service",
    desc: "The complete package. From concept to production-grade application.",
    baseFeatures: ["Full Product Design", "End-to-End Development", "Dedicated Support", "Custom SLA"],
    serviceFeatures: {
        landing: ["Design + Framer Site", "Advanced SEO & Analytics"],
        web: ["Design + Next.js App", "Scalable Architecture"],
        mobile: ["Design + Expo App", "App Store Deployment"]
    }
  }
];

export function PricingV2() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ [key: number]: ServiceType }>({});

  const getFeatures = (planIndex: number) => {
      const plan = plans[planIndex];
      const serviceType = selectedServices[planIndex] || "landing"; // Default to landing if not selected
      const specificFeatures = plan.serviceFeatures ? plan.serviceFeatures[serviceType] : [];
      return [...plan.baseFeatures, ...specificFeatures];
  };

  return (
    <section className="bg-white" id="pricing">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                        Simple, Flat Pricing.
                    </h2>
                    <p className="text-lg text-zinc-500">
                        No hidden fees. No hourly billing surprises. Just great work at a fixed price.
                    </p>
                </div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}  > 
            {plans.map((plan, i) => (
                <GridItem key={i} className={plan.popular ? "bg-zinc-50/50" : ""}>
                    {plan.popular && (
                        <div className="absolute top-8 right-8 px-3 py-1 bg-orange-700 text-white text-[10px] font-bold uppercase tracking-wider">
                            Most Popular
                        </div>
                    )}
                    
                    <div className="mb-8 mt-4">
                        <h3 className="text-xl font-medium text-zinc-900 mb-2">{plan.name}</h3>
                        <div className="text-4xl font-semibold text-zinc-900 mb-4">
                            {plan.label}
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed h-12">{plan.desc}</p>
                    </div>

                    <div className="space-y-4 mb-8 h-64">
                        {getFeatures(i).map((f, j) => (
                            <div key={j} className="flex items-center gap-3 text-sm text-zinc-700">
                                <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                {f}
                            </div>
                        ))}
                    </div>

                    {/* Service Type Selection */}
                    <div className="mb-6">
                        <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Service Type</div>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setSelectedServices({ ...selectedServices, [i]: "landing" })}
                                className={`py-2 px-3 text-xs font-medium transition-colors border flex items-center justify-center gap-1.5 ${
                                    (selectedServices[i] || "landing") === "landing"
                                        ? "bg-zinc-900 text-white border-zinc-900"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                                }`}
                            >
                                <Layout className="w-3 h-3" />
                                Landing
                            </button>
                            <button
                                onClick={() => setSelectedServices({ ...selectedServices, [i]: "web" })}
                                className={`py-2 px-3 text-xs font-medium transition-colors border flex items-center justify-center gap-1.5 ${
                                    selectedServices[i] === "web"
                                        ? "bg-zinc-900 text-white border-zinc-900"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                                }`}
                            >
                                <Code2 className="w-3 h-3" />
                                Web App
                            </button>
                            <button
                                onClick={() => setSelectedServices({ ...selectedServices, [i]: "mobile" })}
                                className={`py-2 px-3 text-xs font-medium transition-colors border flex items-center justify-center gap-1.5 ${
                                    selectedServices[i] === "mobile"
                                        ? "bg-zinc-900 text-white border-zinc-900"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                                }`}
                            >
                                <Smartphone className="w-3 h-3" />
                                Mobile
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        {/* Button that slides out */}
                        <motion.div
                            initial={false}
                            animate={{ x: openPlan === i ? "-100%" : "0%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full"
                        >
                            <button 
                                onClick={() => setOpenPlan(i)}
                                className={`w-full py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                                plan.popular 
                                    ? "bg-zinc-900 text-white hover:bg-orange-600" 
                                    : "bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50"
                            }`}>
                                Let&apos;s Talk <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>

                        {/* Contact Options - Appear in place */}
                        <AnimatePresence>
                            {openPlan === i && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex gap-2 dotted-bg"
                                >
                                    
                                    <div className="relative z-10 flex gap-2 w-full bg-white">
                                        <a href="mailto:rashidiqbal.freelance@gmail.com" className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 border border-zinc-200 transition-colors" title="Email">
                                            <SiGmail size={16} />
                                        </a>
                                        <a href="https://wa.me/923554665643" className="flex-1 py-3 bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 border border-green-200 transition-colors" title="WhatsApp">
                                            <SiWhatsapp size={16} />
                                        </a>
                                        <a href="https://www.upwork.com/freelancers/~01b24c107f5b5af596" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 transition-colors" title="Upwork">
                                            <SiUpwork size={16} />
                                        </a>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenPlan(null);
                                            }}
                                            className="px-3 py-3 hover:bg-zinc-100 text-zinc-400 border border-zinc-200 transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GridItem>
            ))}
        </GridContainer>
      </div>
    </section>
  );
}
