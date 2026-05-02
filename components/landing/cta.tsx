"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Check, Clock } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

// Cal.com handle — last segment of cal.com/<handle>. Sourced from
// SOCIAL_LINKS.calcom so the embed and the external links never drift.
const CAL_HANDLE = SOCIAL_LINKS.calcom.replace(/^https?:\/\/cal\.com\//, "");

export function CTASection() {
  return (
    <>
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={2}>
            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.05]">
                30 minutes. <br />
                <span className="text-zinc-500">Audit + fix list.</span>
              </h2>
              <p className="text-lg text-zinc-500 mt-6 max-w-md">
                Walk through your landing page, form, or checkout. I&rsquo;ll
                show you the 3–5 changes that move the needle most. If we&rsquo;re a
                fit, we lock scope that day. If not, you keep the teardown.
              </p>
            </div>

            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 relative overflow-hidden dotted-bg">
              <div className="relative z-10 flex flex-col gap-6 max-w-md">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>Live audit of where your page is losing visitors</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>The exact copy and layout changes I would make</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Clock className="w-4 h-4 text-orange-500" aria-hidden="true" />
                    <span>Scope, timeline, and a firm price, in writing</span>
                  </div>
                </div>

                <a
                  href={SOCIAL_LINKS.calcom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                >
                  Book my strategy call
                </a>
              </div>
            </div>
          </GridContainer>
        </div>
      </section>

      {/* Cal.com inline embed — replaces the previous lead form. The
          Cal API is initialised once on mount; the iframe owns the rest
          of the booking flow (slot picker, form, confirmation). */}
      <section
        id="booking-calendar"
        className="bg-white border-b border-zinc-100 scroll-mt-16"
      >
        <div className="max-w-container border-l border-r border-zinc-100">
          <GridContainer cols={1}>
            <GridItem className="relative" padding={false}>
              <div className="px-6 md:px-12 pt-10 md:pt-14 pb-2 max-w-3xl">
                <p className="text-[10px] font-mono text-orange-700 uppercase tracking-[0.22em] mb-3">
                  Pick a time
                </p>
                <h3 className="text-2xl md:text-4xl font-semibold text-zinc-900 tracking-tight leading-tight mb-3">
                  Book a 30-minute strategy call.
                </h3>
                <p className="text-sm md:text-base text-zinc-500">
                  Free. No credit card. You&rsquo;ll get a Google Meet link
                  and a short pre-call form. If self-scheduling is broken,{" "}
                  <a
                    href={SOCIAL_LINKS.calcom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-orange-300 underline-offset-4 hover:text-orange-700 transition-colors"
                  >
                    open the page on cal.com
                  </a>
                  .
                </p>
              </div>
              <CalEmbed />
            </GridItem>
          </GridContainer>
        </div>
      </section>
    </>
  );
}

function CalEmbed() {
  // Configure the embed once on mount. `ui` here picks the light theme
  // and hides Cal's branding bar so it visually nests inside our section.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#c2410c" },
          dark: { "cal-brand": "#fb923c" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="px-2 md:px-6 pb-8 md:pb-10">
      <Cal
        namespace="30min"
        calLink={CAL_HANDLE}
        style={{
          width: "100%",
          height: "min(720px, 90vh)",
          overflow: "scroll",
        }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
