"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, Lock, CheckCircle } from "lucide-react";
import { GridContainer, GridItem } from "../grid-system";
import { ScoreGauge } from "./score-gauge";
import { SOCIAL_LINKS } from "@/lib/constants";

interface AuditScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

interface Diagnostic {
  title: string;
  score: number | null;
  description: string;
}

interface AuditResult {
  url: string;
  scores: AuditScores;
  diagnostics: Record<string, Diagnostic[]>;
  fetchedAt: string;
}

type PageState = "idle" | "loading" | "results" | "unlocked";

export function AuditPageClient() {
  const [state, setState] = useState<PageState>("idle");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [, setLeadSent] = useState(false);

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setState("idle");
        return;
      }

      setResult(data);
      setState("results");
    } catch {
      setError("Network error. Check your connection and try again.");
      setState("idle");
    }
  }

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !result) return;

    try {
      await fetch("/api/audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), url: result.url, scores: result.scores }),
      });
    } catch {
      // Non-blocking - still show results even if lead capture fails
    }

    setLeadSent(true);
    setState("unlocked");
  }

  return (
    <div className="max-w-container border-l border-zinc-100">
      {/* Hero */}
      <GridContainer>
        <GridItem className="py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded text-xs font-mono uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Free Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              How Does Your Website Score?
            </h1>
            <p className="text-lg text-zinc-500 mb-10">
              Enter your URL and get an instant performance, SEO, and accessibility audit.
              See what&apos;s working and what&apos;s costing you conversions.
            </p>

            {/* URL Input Form */}
            <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL"
                className="flex-1 px-5 py-4 border border-zinc-200 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                disabled={state === "loading"}
                required
              />
              <button
                type="submit"
                disabled={state === "loading" || !url.trim()}
                className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Run Audit <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-4 text-sm text-red-600 justify-center"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </motion.div>
        </GridItem>
      </GridContainer>

      {/* Loading State */}
      <AnimatePresence>
        {state === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GridContainer>
              <GridItem className="py-16 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-zinc-500">Analyzing your website. This takes 10-20 seconds...</p>
              </GridItem>
            </GridContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {(state === "results" || state === "unlocked") && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Scores */}
            <GridContainer cols={4}>
              <GridItem className="flex items-center justify-center py-8">
                <ScoreGauge score={result.scores.performance} label="Performance" />
              </GridItem>
              <GridItem className="flex items-center justify-center py-8">
                <ScoreGauge score={result.scores.seo} label="SEO" />
              </GridItem>
              <GridItem className="flex items-center justify-center py-8">
                <ScoreGauge score={result.scores.accessibility} label="Accessibility" />
              </GridItem>
              <GridItem className="flex items-center justify-center py-8">
                <ScoreGauge score={result.scores.bestPractices} label="Best Practices" />
              </GridItem>
            </GridContainer>

            {/* Diagnostics (gated behind email) */}
            <div className="relative">
              {state === "results" && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full mx-4 p-8 bg-white border border-zinc-200 shadow-xl text-center"
                  >
                    <Lock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 mb-2">
                      Unlock Your Full Report
                    </h3>
                    <p className="text-sm text-zinc-500 mb-6">
                      Enter your email to see all diagnostics, issues, and specific fix recommendations.
                    </p>
                    <form onSubmit={handleUnlock} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors"
                      >
                        Send Me the Full Report
                      </button>
                    </form>
                    <p className="text-xs text-zinc-400 mt-3">No spam. Just your audit results.</p>
                  </motion.div>
                </div>
              )}

              <GridContainer cols={2}>
                {Object.entries(result.diagnostics).map(([category, issues]) => (
                  <GridItem key={category}>
                    <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-4">
                      {category === "bestPractices" ? "Best Practices" : category} Issues
                    </h3>
                    {issues.length === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        No major issues found
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                              issue.score === 0 ? "bg-red-500" : "bg-orange-400"
                            }`} />
                            <div>
                              <span className="font-medium text-zinc-900">{issue.title}</span>
                              {issue.description && (
                                <p className="text-zinc-500 text-xs mt-0.5 line-clamp-2">{issue.description}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </GridItem>
                ))}
              </GridContainer>
            </div>

            {/* CTA after results */}
            <GridContainer>
              <GridItem className="py-16 text-center">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  Want these issues fixed?
                </h3>
                <p className="text-zinc-500 mb-6">
                  I can redesign and rebuild your site in Framer with all of these problems solved. Most projects ship in 2-3 weeks.
                </p>
                <a
                  href={SOCIAL_LINKS.calcom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors"
                >
                  Book a Free Call <ArrowRight className="w-4 h-4" />
                </a>
              </GridItem>
            </GridContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
