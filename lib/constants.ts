// ============================================================================
// Site Constants - Single Source of Truth for Site-wide Configuration
// ============================================================================

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";
export const SITE_NAME = "Rashid Iqbal";
export const SITE_TITLE = "Rashid Iqbal — Figma & Framer Expert";
export const SITE_DESCRIPTION = "Figma design, Framer development, and Chrome extensions. I build high-converting landing pages and websites. Fast delivery, pixel-perfect execution.";

export const AUTHOR = {
    name: "Rashid Iqbal",
    email: "rashid@founderfist.com",
    phone: "+923554665643",
    title: "Freelance Web Developer & Designer",
    location: "Remote",
};

export const SOCIAL_LINKS = {
    upwork: "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
    behance: "https://www.behance.net/thatgroot",
    contra: "https://contra.com/rashidiqbal",
    github: "https://github.com/thatgroot",
    linkedin: "https://www.linkedin.com/in/callmerashidiqbal/",
    twitter: "https://x.com/rashidrealme",
    whatsapp: "https://wa.me/923554665643",
    calcom: "https://cal.com/rashid.iqbal",
    framerExpert: "https://www.framer.com/@rashidiqbal",
} as const;

export const SOCIAL_HANDLES = {
    twitter: "@rashidrealme",
    linkedin: "callmerashidiqbal",
    github: "thatgroot",
} as const;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BZT67TX18E";

// SEO defaults
export const DEFAULT_OG_IMAGE = `${SITE_URL}/api/og`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/api/og`;

// Structured data identifiers
export const SCHEMA_IDS = {
    person: `${SITE_URL}#person`,
    organization: `${SITE_URL}#organization`,
    website: `${SITE_URL}#website`,
    service: `${SITE_URL}#service`,
} as const;
