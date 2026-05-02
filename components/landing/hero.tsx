"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";

import { useRef, useState } from "react";
import Image from "next/image";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { OfferBanner } from "@/components/shared/offer-banner";
import { ExpertBadges } from "@/components/landing/expert-badges";
import { SOCIAL_LINKS } from "@/lib/constants";

const projectImages = [
    "/work-screenshots/deals-finders.png",
    "/work-screenshots/funnel-labs.png",
    "/work-screenshots/leanscale.png",
    "/work-screenshots/melissa-ambrosini.png",
    "/work-screenshots/nick-broadhurst.png",
    "/work-screenshots/pedro-token.png",
    "/work-screenshots/road-id.png",
    "/work-screenshots/saku-monsters.png",
];

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    // Mouse tracking for lens effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Single stable CTA — opens cal.com/rashid.iqbal directly so the
    // visitor can pick a slot in the same flow they're already in.
    const cta = {
        label: "Book a strategy call",
        href: SOCIAL_LINKS.calcom,
        Icon: Calendar,
    };
    // Hero unblur overlay — mounted on first paint, unmounted once the
    // 1.2s reveal animation finishes so backdrop-filter stops painting.
    const [showBlurOverlay, setShowBlurOverlay] = useState(true);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;

    return (
        <section ref={sectionRef} className="pt-16 bg-white relative overflow-hidden">
            {/* Promotional strip, directly below the fixed navbar */}
            <OfferBanner />
            <div className="max-w-container border-l border-zinc-100 relative">
                <GridContainer cols={1}>
                    {/* Main Hero Content */}
                    <GridItem
                        className="border-t relative overflow-hidden group"
                        padding={false}
                    >
                        {/* Lens Effect Layer - Visible on Hover */}
                        <motion.div
                            className="absolute inset-0 z-0 pointer-events-none hidden md:block"
                            style={{ maskImage, WebkitMaskImage: maskImage }}
                        >
                            <div className="absolute inset-0 bg-zinc-50 opacity-20" />
                            {/* Montage of work */}
                            <div className="absolute inset-0 grid grid-cols-4 gap-2 opacity-30 rotate-12 scale-125">
                                {projectImages.map((src, i) => (
                                    <div key={i} className="relative aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={`Showcase of previous project ${i + 1}`}
                                            fill
                                            className="object-cover grayscale"
                                            sizes="20vw"
                                            priority={i < 4}
                                        />
                                    </div>
                                ))}
                                {projectImages.map((src, i) => (
                                    <div key={`dup-${i}`} className="relative aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={src}
                                            alt=""
                                            fill
                                            className="object-cover grayscale"
                                            sizes="20vw"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/*
                            Backdrop-filter overlay: blurs the hero on first
                            paint, then fades to opacity 0 over 1.2s. Once the
                            animation finishes we unmount it so the browser
                            stops painting backdrop-filter every frame. This
                            avoids the iOS Safari `filter: blur()` step-tween
                            issue and the GPU cost of animating filters
                            directly on the content layer.
                        */}
                        {showBlurOverlay && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                onAnimationComplete={() => setShowBlurOverlay(false)}
                                aria-hidden="true"
                                className="absolute inset-0 z-20 pointer-events-none"
                                style={{
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                }}
                            />
                        )}

                        <motion.article
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 w-full px-6 py-12 md:px-12 md:py-16 flex flex-col items-center text-center"
                            onMouseMove={handleMouseMove}
                        >
                            {/* Status Pill with Urgency - Animated Border Trail */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-medium mb-6"
                            >
                                {/* Static border background */}
                                <div className="absolute inset-0 rounded-full border border-orange-200" />
                                {/* Animated traveling light on border */}
                                <div className="absolute inset-px rounded-full overflow-hidden">
                                    <div
                                        className="absolute inset-0 animate-border-travel"
                                        style={{
                                            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 340deg, #f97316 350deg, #fb923c 355deg, #f97316 360deg)',
                                        }}
                                    />
                                </div>
                                {/* Glow that follows the light */}
                                <div className="absolute inset-[-4px] rounded-full overflow-hidden pointer-events-none">
                                    <div
                                        className="absolute inset-0 animate-border-travel blur-sm opacity-60"
                                        style={{
                                            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 340deg, #f97316 350deg, #fb923c 355deg, #f97316 360deg)',
                                        }}
                                    />
                                </div>
                                {/* Inner background */}
                                <div className="absolute -inset-1 rounded-full bg-orange-50" />
                                {/* Content */}
                                <span className="relative flex items-center gap-2 text-orange-700 z-10">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                    </span>
                                    AVAILABLE NOW
                                </span>
                                <span className="relative w-px h-4 bg-orange-200 z-10"></span>
                                <span className="relative text-zinc-600 z-10">Accepting 2 new Framer projects</span>
                                {/* Stable primary CTA — single verb, single
                                    destination. Opens cal.com/rashid.iqbal
                                    in a new tab. */}
                                <motion.a
                                    href={cta.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={cta.label}
                                    title={cta.label}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="relative z-10 ml-1 inline-flex items-center justify-center gap-1.5 pl-2 pr-3 py-1 rounded-full bg-orange-600 text-white text-xs font-bold tracking-tight shadow-md shadow-orange-500/40 hover:bg-orange-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 overflow-hidden"
                                >
                                    <span
                                        className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60 pointer-events-none"
                                        aria-hidden="true"
                                    />
                                    <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 shrink-0">
                                        <cta.Icon className="w-3 h-3" aria-hidden="true" />
                                    </span>
                                    <span className="relative whitespace-nowrap">{cta.label}</span>
                                </motion.a>
                            </motion.div>

                            {/* Frustration hook - question that teases the headline's answer */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-base md:text-xl font-bold tracking-tight mb-5"
                            >
                                <span className="text-zinc-900">Why is your site</span>{" "}
                                <span className="text-orange-600">not converting?</span>
                            </motion.p>

                            {/* Answer headline - 7 words, completes the question with a concrete diagnosis */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tighter text-zinc-900 mb-6 max-w-4xl mx-auto leading-[1.1] pb-1"
                            >
                                <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">Because your page</span>{" "}
                                <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">isn&rsquo;t built to</span>{" "}
                                <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-orange-600 pb-1">sell.</span>
                            </motion.h1>

                            {/* Sub-heading — names the buyer's actual outcome
                                 ("more demos in 60 days") and the named clients
                                 who got it. Specificity beats abstract claims. */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8"
                            >
                                I rewrite the copy and rebuild your page in Framer with headlines and CTAs that close deals. UpdateAI: signups +50%. Vanos AI: weekly devs 2×. SpaceDome: signups 3×. <span className="font-semibold text-zinc-900">Live in two weeks. Refund if the design is wrong.</span>
                            </motion.p>

                            {/* Trust band + secondary CTA. Both primary
                                 CTAs (status pill above, this band) point to
                                 the same in-page booking anchor — no offsite
                                 redirects, single conversion path. */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-3 text-sm text-zinc-500 mb-4"
                            >
                                {/* Each badge links to its own profile so the
                                    visitor can verify the credential directly
                                    on Framer / Contra / Base44 / Dribbble. */}
                                <ExpertBadges
                                    variant="pill"
                                    className="justify-center"
                                />
                                <p className="text-xs text-zinc-500">
                                    Free 30-min audit · No credit card · Refund if the design is wrong
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
                                    <span>Shipping since 2019</span>
                                    <span className="text-zinc-300">•</span>
                                    <span>Avg. 2.4x conversion lift in 60 days</span>
                                    <span className="text-zinc-300">•</span>
                                    <span>Top Rated on Upwork</span>
                                </div>
                            </motion.div>

                            {/* Scroll Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="mt-12 flex flex-col items-center gap-2"
                            >
                                <span className="text-xs text-zinc-400 uppercase tracking-widest">Scroll to explore</span>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowDown className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                                </motion.div>
                            </motion.div>
                        </motion.article>

                        {/* Visual Background Element - Only visible when NOT hovering lens area to avoid clutter */}
                        <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 pointer-events-none mix-blend-multiply">
                            <VisualBackground />
                        </div>
                    </GridItem>

                </GridContainer>
            </div>
        </section>
    );
}

function VisualBackground() {
    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Abstract animated shapes */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[5%] w-64 h-64 bg-linear-to-br from-orange-100/40 to-transparent rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-linear-to-tl from-blue-100/40 to-transparent rounded-full blur-3xl"
            />
        </div>
    )
}

