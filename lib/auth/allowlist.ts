// Single-source-of-truth admin allowlist. Server-side only.
// Adding more emails here is enough — no DB row needed.
const FALLBACK_EMAIL = "rashidiqbal.freelance@gmail.com";

export function getAllowedEmails(): string[] {
  const env = process.env.DASHBOARD_ALLOWED_EMAIL;
  if (!env) return [FALLBACK_EMAIL];
  return env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email: string): boolean {
  return getAllowedEmails().includes(email.trim().toLowerCase());
}
