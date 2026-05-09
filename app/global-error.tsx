"use client"; // Error boundaries must be Client Components

import posthog from"posthog-js";
import { useEffect } from"react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to PostHog
    posthog.captureException(error, {
      digest: error.digest,
      scope:"global",
    });
  }, [error]);

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body>
        <div
          style={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"1rem",
            fontFamily:"system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign:"center", maxWidth:"400px" }}>
            <div style={{ marginBottom:"1.5rem" }}>
              <svg
                style={{
                  margin:"0 auto",
                  height:"64px",
                  width:"64px",
                  color:"#71717a",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2
              style={{
                fontSize:"1.5rem",
                fontWeight: 600,
                color:"#18181b",
                marginBottom:"0.5rem",
              }}
            >
              Something went wrong
            </h2>
            <p style={{ color:"#52525b", marginBottom:"1.5rem" }}>
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                display:"inline-flex",
                alignItems:"center",
                justifyContent:"center",
                padding:"0.625rem 1.25rem",
                backgroundColor:"#18181b",
                color:"white",
                fontWeight: 500,
                borderRadius:"0.5rem",
                border:"none",
                cursor:"pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

