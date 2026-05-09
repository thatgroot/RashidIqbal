"use client";

import { useEffect, useState } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { Check, ExternalLink, Copy } from"@/components/icons";
import { X } from"lucide-react";
import { AUTHOR } from"@/lib/constants";

// Custom DOM event used by the hero, footer, and /contact"Email me"
// CTAs to summon this toast. Anything in the tree can dispatch it:
//
//   import { triggerEmailMe } from"@/components/shared/email-me-toast";
//   triggerEmailMe();
//
// Why a window event instead of a context provider? The toast lives in
// app/layout.tsx (client) and the CTAs are scattered across server +
// client components; a global event bus is the lightest hook-up.
const EMAIL_ME_EVENT ="rashid:email-me";

const TOAST_TIMEOUT_MS = 8000;

export function triggerEmailMe() {
  if (typeof window ==="undefined") return;
  window.dispatchEvent(new CustomEvent(EMAIL_ME_EVENT));
}

/**
 * Drop-in <button> wrapper that fires the email toast on click.
 * Lets server-component pages opt in without converting to client.
 */
export function EmailMeButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={triggerEmailMe}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * Floating bottom-center toast that fires whenever an"Email me" CTA is
 * clicked. Behavior:
 *  1. Email address copied to clipboard immediately.
 *  2. Toast appears confirming the copy + showing the address as text.
 *  3. Three webmail launchers (Gmail / Outlook / Yahoo) plus a native
 *     `mailto:` for users with a mail handler configured.
 *  4. Auto-dismisses after 8s; user can dismiss earlier.
 *
 * This is the"always works" pattern. Even if every link below fails,
 * the address is already on the clipboard so the user can paste it.
 */
export function EmailMeToast() {
  const [visible, setVisible] = useState(false);
  const [copyOk, setCopyOk] = useState(true);

  useEffect(() => {
    const handler = async () => {
      try {
        await navigator.clipboard.writeText(AUTHOR.email);
        setCopyOk(true);
      } catch {
        setCopyOk(false);
      }
      setVisible(true);
    };
    window.addEventListener(EMAIL_ME_EVENT, handler);
    return () => window.removeEventListener(EMAIL_ME_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(() => setVisible(false), TOAST_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [visible]);

  const enc = encodeURIComponent(AUTHOR.email);
  const subject = encodeURIComponent("New project for Rashid");
  const composers = [
    {
      name:"Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc}&su=${subject}`,
    },
    {
      name:"Outlook",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc}&subject=${subject}`,
    },
    {
      name:"Yahoo",
      href: `https://compose.mail.yahoo.com/?to=${enc}&subj=${subject}`,
    },
    {
      name:"Default app",
      href: `mailto:${AUTHOR.email}?subject=${subject}`,
      sameTab: true,
    },
  ];

  async function manualCopy() {
    try {
      await navigator.clipboard.writeText(AUTHOR.email);
      setCopyOk(true);
    } catch {
      setCopyOk(false);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type:"spring", stiffness: 260, damping: 24 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[min(440px,calc(100vw-2rem))] bg-[#0a0a0a] text-white rounded-md shadow-black/30 border border-zinc-800 p-4"
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                copyOk
                  ?"bg-[#0a0a0a]/15 border border-emerald-500/40"
                  :"bg-[#0a0a0a]/15 border border-[#0a0a0a]/40"
              }`}
            >
              {copyOk ? (
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4 text-[#fde8a3]" aria-hidden="true" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-tight mb-1">
                {copyOk ?"Email copied to clipboard" :"Email me at"}
              </p>
              <button
                type="button"
                onClick={manualCopy}
                title="Copy email address"
                className="inline-flex items-center gap-1.5 text-[0.75rem] text-zinc-200 font-mono mb-3 hover:text-white transition-colors text-left break-all"
              >
                <span>{AUTHOR.email}</span>
                <Copy className="w-3 h-3 opacity-60 shrink-0" aria-hidden="true" />
              </button>

              <p className="text-[0.625rem] font-mono text-[#737373] uppercase tracking-[0.18em] mb-2">
                Or compose in
              </p>
              <div className="flex flex-wrap gap-1.5">
                {composers.map((c) => (
                  <a
                    key={c.name}
                    href={c.href}
                    {...(!c.sameTab
                      ? { target:"_blank", rel:"noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[0.6875rem] font-bold bg-[#0a0a0a] hover:bg-zinc-700 active:bg-zinc-700 rounded transition-colors"
                  >
                    {c.name}
                    <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Dismiss"
              className="text-[#737373] hover:text-white transition-colors shrink-0 -m-1 p-1"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
