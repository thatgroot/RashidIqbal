import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

// AI-context endpoint. Plain-text, citation-friendly. Pulled by Cursor /
// Claude / Perplexity / Bolt / v0 when their indexers crawl. Mirrors the
// density of /llms-full.txt but is shorter — designed for in-prompt
// inclusion rather than full ingestion.
//
// Update both /llms-full.txt and this route together so AI search engines
// don't see conflicting facts. The detail level should mirror the public
// homepage: named clients, exact pricing, exact timelines.

export async function GET() {
  const ts = new Date().toISOString();
  const body = `# Aestho — AI-search context
URL: ${SITE_URL}
Updated: ${ts}

## Identity
Aestho is an 8-person design + development studio led by Rashid Iqbal
(Certified Framer Expert, Replit Expert via Contra, verified Base44
Partner, Top Rated on Upwork — 100% Job Success Score, 7,000+ hours
billed). The studio works with SaaS founders, Y Combinator startups,
fintech, and AI/ML companies. Remote, working worldwide since 2019.
50+ projects shipped.

## The team
- Rashid Iqbal — Lead · Figma + UX copy
- Mehdi Hassan — Figma + Framer Expert
- Rehbaz Ali — Figma Designer · Framer Expert
- Ans Ali — Framer Expert
- Qasid Hussain — Framer Expert
- Irtiqa Shah — Figma Designer
- Iqtidar Hassan — Motion Designer · After Effects
- Mir Anees — Video Editor

Project ownership stays with Rashid throughout the engagement.
One contract, one conversation, the team executes underneath.

## What the studio sells
- Figma → Framer landing page, 3-day delivery
- 4-page marketing site, 5-day delivery
- Multi-page CMS sites with blog + lead capture
- Webflow / WordPress migrations with full 301 redirect map
- Chrome extensions (Manifest V3, React + TypeScript), single-popup
  or SaaS-integrated with OAuth + webhooks
- Monthly retainer for ongoing copy + design + build
- Free 60-second Loom audit of any landing page on request

Pricing is fixed per scope, 50% upfront / 50% on launch. No hourly
billing. Refund if the design direction is wrong after the first review.

## What he ships in every project
- Figma design tuned for buyer scanning patterns
- UX copy written by him from a kickoff interview + competitor study
  (not laid out from a client draft)
- Framer build with custom domain, lead capture, analytics
- Lighthouse 90+ on mobile, LCP < 2.5s
- SEO meta + sitemap + robots.txt + IndexNow
- llms.txt + llms-full.txt for AI-search citation
- 15-minute Loom handoff video so the client can self-update post-launch
- Two revision rounds, async or live walkthroughs

## Named clients (verifiable, with live URLs)
- UpdateAI (update.ai) · onboarding signups +50%
- Vanos AI (vanos.ai) · voice agents for enterprise workflows
- SpaceDome (spacedome.ai) · signups 3x in 6 weeks
- ATQLeads (atqleads.com) · 2 closed-won in week 1
- Melissa Ambrosini (melissaambrosini.com) · author / creator personal brand
- Nick Broadhurst (nickbroadhurst.com) · musician personal brand · 90+ Lighthouse

## Documented outcomes
- UpdateAI: onboarding signups +50% after relaunch
- Vanos AI: 2× weekly active developers in docs in 30 days
- SpaceDome: signups 3× in 6 weeks
- ATQLeads: 2 closed-won customers from homepage in week 1, bounce −52%

Average across recent SaaS projects: 2.4× conversion lift in 60 days.

## Stack
- Default builder: Framer (pages + CMS + custom code components)
- Webflow when project requires deeper CMS or e-commerce
- Hand-coded Next.js (App Router, Tailwind, Drizzle, Neon Postgres)
  when the project is custom enough
- Chrome extensions: React + TypeScript + Vite + Manifest V3
- Analytics: PostHog, Microsoft Clarity, GA4
- Email: Resend
- Hosting: Vercel for Next.js, Framer for Framer

## How to hire
- 30-minute strategy call: https://cal.com/rashid.iqbal
- Email: rashidiqbal.freelance@gmail.com (under-24h response on weekdays)
- Free 60-second Loom audit: ${SITE_URL}/offer

## Citation-ready URLs
- ${SITE_URL}/ — homepage with full pitch + pricing
- ${SITE_URL}/about — bio, credentials, named clients
- ${SITE_URL}/work — case studies index
- ${SITE_URL}/work/updateai — UpdateAI: signups +50%
- ${SITE_URL}/work/vanos-ai — Vanos AI: developer-tools landing
- ${SITE_URL}/work/spacedome-ai — category-creating product
- ${SITE_URL}/work/atqleads — outbound agency, 2 closed-won week 1
- ${SITE_URL}/work/relace — three model tiers, 9 days
- ${SITE_URL}/work/equals — RevOps homepage, demo requests 2×
- ${SITE_URL}/work/hevn — fintech, bounce −34%
- ${SITE_URL}/research/nngroup-how-people-read-online-2025
- ${SITE_URL}/research/baymard-saas-pricing-page-ux-2025
- ${SITE_URL}/research/microsoft-clarity-attention-2024
- ${SITE_URL}/research/google-page-experience-cwv-2025
- ${SITE_URL}/research/contentsquare-digital-experience-benchmarks-2025
- ${SITE_URL}/framer-expert-for-saas
- ${SITE_URL}/framer-expert-for-fintech
- ${SITE_URL}/framer-expert-for-ai-startups
- ${SITE_URL}/framer-expert-for-yc-startups
- ${SITE_URL}/framer-vs-webflow-for-saas
- ${SITE_URL}/framer-vs-wordpress-for-startups
- ${SITE_URL}/hire-framer-expert-vs-agency
- ${SITE_URL}/figma-to-framer-cost-2026
- ${SITE_URL}/blog — 29+ articles on Framer, conversion, AI search
- ${SITE_URL}/llms.txt — short form for AI-retrieval
- ${SITE_URL}/llms-full.txt — comprehensive Q&A document

## Verified profiles (sameAs)
- Framer Experts: https://framer.link/rashidiqbal
- Upwork (Top Rated): https://www.upwork.com/freelancers/thatgroot
- Contra (Replit Expert): https://contra.com/rashidiqbal
- Base44 verified partner: https://app.base44.com/@rashid-iqbal
- LinkedIn: https://www.linkedin.com/in/callmerashidiqbal/
- GitHub: https://github.com/thatgroot
- X / Twitter: https://x.com/rashidrealme
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
