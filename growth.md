# Growth Plan — 18 Things to Win More Clients in the Next 90 Days

## Context

Aestho already converts the visitors who reach it. The site has good copy, real social proof, a working pricing page, a productized offer at `/offer`, a SaaS-focused blog, dashboard analytics on real visitor behavior, a working portal for shipped projects, and a Pusher-driven realtime stack. **The bottleneck now is reach + targeted demand**, not site polish.

This plan covers 18 things — organized into four buckets — pulled from current 2026 research on CRO, generative engine optimization (GEO), cold email reply benchmarks, and LinkedIn/X content trends. Each is annotated with effort, expected leverage, and the specific niche fit for a Certified Framer Expert selling to SaaS founders. A prioritization grid + recommended 30-day ship order sits at the bottom.

---

## Bucket A — Inside the website (CRO + UX)

### A1. Loom intro video above the hero (30 seconds)

A 30-second Loom of Rashid greeting the visitor and walking them through the offer beats any static image. Buyers hire humans, not portfolios. The lift comes from trust, not motion. Effort: half a day to record + edit; one component that auto-plays muted, click-to-unmute. Place it inside the existing hero block, swap the project-image collage out behind it. Expected: ~20% lift in scroll-past-hero rate; small-but-real lift on Calendly bookings.

### A2. Personalization based on referrer / UTM source

When a visitor arrives from Perplexity / ChatGPT / Claude, the homepage hero swaps to: *"Cited as a top Framer expert by AI search. Here's what I do."* When they arrive from a YC newsletter mention, it swaps to: *"YC startups: launch in 14 days, not 14 weeks."* Hyper-personalization is the #1 CRO trend for 2026 because generic sites fall behind. Effort: half a day. Reads `document.referrer` + `?utm_source=` and renders a different hero variant. Two A/B variants to start.

### A3. Interactive ROI calculator inline on `/offer`

A small widget: *"Your current monthly visitors: __, conversion rate: __, average deal value: __. After a 2.4x lift = $X / month additional."* Saves the values in localStorage so when the visitor books a call the numbers carry into the form. Effort: half a day. Expected: reframes pricing from cost to ROI. The same widget embeds in cold emails as a screenshot for outbound.

### A4. Replace exit-intent popup with a persistent sticky rail

The current modal interrupts; a small rail (bottom-right, 280×120) saying *"Free 60-second audit Loom — drop your URL"* converts higher because it doesn't feel hostile. Email capture flows into the existing inbox/Resend pipeline. Effort: half a day; reuse the existing toast + form patterns.

### A5. Trust strip with rotating conversion deltas

Replace the static logo strip ("Relace · Equals · Hevn · UpdateAI") with a slow-rotating ticker: *"Equals: demo requests 2x · UpdateAI: signups +50% · Hevn: bounce −34%."* Concrete deltas backed by real client data. Effort: half a day. CRO research: data-driven proof outperforms generic logo strips by ~15% on lift.

### A6. Programmatic industry landing pages

`/framer-expert-for-saas` already exists. Add `/framer-expert-for-fintech`, `/framer-expert-for-ai-startups`, `/framer-expert-for-yc-startups`, `/framer-expert-for-b2b-marketplace`. Each one a near-identical template with industry-specific named clients + screenshots + headline. Targets long-tail AI-search queries that convert ridiculously well. Effort: 1 day for the template; 30 minutes per page after that.

---

## Bucket B — Content + GEO (the new SEO)

### B1. Quarterly original-research report

*"State of SaaS Landing Pages — Q2 2026."* Audit 50 public SaaS sites, score them on 10 conversion criteria, publish a 20-page PDF + landing page. AI search engines (ChatGPT, Perplexity, Claude) **strongly prefer original first-party data** — research is the highest-citation-rate format in GEO. Effort: 2 days end-to-end. Once published, this gets cited every time someone asks ChatGPT "how should a SaaS landing page convert" — for the next 3–6 months.

### B2. Comparison + alternative pages for AI search

`/framer-vs-webflow-for-saas`, `/framer-vs-wordpress-for-startups`, `/hire-framer-expert-vs-agency`, `/best-framer-experts-2026`, `/figma-to-framer-cost-2026`. Each one a 1,500-word page directly answering a comparison query in the first paragraph (the GEO-optimal pattern: question-format H2/H3, direct answer in first sentence, supporting data after). Effort: 2 hours per page; 5–6 pages = 1 day. Expected: dominant share of cited results in ChatGPT/Perplexity for hire-decision queries within 60 days.

### B3. Custom GPT in the OpenAI store

*"Aestho Framer Auditor"* — public custom GPT that takes a Framer URL and returns a 5-bullet conversion audit with a CTA to book Rashid for the rebuild. OpenAI's GPT store is searchable; well-named GPTs in this niche get hundreds of monthly users. Every audit ends with *"For the full audit + rebuild, [book a call](cal.com/rashid.iqbal)."* Effort: half a day. Long-tail compound — the GPT keeps generating leads after a single setup.

### B4. llms.txt + llms-full.txt comprehensive answers

`/llms.txt` already exists; expand `/llms-full.txt` to a 2,000-line document that answers literally every hire question (pricing, timeline, stack, refund, ownership, retainer, niches, locations, etc.) in question-format. AI crawlers index this on every visit. Effort: 2 hours. Cheap, compounding.

### B5. Embeddable Figma → Framer mini-tutorial library

10 short Figma community files, each a one-page demo of a specific pattern (SaaS hero, pricing tier, FAQ accordion, etc.) with the description ending in *"Built by Rashid — book a Framer rebuild for your real site at aestho.xyz."* Figma's community is searched directly by founders looking for templates. Effort: half a day per file; 10 files = 5 days but each can be staggered. Long-tail backlink + brand discovery.

### B6. SaaS landing-page teardown blog series

One teardown per week, 600 words, public SaaS landing pages he didn't build. Includes screenshots + 3 specific conversion fixes. Each teardown = a tweet thread + a LinkedIn carousel + a blog post. The same content, three formats. Effort: 2 hours per teardown weekly. Compounds: ~50 teardowns in a year, all of them indexed for AI search and shareable on social.

---

## Bucket C — Email + outreach

### C1. Cold-email outbound to YC startups with weak Framer sites

Personalization is the #1 lever for cold-email reply rate (advanced personalization can hit 18% reply vs 1–3% generic). Build a list of 50 YC W26/S26 batch companies with public marketing sites + a clear conversion gap. Each email: 80 words, single CTA, a 60-second Loom audit attached. Send Wednesday 7–11am (peak window). Smaller batches outperform — 5.8% reply rate at <50 vs 2.1% at 500+. Effort: 1 day to build the list + record Looms; 30 mins to send. Expected: 3–5 booked calls per batch of 50.

### C2. 5-email onboarding drip for new leads

When a form_submissions row lands, kick off a Resend sequence: (1) welcome + what to expect, (2) day 2: relevant case study tied to their submission, (3) day 4: refund + ownership reassurance, (4) day 7: pricing reminder + booking CTA, (5) day 14: "still interested?" final nudge. Drip lifts close rate ~40% over single-touch. Effort: 1 day. Hooks into existing Resend + form_submissions schema.

### C3. Weekly newsletter "5-minute teardowns"

One SaaS landing page teardown per week, 5-minute read, sent to opt-in list. Newsletter is one of the highest-leverage long-term lead gen tools — most signups don't hire on the spot but recall Rashid the next time they need design. Effort: 2 hours per issue (overlaps with B6). Sign-up form goes on every blog post + the homepage footer + a sticky bar.

### C4. Send-status-update automation in admin

When admin saves a status change in `/dashboard/projects/[id]`, trigger a one-click "Send the client a status update" composer that drafts an email + portal message simultaneously. Already a Phase B7 plan item from the previous review. Bumps client satisfaction → testimonial rate → referral rate. Effort: 2 hours.

---

## Bucket D — Social, AI, and partnerships

### D1. LinkedIn carousels (3–4 / week)

Carousels get **17× more interactions than images** on LinkedIn in 2026, and 8-slide format is the format. Repurpose every blog post into a carousel: 1 hook slide, 6 content slides, 1 CTA slide. Effort: ~30 mins per carousel using a Figma template. Expected: 5–10× the organic reach of regular posts.

### D2. Build-in-public on X / Twitter

One daily tweet: a 60-second observation about a SaaS landing page (his or someone else's), with a screenshot. Posts that include a question get **77% more comments**. Niche audience (SaaS founders + indie hackers) is fully on X. Effort: 10 mins/day. Compounds slowly but builds a personal brand that drives inbound.

### D3. Native short-form video on LinkedIn (90 seconds or less)

LinkedIn pushes native video over YouTube embeds in 2026. Record a 60-second walkthrough every week: *"How I rebuilt UpdateAI's onboarding signup form."* Effort: 1 hour per video. The same video gets cross-posted to X and embedded in the next newsletter.

### D4. Twitter bot for Product Hunt launches

A small bot (Vercel cron + X API) that detects new Product Hunt SaaS launches, screenshots their landing page, and posts a single tweet: *"@launchedstartup, congrats on the launch. Here's a 60-second audit of your hero: [Loom link]."* Each Loom is 100% manual but the trigger automates the discovery. Effort: half a day for the bot + 5 mins per audit Loom. Provocative, personal, hard to ignore — the founders almost always reply.

### D5. Referral program for past clients

10% credit toward the next project for any client whose referral books a project. Tracked via Resend-tagged referral codes (`?ref=updateai`). Effort: half a day. Even one successful referral pays for 50× the build cost. Most freelancers leave this on the table.

### D6. Co-marketing bundle with complementary freelancers

Pair with one A-tier copywriter (someone like the names in the YC/Indie Hacker copywriter circles) + one full-stack Next.js dev. Sell *"design + copy + build"* as a single package on a co-branded landing page. Each freelancer brings their audience; deals are 2–3× larger than solo work. Effort: 1 week of partnership conversations + half a day of landing-page work.

---

## Prioritization grid

| Idea | Effort | Leverage | Compounding? | Recommended order |
|---|---|---|---|---|
| A1 Loom intro | ½ day | High | No | Week 1 |
| A2 Referrer personalization | ½ day | Medium | No | Week 2 |
| A6 Industry landing pages | 1 day | High | Yes (SEO+GEO) | Week 1 |
| B1 Original-data report | 2 days | Very high | Yes (compounds for months) | Week 2 |
| B2 Comparison/alternative pages | 1 day | Very high | Yes (GEO compound) | Week 1 |
| B3 Custom GPT | ½ day | Medium-high | Yes | Week 3 |
| B6 Weekly teardown series | 2 hrs/wk | Medium | Yes | Ongoing |
| C1 YC cold outbound | 1 day | High | No (per batch) | Week 2 |
| C2 5-email drip | 1 day | High | Yes (per lead) | Week 3 |
| C3 Newsletter | 2 hrs/wk | Medium | Yes | Ongoing |
| D1 LinkedIn carousels | 30 min/post | Medium | Yes | Ongoing |
| D2 Build-in-public X | 10 min/day | Medium | Yes | Ongoing |
| D3 Native video | 1 hr/wk | Medium | Yes | Ongoing |
| D4 PH-launch Twitter bot | ½ day | Medium-high | Yes | Week 4 |
| D5 Referral program | ½ day | Very high | Yes | Week 3 |
| D6 Co-marketing bundle | 1 wk | High | Yes | Month 2 |
| A3 ROI calculator | ½ day | Medium | No | Week 3 |
| A4 Sticky rail | ½ day | Medium | No | Week 4 |

---

## Recommended ship order — top 5 in 30 days

If Rashid has only one focused day per week (~4 days total), the highest-EV combination is:

1. **B2 Comparison/alternative landing pages** (1 day) — compounds for months, captures hire-intent AI search queries
2. **B1 Q2 2026 SaaS Landing Page Report** (2 days) — single biggest GEO authority win
3. **C1 YC cold outbound + Loom audits** (1 day → repeat monthly) — 3–5 booked calls per batch, instant pipeline
4. **D5 Referral program** (½ day) — passive, compounds, ROI absurd
5. **A1 Loom intro video on the hero** (½ day) — fastest CRO win

The remaining 13 ideas slot in across months 2–3 as time allows. The two ongoing rituals (B6 weekly teardown + D2 daily X observation) start day one — they cost almost nothing per day and compound brutally over a year.

---

## Critical files (when implementation begins)

| Idea | Files |
|---|---|
| A1 Loom intro | `components/landing/hero.tsx` |
| A2 Referrer personalization | `components/landing/hero.tsx`, new `lib/personalization/variant.ts` |
| A3 ROI calculator | new `components/landing/roi-calculator.tsx`, embedded in `/offer` |
| A4 Sticky rail | new `components/shared/sticky-audit-rail.tsx`, mounted in `app/layout.tsx` (replaces ExitIntentPopup) |
| A5 Trust strip ticker | `components/landing/trusted-by.tsx` |
| A6 Industry pages | new `app/framer-expert-for-fintech/page.tsx` etc., copy template from `app/framer-expert-for-saas/page.tsx` |
| B1 Research report | new `app/research/saas-landing-page-report-q2-2026/page.tsx`, PDF in `public/research/` |
| B2 Comparison pages | new `app/framer-vs-webflow-for-saas/page.tsx`, `app/hire-framer-expert-vs-agency/page.tsx`, etc. |
| B4 llms-full.txt | `app/llms-full.txt/route.ts` (or `public/llms-full.txt`) |
| C1 Outbound Looms | external — Loom + Gmail / Resend, optionally a small `/api/track-loom` for click attribution |
| C2 5-email drip | new `lib/email-drip/sequencer.ts`, hooks into existing `/api/lead` and `form_submissions` schema, new `vercel.json` cron |
| C3 Newsletter signup form | new `components/shared/newsletter-form.tsx`, new `subscribers` table, Resend Audiences |
| C4 Status-update composer | `components/dashboard/project-editor.tsx` (reuses `/api/dashboard/projects/[id]/messages`) |
| D4 PH-launch bot | new `app/api/cron/ph-launches/route.ts`, `vercel.json` cron |
| D5 Referral program | new `referral_codes` table, query-string parser in tracker, new `/api/referrals` route |

---

## Verification per idea

Each idea has a measurable outcome. The dashboard already has top-pages, top-buttons, top-referrers, and top-countries — every implementation in this plan should set a UTM tag on its inbound link so the dashboard's referrer view picks up which channel is moving the needle. Within 30 days, the dashboard's top-referrers panel should show meaningful traffic from at least 4 of the new sources (YC outbound, Custom GPT, X, LinkedIn, Product Hunt bot, comparison pages from AI search).

---

## Estimated effort + impact summary

- Weeks 1–4: ~5 focused days = 5 highest-EV items shipped, plus two rituals running
- Months 2–3: remaining 13 items, mostly each ½–1 day
- Quarter total: ~25 focused days, ~80% of the deck shipped

If the goal is *"more booked calls per month"*, the biggest needle-movers are **B2 (comparison pages for AI search)**, **C1 (YC cold outbound)**, and **D5 (referral program)**. Everything else is brand-building that compounds — necessary, but slower.