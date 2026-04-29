"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, X, Video, Check } from "lucide-react";

// Bottom-right rail card. Replaces the modal exit-intent popup with a
// passive offer that doesn't interrupt. CRO research: persistent rails
// outperform interrupt modals on first-impression sites because they
// don't trigger "make-it-stop" behavior.
//
// Behavior:
// - Hidden until the visitor scrolls past the hero (~600px) on a non-
//   admin, non-portal page.
// - Dismissible. Dismiss persists 7 days in localStorage.
// - Submission posts to /api/lead with source = "sticky-audit-rail" and
//   a description prefilled with the visitor's URL.

const DISMISS_KEY = "aestho_sticky_audit_dismissed";
const DISMISS_DAYS = 7;

function isHidePath(path: string): boolean {
  return (
    path.startsWith("/dashboard") ||
    path.startsWith("/portal") ||
    path.startsWith("/contact") ||
    path.startsWith("/offer")
  );
}

function readDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function StickyAuditRail() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start true; un-suppress after mount checks
  const [expanded, setExpanded] = useState(false);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isHidePath(location.pathname)) return;
    if (readDismissed()) return;
    setDismissed(false);

    function onScroll() {
      if (sentinelRef.current) return;
      if (window.scrollY > 600) {
        sentinelRef.current = true;
        setOpen(true);
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setOpen(false);
    setExpanded(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* no-op */
    }
  }

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
          source: "sticky-audit-rail",
          email: email.trim(),
          website: url.trim() || undefined,
          description: `60-second audit Loom request. URL: ${url.trim() || "(not provided)"}`,
          botcheck: "",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (!res.ok || body.success === false) {
        setError(body.error || "Couldn't send. Try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))] bg-white border border-zinc-200 shadow-2xl shadow-black/15"
          role="region"
          aria-label="Free 60-second audit Loom"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-colors shadow-sm"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {status === "sent" ? (
            <div className="px-5 py-5 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold text-zinc-900 mb-1">Audit Loom queued.</p>
              <p className="text-xs text-zinc-500">
                I&rsquo;ll email you the recording within 48 hours.
              </p>
            </div>
          ) : (
            <div className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Video className="w-4 h-4 text-orange-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 leading-tight">
                    Free 60-second audit
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                    Drop your URL. I&rsquo;ll record a Loom of where your page is leaking
                    visitors. No credit card. No pitch.
                  </p>
                </div>
              </div>

              {!expanded ? (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-700 text-white text-xs font-bold hover:bg-orange-800 transition-colors"
                >
                  Get my audit Loom
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ) : (
                <form onSubmit={submit} className="mt-3 space-y-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-site.com"
                    className="w-full px-2.5 py-2 text-xs border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                    className="w-full px-2.5 py-2 text-xs border border-zinc-200 bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-700 text-white text-xs font-bold hover:bg-orange-800 transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send me the Loom
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  {error && <p className="text-[11px] text-red-600">{error}</p>}
                </form>
              )}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
