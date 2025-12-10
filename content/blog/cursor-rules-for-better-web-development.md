---
title: "Cursor Rules: The Secret to Consistent, High-Quality Code with AI"
description: "Learn how to use Cursor rules to enforce performance, accessibility, SEO, and AI visibility standards across your entire codebase. A practical guide with real examples."
date: "2025-01-20"
author:
  name: "Rashid Iqbal"
  twitter: "@rashidiqbal"
  linkedin: "rashidiqbal"
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&q=80"
tags: ["cursor", "AI development", "web development", "accessibility", "SEO", "performance", "Next.js"]
category: "Development"
published: true
featured: true
seoTitle: "Cursor Rules for Web Development | Performance, A11y & SEO Guide"
seoDescription: "Master Cursor rules to build faster, more accessible websites. Complete guide with real-world examples for Next.js projects."
twitterCard: "summary_large_image"
linkedinTitle: "Cursor Rules: Build Better Websites with AI Assistance"
linkedinDescription: "The complete guide to using Cursor rules for enforcing web standards. Performance, accessibility, and SEO—automated."
---

# Cursor Rules: The Secret to Consistent, High-Quality Code with AI

AI coding assistants are powerful. But without guardrails, they produce inconsistent, sometimes problematic code.

The solution? **Cursor Rules**—project-specific instructions that ensure every AI-generated line of code meets your standards for performance, accessibility, and SEO.

After implementing these rules across multiple projects, I've seen:

- **90% reduction** in accessibility issues
- **Consistent Core Web Vitals** scores across all pages
- **AI/LLM visibility** that most developers don't even know exists

Here's my complete playbook.

## What Are Cursor Rules?

Cursor rules are markdown files that live in your `.cursor/rules/` directory. They tell the AI assistant how to write code for your specific project.

Your project structure should look like this:

- `your-project/`
  - `.cursor/`
    - `rules/`
      - `global-best-practices.mdc`
      - `seo.mdc`
  - `app/`
  - `components/`

The `alwaysApply: true` flag means these rules apply to every file matching the glob pattern—automatically.

## Rule #1: Image Optimization

Every unoptimized image is a conversion killer. Here's how I enforce proper image handling:

**The Rule:**

- Always use `next/image` instead of standard `<img>` tags
- Use the `sizes` prop for responsive images
- Avoid layout shift by specifying `width`/`height` or using `fill`
- Use `priority` for LCP images (hero sections)
- Provide descriptive `alt` text; use `alt=""` for decorative images

**Example Implementation:**

```tsx
<div className="relative h-64">
  <Image
    fill
    src="/hero.png"
    alt="Dashboard showing conversion metrics"
    sizes="(max-width: 768px) 100vw, 50vw"
    priority
    className="object-cover"
  />
</div>
```

**Why this matters:** A single unoptimized image can tank your Core Web Vitals. This rule ensures every image is automatically optimized, lazy-loaded, and properly sized.

## Rule #2: Accessibility (A11y)

Accessibility isn't optional—it's a legal requirement in many jurisdictions. And frankly, it's just good engineering.

**The Standards:**

- **Semantic HTML**: Use `<section>`, `<article>`, `<nav>`, `<button>` appropriately
- **Accessible names**: All interactive elements need text, `aria-label`, or `aria-labelledby`
- **Decorative elements**: Hide with `aria-hidden="true"`
- **Contrast ratios**: WCAG AA minimum (4.5:1 for normal text)
- **Heading hierarchy**: Sequential levels (h1 → h2 → h3)
- **Focus states**: All interactive elements must have visible focus indicators

**Bad Example:**

```tsx
<div onClick={handleClick}>Click me</div>
```

**Good Example:**

```tsx
<button 
  onClick={handleClick}
  className="focus-visible:ring-2 focus-visible:ring-orange-500"
>
  Click me
</button>
```

**The rule enforces:**

- No `div` or `span` for clickable elements
- Proper focus management
- Screen reader compatibility
- Keyboard navigation support

## Rule #3: Next.js Metadata API

Manual `<meta>` tags in the `<head>` are a code smell. Next.js has a Metadata API—use it.

**The Standards:**

- Always use `export const metadata: Metadata` for SEO
- Never use manual `<meta>` tags in `<head>`
- Use `metadata.other` for custom tags (geo, PWA)
- Use `metadata.appleWebApp` for PWA Apple tags
- Use `metadata.icons` for favicons
- Use `metadata.verification` for search console codes

**Example Implementation:**

```tsx
export const metadata: Metadata = {
  title: 'Page Title | Brand',
  description: 'Compelling description under 160 characters',
  openGraph: {
    title: 'Page Title',
    description: 'Description for social sharing',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
};
```

**What stays in `<head>` (manual tags):**

- `<link rel="preconnect">` (performance)
- `<link rel="dns-prefetch">` (performance)
- Dynamic oEmbed links
- Custom `rel="alternate"` links

## Rule #4: AI/LLM Visibility (The Hidden Edge)

Here's what 99% of developers miss: **AI chatbots are the new search engines.**

When someone asks ChatGPT "find me a web developer in Pakistan" or "who builds high-converting landing pages," will your site be referenced?

**Required Files for AI Visibility:**

| File | Location | Purpose |
|------|----------|---------|
| `sitemap.ts` | `app/` | Dynamic sitemap |
| `robots.ts` | `app/` | Crawler rules + AI bots |
| `llms.txt` | `public/` | AI-readable summary |
| `llms-full.txt` | `public/` | Detailed AI context |
| `feed.xml` | `app/feed.xml/route.ts` | RSS for syndication |

**robots.ts must include rules for:**

- GPTBot (ChatGPT)
- ClaudeBot (Anthropic)
- Google-Extended (Gemini)
- PerplexityBot
- CCBot (Common Crawl)
- cohere-ai

**My `llms.txt` structure:**

```txt
# Your Name - Professional Title

> One-line description of what you do.

## Services
- Service 1: Description
- Service 2: Description

## Tech Stack
- Frontend: Next.js, React, TypeScript
- Mobile: Expo, Flutter

## Contact
- Website: https://yoursite.com
- Pricing: https://yoursite.com/#pricing
```

This file is specifically designed for AI systems to understand and cite your content.

## Rule #5: Performance Patterns

Performance rules prevent death by a thousand cuts.

**DOM Size Optimization:**

- Avoid excessive wrapper divs
- Use CSS pseudo-elements (`::before`, `::after`) for styling
- Extract repeated patterns to CSS classes

**Script Handling:**

- Use `next/script` with `strategy="afterInteractive"`
- Never use `dangerouslySetInnerHTML` for scripts
- Place Google Analytics after `</body>`, inside `</html>`

**Bad Example:**

```tsx
<script dangerouslySetInnerHTML={{ __html: '...' }} />
```

**Good Example:**

```tsx
import Script from 'next/script';

<Script id="analytics" strategy="afterInteractive">
  {`// your code`}
</Script>
```

**Third-Party Libraries (Next.js way):**

```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

// In your layout, place after body
<body>{children}</body>
<GoogleAnalytics gaId="G-XXXXXX" />
```

## Rule #6: Structured Data

Rich snippets in search results come from structured data.

**Include schema.org markup for:**

- `Person` or `Organization` (site-wide)
- `WebSite` with search action
- `FAQPage` for FAQ sections
- `Article` for blog posts
- `BreadcrumbList` for navigation

**Implementation Example:**

```tsx
function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    jobTitle: 'Web Developer',
    url: 'https://yoursite.com',
    sameAs: [
      'https://twitter.com/handle',
      'https://linkedin.com/in/handle',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## The Complete Rules File

Here's my production-ready rule file structure:

**File: `.cursor/rules/global-best-practices.mdc`**

```yaml
---
description: Global Best Practices
globs: **/*.tsx, **/*.ts, **/*.css
alwaysApply: true
---
```

**Content to include:**

1. **Images** - Use `next/image` exclusively, always include `sizes`, use `priority` for LCP
2. **Accessibility** - Semantic HTML, accessible names, `aria-hidden` for decorative elements
3. **SEO** - Use Metadata API, canonical URLs, JSON-LD structured data
4. **Performance** - `next/script` for scripts, `@next/third-parties` for analytics

## Results You Can Expect

After implementing these rules:

| Metric | Before | After |
|--------|--------|-------|
| Lighthouse Performance | 72 | 98 |
| Lighthouse Accessibility | 84 | 100 |
| Lighthouse SEO | 89 | 100 |
| Core Web Vitals | 1/3 passing | 3/3 passing |
| AI Citations | 0 | Appearing in ChatGPT responses |

## Implementation Checklist

Ready to level up your development workflow?

1. **Create `.cursor/rules/` directory** in your project root
2. **Add `global-best-practices.mdc`** with your standards
3. **Add `seo.mdc`** for SEO-specific rules
4. **Create `llms.txt`** in your `public/` folder
5. **Update `robots.ts`** to include AI crawler rules
6. **Test with Lighthouse** to verify improvements

## The Compound Effect

Here's the magic: these rules apply to every file, every time. No more inconsistent code. No more "I forgot to add alt text." No more manual checks.

The AI becomes an extension of your standards, not a source of technical debt.

**That's how you build websites that rank, convert, and last.**

---

*Want to see these rules in action? [Check out my work →](/#work)*

*Need help implementing this in your project? [Let's talk →](/#pricing)*
