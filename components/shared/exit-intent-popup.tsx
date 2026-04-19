"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("exit-popup-dismissed", "true");
    } catch { }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !url.trim()) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (accessKey) {
      try {
        // Web3Forms free tier blocks server-side POSTs, so submit from the browser.
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            to: "rashid@founderfist.com",
            subject: `New Audit Request: ${url.trim()}`,
            from_name: "Aestho Portfolio",
            email: email.trim(),
            replyto: email.trim(),
            message: `New audit request from exit intent popup.\n\nEmail: ${email.trim()}\nWebsite: ${url.trim()}`,
            botcheck: "",
          }),
        });
      } catch (err) {
        console.error("[ExitIntent] Submit failed:", err);
      }
    }

    setSubmitted(true);
    setTimeout(() => handleClose(), 2500);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Desktop only - check for fine pointer (mouse)
    try {
      const mql = window.matchMedia("(pointer: fine)");
      if (!mql.matches) return;
    } catch {
      // matchMedia not supported, skip
      return;
    }

    // Check if already dismissed
    try {
      if (localStorage.getItem("exit-popup-dismissed")) return;
      if (sessionStorage.getItem("exit-popup-shown")) return;
    } catch { }

    let activated = false;
    const activationDelay = setTimeout(() => {
      activated = true;
    }, 5000);

    function handleMouseLeave(e: MouseEvent) {
      if (!activated) return;
      if (e.clientY <= 0) {
        setIsOpen(true);
        try {
          sessionStorage.setItem("exit-popup-shown", "true");
        } catch { }
        document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(activationDelay);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Never show on the stripped A/B landing page — the whole /offer route
  // is the conversion experience. An exit-intent popup there breaks the
  // one-offer rule.
  if (pathname === "/offer") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-white shadow-2xl p-8 z-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Got it!</h3>
                <p className="text-sm text-zinc-500">I&apos;ll send your audit shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-xs font-mono text-orange-600 uppercase tracking-wider">
                    Before you go
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 mt-2 mb-2">
                    Get a Free Website Audit
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Drop your URL and email. I&apos;ll send you a quick video breakdown of
                    what&apos;s working and what&apos;s costing you conversions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourwebsite.com"
                    className="w-full px-4 py-3 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    required
                  />
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
                    className="w-full py-3 bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Send My Free Audit <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-xs text-zinc-400 mt-3 text-center">No spam. Just your audit.</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
