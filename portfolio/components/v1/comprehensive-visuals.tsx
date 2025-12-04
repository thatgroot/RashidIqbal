"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Activity, CheckCircle2, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComprehensiveVisualProps {
    state?: 'inactive' | 'running' | 'final'
}

// --- Voice-to-Voice Comprehensive Visual ---

export function ComprehensiveV2VVisual({ state = 'running' }: ComprehensiveVisualProps) {
  const [step, setStep] = useState(0)
  
  // Cycle through states: 0 (Listening) -> 1 (Processing) -> 2 (Speaking)
  useEffect(() => {
    if (state === 'inactive') {
        // Inactive state, reset if needed or just stay at 0
        if (step !== 0) setTimeout(() => setStep(0), 0)
        return
    }
    
    if (state === 'final') {
        if (step !== 2) setTimeout(() => setStep(2), 0) // Final step
        return
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [state, step])

  // Derived active state for display
  const currentStep = state === 'inactive' ? -1 : step

  return (
    <div className="w-full h-full relative bg-[#09090b] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[32px_32px]"></div>
      </div>

      {/* Main Processing Pipeline */}
      <div className="flex-1 flex items-center justify-center gap-4 md:gap-12 relative z-10 p-4 md:p-8">
        
        {/* Transcription Tooltip (Bottom Center) */}
        <AnimatePresence>
            {currentStep === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-xl z-20 whitespace-nowrap ring-1 ring-white/5"
                >
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="italic">&quot;Book a demo for tomorrow&quot;</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Stage 1: Audio Input (Listening) */}
        <div className="flex flex-col items-center gap-4 relative group">
            <div className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 relative overflow-hidden",
                currentStep === 0 ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)]" : "bg-white/5 border-white/5 hover:border-white/10"
            )}>
                {currentStep === 0 && <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>}
                <MicVisual active={currentStep === 0} />
            </div>
            <span className={cn("text-[11px] font-medium tracking-wider uppercase transition-colors duration-300", currentStep === 0 ? "text-blue-400" : "text-zinc-600")}>
                Input
            </span>
        </div>

        {/* Connection Line 1 */}
        <div className="flex-1 h-px bg-white/5 relative overflow-hidden mx-2">
            {currentStep === 0 && (
                <motion.div 
                    className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500 to-transparent w-2/3 blur-[1px]"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
        </div>

        {/* Stage 2: Neural Core (Processing) */}
        <div className="flex flex-col items-center gap-4 relative">
            {/* Latency Badge */}
            <motion.div 
                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-md text-[10px] text-emerald-400 font-mono shadow-sm whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: currentStep === 1 ? 1 : 0, y: currentStep === 1 ? 0 : 5 }}
            >
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                    12ms INFERENCE
                </div>
            </motion.div>

            {/* Context Cards Floating */}
            <AnimatePresence>
                {currentStep === 1 && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0, x: -20, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: -60, y: -30, scale: 1 }}
                            exit={{ opacity: 0, x: -20, y: -10, scale: 0.9 }}
                            className="absolute top-2 left-2 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-lg z-0 ring-1 ring-white/5 hidden md:block"
                        >
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 whitespace-nowrap font-medium">
                                <User className="w-3.5 h-3.5 text-zinc-500" />
                                <span>CRM Context</span>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 60, y: 30, scale: 1 }}
                            exit={{ opacity: 0, x: 20, y: 10, scale: 0.9 }}
                            className="absolute bottom-2 right-2 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-lg z-0 ring-1 ring-white/5 hidden md:block"
                        >
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 whitespace-nowrap font-medium">
                                <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                                <span>History</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className={cn(
                "w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border transition-all duration-500 relative z-10",
                currentStep === 1 ? "border-purple-500/40 bg-purple-500/5 shadow-[0_0_60px_rgba(168,85,247,0.15)] scale-105" : "border-white/5 bg-white/5"
            )}>
                {/* Inner Spinning Ring */}
                <div className={cn(
                    "absolute inset-3 rounded-full border border-dashed border-white/20 opacity-50",
                    currentStep === 1 && "animate-[spin_4s_linear_infinite] border-purple-400/30 opacity-100"
                )}></div>
                 {/* Outer Reverse Ring */}
                 <div className={cn(
                    "absolute inset-1 rounded-full border border-white/5 opacity-0",
                    currentStep === 1 && "animate-[spin_6s_linear_infinite_reverse] border-t-purple-500/30 opacity-100"
                )}></div>
                
                {/* Core Graphic */}
                <Activity className={cn(
                    "w-8 h-8 md:w-10 md:h-10 transition-colors duration-300",
                    currentStep === 1 ? "text-purple-400" : "text-zinc-700"
                )} />
            </div>
            <span className={cn("text-[11px] font-medium tracking-wider uppercase transition-colors duration-300", currentStep === 1 ? "text-purple-400" : "text-zinc-600")}>
                Neural Engine
            </span>
        </div>

        {/* Connection Line 2 */}
        <div className="flex-1 h-px bg-white/5 relative overflow-hidden mx-2">
             {currentStep === 1 && (
                <motion.div 
                    className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500 to-transparent w-2/3 blur-[1px]"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                />
            )}
        </div>

        {/* Stage 3: Audio Output (Speaking) */}
        <div className="flex flex-col items-center gap-4 relative">
            {/* Action Badge */}
            <motion.div 
                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-blue-950/50 backdrop-blur-sm border border-blue-500/30 px-3 py-1 rounded-md text-[10px] text-blue-400 font-mono shadow-sm whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: currentStep === 2 ? 1 : 0, y: currentStep === 2 ? 0 : 5 }}
            >
                <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    APPOINTMENT SET
                </div>
            </motion.div>

            <div className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 relative overflow-hidden",
                currentStep === 2 ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)]" : "bg-white/5 border-white/5 hover:border-white/10"
            )}>
                {currentStep === 2 && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>}
                <WaveformVisual active={currentStep === 2} />
            </div>
            <span className={cn("text-[11px] font-medium tracking-wider uppercase transition-colors duration-300", currentStep === 2 ? "text-emerald-400" : "text-zinc-600")}>
                Output
            </span>
        </div>
      </div>

      {/* Bottom Data Panel */}
      <div className="h-10 border-t border-white/5 bg-zinc-950/50 backdrop-blur flex items-center justify-between px-6">
          <div className="flex items-center gap-4 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                  <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]",
                      state === 'inactive' ? "bg-zinc-600" : "bg-emerald-500 animate-pulse"
                  )}></div>
                  <span>{state === 'inactive' ? 'System Offline' : 'System Online'}</span>
              </div>
              <div className="w-px h-3 bg-white/10"></div>
              <span>Latency: {state === 'inactive' ? '--' : '184ms'}</span>
          </div>
          <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white/10"></div>
              ))}
          </div>
      </div>
    </div>
  )
}

function MicVisual({ active }: { active: boolean }) {
    // Stable hardcoded heights for visual consistency
    const heights = [16, 22, 14, 18, 15]
    
    return (
        <div className="flex gap-0.5 items-center h-6">
            {heights.map((h, i) => (
                <motion.div 
                    key={i}
                    className={cn("w-1 rounded-full", active ? "bg-blue-400" : "bg-zinc-700")}
                    animate={active ? { height: [4, h, 4] } : { height: 4 }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                />
            ))}
        </div>
    )
}

function WaveformVisual({ active }: { active: boolean }) {
    // Stable hardcoded heights for visual consistency
    const heights = [18, 24, 16, 28, 20, 14, 22]
    
    return (
        <div className="flex gap-0.5 items-center h-6">
            {heights.map((h, i) => (
                <motion.div 
                    key={i}
                    className={cn("w-1 rounded-full", active ? "bg-emerald-400" : "bg-zinc-700")}
                    animate={active ? { height: [4, h, 4] } : { height: 4 }}
                    transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                />
            ))}
        </div>
    )
}

