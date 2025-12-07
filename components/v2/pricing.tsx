"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Check, ArrowRight, Layout, Code2, Smartphone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";
import Image from "next/image";

type ServiceType = "landing" | "web" | "mobile";

const plans = [
  {
    name: "Launch",
    tagline: "Design Only",
    desc: "Stop guessing. Start with designs that convert. Get investor-ready mockups in 2 weeks.",
    idealFor: "Founders validating ideas",
    baseFeatures: ["Production-Ready Figma Files", "Design System You Own Forever", "Mobile + Desktop Layouts"],
    serviceFeatures: {
        landing: ["Conversion-Optimized Pages", "A/B Test Variants"],
        web: ["Full Dashboard UI Kit", "User Journey Mapping"],
        mobile: ["iOS + Android Screens", "Clickable Prototype"]
    },
    deliveryTime: "2 weeks",
    highlight: null
  },
  {
    name: "Build",
    tagline: "Design + Development",
    desc: "From Figma to live product. Ship faster with clean, scalable code that grows with you.",
    idealFor: "Startups ready to launch",
    baseFeatures: ["Everything in Launch", "Pixel-Perfect Development", "60fps Animations", "SEO & Performance Optimized"],
    serviceFeatures: {
        landing: ["Framer or Next.js Site", "CMS for Easy Updates"],
        web: ["Full Next.js Application", "API Integration Ready"],
        mobile: ["React Native / Expo App", "Smooth Native Gestures"]
    },
    deliveryTime: "4 weeks",
    popular: true,
    highlight: "Best Value"
  },
  {
    name: "Scale",
    tagline: "Full Partnership",
    desc: "Your product deserves a dedicated partner. End-to-end execution with priority support.",
    idealFor: "Funded startups & agencies",
    baseFeatures: ["Everything in Build", "Dedicated Slack Channel", "Weekly Strategy Calls", "Priority Bug Fixes"],
    serviceFeatures: {
        landing: ["Multi-Page Website", "Analytics Dashboard Setup"],
        web: ["Complex App Architecture", "Database & Auth Setup"],
        mobile: ["App Store Submission", "Push Notifications"]
    },
    deliveryTime: "Custom",
    highlight: "White Glove"
  }
];

export function PricingV2() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>("landing");

  const getFeatures = (planIndex: number) => {
      const plan = plans[planIndex];
      const specificFeatures = plan.serviceFeatures ? plan.serviceFeatures[serviceType] : [];
      return [...plan.baseFeatures, ...specificFeatures];
  };

  return (
    <section className="bg-white" id="pricing">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <motion.div 
                    className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-semibold text-zinc-900 mb-4">
                            Invest in Results.
                        </h2>
                        <p className="text-lg text-zinc-500">
                            Fixed pricing. No hourly surprises. You pay for outcomes, not hours logged.
                        </p>
                    </div>
                    
                    {/* Service Type Selector */}
                    <div className="flex items-center gap-1 p-1 bg-zinc-100">
                        <button
                            onClick={() => setServiceType("landing")}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                                serviceType === "landing"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-700"
                            }`}
                        >
                            <Layout className="w-4 h-4" aria-hidden="true" />
                            <span>Landing Page</span>
                        </button>
                        <button
                            onClick={() => setServiceType("web")}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                                serviceType === "web"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-700"
                            }`}
                        >
                            <Code2 className="w-4 h-4" aria-hidden="true" />
                            <span>Web App</span>
                        </button>
                        <button
                            onClick={() => setServiceType("mobile")}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                                serviceType === "mobile"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-700"
                            }`}
                        >
                            <Smartphone className="w-4 h-4" aria-hidden="true" />
                            <span>Mobile App</span>
                        </button>
                    </div>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}  > 
            {plans.map((plan, i) => (
                <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08, delayChildren: i * 0.12 } }
                    }}
                >
                <GridItem className={plan.popular ? "bg-gradient-to-b from-orange-50/50 to-white ring-2 ring-orange-500/20 ring-inset" : ""}>
                    {/* Badge */}
                    {(plan.popular || plan.highlight) && (
                        <motion.div 
                            className={`absolute top-6 right-6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                              plan.popular 
                                ? "bg-orange-500 text-white" 
                                : "bg-zinc-900 text-white"
                            }`}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                            }}
                        >
                            {plan.highlight || "Most Popular"}
                        </motion.div>
                    )}
                    
                    <div className="mb-6 mt-2">
                        {/* Tier Name */}
                        <motion.h3 
                            className="text-3xl font-bold text-zinc-900 mb-1"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            {plan.name}
                        </motion.h3>
                        <motion.div 
                            className="text-xs font-mono text-orange-600 uppercase tracking-wider mb-4"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            {plan.tagline}
                        </motion.div>
                        
                        {/* Value Prop */}
                        <motion.p 
                            className="text-sm text-zinc-600 leading-relaxed mb-4"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            {plan.desc}
                        </motion.p>
                        
                        {/* Ideal For */}
                        <motion.div 
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-xs text-zinc-600"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          {plan.idealFor}
                        </motion.div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6 min-h-[200px]">
                        <motion.div 
                            className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: 0.3 } }
                            }}
                        >
                            What&apos;s Included
                        </motion.div>
                        {getFeatures(i).map((f, j) => (
                            <motion.div 
                                key={j} 
                                className="flex items-start gap-3 text-sm text-zinc-700"
                                variants={{
                                    hidden: { opacity: 0, x: -10 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: j * 0.05 } }
                                }}
                            >
                                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                                <span>{f}</span>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Delivery Time */}
                    <motion.div 
                        className="flex items-center justify-between py-3 border-t border-zinc-100 mb-6"
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                    >
                      <span className="text-xs text-zinc-500">Delivery</span>
                      <span className="text-sm font-semibold text-zinc-900">{plan.deliveryTime}</span>
                    </motion.div>

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
                                className={`w-full py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 ${
                                plan.popular 
                                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25" 
                                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                            }`}>
                                {plan.popular ? "Start Building" : "Get Started"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                                        <a href="https://cal.com/rashid.iqbal" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center border border-zinc-900 transition-colors" title="Cal.com">
                                            <Image src="/icons/cal.png" alt="Cal.com" width={16} height={16} className="rounded-sm" />
                                        </a>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenPlan(null);
                                            }}
                                            className="px-3 py-3 hover:bg-zinc-100 text-zinc-500 border border-zinc-200 transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GridItem>
                </motion.div>
            ))}
        </GridContainer>
      </div>
    </section>
  );
}
