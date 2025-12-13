// PostHog Server-Side Client
// Singleton pattern for reusable server-side PostHog instance
// Security: Uses server-only env vars (falls back to NEXT_PUBLIC_ for compatibility)

import { PostHog } from "posthog-node";

let posthogInstance: PostHog | null = null;

// Server-side env vars (without NEXT_PUBLIC_ prefix) for security
// Falls back to public vars for development/compatibility
const POSTHOG_KEY =
  process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.POSTHOG_HOST ||
  process.env.NEXT_PUBLIC_POSTHOG_HOST ||
  "https://us.i.posthog.com";

export function getPostHogServer(): PostHog {
  if (!posthogInstance) {
    // Validate API key exists
    if (!POSTHOG_KEY) {
      console.warn(
        "PostHog: Missing API key. Set POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_KEY env var."
      );
      // Return a no-op instance to prevent crashes
      return {
        capture: () => {},
        captureException: () => {},
        identify: () => {},
        shutdown: async () => {},
      } as unknown as PostHog;
    }

    posthogInstance = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
      // Flush immediately since server-side functions in Next.js can be short-lived
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogInstance;
}

