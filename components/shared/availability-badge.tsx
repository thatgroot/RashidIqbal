"use client";

import { motion } from "framer-motion";

interface AvailabilityBadgeProps {
  spotsLeft?: number;
  variant?: "inline" | "floating";
}

export function AvailabilityBadge({ spotsLeft = 2, variant = "inline" }: AvailabilityBadgeProps) {
  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e8e4dd] shadow-lg text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9b4fa] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0e3030]" />
        </span>
        <span className="text-[#73706d]">
          <span className="font-bold text-[#292827]">{spotsLeft} spot{spotsLeft !== 1 ? "s" : ""}</span> left this month
        </span>
      </motion.div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fafaf8] border border-[#e8e4dd] text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9b4fa] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0e3030]" />
      </span>
      <span className="text-emerald-700 font-medium">
        {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left this month
      </span>
    </div>
  );
}
