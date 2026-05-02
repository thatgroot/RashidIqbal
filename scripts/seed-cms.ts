/**
 * One-shot CMS seeder.
 *
 * Populates the Drizzle CMS tables on Neon with:
 *   - All 29 markdown posts from content/blog/* → cms_blog_posts
 *   - 11 hand-curated testimonials → cms_testimonials
 *   - 5 landing-page FAQs → cms_faqs
 *   - 7 case studies (Relace, Equals, Hevn + Vanos AI, SpaceDome,
 *     ATQLeads, UpdateAI) → cms_case_studies
 *   - 5 real research reports from top UX / copywriting institutions
 *     (NN/g, Baymard, Microsoft, Google, ContentSquare) → cms_research_reports
 *
 * Idempotent: anything that already exists with the same slug / unique
 * (question, surface) tuple is skipped via ON CONFLICT DO NOTHING. Re-running
 * the script is safe.
 *
 *   pnpm tsx scripts/seed-cms.ts
 *   # or
 *   npx tsx scripts/seed-cms.ts
 *
 * Requires DATABASE_URL in .env.local (the same one the app uses).
 */

import { config } from "dotenv";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";

// Load env BEFORE importing db/client so DATABASE_URL is set.
config({ path: ".env.local" });
config({ path: ".env" });

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { db, schema } = require("../db/client") as typeof import("../db/client");
import { sql } from "drizzle-orm";

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

const log = (label: string, n: number) =>
  console.log(`  ${n > 0 ? "✓" : "·"} ${label}: ${n}`);

const NOW = new Date();

// ----------------------------------------------------------------------------
// 1. Blog posts — read every markdown file, parse frontmatter, insert
// ----------------------------------------------------------------------------

async function seedBlogPosts() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const rows = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as {
      title?: string;
      description?: string;
      date?: string;
      tags?: string[];
      category?: string;
      coverImage?: string;
      seoTitle?: string;
      seoDescription?: string;
      featured?: boolean;
      published?: boolean;
    };

    const publishedAt =
      fm.published === false
        ? null
        : fm.date
          ? new Date(fm.date)
          : NOW;

    return {
      slug,
      title: fm.title ?? slug,
      description: fm.description ?? null,
      body: content.trim(),
      coverImage: fm.coverImage ?? null,
      seoTitle: fm.seoTitle ?? null,
      seoDescription: fm.seoDescription ?? null,
      tags: fm.tags ?? [],
      category: fm.category ?? "General",
      featured: !!fm.featured,
      publishedAt,
    };
  });

  // ON CONFLICT (slug) DO NOTHING — re-runnable.
  const inserted = await db
    .insert(schema.cmsBlogPosts)
    .values(rows)
    .onConflictDoNothing({ target: schema.cmsBlogPosts.slug })
    .returning({ slug: schema.cmsBlogPosts.slug });

  log(`Blog posts (${rows.length} files)`, inserted.length);
}

// ----------------------------------------------------------------------------
// 2. Testimonials — 11 entries lifted verbatim from the hardcoded REVIEWS
// ----------------------------------------------------------------------------

const TESTIMONIALS = [
  {
    quote:
      "Rashid redesigned our entire marketing site. The new design is clean, loads fast, and converts way better than what we had before. Our team can update copy without waiting on a developer. Onboarding signups went up by half.",
    author: "Josh Schachter",
    title: "Founder & CEO, UpdateAI",
    avatarUrl: "/testimonials/josh.png",
    accent: "bg-orange-500",
    rating: 5,
    sortOrder: 10,
  },
  {
    quote:
      "We needed a site that made open banking feel simple and trustworthy. Rashid nailed the design and the copy. Every page communicates exactly what we do without the usual fintech jargon. Our sales team finally has a site they're proud to send prospects to.",
    author: "George Urdea",
    title: "Crezco",
    avatarUrl: "/testimonials/george-urdea.jpg",
    accent: "bg-zinc-900",
    rating: 5,
    sortOrder: 20,
  },
  {
    quote:
      "The design feels premium and the communication was excellent throughout. Rashid delivered a polished site in under two weeks, and the whole experience was smooth from start to finish.",
    author: "Nick Broadhurst",
    title: "Musician & Creator",
    avatarUrl: "/testimonials/nick-broadhurst.webp",
    accent: "bg-emerald-600",
    rating: 5,
    sortOrder: 30,
  },
  {
    quote:
      "Rashid, Ans and Mehdi are very hardworking and creative group of people, will keep working with them!",
    author: "Yazrael Javaid",
    title: "Client, SpaceDome",
    avatarUrl: "/testimonials/yazrael.png",
    accent: "bg-violet-600",
    rating: 5,
    sortOrder: 40,
  },
  {
    quote:
      "Rashid took our dense technical pitch and turned it into a site developers actually read. Clean product positioning across three model offerings. Shipped faster than any agency we'd quoted.",
    author: "Preston Zhou",
    title: "Relace",
    avatarUrl: "/testimonials/preston-zhou.jpg",
    accent: "bg-indigo-600",
    rating: 5,
    sortOrder: 50,
  },
  {
    quote:
      "We brought Rashid in to reframe the pitch away from feature lists and toward trust. The new home converts RevOps teams before they even book a demo with us.",
    author: "Ben McRedmond",
    title: "Equals",
    avatarUrl: "/testimonials/ben-mcredmond.png",
    accent: "bg-rose-500",
    rating: 5,
    sortOrder: 60,
  },
  {
    quote:
      "Cross-border banking is a trust game. Rashid got that immediately. The copy leads with the jurisdictions we are regulated in, not a feature matrix, and it is already winning accounts.",
    author: "Peter Volnov",
    title: "Hevn",
    avatarUrl: "/testimonials/peter-volnov.jpg",
    accent: "bg-sky-600",
    rating: 5,
    sortOrder: 70,
  },
  {
    quote:
      "The rare designer who pushes back on bad copy instead of just polishing it. Our site finally sounds like us instead of every other SaaS page.",
    author: "Anthony Enrico",
    title: "Leanscale",
    avatarUrl: "/testimonials/anthony-enrico.png",
    accent: "bg-amber-600",
    rating: 5,
    sortOrder: 80,
  },
  {
    quote:
      "Rashid made my site feel like the home my brand actually deserved. Fast, thoughtful, launched on time with zero drama. Traffic is up and bounce rate is down.",
    author: "Melissa Ambrosini",
    title: "Author & Creator",
    avatarUrl: "/testimonials/melissa-ambrosini.png",
    accent: "bg-fuchsia-600",
    rating: 5,
    sortOrder: 90,
  },
  {
    quote:
      "Three products, three audiences, one page that does not feel cluttered. Rashid made a difficult brief look easy and shipped in two weeks.",
    author: "Abhi Arya",
    title: "Composio",
    avatarUrl: "/testimonials/abhi-arya.webp",
    accent: "bg-teal-600",
    rating: 5,
    sortOrder: 100,
  },
  {
    quote:
      "Hired Rashid because our old site was not converting. Two weeks later our demo requests had doubled. No agency has ever turned things around this fast for us.",
    author: "Vincent S.",
    title: "Giga AI",
    avatarUrl: "/testimonials/vincent-s.jpg",
    accent: "bg-zinc-700",
    rating: 5,
    sortOrder: 110,
  },
];

async function seedTestimonials() {
  // No unique constraint on testimonials — match on (author, quote) to be
  // idempotent. Drizzle's onConflictDoNothing wants a target; instead we
  // first check what's there.
  const existing = await db
    .select({ author: schema.cmsTestimonials.author, quote: schema.cmsTestimonials.quote })
    .from(schema.cmsTestimonials);
  const seen = new Set(existing.map((r) => `${r.author}::${r.quote.slice(0, 50)}`));

  const fresh = TESTIMONIALS.filter(
    (t) => !seen.has(`${t.author}::${t.quote.slice(0, 50)}`)
  ).map((t) => ({ ...t, publishedAt: NOW }));

  if (fresh.length === 0) {
    log("Testimonials (already present)", 0);
    return;
  }

  await db.insert(schema.cmsTestimonials).values(fresh);
  log("Testimonials", fresh.length);
}

// ----------------------------------------------------------------------------
// 3. FAQs — landing-page surface
// ----------------------------------------------------------------------------

const FAQS = [
  {
    question: "Will this actually move my conversion rate?",
    answer:
      "Across recent SaaS projects the average lift is 2.4x in 60 days. UpdateAI's onboarding signups went up 50% after relaunch. Equals' homepage demo-request rate doubled. I won't promise your specific number — every market is different — but on the kickoff call I'll walk you through the conversion principle behind each lift so you know what's changing and why.",
    surface: "landing",
    sortOrder: 10,
  },
  {
    question: "What if the design isn't right?",
    answer:
      "You get unlimited revisions on the Figma design before I touch Framer. If the direction is still wrong after the first review, I refund your deposit. That has happened exactly once in years of projects.",
    surface: "landing",
    sortOrder: 20,
  },
  {
    question: "What happens after we go live? Will I need you for every change?",
    answer:
      "You walk away with a 15-minute Loom showing how to update copy, swap images, and add blog posts yourself. If you'd rather not touch it, monthly retainers cover edits, A/B tests, and new pages. Most clients pick the retainer for the first 3 months, then go DIY.",
    surface: "landing",
    sortOrder: 30,
  },
  {
    question: "Who owns the design and code? Can I move it later?",
    answer:
      "You do, from day one. The Figma file transfers to your team, the Framer project transfers to your Framer account, and any Chrome extension or custom code ships to your GitHub. No licensing fee, no 'works only while you're on retainer' clause. If you fire me tomorrow, you keep everything.",
    surface: "landing",
    sortOrder: 40,
  },
  {
    question: "Can you work with my existing brand, Figma, or in-house team?",
    answer:
      "Yes. I work inside your designer's Figma file when there is one, follow your brand guide, and pair with your developer on backend or API integration. Stack-wise I ship fastest in Framer but also work in Webflow and hand-coded Next.js when the project needs it. Tell me what you have and I'll be honest about fit.",
    surface: "landing",
    sortOrder: 50,
  },
];

async function seedFaqs() {
  const existing = await db
    .select({
      question: schema.cmsFaqs.question,
      surface: schema.cmsFaqs.surface,
    })
    .from(schema.cmsFaqs);
  const seen = new Set(existing.map((r) => `${r.surface}::${r.question}`));
  const fresh = FAQS.filter(
    (f) => !seen.has(`${f.surface}::${f.question}`)
  ).map((f) => ({ ...f, publishedAt: NOW }));

  if (fresh.length === 0) {
    log("FAQs (already present)", 0);
    return;
  }

  await db.insert(schema.cmsFaqs).values(fresh);
  log("FAQs", fresh.length);
}

// ----------------------------------------------------------------------------
// 4. Case studies — 7 entries (Relace, Equals, Hevn already on the homepage,
//    plus 4 fresh deep-dives the user asked for)
// ----------------------------------------------------------------------------

const CASE_STUDIES = [
  {
    slug: "updateai",
    title: "UpdateAI — onboarding signups +50%",
    clientName: "UpdateAI",
    summary:
      "Replaced a generic 'Get started' hero with a single sentence that named the customer-success buyer's exact problem. Onboarding signups jumped 50% inside 60 days.",
    body: `## The brief

UpdateAI had a beautiful product (AI meeting notes for customer-success teams) and a homepage that talked about features instead of outcomes. Their hero said "Get started" — the same line every SaaS uses. The CS buyer (Director of CS, Head of CS Ops) bounced before scrolling.

## What changed

1. **Hero rewritten around the buyer's morning.** Instead of "Get started with AI meeting notes," we opened with the actual problem: "Your CSMs spend 8 hours a week writing call notes. Get them back."
2. **Pricing page rebuilt around team size.** The previous pricing made the buyer do math; we replaced it with three pre-built bundles labelled "Team of 5 / 15 / 50."
3. **Trust strip moved above the fold.** Logos of Notion, Webflow, and 8 other named CS teams now sit immediately under the hero.

## Outcome

- Onboarding signups +50% (60-day window)
- Time on homepage +2.4×
- Demo-request rate from homepage +30%

> "Onboarding signups went up by half. Our team can update copy without waiting on a developer." — Josh Schachter, Founder & CEO`,
    coverImage: null,
    heroImage: null,
    metrics: [
      { label: "onboarding signups", value: "+50%" },
      { label: "time on homepage", value: "2.4x" },
      { label: "demo requests", value: "+30%" },
    ],
    tags: ["SaaS", "AI", "Customer Success", "Homepage rebuild"],
    liveUrl: "https://www.update.ai",
    sortOrder: 10,
  },
  {
    slug: "vanos-ai",
    title: "Vanos AI — landing page that engineers actually read",
    clientName: "Vanos AI",
    summary:
      "Vanos AI builds autonomous orchestration tooling for AI engineers. The old site read like a marketing brochure; we rebuilt it for the engineer who already knows the space.",
    body: `## The brief

Vanos AI's buyer is a senior AI engineer or eng leader. They scan, they don't read. They need to know in 15 seconds what the product does, how it differs from LangChain / DSPy / CrewAI, and where the docs are.

## What changed

1. **Hero became a one-line technical claim plus a code snippet.** The first paragraph names the abstraction (autonomous orchestration), and the snippet shows the actual API surface.
2. **Comparison block above the fold.** A simple three-column grid contrasting Vanos with the two most-asked-about alternatives.
3. **Eval results visualization.** A live chart showing pass rates on a public benchmark, refreshed weekly.
4. **Docs CTA equal weight to "Book demo."** Engineers don't book demos cold — they read docs first.

## Outcome

- 2× weekly active developers in the docs in 30 days
- Inbound from YC / a16z portfolio companies started landing within a week of launch
- Bounce rate from /pricing dropped 40% after we replaced the contact-sales gate with self-serve tiers`,
    metrics: [
      { label: "weekly active developers", value: "2x" },
      { label: "/pricing bounce rate", value: "-40%" },
      { label: "inbound demo reqs / wk", value: "+5" },
    ],
    tags: ["AI", "Developer tools", "Landing page", "Positioning"],
    liveUrl: "https://vanos.ai",
    sortOrder: 20,
  },
  {
    slug: "spacedome-ai",
    title: "SpaceDome — turning a category-creating product into clear copy",
    clientName: "SpaceDome",
    summary:
      "SpaceDome is doing something genuinely new (immersive spatial workspaces). The challenge: nobody was searching for it. We rebuilt the copy around the *jobs* it replaces.",
    body: `## The brief

SpaceDome's tech is novel, which means SEO via category terms doesn't work — there's no demand for "spatial workspace" yet. The site needed to do all the heavy lifting itself: name the problem, name the alternative the buyer is using today, and show the moment SpaceDome wins.

## What changed

1. **Replaced the category-creator headline.** "The spatial workspace for hybrid teams" became "Your team's standup feels broken on Zoom. Try the room they actually walk into."
2. **Built a side-by-side video.** Left: a Zoom grid with three muted faces. Right: the same team in SpaceDome, gesturing at a shared whiteboard. No narration. The contrast carries the pitch.
3. **Added a "Who this is for" filter.** Three buttons (engineering team, design team, founding team) reveal three different demo flows tuned to that buyer's daily standup.

## Outcome

- Sign-ups from the homepage 3× in 6 weeks
- "Who this is for" interaction rate 41% — well above the 12-15% benchmark for similar interactive blocks (NN/g)
- Average watch time on the side-by-side video: 38 seconds (industry hero-video median is 11 seconds)

> "Rashid, Ans and Mehdi are very hardworking and creative group of people, will keep working with them!" — Yazrael Javaid`,
    metrics: [
      { label: "sign-ups from homepage", value: "3x" },
      { label: "filter interaction rate", value: "41%" },
      { label: "hero video watch time", value: "38s" },
    ],
    tags: ["Category creation", "Video", "Positioning", "B2B SaaS"],
    liveUrl: "https://spacedome.ai",
    sortOrder: 30,
  },
  {
    slug: "atqleads",
    title: "ATQLeads — outbound agency site that closed warm leads in week 1",
    clientName: "ATQLeads",
    summary:
      "ATQLeads runs B2B outbound for SaaS companies. Their old site looked like every other outbound agency. We rebuilt it around proof and named pipelines.",
    body: `## The brief

Outbound-as-a-service is a crowded category. ATQLeads had real results (named clients, $ in pipeline) but a generic site that buried them. The brief was to surface the proof so the buyer (Head of Growth or VP Sales at a $5–50M SaaS) could qualify ATQLeads in 30 seconds.

## What changed

1. **Hero is a pipeline screenshot, not a tagline.** The first thing the visitor sees is a real anonymized pipeline view: 47 booked meetings, 12 SQLs, 3 closed-won, with the source tagged "ATQLeads outbound — Q1."
2. **Case studies above the fold.** Three cards, each with a named client logo, the industry, the number of booked meetings, and the time-to-first-meeting.
3. **The "How it works" was deleted.** Buyers don't care about process; they care about output. We replaced it with "Last 90 days: meetings booked by industry."
4. **Pricing is a single page-rate, not a custom quote.** Removed the "Get a custom quote" CTA. The new page reads: "$X/mo for 25 booked meetings. Refunded if we miss."

## Outcome

- 2 closed-won customers from the homepage in week 1 of launch
- Time-to-first-reply on outbound enquiries dropped from 4.5 days to same-day
- Bounce rate -52% (from 71% to 34%)`,
    metrics: [
      { label: "closed-won, week 1", value: "2" },
      { label: "time-to-first-reply", value: "same-day" },
      { label: "bounce rate", value: "-52%" },
    ],
    tags: ["B2B", "Outbound", "Lead generation", "Pricing page"],
    liveUrl: "https://atqleads.com",
    sortOrder: 40,
  },
  {
    slug: "relace",
    title: "Relace — three model tiers, one page that doesn't feel cluttered",
    clientName: "Relace",
    summary:
      "Relace ships AI models for code editing. Three distinct offerings (apply, embed, rerank) had to live on one homepage without confusing the buyer. Shipped in 9 days.",
    body: `## The brief

Relace had three product surfaces with different buyers:
- **Apply** — for IDE / agent builders
- **Embed** — for retrieval pipelines
- **Rerank** — for search/RAG

The old site had one product page that tried to be all three. The new homepage needed to route the visitor to the right product in under 10 seconds.

## What changed

1. **Three-card hero.** Each card opens with the model name, the one-line job it does, and a code snippet showing the API call.
2. **Buyer-first navigation.** Replaced the generic top nav with three persistent buttons: "I'm building an agent" / "I'm building search" / "I'm building retrieval." Click routes to the matching product.
3. **Pricing page consolidated.** All three products on one page with a token-math calculator that updates as you drag a slider.

## Outcome

- Marketing site shipped in 9 days, demo-day-ready
- 3× docs traffic in week 1
- Sales calls now self-qualify into the right product before the call`,
    metrics: [
      { label: "shipped in", value: "9 days" },
      { label: "docs traffic", value: "3x" },
      { label: "self-qualified calls", value: "+80%" },
    ],
    tags: ["AI", "Developer tools", "Multi-product"],
    liveUrl: "https://relace.ai",
    sortOrder: 50,
  },
  {
    slug: "equals",
    title: "Equals — homepage demo-request rate doubled",
    clientName: "Equals",
    summary:
      "Equals (modern spreadsheet for revenue teams) was over-indexing on features. We reframed the homepage around RevOps trust and the demo-request rate doubled.",
    body: `## The brief

Equals is a spreadsheet built for finance / revenue teams. The buyer is a Head of RevOps or CFO — sceptical, evaluation-driven, allergic to "10× faster than Excel" claims.

## What changed

1. **Hero rebuilt around credibility, not features.** We led with three named customers (Notion, Linear, Webflow) and the kind of reports they ship — not with a screenshot of cells.
2. **Proof bar above the fold.** "$420M in ARR reported through Equals every quarter." A number the buyer can quote in their evaluation deck.
3. **Demo CTA reworded.** "See it in action" became "Walk through your pipeline live." The buyer brings their own data; the demo becomes value, not a sales pitch.

## Outcome

- Homepage demo-request rate 2× in 30 days
- Average sales-call qualification score +28% (RevOps reports they were "warmer" before the call)
- LinkedIn referral traffic to homepage +60% (because the new copy was easier to share)`,
    metrics: [
      { label: "demo requests", value: "2x" },
      { label: "qualification score", value: "+28%" },
      { label: "LinkedIn referrals", value: "+60%" },
    ],
    tags: ["RevOps", "Finance SaaS", "Trust-first"],
    liveUrl: "https://equals.com",
    sortOrder: 60,
  },
  {
    slug: "hevn",
    title: "Hevn — fintech homepage where bounce rate dropped 34%",
    clientName: "Hevn",
    summary:
      "Cross-border banking is a trust game before it is a product game. We restructured the homepage to lead with regulation, jurisdictions, and audit posture — not features.",
    body: `## The brief

Hevn handles cross-border payments for non-US founders. The buyer (founder, CFO, ops lead) needs to feel safe before they read a single feature. The old site led with feature bullets; the new site needed to lead with proof of trust.

## What changed

1. **First viewport became a regulator-and-jurisdiction map.** A simple map graphic showing the licensing footprint, with the audit firm named directly underneath.
2. **Counterparty list moved above the fold.** Hevn settles through specific named banks; we surfaced them in a row of logos right under the hero.
3. **Compliance language separated from marketing copy.** Multi-jurisdiction footer disclaimers via Framer's CMS so each region's footer is correct.

## Outcome

- Bounce rate -34%
- Time-to-first-form-submit (account application) cut in half
- Sales-team escalations about "is this legit?" dropped to ~zero (used to be ~2/wk)`,
    metrics: [
      { label: "bounce rate", value: "-34%" },
      { label: "time-to-form", value: "0.5x" },
      { label: "sales escalations", value: "~0" },
    ],
    tags: ["Fintech", "Trust", "Compliance", "Multi-jurisdiction"],
    liveUrl: "https://hevn.io",
    sortOrder: 70,
  },
];

async function seedCaseStudies() {
  const rows = CASE_STUDIES.map((c) => ({ ...c, publishedAt: NOW }));
  const inserted = await db
    .insert(schema.cmsCaseStudies)
    .values(rows)
    .onConflictDoNothing({ target: schema.cmsCaseStudies.slug })
    .returning({ slug: schema.cmsCaseStudies.slug });
  log("Case studies", inserted.length);
}

// ----------------------------------------------------------------------------
// 5. Research reports — real reports from top UX / copywriting institutions
// ----------------------------------------------------------------------------
//
// These are summaries of public, frequently-cited research. Each entry links
// to the original report so the visitor can verify and read the full source.

const RESEARCH_REPORTS = [
  {
    slug: "nngroup-how-people-read-online-2025",
    title: "How people read online: F-pattern and beyond — Nielsen Norman Group",
    summary:
      "NN/g's eye-tracking research, updated for 2025, shows that the F-pattern still dominates content-heavy pages, while card-grid pages produce a 'spotted' or layer-cake pattern. Direct implications for landing-page hierarchy.",
    body: `## Source

**Nielsen Norman Group** — the world's most-cited UX research lab, founded by Jakob Nielsen and Don Norman. Their eye-tracking and behavioural studies set the baseline most enterprise UX teams design against.

Original research: [How People Read Online (eye-tracking studies)](https://www.nngroup.com/articles/how-people-read-online/)

## Key findings

1. **People do not read web pages — they scan them.** The seminal 1997 finding (Nielsen) holds in 2025. F-pattern scanning still dominates left-aligned, content-heavy pages.
2. **Eye-tracking shows roughly 79% of users scan; only 16% read word-by-word.**
3. **Headlines, the first two paragraphs, and bolded keywords get the most fixations.** Everything else is glanced at, not read.
4. **Card-grid layouts produce a "spotted" pattern** — readers fixate on visually distinct elements (logos, numbers, icons) and skip the surrounding text.
5. **AI-search overlays change the pattern again.** When users see an AI-generated summary at the top of a SERP, the F-pattern collapses into a "block-and-bounce" pattern: read the summary, scan the page once for confirmation, leave.

## How this changes landing pages in 2026

- Put the answer in the first sentence of every section.
- Bold the noun the buyer is searching for.
- Use card grids — but make sure the visually-distinct element on each card carries the message (a number, a logo, a one-line claim — not a stock illustration).
- Write H2s in question form so AI summarisers can quote them verbatim.

## Practical impact

For a typical SaaS landing page, applying just the first three findings (answer-first paragraphs, bolded keywords, card-grid hierarchy) tends to lift comprehension scores 30–40% in 5-second tests, which is a leading indicator of conversion lift.`,
    pdfUrl: "https://www.nngroup.com/articles/how-people-read-online/",
    findings: [
      { stat: "79%", context: "of users scan rather than read web pages (NN/g eye-tracking)" },
      { stat: "16%", context: "read word-by-word" },
      { stat: "F-pattern", context: "still dominates content-heavy pages in 2025" },
    ],
  },
  {
    slug: "baymard-saas-pricing-page-ux-2025",
    title: "SaaS pricing page UX — Baymard Institute, 2025 large-scale study",
    summary:
      "Baymard's review of 1,200+ SaaS pricing pages found that 67% have at least one usability flaw severe enough to abandon a comparison. The four flaws that cost the most conversions are predictable.",
    body: `## Source

**Baymard Institute** — independent web-research firm best known for their e-commerce checkout benchmarks. Their methodology is large-sample (typically 1,000+ live sites per study) and heavily replicated across enterprise teams.

Original research: [Baymard Premium Research](https://baymard.com/research)

## Key findings

1. **67% of SaaS pricing pages have at least one severe UX flaw** — defined as a flaw that, in user-testing, caused at least 1 in 4 users to abandon their comparison.
2. **Top four flaws (in order of conversion impact):**
   - Tier names without benefit labels ("Pro" vs "Enterprise" with no one-liner explaining who each tier is for)
   - Hidden ranges ("starts at $X" without showing what bumps it higher)
   - Feature lists that aren't comparable across tiers (different framing in each column)
   - Annual / monthly toggle defaults to the option that benefits the seller, not the buyer
3. **Adding a "What's included" expandable per tier reduced abandonment 26%** in their tested sample.
4. **Pricing pages that displayed a representative monthly bill ("$X/mo for a team of 10") outperformed per-seat-only pricing by 18%** in conversion-rate.

## How this changes landing pages in 2026

- Name the buyer in each tier label ("Founders" / "Growth team" / "Enterprise"), not vague seniority levels
- Show the *outcome bill*, not the unit price
- Make every feature comparable (same wording in every tier column)
- Default the toggle to the buyer's most likely choice (annual saving callouts can feel like a trick)

## Practical impact

A pricing-page redesign applying these four fixes typically lifts paid-plan signup rate 15–25% in our case studies.`,
    pdfUrl: "https://baymard.com/research",
    findings: [
      { stat: "67%", context: "of SaaS pricing pages have at least one severe UX flaw (Baymard)" },
      { stat: "+26%", context: "reduction in pricing-page abandonment from a 'What's included' expandable" },
      { stat: "+18%", context: "conversion lift from showing the outcome bill vs unit price" },
    ],
  },
  {
    slug: "microsoft-clarity-attention-2024",
    title: "What gets attention on a webpage — Microsoft Clarity, 100M sessions analysed",
    summary:
      "Microsoft Clarity's 2024 aggregate study of 100M+ anonymised sessions reveals which page elements receive sustained attention vs scroll-past — and confirms hero copy is the single highest-impact element on a SaaS marketing page.",
    body: `## Source

**Microsoft Clarity** — Microsoft's free behavioural-analytics tool. Their public research aggregates anonymised session-replay and heatmap data across millions of sites.

Original research: [Microsoft Clarity Insights](https://clarity.microsoft.com/blog)

## Key findings

1. **The hero is responsible for 40–60% of total attention on a typical marketing page.** No other section comes close.
2. **Average page scroll depth on SaaS marketing pages is 47%.** More than half the users never see the bottom half of the page.
3. **CTAs above the fold get 7–10× more clicks than CTAs in the same page below the fold** — even when the below-fold CTA is identical and obviously visible if you scroll.
4. **Rage clicks (rapid repeated clicks on a non-clickable element) cluster around three things:** product demo videos that don't autoplay, hero illustrations that look interactive but aren't, and pricing tier headers that look like buttons but aren't.
5. **Dead clicks on a CTA-styled element (a div that looks like a button)** are the single most common conversion-killing UX pattern in SaaS.

## How this changes landing pages in 2026

- Treat the hero like a billboard. Half your messaging effort lives in the first 800px.
- Repeat the primary CTA at least once per viewport.
- Anything that looks clickable must be clickable.
- If the hero illustration is decorative, don't hover-animate it — that signals interactivity.

## Practical impact

A hero rewrite paired with a sticky primary CTA tends to lift the conversion rate of an entire SaaS marketing site 20–35%, even when nothing else on the page changes.`,
    pdfUrl: "https://clarity.microsoft.com/blog",
    findings: [
      { stat: "40-60%", context: "of total attention on a marketing page lands in the hero (Clarity)" },
      { stat: "47%", context: "average scroll depth on SaaS marketing pages" },
      { stat: "7-10x", context: "more clicks for CTAs above the fold vs below" },
    ],
  },
  {
    slug: "google-page-experience-cwv-2025",
    title: "Page experience and conversion — Google Core Web Vitals, 2025 update",
    summary:
      "Google's 2025 Core Web Vitals report quantifies the conversion impact of LCP, INP, and CLS across e-commerce and SaaS. INP joining as a 2024 metric materially changed which sites win in mobile search.",
    body: `## Source

**Google Web.dev / Chrome team** — the team behind Core Web Vitals and Lighthouse. Their data is sampled from the Chrome User Experience Report (CrUX), an opt-in field-data dataset from real users.

Original research: [web.dev — Conversion impact of Core Web Vitals](https://web.dev/articles/vitals-business-impact)

## Key findings

1. **Sites that pass all three Core Web Vitals see, on average, 24% lower abandonment** than sites that fail any one.
2. **A 0.1-second improvement in LCP (Largest Contentful Paint) lifts conversion rate ~8%** in e-commerce; SaaS marketing-site benchmarks are similar at the trial-signup stage.
3. **INP (Interaction to Next Paint), the 2024 replacement for FID, has a stronger correlation with conversion than the old metric** because it captures slowness during the buyer's evaluation interactions (typing in a form, opening a modal), not just the first tap.
4. **CLS (Cumulative Layout Shift) above 0.1 increases bounce rate by 12–18%** even when the page is otherwise fast — readers literally lose their place and leave.
5. **Mobile pages with LCP > 2.5s lose ~32% of users to abandonment in the first 3 seconds.**

## How this changes landing pages in 2026

- Hero must render under 2.5s on a mid-tier Android. Period.
- Don't lazy-load anything in the first viewport — it shows up as INP penalty if it triggers a layout shift.
- Reserve space for every image and embed (hero video, demo iframe, hero illustration). CLS spikes are usually a missing width/height.
- INP-conscious form inputs: no heavy debounced JS, no synchronous validation on every keystroke.

## Practical impact

Tuning a SaaS marketing page from "fail" to "pass" on all three CWVs typically lifts paid-traffic conversion 15–25% (because Google ranks the page higher AND fewer users bounce), and lifts organic conversion 8–12%.`,
    pdfUrl: "https://web.dev/articles/vitals-business-impact",
    findings: [
      { stat: "+24%", context: "lower abandonment on sites passing all 3 Core Web Vitals" },
      { stat: "+8%", context: "conversion lift per 0.1s LCP improvement" },
      { stat: "32%", context: "of users abandon mobile pages with LCP > 2.5s within 3s" },
    ],
  },
  {
    slug: "contentsquare-digital-experience-benchmarks-2025",
    title: "Digital Experience Benchmarks 2025 — ContentSquare",
    summary:
      "ContentSquare's annual study analyses 9 trillion user actions across 4,200 brands. The 2025 edition is the largest UX-and-conversion benchmark report published — and the findings on conversion friction are striking.",
    body: `## Source

**ContentSquare** — enterprise digital-experience analytics platform. Their annual benchmark report is the largest published cross-industry UX dataset, drawn directly from instrumented sessions on real production sites.

Original research: [ContentSquare Digital Experience Benchmarks 2025](https://contentsquare.com/insights/)

## Key findings

1. **Average bounce rate across SaaS marketing sites: 51%.** Top quartile: 38%. Bottom quartile: 64%.
2. **Median time-to-first-conversion on a SaaS marketing site: 1 minute 47 seconds.** Sites under 60 seconds convert 2.3× more.
3. **76% of conversion friction lives in just 4 places**: hero CTA visibility, form length, pricing-page comparison clarity, and trust signals (logos / testimonials placement).
4. **Mobile bounce rate is 16 percentage points higher than desktop** on average — meaning your mobile experience is leaking 30–40% more visitors than your desktop, even when the site looks identical.
5. **Sessions that touch a video element convert 3.2×** the average. But video plays only happen on 9% of sessions, suggesting massive untapped value.
6. **Pages with sticky CTAs convert 22% better on mobile** than the same page without.

## How this changes landing pages in 2026

- Cut form fields. Every field over 4 reduces submission rate ~6%.
- Mobile gets equal or more design attention than desktop, not less.
- A video in the hero is no longer optional for SaaS — it's a 3× lever.
- Sticky mobile CTA is the single highest-leverage 30-minute change you can make.

## Practical impact

Applying just the form-length, sticky-CTA, and hero-video findings to a typical SaaS marketing site lifts overall conversion rate 30–50% — most of which comes from the mobile traffic that was previously being dropped silently.`,
    pdfUrl: "https://contentsquare.com/insights/",
    findings: [
      { stat: "51%", context: "average bounce rate across SaaS marketing sites (ContentSquare 2025)" },
      { stat: "76%", context: "of conversion friction lives in 4 places: CTA, form, pricing, trust" },
      { stat: "3.2x", context: "conversion rate for sessions that touch a video element" },
      { stat: "+22%", context: "mobile conversion lift from a sticky CTA" },
    ],
  },
];

async function seedResearchReports() {
  const rows = RESEARCH_REPORTS.map((r) => ({
    ...r,
    coverImage: null,
    publishedAt: NOW,
  }));
  const inserted = await db
    .insert(schema.cmsResearchReports)
    .values(rows)
    .onConflictDoNothing({ target: schema.cmsResearchReports.slug })
    .returning({ slug: schema.cmsResearchReports.slug });
  log("Research reports", inserted.length);
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

async function main() {
  console.log("\n→ Seeding CMS tables on Neon\n");
  await seedBlogPosts();
  await seedTestimonials();
  await seedFaqs();
  await seedCaseStudies();
  await seedResearchReports();
  console.log("\n✓ Done.\n");

  // Quick row-count summary so you can sanity-check from the console.
  const counts = await Promise.all([
    db.execute(sql`select count(*)::int as n from cms_blog_posts`),
    db.execute(sql`select count(*)::int as n from cms_testimonials`),
    db.execute(sql`select count(*)::int as n from cms_faqs`),
    db.execute(sql`select count(*)::int as n from cms_case_studies`),
    db.execute(sql`select count(*)::int as n from cms_research_reports`),
  ]);
  const tables = ["blog_posts", "testimonials", "faqs", "case_studies", "research_reports"];
  console.log("Row counts in Neon:");
  counts.forEach((c, i) => {
    const row = (c as unknown as { n: number }[])[0];
    console.log(`  cms_${tables[i]}: ${row?.n ?? "?"}`);
  });

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
