// Aestho icon library — simple, distinct inline glyphs.
//
// These are inline UI affordances (arrows, checks, chevrons, common
// shapes) used inside text and small affordances. They are NOT the
// layered-card feature icons — those are written inline at the top of
// the section that owns them (process.tsx, use-cases.tsx, service-list.tsx).
//
// Every icon here is monoline, uses `currentColor` so it picks up the
// surrounding text colour, and is visually distinct from every other
// icon in the file. No two icons look the same.

import type { SVGProps } from"react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>,"ref"> {
  className?: string;
  size?: number;
}

function Svg({
  size = 24,
  className,
  children,
  strokeWidth,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

// ---- Arrows ----------------------------------------------------------

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </Svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 12H5" />
      <path d="M11 6L5 12L11 18" />
    </Svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7H17V16" />
    </Svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6L15 12L9 18" />
    </Svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 6L9 12L15 18" />
    </Svg>
  );
}

// ---- Status / state --------------------------------------------------

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12L10 17L20 7" />
    </Svg>
  );
}

export function Circle(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
    </Svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5V19" />
      <path d="M5 12H19" />
    </Svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12H19" />
    </Svg>
  );
}

export function X(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6L18 18" />
      <path d="M18 6L6 18" />
    </Svg>
  );
}

// ---- Communication / time -------------------------------------------

export function Mail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7L12 13L21 7" />
    </Svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10H21" />
      <path d="M8 3V7" />
      <path d="M16 3V7" />
    </Svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" />
    </Svg>
  );
}

export function Search(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16L20 20" />
    </Svg>
  );
}

// ---- File / link ----------------------------------------------------

export function ExternalLink(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 5H19V10" />
      <path d="M19 5L11 13" />
      <path d="M19 14V18C19 19.1 18.1 20 17 20H6C4.9 20 4 19.1 4 18V7C4 5.9 4.9 5 6 5H10" />
    </Svg>
  );
}

export function FileQuestion(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V8L14 3Z" />
      <path d="M14 3V8H19" />
      <path d="M10.5 12C10.5 11 11.2 10 12.5 10C13.8 10 14.5 11 14.5 12C14.5 13 12.5 13.5 12.5 15" />
      <circle cx="12.5" cy="17.5" r="0.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Download(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4V15" />
      <path d="M7 11L12 16L17 11" />
      <path d="M5 19H19" />
    </Svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4.5C4 15 3 14.5 3 13.5V4.5C3 3.5 3.5 3 4.5 3H13.5C14 3 15 3.5 15 4.5V5" />
    </Svg>
  );
}

export function Tag(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 12V4C3 3.5 3.5 3 4 3H12L21 12L12 21L3 12Z" />
      <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Share2(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 11L15.8 7.2" />
      <path d="M8.2 13L15.8 16.8" />
    </Svg>
  );
}

// ---- Misc utility ---------------------------------------------------

export function Home(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 11L12 4L20 11V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V11Z" />
      <path d="M10 21V14H14V21" />
    </Svg>
  );
}

export function Zap(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 3L4 14H11L11 21L20 10H13L13 3Z" />
    </Svg>
  );
}

export function Layout(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9H21" />
      <path d="M9 9V21" />
    </Svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3L20 6V12C20 16.5 16.5 20 12 21C7.5 20 4 16.5 4 12V6L12 3Z" />
    </Svg>
  );
}

export function Video(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10L21 7V17L16 14" />
    </Svg>
  );
}

export function GitBranchSm(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M6 8V16" strokeWidth={1.6} />
      <path d="M6 12C8 12 12 12 14 12C16 12 16 11 16 10" strokeWidth={1.6} />
    </Svg>
  );
}

// ---- Star (amber-filled — the only icon that breaks currentColor) ----

interface StarProps extends Omit<SVGProps<SVGSVGElement>,"ref"> {
  className?: string;
  size?: number;
  /** filled=true draws an amber star; filled=false an outline. */
  filled?: boolean;
}

export function Star({ size = 16, className, filled = true, ...rest }: StarProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ?"#E6B431" :"none"}
      stroke={filled ?"#9C7307" :"currentColor"}
      strokeWidth="1.6"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M12 3L14.6 9L21 9.7L16.2 14L17.6 20.3L12 17L6.4 20.3L7.8 14L3 9.7L9.4 9L12 3Z" />
    </svg>
  );
}

// ---- Sparkles (amber accent — used on offer banners / CTAs) ----------

export function Sparkles(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      className={props.className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="aestho-sparkles-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="url(#aestho-sparkles-grad)" />
      <path d="M19 16L19.7 18.3L22 19L19.7 19.7L19 22L18.3 19.7L16 19L18.3 18.3L19 16Z" fill="url(#aestho-sparkles-grad)" opacity="0.6" />
    </svg>
  );
}

// ---- Brand chip glyphs — small monoline marks for chips/pills --------

export function BrandA(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 20L12 4L19 20" strokeWidth={2} />
      <path d="M8 14H16" strokeWidth={2} />
    </Svg>
  );
}

export function BrandSparkle(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z" />
    </Svg>
  );
}

export function BrandCommand(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6H16" />
      <path d="M8 18H16" />
      <path d="M6 8V16" />
      <path d="M18 8V16" />
    </Svg>
  );
}

export function BrandQuote(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M6 8C6 6.5 7.2 5 9 5V7.5C8.4 7.5 8 8 8 8.7V12H5V9.5C5 9 5 8 6 8Z" />
      <path d="M14 8C14 6.5 15.2 5 17 5V7.5C16.4 7.5 16 8 16 8.7V12H13V9.5C13 9 13 8 14 8Z" />
    </Svg>
  );
}

export function BrandCode(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 7L3 12L8 17" />
      <path d="M16 7L21 12L16 17" />
      <path d="M14 4L10 20" />
    </Svg>
  );
}

export function BrandDollar(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3V21" />
      <path d="M16 7H10C8.9 7 8 7.9 8 9V10C8 11.1 8.9 12 10 12H14C15.1 12 16 12.9 16 14V15C16 16.1 15.1 17 14 17H8" />
    </Svg>
  );
}

export function BrandTarget(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  );
}
