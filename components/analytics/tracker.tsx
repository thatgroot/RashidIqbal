"use client";

import { useEffect, useRef } from"react";
import { usePathname, useSearchParams } from"next/navigation";

// ----------------------------------------------------------------------------
// Self-hosted tracker
//
// Mounted once in app/layout.tsx. Responsibilities:
//
//  1. Cookies — `aestho_v` (visitor, 1 year) + `aestho_s` (session, 30-min
//     sliding TTL). Generated client-side, validated server-side.
//  2. Pageview — fires on mount and on every pathname change.
//  3. Click delegation — every <a> and <button> click. Uses data-track when
//     present for fidelity, falls back to aria-label / text.
//  4. Scroll milestones — 25 / 50 / 75 / 100 % per page, fired once each.
//  5. Form events — capture `submit` on every <form>.
//  6. Batching — events accumulate in a buffer, flushed every 4s. On
//     pagehide we use sendBeacon so the last batch survives the unload.
//  7. DNT respect — bails out entirely if navigator.doNotTrack ==="1" or
//     localStorage.aestho_track_off ==="1".
// ----------------------------------------------------------------------------

type QueuedEvent = {
  type:"pageview" |"click" |"scroll" |"form_view" |"form_submit" |"cta_click" |"custom";
  path?: string;
  target?: string;
  properties?: Record<string, unknown>;
  ts?: number;
};

const COOKIE_VISITOR ="aestho_v";
const COOKIE_SESSION ="aestho_s";
const VISITOR_TTL_DAYS = 365;
const SESSION_TTL_MIN = 30;
const FLUSH_INTERVAL_MS = 4000;
const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]!) : null;
}

function writeCookie(name: string, value: string, ttlMs: number) {
  const expires = new Date(Date.now() + ttlMs).toUTCString();
  const secure = location.protocol ==="https:" ?"; Secure" :"";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax${secure}`;
}

function randomId(bytes = 16): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2,"0"))
    .join("");
}

function getVisitorId(): string {
  let v = readCookie(COOKIE_VISITOR);
  if (!v) {
    v = randomId(16);
    writeCookie(COOKIE_VISITOR, v, VISITOR_TTL_DAYS * 24 * 60 * 60 * 1000);
  }
  return v;
}

function getSessionToken(): string {
  let s = readCookie(COOKIE_SESSION);
  if (!s) {
    s = randomId(16);
  }
  // Slide the TTL on every read so the cookie effectively expires after
  // 30 min of inactivity, matching the server-side session window.
  writeCookie(COOKIE_SESSION, s, SESSION_TTL_MIN * 60 * 1000);
  return s;
}

function getClarityId(): string | undefined {
  // Clarity sets `_clck` and `_clsk` cookies. The `_clck` value is a
  // pipe-delimited string whose first segment is the clarity user id; we
  // store that against the session row so the dashboard can deep-link.
  const c = readCookie("_clck");
  if (!c) return undefined;
  return c.split("|")[0] || undefined;
}

// Paths the tracker never reports on. Admin's own dashboard activity is
// noise — Rashid is not a real visitor. /portal stays trackable so we can
// still see what clients are doing in their own space (counts as real
// visitor behavior).
const NEVER_TRACK_PREFIXES = ["/dashboard"] as const;

function isPathTrackable(path: string): boolean {
  return !NEVER_TRACK_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

function shouldOptOut(): boolean {
  try {
    if (navigator.doNotTrack ==="1") return true;
    if (localStorage.getItem("aestho_track_off") ==="1") return true;
    if (!isPathTrackable(location.pathname)) return true;
  } catch {
    // localStorage may throw in iframes / privacy modes — fall through to track.
  }
  return false;
}

function descTextOf(el: HTMLElement | null): string | undefined {
  if (!el) return undefined;
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 80);
  const txt = el.textContent?.replace(/\s+/g,"").trim();
  return txt ? txt.slice(0, 80) : undefined;
}

// Read first-touch UTM + referrer once per session.
function readSessionContext() {
  try {
    const url = new URL(location.href);
    return {
      referrer: document.referrer || undefined,
      utmSource: url.searchParams.get("utm_source") || undefined,
      utmMedium: url.searchParams.get("utm_medium") || undefined,
      utmCampaign: url.searchParams.get("utm_campaign") || undefined,
      landingPath: location.pathname,
    };
  } catch {
    return {};
  }
}

export function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queueRef = useRef<QueuedEvent[]>([]);
  const sentContextRef = useRef(false);
  const scrollFiredRef = useRef<Set<number>>(new Set());
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window ==="undefined") return;
    if (shouldOptOut()) return;

    const visitorId = getVisitorId();

    function flush(useBeacon = false) {
      if (queueRef.current.length === 0) return;
      const events = queueRef.current.splice(0, queueRef.current.length);

      const ctx = sentContextRef.current ? {} : readSessionContext();
      sentContextRef.current = true;

      const payload = {
        visitorId,
        sessionToken: getSessionToken(),
        events,
        clarityId: getClarityId(),
        ...ctx,
      };

      const body = JSON.stringify(payload);
      const url ="/api/track";

      if (useBeacon &&"sendBeacon" in navigator) {
        try {
          const blob = new Blob([body], { type:"application/json" });
          navigator.sendBeacon(url, blob);
          return;
        } catch {
          // fall through to fetch
        }
      }
      fetch(url, {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Drop the events. They'll be re-collected on the next interaction.
      });
    }

    function enqueue(ev: QueuedEvent) {
      // Drop everything fired from never-track paths (admin's /dashboard).
      // Click + scroll + form listeners are attached once at mount, so a
      // visitor navigating into /dashboard wouldn't otherwise be excluded.
      if (!isPathTrackable(location.pathname)) return;
      ev.ts = Date.now();
      ev.path = ev.path ?? location.pathname;
      queueRef.current.push(ev);
      // Hot-flush milestones (form_submit, cta_click) so leads aren't lost
      // if the visitor closes the tab a second after submit.
      if (ev.type ==="form_submit" || ev.type ==="cta_click") flush();
    }

    // ---------- Scroll milestones ----------
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= 0) return;
      const pct = Math.min(100, Math.round((scrolled / total) * 100));
      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !scrollFiredRef.current.has(m)) {
          scrollFiredRef.current.add(m);
          enqueue({ type:"scroll", properties: { pct: m } });
        }
      }
    }

    // ---------- Click delegation ----------
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target) return;
      // Climb to the nearest clickable: <a>, <button>, [role="button"], or
      // anything with data-track explicitly set.
      const el = target.closest<HTMLElement>(
"a, button, [role='button'], [data-track]"
      );
      if (!el) return;

      const dataTrack = el.getAttribute("data-track");
      const isLink = el.tagName ==="A";
      const isButton = el.tagName ==="BUTTON" || el.getAttribute("role") ==="button";

      const tag = dataTrack
        ? dataTrack
        : isLink
          ? `link:${(el as HTMLAnchorElement).getAttribute("href") ||""}`
          : isButton
            ? `button:${descTextOf(el) ||"anonymous"}`
            : `el:${el.tagName.toLowerCase()}`;

      const eventType = dataTrack || isButton ?"cta_click" :"click";

      enqueue({
        type: eventType,
        target: tag,
        properties: {
          text: descTextOf(el),
          href: isLink ? (el as HTMLAnchorElement).href : undefined,
        },
      });
    }

    // ---------- Form submit delegation ----------
    function onSubmit(e: SubmitEvent) {
      const form = e.target as HTMLFormElement | null;
      if (!form) return;
      const id =
        form.getAttribute("data-track") ||
        form.id ||
        form.getAttribute("name") ||
        form.action ||
"form";
      enqueue({ type:"form_submit", target: `form:${id}` });
    }

    // ---------- Wire up listeners ----------
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("submit", onSubmit, { capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const flushTimer = window.setInterval(() => flush(false), FLUSH_INTERVAL_MS);
    const onHide = () => flush(true);
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState ==="hidden") flush(true);
    });

    // Cleanup
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("submit", onSubmit, { capture: true });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onHide);
      window.clearInterval(flushTimer);
      flush(true);
    };
    // We only set up listeners once. Pageviews are handled in the next effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pageview — fires on mount and on every pathname/searchParams change.
  useEffect(() => {
    if (typeof window ==="undefined") return;
    if (shouldOptOut()) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    scrollFiredRef.current.clear();

    queueRef.current.push({
      type:"pageview",
      path: pathname || location.pathname,
      ts: Date.now(),
    });

    // Soft-flush on next tick so the pageview doesn't race with the click
    // that triggered the navigation.
    queueMicrotask(() => {
      // intentionally not awaited; see flush logic in the other effect
      const trySend = () => {
        const evs = queueRef.current.splice(0, queueRef.current.length);
        if (evs.length === 0) return;
        const ctx = sentContextRef.current ? {} : readSessionContext();
        sentContextRef.current = true;
        const body = JSON.stringify({
          visitorId: getVisitorId(),
          sessionToken: getSessionToken(),
          events: evs,
          clarityId: getClarityId(),
          ...ctx,
        });
        fetch("/api/track", {
          method:"POST",
          headers: {"Content-Type":"application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      };
      trySend();
    });
  }, [pathname, searchParams]);

  return null;
}
