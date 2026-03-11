"use client";

import { GridContainer, GridItem } from "./grid-system";
import { ArrowRight, Terminal, Check, Clock } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CTASectionV2() {
  return (
    <>
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={2}  >
            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-orange-700 mb-8 font-mono text-xs">
                <Terminal className="w-4 h-4" />
                <span>FREE_AUDIT_OFFER</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight">
                Want More Clients? <br />
                <span className="text-zinc-500">Claim your free technical audit.</span>
              </h2>
            </div>

            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 relative overflow-hidden dotted-bg">
              <div className="relative z-10 flex flex-col gap-6 max-w-md">
                {/* Value Props */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" />
                    <span>Comprehensive Lighthouse & SEO review</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-orange-500" />
                    <span>UX/UI and conversion rate analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>30-minute strategic consultation</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => {
                    const calendarSection = document.querySelector('#booking-calendar');
                    if (calendarSection) {
                      calendarSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-between w-full group"
                >
                  Book Your Free Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary CTA */}
                <p className="text-xs text-zinc-500 text-center">
                  Scroll down to see available times
                </p>
              </div>
            </div>
          </GridContainer>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section id="booking-calendar" className="bg-white border-b border-zinc-100">
        <div className="max-w-container border-l border-r border-zinc-100">
          <GridContainer cols={1}  >
            <GridItem className="min-h-[700px] relative overflow-hidden dotted-bg" padding={false}>
              <div className="relative z-10 h-full w-full p-4 md:p-8">
                <div className="bg-white h-full w-full rounded-lg overflow-hidden">
                  <BookingCalendar />
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </section>
    </>
  );
}

function BookingCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])

  return (
    <Cal
      namespace="30min"
      calLink={SOCIAL_LINKS.calcom.replace("https://cal.com/", "") + "/30min"}
      config={{ "layout": "month_view", "embedType": "team.event.booking.slots", "theme": "light", }}

    />
  );
}
