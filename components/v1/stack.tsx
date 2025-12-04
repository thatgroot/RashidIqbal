"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Figma", "Node.js", "PostgreSQL", "Prisma", "Docker", "AWS",
  "Flutter", "Expo", "React Native", "GraphQL", "Supabase"
];

export function Stack() {
  return (
    <section className="py-20 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest text-center">Powering Next-Gen Experiences</h2>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="flex items-center gap-2 text-2xl font-bold text-white/20 group-hover:text-white/60 transition-colors cursor-default">
               {/* Placeholder for actual icons, using text for now */}
               <span className="w-2 h-2 rounded-full bg-current opacity-40" />
               {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

