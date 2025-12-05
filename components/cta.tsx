"use client";

import { motion } from "framer-motion";
import { GridContainer, GridItem } from "./grid-system";
import { ArrowRight, Terminal, Check, Clock } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const valueProps = [
  { icon: Check, text: "Free 30-minute discovery call" },
  { icon: Check, text: "No commitment required" },
  { icon: Clock, text: "Quick response time" },
];

export function CTASectionV2() {
  return (
    <>
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-container border-l border-zinc-100">
          <GridContainer cols={2}> 
            <motion.div 
              className="border-b border-r border-zinc-100 p-12 desktop:p-24 flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3 text-orange-700 mb-8 font-mono text-xs"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                <Terminal className="w-4 h-4" />
                </motion.div>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  READY_TO_SHIP
                </motion.span>
              </motion.div>
              <motion.h2 
                className="text-4xl desktop:text-6xl font-semibold text-zinc-900 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Ready To Build? <br />
                <motion.span 
                  className="text-zinc-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Let&apos;s cook the recipe together.
                </motion.span>
              </motion.h2>
            </motion.div>

            <motion.div 
              className="border-b border-r border-zinc-100 p-12 desktop:p-24 relative overflow-hidden dotted-bg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10 flex flex-col gap-6 max-w-md">
                {/* Value Props */}
                <div className="space-y-3 mb-4">
                  {valueProps.map((prop, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-600"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      >
                        <prop.icon className="w-4 h-4 text-orange-500" />
                      </motion.div>
                      <span>{prop.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Primary CTA */}
                <motion.button 
                  onClick={() => {
                    const calendarSection = document.querySelector('#booking-calendar');
                    if (calendarSection) {
                      calendarSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="px-8 py-4 bg-zinc-900 text-white text-sm font-bold hover:bg-orange-500 transition-colors flex items-center justify-between w-full group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-orange-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Book Your Free Call</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>

                {/* Secondary CTA */}
                <motion.p 
                  className="text-xs text-zinc-500 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  Scroll down to see available times
                </motion.p>
              </div>
            </motion.div>
          </GridContainer>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section id="booking-calendar" className="bg-white border-b border-zinc-100">
        <div className="max-w-container border-l border-r border-zinc-100">
          <GridContainer cols={1}> 
            <GridItem className="min-h-[700px] relative overflow-hidden dotted-bg" padding={false}>
              <motion.div 
                className="relative z-10 h-full w-full p-4 desktop:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="bg-white h-full w-full rounded-lg overflow-hidden border border-zinc-200"
                  whileHover={{ borderColor: "#f97316" }}
                >
                  <BookingCalendar />
                </motion.div>
              </motion.div>
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
      calLink="rashid.iqbal/30min"
      config={{ "layout": "month_view", "embedType": "team.event.booking.slots", "theme": "light",}}

    />
  );
}
