"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before redesign",
  afterAlt = "After redesign",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  function updatePosition(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }

  function handleMouseDown() {
    isDragging.current = true;
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  function handleTouchMove(e: React.TouchEvent) {
    updatePosition(e.touches[0].clientX);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden cursor-col-resize select-none border border-zinc-200"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full width, behind) */}
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="absolute inset-0" style={{ width: `${100 / (position / 100)}%` }}>
          <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 3L14 8L11 13" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider z-20">
        Before
      </span>
      <span className="absolute top-3 right-3 px-2 py-1 bg-orange-600/90 text-white text-[10px] font-bold uppercase tracking-wider z-20">
        After
      </span>
    </div>
  );
}
