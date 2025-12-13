// PostHog Client-Side Initialization for Next.js 15.3+
// This file is automatically loaded by Next.js for client-side instrumentation
// Docs: https://posthog.com/docs/libraries/next-js

import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    // Latest defaults: handles $pageview and $pageleave automatically
    defaults: "2025-11-30",
    // Privacy settings
    person_profiles: "identified_only", // Only create profiles for identified users
    respect_dnt: true, // Respect Do Not Track browser setting
    secure_cookie: true, // Use secure cookies in production
    persistence: "localStorage+cookie",
    // Recording & capture settings
    disable_session_recording: true, // Enable if needed for session replays
    autocapture: true, // Capture clicks, form submissions, etc.
  });
} else if (process.env.NODE_ENV === "development") {
  console.warn("PostHog: Missing NEXT_PUBLIC_POSTHOG_KEY. Analytics disabled.");
}

export default posthog;
