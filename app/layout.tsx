import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";
import { ExitIntentPopup } from "@/components/shared/exit-intent-popup";
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
    default: "Rashid Iqbal | Figma & Framer Expert",
    template: "%s | Rashid Iqbal",
  },
  description: "Figma design, Framer development, and Chrome extensions. I build websites that convert, write UX copy, and ship browser tools. 50+ projects delivered.",
  keywords: [
    "Figma expert",
    "Framer expert",
    "Chrome extension developer",
    "UX copywriting",
    "landing page designer",
    "Framer developer",
    "Figma to Framer",
    "conversion optimization",
    "hire Framer expert",
    "hire Figma designer",
    "Figma Chrome extension",
    "Framer Chrome extension",
    "landing page conversion",
    "UX design",
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
    title: "Rashid Iqbal | Figma & Framer Expert",
    description: "Figma design, Framer development, and Chrome extensions. Websites that convert. 50+ projects shipped.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rashid Iqbal - Figma & Framer Expert. Book a Free Call.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Iqbal | Figma & Framer Expert",
    description: "Figma design, Framer development, and Chrome extensions. Websites that convert. 50+ projects shipped.",
    images: [`${siteUrl}/opengraph-image`],
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
        {/* Performance: Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* AI/LLM & oEmbed Discovery (dynamic links) */}
        <link rel="alternate" type="application/json" href="/api/llms-context" title="Machine-Readable Context API" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="author" href="/humans.txt" />
        <OEmbedLinks />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WTKJ9XZF');`,
          }}
        />
        {/* TODO: Add Facebook/Meta Pixel <script> here once you have the Pixel ID
            See: https://business.facebook.com/events_manager → Create Pixel for aestho.xyz */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTKJ9XZF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white focus:font-medium focus:rounded-sm"
        >
          Skip to main content
        </a>
        <StructuredData />
        <ExitIntentPopup />
        {children}
        {/* Microsoft Clarity — session replays + heatmaps. Loads after the
             page is interactive so it never delays first paint. Project ID
             is read from env so we can rotate or swap properties without
             touching code. */}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="clarity-tracking" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`}
          </Script>
        )}
        {/* Tidio Chat Widget */}
        {process.env.NEXT_PUBLIC_TIDIO_KEY && (
          <Script
            src={`//code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_KEY}.js`}
            strategy="lazyOnload"
          />
        )}
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
