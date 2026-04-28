// Central catalogue of event targets used across the site. Strings live here
// so the dashboard's "top buttons" view can rely on a stable namespace.
//
// Naming: `<surface>.<element>.<id?>` — lowercase, dot-separated, hyphens
// inside segments. Examples: hero.cta.email, offer.tier.four-page.

export const EVENT_TARGETS = {
  // Hero rotating CTA on the homepage
  HERO_CTA_BOOK: "hero.cta.book",
  HERO_CTA_EMAIL: "hero.cta.email",
  HERO_CTA_HIRE: "hero.cta.hire",
  // Offer banner above the hero
  OFFER_BANNER: "offer.banner",
  // /offer page tier picks
  OFFER_TIER_LANDING: "offer.tier.landing-page",
  OFFER_TIER_FOUR_PAGE: "offer.tier.four-page-site",
  OFFER_FORM_SUBMIT: "offer.form.submit",
  OFFER_BOOK_CALL_FOOTER: "offer.cta.book-call.footer",
  // /pricing inline form
  PRICING_FORM_OPEN: "pricing.form.open",
  PRICING_FORM_SUBMIT: "pricing.form.submit",
  // /contact form
  CONTACT_FORM_SUBMIT: "contact.form.submit",
  CONTACT_GMAIL_FALLBACK: "contact.cta.gmail",
  // Footer
  FOOTER_EMAIL: "footer.cta.email",
  // Email-me toast (triggered from hero/footer/contact)
  EMAIL_TOAST_OPEN: "email-toast.open",
  EMAIL_TOAST_GMAIL: "email-toast.cta.gmail",
  EMAIL_TOAST_OUTLOOK: "email-toast.cta.outlook",
  EMAIL_TOAST_YAHOO: "email-toast.cta.yahoo",
  EMAIL_TOAST_NATIVE: "email-toast.cta.native",
  EMAIL_TOAST_COPY: "email-toast.cta.copy",
} as const;

export type EventTarget = (typeof EVENT_TARGETS)[keyof typeof EVENT_TARGETS];
