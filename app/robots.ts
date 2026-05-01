import { MetadataRoute } from 'next';
import { SITE_URL as siteUrl } from '@/lib/constants';

// AI search crawlers (allow - these power search features)
const AI_SEARCH_CRAWLERS = [
  'OAI-SearchBot',    // ChatGPT search results
  'ChatGPT-User',     // ChatGPT browsing
  'GPTBot',           // OpenAI general
  'ClaudeBot',        // Anthropic Claude
  'Claude-SearchBot', // Claude search
  'Google-Extended',  // Google AI / Gemini
  'PerplexityBot',    // Perplexity search
  'Amazonbot',        // Amazon Alexa / search
  'CCBot',            // Common Crawl (AI training data)
  'cohere-ai',        // Cohere
  'Bytespider',       // ByteDance / TikTok
  'YouBot',           // You.com search
  'Applebot-Extended', // Apple Intelligence
];

// Crawl policy:
// - /_next/ is INTENTIONALLY allowed. Googlebot needs /_next/static/*
//   JS + CSS to render the page; blocking it hides the SSR-hydrated
//   content from indexing. Semrush also flags blocked /_next/ as
//   "disallowed internal resources" (was 1,500+ failures on the audit).
// - /api/og + /api/blog-og are allowed because they back Open Graph
//   images referenced from meta tags; social-card crawlers must fetch
//   them. Same logic as /_next/.
// - /dashboard, /api/dashboard, /portal, /api/portal, /api/track are
//   blocked — admin / portal / first-party tracking, not for indexing.
const COMMON_DISALLOW = [
  '/dashboard/',
  '/api/dashboard/',
  '/portal/',
  '/api/portal/',
  '/api/track',
  '/api/lead',
  '/api/auth/',
  '/api/cron/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      // AI search crawlers get the same policy. (Previously listed
      // explicit allow paths, but `allow: /` already covers them and
      // an explicit list misses any new public route.)
      ...AI_SEARCH_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: COMMON_DISALLOW,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
