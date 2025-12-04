"use client"

import   { useState, useEffect, useRef, useCallback } from "react"
import { Mic, RotateCw, Volume2, VolumeX, Zap, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Highlight, themes } from "prism-react-renderer"
import { useInView } from "framer-motion"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  type: "user" | "agent"
  text: string
  waveform: number[]
}

type ScenarioType = "v2v" | "v2a"

const scenarios = {
  v2v: {
    conversation: [
      { type: "user" as const, text: "Reschedule my meeting with Alex to next Tuesday." },
      { type: "agent" as const, text: "Checking calendar... I have slots at 10 AM and 2 PM. Which one works?" },
      { type: "user" as const, text: "10 AM please." },
      { type: "agent" as const, text: "Done. Meeting moved to Tuesday at 10 AM. I've updated your calendar and sent an invite." },
    ],
    code: `// agent_workflow.ts
import { Agent } from '@vanos/core';

const agent = new Agent({
  model: 'v2v-turbo',
  tools: ['calendar', 'email']
});

async function handleRequest(input: string) {
  // 1. Intent Analysis
  const intent = await agent.parse(input);
  
  // 2. Execute Tool Chain
  if (intent.type === 'reschedule') {
    const slots = await agent.tools.calendar.find({
      timeRange: 'next_week'
    });
    
    // ... await user confirmation ...
    
    await agent.tools.calendar.update({
      id: intent.eventId,
      newTime: userSelection
    });
  }
}`
  },
  v2a: {
    conversation: [
      { type: "user" as const, text: "Deploy a new edge function for image resizing." },
      { type: "agent" as const, text: "I'll set that up. Which regions should I deploy to?" },
      { type: "user" as const, text: "US East and Europe West." },
      { type: "agent" as const, text: "Deploying image-resize-v1 to iad1 and lhr1. Verifying routes... Done. Endpoints are active." },
    ],
    code: `// infrastructure_agent.ts
import { Agent, Infrastructure } from '@vanos/core';

const deployer = new Agent({
  capabilities: ['infrastructure', 'git_ops']
});

async function deployFunction(spec: DeploymentSpec) {
  // 1. Analyze Request & Context
  const context = await deployer.context();

  // 2. Execute Infrastructure Action
  const deployment = await deployer.tools.edge.deploy({
    name: 'image-resize-v1',
    regions: ['iad1', 'lhr1'], // derived from voice
    runtime: 'deno-v2',
    env: context.env
  });

  // 3. Verification Loop
  await deployer.tools.health.check(deployment.urls);
  
  return { status: 'active', endpoints: deployment.urls };
}`
  }
}

interface ChatIDEDemoProps {
    state?: 'inactive' | 'running' | 'final'
}

export function ChatIDEDemo({ state = 'running' }: ChatIDEDemoProps) {
  const [activeMode, setActiveMode] = useState<ScenarioType>("v2v")
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [displayedText, setDisplayedText] = useState("")
  const [visibleCodeLines, setVisibleCodeLines] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(componentRef, { once: true, margin: "-100px" })
  
  const currentScenario = scenarios[activeMode]
  const codeLines = currentScenario.code.split("\n")

  const startDemo = useCallback(() => {
    setIsActive(true)
    setIsFinished(false)
    setCurrentIndex(0)
    setMessages([])
    setDisplayedText("")
    setVisibleCodeLines(0)
  }, [])

  const resetDemo = useCallback(() => {
    setIsActive(false)
    setIsFinished(true)
  }, [])

  // Handle State Props
  useEffect(() => {
    if (state === 'inactive') {
        setIsActive(false)
        setIsFinished(false)
        setMessages([])
        setCurrentIndex(-1)
        setDisplayedText("")
        setVisibleCodeLines(0)
    } else if (state === 'running') {
        if (!isActive && !isFinished) startDemo()
    } else if (state === 'final') {
        setIsActive(false)
        setIsFinished(true)
        // Pre-fill messages for final state
        const allMessages = currentScenario.conversation.map((msg, i) => ({
            id: i,
            type: msg.type,
            text: msg.text,
            waveform: Array.from({ length: 12 }, () => Math.max(4, Math.random() * 16))
        }))
        setMessages(allMessages)
        setDisplayedText("")
        setCurrentIndex(currentScenario.conversation.length)
        setVisibleCodeLines(codeLines.length)
    }
  }, [state, startDemo, currentScenario, codeLines.length, isActive, isFinished])

  // Auto-start for normal view
  useEffect(() => {
    if (state === 'running' && isInView && !isActive && !isFinished && currentIndex === -1) {
        startDemo()
    }
  }, [isInView, isActive, isFinished, startDemo, currentIndex, state])

  // Handle Mode Switching
  const switchMode = (mode: ScenarioType) => {
    if (mode === activeMode) return;
    setActiveMode(mode);
    // Stop current simulation
    setIsActive(false);
    setIsFinished(false);
    setCurrentIndex(-1);
    setMessages([]);
    setDisplayedText("");
    setVisibleCodeLines(0);
    
    if (state === 'running') {
        setTimeout(() => {
            setCurrentIndex(0);
            setIsActive(true);
        }, 100);
    }
  }

  // Conversation Flow
  useEffect(() => {
    if (!isActive || currentIndex < 0 || currentIndex >= currentScenario.conversation.length) return

    const currentMsg = currentScenario.conversation[currentIndex]
    
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentMsg.text.length) {
        setDisplayedText(currentMsg.text.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        // Generate fixed waveform for history message
        const staticWaveform = Array.from({ length: 12 }, () => Math.max(4, Math.random() * 16))
        
        setMessages(prev => [...prev, { 
            id: Date.now(), 
            type: currentMsg.type, 
            text: currentMsg.text,
            waveform: staticWaveform
        }])
        setDisplayedText("")
        
        setTimeout(() => {
            if (currentIndex < currentScenario.conversation.length - 1) {
                setCurrentIndex(prev => prev + 1)
            } else {
                resetDemo()
            }
        }, 2000)
      }
    }, 40)

    return () => clearInterval(typeInterval)
  }, [isActive, currentIndex, resetDemo, currentScenario])

  // Code Reveal
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
        setVisibleCodeLines(prev => Math.min(prev + 1, codeLines.length))
    }, 200)
    return () => clearInterval(interval)
  }, [isActive, codeLines.length])

  // Auto scroll
  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, displayedText])

  const isUserTurn = isActive && currentIndex % 2 === 0
  const phase = !isActive ? 'idle' : (isUserTurn ? 'listening' : 'speaking')

  return (
    <div ref={componentRef} className="w-full max-w-5xl mx-auto h-[550px] bg-[#09090b] rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative font-sans selection:bg-white/20">
        {/* Header */}
        <div className="h-12 border-b border-white/10 bg-[#09090b] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
                </div>
                
                {/* Tabs */}
                <div className="flex items-center bg-black/50 p-0.5 rounded-lg border border-white/5">
                    <button
                        onClick={() => switchMode("v2v")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-[6px] text-[10px] font-medium transition-all",
                            activeMode === "v2v" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <Mic className="w-3 h-3" /> Voice-to-Voice
                    </button>
                    <button
                        onClick={() => switchMode("v2a")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-[6px] text-[10px] font-medium transition-all",
                            activeMode === "v2a" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <Zap className="w-3 h-3" /> Voice-to-Action
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {isFinished && (
                    <Button onClick={startDemo} variant="ghost" size="sm" className="h-8 text-xs gap-2 text-zinc-400 hover:text-white hover:bg-white/10">
                        <RotateCw className="w-3 h-3" /> Replay
                    </Button>
                )}
            {isActive && (
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100/10 rounded-full border border-white/20">
                    <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-zinc-300 font-medium uppercase tracking-wide">Running</span>
                </div>
            )}
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
            {/* Chat Area */}
            <div className="col-span-1 lg:col-span-7 h-full flex flex-col border-r border-white/10 bg-[#09090b] relative overflow-hidden">
                {/* Chat Messages */}
                <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={containerRef}>
                     <AnimatePresence mode="wait">
                         {messages.length === 0 && !isActive && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center opacity-20"
                             >
                                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <Mic className="w-8 h-8 text-zinc-400" />
                                 </div>
                                 <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                                     {state === 'final' ? "Conversation Complete" : "Waiting for voice input..."}
                                 </p>
                             </motion.div>
                         )}
                     </AnimatePresence>
                     
                     {messages.map((msg) => (
                         <motion.div 
                            key={msg.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                         >
                             <div className={cn(
                                 "flex items-center gap-3 p-3 rounded-2xl min-w-[200px] shadow-sm border transition-all duration-300",
                                 msg.type === 'user' 
                                    ? 'bg-[#27272a] border-transparent rounded-tr-sm' 
                                    : 'bg-transparent border-white/10 rounded-tl-sm hover:bg-white/5'
                             )}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    msg.type === 'user' ? "bg-zinc-600" : "bg-zinc-800 text-zinc-300"
                                )}>
                                    {msg.type === 'user' ? <div className="w-3 h-3 bg-zinc-400 rounded-full" /> : <Play className="w-3 h-3 fill-current" />}
                                </div>
                                
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-0.5 h-4">
                                        {msg.waveform.map((h, i) => (
                                            <div 
                                                key={i} 
                                                className={cn(
                                                    "w-1 rounded-full",
                                                    msg.type === 'user' ? "bg-zinc-500" : "bg-zinc-300"
                                                )}
                                                style={{ height: h + 'px' }}
                                            />
                                        ))}
                                    </div>
                                     <p className="text-[10px] text-zinc-400 font-mono leading-tight">{msg.text}</p>
                                 </div>
                             </div>
                         </motion.div>
                     ))}
                     {isActive && displayedText && (
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${currentScenario.conversation[currentIndex].type === 'user' ? 'justify-end' : 'justify-start'}`}
                         >
                            <div className={cn(
                                 "flex items-center gap-3 p-3 rounded-2xl min-w-[200px] shadow-sm border",
                                 currentScenario.conversation[currentIndex].type === 'user' 
                                    ? 'bg-[#27272a] border-transparent rounded-tr-sm' 
                                    : 'bg-transparent border-white/10 rounded-tl-sm'
                             )}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    currentScenario.conversation[currentIndex].type === 'user' ? "bg-zinc-600" : "bg-zinc-800 text-zinc-300"
                                )}>
                                    {currentScenario.conversation[currentIndex].type === 'user' ? <div className="w-3 h-3 bg-zinc-400 rounded-full" /> : <div className="w-2 h-2 bg-zinc-300 rounded-full animate-pulse" />}
                                </div>
                                
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-0.5 h-4">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div 
                                                key={i} 
                                                className={cn(
                                                    "w-1 rounded-full",
                                                    currentScenario.conversation[currentIndex].type === 'user' ? "bg-zinc-500" : "bg-zinc-300"
                                                )}
                                                animate={{ height: ["20%", "100%", "20%"] }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.05,
                                                    repeatType: "mirror" 
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-zinc-400 font-mono leading-tight">
                                       {displayedText}
                                       <span className="inline-block w-1.5 h-2.5 ml-1 bg-zinc-500 align-middle animate-pulse"></span>
                                    </p>
                                </div>
                            </div>
                         </motion.div>
                     )}
                </div>
            </div>

            {/* Code/Visual Area */}
            <div className="hidden lg:flex lg:col-span-5 flex-col bg-[#0c0c0e] max-h-[550px] border-l border-white/5">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full transition-colors duration-500", showCode ? "bg-zinc-500/50" : (phase === 'listening' ? "bg-zinc-500" : phase === 'speaking' ? "bg-zinc-300" : "bg-zinc-600"))}></div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {showCode ? "Backend Execution" : "Agent State"}
                        </span>
                    </div>
                    
                    {/* Toggle Switch */}
                    <div className="flex bg-white/5 p-0.5 rounded-md">
                        <button 
                            onClick={() => setShowCode(false)}
                            className={cn(
                                "px-2 py-0.5 rounded-[4px] text-[9px] font-medium transition-all",
                                !showCode ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Visual
                        </button>
                        <button 
                            onClick={() => setShowCode(true)}
                            className={cn(
                                "px-2 py-0.5 rounded-[4px] text-[9px] font-medium transition-all",
                                showCode ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            Code
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {showCode ? (
                            <motion.div 
                                key="code"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 overflow-hidden font-mono text-[11px] leading-loose"
                            >
                                <Highlight
                                    theme={themes.vsDark}
                                    code={currentScenario.code}
                                    language="typescript"
                                >
                                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                        <pre style={{ ...style, background: 'transparent', margin: 0 }} className={`${className} p-4 h-full overflow-auto`}>
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line })} className={`transition-opacity duration-300 ${i < visibleCodeLines ? 'opacity-100' : 'opacity-10'}`}>
                                                    <span className="text-zinc-700 mr-4 select-none w-4 inline-block text-right">{i + 1}</span>
                                                    {line.map((token, key) => (
                                                        <span key={key} {...getTokenProps({ token })} />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    {/* Core Container - Rings reference this center */}
                                    <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                                         {/* Rings */}
                                         {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
                                                style={{ x: "-50%", y: "-50%" }}
                                                animate={state === 'running' ? {
                                                    width: phase === 'speaking' || phase === 'listening' ? [100 + i*40, 140 + i*60, 100 + i*40] : 100 + i*40,
                                                    height: phase === 'speaking' || phase === 'listening' ? [100 + i*40, 140 + i*60, 100 + i*40] : 100 + i*40,
                                                    opacity: phase === 'speaking' ? 0.4 : (phase === 'listening' ? 0.3 : 0.1),
                                                borderColor: phase === 'speaking' ? 'rgba(255, 255, 255, 0.2)' : 
                                                             phase === 'listening' ? 'rgba(161, 161, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                                            } : {
                                                    width: 100 + i*40,
                                                    height: 100 + i*40,
                                                    opacity: 0.1,
                                                    borderColor: 'rgba(255, 255, 255, 0.05)'
                                                }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                                            />
                                        ))}

                                        {/* Core */}
                                        <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center relative z-20 shadow-2xl">
                                            <div className="flex items-center justify-center gap-1 h-8">
                                                 {[...Array(5)].map((_, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        className={cn(
                                                            "w-1.5 rounded-full",
                                            state === 'running' && phase === 'speaking' ? "bg-zinc-300 shadow-[0_0_10px_rgba(255,255,255,0.4)]" :
                                            state === 'running' && phase === 'listening' ? "bg-zinc-500 shadow-[0_0_10px_rgba(161,161,170,0.4)]" :
                                            "bg-zinc-700"
                                        )}
                                        animate={state === 'running' ? { 
                                            height: (phase === 'speaking' || phase === 'listening') ? [12, 32, 12] : 6
                                        } : { height: 6 }}
                                                        transition={{ 
                                                            duration: 0.5, 
                                                            repeat: Infinity, 
                                                            delay: i * 0.1,
                                                            repeatType: "mirror"
                                                        }}
                                                    />
                                                 ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Status Label */}
                                    <motion.span 
                                       key={phase}
                                       initial={{ opacity: 0, y: 5 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       className={cn(
                                           "text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-sm relative z-20",
                                           state === 'running' && phase === 'speaking' ? "text-zinc-300 border-white/20 bg-white/10" :
                                           state === 'running' && phase === 'listening' ? "text-zinc-500 border-zinc-500/20 bg-zinc-500/10" :
                                           "text-zinc-600 border-white/5 bg-black/40"
                                       )}
                                   >
                                        {state === 'inactive' ? 'Idle' : 
                                         state === 'final' ? 'Complete' :
                                         phase === 'idle' ? 'Ready' : 
                                         (phase === 'speaking' && activeMode === 'v2a' ? 'Executing' : phase)}
                                    </motion.span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    </div>
  )
}

