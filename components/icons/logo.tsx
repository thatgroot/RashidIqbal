// Aestho logo — same layered-card system as the rest of the icon set.
//
// The mark is the icon-system base composition (back silhouette + mid
// silhouette + amber-gradient front card + three white ribbon rows) so
// the logo reads as the canonical, no-detail member of the family.
//
// Variants:
//   - `mark`   — the layered-card mark in full colour (gradient + ribbons)
//   - `lockup` — the mark + the word"Aestho" beside it
//   - `mono`   — single-colour silhouette of the front card (currentColor),
//                for footers / favicon-adjacent contexts where the
//                gradient would not survive (e.g. embedded in the page
//                ink at small sizes).

import type { SVGProps } from"react";

interface LogoProps extends Omit<SVGProps<SVGSVGElement>,"ref"> {
  size?: number;
  variant?:"mark" |"lockup" |"mono";
}

let __idCounter = 0;
function nextId(prefix: string) {
  __idCounter += 1;
  return `aestho-logo-${prefix}-${__idCounter}`;
}

function MarkPaths({ id }: { id: string }) {
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

export function Logo({
  size = 24,
  variant ="mark",
  className,
  ...rest
}: LogoProps) {
  if (variant ==="mono") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-label="Aestho"
        {...rest}
      >
        <path d="M14 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V9C16 7.89543 15.1046 7 14 7Z" />
      </svg>
    );
  }

  const gradId = nextId("body");

  if (variant ==="lockup") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 4.5}
        height={size}
        viewBox="0 0 108 24"
        className={className}
        fill="none"
        aria-label="Aestho"
        {...rest}
      >
        <MarkPaths id={gradId} />
        <text
          x="28"
          y="17.5"
          fontFamily="inherit"
          fontSize="14"
          fontWeight={600}
          letterSpacing="-0.02em"
          fill="#0A0A0A"
        >
          Aestho
        </text>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-label="Aestho"
      {...rest}
    >
      <MarkPaths id={gradId} />
    </svg>
  );
}
