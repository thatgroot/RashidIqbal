"use client";

import { motion } from "framer-motion";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: number;
}

function getColor(score: number) {
  if (score >= 90) return "#22c55e"; // green
  if (score >= 50) return "#f97316"; // orange
  return "#ef4444"; // red
}

function getGrade(score: number) {
  if (score >= 90) return "Great";
  if (score >= 50) return "Needs Work";
  return "Poor";
}

export function ScoreGauge({ score, label, size = 140 }: ScoreGaugeProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColor(score);
  const grade = getGrade(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f4f4f5"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {grade}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-zinc-700">{label}</span>
    </div>
  );
}
