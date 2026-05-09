"use client";

import { useState, useEffect, useCallback } from"react";
import { usePathname } from"next/navigation";
import { motion, AnimatePresence } from"framer-motion";
import { ArrowRight } from"@/components/icons";
import { X } from"lucide-react";

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("exit-popup-dismissed","true");
    } catch { }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !url.trim()) return;

    try {
      await fetch("/api/lead", {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          source:"exit-intent",
          email: email.trim(),
          website: url.trim(),
          botcheck:"",
        }),
      });
    } catch (err) {
      console.error("[ExitIntent] Submit failed:", err);
    }

    setSubmitted(true);
    setTimeout(() => handleClose(), 2500);
  };

  useEffect(() => {
    if (typeof window ==="undefined") return;

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
          sessionStorage.setItem("exit-popup-shown","true");
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
  if (pathname ==="/offer") return null;

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
            transition={{ type:"spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-white p-8 z-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Got it!</h3>
                <p className="text-sm text-[#737373]">I&apos;ll send your audit shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-xs font-mono text-[#0a0a0a] uppercase tracking-wider">
                    Before you go
                  </span>
                  <h3 className="text-2xl font-bold text-[#0a0a0a] mt-2 mb-2">
                    Get a Free Website Audit
                  </h3>
                  <p className="text-sm text-[#737373]">
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
                    className="w-full px-4 py-3 border border-[#e5e5e5] text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a]"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-[#e5e5e5] text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0a0a0a] text-white text-sm font-bold hover:bg-[#0a0a0a] transition-colors flex items-center justify-center gap-2"
                  >
                    Send My Free Audit <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-xs text-[#a3a3a3] mt-3 text-center">No spam. Just your audit.</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
