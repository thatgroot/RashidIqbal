"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MousePointer2, Smartphone, Code2, PenTool } from "lucide-react";
import { GridContainer, GridItem } from "./grid-system";
import { useState } from "react";

export function HeroV2() {
    return (
        <section className="pt-18 bg-white relative">
            <div className="max-w-container border-l border-zinc-100">
                <GridContainer cols={2}  > 
                    <GridItem className="border-t py-24">
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 text-xs font-mono text-orange-700 mb-8"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                AVAILABLE FOR NEW PROJECTS
                            </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 mb-10 leading-[1.1]"
                    >
                        Your Vision, Built Right.
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-500 max-w-md leading-relaxed mb-12"
                    >
                        Tight deadlines, complex projects, late nights. I&apos;ve seen it all. What stays constant is my commitment to deliver results that exceed expectations. Your project gets my full focus until it&apos;s perfect.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
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
                            className="px-8 py-4 bg-zinc-900 text-white text-sm font-medium hover:bg-orange-500 transition-colors flex items-center gap-2 group"
                        >
                            View Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                        </div>
                    </GridItem>

                    {/* Interactive Hero Window */}
                    <GridItem className="border-t bg-zinc-50/30 grid-item-visual" padding={false}>
                        <HeroWindowV2 />
                    </GridItem>
                </GridContainer>

                <GridContainer cols={3}  > 
                    <GridItem label="Tool">
                        <div className="mt-auto flex items-center gap-3">
                            <FigmaIcon />
                            <div className="text-lg font-medium text-zinc-900">Figma</div>
                        </div>
                    </GridItem>
                    <GridItem label="Builder">
                        <div className="mt-auto flex items-center gap-3">
                            <FramerIcon />
                            <div className="text-lg font-medium text-zinc-900">Framer</div>
                        </div>
                    </GridItem>
                    <GridItem label="Framework">
                        <div className="mt-auto space-y-3">
                            <div className="flex items-center gap-4">
                                <NextIcon />
                                <ExpoIcon />
                                <FlutterIcon />
                            </div>
                            <div className="pt-2 border-t border-zinc-100 flex items-center gap-4">
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
                    </GridItem>
                </GridContainer>
            </div>
        </section>
    );
}

function HeroWindowV2() {
    const [activeTab, setActiveTab] = useState("dev");

    const tabs = [
        { id: "dev", label: "Development", icon: Code2 },
        { id: "design", label: "Design", icon: PenTool },
        { id: "apps", label: "Apps", icon: Smartphone },
    ];

    return (
        <div className="absolute inset-0 flex flex-col p-2 md:p-6 dotted-bg">
            {/* Single Unified Window - Fills Container */}
            <div className="w-full h-full bg-white border border-zinc-200 shadow-sm flex flex-col overflow-hidden relative z-10">
                {/* Integrated Header / Tabs */}
                <div className="h-12 border-b border-zinc-200 flex items-center bg-zinc-50/50 overflow-x-auto scrollbar-hide">
                    {/* Window Controls */}
                    <div className="flex gap-2 px-3 md:px-6 border-r border-zinc-200 h-full items-center shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* Tabs - Square & Integrated */}
                    <div className="flex h-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 h-full text-sm font-bold transition-all border-r border-zinc-200 whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-white text-zinc-900 relative"
                                    : "bg-zinc-50/50 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="hidden lg:inline">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 relative overflow-hidden bg-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                        >
                            {activeTab === "design" && <DesignVisual />}
                            {activeTab === "dev" && <DevVisual />}
                            {activeTab === "apps" && <AppsVisual />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function DesignVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-zinc-50/30 overflow-hidden dotted-bg dotted-bg-opacity-70">
            <motion.div
                className="relative bg-white border border-zinc-200 w-full max-w-lg h-64 sm:h-80 shadow-sm mx-8"
                initial={{ rotate: -1, y: 0 }}
                animate={{ rotate: 1, y: -5 }}
                transition={{
                    rotate: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
            >
                <div className="w-full h-full bg-white border border-zinc-100 flex flex-col">
                    {/* Interface Header */}
                    <div className="h-8 border-b border-zinc-100 flex items-center justify-between px-4 bg-zinc-50/50">
                        <div className="w-24 h-2 bg-zinc-200 rounded-full" />
                        <div className="flex gap-2">
                            <div className="w-4 h-4 bg-zinc-100 border border-zinc-200 rounded-sm" />
                            <div className="w-4 h-4 bg-zinc-100 border border-zinc-200 rounded-sm" />
                        </div>
                    </div>

                    <div className="flex-1 flex">
                        {/* Sidebar - Hidden on very small screens */}
                        <div className="w-16 border-r border-zinc-100 bg-zinc-50/30 flex-col gap-2 p-2 hidden sm:flex">
                            <div className="w-full aspect-square bg-zinc-100 rounded-sm border border-zinc-200" />
                            <div className="w-full aspect-square bg-zinc-100 rounded-sm border border-zinc-200" />
                            <div className="w-full aspect-square bg-zinc-100 rounded-sm border border-zinc-200" />
                        </div>

                        {/* Canvas Content */}
                        <div className="flex-1 p-6 relative">
                            <div className="absolute top-6 left-6 right-6 bottom-6 border border-dashed border-blue-300 rounded-sm flex flex-col p-4 gap-3 bg-blue-50/5">
                                <div className="w-1/2 h-4 bg-zinc-100 rounded-sm" />
                                <div className="w-full h-24 bg-zinc-50 border border-zinc-100 rounded-sm" />
                                <div className="flex gap-2">
                                    <div className="w-20 h-6 bg-zinc-900 rounded-sm" />
                                    <div className="w-20 h-6 bg-zinc-100 border border-zinc-200 rounded-sm" />
                                </div>
                            </div>

                            {/* Floating Palette */}
                            <motion.div
                                className="absolute top-4 right-4 w-24 bg-white border border-zinc-200 p-2 shadow-sm z-10"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="text-[8px] text-zinc-500 mb-1 uppercase font-bold">Colors</div>
                                <div className="grid grid-cols-4 gap-1">
                                    <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                                    <div className="w-4 h-4 bg-zinc-900 rounded-sm" />
                                    <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                                    <div className="w-4 h-4 bg-zinc-200 rounded-sm" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Panel - Hidden on smaller screens */}
                        <div className="w-32 border-l border-zinc-100 bg-white p-3 hidden md:block">
                            <div className="space-y-3">
                                <div className="w-full h-2 bg-zinc-100 rounded-full" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-6 bg-zinc-50 border border-zinc-100 rounded-sm" />
                                    <div className="h-6 bg-zinc-50 border border-zinc-100 rounded-sm" />
                                </div>
                                <div className="w-full h-20 bg-zinc-50 border border-zinc-100 rounded-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cursor Interaction */}
                <motion.div
                    className="absolute z-20"
                    animate={{
                        x: [0, 80, 40, 0],
                        y: [0, 40, 80, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ top: '40%', left: '20%' }}
                >
                    <MousePointer2 className="w-5 h-5 text-black fill-black stroke-white" />
                    <div className="ml-2 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-bold inline-block rounded-sm shadow-sm">
                        You
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

function DevVisual() {
    return (
        <div className="w-full h-full bg-white p-4 md:p-8 font-mono text-xs md:text-sm relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Code2 className="w-96 h-96" />
            </div>
            <div className="space-y-4 relative z-10 max-w-3xl overflow-y-auto custom-scrollbar h-full">
                <div className="flex gap-3 items-center text-zinc-500 border-b border-zinc-100 pb-4 flex-wrap">
                    <span>rashid@dev</span>
                    <span className="text-zinc-300">~</span>
                    <span>portfolio-v2</span>
                </div>

                <div className="space-y-2">
                    <div className="flex gap-3 flex-wrap">
                        <span className="text-orange-500 font-bold">➜</span>
                        <span className="text-zinc-900">npx create-next-app@latest</span>
                    </div>
                    <div className="text-zinc-500 pl-6 border-l-2 border-zinc-100 ml-2 py-1">
                        Need to install the following packages: <br />
                        create-next-app@14.1.0
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <div className="flex gap-3 items-start flex-wrap">
                        <span className="text-green-500 mt-0.5">?</span>
                        <span className="text-zinc-900 font-bold">What is your project named?</span>
                        <TypeWriter text=" my-portfolio" delay={0.5} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="flex gap-3 items-start flex-wrap"
                    >
                        <span className="text-green-500 mt-0.5">?</span>
                        <span className="text-zinc-900 font-bold">Would you like to use TypeScript?</span>
                        <span className="text-orange-500">Yes</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="flex gap-3 items-start flex-wrap"
                    >
                        <span className="text-green-500 mt-0.5">?</span>
                        <span className="text-zinc-900 font-bold">Would you like to use Tailwind CSS?</span>
                        <span className="text-orange-500">Yes</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                        className="pt-4 text-green-600 flex items-start gap-3 font-bold flex-wrap"
                    >
                        <span className="mt-0.5">✔</span> Success! Created my-portfolio at ./my-portfolio
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5 }}
                        className="pt-4 text-zinc-500"
                    >
                        <div className="flex gap-3 flex-wrap">
                             <span className="text-orange-500 font-bold">➜</span> cd my-portfolio
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <span className="text-orange-500 font-bold">➜</span> npm run dev
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5.5 }}
                        className="p-4 bg-green-50 border border-green-100 rounded text-green-700 mt-4 inline-block break-all"
                    >
                        ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function AppsVisual() {
    return (
        <div className="w-full h-full flex items-end justify-center gap-4 sm:gap-8 pb-8 bg-zinc-50/30 px-4 sm:px-12">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="bg-white border-x border-t border-zinc-200 relative overflow-hidden shadow-sm"
                    // Desktop: 16:10 aspect (approx), Tablet: 3:4, Mobile: 9:19.5
                    // Using fixed widths/heights to maintain ratios visually
                    style={{
                        width: i === 2 ? '45%' : i === 1 ? '30%' : '15%',
                        height: i === 2 ? '80%' : i === 1 ? '60%' : '50%',
                        minWidth: i === 2 ? '240px' : i === 1 ? '160px' : '80px'
                    }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                >
                    <div className="w-full h-1 bg-orange-500" />
                    <div className="p-2 sm:p-4 space-y-2 sm:space-y-4">
                        <div className="w-full h-24 sm:h-32 bg-zinc-50 border border-zinc-100" />
                        <div className="w-3/4 h-2 sm:h-3 bg-zinc-100" />
                        <div className="w-1/2 h-2 sm:h-3 bg-zinc-100" />

                        {i === 2 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="h-16 bg-blue-50 rounded border border-blue-100" />
                                <div className="h-16 bg-purple-50 rounded border border-purple-100" />
                                <div className="h-16 bg-green-50 rounded border border-green-100" />
                            </div>
                        )}

                        {i === 1 && (
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="h-12 bg-blue-50 rounded" />
                                <div className="h-12 bg-purple-50 rounded" />
                            </div>
                        )}
                    </div>

                    {/* Badge */}
                    <div className="absolute bottom-4 left-4 bg-zinc-100 px-2 py-1 text-[10px] font-bold text-zinc-500 uppercase border border-zinc-200">
                        {i === 0 ? 'Mobile' : i === 1 ? 'Tablet' : 'Desktop'}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function TypeWriter({ text, delay = 0 }: { text: string, delay?: number }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            {text}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-3 bg-orange-500 ml-1 align-middle"
            />
        </motion.span>
    );
}

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
