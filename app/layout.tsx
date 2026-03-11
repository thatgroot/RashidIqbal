import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";
import { OEmbedLinks } from "@/components/seo/oembed-links";
import { SITE_URL as siteUrl } from "@/lib/constants";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-BZT67TX18E";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rashid Iqbal — Next.js & Framer Developer | Pakistan",
    template: "%s | Rashid Iqbal"
  },
  description: "Hire a freelance Next.js and Framer developer from Pakistan. I build high-converting landing pages, web applications, and mobile apps. Fast delivery, pixel-perfect design.",
  keywords: [
    "Next.js developer Pakistan",
    "Framer developer",
    "freelance web developer Pakistan",
    "hire Next.js developer",
    "landing page developer",
    "React developer Pakistan",
    "Figma to code",
    "Framer expert",
    "mobile app developer Expo Flutter",
    "web application developer",
    "freelance developer for hire",
    "Pakistan web developer",
  ],
  authors: [{ name: "Rashid Iqbal", url: siteUrl }],
  creator: "Rashid Iqbal",
  publisher: "Rashid Iqbal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rashid Iqbal",
    title: "Rashid Iqbal — Next.js & Framer Developer | Pakistan",
    description: "Hire a freelance Next.js and Framer developer from Pakistan. High-converting landing pages, web apps, and mobile apps. 50+ projects delivered.",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal - Next.js & Framer Developer from Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Iqbal — Next.js & Framer Developer | Pakistan",
    description: "Hire a freelance Next.js and Framer developer. High-converting landing pages, web apps, mobile apps. Based in Pakistan, serving clients worldwide.",
    images: [`${siteUrl}/api/og`],
    creator: "@rashidrealme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  manifest: `${siteUrl}/manifest.webmanifest`,
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    title: 'Rashid Iqbal',
    statusBarStyle: 'black-translucent',
  },
  other: {
    // Theme
    'theme-color': '#18181b',
    'msapplication-TileColor': '#18181b',
    'msapplication-tap-highlight': 'no',
    'mobile-web-app-capable': 'yes',
    // Geo Tags
    'geo.region': 'PK',
    'geo.placename': 'Pakistan',
    // Social Media
    'fb:app_id': '',
    'linkedin:owner': 'rashidiqbal',
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance: Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />
        {/* AI/LLM & oEmbed Discovery (dynamic links) */}
        <link rel="alternate" type="application/json" href="/api/llms-context" title="Machine-Readable Context API" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="author" href="/humans.txt" />
        <OEmbedLinks />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:font-medium focus:rounded-sm"
        >
          Skip to main content
        </a>
        <StructuredData />
        {children}
        {/* Service Worker Registration - loads after page is interactive */}
        <Script
          id="sw-registration"
          strategy="afterInteractive"
        >
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then((registration) => console.log('SW registered:', registration.scope))
                .catch((error) => console.error('SW registration failed:', error));
            }
          `}
        </Script>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
