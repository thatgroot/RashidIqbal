"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Check, ArrowRight, Layout, Code2, Smartphone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";

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

const planVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const
    }
  })
};

export function PricingV2() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType>("landing");

  const getFeatures = (planIndex: number) => {
      const plan = plans[planIndex];
      const specificFeatures = plan.serviceFeatures ? plan.serviceFeatures[serviceType] : [];
      return [...plan.baseFeatures, ...specificFeatures];
  };

  return (
    <section className="pt-20 bg-white" id="pricing">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer> 
            <GridItem className="py-24">
                <motion.div 
                  className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                    <div className="max-w-xl">
                        <motion.h2 
                          className="text-4xl font-semibold text-zinc-900 mb-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Invest in Results.
                        </motion.h2>
                        <motion.p 
                          className="text-lg text-zinc-500"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Fixed pricing. No hourly surprises. You pay for outcomes, not hours logged.
                        </motion.p>
                    </div>
                    
                    {/* Service Type Selector */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-center gap-1 p-1 bg-zinc-100"
                    >
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
                    </motion.div>
                </motion.div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}> 
            {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={planVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
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
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            {plan.highlight || "Most Popular"}
                          </motion.div>
                    )}
                    
                    <div className="mb-6 mt-2">
                        {/* Tier Name */}
                        <motion.h3 
                          className="text-3xl font-bold text-zinc-900 mb-1"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                        >
                          {plan.name}
                        </motion.h3>
                        <div className="text-xs font-mono text-orange-600 uppercase tracking-wider mb-4">{plan.tagline}</div>
                        
                        {/* Value Prop */}
                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{plan.desc}</p>
                        
                        {/* Ideal For */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-xs text-zinc-600">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          {plan.idealFor}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6 min-h-[200px]">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">What&apos;s Included</div>
                        {getFeatures(i).map((f, j) => (
                              <motion.div 
                                key={j} 
                                className="flex items-start gap-3 text-sm text-zinc-700"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: j * 0.05 + i * 0.1 + 0.3 }}
                              >
                                  <motion.div
                                    className="mt-0.5"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: j * 0.05 + i * 0.1 + 0.35, type: "spring" }}
                                  >
                                    <Check className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                                  </motion.div>
                                <span>{f}</span>
                              </motion.div>
                        ))}
                    </div>
                    
                    {/* Delivery Time */}
                    <div className="flex items-center justify-between py-3 border-t border-zinc-100 mb-6">
                      <span className="text-xs text-zinc-500">Delivery</span>
                      <span className="text-sm font-semibold text-zinc-900">{plan.deliveryTime}</span>
                    </div>

                    <div className="relative overflow-hidden">
                        {/* Button that slides out */}
                        <motion.div
                            initial={false}
                            animate={{ x: openPlan === i ? "-100%" : "0%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full"
                        >
                            <motion.button 
                                onClick={() => setOpenPlan(i)}
                                className={`w-full py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                plan.popular 
                                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25" 
                                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                            }`}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.popular ? "Start Building" : "Get Started"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </motion.button>
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
                                        <motion.a 
                                          href="mailto:rashidiqbal.freelance@gmail.com" 
                                          className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 border border-zinc-200 transition-colors" 
                                          title="Email"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                            <SiGmail size={16} />
                                        </motion.a>
                                        <motion.a 
                                          href="https://wa.me/923554665643" 
                                          className="flex-1 py-3 bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 border border-green-200 transition-colors" 
                                          title="WhatsApp"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                            <SiWhatsapp size={16} />
                                        </motion.a>
                                        <motion.a 
                                          href="https://www.upwork.com/freelancers/~01b24c107f5b5af596" 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 transition-colors" 
                                          title="Upwork"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                            <SiUpwork size={16} />
                                        </motion.a>
                                        <motion.button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenPlan(null);
                                            }}
                                            className="px-3 py-3 hover:bg-zinc-100 text-zinc-500 border border-zinc-200 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </motion.button>
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
