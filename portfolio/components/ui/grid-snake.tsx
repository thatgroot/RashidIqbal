"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface GridSnakeProps {
  gridRef: React.RefObject<HTMLElement | null>;
  offset?: { top: number; left: number };
}

export function GridSnake({ gridRef, offset = { top: 0, left: 0 } }: GridSnakeProps) {
  const [path, setPath] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef<SVGSVGElement>(null);

  // Track scroll progress relative to the grid
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const calculatePath = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const children = Array.from(grid.children) as HTMLElement[];
      
      if (children.length === 0) return;

      // Group children by row
      const rows: HTMLElement[][] = [];
      let currentRow: HTMLElement[] = [];
      let currentTop = children[0].offsetTop;

      children.forEach((child) => {
        if (Math.abs(child.offsetTop - currentTop) > 10) {
          rows.push(currentRow);
          currentRow = [];
          currentTop = child.offsetTop;
        }
        currentRow.push(child);
      });
      if (currentRow.length > 0) rows.push(currentRow);

      // Build the path - Only Left Vertical Line
      // Just a simple line from Top-Left to Bottom-Left of the grid
      
      const height = grid.offsetHeight;
      const d = `M 0 0 L 0 ${height}`;

      setPath(d);
      setSvgSize({ width: grid.offsetWidth, height: grid.offsetHeight });
    };

    calculatePath();
    window.addEventListener("resize", calculatePath);
    return () => window.removeEventListener("resize", calculatePath);
  }, [gridRef]);

  const opacity = useTransform(pathLength, [0, 0.01], [0, 1]);

  return (
    <svg
      ref={wrapperRef}
      className="absolute top-0 left-0 pointer-events-none z-20 overflow-visible"
      width={svgSize.width}
      height={svgSize.height}
      style={{
        top: offset.top,
        left: offset.left
      }}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="#f97316" // Orange-500
        strokeWidth="2"
        strokeLinecap="square"
        style={{
          pathLength,
          opacity
        }}
      />
    </svg>
  );
}
