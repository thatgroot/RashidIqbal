"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Rashid rebuilt our entire deal aggregation platform from scratch. The new architecture handles 50k+ daily listings without breaking a sweat. Conversion rates jumped 34% after launch.",
    author: "Priya Selvakumar",
    role: "Founder @ DealsFinders"
  },
  {
    text: "Our AI meeting assistant needed a website that felt as smart as the product. Rashid delivered a Next.js site that converts visitors into users. Onboarding signups increased by half after launch.",
    author: "Josh Schachter",
    role: "Founder & CEO @ UpdateAI"
  },
  {
    text: "Rashid built our mobile apps from the ground up. Athletes can now update their emergency IDs on the go. The React Native performance is buttery smooth. App Store ratings speak for themselves.",
    author: "Mike Wimmer",
    role: "Co-Founder @ Road ID"
  }
];

export function TestimonialsV2() {
  return (
    <section className="bg-white" id="testimonials">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                        Client Feedback.
                    </h2>
                    <p className="text-lg text-zinc-500">
                        Trusted by ambitious founders and engineering teams.
                    </p>
                </div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}  > 
            {reviews.map((review, i) => (
                <GridItem key={i} className="dotted-bg dotted-bg-opacity-30">
                    
                    <div className="relative z-10">
                        <div className="flex gap-1 mb-8">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                            ))}
                        </div>
                        <p className="text-lg text-zinc-900 leading-relaxed mb-8 font-medium">
                            "{review.text}"
                        </p>
                        <div>
                            <div className="font-bold text-zinc-900 text-sm">{review.author}</div>
                            <div className="text-xs text-zinc-500">{review.role}</div>
                        </div>
                    </div>
                </GridItem>
            ))}
        </GridContainer>
      </div>
    </section>
  );
}
