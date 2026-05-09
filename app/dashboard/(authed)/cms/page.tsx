import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, Briefcase, BookOpen, Building2, Microscope, Mail, Send } from "lucide-react";

const CARDS = [
  { href: "/dashboard/cms/testimonials", label: "Testimonials", description: "Quotes carried on the homepage carousel.", Icon: MessageSquare },
  { href: "/dashboard/cms/faqs", label: "FAQs", description: "Question / answer rows for landing pages.", Icon: FileText },
  { href: "/dashboard/cms/case-studies", label: "Case studies", description: "Project deep-dives at /work and on the homepage.", Icon: Briefcase },
  { href: "/dashboard/cms/blog", label: "Blog posts", description: "DB-backed blog. Filesystem posts still render.", Icon: BookOpen },
  { href: "/dashboard/cms/industries", label: "Industry pages", description: "Per-industry hire pages (fintech, AI, YC, ...).", Icon: Building2 },
  { href: "/dashboard/cms/research", label: "Research reports", description: "Original-data reports for AI search citation.", Icon: Microscope },
  { href: "/dashboard/cms/subscribers", label: "Subscribers", description: "Newsletter sign-ups.", Icon: Mail },
  { href: "/dashboard/cms/newsletter", label: "Newsletter issues", description: "Compose + send via Resend.", Icon: Send },
] as const;

export default function CmsHome() {
  return (
    <div>
      <p className="text-[10px] font-mono text-[#73706d] uppercase tracking-[0.22em] mb-2">
        CMS
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#292827] mb-2">
        Content
      </h1>
      <p className="text-sm text-[#73706d] mb-8">
        Everything editable on the public site lives here. Drafts stay
        unpublished until you flip the switch.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-[#e8e4dd] bg-white p-5 hover:border-[#c9b4fa] transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-[#e8e4dd] flex items-center justify-center bg-[#fafaf8]/40">
                  <c.Icon className="w-4 h-4 text-[#73706d]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#292827] group-hover:text-[#1b1938] transition-colors">
                    {c.label}
                  </p>
                  <p className="text-xs text-[#73706d] mt-0.5">{c.description}</p>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 text-[#9a9794] group-hover:text-[#1b1938] transition-colors mt-1 shrink-0"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
