"use client";

import { GridContainer, GridItem } from"@/components/shared/grid-system";

// For use between major sections (has full container wrapper)
export function SectionSpacer() {
  return (
    <div className="bg-white">
      <div className="max-w-container border-l border-[#e5e5e5]">
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

