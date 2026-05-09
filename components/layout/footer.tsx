"use client";

import Link from"next/link";
import { SOCIAL_LINKS } from"@/lib/constants";
import { triggerEmailMe } from"@/components/shared/email-me-toast";

export function Footer() {
  return (
    <footer className="bg-white text-[#737373] border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0a0a0a] text-white flex items-center justify-center rounded-full" style={{ fontVariationSettings: '"wght" 600' }}>
                A
              </div>
              <span className="text-lg text-[#0a0a0a]" style={{ fontVariationSettings: '"wght" 600' }}>Aestho</span>
            </div>
            <p className="text-[#737373] text-sm mb-6 max-w-xs leading-[1.5]">
              An 8-person studio for SaaS founders. Figma, Framer, UX copy,
              motion. Sites that close deals.
            </p>
            <button
              type="button"
              onClick={triggerEmailMe}
              className="inline-flex items-center gap-1.5 text-[#0a0a0a] hover:text-[#000000] transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
              style={{ fontVariationSettings: '"wght" 600' }}
            >
              Email me
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#737373] mb-4">
              Industries
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/framer-expert-for-saas"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  SaaS
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-fintech"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Fintech
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-ai-startups"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  AI startups
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-expert-for-yc-startups"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Y Combinator
                </Link>
              </li>
            </ul>
          </div>

          {/* Compare — decision-stage SEO pages */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#737373] mb-4">
              Compare
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/framer-vs-webflow-for-saas"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Framer vs Webflow
                </Link>
              </li>
              <li>
                <Link
                  href="/framer-vs-wordpress-for-startups"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Framer vs WordPress
                </Link>
              </li>
              <li>
                <Link
                  href="/hire-framer-expert-vs-agency"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Expert vs agency
                </Link>
              </li>
              <li>
                <Link
                  href="/figma-to-framer-cost-2026"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Figma → Framer cost
                </Link>
              </li>
              <li>
                <Link
                  href="/figma-to-framer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Figma to Framer service
                </Link>
              </li>
            </ul>
          </div>

          {/* Proof — case studies, research, and free audit */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#737373] mb-4">
              Proof
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/work"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Case studies
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/offer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Free audit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#737373] mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.framer.com/@risiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Framer
                </Link>
              </li>
              <li>
                <Link
                  href={SOCIAL_LINKS.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Upwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e5e5e5] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#737373]">
              © {new Date().getFullYear()} Aestho · led by{""}
              <a
                href="https://www.framer.com/@risiq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0a0a0a] transition-colors underline-offset-4 hover:underline"
              >
                Rashid Iqbal
              </a>
              . Remote, working worldwide.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/links"
                className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors"
              >
                Links
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
