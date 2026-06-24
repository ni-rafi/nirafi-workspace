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
import { CulvertDrawing, CulvertSandbox } from '@/subjects/quantity-surveying/features';

// Slide 11: Section Divider
export const Slide11: React.FC = () => (
  <TopicDividerLayout
    topicNumber="03"
    title="Box & Pipe Culverts"
    description="Cross-drainage structures, Hydraulic Opening Void Deductions, Hume Pipes, and Cradle Concrete Beddings"
  />
);

// Slide 12: RCC Box Culvert Concrete Volume
export const Slide12: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'walls' | 'deck' | 'void' | 'pipe' | 'cradle' | 'headwall' => {
    if (click === 1) return 'base';
    if (click === 2) return 'walls';
    if (click === 3) return 'deck';
    if (click === 4) return 'void';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="3.1 RCC Box Culvert Volume & Voids"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="RCC Frame Structure">
            An RCC box culvert is a monolithic frame. Calculating concrete volume requires taking the gross external volume and deducting the inner hydraulic void.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Base Slab & Top Deck", text: <span>Horizontal structural RCC plates. Typically 200mm-300mm thickness (<ClickHighlight variant="paint" at={1}>Base Raft</ClickHighlight> & <ClickHighlight variant="paint" at={3}>Top Deck</ClickHighlight>).</span> },
              { title: "Vertical Abutment Walls", text: <span>Side walls supporting the top deck slab. Typically 200mm-250mm thick (<ClickHighlight variant="paint" at={2}>Vertical Walls</ClickHighlight>).</span> },
              { title: "Hydraulic Void Deduction", text: <span>Deduct the clear internal flow area (Span S × Height h) from the gross volume calculations (<ClickHighlight variant="paint" at={4}>Void Deduction</ClickHighlight>).</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <CulvertDrawing mode="box" activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={4} preset="up">
            <SlideCallout variant="info" title="Net RCC Concrete Volume Formula" className="py-2">
              <div className="text-base font-mono text-center text-primary bg-muted/40 p-2 rounded-xl border border-primary/20 font-bold">
                V = (W_out × H_out - W_void × H_void) × L
              </div>
              <span className="text-[9px] text-muted-foreground block mt-1 text-center font-bold">
                Where W_out/H_out are external dimensions, and W_void/H_void are clear opening flow dimensions.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 13: Pipe Culvert & Bedding
export const Slide13: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'walls' | 'deck' | 'void' | 'pipe' | 'cradle' | 'headwall' => {
    if (click === 1) return 'pipe';
    if (click === 2) return 'cradle';
    if (click === 3) return 'headwall';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="3.2 Precast Hume Pipe Culvert"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Hume Pipe Assemblies">
            Hume pipe culverts consist of precast concrete pipe segments laid on bedding and enclosed by boundary headwalls.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Precast Hume Pipes", text: <span>Typically NP3/NP4 grade high-strength concrete pipe sections (e.g. ⌀900mm), billed in running meters or segments (<ClickHighlight variant="paint" at={1}>Hume Pipe</ClickHighlight>).</span> },
              { title: "Concrete Cradle Bedding", text: <span>Supports the circular pipe bottom, distributing traffic loading and preventing pipe displacement (<ClickHighlight variant="paint" at={2}>Cradle Bedding</ClickHighlight>).</span> },
              { title: "Masonry Headwalls", text: <span>Retaining masonry blocks at the inlet and outlet boundaries to prevent soil erosion (<ClickHighlight variant="paint" at={3}>Masonry Headwall</ClickHighlight>).</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <CulvertDrawing mode="pipe" activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="warning" title="Bedding Concrete Volume" className="py-2">
              <div className="text-sm font-mono text-center text-amber-500 bg-muted/40 p-2 rounded-xl border border-amber-500/20 font-bold">
                V = Bedding Width × Thickness × Length
              </div>
              <span className="text-[9px] text-muted-foreground block mt-1 text-center font-bold">
                Standard pipe segments are 2.5 meters in length.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 14: Culvert Sandbox
export const Slide14: React.FC = () => (
  <CulvertSandbox />
);
