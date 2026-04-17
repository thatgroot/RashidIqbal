# Growth Playbook: Manual Tasks & Strategy

Everything below requires your hands, a browser, and some hustle. The code side is done.

---

## WEEK 1 (Do Immediately)

### Set Up Environment Variables on Vercel
Go to vercel.com > your project > Settings > Environment Variables. Add these:
```
WEB3FORMS_KEY=4b1bc50d-dffc-462f-9da4-564f12322121
NEXT_PUBLIC_TIDIO_KEY=<get from tidio.com after signup>
NEXT_PUBLIC_SENJA_WIDGET_ID=<get from senja.io after signup>
GOOGLE_PSI_API_KEY=<get from console.cloud.google.com, enable PageSpeed Insights API>
```

### Google Business Profile
Go to: business.google.com/?authuser=1#
- Category: "Web Designer" or "Web Developer"
- Type: Service-area / online business
- Website: aestho.xyz
- Add phone, email, description mentioning Figma, Framer, Chrome extensions

### Meta/Facebook Pixel
Go to: eventsmanager.facebook.com
- Create a Pixel for aestho.xyz
- Give me the Pixel ID and I'll add it to the code

### Search Console
Go to: search.google.com/search-console/?authuser=1#
- Resubmit sitemap: https://aestho.xyz/sitemap.xml
- Request indexing for new pages: /work, /audit, /partners, /services/chrome-extensions
- Check DNS TXT verification is still active

### Link Search Console to GA4
Go to: analytics.google.com/?authuser=1#
- Admin > Product Links > Search Console Links > Link

### Email Signature
Go to: aestho.xyz/signature
- Copy the HTML code
- Paste into your email client signature settings (Gmail, Outlook, etc.)
- This links every email you send to your audit tool

---

## WEEK 2-3 (High Impact)

### Loom Video Audit Cold Emails (HIGHEST ROI)
This is the single best client acquisition tactic in the research. Here's the workflow:

1. Install Wappalyzer browser extension (free, detects website technology)
2. Browse target companies' websites. Look for: old WordPress, slow load times, poor mobile, no structured data
3. Record a 2-3 minute Loom walking through their site's specific issues
4. Send cold email:
   - Subject: "Quick question about [domain]" (under 6 words)
   - Body: "I ran a quick audit on [domain] and spotted a few pages that could perform better. No pitch, just a 2-min Loom walkthrough. [Loom link]"
   - Send Tue-Thu, 8-10 AM in their local timezone
   - Follow up 3 times minimum (90% more responses)
5. Documented reply rates: 15-30%

### Tidio Chatbot Setup
1. Sign up at tidio.com (free tier)
2. Get your public key from the dashboard
3. Add to Vercel env: NEXT_PUBLIC_TIDIO_KEY=your_key
4. Configure chat flows:
   - "What type of project are you looking for?" (Landing page / Website / Chrome extension / Other)
   - "What's your budget range?" ($1K-2K / $2K-5K / $5K+)
   - "When do you need it done?" (This month / Next month / No rush)
   - Auto-book: "Let me find a time. Book here: [Cal.com link]"

### Senja Video Testimonials
1. Sign up at senja.io (free tier)
2. Create a project and get collection links
3. Send to clients: Josh (UpdateAI), Crezco team, Nick Broadhurst, Melissa Ambrosini
4. Once you have 3+ testimonials, get the widget ID
5. Add to Vercel env: NEXT_PUBLIC_SENJA_WIDGET_ID=your_widget_id

### LinkedIn Newsletter
1. Enable Creator Mode on your LinkedIn profile
2. Start a newsletter: "Framer & Conversion Weekly" or similar
3. Topics: weekly Framer tips, conversion teardowns, before/after redesigns
4. Post 2-5 times per week on LinkedIn (images get 2x engagement)
5. 80% of content within 3 topics: Framer builds, conversion optimization, Chrome extensions
6. LinkedIn newsletters get 30-40% open rates (vs 15-25% for email)

---

## MONTH 1-2 (Compounding Returns)

### Twitter/X Build in Public
1. Join the "Build in Public" community (180K members)
2. 70/30 rule: 70% replying to larger accounts, 30% original posts
3. Viral format: quote-tweet a founder's post with a visual redesign of their landing page
4. Replies are worth 150x likes in the algorithm
5. Put links in replies, not main tweets (algorithm suppresses external links)
6. Text outperforms video by 30%

### Publish Framer Templates
1. Go to framer.com/marketplace
2. Build and publish at least 2 templates:
   - SaaS landing page template ($49-79)
   - Portfolio/agency template ($49-79)
3. Framer takes 0% commission
4. Top creators make $4K-$10K/month
5. Every buyer sees your profile and services

### Build a Free Chrome Extension
1. Pick something useful for your target audience:
   - Website font/color detector
   - Contrast checker
   - Screenshot tool
   - Page speed checker
2. Build it, open-source on GitHub
3. Publish to Chrome Web Store
4. Every install = permanent brand impression in toolbar
5. This also proves you build Chrome extensions (portfolio piece)

### Bluesky Presence
1. Create account at bsky.app
2. Create a Starter Pack: "Best Framer Designers to Follow" (drives 43% of new follows)
3. Build a custom feed aggregating Framer/Figma content
4. Most freelancers are ignoring Bluesky = zero competition

### Beehiiv Newsletter
1. Sign up at beehiiv.com (free tier)
2. 0% commission on digital products, built-in ad network
3. Topic: weekly Figma/Framer tips, conversion teardowns
4. Median time to first dollar: 66 days
5. Cross-promote with your LinkedIn newsletter

### Directory Listings
Submit profiles to these (in order of lead quality):
1. Sortlist (sortlist.com) - actively sends leads, strong in Europe
2. Clutch (clutch.co) - ask clients for quarterly reviews
3. DesignRush (designrush.com) - categorized by expertise
4. GoodFirms (goodfirms.co) - case study backlinks
5. Gun.io (gun.io) - vetted, premium
6. Contra (contra.com) - commission-free

### Upwork Profile Optimization
1. Create 5 specialized profiles:
   - "Framer Expert | High-Converting Websites"
   - "Figma Designer | UX Copy & Conversion"
   - "Chrome Extension Developer | React + Manifest V3"
   - "Landing Page Designer | Figma to Framer"
   - "Web Designer | Framer CMS & Marketing Sites"
2. Submit proposals within 1-4 hours of posting
3. Keep proposals to 600-1,000 characters
4. Boost proposals 2x-8x for priority placement
5. Increase rate by 20% monthly until you find the ceiling

---

## QUARTER 1-2 (Bigger Bets)

### White-Label Agency Partnerships
1. Identify 3-5 agencies that don't offer Framer in-house
2. Send them to aestho.xyz/partners
3. Pitch: "I'll be your Framer department. You sell, I build, your brand on everything."
4. One agency partner sending 2-3 projects/month replaces all other lead gen
5. Start with one project at a discount to prove reliability

### Personalized Prospect Pages
When cold-pitching a specific company, send them to aestho.xyz/for/their-company-name
The page auto-generates with their company name and a personalized pitch. Use this in cold emails and Loom audits.

### Referral Program
1. Partner with copywriters, SEO specialists, brand designers
2. Offer 10% commission on project value for warm introductions
3. Create a simple one-page referral agreement
4. Make it reciprocal: you refer to them, they refer to you

### ProductHunt Launch
1. Launch the website audit tool, a Chrome extension, or a Framer template pack
2. Only 16 products featured per day
3. Start engaging with PH community 2 months before launch
4. Developer tools perform better on weekend launches
5. 50-120 hours of preparation needed

### Podcast Guesting
1. Create a Sessionize speaker profile
2. Pitch topics:
   - "Building a Profitable Framer Practice from Scratch"
   - "Chrome Extensions as a Lead Gen Machine"
   - "Why Performance-First Design Wins"
3. Target podcasts whose listeners are startup founders/CMOs
4. End every episode with: "free audit at aestho.xyz/audit"
5. One good episode per month beats dozens of random ones

### Cold Email Sequence
Tool stack:
1. Find prospects: BuiltWith + Wappalyzer (outdated tech), PageSpeed API (slow sites)
2. Find contacts: Apollo.io or Hunter.io
3. Personalize: record Loom video for each prospect
4. Send: Instantly.ai or Smartlead (deliverability optimized)
5. Qualify: Tidio chatbot handles inbound from your site
6. Book: Cal.com for scheduling

Subject lines that work:
- "Quick question about [domain]"
- "Noticed something on [company].com"
- "[Name], made a quick video for you"

### Webinars
1. Monthly: "How to Build a High-Converting Framer Site in 60 Minutes"
2. Gate registration behind email capture
3. Structure: 30 min education, 15 min live demo, 15 min Q&A
4. Repurpose: clip into LinkedIn carousels, Twitter threads, YouTube shorts

### Speaking at Events
Apply to these open CFPs:
1. DeveloperWeek 2026 (on Sessionize)
2. WeAreDevelopers World Congress
3. Web Directions (Melbourne/Sydney - they pay travel + accommodation)
4. Start with local meetups to build a track record

### Stripe Payment-First Flow (DesignJoy Model)
1. Create Stripe payment links for each pricing tier
2. Landing page: $1,000 / Multi-page: $2,000 / Retainer: $2,000/mo
3. Flow: visitor clicks "Start Project" > Stripe checkout > intake form
4. Reduces friction vs "book a call first"
5. DesignJoy does $1M+/year with this model

### Build a Micro-SaaS
1. Small tool that solves one problem
2. Ideas: client portal, website uptime monitor, design feedback tool
3. Even $500/month revenue proves you build products, not just websites
4. This separates you from every other Framer freelancer

### Start a Paid Community
1. "Build your first Framer site in 2 weeks" cohort
2. 10-20 people at $200-$500 each
3. Run on Circle or Discord
4. Each cohort = marketing event + alumni who refer you

---

## WHAT'S ALREADY BUILT (Code Features)

All of these are live on the site:

- /audit - Free website grader (captures leads via email gate)
- Exit-intent popup (desktop, triggers when cursor leaves viewport)
- Scroll-triggered CTAs (after services, pricing, testimonials sections)
- Live project counter (50+ projects, 14 active, 12% conversion lift)
- Retainer pricing toggle (one-time vs monthly $2K-$3K/mo)
- Tidio chatbot placeholder (needs env key)
- Senja video testimonials placeholder (needs env key)
- /for/[company] - Personalized prospect pages for cold pitches
- /partners - White-label agency partnership page
- /signature - Email signature HTML with audit tool CTA
- /work - Portfolio with 14 real projects
- Before/after slider component (ready for case studies)
- Availability badge ("2 spots left this month" floating on homepage)
- GTM tracking (GTM-WTKJ9XZF)
- Structured data (Person, ProfessionalService, Website, Organization)
- llms.txt optimized for AI search engines
- 3 SEO blog posts (Framer expert, Figma to code, landing page pricing)
- 301 redirects, security headers, robots.txt fixes
