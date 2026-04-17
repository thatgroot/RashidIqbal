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

const aiCrawlerAllow = ['/', '/blog/', '/contact', '/links', '/llms.txt', '/llms-full.txt', '/api/llms-context', '/api/oembed'];
const aiCrawlerDisallow = ['/_next/', '/api/og'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/og'],
      },
      // All AI search crawlers get full access
      ...AI_SEARCH_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: aiCrawlerAllow,
        disallow: aiCrawlerDisallow,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
