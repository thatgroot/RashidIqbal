"use client";

import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative bg-black overflow-hidden">
      {/* Background Map Visual */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
         {/* Dot Grid */}
         <div className="absolute inset-0 bg-size-[40px_40px] bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]" />
         
         {/* Connecting Lines */}
         <svg className="absolute inset-0 w-full h-full">
            <motion.path 
                d="M 20% 30% Q 50% 10% 80% 40%" 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
         </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mx-auto mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-green-500">SYSTEM_ONLINE :: ACCEPTING_INQUIRIES</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-white/50">
            Ready to deploy?
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Initiate collaboration sequence. Let&apos;s build scalable, high-performance digital infrastructure together.
          </p>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <a href="mailto:hello@example.com" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 w-full md:w-auto">
               <span className="relative z-10 flex items-center gap-2">
                 <Mail className="w-5 h-5" />
                 Email Me
               </span>
            </a>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-white/10 border border-white/10 rounded-full overflow-hidden transition-all hover:bg-white/20 w-full md:w-auto">
               <span className="relative z-10 flex items-center gap-2">
                 <Calendar className="w-5 h-5" />
                 Schedule Call
               </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
