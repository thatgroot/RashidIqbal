"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import posthog from "posthog-js";

// Small client list shown as logo strip — echoes components/landing/trusted-by.tsx
const CLIENT_BRANDS = [
  "UpdateAI",
  "Vanos AI",
  "Space Dome",
  "Leanscale",
] as const;

// What the visitor gets when they claim the offer
const OFFER_DELIVERABLES = [
  "15-minute recorded video audit of your live page",
  "The 3 highest-impact fixes, ranked by effort vs. lift",
  "Optional 30-minute follow-up call to walk through it",
  "Delivered within 48 hours, no credit card",
] as const;

export default function OfferPage() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [concern, setConcern] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    try {
      posthog.capture("lp_view", { source: "offer-lp" });
    } catch {
      /* no-op */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "offer-lp",
          email: email.trim(),
          website: url.trim(),
          concern: concern.trim(),
          botcheck: "", // honeypot
        }),
      });

      const body = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (!res.ok || body.success === false) {
        console.error("[offer-lp] API error:", res.status, body);
        setStatus("error");
        return;
      }

      try {
        posthog.capture("lead_submitted", { source: "offer-lp", cta: "free_audit" });
      } catch {
        /* no-op */
      }
      setStatus("sent");
    } catch (err) {
      console.error("[offer-lp] Submit failed:", err);
      setStatus("error");
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans relative overflow-hidden"
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-zinc-50/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-3xl" />
      </div>

      {/* Logo only, no nav */}
      <header className="max-w-2xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Image src="/favicon.svg" alt="" width={28} height={28} aria-hidden="true" />
        <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        {/* Scarcity pill — real: audits take focused time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[11px] md:text-xs font-semibold text-orange-700 mb-6"
        >
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          2 free audits left this week
        </motion.div>

        {/* Frustration eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg font-bold tracking-tight mb-4"
        >
          <span className="text-zinc-900">Traffic without</span>{" "}
          <span className="text-orange-600">conversion?</span>
        </motion.p>

        {/* Headline — the offer, 7 words */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1] pb-1"
        >
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">
            Let me audit your page.
          </span>{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-orange-600 pb-1">
            Free.
          </span>
        </motion.h1>

        {/* Subhead — what you get, specific benefit */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-xl"
        >
          I will record a <span className="font-semibold text-zinc-900">15-minute video</span>{" "}
          showing exactly where your page is losing visitors and the{" "}
          <span className="font-semibold text-zinc-900">3 highest-impact fixes</span> to ship first.
          Delivered within 48 hours. <span className="text-zinc-500">Normally $497. Free for two founders this week.</span>
        </motion.p>

        {/* Offer content + form block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border border-zinc-200 bg-white shadow-sm p-6 md:p-8 mb-10"
        >
          {status === "sent" ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <Check className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">
                You&rsquo;re on the list.
              </h2>
              <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                I&rsquo;ll email your audit video to{" "}
                <span className="font-semibold text-zinc-900">{email}</span> within 48 hours.
                Check spam if you don&rsquo;t see it.
              </p>
            </div>
          ) : (
            <>
              {/* Deliverables checklist */}
              <div className="mb-6">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-3">
                  What you get
                </p>
                <ul className="space-y-2.5">
                  {OFFER_DELIVERABLES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form — 3 fields */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  required
                  autoComplete="url"
                  className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <input
                  type="text"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder="Biggest conversion concern (optional)"
                  className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Claim my free audit"}
                  {status !== "sending" && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </button>

                {status === "error" && (
                  <p className="text-xs text-red-600 text-center">
                    Something went wrong. Please email{" "}
                    <a href="mailto:rashid@founderfist.com" className="underline">
                      rashid@founderfist.com
                    </a>{" "}
                    directly.
                  </p>
                )}

                <p className="text-[11px] text-zinc-400 text-center pt-1">
                  No credit card. No pitch. Your email stays private.
                </p>
              </form>
            </>
          )}
        </motion.div>

        {/* Distributed trust — directly below the form, at decision time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-zinc-500 mb-12"
        >
          <span className="font-medium text-zinc-700">53 audits delivered</span>
          <span className="text-zinc-300">•</span>
          <span>Avg. 2.4x conversion lift</span>
          <span className="text-zinc-300">•</span>
          <span>Rated 4.9 on Upwork</span>
        </motion.div>

        {/* Testimonial */}
        <motion.figure
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="border border-zinc-100 bg-white px-6 py-8 max-w-xl mx-auto mb-10"
        >
          <div className="flex gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="text-base md:text-lg text-zinc-900 leading-relaxed font-medium mb-4">
            &ldquo;The new design loads fast and converts way better than what we had before.
            Onboarding signups went up by half.&rdquo;
          </blockquote>
          <figcaption className="text-sm">
            <span className="font-bold text-zinc-900">Josh Schachter</span>{" "}
            <span className="text-zinc-500">· Founder &amp; CEO, UpdateAI</span>
          </figcaption>
        </motion.figure>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-zinc-400 mb-16"
          aria-label="Brands I have audited and shipped work for"
        >
          {CLIENT_BRANDS.map((brand, i) => (
            <span key={brand} className={i % 2 === 0 ? "text-zinc-700" : ""}>
              {brand}
            </span>
          ))}
        </motion.div>

        {/* Footer line — no competing links */}
        <p className="text-[11px] text-zinc-400 font-mono tracking-[0.2em] uppercase text-center">
          © {new Date().getFullYear()} Rashid Iqbal · Remote, working worldwide
        </p>
      </section>
    </main>
  );
}
