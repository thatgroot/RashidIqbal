"use client";

import { motion, AnimatePresence, useScroll, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Layout, Code, Smartphone } from "lucide-react";
import { GridContainer, GridItem } from "./grid-system";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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

export function HeroV2() {
    const sectionRef = useRef<HTMLElement>(null);
    useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

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
        <section ref={sectionRef} className="pt-18 bg-white relative overflow-hidden">
            <div className="max-w-container border-l border-zinc-100 relative">
                <GridContainer cols={1}>
                    {/* Main Hero Content */}
                    <GridItem
                        className="border-t min-h-[90vh] flex flex-col justify-center relative overflow-hidden group"
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
                                            alt="Project preview"
                                            fill
                                            className="object-cover grayscale"
                                            sizes="20vw"
                                        />
                                    </div>
                                ))}
                                {projectImages.map((src, i) => (
                                    <div key={`dup-${i}`} className="relative aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={src}
                                            alt="Project preview"
                                            fill
                                            className="object-cover grayscale"
                                            sizes="20vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div
                            className="relative z-10 w-full px-6 py-24 md:px-12 md:py-32 flex flex-col items-center text-center"
                            onMouseMove={handleMouseMove}
                        >
                            {/* Status Pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-medium mb-8"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                AVAILABLE FOR NEW PROJECTS
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 mb-8 max-w-4xl mx-auto leading-[0.9]"
                            >
                                Your Vision, <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900">Built Right.</span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10"
                            >
                                Tight deadlines, complex projects, late nights. I&apos;ve seen it all. What stays constant is my commitment to deliver results that exceed expectations.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.querySelector("#work");
                                        if (element) {
                                            const offset = 64;
                                            const elementPosition = element.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            });
                                        }
                                    }}
                                    className="px-8 py-4 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all rounded-full flex items-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    View Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a href="mailto:hello@example.com" className="px-8 py-4 bg-white border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-50 transition-all rounded-full flex items-center gap-2">
                                    Contact Me
                                </a>
                            </motion.div>
                        </div>

                        {/* Visual Background Element - Only visible when NOT hovering lens area to avoid clutter */}
                        <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 pointer-events-none mix-blend-multiply">
                            <VisualBackground />
                        </div>
                    </GridItem>

                    {/* Interactive Window Section */}
                    <GridItem className="border-t bg-zinc-50/50 grid-item-visual w-full min-h-[600px]" padding={false}>
                        <HeroWindowV2 />
                    </GridItem>
                </GridContainer>

                {/* Tools Grid */}
                <GridContainer cols={3}>
                    <ToolGridItem label="Tool" delay={0.5}>
                        <div className="flex items-center gap-3">
                            <FigmaIcon />
                            <div className="text-lg font-medium text-zinc-900">Figma</div>
                        </div>
                    </ToolGridItem>
                    <ToolGridItem label="Builder" delay={0.6}>
                        <div className="flex items-center gap-3">
                            <FramerIcon />
                            <div className="text-lg font-medium text-zinc-900">Framer</div>
                        </div>
                    </ToolGridItem>
                    <ToolGridItem label="Framework" delay={0.7}>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <NextIcon />
                                <ExpoIcon />
                                <FlutterIcon />
                            </div>
                            <div className="flex items-center gap-4 pt-2 border-t border-zinc-100">
                                <div className="flex items-center gap-2">
                                    <CursorIcon />
                                    <span className="text-sm font-medium text-zinc-900">Cursor</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BoltIcon />
                                    <span className="text-sm font-medium text-zinc-900">Bolt</span>
                                </div>
                            </div>
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
        >
            <GridItem label={label} className="h-full flex items-center justify-center py-12">
                {children}
            </GridItem>
        </motion.div>
    );
}

function HeroWindowV2() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { id: "design", label: "Design", icon: Layout, color: "text-orange-500" },
        { id: "code", label: "Code", icon: Code, color: "text-blue-500" },
        { id: "ship", label: "Ship", icon: Smartphone, color: "text-emerald-500" },
    ];

    // Auto-rotate tabs
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % tabs.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [tabs.length]);

    return (
        <div className="w-full h-full flex flex-col relative overflow-hidden group">
            {/* Window Controls & Tabs */}
            <div className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>

                <div className="flex gap-1 bg-zinc-100/50 p-1 rounded-lg">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === index
                                ? "bg-white text-zinc-900 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-700"
                                }`}
                        >
                            <tab.icon className={`w-3.5 h-3.5 ${activeTab === index ? tab.color : ""}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="w-16" /> {/* Spacer for balance */}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative bg-zinc-50/50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
                    >
                        {activeTab === 0 && <DesignShowcase />}
                        {activeTab === 1 && <CodeShowcase />}
                        {activeTab === 2 && <ShipShowcase />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-zinc-200 w-full">
                <motion.div 
                    key={activeTab}
                    className="h-full bg-zinc-900"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                />
            </div>
        </div>
    );
}

function DesignShowcase() {
    return (
        <div className="relative w-full max-w-2xl aspect-video bg-zinc-50 rounded-xl border border-zinc-200 shadow-xl overflow-hidden flex">
            {/* Sidebar - Layers */}
            <div className="w-48 border-r border-zinc-200 bg-white p-3 hidden md:flex flex-col gap-2">
                <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Layers</div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-zinc-50 cursor-default">
                        <div className="w-3 h-3 border border-zinc-300 rounded sm:rounded-sm" />
                        <div className="w-20 h-2 bg-zinc-100 rounded" />
                    </div>
                ))}
            </div>

            {/* Canvas */}
            <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-size-[16px_16px]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-64 h-40 bg-white rounded-lg shadow-sm border border-zinc-100 overflow-hidden group"
                >
                    {/* Header */}
                    <div className="h-8 border-b border-zinc-100 flex items-center px-3 gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    {/* Content */}
                    <div className="p-4 space-y-3">
                        <motion.div
                            className="w-full h-16 rounded-md bg-zinc-100 border border-zinc-200"
                            animate={{
                                backgroundColor: ["#f4f4f5", "#fff7ed", "#f4f4f5"],
                                borderColor: ["#e4e4e7", "#ffedd5", "#e4e4e7"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <div className="space-y-2">
                            <div className="w-3/4 h-2 bg-zinc-100 rounded" />
                            <div className="w-1/2 h-2 bg-zinc-100 rounded" />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <div className="w-1/3 h-6 bg-zinc-900 rounded" />
                            <div className="w-1/3 h-6 bg-zinc-100 rounded" />
                        </div>
                    </div>
                </motion.div>

                {/* Cursor Animation */}
                <motion.div
                    className="absolute z-50 pointer-events-none"
                    initial={{ x: "120%", y: "120%" }}
                    animate={{
                        x: ["50%", "40%", "60%", "50%"],
                        y: ["50%", "40%", "60%", "50%"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.6, 1]
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md text-black">
                        <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="currentColor" stroke="white" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute left-4 top-4 px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap shadow-sm">
                        Rashid
                    </div>
                </motion.div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="w-56 border-l border-zinc-200 bg-white p-3 hidden lg:flex flex-col gap-4">
                <div>
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Properties</div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="w-16 h-6 bg-zinc-50 rounded border border-zinc-100" />
                            <div className="w-16 h-6 bg-zinc-50 rounded border border-zinc-100" />
                        </div>
                        <div className="w-full h-24 bg-zinc-50 rounded border border-zinc-100" />
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Export</div>
                    <div className="w-full h-8 bg-zinc-900 rounded flex items-center justify-center text-xs text-white">
                        Export SVG
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeShowcase() {
    return (
        <div className="relative w-full max-w-2xl aspect-video bg-[#1E1E1E] rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm group">
            {/* Window Header */}
            <div className="h-9 bg-[#252526] flex items-center px-4 gap-2 border-b border-[#333] select-none">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="ml-4 text-zinc-400 text-xs flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded-t-md mt-1">
                    <span className="text-blue-400">TSX</span>
                    hero.tsx
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 text-zinc-300 leading-relaxed overflow-hidden relative">
                <div className="flex">
                    <div className="text-zinc-600 select-none pr-4 text-right border-r border-[#333] mr-4 w-8">
                        1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
                    </div>
                    <div className="flex-1">
                        <div><span className="text-[#C586C0]">export</span> <span className="text-[#569CD6]">function</span> <span className="text-[#DCDCAA]">Hero</span>() {"{"}</div>
                        <div className="pl-4"><span className="text-[#C586C0]">return</span> (</div>
                        <div className="pl-8">
                            &lt;<span className="text-[#4EC9B0]">motion.div</span>
                        </div>
                        <div className="pl-12">
                            <span className="text-[#9CDCFE]">initial</span>={"{"}{"{"} <span className="text-[#9CDCFE]">opacity</span>: <span className="text-[#B5CEA8]">0</span> {"}"}{"}"}
                        </div>
                        <div className="pl-12">
                            <span className="text-[#9CDCFE]">animate</span>={"{"}{"{"} <span className="text-[#9CDCFE]">opacity</span>: <span className="text-[#B5CEA8]">1</span> {"}"}{"}"}
                        </div>
                        <div className="pl-8">
                            &gt;
                        </div>
                        <div className="pl-12 flex items-center">
                            &lt;<span className="text-[#4EC9B0]">h1</span>&gt;
                            <span className="text-[#CE9178]">Hello World</span>
                            &lt;/<span className="text-[#4EC9B0]">h1</span>&gt;
                            <motion.div 
                                className="w-2 h-4 bg-blue-400 ml-1"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        </div>
                        <div className="pl-8">
                            &lt;/<span className="text-[#4EC9B0]">motion.div</span>&gt;
                        </div>
                        <div>);</div>
                        <div>{"}"}</div>
                    </div>
                </div>

                {/* Success Toast */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute bottom-4 right-4 bg-[#252526] border border-green-900/50 text-green-400 px-3 py-2 rounded shadow-lg text-xs flex items-center gap-2"
                >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Compiled successfully
                </motion.div>
            </div>

            {/* Terminal/Status Bar */}
            <div className="h-6 bg-[#007ACC] text-white text-[10px] flex items-center px-3 justify-between select-none">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-70"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 16.5l-1.5 1.5-4-4-4 4-1.5-1.5 5.5-5.5 5.5 5.5z" /></svg>
                        master
                    </span>
                    <span className="opacity-70">0 errors, 0 warnings</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>Ln 8, Col 24</span>
                    <span>UTF-8</span>
                    <span>TypeScript React</span>
                </div>
            </div>
        </div>
    );
}

function ShipShowcase() {
    return (
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center gap-8">
            <motion.div 
                className="w-[120px] h-[240px] bg-white border-[6px] border-zinc-800 rounded-[24px] shadow-xl overflow-hidden relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-b-lg z-20" />

                <div className="w-full h-full bg-zinc-50 flex flex-col pt-6">
                    <div className="p-3 space-y-3">
                        <div className="w-full h-24 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20" />
                        <div className="space-y-2">
                            <div className="w-full h-3 bg-zinc-200 rounded-full" />
                            <div className="w-2/3 h-3 bg-zinc-200 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="h-12 bg-white rounded-lg border border-zinc-100" />
                            <div className="h-12 bg-white rounded-lg border border-zinc-100" />
                        </div>
                    </div>
                    {/* Bottom Nav */}
                    <div className="mt-auto h-12 bg-white border-t border-zinc-100 flex justify-around items-center px-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-100" />
                        <div className="w-6 h-6 rounded-full bg-zinc-100" />
                        <div className="w-6 h-6 rounded-full bg-orange-100" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="w-[360px] h-[240px] bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden relative hidden md:block"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-full h-full bg-white flex flex-col">
                    <div className="h-8 border-b border-zinc-100 w-full flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-32 h-5 bg-zinc-50 rounded text-[10px] flex items-center justify-center text-zinc-400">example.com</div>
                        </div>
                    </div>
                    <div className="p-6 flex gap-6 h-full">
                        <div className="w-1/3 h-full">
                            <div className="w-full h-8 bg-zinc-900 rounded mb-4" />
                            <div className="space-y-2">
                                <div className="w-full h-2 bg-zinc-100 rounded" />
                                <div className="w-full h-2 bg-zinc-100 rounded" />
                                <div className="w-2/3 h-2 bg-zinc-100 rounded" />
                            </div>
                            <div className="mt-6 w-24 h-8 bg-orange-500 rounded shadow-lg shadow-orange-500/20" />
                        </div>
                        <div className="flex-1 h-full bg-zinc-50 rounded-lg border border-zinc-100 relative overflow-hidden">
                            <div className="absolute top-4 right-4 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-50" />
                            <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
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

function NextIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9521 0.00861131C14.8833 0.0148665 14.6643 0.0367597 14.4673 0.0523976C9.92219 0.462113 5.66491 2.91415 2.96852 6.6829C1.46706 8.77839 0.506745 11.1554 0.143891 13.6731C0.0156403 14.5519 0 14.8115 0 16.0031C0 17.1947 0.0156403 17.4543 0.143891 18.3332C1.01349 24.3413 5.28954 29.3892 11.089 31.2595C12.1275 31.5942 13.2223 31.8225 14.4673 31.9601C14.9521 32.0133 17.0479 32.0133 17.5327 31.9601C19.6817 31.7224 21.5022 31.1907 23.2978 30.2743C23.573 30.1336 23.6262 30.0961 23.5887 30.0648C23.5636 30.046 22.3906 28.4729 20.983 26.5713L18.4242 23.1153L15.218 18.3707C13.4538 15.7623 12.0023 13.6293 11.9898 13.6293C11.9773 13.6262 11.9648 15.7342 11.9586 18.3082C11.9492 22.815 11.946 22.9964 11.8897 23.1028C11.8084 23.256 11.7458 23.3186 11.6145 23.3874C11.5144 23.4374 11.4268 23.4468 10.9544 23.4468H10.4133L10.2694 23.3561C10.1756 23.2967 10.1067 23.2185 10.0598 23.1278L9.99413 22.9871L10.0004 16.7162L10.0098 10.4423L10.1067 10.3203C10.1568 10.2546 10.2631 10.1702 10.3382 10.1295C10.4665 10.067 10.5165 10.0607 11.0577 10.0607C11.6958 10.0607 11.8022 10.0857 11.9679 10.2671C12.0149 10.3172 13.7509 12.9318 15.828 16.0813C17.905 19.2308 20.7453 23.5313 22.1404 25.6424L24.6741 29.4799L24.8023 29.3955C25.9378 28.6574 27.139 27.6065 28.0899 26.5119C30.1138 24.188 31.4182 21.3544 31.8561 18.3332C31.9844 17.4543 32 17.1947 32 16.0031C32 14.8115 31.9844 14.5519 31.8561 13.6731C30.9865 7.66496 26.7105 2.61703 20.911 0.746724C19.8882 0.415199 18.7996 0.186884 17.5797 0.0492701C17.2794 0.0179941 15.2117 -0.0164094 14.9521 0.00861131ZM21.5022 9.68539C21.6524 9.76045 21.7744 9.90432 21.8182 10.0544C21.8432 10.1358 21.8495 11.8747 21.8432 15.7936L21.8338 21.417L20.8422 19.897L19.8475 18.377V14.2892C19.8475 11.6464 19.86 10.1608 19.8788 10.0889C19.9288 9.9137 20.0383 9.77609 20.1885 9.69477C20.3167 9.62909 20.3636 9.62284 20.8547 9.62284C21.3177 9.62284 21.399 9.62909 21.5022 9.68539Z" fill="black" />
        </svg>
    )
}

function ExpoIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="#000000" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.292 15.547c1.968 0.131 3.729-1.213 4.115-3.145-0.475-0.735-1.287-1.177-2.161-1.177-2.272-0.052-3.491 2.651-1.953 4.323zM15.115 4.697l5.359-3.104-1.708-0.963-7.391 4.281 0.589 0.328 1.119 0.629 2.032-1.176zM21.161 1.307c0.089 0.027 0.161 0.1 0.188 0.188l2.484 7.593c0.047 0.131-0.005 0.272-0.125 0.344-1.968 1.156-2.916 3.489-2.317 5.693 0.656 2.391 2.937 3.953 5.401 3.703 0.135-0.011 0.265 0.073 0.307 0.203l2.563 7.803c0.041 0.131-0.011 0.271-0.125 0.344l-7.859 4.771c-0.037 0.021-0.084 0.036-0.131 0.036-0.068 0.016-0.14 0-0.203-0.041l-2.765-1.797c-0.048-0.031-0.084-0.077-0.109-0.129l-5.396-12.896-8.219 4.875c-0.016 0.011-0.037 0.021-0.052 0.032-0.084 0.036-0.183 0.025-0.261-0.021l-1.859-1.093c-0.136-0.073-0.188-0.245-0.115-0.381l7.953-15.749c0.025-0.057 0.077-0.104 0.135-0.131l7.959-4.609c0.088-0.052 0.197-0.057 0.292-0.005zM12.839 6.407l-1.932-1.089-7.693 15.229 1.396 0.823 6.631-9.015c0.063-0.089 0.167-0.136 0.271-0.12 0.104 0.011 0.192 0.077 0.235 0.177l7.228 17.296 1.933 1.251-8.063-24.552zM26.245 16.964c-2.256 0-3.787-2.292-2.923-4.376 0.86-2.083 3.563-2.619 5.156-1.025 0.595 0.593 0.928 1.396 0.928 2.235 0.005 1.749-1.412 3.167-3.161 3.167z"/>
        </svg>
    )
}

function FlutterIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="#000000" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15.383 18.316 18.744 15.042 27.093 15.042 19.697 22.438 15.383 18.316 15.383 18.316 15.383 18.316 15.383 18.316 15.383 18.316" style={{fill:"#40d0fd"}}/>
            <polygon points="4.907 16.125 9.106 20.424 27.093 2.287 18.744 2.287 4.907 16.125" style={{fill:"#41d0fd",isolation:"isolate"}}/>
            <polygon points="11.176 22.479 15.435 26.675 19.697 22.438 15.383 18.316 11.176 22.479" style={{fill:"#1fbcfd"}}/>
            <polygon points="15.435 26.675 19.697 22.438 26.989 29.813 18.593 29.813 15.435 26.675" style={{fill:"#095a9d"}}/>
            <polygon points="15.435 26.675 19.406 25.354 18.068 24.057 15.435 26.675" style={{fill:"#0e5199"}}/>
        </svg>
    )
}

function CursorIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"/>
        </svg>
    )
}

function BoltIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.64 12.866c-1.035 0-2.051-.368-2.635-1.158l-.206.932L0 14.61l.41-1.97L3.177.39h3.388l-.979 4.318c.79-.846 1.525-1.158 2.466-1.158 2.032 0 3.388 1.305 3.388 3.693 0 2.462-1.563 5.623-4.8 5.623ZM7.94 7.94c0 1.14-.828 2.003-1.901 2.003-.602 0-1.148-.22-1.506-.606l.527-2.26c.395-.386.847-.607 1.374-.607.81 0 1.506.588 1.506 1.47Z" clipRule="evenodd"/>
        </svg>
    )
}
