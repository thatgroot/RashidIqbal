"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, } from "lucide-react";

export function ServiceBusinessV2() {
    return (
        <section className="py-24 px-4 border-b border-zinc-200 bg-zinc-50/50 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-blue-50/50 rounded-3xl transform -rotate-3" />
                    <div className="relative bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
                        {/* CMS Interface Mockup */}
                        <div className="h-8 border-b border-zinc-100 flex items-center px-4 bg-zinc-50">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                            </div>
                            <div className="ml-4 px-3 py-0.5 bg-white border border-zinc-200 rounded text-[10px] text-zinc-500 flex-1">
                                cms.aestho.xyz/dashboard
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-4 mb-6">
                                <div className="w-1/3 h-24 bg-zinc-50 rounded border border-zinc-100" />
                                <div className="w-1/3 h-24 bg-zinc-50 rounded border border-zinc-100" />
                                <div className="w-1/3 h-24 bg-zinc-50 rounded border border-zinc-100" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-zinc-50 rounded border border-zinc-100">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-8 h-8 bg-white rounded border border-zinc-200" />
                                        <div className="w-32 h-3 bg-zinc-200 rounded" />
                                    </div>
                                    <div className="w-16 h-6 bg-green-100 text-green-700 rounded text-[10px] flex items-center justify-center font-mono">PUBLISHED</div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-zinc-50 rounded border border-zinc-100">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-8 h-8 bg-white rounded border border-zinc-200" />
                                        <div className="w-24 h-3 bg-zinc-200 rounded" />
                                    </div>
                                    <div className="w-16 h-6 bg-green-100 text-green-700 rounded text-[10px] flex items-center justify-center font-mono">PUBLISHED</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating SEO Card */}
                        <motion.div
                            className="absolute bottom-4 right-4 p-4 bg-white border border-zinc-200 rounded-lg shadow-xl max-w-[200px]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-zinc-900">
                                <Search className="w-3 h-3 text-blue-500" />
                                SEO Optimized
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-1.5 w-full bg-zinc-100 rounded overflow-hidden">
                                    <div className="h-full w-[90%] bg-blue-500" />
                                </div>
                                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                    <span>Rank</span>
                                    <span>#1</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div>
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-mono font-medium uppercase tracking-wider mb-6">
                        Enterprise Module
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
                        Business Intelligence Websites
                    </h2>
                    <p className="text-zinc-500 mb-8 leading-relaxed">
                        Scalable corporate digital assets with integrated CMS, robust security, and search engine dominance. Built for growth teams.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {[
                            "Headless CMS Architecture",
                            "Global CDNs (Cloudflare)",
                            "Automated SEO Schemas",
                            "Lead Generation Pipelines"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button className="text-sm font-bold text-zinc-900 flex items-center gap-2 hover:gap-4 transition-all">
                        Explore Solutions <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

