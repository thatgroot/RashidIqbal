"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { GridSnake } from "@/components/ui/grid-snake";
import { motion } from "framer-motion";

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
      "grid relative items-stretch", 
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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  // Check if this is a visual container (no hover effects on visual items)
  const isVisual = className?.includes("grid-item-visual");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || isVisual) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, [isVisual]);

  return (
    <motion.div 
      ref={itemRef}
      className={cn("relative border-b border-r border-zinc-100 bg-white group grid-item-corners overflow-hidden", padding ? "p-8 sm:p-12" : "", className)}
      onMouseMove={!isVisual ? handleMouseMove : undefined}
      {...(!isVisual && { whileHover: { backgroundColor: "rgba(250, 250, 250, 0.8)" } })}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient hover effect - only on non-visual items */}
      {!isVisual && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0.03) 30%, transparent 70%)`
          }}
        />
      )}

      {/* Corner nodes - always show */}
      <span 
        className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-zinc-200 group-hover:bg-orange-500 z-10 grid-corner-left transition-colors duration-300" 
        aria-hidden="true"
      />
      <span 
        className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-zinc-200 group-hover:bg-orange-500 z-10 grid-corner-right transition-colors duration-300" 
        aria-hidden="true"
      />
      
      {/* Border highlight on hover - only on non-visual items */}
      {!isVisual && (
        <div 
          className="absolute inset-0 border border-transparent group-hover:border-orange-500/20 pointer-events-none transition-colors duration-300"
        />
      )}
      
      {/* Content */}
      <div className={cn(
        "grid-item-content relative z-10", 
        isVisual && "h-full flex items-center justify-center"
      )}>
        {(title || label) && (
            <div className="flex justify-between items-start mb-6">
                {title && (
                    <motion.h3 
                        className="text-lg font-medium text-zinc-900"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {title}
                    </motion.h3>
                )}
                {label && (
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-orange-500 transition-colors duration-300">
                        {label}
                    </span>
                )}
            </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
