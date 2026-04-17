"use client";

import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Check, Clock } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CTASection() {
  return (
    <>
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={2}  >
            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.05]">
                30 minutes. <br />
                <span className="text-zinc-500">One honest answer.</span>
              </h2>
              <p className="text-lg text-zinc-500 mt-6 max-w-md">
                Tell me what is not converting. I will tell you if I can fix it. No pitch. No credit card. No commitment.
              </p>
            </div>

            <div className="border-b border-r border-zinc-100 p-12 lg:p-24 relative overflow-hidden dotted-bg">
              <div className="relative z-10 flex flex-col gap-6 max-w-md">
                {/* What you get */}
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

                {/* Single CTA scrolls to calendar below */}
                <a
                  href="#booking-calendar"
                  onClick={(e) => {
                    e.preventDefault();
                    const calendarSection = document.querySelector("#booking-calendar");
                    if (calendarSection) {
                      calendarSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="px-8 py-4 bg-orange-700 text-white text-sm font-bold hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 w-full shadow-lg shadow-orange-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2"
                >
                  Book my strategy call
                </a>
              </div>
            </div>
          </GridContainer>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section id="booking-calendar" className="bg-white border-b border-zinc-100 scroll-mt-16">
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
