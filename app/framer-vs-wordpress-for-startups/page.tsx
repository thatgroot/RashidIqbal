import type { Metadata } from"next";
import { SITE_URL } from"@/lib/constants";
import { ComparisonPage, type ComparisonConfig } from"@/components/landing/comparison-page";

const PAGE_PATH ="/framer-vs-wordpress-for-startups";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title:"Framer vs WordPress for Startups (2026)",
  description:
"Framer or WordPress for a startup marketing site? Direct answer: Framer for speed, performance, and zero maintenance. WordPress only when you need a deep plugin ecosystem.",
  keywords: ["framer vs wordpress","startup website framer wordpress"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:"Framer vs WordPress for Startups (2026)",
    description:
"Framer for speed, performance, and zero maintenance. WordPress only when you need a deep plugin ecosystem. Side-by-side breakdown for startup founders.",
    url: PAGE_URL,
    type:"article",
  },
};

const config: ComparisonConfig = {
  pagePath: PAGE_PATH,
  pageUrl: PAGE_URL,
  eyebrow:"Comparison · 2026",
  h1:"Framer vs WordPress for startups",
  directAnswer:
"Pick Framer. WordPress made sense when you needed a plugin for everything; in 2026 most startup marketing sites need fast pages, a clean CMS for blog posts, and zero infrastructure work. Framer ships all three out of the box. WordPress still wins for content-heavy sites with complex plugin requirements (LMS, large e-commerce, membership communities).",
  intro:
"WordPress powers ~43% of the web, but most of that is legacy. For a startup launching a marketing site in 2026, the speed-to-market and performance defaults of Framer win. WordPress's strength is the plugin ecosystem, pick it when that matters more than ship time.",
  leftLabel:"Framer",
  rightLabel:"WordPress",
  rows: [
    { feature:"Time to launch (marketing site)", left:"Days", right:"1–3 weeks" },
    { feature:"Hosting / infra setup", left:"Included", right:"Required (Kinsta, WP Engine)" },
    { feature:"Plugin updates / security patches", left:"None needed", right:"Weekly" },
    { feature:"Lighthouse mobile (default)", left:"90+", right:"60–80" },
    { feature:"Blog / CMS", left:"yes", right:"yes" },
    { feature:"E-commerce", left:"no (use Shopify)", right:"yes (WooCommerce)" },
    { feature:"Plugin ecosystem", left:"no", right:"yes (60k+)" },
    { feature:"Membership / LMS", left:"no", right:"yes" },
    { feature:"Visual page builder", left:"yes (canvas)", right:"yes (Elementor / Bricks)" },
    { feature:"Design parity with Figma", left:"yes", right:"no" },
    { feature:"Free tier", left:"yes (subdomain)", right:"yes (WordPress.com only)" },
  ],
  whoShould: [
    {
      name:"Pick Framer if",
      bullets: [
"Marketing site, blog, careers, case studies, under 20 pages",
"You don't want to manage hosting or plugin updates",
"Designer-led (or no designer at all, using AI Workshop)",
"Speed and Core Web Vitals matter",
      ],
    },
    {
      name:"Pick WordPress if",
      bullets: [
"You need WooCommerce / membership / LMS / forum",
"Site is content-heavy with 500+ posts and complex taxonomies",
"Existing WordPress dev team in-house",
"Plugin ecosystem dependency (BuddyPress, LearnDash, etc.)",
      ],
    },
  ],
  faqs: [
    {
      q:"Is Framer better for SEO than WordPress?",
      a:"By default, yes, Framer renders SSR HTML with cleaner Core Web Vitals. WordPress can match this with the right hosting + cache plugins, but out-of-the-box Framer wins on Lighthouse mobile by 10–20 points.",
    },
    {
      q:"Can I migrate from WordPress to Framer?",
      a:"Yes. Posts migrate via export-import; pages get rebuilt cleanly in Framer. 301 redirects preserve SEO equity. Most migrations take 2–3 weeks. The exception is sites with heavy plugin dependencies (forums, e-commerce, memberships), those usually need to stay on WordPress or move to a dedicated platform like Shopify.",
    },
    {
      q:"What about cost?",
      a:"Framer is a single monthly hosting fee with no infra. WordPress is technically free but realistically requires managed hosting (Kinsta, WP Engine) plus plugin licenses. Net: Framer is cheaper for most startup marketing sites.",
    },
    {
      q:"Is Framer overkill for a tiny site?",
      a:"No, even a 3-page site benefits from Framer's speed and zero-maintenance hosting. The free tier (1k visitors/month, no custom domain) handles a tiny launch site without paying anything.",
    },
  ],
};

export default function FramerVsWordpressPage() {
  return <ComparisonPage config={config} />;
}
