"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Check, X } from "lucide-react";

export function ComparisonV2() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                        Stop Gambling With Freelancers.
                    </h2>
                    <p className="text-lg text-zinc-500">
                        Work with a partner who cares about your business, not just the code.
                    </p>
                </div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={2}  > 
            <GridItem label="Standard Agency" className="bg-zinc-50/30">
                <div className="space-y-6">
                    {[
                        "Ghosting & poor communication",
                        "Design doesn't match code",
                        "Bloated, slow websites",
                        "Surprise invoices"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-zinc-500">
                            <div className="w-6 h-6 rounded flex items-center justify-center border border-zinc-200 bg-white">
                                <X className="w-3 h-3" />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </GridItem>
            
            <GridItem label="My Approach" className="bg-white">
                <div className="space-y-6">
                    {[
                        "Direct access to me (Slack/WhatsApp)",
                        "Pixel-perfect implementation",
                        "Lightning fast performance",
                        "Flat, transparent pricing"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-zinc-900 font-medium">
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-orange-500 text-white">
                                <Check className="w-3 h-3" />
                            </div>
                            {item}
                        </div>
                    ))}
                </div>
            </GridItem>
        </GridContainer>
      </div>
    </section>
  );
}
