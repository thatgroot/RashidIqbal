import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";
import { OEmbedLinks } from "@/components/seo/oembed-links";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aestho.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rashid Iqbal - Freelance Web Developer & Designer",
    template: "%s | Rashid Iqbal"
  },
  description: "Freelance web developer and designer specializing in landing pages, web applications, and mobile apps. Building with Next.js, Framer, Figma, Expo, and Flutter.",
  keywords: ["freelance developer", "web developer", "Next.js developer", "Framer developer", "Figma designer", "mobile app developer", "Expo", "Flutter", "landing pages", "web applications"],
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
    title: "Rashid Iqbal - Freelance Web Developer & Designer",
    description: "Your Vision, Built Right. Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal - Freelance Web Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Iqbal - Freelance Web Developer & Designer",
    description: "Your Vision, Built Right. Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@rashidiqbal",
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
