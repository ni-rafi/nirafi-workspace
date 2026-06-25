import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideList,
  InteractiveCard,
  LatexFormula,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { SlabCulvertAnatomyDrawing } from '@/subjects/quantity-surveying/features';

// Slide: Typologies of Culverts
export const SlideCulvertTypologies: React.FC = () => {
  return (
    <TwoColumnLayout
      title="3.3 Specialized Culvert Typologies"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Beyond Slab and Box Configurations"
          description="While slab and box culverts cover standard highway drainage, specific terrain, rail networks, and masonry structures require specialized configurations."
          revealMode="each-click"
          items={[
            {
              title: "Arch Culverts",
              text: <span>Low-profile curved structures. Ideal for deep fills and high embankments due to high <ClickHighlight variant="paint" at={1}>compressive arch strength</ClickHighlight>.</span>
            },
            {
              title: "Steel Girder Culverts",
              text: <span>Consist of parallel steel girders supporting traffic or railway sleepers directly (<ClickHighlight variant="paint" at={2}>open deck</ClickHighlight>), utilized in railroad water crossings.</span>
            },
            {
              title: "Scuppers",
              text: <span>Small opening channels built at ground level to drain accumulated surface water off the <ClickHighlight variant="paint" at={3}>roadway deck</ClickHighlight>.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-4">
          <InteractiveCard title="Culvert Engineering Span Limits" variant="default">
            <div className="space-y-3 font-mono text-xs select-none">
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase">Maximum Clear Span</span>
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border/40 font-bold text-center text-primary mt-1">
                  Span Limit = 5.0m to 6.0m
                </div>
                <span className="text-[9px] text-muted-foreground block mt-1 leading-normal">
                  Structures exceeding 6m span are classified and estimated as full bridges.
                </span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-bold uppercase">Maximum Span Channels</span>
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border/40 font-bold text-center text-amber-500 mt-1">
                  Limit = 3 Multi-Spans
                </div>
                <span className="text-[9px] text-muted-foreground block mt-1 leading-normal">
                  Channelling more than 3 spans is restricted due to risk of hydraulic choking.
                </span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// Slide: Culvert Foundation Measurement (Brick Flat Soling)
export const SlideCulvertFoundationSoling: React.FC = () => {
  return (
    <TwoColumnLayout
      title="4.1 Culvert Abutment Foundation & Soling"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Subgrade Stabilization & Soling Ledgers"
          description="Before concrete abutments and wing walls are cast, the sub-foundation trench bed is stabilized with a sand cushion and brick flat soling."
          revealMode="each-click"
          items={[
            {
              title: "75mm Brick Flat Soling (BFS)",
              text: <span>A single layer of first-class bricks laid flat on the sand cushion. Billed under PWD rules in <ClickHighlight variant="paint" at={1}>square meters (m²)</ClickHighlight> of flat area.</span>
            },
            {
              title: "Trench Area Take-off",
              text: <span>The soling area equals the foundation concrete bed footprint. Billed area: <ClickHighlight variant="paint" at={2}>A = Foundation Width × Length</ClickHighlight> for both abutments and wing walls.</span>
            },
            {
              title: "Brick Quantity Conversion",
              text: <span>Estimators convert soling area to brick units. Standard flat soling requires <ClickHighlight variant="paint" at={3}>32 bricks per m²</ClickHighlight> (brick size: 240mm × 115mm × 70mm).</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <SlabCulvertAnatomyDrawing activeHighlight="abutment" className="flex-1" />
          <InteractiveCard title="Soling Formula Sheet" variant="default" className="py-2.5">
            <span className="text-[10px] text-muted-foreground block font-bold font-mono uppercase">BFS Area under 2 Abutments:</span>
            <div className="mt-1">
              <LatexFormula math="A_{\text{soling}} = 2 \times (L \times W_{\text{base}})" block />
            </div>
            <span className="text-[9px] text-muted-foreground block mt-1 font-sans leading-normal">
              Where L = Abutment length, and W_base = Width of concrete footing bed.
            </span>
          </InteractiveCard>
        </div>
      }
    />
  );
};
