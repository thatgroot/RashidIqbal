"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { day: string; sessions: number; pageviews: number };

export function TrendChart({ data }: { data: Point[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-[#73706d] py-12 text-center">
        No sessions yet. Visits will plot here once /api/track receives them.
      </p>
    );
  }

  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sessionsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pageviewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f4f4f5" vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(d) => {
              const dt = new Date(d);
              return `${dt.getMonth() + 1}/${dt.getDate()}`;
            }}
            stroke="#a1a1aa"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#a1a1aa"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "none",
              borderRadius: 4,
              color: "#fafafa",
              fontSize: 12,
            }}
            labelStyle={{ color: "#a1a1aa", fontSize: 10 }}
          />
          <Area
            type="monotone"
            dataKey="pageviews"
            stroke="#18181b"
            strokeWidth={1.5}
            fill="url(#pageviewsFill)"
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="#f97316"
            strokeWidth={2}
            fill="url(#sessionsFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
