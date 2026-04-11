"use client";

import { SOCIAL_LINKS, AUTHOR } from "@/lib/constants";
import { GridContainer, GridItem } from "./grid-system";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";
import Image from "next/image";



import { ONE_TIME_PLANS, RETAINER_PLANS } from "@/lib/pricing-data";

export function PricingV2() {
    const [openPlan, setOpenPlan] = useState<number | null>(null);
    const [mode, setMode] = useState<"one-time" | "retainer">("one-time");
    const plans = mode === "one-time" ? ONE_TIME_PLANS : RETAINER_PLANS;

    return (
        <section className="bg-white" id="pricing">
            <div className="max-w-container border-l border-zinc-100">
                {/* Header with Inline Selector */}
                <GridContainer>
                    <GridItem className="py-20">
                        <motion.div
                            className="max-w-3xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-6 tracking-tight">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-lg text-zinc-500 mb-8">
                                No hourly billing. No hidden fees. Just high-quality results delivered on time.
                            </p>

                            {/* Pricing Mode Toggle */}
                            <div className="inline-flex items-center p-1 bg-zinc-100 rounded-sm">
                                <button
                                    onClick={() => { setMode("one-time"); setOpenPlan(null); }}
                                    className={`px-5 py-2.5 text-sm font-bold transition-all rounded-sm ${
                                        mode === "one-time"
                                            ? "bg-zinc-900 text-white shadow-sm"
                                            : "text-zinc-500 hover:text-zinc-700"
                                    }`}
                                >
                                    One-Time
                                </button>
                                <button
                                    onClick={() => { setMode("retainer"); setOpenPlan(null); }}
                                    className={`px-5 py-2.5 text-sm font-bold transition-all rounded-sm relative ${
                                        mode === "retainer"
                                            ? "bg-zinc-900 text-white shadow-sm"
                                            : "text-zinc-500 hover:text-zinc-700"
                                    }`}
                                >
                                    Monthly Retainer
                                </button>
                            </div>

                            <p className="text-xs text-zinc-400 mt-4">
                                No contracts. No lock-in. Cancel retainers anytime. Money-back guarantee if you&apos;re not happy with the design direction.
                            </p>
                            <p className="text-xs text-orange-600 font-medium mt-2">
                                Currently accepting 2 new projects this month.
                            </p>

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
                            <GridItem className={plan.popular ? "bg-linear-to-b from-orange-50/80 to-white ring-2 ring-orange-500/30 ring-inset shadow-xl shadow-orange-500/10 scale-[1.02] relative z-10" : ""}>
                                {/* Badge - using darker orange for WCAG AA contrast (4.5:1) */}
                                {(plan.popular || plan.highlight) && (
                                    <motion.div
                                        className={`absolute top-6 right-6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${plan.popular
                                            ? "bg-orange-700 text-white"
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
                                        className="text-xs font-mono text-orange-600 uppercase tracking-wider mb-3"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        {plan.tagline}
                                    </motion.div>

                                    {/* Price */}
                                    <motion.div
                                        className="mb-4"
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                        }}
                                    >
                                        <span className="text-3xl font-bold text-zinc-900">{plan.price}</span>
                                        {plan.priceSuffix && <span className="text-lg text-zinc-500 font-medium">{plan.priceSuffix}</span>}
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
                                    {plan.baseFeatures.map((f, j) => (
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
                                            className={`w-full py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 ${plan.popular
                                                ? "bg-orange-700 text-white hover:bg-orange-800 shadow-lg shadow-orange-700/25"
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
                                                    <a href={`mailto:${AUTHOR.email}`} className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 border border-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label="Contact via Email">
                                                        <SiGmail size={16} aria-hidden="true" />
                                                    </a>
                                                    <a href={SOCIAL_LINKS.whatsapp} className="flex-1 py-3 bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 border border-green-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500" aria-label="Contact via WhatsApp">
                                                        <SiWhatsapp size={16} aria-hidden="true" />
                                                    </a>
                                                    <a href={SOCIAL_LINKS.upwork} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Hire on Upwork">
                                                        <SiUpwork size={16} aria-hidden="true" />
                                                    </a>
                                                    <a href={SOCIAL_LINKS.calcom} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center border border-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" aria-label="Book a call on Cal.com">
                                                        <Image src="/icons/cal.png" alt="Cal.com Booking Icon" width={16} height={16} className="rounded-sm" aria-hidden="true" />
                                                    </a>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenPlan(null);
                                                        }}
                                                        className="px-3 py-3 hover:bg-zinc-100 text-zinc-500 border border-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                                                        aria-label="Close contact options"
                                                    >
                                                        <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
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
