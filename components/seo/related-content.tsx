import Link from "next/link";
import { ArrowRight } from "@/components/icons";

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedContentProps {
  title?: string;
  links: RelatedLink[];
}

// Hub-and-spoke internal linking component
// Place on service pages, blog posts, and technology pages
// to create dense internal link graphs that signal topical authority
export function RelatedContent({ title = "Related", links }: RelatedContentProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className="border-t border-[#e8e4dd] pt-8 mt-12">
      <h3 className="text-xs font-mono text-[#73706d] uppercase tracking-wider mb-6">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="group flex items-start gap-3 p-4 border border-[#e8e4dd] hover:border-[#e8e4dd] hover:bg-[#fafaf8]/30 transition-colors"
          >
            <div className="flex-1">
              <span className="text-sm font-medium text-[#292827] group-hover:text-[#1b1938] transition-colors">
                {link.title}
              </span>
              <p className="text-xs text-[#73706d] mt-1 line-clamp-2">{link.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9a9794] group-hover:text-[#1b1938] mt-0.5 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
