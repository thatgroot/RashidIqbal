"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { Loader2 } from "lucide-react";

// Compact signup form. Two visual variants — `inline` for blog post
// footers, `card` for the homepage section. Both POST to
// /api/newsletter/subscribe with the visitor's email + a `source` tag
// so the CMS subscribers list shows where each sign-up came from.

export function NewsletterForm({
  source = "unknown",
  variant = "inline",
  headline,
  description,
}: {
  source?: string;
  variant?: "inline" | "card";
  headline?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
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
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, botcheck: "" }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || body.success === false) {
        setError(body.error || "Couldn't sign you up. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setEmail("");
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  if (variant === "card") {
    return (
      <section className="border border-[#e8e4dd] bg-white p-6 md:p-8">
        <p className="text-[0.625rem] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-2">
          Newsletter
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-[#292827] mb-2">
          {headline || "5-minute teardowns, every Tuesday."}
        </h3>
        <p className="text-sm text-[#73706d] mb-5 max-w-md">
          {description ||
            "One SaaS landing page broken down per email. Three concrete fixes you can apply to your own page that day. Unsubscribe anytime."}
        </p>
        <Inner
          email={email}
          setEmail={setEmail}
          submit={submit}
          status={status}
          error={error}
        />
      </section>
    );
  }

  return (
    <section className="border border-[#e8e4dd] bg-[#fafaf8]/40 p-5 my-10">
      <p className="text-[0.625rem] font-mono text-[#1b1938] uppercase tracking-[0.22em] mb-2">
        Get the next one
      </p>
      <h3 className="text-base font-bold text-[#292827] mb-1">
        {headline || "Subscribe to the 5-minute teardown."}
      </h3>
      <p className="text-xs text-[#73706d] mb-4">
        {description ||
          "One SaaS landing page broken down per week. Real fixes you can ship the same day."}
      </p>
      <Inner
        email={email}
        setEmail={setEmail}
        submit={submit}
        status={status}
        error={error}
        compact
      />
    </section>
  );
}

function Inner({
  email,
  setEmail,
  submit,
  status,
  error,
  compact,
}: {
  email: string;
  setEmail: (v: string) => void;
  submit: (e: React.FormEvent) => Promise<void>;
  status: "idle" | "sending" | "sent" | "error";
  error: string | null;
  compact?: boolean;
}) {
  if (status === "sent") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-700">
        <Check className="w-4 h-4" aria-hidden="true" />
        You&rsquo;re in. First teardown lands next Tuesday.
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourcompany.com"
        autoComplete="email"
        className={`flex-1 px-3 ${compact ? "py-2" : "py-3"} text-sm border border-[#e8e4dd] bg-white focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938]`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={`inline-flex items-center justify-center gap-1.5 px-4 ${compact ? "py-2" : "py-3"} bg-[#1b1938] text-white text-xs font-bold hover:bg-[#1b1938] transition-colors disabled:opacity-60`}
      >
        {status === "sending" ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </>
        )}
      </button>
      {error && (
        <p className="text-[0.6875rem] text-red-600 sm:absolute sm:-bottom-5">{error}</p>
      )}
    </form>
  );
}
