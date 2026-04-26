"use client";

import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { ArrowDown, Mail, Calendar, Briefcase } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { OfferBanner } from "@/components/shared/offer-banner";
import { ExpertBadges } from "@/components/landing/expert-badges";
import { SOCIAL_LINKS } from "@/lib/constants";
import { triggerEmailMe } from "@/components/shared/email-me-toast";

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

    // Rotating CTA — cycles through three high-intent options every
    // 3.2s. Resets if the user is hovering the pill so the option they
    // see is the option they click.
    // For "Email me", clicking dispatches a window event that summons
    // the EmailMeToast (mounted in app/layout.tsx). The toast copies
    // the address to the clipboard and offers Gmail / Outlook / Yahoo /
    // native-app launchers — works for every visitor regardless of how
    // they actually do email.
    const ctaOptions = [
        { label: "Book a call", href: SOCIAL_LINKS.calcom, Icon: Calendar, kind: "link" as const },
        { label: "Email me", href: "#email", Icon: Mail, kind: "email" as const },
        { label: "Hire me", href: SOCIAL_LINKS.upwork, Icon: Briefcase, kind: "link" as const },
    ] as const;
    const [ctaIdx, setCtaIdx] = useState(0);
    const [ctaPaused, setCtaPaused] = useState(false);
    // Hero unblur overlay — mounted on first paint, unmounted once the
    // 1.2s reveal animation finishes so backdrop-filter stops painting.
    const [showBlurOverlay, setShowBlurOverlay] = useState(true);
    useEffect(() => {
        if (ctaPaused) return;
        const id = setInterval(() => setCtaIdx((i) => (i + 1) % ctaOptions.length), 4000);
        return () => clearInterval(id);
    }, [ctaPaused, ctaOptions.length]);
    const cta = ctaOptions[ctaIdx]!;

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
                        className="border-t min-h-[65vh] flex flex-col justify-center relative overflow-hidden group"
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
                                {/*
                                    Rotating CTA. The <motion.a> itself stays mounted —
                                    no `key` on it — so the click target never disappears.
                                    Only the icon + label inside swap via AnimatePresence.
                                    `layout` morphs the pill width smoothly across the
                                    three labels (Book a call / Email me / Hire me).
                                */}
                                <motion.a
                                    layout
                                    href={cta.href}
                                    {...(cta.kind === "link"
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                    aria-label={cta.label}
                                    title={cta.label}
                                    onClick={(e) => {
                                        if (cta.kind === "email") {
                                            e.preventDefault();
                                            triggerEmailMe();
                                        }
                                    }}
                                    onMouseEnter={() => setCtaPaused(true)}
                                    onMouseLeave={() => setCtaPaused(false)}
                                    onFocus={() => setCtaPaused(true)}
                                    onBlur={() => setCtaPaused(false)}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ layout: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }, scale: { delay: 0.4, type: "spring", stiffness: 260, damping: 18 }, opacity: { delay: 0.4 } }}
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="relative z-10 ml-1 inline-flex items-center justify-center gap-1.5 pl-1.5 pr-2.5 py-1 min-w-[104px] rounded-full bg-orange-600 text-white text-xs font-bold tracking-tight shadow-md shadow-orange-500/40 hover:bg-orange-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 overflow-hidden"
                                >
                                    {/* Ping ring — telegraphs clickability, never unmounts */}
                                    <span
                                        className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60 pointer-events-none"
                                        aria-hidden="true"
                                    />
                                    <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 overflow-hidden shrink-0">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.span
                                                key={`icon-${ctaIdx}`}
                                                initial={{ y: 12, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -12, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                                className="flex items-center justify-center"
                                            >
                                                <cta.Icon className="w-3 h-3" aria-hidden="true" />
                                            </motion.span>
                                        </AnimatePresence>
                                    </span>
                                    <span className="relative inline-block overflow-hidden">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.span
                                                key={`label-${ctaIdx}`}
                                                initial={{ y: 12, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -12, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                                className="block whitespace-nowrap"
                                            >
                                                {cta.label}
                                            </motion.span>
                                        </AnimatePresence>
                                    </span>
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

                            {/* Sub-heading - positions the service around design + build +
                                 convert, not audit. Figma/Framer mentioned as the "how". */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8"
                            >
                                I design and build landing pages and websites that turn visitors into customers. Figma design, Framer builds, UX copy baked in. <span className="font-semibold text-zinc-900">Live in two weeks.</span>
                            </motion.p>

                            {/* Trust band doubles as the primary CTA. Each expert badge
                                 links to Cal.com so the click intent is tied to a credibility
                                 signal instead of a generic "book a call" button. */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-3 text-sm text-zinc-500 mb-4"
                            >
                                <ExpertBadges
                                    variant="pill"
                                    href={SOCIAL_LINKS.calcom}
                                    hrefLabel="Book my strategy call"
                                    className="justify-center"
                                />
                                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
                                    <span>Shipping since 2019</span>
                                    <span className="text-zinc-300">•</span>
                                    <span>Avg. 2.4x conversion lift</span>
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

                {/* Tools Grid */}
                <GridContainer cols={3}>
                    <ToolGridItem label="Design" delay={0.5}>
                        <div className="flex items-center gap-3">
                            <FigmaIcon />
                            <div className="text-lg font-medium text-zinc-900">Figma</div>
                        </div>
                    </ToolGridItem>
                    <ToolGridItem label="Build" delay={0.6}>
                        <div className="flex items-center gap-3">
                            <FramerIcon />
                            <div className="text-lg font-medium text-zinc-900">Framer</div>
                        </div>
                    </ToolGridItem>
                    <ToolGridItem label="Ship" delay={0.7}>
                        <div className="flex items-center gap-3">
                            <ChromeIcon />
                            <div className="text-lg font-medium text-zinc-900">Chrome Extensions</div>
                        </div>
                    </ToolGridItem>
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

function ToolGridItem({ label, delay, children }: { label: string; delay: number; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="h-full"
            role="figure"
        >
            <GridItem className="h-full flex flex-col">
                {/* Label row - aligned to top-right */}
                <div className="flex justify-start">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] group-hover:text-orange-500 transition-colors duration-300">
                        {label}
                    </span>
                </div>
                {/* Content - centered in remaining space */}
                <div className="flex-1 flex items-center justify-center">
                    {children}
                </div>
            </GridItem>
        </motion.div>
    );
}


// Icons
function FigmaIcon() {
    return (
        <svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4004 16C10.4004 13.0537 12.7295 10.6674 15.6003 10.6674C18.4734 10.6674 20.8002 13.0514 20.8002 16C20.8002 18.9463 18.4734 21.3326 15.6003 21.3326C12.7318 21.3326 10.4004 18.9486 10.4004 16Z" fill="#1ABCFE" />
            <path d="M0 26.6674C0 23.7211 2.3291 21.3326 5.19989 21.3326H10.3998V26.6674C10.3998 29.6114 8.07069 32 5.19989 32C2.3291 32 0 29.6114 0 26.6674Z" fill="#0ACF83" />
            <path d="M10.4004 0V10.6674H15.6003C18.4734 10.6674 20.8002 8.27885 20.8002 5.33257C20.8002 2.38857 18.4734 0 15.6003 0H10.4004Z" fill="#FF7262" />
            <path d="M0 5.33257C0 8.27885 2.3291 10.6674 5.19989 10.6674H10.3998V0H5.19989C2.3291 0 0 2.38857 0 5.33257Z" fill="#F24E1E" />
            <path d="M0 16C0 18.9463 2.3291 21.3326 5.19989 21.3326H10.3998V10.6674H5.19989C2.3291 10.6674 0 13.0514 0 16Z" fill="#A259FF" />
        </svg>

    )
}

function FramerIcon() {
    return (
        <svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 21.3334H11.1999V32L0 21.3334Z" fill="#0055FF" />
            <path d="M11.1999 10.6663H0V21.3329H22.3998L11.1999 10.6663Z" fill="#00AAFF" />
            <path d="M0 0L11.1999 10.6666H22.3998V0H0Z" fill="#88DDFF" />
        </svg>

    )
}

function ChromeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 8L21.5 8" stroke="currentColor" strokeWidth="2" />
            <path d="M7.5 16L3 8.5" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16L12 24" stroke="currentColor" strokeWidth="2" />
        </svg>
    )
}
