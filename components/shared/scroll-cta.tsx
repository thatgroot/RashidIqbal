"use client";

import { useState, useEffect, useCallback } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { ArrowRight } from"@/components/icons";
import { X } from"lucide-react";
import { CTA_TRIGGERS, type CTATrigger } from"@/lib/cta-config";

export function ScrollCTA() {
  const [activeCTA, setActiveCTA] = useState<CTATrigger | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const dismiss = useCallback(() => {
    if (activeCTA) {
      setDismissed((prev) => new Set(prev).add(activeCTA.sectionId));
      setActiveCTA(null);
    }
  }, [activeCTA]);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!activeCTA) return;
    const timer = setTimeout(dismiss, 8000);
    return () => clearTimeout(timer);
  }, [activeCTA, dismiss]);

  // Watch sections with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CTA_TRIGGERS.forEach((trigger) => {
      const el = document.getElementById(trigger.sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Trigger when section scrolls OUT of view (user scrolled past it)
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              if (!dismissed.has(trigger.sectionId) && !activeCTA) {
                setActiveCTA(trigger);
              }
            }
          });
        },
        { threshold: 0, rootMargin:"0px 0px -100px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [dismissed, activeCTA]);

  return (
    <AnimatePresence>
      {activeCTA && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          className="fixed bottom-6 right-6 z-40 max-w-xs"
        >
          <div className="bg-white border border-[#e5e5e5] p-5 relative">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-sm font-medium text-[#0a0a0a] mb-3 pr-6">
              {activeCTA.message}
            </p>

            <a
              href={activeCTA.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] text-white text-xs font-bold hover:bg-[#0a0a0a] transition-colors"
            >
              {activeCTA.cta} <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
