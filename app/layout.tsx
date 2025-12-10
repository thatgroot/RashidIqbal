import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";
import { OEmbedLinks } from "@/components/seo/oembed-links";

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
  },
  manifest: `${siteUrl}/manifest.webmanifest`,
  other: {
    "theme-color": "#18181b",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />
        {/* Geo Meta Tags for Location-Based SEO */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        {/* Social Media Platform Tags */}
        <meta property="fb:app_id" content="" />
        <meta name="linkedin:owner" content="rashidiqbal" />
        {/* Pinterest Verification (when available) */}
        {/* <meta name="p:domain_verify" content="your-pinterest-code" /> */}
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Register Service Worker for offline support
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                      console.log('SW registered: ', registration);
                    }).catch(function(error) {
                      console.log('SW registration failed: ', error);
                    });
                  });
                }
                
                // Fix accessibility for open-side-panel button if it exists
                function fixButtonAccessibility() {
                  const openSidePanelButton = document.getElementById('open-side-panel');
                  if (openSidePanelButton && !openSidePanelButton.getAttribute('aria-label')) {
                    openSidePanelButton.setAttribute('aria-label', 'Open side panel');
                  }
                }
                
                // Try immediately
                fixButtonAccessibility();
                
                // Also try after DOM is fully loaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', fixButtonAccessibility);
                }
                
                // Use MutationObserver to catch dynamically added buttons
                const observer = new MutationObserver(fixButtonAccessibility);
                observer.observe(document.body, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
