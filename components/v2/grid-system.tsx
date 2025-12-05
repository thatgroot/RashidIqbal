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
  return (
    <div className={cn("relative border-b border-r border-zinc-100 bg-white group grid-item-corners", padding ? "p-8 sm:p-12" : "", className)}>
      {/* Corner nodes - reduced from 4 divs to 2 spans using box-shadow (50% reduction) */}
      <span className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-zinc-200 group-hover:bg-orange-500 transition-colors z-10 grid-corner-left" aria-hidden="true" />
      <span className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-zinc-200 group-hover:bg-orange-500 transition-colors z-10 grid-corner-right" aria-hidden="true" />
      
      {/* Content */}
      <div className="grid-item-content">
        {(title || label) && (
            <div className="flex justify-between items-start mb-6">
                {title && <h3 className="text-lg font-medium text-zinc-900">{title}</h3>}
                {label && <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>}
            </div>
        )}
        {children}
      </div>
    </div>
  );
}
