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
  // Stylized "44" mark on a deep-indigo tile so the badge reads as
  // distinct from Framer (black) and Replit (#001021). Rashid is a
  // listed Base44 partner — https://app.base44.com/@rashid-iqbal
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5" fill="#3b2ae0" />
      <path
        d="M9.6 6h-1.7L4.8 11.7v1.6h3.5v2.7h1.3v-2.7h1V12h-1V6Zm-1.3 6H6.1l2.2-4.1V12Zm10.9-6h-1.7L14.4 11.7v1.6h3.5v2.7h1.3v-2.7h1V12h-1V6Zm-1.3 6h-2.2l2.2-4.1V12Z"
        fill="#fff"
      />
    </svg>
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
  icon: "framer" | "replit" | "base44";
  size?: TileSize;
}) {
  const className = LOGO_SIZE[size];
  if (icon === "framer") return <FramerLogo className={className} />;
  if (icon === "base44") return <Base44Logo className={className} />;
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
    href: "https://framer.link/rashidiqbal",
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
  className?: string;
};

export function ExpertBadges({
  variant = "pill",
  href,
  hrefLabel = "Book a call",
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
            return (
              <li key={b.title}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${b.title} — ${hrefLabel}`}
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

  // pill variant — compact, inline, used in the hero trust band
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

        return href ? (
          <a
            key={b.title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${b.title} — ${hrefLabel}`}
            className={`${pillBase} hover:border-orange-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
          >
            {inner}
          </a>
        ) : (
          <span key={b.title} className={pillBase}>
            {inner}
          </span>
        );
      })}
    </div>
  );
}
