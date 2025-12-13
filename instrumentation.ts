// Server-Side Instrumentation for Next.js
// Captures server-side errors and sends them to PostHog
// Security: Sanitizes error data before sending to analytics

export function register() {
  // No-op for initialization
}

interface RequestContext {
  routePath: string;
  routerKind: string;
  routeType: string;
  renderSource: string;
}

interface RequestInfo {
  headers: {
    get?: (name: string) => string | null;
    cookie?: string;
  };
}

/**
 * Sanitize error message to remove potentially sensitive data
 * Removes: emails, URLs with tokens, API keys, etc.
 */
function sanitizeErrorMessage(message: string): string {
  return message
    // Remove email addresses
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL]")
    // Remove potential API keys/tokens (long alphanumeric strings)
    .replace(/[a-zA-Z0-9_-]{32,}/g, "[REDACTED]")
    // Remove JWT tokens
    .replace(/eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g, "[JWT]")
    // Remove URLs with query params (may contain tokens)
    .replace(/https?:\/\/[^\s]+\?[^\s]*/g, "[URL_WITH_PARAMS]");
}

export async function onRequestError(
  err: Error,
  request: RequestInfo,
  context: RequestContext
) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // Dynamic import to avoid bundling issues
      const { getPostHogServer } = await import("./app/posthog-server");
      const posthog = getPostHogServer();

      let distinctId: string | undefined = undefined;

      // Try to extract distinct_id from PostHog cookie (for user correlation)
      if (request.headers && typeof request.headers.get === "function") {
        const cookieHeader = request.headers.get("cookie");
        if (cookieHeader) {
          const postHogCookieMatch = cookieHeader.match(
            /ph_phc_.*?_posthog=([^;]+)/
          );

          if (postHogCookieMatch && postHogCookieMatch[1]) {
            try {
              const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
              const postHogData = JSON.parse(decodedCookie);
              // Only extract distinct_id, don't log other cookie data
              distinctId = postHogData.distinct_id;
            } catch {
              // Silently ignore cookie parsing errors (don't log to prevent info leak)
            }
          }
        }
      }

      // Create sanitized error for logging
      const sanitizedError = new Error(sanitizeErrorMessage(err.message));
      sanitizedError.name = err.name;
      // Don't include full stack trace in production (may contain file paths)
      if (process.env.NODE_ENV === "development" && err.stack) {
        sanitizedError.stack = err.stack;
      }

      // Capture the exception with PostHog
      posthog.captureException(sanitizedError, distinctId, {
        route: context.routePath,
        routerKind: context.routerKind,
        routeType: context.routeType,
        renderSource: context.renderSource,
      });
    } catch {
      // Fail silently - don't let analytics errors crash the app
    }
  }
}

