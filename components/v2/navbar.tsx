"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiWhatsapp, SiUpwork } from "react-icons/si";
import { useState, useEffect, useCallback } from "react";

// Navigation sections for the home page
const NAV_SECTIONS = [
  { id: "process", label: "Process", href: "/#process" },
  { id: "testimonials", label: "Reviews", href: "/#testimonials" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "resources", label: "FAQ", href: "/#resources" },
] as const;

export function NavbarV2() {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");

  // Reset active section when navigating away from home page
  const currentActiveSection = isHomePage ? activeSection : null;

  // Track active section using Intersection Observer (only on home page)
  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const sectionIds = NAV_SECTIONS.map((s) => s.id);
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

            // Find the section with highest visibility
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
  }, [isHomePage]);

  // Handle navigation click
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
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
        </button>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium shrink-0" role="menubar">
          {NAV_SECTIONS.map((section) => {
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
            href="/services"
            className={`px-3 py-2 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${pathname.startsWith("/services")
              ? "text-orange-600 font-semibold bg-orange-50"
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            role="menuitem"
            aria-current={pathname.startsWith("/services") ? "page" : undefined}
          >
            Services
          </Link>
          <Link
            href="/blog"
            className={`px-3 py-2 transition-all rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${isBlogPage
              ? "text-orange-600 font-semibold bg-orange-50"
              : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            role="menuitem"
            aria-current={isBlogPage ? "page" : undefined}
          >
            Blog
          </Link>
        </div>

        <div className="relative flex items-center gap-3">
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available now
          </span>
          <button
            onClick={() => setShowContactOptions(!showContactOptions)}
            aria-label="Start project contact options"
            aria-expanded={showContactOptions}
            aria-haspopup="true"
            className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-500 transition-all hover:scale-105 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            Book a Call
          </button>

          <AnimatePresence>
            {showContactOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="menu"
                aria-label="Contact options"
                className="absolute top-full right-0 mt-2 w-48 bg-white border border-zinc-200 overflow-hidden dotted-bg"
              >
                <div className="relative z-10 bg-white">
                  <a href="https://cal.com/rashid.iqbal" target="_blank" rel="noopener noreferrer" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors border-b border-zinc-100">
                    <Image src="/icons/cal.png" alt="" width={16} height={16} className="rounded-sm" aria-hidden="true" />
                    <span>Cal.com</span>
                  </a>
                  <a href="mailto:rashidiqbal.freelance@gmail.com" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-orange-500 transition-colors border-b border-zinc-100">
                    <SiGmail size={16} aria-hidden="true" />
                    <span>Email</span>
                  </a>
                  <a href="https://wa.me/923554665643" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-green-500 transition-colors border-b border-zinc-100">
                    <SiWhatsapp size={16} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://www.upwork.com/freelancers/~01b24c107f5b5af596" target="_blank" rel="noopener noreferrer" role="menuitem" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-green-600 transition-colors">
                    <SiUpwork size={16} aria-hidden="true" />
                    <span>Upwork</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
}
