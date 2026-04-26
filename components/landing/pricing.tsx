"use client";

import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ONE_TIME_PLANS, RETAINER_PLANS } from "@/lib/pricing-data";

// ============================================================================
// Inline email form — replaces the old Email/WhatsApp/Upwork/Cal.com icon row.
// A single form scoped to the whole Pricing section, passed the current
// plan+mode when submitted so the email lands with context baked in.
// ============================================================================

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type PricingFormProps = {
  planName: string;
  planPrice: string;
  mode: "one-time" | "retainer";
  onClose: () => void;
};

function PricingInquiryForm({ planName, planPrice, mode, onClose }: PricingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
          source: "pricing",
          email: email.trim(),
          name: name.trim() || undefined,
          plan: planName,
          mode,
          description: note.trim() || undefined,
          botcheck: "",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (!res.ok || body.success === false) {
        setErrorMsg(body.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("Network error. Try again or email rashidiqbal.freelance@gmail.com directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-zinc-100 pt-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-zinc-900">Got it.</p>
            <p className="text-zinc-500 mt-0.5">
              I&rsquo;ll reply within 24 hours with a tailored proposal for{" "}
              <span className="font-medium text-zinc-900">{planName}</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-zinc-100 pt-4 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          Send me the details
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel"
          className="text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        autoComplete="name"
        className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        autoComplete="email"
        className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything I should know? (optional)"
        rows={2}
        className="w-full px-3 py-2.5 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send inquiry
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-600 text-center">{errorMsg}</p>
      )}
      <p className="text-[11px] text-zinc-400 text-center">
        Lands at rashidiqbal.freelance@gmail.com. You&apos;ll get a copy too. Reply within 24h.
      </p>
      <p className="text-[10px] font-mono text-zinc-400 text-center uppercase tracking-wider">
        {planName} · {mode === "retainer" ? "Monthly retainer" : "One-time"} · {planPrice}
      </p>
    </form>
  );
}

// ============================================================================
// Pricing section
// ============================================================================

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [mode, setMode] = useState<"one-time" | "retainer">("one-time");
  const plans = mode === "one-time" ? ONE_TIME_PLANS : RETAINER_PLANS;

  function toggleMode(next: "one-time" | "retainer") {
    setMode(next);
    setOpenPlan(null); // close any open form so pricing stays consistent with the active plan
  }

  return (
    <section className="bg-white scroll-mt-16" id="pricing">
      <div className="max-w-container border-l border-zinc-100">
        {/* Header with Inline Selector */}
        <GridContainer>
          <GridItem className="py-20">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-6 tracking-tight leading-[1.1]">
                What it costs to get a website that actually works.
              </h2>
              <p className="text-lg text-zinc-500 mb-8">
                This pricing gives you an idea. Your final cost depends on your specific requirements.
              </p>

              {/* Pricing Mode Toggle */}
              <div className="inline-flex items-center p-1 bg-zinc-100 rounded-sm">
                <button
                  onClick={() => toggleMode("one-time")}
                  className={`px-5 py-2.5 text-sm font-bold transition-all rounded-sm ${
                    mode === "one-time"
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => toggleMode("retainer")}
                  className={`px-5 py-2.5 text-sm font-bold transition-all rounded-sm relative ${
                    mode === "retainer"
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  Monthly Retainer
                </button>
              </div>

              <p className="text-xs text-zinc-400 mt-4">
                No contracts. Cancel retainers anytime. Money-back on the first design round.
              </p>
              <p className="text-xs text-orange-600 font-medium mt-2">
                Currently accepting 2 new projects this month.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={3}>
          {plans.map((plan, i) => (
            <motion.div
              key={`${mode}-${i}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: i * 0.12 } },
              }}
            >
              <GridItem
                className={
                  plan.popular
                    ? "bg-linear-to-b from-orange-50/80 to-white ring-2 ring-orange-500/30 ring-inset shadow-xl shadow-orange-500/10 scale-[1.02] relative z-10"
                    : ""
                }
              >
                {(plan.popular || plan.highlight) && (
                  <motion.div
                    className={`absolute top-6 right-6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      plan.popular ? "bg-orange-700 text-white" : "bg-zinc-900 text-white"
                    }`}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                    }}
                  >
                    {plan.highlight || "Most Popular"}
                  </motion.div>
                )}

                <div className="mb-6 mt-2">
                  <motion.h3
                    className="text-3xl font-bold text-zinc-900 mb-1"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    {plan.name}
                  </motion.h3>
                  <motion.div
                    className="text-xs font-mono text-orange-600 uppercase tracking-wider mb-3"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    {plan.tagline}
                  </motion.div>

                  <motion.div
                    className="mb-4"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    <span className="text-3xl font-bold text-zinc-900">{plan.price}</span>
                    {plan.priceSuffix && (
                      <span className="text-lg text-zinc-500 font-medium">{plan.priceSuffix}</span>
                    )}
                  </motion.div>

                  <motion.p
                    className="text-sm text-zinc-600 leading-relaxed mb-4"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    {plan.desc}
                  </motion.p>

                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-xs text-zinc-600"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {plan.idealFor}
                  </motion.div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6 min-h-[200px]">
                  <motion.div
                    className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.3 } },
                    }}
                  >
                    What&apos;s Included
                  </motion.div>
                  {plan.baseFeatures.map((f, j) => (
                    <motion.div
                      key={j}
                      className="flex items-start gap-3 text-sm text-zinc-700"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3, delay: j * 0.05 },
                        },
                      }}
                    >
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{f}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Delivery */}
                <motion.div
                  className="flex items-center justify-between py-3 border-t border-zinc-100 mb-6"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="text-xs text-zinc-500">Delivery</span>
                  <span className="text-sm font-semibold text-zinc-900">{plan.deliveryTime}</span>
                </motion.div>

                {/* CTA → expands into an inline email form */}
                <div>
                  <AnimatePresence mode="wait" initial={false}>
                    {openPlan === i ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <PricingInquiryForm
                          planName={plan.name}
                          planPrice={`${plan.price}${plan.priceSuffix ?? ""}`}
                          mode={mode}
                          onClose={() => setOpenPlan(null)}
                        />
                      </motion.div>
                    ) : (
                      <motion.button
                        key="button"
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setOpenPlan(i)}
                        className={`w-full py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 ${
                          plan.popular
                            ? "bg-orange-700 text-white hover:bg-orange-800 shadow-lg shadow-orange-700/25"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
                      >
                        {plan.popular ? "Start Building" : "Get Started"}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </GridItem>
            </motion.div>
          ))}
        </GridContainer>
      </div>
    </section>
  );
}
