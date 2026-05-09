"use client";

import { motion } from"framer-motion";

interface AvailabilityBadgeProps {
  spotsLeft?: number;
  variant?:"inline" |"floating";
}

export function AvailabilityBadge({ spotsLeft = 2, variant ="inline" }: AvailabilityBadgeProps) {
  if (variant ==="floating") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fde8a3] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0a0a0a]" />
        </span>
        <span className="text-[#737373]">
          <span className="font-bold text-[#0a0a0a]">{spotsLeft} spot{spotsLeft !== 1 ?"s" :""}</span> left this month
        </span>
      </motion.div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fafafa] border border-[#e5e5e5] text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fde8a3] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0a0a0a]" />
      </span>
      <span className="text-emerald-700 font-medium">
        {spotsLeft} spot{spotsLeft !== 1 ?"s" :""} left this month
      </span>
    </div>
  );
}
