import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A/B test proxy: split `/` visitors into cohort A (current homepage) and
// cohort B (stripped landing page at `/offer`). URL stays `/` in both cohorts
// via NextResponse.rewrite (not redirect).
//
// Behavior by environment:
//   - production: sticky 30-day cookie. Once a visitor is assigned A or B,
//     they stay in that cohort for 30 days. Correct A/B-test behavior.
//   - development: NOT sticky. Every request re-rolls 50/50 so you can
//     watch the split happen by refreshing.
//
// Every response sets header `x-ab-home: A|B`. Inspect in DevTools Network
// to see which cohort the request got.

const COOKIE = "ab_home";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const IS_PROD = process.env.NODE_ENV === "production";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname !== "/") return NextResponse.next();

  const existing = req.cookies.get(COOKIE)?.value;

  let variant: "A" | "B";
  if (IS_PROD && (existing === "A" || existing === "B")) {
    variant = existing;
  } else {
    variant = Math.random() < 0.5 ? "A" : "B";
  }

  const res =
    variant === "B"
      ? NextResponse.rewrite(new URL("/offer", req.url))
      : NextResponse.next();

  if (IS_PROD) {
    res.cookies.set(COOKIE, variant, {
      path: "/",
      maxAge: MAX_AGE,
      sameSite: "lax",
      secure: true,
    });
  }

  res.headers.set("x-ab-home", variant);
  // Prevent any layer (CDN, browser, Next cache) from reusing one cohort's
  // response for the other cohort's request.
  res.headers.set("Cache-Control", "no-store, max-age=0");
  res.headers.set("Vary", "Cookie");

  return res;
}

export const config = {
  matcher: ["/"],
};
