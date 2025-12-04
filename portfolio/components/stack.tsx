"use client";

import { motion } from "framer-motion";

const stack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", 
  "Node.js", "PostgreSQL", "Supabase", "AWS", "Vercel", 
  "Figma", "Adobe Creative Suite", "Expo", "React Native"
];

export function StackV2() {
  return (
    <section className="py-12 border-y border-zinc-100 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="text-xs font-bold text-zinc-400 whitespace-nowrap uppercase tracking-widest">
           Tech Stack
        </div>
        
        <div className="flex-1 w-full overflow-hidden mask-linear-fade relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div 
                className="flex gap-12 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
                {[...stack, ...stack].map((tech, i) => (
                    <span key={i} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-default">
                        {tech}
                    </span>
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
