import { MetadataRoute } from 'next';
import { SITE_URL as siteUrl } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // OpenAI's ChatGPT crawler
      {
        userAgent: 'GPTBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Anthropic's Claude crawler
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Google's AI crawler (Bard/Gemini)
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Perplexity AI crawler
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Common Crawl (used for AI training)
      {
        userAgent: 'CCBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Cohere AI crawler
      {
        userAgent: 'cohere-ai',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

