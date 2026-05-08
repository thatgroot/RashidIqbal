/**
 * Framer + Replit expert badges. Renders in two styles:
 *
 *   <ExpertBadges variant="pill" href={SOCIAL_LINKS.calcom} />   — compact
 *     inline pills used in the hero trust band. When `href` is set, each
 *     pill becomes an external link with hover affordance.
 *
 *   <ExpertBadges variant="card" href={SOCIAL_LINKS.calcom} />   — larger
 *     stacked card with descriptions. Used in the about section or any
 *     credentials block where vertical space is available.
 *
 * SVGs are inlined from the Contra brand assets so the component has no
 * network dependency. Both icons carry their own rounded backgrounds, so
 * the component does not wrap them in a colored tile.
 */

// ============================================================================
// Brand icons — inlined from Contra SVGs
// ============================================================================

function FramerLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#000" />
      <g transform="translate(-0.82 0)">
        <path
          d="M12.694 9.909h4.874V5.125H7.91v.045l4.784 4.739z"
          fill="#fff"
        />
        <path
          d="M12.694 9.909H7.82v4.784h.022l4.807 4.807v-4.807h4.829v-.045l-4.784-4.739z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

function Base44Logo({ className = "w-6 h-6" }: { className?: string }) {
  // Sourced from /public/brands/base44.svg so the asset ships with the
  // build and never depends on Base44's CDN. Replace the file if Base44
  // ever rotates the mark — no code change needed.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brands/base44.svg"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ borderRadius: 5 }}
    />
  );
}

function ReplitLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#001021" />
      <path
        d="M11.8003 9.68683H7.10701C6.64486 9.68683 6.27832 9.31875 6.27832 8.87235V6.16263C6.27832 5.7084 6.65283 5.34814 7.10701 5.34814H10.9716C11.4337 5.34814 11.8003 5.71623 11.8003 6.16263V9.68683Z"
        fill="#FD5402"
      />
      <path
        d="M16.8342 14.4133H11.8057V9.68018H16.8342C17.3208 9.68018 17.7221 10.081 17.7221 10.5671V13.5264C17.7221 14.021 17.3208 14.4133 16.8342 14.4133Z"
        fill="#FD5402"
      />
      <path
        d="M10.9716 18.765H7.10701C6.65283 18.765 6.27832 18.3976 6.27832 17.9519V15.2393C6.27832 14.7937 6.65283 14.4263 7.10701 14.4263H11.8003V17.9519C11.8003 18.3976 11.4258 18.765 10.9716 18.765Z"
        fill="#FD5402"
      />
    </svg>
  );
}

function DribbbleLogo({ className = "w-6 h-6" }: { className?: string }) {
  // Dribbble brand mark — pink basketball-style circle.
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#EA4C89" />
      <path
        d="M12 5.6c-3.5 0-6.4 2.9-6.4 6.4s2.9 6.4 6.4 6.4 6.4-2.9 6.4-6.4S15.5 5.6 12 5.6zm4.2 2.95a5.5 5.5 0 0 1 1.25 3.46c-.18-.04-1.96-.4-3.74-.18-.04-.09-.07-.18-.11-.27-.11-.25-.22-.5-.34-.74 1.97-.8 2.87-1.95 2.94-2.27zm-.71-.61c-.05.07-.86 1.18-2.76 1.88-.87-1.6-1.83-2.91-1.97-3.1 1.62-.39 3.32-.04 4.73 1.22zm-5.7-.94c.13.18 1.07 1.5 1.95 3.07-2.5.66-4.7.65-4.94.65a5.45 5.45 0 0 1 2.99-3.72zm-3.07 4.4c.25 0 2.84.03 5.51-.77.16.31.31.62.45.93l-.21.06c-2.74.88-4.18 3.39-4.3 3.6a5.5 5.5 0 0 1-1.45-3.82zm2.07 4.55c.09-.16 1.16-2.25 4.15-3.29.01 0 .02 0 .03-.01.74 1.93 1.05 3.55 1.13 4.01-1.79.78-3.85.59-5.31-.71zm6.06.37c-.06-.33-.34-1.88-1.03-3.78 1.68-.27 3.15.18 3.34.24a5.5 5.5 0 0 1-2.31 3.54z"
        fill="#fff"
      />
    </svg>
  );
}

// ============================================================================
// Shared logo size map
// ============================================================================

type TileSize = "sm" | "md" | "lg";

const LOGO_SIZE: Record<TileSize, string> = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-11 h-11",
};

function BrandLogo({
  icon,
  size = "md",
}: {
  icon: "framer" | "replit" | "base44" | "dribbble";
  size?: TileSize;
}) {
  const className = LOGO_SIZE[size];
  if (icon === "framer") return <FramerLogo className={className} />;
  if (icon === "base44") return <Base44Logo className={className} />;
  if (icon === "dribbble") return <DribbbleLogo className={className} />;
  return <ReplitLogo className={className} />;
}

// ============================================================================
// Badge data
// ============================================================================

const BADGES = [
  {
    icon: "framer" as const,
    title: "Framer Expert",
    description: "Certified by Framer as highly skilled.",
    href: "https://www.framer.com/@risiq",
  },
  {
    icon: "replit" as const,
    title: "Replit Expert",
    description: "Certified by Replit as highly skilled.",
    href: "https://contra.com/rashidiqbal",
  },
  {
    icon: "base44" as const,
    title: "Base44 Partner",
    description: "Verified Base44 build partner.",
    href: "https://app.base44.com/@rashid-iqbal",
  },
  {
    icon: "dribbble" as const,
    title: "Dribbble | Framer Expert",
    description: "Verified Framer Expert profile on Dribbble.",
    href: "https://dribbble.com/thatgroot/about",
  },
];

// ============================================================================
// Public component
// ============================================================================

type ExpertBadgesProps = {
  variant?: "pill" | "card";
  /** When set, every pill (or card row) becomes a link to this URL. */
  href?: string;
  /** Label announced to screen readers when `href` makes the pill clickable. */
  hrefLabel?: string;
  /** Render as non-interactive (no anchors, no per-badge links). Used on
   *  the hero where the badges are pure credential display. */
  nolinks?: boolean;
  className?: string;
};

export function ExpertBadges({
  variant = "pill",
  href,
  hrefLabel = "Book a call",
  nolinks = false,
  className = "",
}: ExpertBadgesProps) {
  if (variant === "card") {
    return (
      <div
        className={`border border-zinc-200 bg-white rounded-2xl p-5 md:p-6 max-w-md ${className}`}
      >
        <ul className="space-y-5">
          {BADGES.map((b) => {
            const content = (
              <>
                <BrandLogo icon={b.icon} size="lg" />
                <div className="pt-0.5 flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 text-sm md:text-base leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1 leading-snug">
                    {b.description}
                  </p>
                </div>
              </>
            );
            // Per-badge link points to that badge's own profile by
            // default. If a parent passes `href`, every row is
            // overridden. `nolinks` short-circuits both behaviours.
            const linkHref = nolinks ? null : href || b.href;
            const linkLabel = href ? `${b.title} — ${hrefLabel}` : b.title;
            return (
              <li key={b.title}>
                {linkHref ? (
                  <a
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkLabel}
                    className="flex items-start gap-4 rounded-lg -m-1 p-1 hover:bg-zinc-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-4">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // pill variant — compact, inline, used in the hero trust band.
  // Default behaviour: each pill links to its OWN profile (Framer →
  // framer.com/@risiq, Replit → contra.com/rashidiqbal,
  // Base44 → app.base44.com, Dribbble → dribbble.com/thatgroot/about).
  // When a parent passes `href`, every pill is overridden — used by
  // some surfaces to make the whole row a "Book a call" CTA. Hash
  // anchors (e.g. "#booking-calendar") are smooth-scrolled in-page.
  const overrideHref = href;
  const isInPageAnchor = !!overrideHref && overrideHref.startsWith("#");
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {BADGES.map((b) => {
        const inner = (
          <>
            <BrandLogo icon={b.icon} size="sm" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-900">
              {b.title}
            </span>
          </>
        );

        const pillBase =
          "inline-flex items-center gap-2 pl-1.5 pr-3 py-1 border border-zinc-200 bg-white rounded-full transition-all";

        // Non-interactive credential display (used in the hero).
        if (nolinks) {
          return (
            <span
              key={b.title}
              className={pillBase}
              aria-label={b.title}
            >
              {inner}
            </span>
          );
        }

        const pillHref = overrideHref ?? b.href;
        const pillLabel = overrideHref
          ? `${b.title} — ${hrefLabel}`
          : `Visit ${b.title} profile`;

        return (
          <a
            key={b.title}
            href={pillHref}
            {...(isInPageAnchor
              ? {
                  onClick: (e) => {
                    e.preventDefault();
                    document
                      .querySelector(overrideHref)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  },
                }
              : { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={pillLabel}
            className={`${pillBase} hover:border-orange-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}
