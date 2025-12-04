"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "The most technical designer I've ever worked with. Rashid understands code constraints better than most engineers.",
    author: "Sarah J.",
    role: "CTO @ TechFlow"
  },
  {
    text: "We shipped our MVP in record time. The Next.js architecture scaled perfectly as we grew from 0 to 10k users.",
    author: "Mike R.",
    role: "Founder @ ScaleUp"
  },
  {
    text: "Finally, a mobile app that doesn't feel like a web wrapper. The 60fps native performance is real.",
    author: "Elena K.",
    role: "Product @ MobileFirst"
  }
];

export function TestimonialsV2() {
  return (
    <section className="bg-white">
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
                                <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" />
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
