"use client";

import { GridContainer, GridItem } from "./grid-system";
import { Figma, Zap, Layout } from "lucide-react";

const services = [
  {
    title: "Landing Pages",
    desc: "I design landing pages in Figma that convert. Every layout, button, and visual element is crafted to guide visitors toward action. What you get is a design that looks great and works even better.",
    icon: Figma,
    stat: "Figma • Framer • Next.js"
  },
  {
    title: "Marketing Sites",
    desc: "High converting Framer sites shipped fast. I build marketing pages that load instantly, look stunning, and turn visitors into customers. No code required, just results.",
    icon: Layout,
    stat: "2 Week Delivery"
  },
  {
    title: "Web Applications",
    desc: "Complex Next.js apps built right. I handle the full stack from database design to API integration, ensuring your app is fast, secure, and ready to scale when you need it.",
    icon: Zap,
    stat: "99/100 Performance"
  }
];

export function ServicesGridV2() {
  return (
    <section className="bg-white" id="services">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer  > 
            <GridItem className="py-24">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-semibold text-zinc-900 mb-6">
                        From Idea to Impact.
                    </h2>
                    <p className="text-lg text-zinc-500 leading-relaxed">
                        It starts with a simple idea and a clear vision. You want something that looks great, works perfectly, and tells your story with purpose. We explore directions, test concepts, and refine each part until everything begins to align.
                    </p>
                </div>
            </GridItem>
        </GridContainer>

        <GridContainer cols={3}  > 
            {services.map((service, i) => (
                <GridItem key={i} label={`0${i + 1}`}>
                    <div className="h-full flex flex-col">
                        <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8 text-zinc-900">
                            <service.icon className="w-5 h-5" />
                        </div>
                        
                        <h3 className="text-xl font-medium text-zinc-900 mb-3">
                            {service.title}
                        </h3>
                        
                        <p className="text-sm text-zinc-500 leading-relaxed mb-8 flex-1">
                            {service.desc}
                        </p>

                        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                            <span className="text-xs font-mono text-zinc-500 uppercase">Metric</span>
                            <span className="text-xs font-bold text-zinc-900">{service.stat}</span>
                        </div>
                    </div>
                </GridItem>
            ))}
        </GridContainer>
      </div>
    </section>
  );
}
