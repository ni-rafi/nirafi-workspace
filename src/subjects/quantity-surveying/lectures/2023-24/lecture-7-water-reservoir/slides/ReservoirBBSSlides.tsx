import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
  InteractiveCard,
  ClickHighlight,
  ClickReveal
} from '@/features/presentation/components/elements';
import { ReservoirBBSDrawing } from '@/subjects/quantity-surveying/features/components/ReservoirBBSDrawing';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

// ============================================================================
// Slide 7: Reservoir BBS Fundamentals
// ============================================================================
export const Slide7: React.FC = () => (
  <TwoColumnLayout
    title="1.5 Reservoir Bar Bending Schedule (BBS) Fundamentals"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4 text-left select-text">
        <SlideParagraph title="Hydrostatic Resistance Reinforcement">
          A liquid-retaining underground reservoir requires a dense, double-reinforced steel grid to withstand massive outward hydrostatic pressure and inward active soil pressure.
        </SlideParagraph>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Unlike ordinary building slabs, reinforcement in water reservoirs must be tracked across three critical regions: the Base Raft, the Vertical Walls, and the Top Cover Slab.
        </p>
        <SlideCallout variant="info" title="The Concrete Cover Boundary">
          Liquid-retaining zones require a strict minimum of <ClickHighlight at={1} variant="paint">50 mm (2 inches) clear cover</ClickHighlight> to prevent rust corrosion from moisture infiltration.
        </SlideCallout>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full select-text">
        <InteractiveCard title="Standard Reinforcement Schedules" variant="default">
          <div className="text-xs space-y-2.5">
            <p>
              • <strong>Base Raft Slab</strong>
              <br /><span className="text-muted-foreground text-[10px]">Heavier grid: #6 (19mm) main bars @ 5" c/c and #5 (16mm) distribution bars @ 6" c/c.</span>
            </p>
            <p>
              • <strong>Vertical Walls (Inner &amp; Outer)</strong>
              <br /><span className="text-muted-foreground text-[10px]">Dual layers: #4 (12mm) vertical stem bars and #3 (10mm) horizontal rings @ 5" c/c.</span>
            </p>
            <p>
              • <strong>Top Cover Slab</strong>
              <br /><span className="text-muted-foreground text-[10px]">Double grid: #6 (19mm) bottom and top mesh bars spaced at standard intervals.</span>
            </p>
          </div>
        </InteractiveCard>
      </div>
    }
  />
);

// ============================================================================
// Slide 8: Calculating Reservoir Reinforcement
// ============================================================================
export const Slide8: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const highlightMap: Record<number, 'none' | 'base' | 'wall' | 'cover'> = {
    0: 'none',
    1: 'base',
    2: 'wall',
    3: 'cover',
  };

  const activeHighlight = highlightMap[currentClick] || 'none';

  return (
    <TwoColumnLayout
      title="1.6 Calculating Reservoir Reinforcement"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-4 text-left select-text">
          <SlideParagraph variant="plain" className="text-xs select-none">
            The quantity surveyor must resolve the cut length of each bar group based on spans, concrete dimensions, and covers.
          </SlideParagraph>

          <SlideList
            revealMode="each-click"
            items={[
              {
                title: "Base Raft Slab Steel",
                text: "W = Length × unit weight. Add 180° anchorage hooks (+9d per hook) at both ends of the main raft bars."
              },
              {
                title: "Wall Reinforcement (Double Grids)",
                text: "Track inner and outer vertical rods extending from base foundation raft up to top cover slab, plus horizontal ties."
              },
              {
                title: "Cover Slab Top & Bottom Mesh",
                text: "Quantify bottom and top horizontal layers, accounting for cover slab edge supports and hooks."
              }
            ]}
          />

          <ClickReveal at={3}>
            <SlideCallout variant="warning" title="Wastage & Overlap Allowance">
              Once linear requirements for #3, #4, #5, and #6 bars are compiled, add a standard **2% allowance** for cut-off wastage and lap-splices before converting to total weight.
            </SlideCallout>
          </ClickReveal>
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <ReservoirBBSDrawing
            activeHighlight={activeHighlight}
            className="flex-1"
          />
        </div>
      }
    />
  );
};
