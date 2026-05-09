"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertOctagon, BarChart3 } from "lucide-react";

// Dashboard-scoped error boundary. App Router renders this whenever any
// /dashboard/* route (login + every authed page) throws during render.
// Visual language mirrors app/not-found.tsx so the dashboard UX stays
// consistent with the public 404.

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the server logs; Vercel + PostHog will pick it up.
    // Don't ship full stack to client beyond what Next already does.
    console.error("[dashboard] render error", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#292827] font-sans flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 100%)",
        }}
      />

      {/* Animated dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-zinc-300 rounded-full animate-ping"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-zinc-300 rounded-full animate-ping"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Visual */}
        <div className="flex justify-center mb-10 relative" aria-hidden="true">
          <div className="relative w-56 h-32">
            <div className="absolute left-0 top-0 -rotate-12 bg-white border border-[#e8e4dd] p-3 shadow-sm rounded-lg z-10">
              <BarChart3 className="w-6 h-6 text-[#9a9794]" />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg border border-[#e8e4dd] z-20">
              <AlertOctagon className="w-12 h-12 text-[#1b1938]" />
            </div>
            <div className="absolute right-0 bottom-0 rotate-12 bg-[#1b1938] p-3 rounded-lg shadow-lg z-10">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <p className="text-[10px] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-3">
          Dashboard error
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#292827] tracking-tighter mb-3">
          Something <span className="text-[#1b1938]">broke</span>.
        </h1>

        <div className="h-px w-24 bg-linear-to-r from-transparent via-zinc-300 to-transparent mx-auto mb-6" />

        <p className="text-[#73706d] text-base mb-2 leading-relaxed">
          A query or render path threw on this page. The error is logged. You can
          try again, head to the overview, or sign out and sign back in.
        </p>

        {error.digest && (
          <p className="text-[11px] font-mono text-[#9a9794] mb-8">
            ref · {error.digest}
          </p>
        )}
        {!error.digest && <div className="mb-8" />}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1b1938] text-white text-sm font-bold hover:bg-[#1b1938] transition-colors"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#e8e4dd] text-[#292827] text-sm font-bold hover:border-[#c9b4fa] hover:text-[#1b1938] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to overview
          </Link>
        </div>

        {process.env.NODE_ENV !== "production" && (
          <details className="mt-10 text-left bg-white border border-[#e8e4dd] p-4 max-w-full">
            <summary className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.18em] cursor-pointer">
              Dev only · stack
            </summary>
            <pre className="mt-3 text-[11px] font-mono text-[#292827] overflow-auto whitespace-pre-wrap break-all">
              {error.message}
              {"\n\n"}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
