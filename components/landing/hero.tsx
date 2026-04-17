"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, ArrowDown, Users } from "lucide-react";

import { useRef } from "react";
import Image from "next/image";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
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

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;

    return (
        <section ref={sectionRef} className="pt-16 bg-white relative overflow-hidden">
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

                        <article
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

                            {/* Sub-heading - what the buyer gets, not which tools I use */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8"
                            >
                                I audit what is losing you visitors, rewrite the copy, and rebuild the page around conversion. <span className="font-semibold text-zinc-900">Measurable lift in two weeks.</span>
                            </motion.p>

                            {/* Single CTA - one offer, one action */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center gap-3 mb-8"
                            >
                                <a
                                    href={SOCIAL_LINKS.calcom}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                                >
                                    Book my strategy call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </a>
                                <a
                                    href="#work"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById("work");
                                        if (el) {
                                            const offset = 64;
                                            const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
                                            window.scrollTo({ top: pos, behavior: "smooth" });
                                        }
                                    }}
                                    className="text-sm text-zinc-500 hover:text-orange-600 transition-colors underline underline-offset-4 decoration-zinc-300 hover:decoration-orange-400"
                                >
                                    See recent work
                                </a>
                            </motion.div>

                            {/* Distributed trust band - answers "can I trust it?" next to the CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-zinc-500"
                            >
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full">
                                    <Users className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                                    <span className="font-medium text-zinc-700">53 projects shipped</span>
                                </div>
                                <span className="hidden sm:inline text-zinc-300">•</span>
                                <span className="hidden sm:inline">Avg. 2.4x conversion lift</span>
                                <span className="hidden sm:inline text-zinc-300">•</span>
                                <span className="hidden sm:inline">Certified Framer Expert</span>
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
                        </article>

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
