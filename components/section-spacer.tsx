"use client";

import { GridContainer, GridItem } from "./v2/grid-system";

// For use between major sections (has full container wrapper)
export function SectionSpacer() {
  return (
    <div className="bg-white">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem padding={false} className="h-[200px]">
            <div className="h-full" />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

// For use within a section (no container wrapper)
export function InnerSpacer() {
  return (
    <GridContainer>
      <GridItem padding={false} className="h-[200px]">
        <div className="h-full" />
      </GridItem>
    </GridContainer>
  );
}

