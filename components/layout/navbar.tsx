"use client";

import Link from"next/link";
import Image from"next/image";
import { usePathname, useRouter } from"next/navigation";
import { useState, useEffect, useCallback } from"react";

// OpenAI Codex–style navbar. Flush full-width transparent shell on the
// hero, then white solid on scroll. Logo left, plain text nav center,
//"Log in" + black pill"Get started" right. No floating pill, no
// backdrop-blur card — just clean horizontal hairline.

const NAV_LINKS = [
  { id:"work", label:"Work", href:"/work" },
  { id:"pricing", label:"Pricing", href:"/pricing" },
  { id:"blog", label:"Blog", href:"/blog" },
  { id:"about", label:"About", href:"/about" },
] as const;

type NavbarProps = {
  variant?:"default" |"homepage";
};

export function Navbar({ variant ="default" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname ==="/";
  const homepageVariant = variant ==="homepage" && isHomePage;

  useEffect(() => {
    if (typeof window ==="undefined") return;
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#") && isHomePage) {
        e.preventDefault();
        const target = document.querySelector(href.slice(1));
        if (target) {
          const offset = 96;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior:"smooth" });
        }
      } else if (!href.startsWith("http")) {
        e.preventDefault();
        router.push(href);
      }
    },
    [isHomePage, router]
  );

  const handleLogoClick = useCallback(() => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior:"smooth" });
    } else {
      router.push("/");
    }
  }, [isHomePage, router]);

  // Codex pattern: nav is transparent over the hero gradient, then
  // solidifies to white with a thin border once you scroll past it.
  const shellClass = !scrolled
    ?"bg-transparent border-transparent"
    :"bg-white/90 backdrop-blur-md border-[#e5e5e5]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 border-b transition-colors duration-200 ${shellClass}`}
    >
      <nav
        className="max-w-container mx-auto h-full px-6 md:px-10 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark — small icon +"Aestho" in display weight. */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-4 rounded-sm"
          aria-label={isHomePage ?"Scroll to top" :"Aestho home"}
        >
          <Image src="/favicon.svg" alt="Aestho" width={26} height={26} />
          <span
            className="text-[15px] tracking-tight text-[#0a0a0a]"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            Aestho
          </span>
        </button>

        {/* Centre nav — plain text links, no chips. */}
        {!homepageVariant ? (
          <div
            className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
            role="menubar"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href +"/");
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[14px] transition-colors ${
                    isActive
                      ?"nav-link-active px-3.5 py-1.5 rounded-full"
                      :"text-[#404040] hover:text-[#0a0a0a]"
                  }`}
                  style={{ fontVariationSettings: '"wght" 500' }}
                  role="menuitem"
                  aria-current={isActive ?"page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        ) : null}

        {/* Right side — dark pill"Get started". */}
        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0a0a0a] hover:bg-black text-white text-[14px] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
            style={{ fontVariationSettings: '"wght" 500' }}
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
