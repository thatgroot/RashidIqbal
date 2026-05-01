"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Star, Clock, Shield, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import posthog from "posthog-js";

const CAL_URL = "https://cal.com/rashid.iqbal";

// Conversion-psychology copy notes
// ---------------------------------
// Anchoring: agency price ($5,000+) shown crossed out next to our price.
// Decoy / contrast: 1-page vs 4-page — the 4-page tier is positioned as
//   "Most popular" so the $1,500 feels like the obvious upgrade.
// Specificity: "3 days" / "5 days" beats "fast".
// Scarcity: "Only 2 slots left this month" stated up top and again at close.
// Risk reversal: "Don't love it? Full refund. No drama."
// Social proof: 4 client brand names + Josh testimonial near the CTA.

type Tier = {
  id: "landing-page" | "four-page-site";
  name: string;
  price: string;
  priceLabel: string;
  days: string;
  anchor: string;
  blurb: string;
  features: readonly string[];
};

const TIERS: readonly Tier[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    price: "$1,000",
    priceLabel: "$1,000 · 3 days",
    days: "3 days",
    anchor: "$5,000+",
    blurb: "For one focused offer or product.",
    features: [
      "1 high-converting landing page (hero, features, pricing, FAQ, CTA)",
      "Figma design tuned for SaaS buyer scanning patterns",
      "Framer build with custom domain, forms, and analytics",
      "UX copy written by me, not laid out from your draft",
      "2 revision rounds, async or live walkthrough",
      "Lighthouse 90 plus on mobile, SEO meta wired",
    ],
  },
  {
    id: "four-page-site",
    name: "4-Page Website",
    price: "$1,500",
    priceLabel: "$1,500 · 5 days",
    days: "5 days",
    anchor: "$8,000+",
    blurb: "A full marketing site. Best value.",
    features: [
      "Home + 3 inner pages (about, pricing, contact, blog, etc.)",
      "Everything in the Landing Page tier",
      "Framer CMS for blog or case studies, ready to fill",
      "Up to 4 lead-capture forms with email or webhook routing",
      "Cross-page nav, footer, and brand system locked in",
      "Migration from Webflow or WordPress on request",
    ],
  },
] as const;

const CLIENT_BRANDS = ["Relace", "Equals", "Hevn", "UpdateAI"] as const;

const PROCESS = [
  {
    n: "1",
    title: "Today: Book + brief",
    body: "30-min kickoff. Share Figma, brand, references, ICP. I quote a fixed scope same day.",
  },
  {
    n: "2",
    title: "Day 2 to 3 (or 4): Design + build",
    body: "I design and build in Framer. You see a live URL inside 48 hours. One revision round.",
  },
  {
    n: "3",
    title: "Friday: Launch",
    body: "Domain pointed, redirects mapped, analytics wired. You ship before the week ends.",
  },
] as const;

const FAQS = [
  {
    q: "Is the 3-day timeline real?",
    a: "Yes. I block focused time once you book. 90 percent of landing pages ship inside 3 days. The 10 percent that slip do so because of client-side delays (copy approval, asset waiting). I do not bill the extra days.",
  },
  {
    q: "What if I do not love it?",
    a: "Full refund. No drama. You keep the Figma file. I would rather refund you than ship something neither of us is proud of.",
  },
  {
    q: "What do I need to provide?",
    a: "Brand colors, logo, any existing Figma file, a sentence on what your product does, and 2 to 3 references you like. The kickoff call covers the rest.",
  },
  {
    q: "Can the price scale up?",
    a: "Only if scope grows beyond what is listed. The $1,000 / $1,500 prices are fixed for the scope on this page. If you need 8 pages, e-commerce, or a custom Stripe flow, that gets a separate quote.",
  },
  {
    q: "Why is this so much cheaper than an agency?",
    a: "I am one specialist, not a creative director plus a junior designer plus a project manager plus an account exec. I cut the layers, not the quality.",
  },
] as const;

// ============================================================================
// Inline claim form — posts to /api/lead with source "offer-paid" so the
// internal email lands as "New Booking | <Tier> from <Name>" and the client
// gets a confirmation with the kickoff next-steps copy from email-template.ts.
// ============================================================================

type SubmitStatus = "idle" | "sending" | "sent" | "error";

function ClaimForm({ selectedTier }: { selectedTier: Tier }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "offer-paid",
          email: email.trim(),
          name: name.trim() || undefined,
          website: website.trim() || undefined,
          plan: `${selectedTier.name} (${selectedTier.priceLabel})`,
          mode: selectedTier.id,
          description: note.trim() || undefined,
          botcheck: "",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || body.success === false) {
        setErrorMsg(body.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      try {
        posthog.capture("offer_lead_submitted", {
          source: "offer-lp-pricing",
          plan: selectedTier.id,
        });
      } catch {
        /* no-op */
      }
      setStatus("sent");
    } catch {
      setErrorMsg(
        "Network error. Try again or email rashidiqbal.freelance@gmail.com directly."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-emerald-200 bg-emerald-50/40 px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
          <Check className="w-5 h-5 text-emerald-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">
          Booking received.
        </h3>
        <p className="text-sm text-zinc-600 max-w-md mx-auto mb-4">
          I will reply to{" "}
          <span className="font-semibold text-zinc-900">{email}</span> within 24 hours
          with a kickoff link to lock in your slot for{" "}
          <span className="font-semibold text-zinc-900">{selectedTier.name}</span>.
        </p>
        <p className="text-xs text-zinc-500">
          Check spam if you do not see it. Want to skip the wait?{" "}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-zinc-700 hover:text-orange-600"
          >
            Book the kickoff call now
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-zinc-200 bg-white p-6 md:p-8 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
          Claim your slot
        </p>
        <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em]">
          {selectedTier.name} · {selectedTier.priceLabel}
        </p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoComplete="name"
        className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
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
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Current website (optional)"
        autoComplete="url"
        className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What is the offer or product? Any references you like? (optional)"
        rows={3}
        className="w-full px-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Claim my {selectedTier.price} slot
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-600 text-center">{errorMsg}</p>
      )}

      <p className="text-[11px] text-zinc-400 text-center pt-1">
        No payment yet. I confirm scope first, then send a kickoff link. Full refund
        if you do not love the result.
      </p>
    </form>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function OfferPage() {
  const [selectedTierId, setSelectedTierId] = useState<Tier["id"]>("four-page-site");
  const formRef = useRef<HTMLDivElement>(null);

  const selectedTier = TIERS.find((t) => t.id === selectedTierId) ?? TIERS[1]!;

  useEffect(() => {
    try {
      posthog.capture("lp_view", { source: "offer-lp-pricing" });
    } catch {
      /* no-op */
    }
  }, []);

  function pickTier(id: Tier["id"]) {
    setSelectedTierId(id);
    try {
      posthog.capture("offer_cta_clicked", { source: "offer-lp-pricing", plan: id });
    } catch {
      /* no-op */
    }
    // Scroll the form into view smoothly so the click feels intentional
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
      <header className="max-w-3xl mx-auto px-6 pt-6 md:pt-8 flex items-center gap-3">
        <Image src="/favicon.svg" alt="Rashid Iqbal logo" width={28} height={28} />
        <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-16">
        {/* Scarcity pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[11px] md:text-xs font-semibold text-orange-700 mb-6"
        >
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          1 slot left this month · 2 booked
        </motion.div>

        {/* Frustration eyebrow — names the cost (lost leads), not the
            absence of a thing. Specific number lands harder than "stuck". */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg font-bold tracking-tight mb-4"
        >
          <span className="text-zinc-900">Your landing page is bleeding</span>{" "}
          <span className="text-orange-600">30% of qualified leads.</span>
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-zinc-900 mb-5 leading-[1.1] pb-1"
        >
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-zinc-500 to-zinc-900 pb-1">
            Ship a high-converting landing page
          </span>{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-orange-600 pb-1">
            in 3 days.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-zinc-600 leading-relaxed mb-6 max-w-xl"
        >
          Figma design plus Framer build plus UX copy. One specialist, one timeline, one
          fixed price.{" "}
          <span className="font-semibold text-zinc-900">Don&rsquo;t love it? Full refund.</span>{" "}
          <span className="text-zinc-500">Agencies charge $5,000+ for the same scope.</span>
        </motion.p>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500 mb-10"
        >
          <span className="font-medium text-zinc-700">Certified Framer Expert</span>
          <span className="text-zinc-300">•</span>
          <span>Top Rated on Upwork</span>
          <span className="text-zinc-300">•</span>
          <span>Avg. 2.4x conversion lift</span>
          <span className="text-zinc-300">•</span>
          <span>50+ projects shipped</span>
        </motion.div>

        {/* Pricing — two tiers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-10"
        >
          {TIERS.map((tier, i) => {
            const isPopular = i === 1;
            const isActive = tier.id === selectedTierId;
            return (
              <div
                key={tier.id}
                className={`relative bg-white p-6 md:p-7 flex flex-col transition-shadow ${
                  isPopular
                    ? "border-2 border-orange-500 shadow-lg shadow-orange-500/15"
                    : "border border-zinc-200"
                } ${isActive ? "ring-2 ring-orange-500/40" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-6 px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold tracking-wider uppercase">
                    Most popular
                  </div>
                )}
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                    {tier.name}
                  </p>
                  <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.2em]">
                    {tier.days}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 mb-4">{tier.blurb}</p>

                <div className="flex items-end gap-3 mb-5">
                  <span className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-400 line-through pb-1">{tier.anchor}</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <Check
                        className="w-4 h-4 text-orange-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => pickTier(tier.id)}
                  className={`w-full py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isPopular
                      ? "bg-orange-700 text-white hover:bg-orange-800 shadow-lg shadow-orange-700/25 focus-visible:ring-orange-700"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900"
                  }`}
                >
                  Claim my {tier.price} slot
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </motion.div>

        {/* Risk reversal strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12"
        >
          {[
            { Icon: Shield, label: "Don't love it? Full refund." },
            { Icon: Zap, label: "Live in 3 days, not 3 months." },
            { Icon: Clock, label: "Fixed price. No scope creep." },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="border border-zinc-100 bg-zinc-50/40 px-4 py-3 flex items-center gap-3"
            >
              <Icon className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-zinc-700">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Inline claim form, anchored target of the pricing-card buttons */}
        <div ref={formRef} id="claim" className="mb-12 scroll-mt-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mr-2">
              Selected
            </p>
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTierId(t.id)}
                aria-pressed={t.id === selectedTierId}
                className={`text-xs font-bold px-3 py-1.5 border transition-colors ${
                  t.id === selectedTierId
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
                }`}
              >
                {t.name} · {t.price}
              </button>
            ))}
          </div>
          <ClaimForm selectedTier={selectedTier} />
        </div>

        {/* Testimonial */}
        <motion.figure
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-zinc-100 bg-white px-6 py-8 mb-10"
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-zinc-400 mb-16"
          aria-label="Brands I have shipped work for"
        >
          {CLIENT_BRANDS.map((brand, i) => (
            <span key={brand} className={i % 2 === 0 ? "text-zinc-700" : ""}>
              {brand}
            </span>
          ))}
        </motion.div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-6 text-center">
            How the 3 days play out
          </h2>
          <ol className="space-y-4">
            {PROCESS.map((s) => (
              <li key={s.n} className="flex gap-4 border-l-2 border-orange-500 pl-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-bold flex items-center justify-center -ml-[30px] -mt-0.5 ring-4 ring-white">
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{s.title}</p>
                  <p className="text-sm text-zinc-600 mt-1 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-6">Before you book</h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-bold text-zinc-900 mb-1.5">{f.q}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="border-t border-zinc-200 pt-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[11px] md:text-xs font-semibold text-orange-700 mb-5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            Slots refresh next month. This month is full after 2 more bookings.
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
            By Friday, your competitor&rsquo;s landing page is shipping.
          </h2>
          <p className="text-base text-zinc-600 mb-6 max-w-xl">
            Where is yours? Send me your project details. If we are not a fit, you walk
            away. If we are, you ship before the weekend.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
            >
              Claim my slot
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-zinc-300 text-zinc-900 text-sm font-bold hover:bg-zinc-50 transition-colors"
            >
              Or book a call instead
            </a>
          </div>
        </motion.div>

        {/* Footer line */}
        <p className="text-[11px] text-zinc-400 font-mono tracking-[0.2em] uppercase text-center mt-16">
          © {new Date().getFullYear()} Rashid Iqbal · Remote, working worldwide
        </p>
      </section>
    </main>
  );
}
