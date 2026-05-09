"use client";

import { useEffect, useRef, useState } from"react";
import { motion, useInView } from"framer-motion";
import { GridContainer, GridItem } from"@/components/shared/grid-system";

const stats = [
  { value: 50, suffix:"+", label:"Projects Delivered" },
  { value: 14, suffix:"", label:"Active This Year" },
  { value: 12, suffix:"%", label:"Avg. Conversion Lift" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin:"-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function ProjectCounter() {
  return (
    <GridContainer cols={3}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <GridItem>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0a0a0a] mb-2 tabular-nums">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </GridItem>
        </motion.div>
      ))}
    </GridContainer>
  );
}
