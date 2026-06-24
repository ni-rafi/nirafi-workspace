import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
  ClickReveal,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { RetainingWallDrawing, RetainingWallSandbox } from '@/subjects/quantity-surveying/features';

// Slide 7: Section Divider
export const Slide7: React.FC = () => (
  <TopicDividerLayout
    topicNumber="02"
    title="Concrete Retaining Walls"
    description="Stem Geometry, Excavation Allowances, Raft Foundations, and Drainage Backfills"
  />
);

// Slide 8: Wall Geometry
export const Slide8: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'stem' | 'weepholes' | 'drainage' => {
    if (click === 1) return 'base';
    if (click === 2) return 'stem';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="2.1 Retaining Wall Geometry"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Stem & Base Raft Details">
            Retaining walls withstand lateral earth pressure. The concrete structure consists of a base raft and a tapered vertical stem.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Base Raft Footing", text: <span>Provides overturning resistance. Standard concrete base slab slab thickness is 400mm-600mm (<ClickHighlight variant="paint" at={1}>Base Raft</ClickHighlight>).</span> },
              { title: "Tapered Vertical Stem", text: <span>Wall stem thickens at the bottom to resist higher bending moment. Top width w₁ = 450mm, bottom width w₂ = 900mm (<ClickHighlight variant="paint" at={2}>Tapered Stem</ClickHighlight>).</span> },
              { title: "Trapezoidal Stem Formula", text: <span>Average stem width w_avg = (w₁ + w₂) / 2. Stem Volume = w_avg × Height × Length.</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RetainingWallDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="info" title="Concrete Stem Volume Formula" className="py-2">
              <div className="text-base font-mono text-center text-primary bg-muted/40 p-2 rounded-xl border border-primary/20 font-bold">
                {"V = \\[\\frac{w_1 + w_2}{2}\\] × H × L"}
              </div>
              <span className="text-[9px] text-muted-foreground block mt-1 text-center font-bold">
                Where w₁ = top width, w₂ = bottom width, H = stem height, L = wall length.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 9: Drainage & Backfill
export const Slide9: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'stem' | 'weepholes' | 'drainage' => {
    if (click === 1) return 'weepholes';
    if (click === 2) return 'drainage';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="2.2 Sub-surface Drainage & Backfill"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Pore Water Pressure Control">
            Accumulated water behind a retaining wall increases lateral forces. Drainage structures prevent hydro-static load build-up.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "PVC Weep Holes", text: <span>Horizontal pipe sleeves passing through the stem, typically 75mm PVC spaced at 1.5m intervals (<ClickHighlight variant="paint" at={1}>Weep Holes</ClickHighlight>).</span> },
              { title: "Gravel Filter Backing", text: <span>Granular wedge behind the stem. Allows water to drain freely to weep holes while retaining backfill soil (<ClickHighlight variant="paint" at={2}>Gravel Filter</ClickHighlight>).</span> },
              { title: "Filter Packing Estimation", text: <span>Usually estimated in cubic meters (m³). A triangular or rectangular wedge behind the vertical back wall.</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RetainingWallDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="warning" title="Weep Holes Count Estimation" className="py-2">
              <p className="text-[10px] text-muted-foreground leading-normal">
                Number of weep holes depends on wall length and staggered grid spacing (e.g. 1.5m horizontal, 1.2m vertical spacing). In BoQ, weep holes are billed under numbers (Nos.).
              </p>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 10: Retaining Wall Sandbox
export const Slide10: React.FC = () => (
  <RetainingWallSandbox />
);
