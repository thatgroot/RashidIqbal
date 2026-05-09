import { Metadata } from"next";
import { Navbar } from"@/components/layout/navbar";
import { ServiceBuilder } from"@/components/shared/service-builder";
import { ClosingBand } from"@/components/landing/closing-band";
import { SITE_URL, SOCIAL_LINKS } from"@/lib/constants";
import { Mail, Calendar } from"@/components/icons";
import { EmailMeButton } from"@/components/shared/email-me-toast";

export const metadata: Metadata = {
  title:"Start a project · Aestho",
  description:
"Tell us about your project. Figma design, Framer development, or Chrome extensions. 24-hour reply with a scope and quote.",
  openGraph: {
    title:"Start a project · Aestho",
    description:"Describe your project and get a reply within 24 hours.",
    type:"website",
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: `${SITE_URL}/api/blog-og?title=${encodeURIComponent(
"Start a project · 24-hour quote",
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Start a project · Aestho",
    description:"Describe your project and get a reply within 24 hours.",
    images: [
      `${SITE_URL}/api/blog-og?title=${encodeURIComponent("Start a project · 24-hour quote")}`,
    ],
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#ffffff] text-[#0a0a0a] selection:bg-[#0a0a0a]/30 selection:text-black font-sans"
    >
      <Navbar />

      {/* Editorial header, no chip, no pulsing dot, no boilerplate.
          Title + a single short paragraph + 2 quiet contact links. */}
      <section className="max-w-container mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-end">
          <h1
            className="md:col-span-7 text-[clamp(40px,6vw,76px)] tracking-[-0.014em] leading-[1.02] text-black"
            style={{ fontVariationSettings: '"wght" 600' }}
          >
            Start a project.
          </h1>
          <div className="md:col-span-5">
            <p className="text-[16px] text-[#737373] leading-[1.6] mb-5">
              Tell us about it below. We reply within 24 hours with a scope and
              fixed quote, no sales call required first.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              <EmailMeButton
                className="group inline-flex items-center gap-2 text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span style={{ fontVariationSettings: '"wght" 500' }}>
                  Email instead
                </span>
              </EmailMeButton>
              <a
                href={SOCIAL_LINKS.calcom}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span style={{ fontVariationSettings: '"wght" 500' }}>
                  Book a 30-min call
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The form sits in a single rounded-2xl card on white inside the
          warm-grey canvas, same shape language as the homepage cards. */}
      <section className="max-w-container mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 md:p-10 lg:p-14">
          <ServiceBuilder />
        </div>
      </section>

      <ClosingBand
        headline="Prefer to talk it through?"
        sub="A 30-min call usually gets you a fixed quote same day. No pitch deck, no follow-up sequence."
        ctaLabel="Book a strategy call"
      />
    </main>
  );
}
