"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// Default (non-homepage) navigation sections
const DEFAULT_NAV_SECTIONS = [
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "faq", label: "FAQ", href: "/#faq" },
] as const;

type NavbarProps = {
  variant?: "default" | "homepage";
};

export function Navbar({ variant = "default" }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const homepageVariant = variant === "homepage" && isHomePage;

  // Reset active section when navigating away from home page
  const currentActiveSection = isHomePage ? activeSection : null;

  // Track active section using Intersection Observer for default nav on home page
  useEffect(() => {
    if (!isHomePage || homepageVariant) {
      return;
    }

    const sectionIds = DEFAULT_NAV_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }

            let maxRatio = 0;
            let mostVisibleSection: string | null = null;

            visibleSections.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisibleSection = sectionId;
              }
            });

            setActiveSection(mostVisibleSection);
          });
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: "-80px 0px -50% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isHomePage, homepageVariant]);

  // Handle navigation click (default variant)
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      if (isHomePage) {
        e.preventDefault();
        const element = document.querySelector(sectionId);
        if (element) {
          const offset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        router.push(`/${sectionId}`);
      }
    },
    [isHomePage, router]
  );

  // Handle logo click
  const handleLogoClick = useCallback(() => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }, [isHomePage, router]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 dotted-bg dotted-bg-opacity-30"
    >
      <nav className="max-w-container h-full border-x border-zinc-100 flex items-center justify-between px-8 relative z-10" aria-label="Main navigation">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-sm"
          aria-label={isHomePage ? "Scroll to top" : "Go to home page"}
        >
          <Image
            src="/favicon.svg"
            alt="Rashid Iqbal logo"
            width={28}
            height={28}
          />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </button>

        {homepageVariant ? (
          // Homepage variant: NO middle links. Only Logo + CTA.
          // Follows the article's "no competing navigation" rule.
          <span className="hidden md:flex items-center gap-1.5 text-xs text-zinc-500" role="note">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Accepting 2 new projects this month
          </span>
        ) : (
          // Default variant: full route links
          <div className="hidden md:flex items-center gap-1 text-sm font-medium shrink-0" role="menubar">
            {DEFAULT_NAV_SECTIONS.map((section) => {
              const isActive = currentActiveSection === section.id;
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={(e) => handleNavClick(e, `#${section.id}`)}
                  className={`px-3 py-2 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${isActive
                    ? "text-orange-600 font-semibold bg-orange-50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                >
                  {section.label}
                </Link>
              );
            })}
            <Link
              href="/blog"
              className={`px-3 py-2 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${pathname.startsWith("/blog")
                ? "text-orange-600 font-semibold bg-orange-50"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              role="menuitem"
              aria-current={pathname.startsWith("/blog") ? "page" : undefined}
            >
              Blog
            </Link>
          </div>
        )}

        <div className="relative flex items-center gap-3">
          {!homepageVariant && (
            <span className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available now
            </span>
          )}
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-all hover:scale-105 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
