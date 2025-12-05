"use client";

import { GridContainer, GridItem } from "./grid-system";

export function SectionSpacer() {
  return (
    <div className="bg-white">
      <div className="max-w-container border-l border-zinc-100">
        <GridContainer>
          <GridItem padding={false} className="h-[120px]">
            <div className="h-full" />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

