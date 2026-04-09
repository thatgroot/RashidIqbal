"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GridContainer, GridItem } from "./grid-system";

const reviews = [
  {
    text: "Rashid redesigned our entire marketing site in Framer. The new design loads fast, converts better, and our team can actually update it without pinging a developer. Onboarding signups went up by half.",
    author: "Josh Schachter",
    role: "Founder & CEO @ UpdateAI",
  },
  {
    text: "We needed a site that made open banking feel simple and trustworthy. Rashid nailed the Figma design and the Framer build was pixel-perfect. Our sales team finally has a site they're proud to send prospects to.",
    author: "Crezco Team",
    role: "Crezco",
  },
  {
    text: "Rashid built my personal brand site on Framer and it scored 90+ on Lighthouse right out of the gate. The design feels premium and the whole thing was done in under two weeks.",
    author: "Nick Broadhurst",
    role: "Musician & Creator",
  },
];

export function TestimonialsV2() {
  return (
    <section className="bg-white" id="testimonials">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem className="py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                What Clients Say.
              </h2>
              <p className="text-lg text-zinc-500">
                Real feedback from founders and teams I&apos;ve worked with.
              </p>
            </motion.div>
          </GridItem>
        </GridContainer>

        <GridContainer cols={3}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: i * 0.15 },
                },
              }}
            >
              <GridItem className="dotted-bg dotted-bg-opacity-30">
                <div className="relative z-10">
                  <motion.div
                    className="flex gap-1 mb-8"
                    role="img"
                    aria-label="5 out of 5 stars rating"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        variants={{
                          hidden: { opacity: 0, scale: 0 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.3, delay: j * 0.05 },
                          },
                        }}
                      >
                        <Star
                          className="w-4 h-4 fill-orange-500 text-orange-500"
                          aria-hidden="true"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p
                    className="text-lg text-zinc-900 leading-relaxed mb-8 font-medium"
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    &quot;{review.text}&quot;
                  </motion.p>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                  >
                    <div className="font-bold text-zinc-900 text-sm">
                      {review.author}
                    </div>
                    <div className="text-xs text-zinc-500">{review.role}</div>
                  </motion.div>
                </div>
              </GridItem>
            </motion.div>
          ))}
        </GridContainer>

        {/* Senja Video Testimonials Wall
            To set up: go to senja.io, create a project, send collection links
            to clients, then paste your Senja widget ID below */}
        {process.env.NEXT_PUBLIC_SENJA_WIDGET_ID && (
          <GridContainer>
            <GridItem className="py-12">
              <div
                className="senja-embed"
                data-id={process.env.NEXT_PUBLIC_SENJA_WIDGET_ID}
                data-mode="shadow"
                data-lazyload="false"
              />
              <script
                async
                src="https://widget.senja.io/widget/embed.js"
              />
            </GridItem>
          </GridContainer>
        )}
      </div>
    </section>
  );
}
