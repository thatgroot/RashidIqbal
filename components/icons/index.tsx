// Aestho icon library — 100% layered-card system.
//
// Every icon in this file shares an identical structure:
//   1. Back silhouette  — opacity 0.18, solid #0A0A0A, top-right offset
//   2. Mid silhouette   — opacity 0.32, solid #0A0A0A, middle position
//   3. Front card       — amber gradient #E6B431 → #9C7307, bottom-left
//   4. Wide ribbon      — opacity 0.85 white
//   5. Medium ribbon    — opacity 0.55 white
//   6. Long ribbon      — opacity 0.55 white
//   7. Detail element   — single small white shape that hints the icon's
//                         meaning (a circle for "connect", a check for
//                         "review", an arrow for "send", etc.)
//
// Layers 1–6 are byte-for-byte identical across every icon. Only the
// detail element changes. This is the design constraint — the icon set
// reads as one family, not a kit of unrelated marks.

import type { SVGProps } from "react";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  className?: string;
  size?: number;
}

let __idCounter = 0;
function nextId(prefix: string) {
  __idCounter += 1;
  return `aestho-${prefix}-${__idCounter}`;
}

function Svg({
  size = 24,
  className,
  children,
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
      {...rest}
    >
      {children}
    </svg>
  );
}

// Base layers 1–6 — repeated verbatim inside every icon component below.
function BaseLayers({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="3" y1="7" x2="16.96" y2="19.96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <path opacity="0.18" d="M17 3H8C6.89543 3 6 3.89543 6 5V15C6 16.1046 6.89543 17 8 17H17C18.1046 17 19 16.1046 19 15V5C19 3.89543 18.1046 3 17 3Z" fill="#0A0A0A" />
      <path opacity="0.32" d="M15.5 5H6.5C5.39543 5 4.5 5.89543 4.5 7V17C4.5 18.1046 5.39543 19 6.5 19H15.5C16.6046 19 17.5 18.1046 17.5 17V7C17.5 5.89543 16.6046 5 15.5 5Z" fill="#0A0A0A" />
      <path d="M14 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V9C16 7.89543 15.1046 7 14 7Z" fill={`url(#${id})`} />
      <path opacity="0.85" d="M13.4 10H5.6C5.26863 10 5 10.2686 5 10.6V11C5 11.3314 5.26863 11.6 5.6 11.6H13.4C13.7314 11.6 14 11.3314 14 11V10.6C14 10.2686 13.7314 10 13.4 10Z" fill="white" />
      <path opacity="0.55" d="M10.4 13H5.6C5.26863 13 5 13.2686 5 13.6V13.8C5 14.1314 5.26863 14.4 5.6 14.4H10.4C10.7314 14.4 11 14.1314 11 13.8V13.6C11 13.2686 10.7314 13 10.4 13Z" fill="white" />
      <path opacity="0.55" d="M11.9 15.5H5.6C5.26863 15.5 5 15.7686 5 16.1V16.3C5 16.6314 5.26863 16.9 5.6 16.9H11.9C12.2314 16.9 12.5 16.6314 12.5 16.3V16.1C12.5 15.7686 12.2314 15.5 11.9 15.5Z" fill="white" />
    </>
  );
}

// =====================================================================
// Process step icons
// =====================================================================

export function Connect(props: IconProps) {
  const id = nextId("connect");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.6" fill="white" />
    </Svg>
  );
}

export function Assign(props: IconProps) {
  const id = nextId("assign");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.6" fill="white" />
    </Svg>
  );
}

export function Review(props: IconProps) {
  const id = nextId("review");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M11.8 17.5L13 18.7L15 16.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Ship(props: IconProps) {
  const id = nextId("ship");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 18.5V16.5M13.5 16.5L12.3 17.5M13.5 16.5L14.7 17.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

// =====================================================================
// Use-case tile icons
// =====================================================================

export function Layout(props: IconProps) {
  const id = nextId("layout");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="12" y="16" width="3" height="3" rx="0.5" fill="white" />
    </Svg>
  );
}

export function Wrench(props: IconProps) {
  const id = nextId("wrench");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16.3V18.7M12.3 17.5H14.7" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function BookOpen(props: IconProps) {
  const id = nextId("bookopen");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="12" y="17.2" width="3" height="0.6" rx="0.3" fill="white" />
    </Svg>
  );
}

export function Send(props: IconProps) {
  const id = nextId("send");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12 17.5H15M15 17.5L13.8 16.5M15 17.5L13.8 18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

// =====================================================================
// Service-list icons
// =====================================================================

export function Workflow(props: IconProps) {
  const id = nextId("workflow");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="12.5" cy="17.5" r="0.7" fill="white" />
      <circle cx="14" cy="17.5" r="0.7" fill="white" />
      <circle cx="15.5" cy="17.5" r="0.7" fill="white" />
    </Svg>
  );
}

export function GitBranch(props: IconProps) {
  const id = nextId("gitbranch");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13 17V18.5M13 17L11.8 18M13 17L14.2 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function GitBranchSm(props: IconProps) {
  const id = nextId("gitbranchsm");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13 17V18.5M13 17L11.8 18M13 17L14.2 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Cloud(props: IconProps) {
  const id = nextId("cloud");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="12.5" cy="17.5" r="1" fill="white" />
      <circle cx="14" cy="17.5" r="1.1" fill="white" />
      <circle cx="13.2" cy="16.7" r="0.9" fill="white" />
    </Svg>
  );
}

// =====================================================================
// Trust / utility chip glyphs
// =====================================================================

export function Rocket(props: IconProps) {
  const id = nextId("rocket");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12 18L13.5 16.5L15 18" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Shield(props: IconProps) {
  const id = nextId("shield");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.6" fill="none" stroke="white" strokeWidth="1" />
      <path d="M12.7 17.5L13.3 18.1L14.4 16.9" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Building(props: IconProps) {
  const id = nextId("building");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="12" y="16" width="0.7" height="3" rx="0.2" fill="white" />
      <rect x="13.2" y="16" width="0.7" height="3" rx="0.2" fill="white" />
      <rect x="14.4" y="16" width="0.7" height="3" rx="0.2" fill="white" />
    </Svg>
  );
}

export function Sparkles(props: IconProps) {
  const id = nextId("sparkles");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16L13.9 17.1L15 17.5L13.9 17.9L13.5 19L13.1 17.9L12 17.5L13.1 17.1L13.5 16Z" fill="white" />
    </Svg>
  );
}

export function Video(props: IconProps) {
  const id = nextId("video");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.5 16.3L15 17.5L12.5 18.7V16.3Z" fill="white" />
    </Svg>
  );
}

// =====================================================================
// Inline UI marks — same template, slightly different detail.
// (Note: these used to be monoline marks. Per design rule, every icon
// in the system uses the same layered-card stack — so Check / Circle /
// ChevronRight render as full layered cards too. Their old className
// colour overrides no longer apply; the amber gradient is fixed.)
// =====================================================================

interface StarProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  className?: string;
  size?: number;
  /** Kept for API back-compat; visual is always the layered-card stack. */
  filled?: boolean;
}

export function Star({ size = 16, className, ...rest }: StarProps) {
  const id = nextId("star");
  // `filled` is destructured out via ...rest in callers; we never read it here.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      {...rest}
    >
      <defs>
        <linearGradient id={id} x1="3" y1="7" x2="16.96" y2="19.96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6B431" />
          <stop offset="100%" stopColor="#9C7307" />
        </linearGradient>
      </defs>
      <path opacity="0.18" d="M17 3H8C6.89543 3 6 3.89543 6 5V15C6 16.1046 6.89543 17 8 17H17C18.1046 17 19 16.1046 19 15V5C19 3.89543 18.1046 3 17 3Z" fill="#0A0A0A" />
      <path opacity="0.32" d="M15.5 5H6.5C5.39543 5 4.5 5.89543 4.5 7V17C4.5 18.1046 5.39543 19 6.5 19H15.5C16.6046 19 17.5 18.1046 17.5 17V7C17.5 5.89543 16.6046 5 15.5 5Z" fill="#0A0A0A" />
      <path d="M14 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V9C16 7.89543 15.1046 7 14 7Z" fill={`url(#${id})`} />
      <path opacity="0.85" d="M13.4 10H5.6C5.26863 10 5 10.2686 5 10.6V11C5 11.3314 5.26863 11.6 5.6 11.6H13.4C13.7314 11.6 14 11.3314 14 11V10.6C14 10.2686 13.7314 10 13.4 10Z" fill="white" />
      <path opacity="0.55" d="M10.4 13H5.6C5.26863 13 5 13.2686 5 13.6V13.8C5 14.1314 5.26863 14.4 5.6 14.4H10.4C10.7314 14.4 11 14.1314 11 13.8V13.6C11 13.2686 10.7314 13 10.4 13Z" fill="white" />
      <path opacity="0.55" d="M11.9 15.5H5.6C5.26863 15.5 5 15.7686 5 16.1V16.3C5 16.6314 5.26863 16.9 5.6 16.9H11.9C12.2314 16.9 12.5 16.6314 12.5 16.3V16.1C12.5 15.7686 12.2314 15.5 11.9 15.5Z" fill="white" />
      <path d="M13.5 16L14 17L15.1 17.2L14.3 18L14.5 19.1L13.5 18.6L12.5 19.1L12.7 18L11.9 17.2L13 17L13.5 16Z" fill="white" />
    </svg>
  );
}

export function Check(props: IconProps) {
  const id = nextId("check");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M11.8 17.5L13.1 18.8L15.2 16.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Circle(props: IconProps) {
  const id = nextId("circle");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.4" stroke="white" strokeWidth="1.1" fill="none" />
    </Svg>
  );
}

export function ChevronRight(props: IconProps) {
  const id = nextId("chevron-right");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.5 16.5L14 17.5L12.5 18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

// =====================================================================
// Brand chip glyphs
// =====================================================================

export function BrandA(props: IconProps) {
  const id = nextId("brand-a");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13 18.5L13.5 16.5L14 18.5M13.2 17.8H13.8" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function BrandSparkle(props: IconProps) {
  const id = nextId("brand-sparkle");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16L13.7 17.3L15 17.5L13.7 17.7L13.5 19L13.3 17.7L12 17.5L13.3 17.3L13.5 16Z" fill="white" />
    </Svg>
  );
}

export function BrandCommand(props: IconProps) {
  const id = nextId("brand-command");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.5 16.5C12.5 16.2 12.7 16 13 16C13.3 16 13.5 16.2 13.5 16.5V18.5C13.5 18.8 13.3 19 13 19C12.7 19 12.5 18.8 12.5 18.5M14 16.5C14 16.2 14.2 16 14.5 16C14.8 16 15 16.2 15 16.5V18.5C15 18.8 14.8 19 14.5 19C14.2 19 14 18.8 14 18.5" stroke="white" strokeWidth="0.8" fill="none" />
    </Svg>
  );
}

export function BrandQuote(props: IconProps) {
  const id = nextId("brand-quote");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.6 16.6V17.5C12.6 17.8 12.8 18 13.1 18M14 16.6V17.5C14 17.8 14.2 18 14.5 18" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function BrandCode(props: IconProps) {
  const id = nextId("brand-code");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.6 16.5L11.7 17.5L12.6 18.5M14.4 16.5L15.3 17.5L14.4 18.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function BrandDollar(props: IconProps) {
  const id = nextId("brand-dollar");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16V19M14.4 17C14.4 16.6 14 16.4 13.5 16.4C13 16.4 12.6 16.6 12.6 17C12.6 17.4 13 17.5 13.5 17.5C14 17.5 14.4 17.6 14.4 18C14.4 18.4 14 18.6 13.5 18.6C13 18.6 12.6 18.4 12.6 18" stroke="white" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function BrandTarget(props: IconProps) {
  const id = nextId("brand-target");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.4" stroke="white" strokeWidth="0.9" fill="none" />
      <circle cx="13.5" cy="17.5" r="0.5" fill="white" />
    </Svg>
  );
}

// =====================================================================
// Extended decorative icons — same template, used across marketing pages
// (contact, FAQ, about, sticky-rail, not-found, etc.)
// =====================================================================

export function Mail(props: IconProps) {
  const id = nextId("mail");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M11.7 16.6L13.5 17.8L15.3 16.6M11.7 16.6V18.6H15.3V16.6M11.7 16.6H15.3" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Calendar(props: IconProps) {
  const id = nextId("calendar");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="11.7" y="16.4" width="3.6" height="2.5" rx="0.4" stroke="white" strokeWidth="0.8" fill="none" />
      <path d="M11.7 17.3H15.3" stroke="white" strokeWidth="0.7" />
      <circle cx="12.5" cy="18.1" r="0.25" fill="white" />
      <circle cx="13.5" cy="18.1" r="0.25" fill="white" />
      <circle cx="14.5" cy="18.1" r="0.25" fill="white" />
    </Svg>
  );
}

export function Plus(props: IconProps) {
  const id = nextId("plus");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16.3V18.7M12.3 17.5H14.7" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Minus(props: IconProps) {
  const id = nextId("minus");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.3 17.5H14.7" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function ArrowRight(props: IconProps) {
  const id = nextId("arrow-right");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12 17.5H15M15 17.5L13.8 16.5M15 17.5L13.8 18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function ArrowLeft(props: IconProps) {
  const id = nextId("arrow-left");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M15 17.5H12M12 17.5L13.2 16.5M12 17.5L13.2 18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  const id = nextId("arrow-up-right");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.3 18.7L14.7 16.3M14.7 16.3H12.7M14.7 16.3V18.3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function ExternalLink(props: IconProps) {
  const id = nextId("external-link");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="11.6" y="17" width="2.2" height="1.9" rx="0.3" stroke="white" strokeWidth="0.8" fill="none" />
      <path d="M14 17V16.4H15.4V17.8M15.4 16.4L13.5 18.3" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Clock(props: IconProps) {
  const id = nextId("clock");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.5" cy="17.5" r="1.4" stroke="white" strokeWidth="0.9" fill="none" />
      <path d="M13.5 16.7V17.5L14.2 17.9" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
    </Svg>
  );
}

export function Search(props: IconProps) {
  const id = nextId("search");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="13.1" cy="17.1" r="1.1" stroke="white" strokeWidth="0.9" fill="none" />
      <path d="M14 18L15 19" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
    </Svg>
  );
}

export function FileQuestion(props: IconProps) {
  const id = nextId("file-question");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="12" y="16.2" width="3" height="2.7" rx="0.3" stroke="white" strokeWidth="0.8" fill="none" />
      <path d="M13 17.2C13 16.9 13.2 16.7 13.5 16.7C13.8 16.7 14 16.9 14 17.2C14 17.5 13.5 17.6 13.5 18" stroke="white" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <circle cx="13.5" cy="18.4" r="0.2" fill="white" />
    </Svg>
  );
}

export function X(props: IconProps) {
  const id = nextId("x-mark");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M12.3 16.3L14.7 18.7M14.7 16.3L12.3 18.7" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Download(props: IconProps) {
  const id = nextId("download");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M13.5 16V18.7M13.5 18.7L12.3 17.5M13.5 18.7L14.7 17.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Tag(props: IconProps) {
  const id = nextId("tag");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M11.7 16.5L13.5 16.3L15.3 18.1L13.7 19.3L11.9 17.5L11.7 16.5Z" stroke="white" strokeWidth="0.8" strokeLinejoin="round" fill="none" />
      <circle cx="13" cy="17" r="0.3" fill="white" />
    </Svg>
  );
}

export function Share2(props: IconProps) {
  const id = nextId("share2");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <circle cx="12.4" cy="17.5" r="0.6" fill="white" />
      <circle cx="14.6" cy="16.4" r="0.6" fill="white" />
      <circle cx="14.6" cy="18.6" r="0.6" fill="white" />
      <path d="M12.9 17.2L14.1 16.6M12.9 17.8L14.1 18.4" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
    </Svg>
  );
}

export function Copy(props: IconProps) {
  const id = nextId("copy");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <rect x="11.7" y="16.4" width="2.6" height="2.4" rx="0.4" stroke="white" strokeWidth="0.8" fill="none" />
      <path d="M14.7 18V16.1H12.9" stroke="white" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Zap(props: IconProps) {
  const id = nextId("zap");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M14 16L11.9 17.7H13.1L13 19L15 17.3H13.9L14 16Z" fill="white" />
    </Svg>
  );
}

export function Home(props: IconProps) {
  const id = nextId("home");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M11.6 18.8V17.3L13.5 16L15.4 17.3V18.8H13.7V17.7H13.3V18.8H11.6Z" stroke="white" strokeWidth="0.8" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function ChevronLeft(props: IconProps) {
  const id = nextId("chevron-left");
  return (
    <Svg {...props}>
      <BaseLayers id={id} />
      <path d="M14.5 16.5L13 17.5L14.5 18.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
