"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GridSnake } from "@/components/ui/grid-snake";

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  enableSnake?: boolean;
}

export function GridContainer({ children, className, cols = 1, enableSnake = false }: GridContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={cn(
      "grid relative", 
      cols === 4 ? "md:grid-cols-4" : 
      cols === 3 ? "md:grid-cols-3" : 
      cols === 2 ? "md:grid-cols-2" : 
      "grid-cols-1", 
      className
    )}>
      {children}
      {enableSnake && <GridSnake gridRef={containerRef} />}
    </div>
  );
}

export function GridItem({ children, className, title, label, padding = true }: { children: React.ReactNode, className?: string, title?: string, label?: string, padding?: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Check if this is a visual container (no hover effects on visual items)
  const isVisual = className?.includes("grid-item-visual");

  // Set CSS custom properties for cursor position (no extra DOM nodes)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || isVisual) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    itemRef.current.style.setProperty('--mouse-x', `${x}%`);
    itemRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, [isVisual]);

  return (
    <div 
      ref={itemRef}
      onMouseMove={!isVisual ? handleMouseMove : undefined}
      className={cn(
        "relative border-b border-r border-zinc-100 bg-white group grid-item-corners overflow-hidden",
        !isVisual && "grid-item-hover",
        padding ? "p-8 sm:p-12" : "", 
        className
      )}
    >
        {/* Label positioned absolutely in top-right corner */}
        {label && (
          <span className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-orange-500 transition-colors z-10">
            {label}
          </span>
        )}
        
        {/* Title with margin if present */}
        {title && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-zinc-900">{title}</h3>
            </div>
        )}
        
        {children}
    </div>
  );
}
