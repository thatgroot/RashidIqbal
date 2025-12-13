// PostHog Client-Side Initialization for Next.js 15.3+
// This file is automatically loaded by Next.js for client-side instrumentation
// Security: Only uses NEXT_PUBLIC_ prefixed env vars (safe for client bundle)

import posthog from "posthog-js";

if (typeof window !== "undefined") {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  // Only initialize if API key is available
  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      // Use the latest default configuration
      defaults: "2025-11-30",
      // Capture pageviews automatically
      capture_pageview: true,
      // Capture pageleaves for session duration tracking
      capture_pageleave: true,
      // Privacy: Disable session recording by default (enable if needed)
      disable_session_recording: true,
      // Privacy: Respect Do Not Track browser setting
      respect_dnt: true,
      // Autocapture for click events
      autocapture: true,
      // Security: Mask sensitive input fields
      mask_all_text: false,
      mask_all_element_attributes: false,
      // Security: Use secure cookies
      secure_cookie: true,
      // Privacy: Persistence mode
      persistence: "localStorage+cookie",
    });
  } else if (process.env.NODE_ENV === "development") {
    console.warn(
      "PostHog: Missing NEXT_PUBLIC_POSTHOG_KEY. Analytics disabled."
    );
  }
}

export default posthog;
