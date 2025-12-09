"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export function ServiceMobileV2() {
  return (
    <section className="py-24 px-4 border-b border-zinc-200 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
           <div className="inline-flex items-center gap-2 px-2 py-1 bg-purple-50 text-purple-700 rounded text-[10px] font-mono font-medium uppercase tracking-wider mb-6">
              Native Ecosystems
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
              Cross-Platform Mobile Apps
           </h2>
           <p className="text-zinc-500 mb-8 leading-relaxed">
              One codebase, native performance on iOS and Android. Built with Expo and React Native for rapid deployment and easy maintenance.
           </p>
           <ul className="space-y-3 mb-8">
              {[
                  "60 FPS Native Performance",
                  "Offline-First Architecture",
                  "Push Notification Systems",
                  "App Store & Play Store CI/CD"
              ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-800">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      {item}
                  </li>
              ))}
           </ul>
           <button className="text-sm font-bold text-zinc-900 flex items-center gap-2 hover:gap-4 transition-all">
               View App Portfolio <ArrowRight className="w-4 h-4" />
           </button>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
                {/* Phone Mockup */}
                <div className="relative w-64 h-[500px] bg-zinc-900 rounded-[2.5rem] shadow-2xl border-4 border-zinc-800 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-20" />
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-white pt-12 px-4 relative">
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                            <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                        </div>
                        <div className="w-2/3 h-8 bg-zinc-100 rounded mb-4" />
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="h-32 bg-purple-50 rounded-xl border border-purple-100" />
                            <div className="h-32 bg-zinc-50 rounded-xl border border-zinc-100" />
                        </div>
                        
                        {/* Notification Toast */}
                        <motion.div 
                            className="absolute top-16 left-4 right-4 p-3 bg-zinc-900 rounded-xl flex items-center gap-3 shadow-lg"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <Download className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-[10px] text-white font-bold">Update Installed</div>
                                <div className="text-[10px] text-zinc-500">Version 2.0 is live</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Performance Badge */}
                <div className="absolute -right-8 top-1/3 p-4 bg-white border border-zinc-200 rounded-lg shadow-lg">
                     <div className="text-2xl font-bold text-zinc-900 font-mono">60 FPS</div>
                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Render Time</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

