import Link from "next/link";
import { ChevronRight, Home } from "@/components/icons";
import type { BreadcrumbItem } from "@/types/seo";
import { SITE_URL } from "@/lib/constants";

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * Breadcrumb navigation component with structured data
 * Improves SEO and user navigation on interior pages
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    // Add home as the first item
    const allItems: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        ...items,
    ];

    // Generate BreadcrumbList structured data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
        })),
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Navigation */}
            <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-2 text-sm text-[#73706d] ${className}`}
            >
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    const isFirst = index === 0;

                    return (
                        <span key={item.href} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight className="w-4 h-4 text-zinc-300" aria-hidden="true" />
                            )}
                            {isLast ? (
                                <span className="text-[#292827] font-medium" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-[#1b1938] transition-colors flex items-center gap-1"
                                >
                                    {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                                    <span className={isFirst ? "sr-only" : ""}>{item.label}</span>
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </>
    );
}
