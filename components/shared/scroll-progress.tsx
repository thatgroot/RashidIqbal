"use client";

// Cap.so-style scroll progress bar. 1px violet-soft strip pinned to the
// top of the viewport, expanding from 0 → 100% as the visitor scrolls.
// Uses a CSS scroll-driven animation when the browser supports it
// (Chromium 115+, Safari 18+) and a JS fallback otherwise.
//
// Why useScrollDriven: the modern path is GPU-accelerated, costs zero
// JS frames, and degrades gracefully — so we don't pay observer cost
// on browsers that already do this for free.

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Feature-detect scroll-driven animations (CSS @scroll-timeline).
    if (typeof window !== "undefined" && CSS?.supports?.("animation-timeline: scroll()")) {
      return; // CSS handles it via the inline style block below
    }
    // JS fallback for older browsers
    function update() {
      if (!barRef.current) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      barRef.current.style.transform = `scaleX(${pct / 100})`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="aestho-scroll-progress fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #c9b4fa 0%, #1b1938 50%, #0e3030 100%)",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
      <style>{`
        @supports (animation-timeline: scroll()) {
          .aestho-scroll-progress {
            animation: aestho-scroll-grow linear forwards;
            animation-timeline: scroll(root);
            transform: scaleX(0);
          }
          @keyframes aestho-scroll-grow {
            to { transform: scaleX(1); }
          }
        }
      `}</style>
    </>
  );
}
