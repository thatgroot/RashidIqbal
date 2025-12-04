"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { Code2, Layout } from "lucide-react";
import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const code = `import React from 'react';

export default function App() {
  return (
    <div className="hero">
      <h1>Hello World</h1>
    </div>
  );
}`;

export function WebSectionV2() {
    const [view, setView] = useState<'builder' | 'code'>('builder');

    return (
        <section className="bg-white">
            <div className="max-w-container border-l border-zinc-100">
                <GridContainer cols={2}  > 
                    {/* Visual - Flat */}
                    <GridItem className="order-2 md:order-1 flex flex-col grid-item-visual dotted-bg">
                        <div className="flex-1 relative flex items-center justify-center p-12">
                            <div className="w-full h-full bg-white border border-zinc-200 shadow-sm overflow-hidden relative flex flex-col max-w-md max-h-[400px]">
                                {/* Integrated Header with Toggles */}
                                <div className="h-10 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                                    <div className="flex gap-1.5 px-4 border-r border-zinc-200 h-full items-center">
                                        <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
                                        <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full" />
                                    </div>

                                    {/* Integrated Toggles */}
                                    <div className="flex h-full flex-1">
                                        <button
                                            onClick={() => setView('builder')}
                                            className={`px-6 h-full text-xs font-bold transition-all border-r border-zinc-200 flex items-center gap-2 ${view === 'builder' ? 'bg-white text-zinc-900 relative' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
                                                }`}
                                        >
                                            <Layout className="w-3.5 h-3.5" />
                                            Framer
                                            {view === 'builder' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
                                        </button>
                                        <button
                                            onClick={() => setView('code')}
                                            className={`px-6 h-full text-xs font-bold transition-all border-r border-zinc-200 flex items-center gap-2 ${view === 'code' ? 'bg-white text-zinc-900 relative' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
                                                }`}
                                        >
                                            <Code2 className="w-3.5 h-3.5" />
                                            Next.js
                                            {view === 'code' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="flex-1 relative overflow-hidden bg-white">
                                    <AnimatePresence mode="wait">
                                        {view === 'builder' ? (
                                            <motion.div
                                                key="builder"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute inset-0 flex flex-col"
                                            >
                                                {/* Framer UI */}
                                                <div className="flex h-full">
                                                    <div className="w-12 border-r border-zinc-100 bg-zinc-50" />
                                                    <div className="flex-1 bg-white p-8 flex items-center justify-center relative dotted-bg dotted-bg-16">
                                                        <div className="w-48 h-64 border-2 border-blue-500 border-dashed flex items-center justify-center relative bg-blue-50/10">
                                                            <div className="absolute -top-3 -left-1 bg-blue-700 text-white text-[9px] px-1.5 py-0.5 font-bold">Selected</div>
                                                            <div className="text-center">
                                                                <Layout className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-50" />
                                                                <span className="text-xs text-blue-500 font-bold">Drop Component</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-48 border-l border-zinc-100 bg-white p-4 space-y-4 hidden sm:block">
                                                        <div className="h-4 bg-zinc-100 w-1/2" />
                                                        <div className="space-y-2">
                                                            <div className="h-8 bg-zinc-50 border border-zinc-100" />
                                                            <div className="h-8 bg-zinc-50 border border-zinc-100" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="code"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute inset-0 bg-white flex flex-col"
                                            >
                                                {/* Code UI */}
                                                <div className="flex-1 p-6 font-mono text-xs overflow-auto custom-scrollbar">
                                                    <Highlight
                                                        theme={themes.github}
                                                        code={code}
                                                        language="tsx"
                                                    >
                                                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                                            <pre style={{ ...style, background: 'transparent' }} className={className}>
                                                                {tokens.map((line, i) => (
                                                                    <div key={i} {...getLineProps({ line })}>
                                                                        {line.map((token, key) => (
                                                                            <span key={key} {...getTokenProps({ token })} />
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </pre>
                                                        )}
                                                    </Highlight>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </GridItem>

                    {/* Content */}
                    <GridItem className="py-24 order-1 md:order-2" label="02 · Infrastructure">
                        <div className="max-w-lg mt-auto">
                            <h2 className="text-3xl font-semibold text-zinc-900 mb-6">
                                Step by Step, It Becomes Real.
                            </h2>
                            <p className="text-zinc-500 leading-relaxed mb-12">
                                Step by step, the idea turns into something real. Whether you need a stunning marketing site built in days with <strong>Framer</strong>, or a complex web app powered by <strong>Next.js</strong>, I pick the right tool for the job and craft it until it&apos;s perfect.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                        <Layout className="w-4 h-4 text-orange-500" aria-hidden="true" /> No-Code
                                    </h3>
                                    <p className="text-xs text-zinc-500">Framer for speed. Instant publishing, perfect for marketing teams.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                        <Code2 className="w-4 h-4 text-zinc-900" aria-hidden="true" /> Full-Code
                                    </h3>
                                    <p className="text-xs text-zinc-500">Next.js for power. Server components, auth, and complex logic.</p>
                                </div>
                            </div>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        </section>
    );
}
