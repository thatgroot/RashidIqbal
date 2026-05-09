"use client";

import { ArrowRight, Check, Loader2, Shield, X } from"lucide-react";
import { useState } from"react";
import { motion, AnimatePresence, LayoutGroup } from"framer-motion";

import { ONE_TIME_PLANS, RETAINER_PLANS } from"@/lib/pricing-data";

// OpenAI-Codex pricing.
//   - Centred chip + bold black headline + sub.
//   - 3 cards on a white surface, all using the same rounded-2xl
//     hairline-border recipe. Featured tier gets the same
//     violet-to-sky gradient corner-glow as the"Ship" mockup so it
//     pops without inverting to dark.
//   - Sliding pill toggle (one-time / retainer) above the cards.
//   - Pricing numerals at weight 700.
//   - Black pill primary CTA on every card; featured card uses the
//     same black pill with violet ambient lift on hover.
//   - Cards stretch to equal height via flex layout (h-full).

type SubmitStatus ="idle" |"sending" |"sent" |"error";

type PricingFormProps = {
  planName: string;
  planPrice: string;
  mode:"one-time" |"retainer";
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
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          source:"pricing",
          email: email.trim(),
          name: name.trim() || undefined,
          plan: planName,
          mode,
          description: note.trim() || undefined,
          botcheck:"",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (!res.ok || body.success === false) {
        setErrorMsg(body.error ||"Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("Network error. Try again or email rashidiqbal.freelance@gmail.com directly.");
      setStatus("error");
    }
  }

  if (status ==="sent") {
    return (
      <div className="border-t border-[#e5e5e5] pt-5 mt-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="text-[14px]">
            <p style={{ fontVariationSettings: '"wght" 600' }}>Got it.</p>
            <p className="text-[#737373] mt-0.5">
              We&rsquo;ll reply within 24 hours with a tailored proposal for{""}
              <span style={{ fontVariationSettings: '"wght" 600' }}>{planName}</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#e5e5e5] pt-5 mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] uppercase tracking-[0.18em] text-[#737373]"
          style={{ fontVariationSettings: '"wght" 500' }}
        >
          Send me the details
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel"
          className="text-[#737373] hover:text-[#0a0a0a] transition-colors"
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
        className="w-full px-4 py-2.5 border border-[#e5e5e5] bg-white text-[14px] text-[#0a0a0a] rounded-full placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0a0a0a]"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        autoComplete="email"
        className="w-full px-4 py-2.5 border border-[#e5e5e5] bg-white text-[14px] text-[#0a0a0a] rounded-full placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0a0a0a]"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything we should know? (optional)"
        rows={2}
        className="w-full px-4 py-2.5 border border-[#e5e5e5] bg-white text-[14px] text-[#0a0a0a] rounded-2xl placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0a0a0a] resize-none"
      />
      <button
        type="submit"
        disabled={status ==="sending"}
        className="btn-pill btn-pill-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status ==="sending" ? (
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

      {status ==="error" && (
        <p className="text-[12px] text-rose-600 text-center">{errorMsg}</p>
      )}
      <p className="text-[11px] text-[#a3a3a3] text-center">
        Lands at rashidiqbal.freelance@gmail.com. Reply within 24h.
      </p>
      <p
        className="text-[10px] text-[#a3a3a3] text-center uppercase tracking-[0.18em]"
        style={{ fontVariationSettings: '"wght" 500' }}
      >
        {planName} · {mode ==="retainer" ?"Monthly retainer" :"One-time"} · {planPrice}
      </p>
    </form>
  );
}

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<number | null>(null);
  const [mode, setMode] = useState<"one-time" |"retainer">("one-time");
  const plans = mode ==="one-time" ? ONE_TIME_PLANS : RETAINER_PLANS;

  function toggleMode(next:"one-time" |"retainer") {
    setMode(next);
    setOpenPlan(null);
  }

  return (
    <section className="relative bg-white scroll-mt-24 overflow-hidden" id="pricing">
      <div
        aria-hidden="true"
        className="absolute inset-0 codex-section-glow pointer-events-none"
      />

      <div className="relative max-w-container mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-32 md:pb-40">
        {/* Centred opener — matches the rest of the Codex pattern. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin:"-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="codex-chip mx-auto inline-flex">
            <span
              aria-hidden="true"
              className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[9px]"
              style={{
                background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
                fontVariationSettings: '"wght" 700',
              }}
            >
              $
            </span>
            Aestho pricing
          </span>
          <h2
            className="mt-7 text-[clamp(40px,5.6vw,72px)] tracking-[-0.028em] leading-[1.04] text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            Fixed scope. Fixed price.
          </h2>
          <p className="mt-5 text-[19px] leading-[1.5] text-[#404040] max-w-2xl mx-auto">
            Final number depends on what you need — we walk through it on the
            kickoff call. Money-back on the first design round.
          </p>

          {/* Sliding pill toggle */}
          <LayoutGroup>
            <div className="mt-9 inline-flex items-center p-1 bg-white border border-[#e5e5e5] rounded-full relative">
              <button
                onClick={() => toggleMode("one-time")}
                className={`relative px-5 py-2.5 text-[14px] rounded-full transition-colors z-10 ${
                  mode ==="one-time" ?"text-white" :"text-[#737373] hover:text-[#0a0a0a]"
                }`}
                style={{ fontVariationSettings: '"wght" 500' }}
              >
                {mode ==="one-time" && (
                  <motion.span
                    layoutId="codex-pricing-pill"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-0"
                    transition={{ type:"spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">One-time</span>
              </button>
              <button
                onClick={() => toggleMode("retainer")}
                className={`relative px-5 py-2.5 text-[14px] rounded-full transition-colors z-10 ${
                  mode ==="retainer" ?"text-white" :"text-[#737373] hover:text-[#0a0a0a]"
                }`}
                style={{ fontVariationSettings: '"wght" 500' }}
              >
                {mode ==="retainer" && (
                  <motion.span
                    layoutId="codex-pricing-pill"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-0"
                    transition={{ type:"spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">Monthly retainer</span>
              </button>
            </div>
          </LayoutGroup>

          <p className="mt-5 text-[13px] text-[#737373] max-w-md mx-auto">
            Cancel anytime. You keep the Figma file, the Framer project, and
            everything we built — no licence revocation.
          </p>
        </motion.div>

        {/* Three cards — equal-height grid. */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          <AnimatePresence mode="wait">
            {plans.map((plan, i) => {
              const isFeatured = !!plan.popular;
              return (
                <motion.article
                  key={`${mode}-${plan.name}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  viewport={{ once: true, margin:"-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className={`relative h-full flex flex-col rounded-2xl border bg-white p-7 md:p-8 ${
                    isFeatured
                      ?"border-[#fde8a3]"
                      :"border-[#e5e5e5]"
                  }`}
                  style={{
                    backgroundImage: isFeatured
                      ?"radial-gradient(80% 100% at 100% 100%, rgba(230,180,49,0.18) 0%, rgba(248,200,77,0.10) 35%, rgba(255,255,255,0) 70%)"
                      :"none",
                  }}
                >
                  {(plan.popular || plan.highlight) && (
                    <span
                      className={`absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] rounded-full ${
                        plan.popular
                          ?"bg-white text-[#9c7307] border border-[#fde8a3]"
                          :"bg-[#0a0a0a] text-white"
                      }`}
                      style={{ fontVariationSettings: '"wght" 600' }}
                    >
                      {plan.popular ?"Most popular" : plan.highlight}
                    </span>
                  )}

                  <h3
                    className="text-[22px] tracking-[-0.012em] text-[#0a0a0a] mb-1.5"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-[12px] uppercase tracking-[0.16em] text-[#737373] mb-6"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price — weight 700, big numerals. */}
                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span
                      className="text-[44px] tracking-[-0.022em] leading-none text-[#0a0a0a]"
                      style={{ fontVariationSettings: '"wght" 700' }}
                    >
                      {plan.price}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-[18px] text-[#737373]">
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>

                  <p className="text-[15px] leading-[1.6] text-[#404040] mb-6">
                    {plan.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-full mb-6 self-start bg-[#fafafa] border border-[#e5e5e5] text-[#404040]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6b431]" />
                    {plan.idealFor}
                  </div>

                  <div className="space-y-3 mb-6">
                    <p
                      className="text-[11px] uppercase tracking-[0.16em] text-[#a3a3a3] mb-3"
                      style={{ fontVariationSettings: '"wght" 600' }}
                    >
                      What&rsquo;s included
                    </p>
                    {plan.baseFeatures.map((f, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#0a0a0a]"
                      >
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5 text-[#0a0a0a]"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer block (delivery + guarantee + CTA) pinned via mt-auto. */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between py-3 border-t border-[#e5e5e5] mb-2">
                      <span className="text-[12px] text-[#737373]">Delivery</span>
                      <span
                        className="text-[14px] text-[#0a0a0a]"
                        style={{ fontVariationSettings: '"wght" 600' }}
                      >
                        {plan.deliveryTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-[#737373] mb-5">
                      <Shield className="w-3 h-3" aria-hidden="true" />
                      <span>Money-back on the first design round.</span>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      {openPlan === i ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height:"auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <PricingInquiryForm
                            planName={plan.name}
                            planPrice={`${plan.price}${plan.priceSuffix ??""}`}
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
                          className="btn-pill btn-pill-primary group w-full justify-center"
                        >
                          {isFeatured ?"Get started" :"Choose plan"}
                          <ArrowRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
