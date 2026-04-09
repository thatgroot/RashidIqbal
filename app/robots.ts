import { MetadataRoute } from 'next';
import { SITE_URL as siteUrl } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/og'],
      },
      // OpenAI's ChatGPT crawler
      {
        userAgent: 'GPTBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Anthropic's Claude crawler
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Google's AI crawler (Bard/Gemini)
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Perplexity AI crawler
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Common Crawl (used for AI training)
      {
        userAgent: 'CCBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Cohere AI crawler
      {
        userAgent: 'cohere-ai',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // ByteDance crawler
      {
        userAgent: 'Bytespider',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
      // Amazon crawler
      {
        userAgent: 'Amazonbot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt', '/api/llms-context'],
        disallow: ['/_next/', '/api/og'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

