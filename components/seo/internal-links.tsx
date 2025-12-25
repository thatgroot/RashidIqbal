import Link from "next/link";
import { SERVICES, LOCATIONS, TECHNOLOGIES } from "@/lib/seo-data";
import { ArrowRight } from "lucide-react";

/**
 * Related Services - Display links to related services
 * Used in blog posts and technology pages
 */
export function RelatedServices({
    current,
    className = "",
}: {
    current?: string;
    className?: string;
}) {
    const services = SERVICES.filter((s) => s.slug !== current).slice(0, 4);

    return (
        <div className={`p-6 border border-zinc-100 rounded-lg ${className}`}>
            <h3 className="text-sm font-mono text-zinc-900 uppercase tracking-widest mb-4">
                Services
            </h3>
            <ul className="space-y-2">
                {services.map((service) => (
                    <li key={service.slug}>
                        <Link
                            href={`/services/${service.slug}`}
                            className="group flex items-center justify-between text-sm text-zinc-600 hover:text-orange-600 transition-colors"
                        >
                            <span>{service.shortTitle}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </li>
                ))}
            </ul>
            <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-4 hover:text-orange-500"
            >
                View all services
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

/**
 * Related Locations - Display links to location pages
 * Used in footer and service pages
 */
export function RelatedLocations({ className = "" }: { className?: string }) {
    return (
        <div className={`${className}`}>
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Locations
            </h4>
            <ul className="space-y-2">
                {LOCATIONS.map((location) => (
                    <li key={location.slug}>
                        <Link
                            href={`/hire/${location.slug}`}
                            className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                        >
                            {location.country}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Technology Badges - Linked technology stack indicators
 * Used in service pages and project cards
 */
export function TechnologyBadges({
    technologies,
    className = "",
}: {
    technologies: string[];
    className?: string;
}) {
    const techData = technologies
        .map((slug) => TECHNOLOGIES.find((t) => t.slug === slug))
        .filter(Boolean);

    if (techData.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {techData.map((tech) => (
                <Link
                    key={tech!.slug}
                    href={`/developer/${tech!.slug}`}
                    className="px-3 py-1 text-xs font-medium bg-zinc-100 text-zinc-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition-colors"
                >
                    {tech!.name}
                </Link>
            ))}
        </div>
    );
}

/**
 * Service Links Grid - Grid of service links for footer/sitemap
 */
export function ServiceLinksGrid({ className = "" }: { className?: string }) {
    return (
        <div className={`${className}`}>
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Services
            </h4>
            <ul className="space-y-2">
                {SERVICES.map((service) => (
                    <li key={service.slug}>
                        <Link
                            href={`/services/${service.slug}`}
                            className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                        >
                            {service.shortTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Technology Links Grid - Grid of technology links for footer/sitemap
 */
export function TechnologyLinksGrid({ className = "" }: { className?: string }) {
    return (
        <div className={`${className}`}>
            <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Technologies
            </h4>
            <ul className="space-y-2">
                {TECHNOLOGIES.map((tech) => (
                    <li key={tech.slug}>
                        <Link
                            href={`/developer/${tech.slug}`}
                            className="text-sm text-zinc-300 hover:text-orange-500 transition-colors"
                        >
                            {tech.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
