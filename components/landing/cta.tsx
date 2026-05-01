"use client";

import { useState } from "react";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { ArrowRight, ArrowUpRight, Check, Clock, Loader2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function CTASection() {
  return (
    <>
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={2}>
            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.05]">
                30 minutes. <br />
                <span className="text-zinc-500">Audit + fix list.</span>
              </h2>
              <p className="text-lg text-zinc-500 mt-6 max-w-md">
                Walk through your landing page, form, or checkout. I&rsquo;ll
                show you the 3–5 changes that move the needle most. If we&rsquo;re a
                fit, we lock scope that day. If not, you keep the teardown.
              </p>
            </div>

            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 relative overflow-hidden dotted-bg">
              <div className="relative z-10 flex flex-col gap-6 max-w-md">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>Live audit of where your page is losing visitors</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>The exact copy and layout changes I would make</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Clock className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>Scope, timeline, and a firm price, in writing</span>
                  </div>
                </div>

                <a
                  href="#booking-calendar"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#booking-calendar")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="px-8 py-4 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 w-full shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                >
                  Book my strategy call
                </a>
              </div>
            </div>
          </GridContainer>
        </div>
      </section>

      {/* Inline booking — single primary path. Submits to /api/lead so the
          drip + dashboard inbox both pick it up. Secondary "pick a time on
          Cal.com" link is below for visitors who want to self-schedule. */}
      <section id="booking-calendar" className="bg-white border-b border-zinc-100 scroll-mt-16">
        <div className="max-w-container border-l border-r border-zinc-100">
          <GridContainer cols={1}>
            <GridItem className="relative overflow-hidden dotted-bg" padding={false}>
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
                <BookingForm />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </section>
    </>
  );
}

function BookingForm() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [problem, setProblem] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Email required.");
      return;
    }
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "homepage-booking",
          email: email.trim(),
          website: url.trim() || undefined,
          description: problem.trim() || "Wants to book a 30-min strategy call.",
          botcheck: "",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || body.success === false) {
        setError(body.error || "Could not send. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-xl mx-auto bg-white border border-zinc-200 p-8 md:p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <Check className="w-5 h-5 text-emerald-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">
          Got it. I&rsquo;ll reply within 24 hours.
        </h3>
        <p className="text-sm text-zinc-500 mb-6">
          You&rsquo;ll get a calendar slot, a Google Meet link, and a short
          pre-call form. If it&rsquo;s urgent, you can also self-serve a
          time on my Cal.com page.
        </p>
        <a
          href={SOCIAL_LINKS.calcom}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-200 text-sm font-bold text-zinc-700 hover:border-orange-300 hover:text-orange-700 transition-colors"
        >
          Pick a time now on Cal.com
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white border border-zinc-200 p-6 md:p-10">
      <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
        Book the call
      </p>
      <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight leading-tight mb-3">
        Tell me about the page that&rsquo;s bleeding leads.
      </h3>
      <p className="text-sm text-zinc-500 mb-6">
        I reply within 24 hours with a calendar slot. Free 30-minute call.
        No credit card. No commitment.
      </p>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          autoComplete="email"
          className="w-full px-3 py-2.5 text-sm border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-site.com (optional)"
          className="w-full px-3 py-2.5 text-sm border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="What's not converting? (one line is fine)"
          rows={2}
          className="w-full px-3 py-2.5 text-sm border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors shadow-lg shadow-orange-700/25 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Book my strategy call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>

      <div className="mt-5 pt-5 border-t border-zinc-100">
        <a
          href={SOCIAL_LINKS.calcom}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-orange-700 transition-colors"
        >
          Or self-serve a slot on Cal.com
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
