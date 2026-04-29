"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";

type Step = "email" | "code";
type Status = "idle" | "sending" | "verifying" | "error";

export default function PortalLoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/portal/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(body.error || "Could not send code. Try again.");
        setStatus("error");
        return;
      }
      setStep("code");
      setStatus("idle");
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("verifying");
    try {
      const res = await fetch("/api/portal/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        redirect?: string;
      };
      if (!res.ok) {
        setError(body.error || "Code is invalid or expired.");
        setStatus("error");
        return;
      }
      window.location.href = body.redirect || "/portal";
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-orange-600" aria-hidden="true" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.22em]">
            Aestho · Project portal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-2 leading-[1.1]">
          {step === "email" ? "Sign in" : "Enter your code"}
        </h1>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
          {step === "email"
            ? "Enter the email Rashid used to set up your project. A 6-digit code expires in 10 minutes."
            : `Sent to ${email}. Check spam if it's not in your inbox.`}
        </p>

        {step === "email" ? (
          <form onSubmit={sendCode} className="space-y-3">
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourcompany.com"
                required
                autoComplete="email"
                autoFocus
                className="w-full pl-10 pr-4 py-3 border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-zinc-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Sending code…
                </>
              ) : (
                <>
                  Send code
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-3">
            <input
              ref={codeRef}
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              required
              autoComplete="one-time-code"
              className="w-full px-4 py-4 border border-zinc-200 bg-white text-center text-2xl tracking-[0.6em] font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono"
            />
            <button
              type="submit"
              disabled={status === "verifying" || code.length !== 6}
              className="w-full py-3 bg-orange-700 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "verifying" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify and sign in
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
            <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError(null);
                }}
                className="hover:text-zinc-900"
              >
                ← Change email
              </button>
              <button
                type="button"
                onClick={() => sendCode()}
                disabled={status === "sending"}
                className="hover:text-zinc-900 disabled:opacity-50"
              >
                Resend code
              </button>
            </div>
          </form>
        )}

        {error && (
          <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2">
            {error}
          </p>
        )}

        <p className="mt-12 text-[11px] font-mono text-zinc-400 uppercase tracking-[0.2em] text-center">
          © {new Date().getFullYear()} Rashid Iqbal · Aestho
        </p>
      </div>
    </main>
  );
}
