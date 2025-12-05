"use client";

import { X, Check, AlertCircle, Zap } from "lucide-react";

export function ProblemSolutionV2() {
  return (
    <section className="py-24 px-4 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">The Latency Bottleneck</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Most digital products fail not because of design, but because of poor engineering architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="p-8 bg-white rounded-lg border border-red-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-md">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-zinc-900">Standard Implementation</h3>
             </div>
             <ul className="space-y-4">
                {[
                    "Bloated bundles (>5MB)",
                    "Poor SEO configuration",
                    "Unoptimized images & assets",
                    "No type safety (runtime errors)",
                    "Slow server response times"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
                        <X className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                        {item}
                    </li>
                ))}
             </ul>
          </div>

          {/* The Solution */}
          <div className="p-8 bg-white rounded-lg border border-blue-100 shadow-md relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-md">
                    <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-bold text-zinc-900">Optimized Architecture</h3>
             </div>
             <ul className="space-y-4">
                {[
                    "Zero-bundle size initial load",
                    "Perfect Core Web Vitals",
                    "Edge-cached assets (CDN)",
                    "End-to-end Type Safety",
                    "<50ms Server Response"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                        <Check className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                        {item}
                    </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

