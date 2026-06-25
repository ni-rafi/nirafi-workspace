import React from 'react';
import { LectureCover } from '@/shared/layouts/LectureCover';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
  ClickReveal,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { RoadPavementDrawing, RoadPavementSandbox } from '@/subjects/quantity-surveying/features';

// Slide 1: Cover Slide
export const Slide1: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

// Slide 2: Section Divider
export const Slide2: React.FC = () => (
  <TopicDividerLayout
    topicNumber="01"
    title="Flexible Roadway Pavements"
    description="Stratified Volumetric Calculations, Compaction Expansion Factors, and Bituminous Overlay Quantities"
  />
);

// Slide 3: Pavement Stratification
export const Slide3: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  
  const getHighlight = (click: number): 'none' | 'subgrade' | 'sub-base' | 'base' | 'surface' => {
    if (click === 1) return 'subgrade';
    if (click === 2) return 'sub-base';
    if (click === 3) return 'base';
    if (click === 4) return 'surface';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="1.1 Road Pavement Stratification"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Pavement Layers">
            Road pavements are constructed in distinct layers. Each layer has specific material composition and structural function.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Compacted Subgrade", text: <span>The natural soil foundation bed, compacted to carry pavement load (<ClickHighlight variant="paint" at={1}>Subgrade Bed</ClickHighlight>).</span> },
              { title: "Sub-Base Course", text: <span>Typically brick soling or WBM (Water Bound Macadam) aggregate layer (<ClickHighlight variant="paint" at={2}>Sub-base</ClickHighlight>).</span> },
              { title: "Base Course", text: <span>Stone chips or premium broken aggregate layer providing core stability (<ClickHighlight variant="paint" at={3}>Base Course</ClickHighlight>).</span> },
              { title: "Wearing Surface", text: <span>Bituminous carpeting overlay providing a smooth, waterproof wearing surface (<ClickHighlight variant="paint" at={4}>Wearing Course</ClickHighlight>).</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={4} preset="up">
            <SlideCallout variant="info" title="Cross-Section Geometry Note" className="py-2">
              <span className="text-[10px] text-muted-foreground leading-normal">
                Lower layers are wider than upper layers due to the slope. For subbase and base course calculations, ensure you use their corresponding average width.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 4: Volumetric Layering Rule & Compaction
export const Slide4: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'subgrade' | 'sub-base' | 'base' | 'surface' => {
    if (click === 1) return 'sub-base';
    if (click === 2) return 'base';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="1.2 Volumetric Compaction Rules"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Dry vs. Compacted Volume">
            Aggregates compact under heavy road-rollers. Quantity surveyors must estimate the loose/dry volume required to yield the final compacted thickness.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Water Bound Macadam (WBM)", text: <span>Brick aggregates compact by roughly 25%. Loose Volume = Compacted Volume × <ClickHighlight variant="bold" className="text-amber-500" at={1}>1.25</ClickHighlight>.</span> },
              { title: "Stone Base Course", text: <span>Crushed stone chips compact by roughly 30%. Loose Volume = Compacted Volume × <ClickHighlight variant="bold" className="text-primary font-bold" at={2}>1.30</ClickHighlight>.</span> },
              { title: "Volumetric Formula", text: <span>V = Length × Average Width × Thickness × Compaction Factor.</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="warning" title="Loose Volume Formula" className="py-2">
              <div className="text-base font-mono text-center text-amber-500 bg-muted/40 p-2 rounded-xl border border-amber-500/20 font-bold">
                Dry Vol = Compacted Vol × CF
              </div>
              <span className="text-[9px] text-muted-foreground block mt-1 text-center font-bold">Compaction Factors (CF): WBM = 1.25, Stone Base = 1.30</span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 5: Bituminous Carpeting
export const Slide5: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="1.3 Bituminous Surfacing & Seal Coat"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph title="Surfacing Layer Materials">
            Bituminous surfacing binds wearing aggregates, sealing them against water penetration.
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            items={[
              { title: "Prime Coat / Tack Coat", text: <span>Initial asphalt binder application over granular base. Usually estimated in square meters (m²) at a rate of <ClickHighlight variant="paint" at={1}>1.0 kg/m²</ClickHighlight>.</span> },
              { title: "Wearing Carpeting", text: <span>Hot asphalt concrete layer, typically 25mm to 40mm thick. Billed in cubic meters (m³) of compacted asphalt mixture.</span> },
              { title: "Seal Coat", text: <span>Final premium sand-bitumen layer protecting the wearing course. Billed in square meters (m²).</span> }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing activeHighlight={currentClick >= 1 ? 'surface' : 'none'} className="flex-1" />
          <ClickReveal at={2} preset="up">
            <SlideCallout variant="success" title="Bitumen Binder Estimation" className="py-2">
              <div className="text-sm font-mono text-center text-emerald-500 bg-muted/40 p-2 rounded-xl border border-emerald-500/20 font-bold">
                Bitumen (kg) = Area (m²) × Binder Rate (kg/m²)
              </div>
              <span className="text-[9px] text-muted-foreground block mt-1 text-center font-bold">
                Standard application rate: 1.0 kg/m² for prime coat binder.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide 6: Pavement Live Sandbox
export const Slide6: React.FC = () => (
  <RoadPavementSandbox />
);
