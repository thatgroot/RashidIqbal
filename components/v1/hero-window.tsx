"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, PenTool, MousePointer2, Smartphone } from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    id: "dev",
    label: "Development",
    icon: Terminal,
    content: (
      <div className="font-mono text-xs space-y-2 opacity-70 p-4">
        <div className="text-green-400">➜  git init</div>
        <div className="text-white/60">Initialized empty Git repository</div>
        <div className="text-green-400">➜  npm install next framer-motion</div>
        <div className="text-white/60">
            added 24 packages in 2s<br/>
            12 packages are looking for funding
        </div>
        <div className="flex items-center gap-2 text-green-400">
            ➜  npm run dev
            <motion.div 
                className="w-2 h-4 bg-green-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            />
        </div>
      </div>
    )
  },
  {
    id: "design",
    label: "Design",
    icon: PenTool,
    content: (
      <div className="relative w-full h-full flex items-center justify-center bg-[#1e1e1e] overflow-hidden">
         {/* Figma-like UI Interface */}
         <div className="absolute inset-0 flex flex-col">
            {/* Top Bar */}
            <div className="h-8 bg-[#2c2c2c] border-b border-black flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#f24822] rounded-full" /> {/* Figma Red */}
                    <span className="text-[10px] text-white/60 font-medium">Untitled</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-white/10 rounded-full" />
                    <div className="w-4 h-4 bg-white/10 rounded-full" />
                </div>
            </div>
            
            <div className="flex-1 flex">
                {/* Left Sidebar */}
                <div className="w-12 bg-[#2c2c2c] border-r border-black hidden sm:flex flex-col gap-2 p-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full aspect-square bg-white/5 rounded" />
                    ))}
                </div>
                
                {/* Canvas */}
                <div className="flex-1 bg-[#1e1e1e] relative p-8 flex items-center justify-center">
                    {/* Artboard */}
                    <motion.div 
                        className="w-48 h-32 bg-white shadow-lg relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* UI Elements on Artboard */}
                        <div className="absolute top-4 left-4 w-20 h-4 bg-zinc-200 rounded" />
                        <div className="absolute top-12 left-4 right-4 h-16 bg-blue-100 rounded flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Cursor */}
                    <motion.div
                        className="absolute z-50 pointer-events-none"
                        animate={{ 
                            x: [0, 60, 30, 0],
                            y: [0, 40, 80, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <MousePointer2 className="w-4 h-4 text-black fill-black stroke-white" />
                        <div className="ml-3 mt-1 px-1.5 py-0.5 bg-green-500 text-[8px] text-white rounded font-bold">
                            You
                        </div>
                    </motion.div>
                </div>

                {/* Right Sidebar */}
                <div className="w-16 bg-[#2c2c2c] border-l border-black hidden sm:flex flex-col gap-2 p-2">
                    <div className="w-full h-4 bg-white/10 rounded mb-2" />
                    <div className="w-full h-2 bg-white/5 rounded" />
                    <div className="w-2/3 h-2 bg-white/5 rounded" />
                    <div className="mt-4 w-full h-8 bg-blue-500/20 rounded border border-blue-500/50" />
                </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: "apps",
    label: "Apps",
    icon: Smartphone,
    content: (
      <div className="relative w-full h-full flex items-center justify-center p-8 bg-zinc-900">
         <div className="flex gap-4 items-end">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-16 bg-black border border-white/10 rounded-xl relative overflow-hidden shadow-xl"
                    style={{ height: 100 + i * 10 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-zinc-800 rounded-full" />
                    <div className="absolute inset-x-2 top-5 bottom-2 bg-zinc-800/50 rounded flex flex-col gap-1 p-1">
                        <div className="w-full h-8 bg-white/5 rounded" />
                        <div className="w-full h-4 bg-white/5 rounded" />
                        <div className="flex gap-1">
                            <div className="w-1/2 h-12 bg-blue-500/20 rounded" />
                            <div className="w-1/2 h-12 bg-purple-500/20 rounded" />
                        </div>
                    </div>
                </motion.div>
            ))}
         </div>
      </div>
    )
  }
];

export function HeroWindow() {
  const [activeTab, setActiveTab] = useState("dev");

  return (
    <div className="w-full max-w-3xl bg-[#09090b] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Window Controls & Tabs */}
        <div className="h-10 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-4">
            <div className="flex items-center gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            
            <div className="flex gap-1 h-full pt-1.5 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 h-full rounded-t-md text-xs font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab.id 
                                ? "bg-[#09090b] text-white border-x border-t border-white/5 relative top-px" 
                                : "text-white/40 hover:text-white/60 hover:bg-white/5"
                        }`}
                    >
                        <tab.icon className="w-3 h-3" />
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="h-64 relative bg-[#09090b]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                >
                    {tabs.find(t => t.id === activeTab)?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  );
}
