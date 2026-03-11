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
        title: "Landing Page Development",
        shortTitle: "Landing Pages",
        description: "High-converting landing pages that turn visitors into customers. Built with Framer or Next.js for maximum performance.",
        metaDescription: "Get a high-converting landing page built by an expert developer. Framer & Next.js specialist. Fast delivery, pixel-perfect design. Book a free consultation.",
        heroHeadline: "Landing Pages That Convert",
        heroSubheadline: "I build landing pages that don't just look good—they're engineered to turn visitors into paying customers.",
        features: [
            "Conversion-optimized design",
            "Mobile-first responsive layout",
            "Fast loading speeds (sub-2s)",
            "SEO-ready structure",
            "Analytics integration",
            "A/B testing ready",
        ],
        benefits: [
            {
                title: "Higher Conversion Rates",
                description: "Strategic placement of CTAs, social proof, and value propositions designed to maximize conversions.",
            },
            {
                title: "Lightning Fast Performance",
                description: "Optimized images, lazy loading, and modern frameworks ensure your page loads in under 2 seconds.",
            },
            {
                title: "SEO-Ready Foundation",
                description: "Built with semantic HTML, structured data, and optimized metadata to rank higher on Google.",
            },
            {
                title: "Mobile-First Design",
                description: "60% of traffic comes from mobile. Your landing page will look perfect on every device.",
            },
        ],
        faqs: [
            {
                question: "How long does it take to build a landing page?",
                answer: "Most landing pages are completed in 1-2 weeks. Rush delivery is available for time-sensitive launches.",
            },
            {
                question: "Do you provide the design or just development?",
                answer: "Both! I can work from your existing Figma designs or create a custom design from scratch based on your brand.",
            },
            {
                question: "What platform do you recommend—Framer or Next.js?",
                answer: "Framer is perfect for marketing sites that your team needs to update frequently. Next.js is better for complex functionality or custom integrations.",
            },
            {
                question: "Can you help with copywriting?",
                answer: "I provide guidance on copy structure and can recommend copywriters, but I focus on design and development.",
            },
        ],
        relatedTechnologies: ["nextjs", "framer", "react"],
        relatedServices: ["web-applications", "figma-to-code"],
        priceRange: "$4,900+",
    },
    {
        slug: "web-applications",
        title: "Web Application Development",
        shortTitle: "Web Apps",
        description: "Full-stack web applications built with Next.js and React. From MVP to enterprise-scale, I build apps that grow with you.",
        metaDescription: "Custom web application development with Next.js & React. Full-stack solutions from MVP to enterprise scale. Expert freelance developer available now.",
        heroHeadline: "Web Apps Built to Scale",
        heroSubheadline: "From MVP to enterprise, I build web applications with clean architecture that grows with your business.",
        features: [
            "Full-stack development",
            "Authentication & authorization",
            "Database design & integration",
            "API development",
            "Real-time features",
            "Cloud deployment",
        ],
        benefits: [
            {
                title: "Clean, Maintainable Code",
                description: "Type-safe TypeScript codebase with clear architecture patterns that your future team will thank you for.",
            },
            {
                title: "Scalable Infrastructure",
                description: "Built on modern cloud platforms like Vercel, AWS, or Firebase that scale automatically with your growth.",
            },
            {
                title: "Rapid Development",
                description: "Weekly sprints with visible progress. You'll see your app come to life every single week.",
            },
            {
                title: "Production-Ready Security",
                description: "Authentication, authorization, and data protection built in from day one.",
            },
        ],
        faqs: [
            {
                question: "What's your tech stack for web apps?",
                answer: "I primarily use Next.js with TypeScript, Tailwind CSS for styling, and PostgreSQL or Firebase for the database. I can adapt based on your needs.",
            },
            {
                question: "Can you work with an existing codebase?",
                answer: "Absolutely. I regularly take over projects, refactor codebases, and add new features to existing applications.",
            },
            {
                question: "How do you handle project management?",
                answer: "I work in weekly sprints using Linear or your preferred tool. You get daily updates and weekly demos of progress.",
            },
            {
                question: "What about ongoing maintenance?",
                answer: "I offer retainer packages for ongoing development and maintenance. We can discuss this after the initial build.",
            },
        ],
        relatedTechnologies: ["nextjs", "react", "typescript"],
        relatedServices: ["landing-pages", "mobile-apps"],
        priceRange: "$9,500+",
    },
    {
        slug: "mobile-apps",
        title: "Mobile App Development",
        shortTitle: "Mobile Apps",
        description: "Cross-platform mobile apps for iOS and Android. Built with React Native/Expo or Flutter for native performance.",
        metaDescription: "Cross-platform mobile app development with React Native & Flutter. Native performance on iOS & Android. Freelance developer with 50+ apps delivered.",
        heroHeadline: "Mobile Apps, Native Feel",
        heroSubheadline: "One codebase, two platforms. I build iOS and Android apps that feel truly native.",
        features: [
            "Cross-platform (iOS & Android)",
            "Native performance",
            "Push notifications",
            "Offline support",
            "App Store deployment",
            "Analytics & crash reporting",
        ],
        benefits: [
            {
                title: "One Codebase, Two Platforms",
                description: "Save 40% on development costs by building for iOS and Android simultaneously.",
            },
            {
                title: "Native User Experience",
                description: "Platform-specific UI patterns that feel natural to both iOS and Android users.",
            },
            {
                title: "App Store Success",
                description: "I handle the entire submission process to get your app approved and live.",
            },
            {
                title: "Future-Proof Technology",
                description: "React Native and Flutter are backed by Meta and Google, ensuring long-term support.",
            },
        ],
        faqs: [
            {
                question: "React Native or Flutter—which should I choose?",
                answer: "React Native is my go-to for most projects due to its mature ecosystem. Flutter is excellent for highly custom UIs or when you need identical designs across platforms.",
            },
            {
                question: "Do you handle App Store submissions?",
                answer: "Yes, I manage the entire process—from setting up developer accounts to navigating the review process and getting your app live.",
            },
            {
                question: "Can you integrate with our existing backend?",
                answer: "Absolutely. I can work with any REST or GraphQL API, or build a new backend if needed.",
            },
            {
                question: "What about app updates after launch?",
                answer: "I offer maintenance packages for ongoing updates, bug fixes, and OS compatibility.",
            },
        ],
        relatedTechnologies: ["expo", "flutter", "react"],
        relatedServices: ["web-applications"],
        priceRange: "$8,900+",
    },
    {
        slug: "framer-development",
        title: "Framer Website Development",
        shortTitle: "Framer Sites",
        description: "Beautiful, no-code websites built with Framer. Perfect for startups and marketing teams who need to move fast.",
        metaDescription: "Expert Framer developer for stunning websites. No-code platform, infinite flexibility. Marketing teams and startups love working with me.",
        heroHeadline: "Framer Sites That Wow",
        heroSubheadline: "The no-code platform with infinite flexibility. I build Framer websites that your team can actually update.",
        features: [
            "No-code platform",
            "CMS integration",
            "Custom interactions",
            "Team collaboration",
            "Built-in analytics",
            "Easy content updates",
        ],
        benefits: [
            {
                title: "Your Team Can Update It",
                description: "Unlike traditional development, your marketing team can make changes without calling a developer.",
            },
            {
                title: "Lightning-Fast Launches",
                description: "Framer sites typically launch 50% faster than custom-coded alternatives.",
            },
            {
                title: "World-Class Design",
                description: "Framer's design tools enable interactions and animations that feel premium and polished.",
            },
            {
                title: "SEO-Optimized Output",
                description: "Framer generates clean, semantic HTML that search engines love.",
            },
        ],
        faqs: [
            {
                question: "Is Framer really no-code?",
                answer: "For your team, yes! I handle any custom logic or advanced features during the build, then hand you a site you can update without code.",
            },
            {
                question: "Can Framer handle complex sites?",
                answer: "Yes! Framer now supports CMS, localization, and advanced logic. It's perfect for marketing sites with up to 100+ pages.",
            },
            {
                question: "What about blog functionality?",
                answer: "Framer has a built-in CMS perfect for blogs, portfolio items, team pages, and any repeating content.",
            },
            {
                question: "How does Framer compare to Webflow?",
                answer: "Framer is more designer-friendly with better animation capabilities. I recommend it for teams who prioritize design quality.",
            },
        ],
        relatedTechnologies: ["framer", "figma"],
        relatedServices: ["landing-pages", "figma-to-code"],
        priceRange: "$3,900+",
    },
    {
        slug: "figma-to-code",
        title: "Figma to Code Conversion",
        shortTitle: "Figma to Code",
        description: "Pixel-perfect conversion of your Figma designs to production-ready code. React, Next.js, or plain HTML/CSS.",
        metaDescription: "Convert Figma designs to pixel-perfect code. React, Next.js, and HTML/CSS expert. Fast turnaround, clean code, responsive design.",
        heroHeadline: "Figma Designs, Brought to Life",
        heroSubheadline: "Your pixel-perfect Figma designs converted to clean, responsive, production-ready code.",
        features: [
            "Pixel-perfect accuracy",
            "Responsive implementation",
            "Clean, semantic code",
            "Component architecture",
            "Animation recreation",
            "Design system setup",
        ],
        benefits: [
            {
                title: "100% Design Accuracy",
                description: "I match your Figma designs down to the pixel. Designers love working with me.",
            },
            {
                title: "Clean Component Code",
                description: "Organized, reusable components that follow best practices and are easy to maintain.",
            },
            {
                title: "Responsive by Default",
                description: "I implement proper responsive behavior, even if your Figma only shows one breakpoint.",
            },
            {
                title: "Ready for Production",
                description: "Code that's optimized, accessible, and ready to deploy—not just a prototype.",
            },
        ],
        faqs: [
            {
                question: "What format will I receive?",
                answer: "I can deliver React components, Next.js pages, or plain HTML/CSS—whatever works best for your project.",
            },
            {
                question: "Do you set up a design system?",
                answer: "Yes! I configure your colors, typography, and spacing as reusable variables for consistency.",
            },
            {
                question: "What if my Figma is only desktop?",
                answer: "I'll implement sensible responsive behavior and can add mobile/tablet breakpoints at an additional cost.",
            },
            {
                question: "How do you handle Figma auto-layout?",
                answer: "Auto-layout translates beautifully to CSS Flexbox. I maintain the same flexible behavior in code.",
            },
        ],
        relatedTechnologies: ["react", "nextjs", "figma"],
        relatedServices: ["landing-pages", "framer-development"],
        priceRange: "$2,500+",
    },
    {
        slug: "ai-agents",
        title: "AI Agent & Chatbot Development",
        shortTitle: "AI Agents",
        description: "Custom AI chatbots and voice agents integrated into your existing platforms. Powered by Claude, OpenAI, and custom LLMs.",
        metaDescription: "Hire an expert AI agent developer. Integrate custom GPTs, Claude chatbots, and voice agents into your business in under a week.",
        heroHeadline: "AI Agents That Actually Work",
        heroSubheadline: "Stop relying on basic prompts. I build deterministic, secure, and highly capable AI agents integrated directly into your operations.",
        features: [
            "Custom LLM API integration",
            "Voice-to-Voice (V2V) agents",
            "RAG (Retrieval-Augmented Generation)",
            "Secure data handling",
            "Platform integration (Slack, Notion, Web)",
            "Agent performance monitoring",
        ],
        benefits: [
            {
                title: "24/7 Customer Support",
                description: "Deploy agents that resolve 80% of tier-1 support queries instantly.",
            },
            {
                title: "Seamless Integration",
                description: "Agents that live where your users are—on your site, in Slack, or via SMS.",
            },
            {
                title: "Enterprise-Grade Security",
                description: "Strict guardrails and access controls to keep your data private and secure.",
            },
            {
                title: "Rapid Deployment",
                description: "Get a functional, customized chatbot installed and running in just 3 business days.",
            },
        ],
        faqs: [
            {
                question: "What AI models do you use?",
                answer: "I build with the best tool for the job. Often, this means Claude 3.5 Sonnet for coding and logic, or GPT-4o for general intelligence, using their official APIs.",
            },
            {
                question: "How long does a basic chatbot take to build?",
                answer: "A custom chatbot added to your existing website can be delivered in 3 business days for $800.",
            },
            {
                question: "Can the AI access my company's private data?",
                answer: "Yes, using RAG (Retrieval-Augmented Generation), I can securely connect the AI to your knowledge base without exposing it to public training sets.",
            },
            {
                question: "Is ongoing maintenance included?",
                answer: "I offer optional retainer packages to monitor agent performance, adjust system prompts, and handle API updates.",
            },
        ],
        relatedTechnologies: ["nextjs", "react"],
        relatedServices: ["automation-workflows", "web-applications"],
        priceRange: "$1,500+",
    },
    {
        slug: "prototype-rescue",
        title: "AI Prototype Rescue & Refactoring",
        shortTitle: "Prototype Rescue",
        description: "Turn your buggy AI-generated prototype (Bolt, Lovable, v0) into a secure, production-ready application.",
        metaDescription: "Fix broken AI prototypes from Bolt.new, v0, and Lovable. Expert Next.js developer to rescue, refactor, and deploy your MVP.",
        heroHeadline: "Rescue Your AI Prototype",
        heroSubheadline: "Did an AI write your app, but now it won't deploy? I fix security issues, refactor messy code, and get your MVP to production.",
        features: [
            "Security vulnerability patching",
            "Architecture refactoring",
            "Database optimization",
            "Performance tuning",
            "Vercel/AWS deployment",
            "Codebase handover",
        ],
        benefits: [
            {
                title: "Get to Market Faster",
                description: "Don't abandon your prototype. Let's fix the blockers and launch it this week.",
            },
            {
                title: "Production-Ready Code",
                description: "I replace hallucinated, unmaintainable code with clean, scalable Next.js architecture.",
            },
            {
                title: "Fixed Price & Timeline",
                description: "A transparent, flat-rate rescue mission. No hourly billing surprises.",
            },
            {
                title: "Deployment Handled",
                description: "I'll properly configure your domains, CI/CD pipelines, and cloud hosting.",
            },
        ],
        faqs: [
            {
                question: "What platforms do you rescue?",
                answer: "I commonly fix codebases generated by Bolt.new, Lovable, v0, Cursor, and ChatGPT.",
            },
            {
                question: "How does the rescue process work?",
                answer: "I conduct a codebase audit, fix glaring security holes, establish a proper database connection, and deploy it to a live environment.",
            },
            {
                question: "How long does a rescue take?",
                answer: "A standard prototype rescue takes exactly 1 week.",
            },
            {
                question: "Will I understand the code afterward?",
                answer: "Absolutely. I restructure the chaos into a standard Next.js directory and provide a handover walkthrough.",
            },
        ],
        relatedTechnologies: ["nextjs", "react"],
        relatedServices: ["web-applications", "ai-agents"],
        priceRange: "$1,200",
    },
    {
        slug: "automation-workflows",
        title: "Workflow Automation via n8n & Zapier",
        shortTitle: "Automations",
        description: "Connect your tools and automate repetitive tasks. Custom backend flows using n8n, Make.com, and Zapier.",
        metaDescription: "Expert workflow automation developer. n8n, Zapier, and Make.com integrations to scale your operations without hiring more staff.",
        heroHeadline: "Automate Your Operations",
        heroSubheadline: "Stop doing manual data entry. I build custom backend automations that connect your tools and save you hundreds of hours.",
        features: [
            "n8n workflow development",
            "Zapier & Make.com setup",
            "Custom API integrations",
            "CRM & Email automation",
            "AI-powered routing",
            "Error handling & logging",
        ],
        benefits: [
            {
                title: "Massive Time Savings",
                description: "Automate hours of daily manual work, freeing you to focus on strategy and growth.",
            },
            {
                title: "Zero Human Error",
                description: "Deterministic workflows ensure data is passed perfectly between your systems every single time.",
            },
            {
                title: "AI-Enhanced Workflows",
                description: "Insert AI decision-making (like sentiment analysis) directly into your data pipelines.",
            },
            {
                title: "Scalable Infrastructure",
                description: "Whether using Zapier for simplicity or self-hosted n8n for scale, the architecture grows with you.",
            },
        ],
        faqs: [
            {
                question: "Should I use n8n, Zapier, or Make?",
                answer: "Zapier is great for simple, low-volume tasks. Make is better for complex branching. n8n is my top choice for enterprise-scale or highly customized logic, especially when self-hosted.",
            },
            {
                question: "Do I need to pay for the automation platforms?",
                answer: "You will need an account for Zapier or Make. n8n can be self-hosted to avoid per-task pricing, which I can set up for you.",
            },
            {
                question: "What tools can you connect?",
                answer: "If it has an API, I can connect it. Common integrations include Slack, Notion, Airtable, Stripe, OpenAI, and various CRMs.",
            },
            {
                question: "What happens if a workflow breaks?",
                answer: "I build robust error handling into every workflow, meaning you (and I) get alerted immediately if an API fails, rather than losing data silently.",
            },
        ],
        relatedTechnologies: ["nextjs"],
        relatedServices: ["ai-agents"],
        priceRange: "$2,000+",
    }
];

// ============================================================================
// Locations Data
// ============================================================================

export const LOCATIONS: Location[] = [
    {
        slug: "pakistan",
        region: "South Asia",
        country: "Pakistan",
        title: "Hire a Developer from Pakistan",
        metaDescription: "Hire an expert freelance web developer from Pakistan. Next.js, Framer, React Native specialist. Competitive rates, world-class quality.",
        heroHeadline: "Leading Next.js & Framer Developer in Pakistan",
        heroSubheadline: "Helping local and global businesses grow with high-performance web solutions built right here in Pakistan. World-class quality, local expertise.",
        timezone: "PKT (UTC+5)",
        availability: "Full-time availability with global overlap",
        localBenefits: [
            "Highly competitive rates for premium quality development",
            "Native-level fluency and strong international communication",
            "Deep understanding of both local and global market trends",
            "Seamless collaboration across all major timezones",
        ],
    },
    {
        slug: "united-states",
        region: "North America",
        country: "United States",
        title: "Hire a Developer for US Projects",
        metaDescription: "Looking for a freelance developer for your US-based project? I serve clients across America with flexible hours and proven expertise.",
        heroHeadline: "Freelance Development for US Startups & Agencies",
        heroSubheadline: "Delivering pixel-perfect Next.js and Framer projects for American businesses. I bridge the gap with flexible hours and high-velocity delivery.",
        timezone: "Work-day overlap",
        availability: "Available for meetings during US business hours",
        localBenefits: [
            "Extensive experience with US-based startups and design agencies",
            "Strong understanding of American business culture and standards",
            "Flexible scheduling designed for US East and West Coast overlap",
            "Proven track record of delivering high-converting products for the US market",
        ],
        testimonialRegion: "US",
    },
    {
        slug: "united-kingdom",
        region: "Europe",
        country: "United Kingdom",
        title: "Hire a Developer for UK Projects",
        metaDescription: "Freelance web developer serving UK clients. Expert in Next.js, Framer, and React. Excellent timezone overlap with British working hours.",
        heroHeadline: "Expert Web Development for UK-Based Businesses",
        heroSubheadline: "Bringing high-performance Next.js apps and Framer sites to the UK market. Enjoy seamless communication and afternoon meeting availability.",
        timezone: "PKT (5-hour offset from GMT)",
        availability: "Afternoon UK time meetings and async collaboration",
        localBenefits: [
            "Convenient 5-hour timezone offset for same-day progress updates",
            "Significant experience collaborating with UK creative agencies",
            "Familiarity with British design aesthetics and business etiquette",
            "Reliable, high-quality development tailored for UK standards",
        ],
        testimonialRegion: "UK",
    },
    {
        slug: "canada",
        region: "North America",
        country: "Canada",
        title: "Hire a Developer for Canadian Projects",
        metaDescription: "Expert freelance web developer for Canadian businesses. Next.js, React, and mobile app specialist. Quality development at competitive rates.",
        heroHeadline: "Next.js & Framer Expertise for Canadian Clients",
        heroSubheadline: "Helping Canadian startups and businesses scale with fast, secure, and beautiful web applications. Flexible availability for all provinces.",
        timezone: "EST/PST Friendly",
        availability: "Available for morning syncs and daily async updates",
        localBenefits: [
            "Deep experience working with Canadian tech hubs (Toronto, Vancouver)",
            "Adaptable scheduling to cover Canada's multiple timezones",
            "Premium quality development at highly competitive international rates",
            "Strong focus on performance and accessibility for the North American market",
        ],
    },
    {
        slug: "australia",
        region: "Asia Pacific",
        country: "Australia",
        title: "Hire a Developer for Australian Projects",
        metaDescription: "Freelance developer serving Australia. React, Next.js, and mobile development expert. Similar timezone for seamless collaboration.",
        heroHeadline: "Seamless Web Development for Australian Brands",
        heroSubheadline: "Take advantage of our close timezone alignment for real-time collaboration. Building world-class digital products for the APAC region.",
        timezone: "AEDT/ACDT Friendly",
        availability: "Significant real-time overlap during Australian business hours",
        localBenefits: [
            "Minimal timezone difference for easy real-time communication",
            "Collaborate during your peak business hours for faster iterations",
            "Strong understanding of the Australian tech and startup landscape",
            "High-quality development optimized for the APAC market",
        ],
        testimonialRegion: "APAC",
    },
    {
        slug: "remote",
        region: "Worldwide",
        country: "Remote",
        title: "Hire a Remote Freelance Developer",
        metaDescription: "100% remote freelance developer available worldwide. Expert in Next.js, React, and mobile development. Async-first communication.",
        heroHeadline: "Remote Development, Done Right",
        heroSubheadline: "I've been remote-first since day one. Async communication, daily updates, and consistent delivery.",
        timezone: "Async-first",
        availability: "Daily updates, flexible meeting times",
        localBenefits: [
            "5+ years of fully remote work experience",
            "Mastered async communication",
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
        slug: "nextjs",
        name: "Next.js",
        title: "Next.js Developer for Hire",
        metaDescription: "Hire an expert Next.js developer. 5+ years of React & Next.js experience. App Router, Server Components, and full-stack development.",
        heroHeadline: "Next.js Development Expert",
        heroSubheadline: "I've been building with Next.js since version 9. From landing pages to complex web apps, I know this framework inside out.",
        expertise: [
            "App Router & Server Components",
            "API Routes & Server Actions",
            "Static Site Generation (SSG)",
            "Incremental Static Regeneration (ISR)",
            "Middleware & Edge Functions",
            "Vercel Deployment & Optimization",
        ],
        useCases: [
            "High-performance marketing websites",
            "Full-stack SaaS applications",
            "E-commerce storefronts",
            "Content-heavy blogs and publications",
            "Dashboard applications",
        ],
        relatedServices: ["landing-pages", "web-applications"],
    },
    {
        slug: "react",
        name: "React",
        title: "React Developer for Hire",
        metaDescription: "Expert React developer available for freelance projects. Component architecture, state management, and modern React patterns.",
        heroHeadline: "React Development Specialist",
        heroSubheadline: "React is my bread and butter. I build scalable component architectures that your team will love maintaining.",
        expertise: [
            "Hooks & Custom Hooks",
            "Context & State Management",
            "Component Architecture",
            "Performance Optimization",
            "Testing with React Testing Library",
            "TypeScript Integration",
        ],
        useCases: [
            "Interactive web applications",
            "Dashboard interfaces",
            "Component libraries",
            "Single-page applications",
            "Complex form systems",
        ],
        relatedServices: ["web-applications", "figma-to-code"],
        certification: {
            name: "Meta Certified React Developer",
            issuer: "Meta",
        },
    },
    {
        slug: "framer",
        name: "Framer",
        title: "Framer Developer for Hire",
        metaDescription: "Expert Framer developer for stunning websites. Custom components, CMS setup, and team training. No-code platform, limitless possibilities.",
        heroHeadline: "Framer Development Expert",
        heroSubheadline: "I push Framer to its limits. From simple landing pages to complex multi-page sites with CMS—I've built it all.",
        expertise: [
            "Custom Code Components",
            "CMS & Collections",
            "Advanced Interactions",
            "Design System Setup",
            "SEO Optimization",
            "Team Training & Handoff",
        ],
        useCases: [
            "Marketing websites",
            "Portfolio sites",
            "Company websites with CMS",
            "Product launch pages",
            "Startup landing pages",
        ],
        relatedServices: ["framer-development", "landing-pages"],
        certification: {
            name: "Official Framer Expert",
            issuer: "Framer",
            link: "https://www.framer.com/@rashidiqbal",
        },
    },
    {
        slug: "expo",
        name: "Expo / React Native",
        title: "Expo & React Native Developer for Hire",
        metaDescription: "Hire an Expo & React Native developer. Cross-platform mobile apps for iOS and Android. Fast development, native performance.",
        heroHeadline: "Expo & React Native Expert",
        heroSubheadline: "I build cross-platform mobile apps that feel native. One codebase, two platforms, zero compromises.",
        expertise: [
            "Expo SDK & Managed Workflow",
            "EAS Build & Submit",
            "Push Notifications",
            "Navigation (React Navigation)",
            "Offline-first Architecture",
            "Native Module Integration",
        ],
        useCases: [
            "Consumer mobile apps",
            "Enterprise mobile solutions",
            "MVP mobile apps",
            "Social networking apps",
            "E-commerce mobile apps",
        ],
        relatedServices: ["mobile-apps"],
    },
    {
        slug: "flutter",
        name: "Flutter",
        title: "Flutter Developer for Hire",
        metaDescription: "Expert Flutter developer for cross-platform mobile apps. Beautiful UIs, native performance on iOS and Android. Dart specialist.",
        heroHeadline: "Flutter Development Expert",
        heroSubheadline: "When pixel-perfect custom UIs are the priority, Flutter delivers. I build beautiful apps that perform flawlessly.",
        expertise: [
            "Custom Widget Development",
            "State Management (Riverpod, BLoC)",
            "Platform Channels",
            "Firebase Integration",
            "App Store Deployment",
            "Performance Optimization",
        ],
        useCases: [
            "Highly custom UI applications",
            "Cross-platform with identical design",
            "Animation-heavy apps",
            "Fintech mobile apps",
            "Health & fitness apps",
        ],
        relatedServices: ["mobile-apps"],
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
