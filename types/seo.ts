// ============================================================================
// SEO Types - TypeScript Interfaces for SEO Metadata and Structured Data
// ============================================================================

import type { Metadata } from "next";

/**
 * SEO metadata configuration for consistent page metadata generation
 */
export interface SEOMetadata {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    noIndex?: boolean;
    openGraph?: {
        title?: string;
        description?: string;
        image?: string;
        type?: "website" | "article" | "profile";
    };
    twitter?: {
        title?: string;
        description?: string;
        image?: string;
        card?: "summary" | "summary_large_image";
    };
}

/**
 * Breadcrumb item for navigation and structured data
 */
export interface BreadcrumbItem {
    label: string;
    href: string;
}

/**
 * FAQ item for FAQ sections and structured data
 */
export interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Structured data schema types supported in the app
 */
export type StructuredDataType =
    | "Article"
    | "FAQPage"
    | "BreadcrumbList"
    | "ProfessionalService"
    | "Person"
    | "Organization"
    | "WebSite"
    | "WebPage"
    | "Service"
    | "Product";

/**
 * Generate Next.js Metadata object from simplified SEO config
 */
export function generateMetadata(
    seo: SEOMetadata,
    siteUrl: string
): Metadata {
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        openGraph: {
            title: seo.openGraph?.title || seo.title,
            description: seo.openGraph?.description || seo.description,
            type: seo.openGraph?.type || "website",
            url: seo.canonical || siteUrl,
            siteName: "Rashid Iqbal",
            locale: "en_US",
            images: seo.openGraph?.image
                ? [
                    {
                        url: seo.openGraph.image,
                        width: 1200,
                        height: 630,
                        alt: seo.title,
                    },
                ]
                : undefined,
        },
        twitter: {
            card: seo.twitter?.card || "summary_large_image",
            title: seo.twitter?.title || seo.title,
            description: seo.twitter?.description || seo.description,
            images: seo.twitter?.image ? [seo.twitter.image] : undefined,
            creator: "@rashidrealme",
        },
        alternates: seo.canonical
            ? { canonical: seo.canonical }
            : undefined,
        robots: seo.noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}
