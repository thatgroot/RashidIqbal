// Pure constants — safe to import from client components. No DB calls.

export const STATUS_LABELS: Record<
  string,
  { label: string; tone: "kickoff" | "active" | "review" | "live" | "paused" }
> = {
  kickoff: { label: "Kickoff", tone: "kickoff" },
  design: { label: "Design", tone: "active" },
  build: { label: "Build", tone: "active" },
  review: { label: "Review", tone: "review" },
  launch: { label: "Launching", tone: "review" },
  live: { label: "Live", tone: "live" },
  paused: { label: "Paused", tone: "paused" },
  cancelled: { label: "Cancelled", tone: "paused" },
};

export const STATUS_KEYS = [
  "kickoff",
  "design",
  "build",
  "review",
  "launch",
  "live",
  "paused",
  "cancelled",
] as const;

export const TIER_LABELS: Record<string, string> = {
  "landing-page": "Landing Page · 3 days",
  "four-page-site": "4-Page Website · 5 days",
  custom: "Custom",
};
