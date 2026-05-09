"use client";

// Footer hero — image 5 layout. Full-bleed background of soft violet +
// blue gradient washes (no photographic image dependency, layered
// radial gradients give the same petal-like feel). Top-left brand
// chip with name. Massive bold black wordmark headline. Two-line sub.
// Dual pill CTA — black filled + white outline. Trust row at the
// bottom with OpenAI-style icon links.
//
// Acts as the page-foot moment on every marketing page — the
// dedicated <Footer /> beneath it has been retired.

import Link from"next/link";
import { Rocket, Shield, Building2 } from"lucide-react";

interface ClosingBandProps {
  headline?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  proof?: string;
}

export function ClosingBand({
  headline ="Start shipping with Aestho",
  sub ="Aestho works alongside you in Figma + Framer to plan, design, and ship marketing sites that convert.",
  ctaLabel ="Get started",
  ctaHref ="/#booking-calendar",
}: ClosingBandProps) {
  // `proof` deliberately unused here — the trust row replaces it.
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Get started with Aestho"
    >
      {/* Layered gradient backdrop — violet → sky-blue → soft white. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
"radial-gradient(70% 90% at 80% 30%, rgba(230,180,49,0.55) 0%, rgba(230,180,49,0) 60%), radial-gradient(60% 80% at 100% 80%, rgba(248,200,77,0.65) 0%, rgba(248,200,77,0) 60%), radial-gradient(50% 70% at 10% 60%, rgba(255,241,207,0.85) 0%, rgba(255,241,207,0) 60%), linear-gradient(180deg, #fbe6a3 0%, #f7d684 60%, #f3c965 100%)",
        }}
      />
      {/* Subtle grain over the gradient. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
"radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize:"3px 3px",
        }}
      />

      <div className="max-w-container mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
        {/* Brand chip top-left */}
        <div className="flex items-center gap-3 mb-12">
          <span
            aria-hidden="true"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
            style={{
              background:"linear-gradient(135deg, #e6b431 0%, #9c7307 100%)",
              fontVariationSettings: '"wght" 700',
            }}
          >
            A
          </span>
          <span
            className="text-[20px] tracking-tight text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            Aestho
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-[clamp(48px,8.4vw,108px)] tracking-[-0.028em] leading-[0.98] text-[#0a0a0a] max-w-4xl"
          style={{ fontVariationSettings: '"wght" 700' }}
        >
          {headline}
        </h2>

        {/* Sub */}
        <p className="mt-7 text-[18px] md:text-[20px] leading-[1.45] text-[#404040] max-w-xl">
          {sub}
        </p>

        {/* Dual pill CTA */}
        <div className="mt-10 flex items-center gap-3 flex-wrap">
          <Link href={ctaHref} className="btn-pill btn-pill-primary group">
            {ctaLabel}
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/work" className="btn-pill btn-pill-ghost">
            See the work
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Trust row */}
        <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-x-8 md:gap-x-10 gap-y-3 text-[13px] text-[#404040]">
          <span
            className="inline-flex items-center gap-2"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            <span
              aria-hidden="true"
              className="w-5 h-5 rounded-md bg-[#0a0a0a] text-white flex items-center justify-center text-[10px]"
            >
              ✦
            </span>
            Aestho Studio
          </span>
          <span className="hidden md:inline-block w-px h-4 bg-[#0a0a0a]/15" />
          <span className="inline-flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5" aria-hidden="true" />
            Built for shipping
          </span>
          <span className="hidden md:inline-block w-px h-4 bg-[#0a0a0a]/15" />
          <span className="inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
            Secure by design
          </span>
          <span className="hidden md:inline-block w-px h-4 bg-[#0a0a0a]/15" />
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            Enterprise ready
          </span>
        </div>
      </div>
    </section>
  );
}
