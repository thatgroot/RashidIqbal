"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Simply the best developer I've worked with. Fast, reliable, and the design skills are next level.",
    author: "Sarah Jenkins",
    role: "CTO, FinTech Startup",
    avatar: "SJ"
  },
  {
    quote: "Rashid transformed our vague idea into a stunning, high-performing product. Highly recommended.",
    author: "Michael Chen",
    role: "Product Manager",
    avatar: "MC"
  },
  {
    quote: "The attention to detail in the motion graphics and interactions really sets our site apart.",
    author: "Elena Rodriguez",
    role: "Founder, ArtSpace",
    avatar: "ER"
  },
  {
    quote: "Finally, a developer who understands marketing. Our conversion rate went up by 200%.",
    author: "David Park",
    role: "CMO, GrowthFlow",
    avatar: "DP"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black overflow-hidden border-y border-white/5">
      <div className="mb-12 text-center px-4">
        <h2 className="text-3xl font-bold mb-2">What People Say</h2>
        <p className="text-white/60">Don&apos;t just take my word for it.</p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-6 px-4 w-max"
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="w-[400px] p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {item.avatar}
                </div>
                <div>
                    <div className="font-bold text-white">{item.author}</div>
                    <div className="text-xs text-white/40">{item.role}</div>
                </div>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">"{item.quote}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
