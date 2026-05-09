"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";

type Step = "request" | "code";
type Status = "idle" | "sending" | "verifying" | "error";

export default function DashboardLoginPage() {
  const [step, setStep] = useState<Step>("request");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "code") codeInputRef.current?.focus();
  }, [step]);

  async function sendCode() {
    setError(null);
    setStatus("sending");
    try {
      // No email in the body — server uses the allowlist's primary entry.
      const res = await fetch("/api/dashboard/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
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
      const res = await fetch("/api/dashboard/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        redirect?: string;
      };
      if (!res.ok) {
        setError(body.error || "Code is invalid or expired.");
        setStatus("error");
        return;
      }
      window.location.href = body.redirect || "/dashboard";
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#292827] font-sans flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#1b1938]" aria-hidden="true" />
          <span className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em]">
            Aestho · Dashboard
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#292827] mb-2 leading-[1.1]">
          {step === "request" ? "Sign in" : "Enter your code"}
        </h1>
        <p className="text-sm text-[#73706d] mb-8 leading-relaxed">
          {step === "request" ? (
            <>
              Click below to email a 6-digit code to your inbox. Code expires
              in 10 minutes.
            </>
          ) : (
            <>
              Sent. Check your inbox (and spam). Code expires in 10 minutes.
            </>
          )}
        </p>

        {step === "request" ? (
          <button
            type="button"
            onClick={sendCode}
            disabled={status === "sending"}
            className="w-full py-3 bg-[#1b1938] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#0e0c1f] transition-colors disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Sending code…
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" aria-hidden="true" />
                Send my login code
              </>
            )}
          </button>
        ) : (
          <form onSubmit={verifyCode} className="space-y-3">
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              required
              autoComplete="one-time-code"
              className="w-full px-4 py-4 border border-[#e8e4dd] bg-white text-center text-2xl tracking-[0.6em] font-bold text-[#292827] placeholder:text-zinc-300 focus:outline-none focus:border-[#1b1938] focus:ring-1 focus:ring-[#1b1938] font-mono"
            />
            <button
              type="submit"
              disabled={status === "verifying" || code.length !== 6}
              className="w-full py-3 bg-[#1b1938] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1b1938] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className="flex items-center justify-end pt-2 text-xs text-[#73706d]">
              <button
                type="button"
                onClick={sendCode}
                disabled={status === "sending"}
                className="hover:text-[#292827] disabled:opacity-50"
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

        <p className="mt-12 text-[11px] font-mono text-[#9a9794] uppercase tracking-[0.2em] text-center">
          © {new Date().getFullYear()} Rashid Iqbal · Aestho
        </p>
      </div>
    </main>
  );
}
