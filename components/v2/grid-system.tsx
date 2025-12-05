"use client";

import { useRef } from "react";
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
  // Corners are now CSS-only via .grid-item-corners pseudo-elements in globals.css
  return (
    <div className={cn("relative border-b border-r border-zinc-100 bg-white group grid-item-corners overflow-hidden", padding ? "p-8 sm:p-12" : "", className)}>
      {(title || label) && (
        <div className="flex justify-between items-start mb-6">
          {title && <h3 className="text-lg font-medium text-zinc-900">{title}</h3>}
          {label && <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
