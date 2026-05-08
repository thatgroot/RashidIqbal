// ============================================================================
// SEO Data - Programmatic SEO Content for Service, Location, and Technology Pages
// ============================================================================

export interface Service {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    features: string[];
    benefits: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
    relatedTechnologies: string[];
    relatedServices: string[];
    priceRange: string;
}

export interface Location {
    slug: string;
    region: string;
    country: string;
    title: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    timezone: string;
    availability: string;
    localBenefits: string[];
    testimonialRegion?: string;
}

export interface Technology {
    slug: string;
    name: string;
    title: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    expertise: string[];
    useCases: string[];
    relatedServices: string[];
    icon?: string;
    certification?: {
        name: string;
        issuer: string;
        link?: string;
    };
}

// ============================================================================
// Services Data
// ============================================================================

export const SERVICES: Service[] = [
    {
        slug: "landing-pages",
        title: "Landing Page Design & Development",
        shortTitle: "Landing Pages",
        description: "High-converting landing pages designed in Figma with strategic UX copy, built pixel-perfect in Framer. Optimized for conversions from day one.",
        metaDescription: "Get a high-converting landing page designed in Figma and built in Framer. UX copywriting, conversion optimization, and sub-2s load times. Book a free consultation.",
        heroHeadline: "Landing Pages That Convert",
        heroSubheadline: "I design in Figma, write the UX copy, and build pixel-perfect Framer sites that turn visitors into customers.",
        features: [
            "Figma design with strategic UX copy",
            "Pixel-perfect Framer development",
            "Conversion-optimized page flow",
            "Mobile-first responsive layout",
            "Sub-2s load times",
            "SEO-ready structure & analytics",
        ],
        benefits: [
            {
                title: "Copy That Converts",
                description: "I write your headlines, CTAs, and value props as part of the design process. No generic placeholder copy.",
            },
            {
                title: "Figma-to-Framer Precision",
                description: "Your Figma design translates to Framer with zero compromise. Every pixel, interaction, and responsive behavior matches.",
            },
            {
                title: "SEO-Ready Foundation",
                description: "Semantic HTML, structured data, and optimized metadata built into every Framer page.",
            },
            {
                title: "Mobile-First Design",
                description: "60% of traffic comes from mobile. Your landing page will convert on every device.",
            },
        ],
        faqs: [
            {
                question: "How long does it take to build a landing page?",
                answer: "Most landing pages are completed in 2 weeks, including Figma design, UX copy, and Framer build.",
            },
            {
                question: "Do you write the copy or just design?",
                answer: "Both. I write conversion-focused UX copy: headlines, CTAs, value props, and page flow. All part of the design process.",
            },
            {
                question: "Why Framer instead of custom code?",
                answer: "Framer gives you agency-quality output that your team can update without calling a developer. It's the best of both worlds.",
            },
            {
                question: "Can you redesign my existing landing page?",
                answer: "Yes. I'll audit your current page for UX, copy, and conversion issues, then redesign and rebuild it in Framer.",
            },
        ],
        relatedTechnologies: ["framer", "figma"],
        relatedServices: ["framer-development", "figma-to-code"],
        priceRange: "Quote on call",
    },
    {
        slug: "framer-development",
        title: "Framer Website Development",
        shortTitle: "Framer Sites",
        description: "Full Framer websites with CMS, blog, and dynamic pages. Designed in Figma, built with conversion-focused UX and copywriting.",
        metaDescription: "Expert Framer developer for full websites. CMS, blog, dynamic pages, all designed in Figma with conversion-focused UX copy. Book a free call.",
        heroHeadline: "Framer Sites That Wow & Convert",
        heroSubheadline: "Full websites in Framer with CMS, blog, and dynamic pages. Your team can update everything without touching code.",
        features: [
            "Full multi-page Framer websites",
            "CMS & dynamic collections",
            "Custom interactions & animations",
            "UX copywriting included",
            "Team training & handoff",
            "SEO & performance optimization",
        ],
        benefits: [
            {
                title: "Your Team Can Update It",
                description: "Unlike traditional development, your marketing team can make changes, publish blog posts, and update content without calling a developer.",
            },
            {
                title: "Conversion-Focused Design",
                description: "Every page is designed with strategic UX copy, clear CTAs, and a flow that guides visitors toward action.",
            },
            {
                title: "Lightning-Fast Launches",
                description: "Framer sites launch 50% faster than custom-coded alternatives while maintaining premium quality.",
            },
            {
                title: "SEO-Optimized Output",
                description: "Framer generates clean, semantic HTML that search engines love. I optimize every meta tag and page structure.",
            },
        ],
        faqs: [
            {
                question: "Can Framer handle complex sites?",
                answer: "Yes. Framer supports CMS, localization, and advanced logic. It's perfect for marketing sites with 100+ pages.",
            },
            {
                question: "Do you design in Figma first?",
                answer: "Always. I design the full site in Figma with UX copy, get your approval, then build pixel-perfect in Framer.",
            },
            {
                question: "What about blog functionality?",
                answer: "Framer has a built-in CMS perfect for blogs, portfolio items, team pages, and any repeating content.",
            },
            {
                question: "How does Framer compare to Webflow?",
                answer: "Framer is more designer-friendly with better animation capabilities. I recommend it for teams who prioritize design quality and conversion.",
            },
        ],
        relatedTechnologies: ["framer", "figma"],
        relatedServices: ["landing-pages", "figma-to-code"],
        priceRange: "Quote on call",
    },
    {
        slug: "figma-to-code",
        title: "Figma to Framer Conversion",
        shortTitle: "Figma to Framer",
        description: "Pixel-perfect conversion of your Figma designs to production-ready Framer sites. UX copy review and conversion optimization included.",
        metaDescription: "Convert Figma designs to pixel-perfect Framer sites. UX copy review, conversion optimization, and responsive design. Fast turnaround.",
        heroHeadline: "Figma Designs, Brought to Life in Framer",
        heroSubheadline: "Your Figma designs converted to pixel-perfect, responsive Framer sites with UX copy review and conversion optimization.",
        features: [
            "Pixel-perfect Figma-to-Framer accuracy",
            "Responsive implementation across breakpoints",
            "UX copy review & optimization",
            "Component architecture in Framer",
            "Animation & interaction recreation",
            "CMS setup if needed",
        ],
        benefits: [
            {
                title: "100% Design Accuracy",
                description: "I match your Figma designs down to the pixel in Framer. Designers love working with me.",
            },
            {
                title: "Copy That Converts",
                description: "I review and optimize your UX copy during the conversion process, not just a mechanical translation.",
            },
            {
                title: "Responsive by Default",
                description: "I implement proper responsive behavior, even if your Figma only shows one breakpoint.",
            },
            {
                title: "Ready for Your Team",
                description: "The Framer site is structured so your team can update content, publish posts, and make changes without code.",
            },
        ],
        faqs: [
            {
                question: "Do you only convert to Framer?",
                answer: "Framer is my primary build platform, but I can also convert to Next.js or plain HTML/CSS if your project requires it.",
            },
            {
                question: "Will you review the copy during conversion?",
                answer: "Yes. I review headlines, CTAs, and page flow for conversion issues and suggest improvements as part of the process.",
            },
            {
                question: "What if my Figma is only desktop?",
                answer: "I'll implement sensible responsive behavior for tablet and mobile as part of the Framer build.",
            },
            {
                question: "How do you handle Figma auto-layout?",
                answer: "Auto-layout translates beautifully to Framer's layout system. I maintain the same flexible behavior.",
            },
        ],
        relatedTechnologies: ["figma", "framer"],
        relatedServices: ["landing-pages", "framer-development"],
        priceRange: "Quote on call",
    },
    {
        slug: "chrome-extensions",
        title: "Chrome Extension Development",
        shortTitle: "Chrome Extensions",
        description: "Custom Chrome extensions built from scratch. Productivity tools, SaaS companions, workflow automations. Designed, developed, and shipped to the Chrome Web Store.",
        metaDescription: "Hire a Chrome extension developer. I build standalone browser extensions for businesses. React, Manifest V3, Chrome Web Store publishing.",
        heroHeadline: "Chrome Extensions, Built from Scratch",
        heroSubheadline: "Got an idea for a Chrome extension? I design the UI, build it with React and Manifest V3, and get it live on the Chrome Web Store.",
        features: [
            "Chrome Manifest V3 development",
            "React-based extension UIs",
            "Third-party API integrations",
            "Background workers and storage",
            "Chrome Web Store publishing",
            "Post-launch updates and maintenance",
        ],
        benefits: [
            {
                title: "End-to-End Development",
                description: "From concept to Chrome Web Store. I handle UI design, development, testing, and the full submission process.",
            },
            {
                title: "Clean, Modern Architecture",
                description: "Built with React, TypeScript, and Manifest V3. No legacy code, no shortcuts.",
            },
            {
                title: "API Integrations",
                description: "Need to connect to your SaaS product, a third-party API, or browser features? I've done it all.",
            },
            {
                title: "Published and Maintained",
                description: "I handle Chrome Web Store submission, privacy policies, screenshots, and ongoing updates.",
            },
        ],
        faqs: [
            {
                question: "What kind of Chrome extensions do you build?",
                answer: "Standalone tools for businesses. Productivity apps, SaaS companion extensions, workflow automation, content tools. If it runs in Chrome, I can build it.",
            },
            {
                question: "Do you design the UI too?",
                answer: "Yes. I design the extension UI in Figma first, then build it. You see the design before any code is written.",
            },
            {
                question: "How long does a Chrome extension take?",
                answer: "A focused extension ships in 2-3 weeks. More complex ones with multiple API integrations take 4-6 weeks.",
            },
            {
                question: "Do you publish to the Chrome Web Store?",
                answer: "Yes. I handle the entire submission process including privacy policy, screenshots, and review.",
            },
        ],
        relatedTechnologies: ["chrome-extensions", "react"],
        relatedServices: ["landing-pages", "framer-development"],
        priceRange: "Custom",
    },
    {
        slug: "ux-copywriting",
        title: "UX Copywriting & Conversion Optimization",
        shortTitle: "UX Copy",
        description: "Strategic UX copywriting that turns visitors into customers. Headlines, CTAs, page flow, and microcopy, all designed to convert.",
        metaDescription: "UX copywriting and conversion optimization for landing pages and websites. Strategic headlines, CTAs, and page flow that drive results.",
        heroHeadline: "Copy That Converts, Not Just Fills Space",
        heroSubheadline: "I write strategic UX copy: headlines, CTAs, value props, and page flow. All designed to move visitors from interest to action.",
        features: [
            "Headline & CTA optimization",
            "Value proposition messaging",
            "Page flow & hierarchy design",
            "Microcopy & error messages",
            "A/B test copy variants",
            "Conversion audit & recommendations",
        ],
        benefits: [
            {
                title: "Words That Work",
                description: "Every headline, CTA, and body copy line is written with a conversion goal in mind. No filler.",
            },
            {
                title: "Design + Copy in Sync",
                description: "Because I also design and build, the copy and visual hierarchy work together seamlessly.",
            },
            {
                title: "Data-Informed Copy",
                description: "I use conversion data and user behavior to inform copy decisions, not just gut instinct.",
            },
            {
                title: "Full Page Strategy",
                description: "Not just individual headlines. I design the entire page narrative from first scroll to final CTA.",
            },
        ],
        faqs: [
            {
                question: "Do you write long-form content too?",
                answer: "My focus is UX copy: the strategic text on landing pages, product pages, and key conversion flows. For blog posts or content marketing, I can recommend specialists.",
            },
            {
                question: "Can you audit my existing copy?",
                answer: "Yes. I'll review your current page copy for clarity, persuasion, and conversion potential, then provide specific rewrite recommendations.",
            },
            {
                question: "Do you do A/B testing?",
                answer: "I write copy variants optimized for A/B testing and can help you set up the tests, but running them long-term is on your team.",
            },
            {
                question: "How does copywriting fit into the design process?",
                answer: "I write the copy before designing in Figma. Content-first design ensures the layout serves the message, not the other way around.",
            },
        ],
        relatedTechnologies: ["figma", "framer"],
        relatedServices: ["landing-pages", "framer-development"],
        priceRange: "Quote on call",
    },
];

// ============================================================================
// Locations Data
// ============================================================================

export const LOCATIONS: Location[] = [
    {
        slug: "united-states",
        region: "North America",
        country: "United States",
        title: "Hire a Figma & Framer Expert for US Projects",
        metaDescription: "Looking for a Figma & Framer expert for your US-based project? Conversion-focused design, UX copy, and Chrome extensions.",
        heroHeadline: "Figma & Framer Expert for US Startups",
        heroSubheadline: "Delivering high-converting Figma designs and Framer sites for American businesses. Flexible hours and fast delivery.",
        timezone: "Work-day overlap",
        availability: "Available for meetings during US business hours",
        localBenefits: [
            "Extensive experience with US-based startups and design agencies",
            "Strong understanding of American conversion patterns and UX standards",
            "Flexible scheduling for US East and West Coast overlap",
            "Proven track record of high-converting Framer sites for the US market",
        ],
        testimonialRegion: "US",
    },
    {
        slug: "united-kingdom",
        region: "Europe",
        country: "United Kingdom",
        title: "Hire a Figma & Framer Expert for UK Projects",
        metaDescription: "Figma & Framer expert serving UK clients. Landing pages, Chrome extensions, and UX copywriting. Excellent timezone overlap.",
        heroHeadline: "Figma & Framer Expert for UK Businesses",
        heroSubheadline: "High-converting Framer sites and Chrome extensions for the UK market. Convenient timezone for same-day collaboration.",
        timezone: "PKT (5-hour offset from GMT)",
        availability: "Afternoon UK time meetings and async collaboration",
        localBenefits: [
            "Convenient 5-hour timezone offset for same-day progress updates",
            "Significant experience collaborating with UK creative agencies",
            "Familiarity with British design aesthetics and business standards",
            "Reliable, high-quality Figma and Framer work tailored for UK clients",
        ],
        testimonialRegion: "UK",
    },
    {
        slug: "canada",
        region: "North America",
        country: "Canada",
        title: "Hire a Figma & Framer Expert for Canadian Projects",
        metaDescription: "Figma & Framer expert for Canadian businesses. Conversion-focused landing pages, UX copy, and Chrome extensions.",
        heroHeadline: "Figma & Framer Expertise for Canadian Clients",
        heroSubheadline: "Helping Canadian startups and businesses convert more visitors with strategic Figma design, Framer builds, and UX copywriting.",
        timezone: "EST/PST Friendly",
        availability: "Available for morning syncs and daily async updates",
        localBenefits: [
            "Deep experience working with Canadian tech hubs (Toronto, Vancouver)",
            "Adaptable scheduling to cover Canada's multiple timezones",
            "Premium Figma & Framer quality at competitive international rates",
            "Conversion-focused UX for the North American market",
        ],
    },
    {
        slug: "australia",
        region: "Asia Pacific",
        country: "Australia",
        title: "Hire a Figma & Framer Expert for Australian Projects",
        metaDescription: "Figma & Framer expert serving Australia. Landing pages, Chrome extensions, and UX copywriting. Close timezone for real-time collaboration.",
        heroHeadline: "Figma & Framer Expert for Australian Brands",
        heroSubheadline: "Close timezone alignment for real-time collaboration. Building high-converting Framer sites and design tools for the APAC region.",
        timezone: "AEDT/ACDT Friendly",
        availability: "Significant real-time overlap during Australian business hours",
        localBenefits: [
            "Minimal timezone difference for easy real-time communication",
            "Collaborate during your peak business hours for faster iterations",
            "Strong understanding of the Australian tech and startup landscape",
            "High-quality Figma & Framer work optimized for APAC audiences",
        ],
        testimonialRegion: "APAC",
    },
    {
        slug: "remote",
        region: "Worldwide",
        country: "Remote",
        title: "Hire a Remote Figma & Framer Expert",
        metaDescription: "100% remote Figma & Framer expert. Conversion-focused landing pages, Chrome extensions, and UX copywriting. Async-first communication.",
        heroHeadline: "Remote Figma & Framer Expertise",
        heroSubheadline: "I've been remote-first since day one. Async communication, daily updates, and consistent delivery of Figma designs and Framer sites.",
        timezone: "Async-first",
        availability: "Daily updates, flexible meeting times",
        localBenefits: [
            "5+ years of fully remote work experience",
            "Mastered async communication for Figma & Framer projects",
            "Daily written updates and weekly video calls",
            "Works with any timezone, any country",
        ],
    },
];

// ============================================================================
// Technologies Data
// ============================================================================

export const TECHNOLOGIES: Technology[] = [
    {
        slug: "figma",
        name: "Figma",
        title: "Figma Expert for Hire",
        metaDescription: "Hire a Figma expert for your design project. UX design, design systems, Figma-to-Framer conversion, and strategic UX copywriting.",
        heroHeadline: "Figma Design Expert",
        heroSubheadline: "I design conversion-focused pages in Figma with strategic UX copy, component systems, and pixel-perfect layouts ready for Framer.",
        expertise: [
            "High-fidelity UI design",
            "Design systems & component libraries",
            "UX copywriting within Figma",
            "Auto-layout & responsive design",
            "Prototyping & interaction design",
            "Developer handoff & documentation",
        ],
        useCases: [
            "Landing page design with UX copy",
            "Full website design systems",
            "Figma-to-Framer conversion prep",
            "Brand identity & visual design",
            "Chrome extension UI design",
        ],
        relatedServices: ["landing-pages", "figma-to-code"],
    },
    {
        slug: "framer",
        name: "Framer",
        title: "Framer Expert for Hire",
        metaDescription: "Hire a Framer expert for your website. Custom components, CMS, conversion optimization, and team training. Certified Framer developer.",
        heroHeadline: "Framer Development Expert",
        heroSubheadline: "I push Framer to its limits. From landing pages to complex multi-page sites with CMS, built with conversion-focused UX and copy.",
        expertise: [
            "Custom code components & overrides",
            "CMS & dynamic collections",
            "Advanced interactions & animations",
            "Conversion-optimized page architecture",
            "SEO & performance optimization",
            "Team training & content handoff",
        ],
        useCases: [
            "Marketing websites with CMS",
            "High-converting landing pages",
            "Portfolio & personal brand sites",
            "Product launch pages",
            "Startup websites",
        ],
        relatedServices: ["framer-development", "landing-pages"],
        certification: {
            name: "Official Framer Expert",
            issuer: "Framer",
            link: "https://www.framer.com/@risiq",
        },
    },
    {
        slug: "chrome-extensions",
        name: "Chrome Extensions",
        title: "Chrome Extension Developer for Hire",
        metaDescription: "Hire a Chrome extension developer. Standalone browser extensions for businesses. React, Manifest V3, API integrations, Chrome Web Store.",
        heroHeadline: "Chrome Extension Development",
        heroSubheadline: "I build standalone Chrome extensions for businesses. Productivity tools, SaaS companions, workflow automations. From idea to Chrome Web Store.",
        expertise: [
            "Chrome Extension Manifest V3",
            "React-based popup and sidebar UIs",
            "Content scripts and background workers",
            "Third-party API integrations",
            "Chrome Web Store publishing",
            "Extension performance optimization",
        ],
        useCases: [
            "SaaS companion extensions",
            "Productivity and workflow tools",
            "Content automation extensions",
            "Data extraction and analysis tools",
            "Browser-based utility apps",
        ],
        relatedServices: ["chrome-extensions"],
    },
    {
        slug: "nextjs",
        name: "Next.js",
        title: "Next.js Developer for Hire",
        metaDescription: "Hire a Next.js developer. App Router, Server Components, and full-stack development. Specializing in high-performance landing pages.",
        heroHeadline: "Next.js Development Expert",
        heroSubheadline: "When projects need custom functionality beyond Framer, I build with Next.js. Performance-optimized, SEO-ready, and conversion-focused.",
        expertise: [
            "App Router & Server Components",
            "API Routes & Server Actions",
            "Static Site Generation (SSG)",
            "Performance optimization",
            "SEO & structured data",
            "Vercel deployment",
        ],
        useCases: [
            "High-performance marketing websites",
            "Custom web applications",
            "Portfolio sites with dynamic features",
            "Content-heavy blogs and publications",
            "Chrome extension backend services",
        ],
        relatedServices: ["landing-pages", "figma-to-code"],
    },
    {
        slug: "react",
        name: "React",
        title: "React Developer for Hire",
        metaDescription: "Expert React developer. Component architecture, Chrome extensions, and modern React patterns for Figma and Framer ecosystem tools.",
        heroHeadline: "React Development Specialist",
        heroSubheadline: "React powers my Chrome extensions, Framer components, and custom web builds. Clean architecture that your team will love.",
        expertise: [
            "Hooks & custom hooks",
            "Component architecture",
            "Chrome Extension UIs with React",
            "Framer code components",
            "Performance optimization",
            "TypeScript integration",
        ],
        useCases: [
            "Chrome extension interfaces",
            "Framer custom code components",
            "Interactive web applications",
            "Component libraries",
            "Design tool integrations",
        ],
        relatedServices: ["chrome-extensions", "figma-to-code"],
    },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find((service) => service.slug === slug);
}

export function getLocationBySlug(slug: string): Location | undefined {
    return LOCATIONS.find((location) => location.slug === slug);
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
    return TECHNOLOGIES.find((tech) => tech.slug === slug);
}

export function getAllServiceSlugs(): string[] {
    return SERVICES.map((service) => service.slug);
}

export function getAllLocationSlugs(): string[] {
    return LOCATIONS.map((location) => location.slug);
}

export function getAllTechnologySlugs(): string[] {
    return TECHNOLOGIES.map((tech) => tech.slug);
}
