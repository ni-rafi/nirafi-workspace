import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  SlideList,
  SlideCallout,
  InteractiveCard,
  ClickReveal,
  ClickHighlight,
  LatexFormula,
} from '@/features/presentation/components/elements';
import { RetainingWallDrawing, RetainingWallSandbox } from '@/subjects/quantity-surveying/features';

// Divider: Section 2
export const SlideRetainingWallDivider: React.FC = () => (
  <TopicDividerLayout
    topicNumber="02"
    title="Retaining Wall Typologies & Anatomy"
    description="Gravity vs. Cantilever Systems, Toe/Heel Rafts, Drainage Backfills, and Concrete Stem Volumes"
  />
);

// Slide: Classification of Retaining Walls (Moved from SlabCulvertAndWallBBS.tsx)
export const SlideRetainingWallClassifications: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  return (
    <TwoColumnLayout
      title="2.1 Classification of Retaining Walls"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Structural Wall Typologies"
          description="Retaining walls resist lateral earth pressure. The structural type is selected based on wall height, soil bearing capacity, and constructability."
          revealMode="each-click"
          items={[
            {
              title: "Gravity & Semi-Gravity",
              text: <span>Rely on <ClickHighlight variant="paint" at={1}>massive weight</ClickHighlight> (masonry/plain concrete) to prevent sliding and overturning.</span>
            },
            {
              title: "Cantilever Walls",
              text: <span>Consist of a thin vertical stem and a horizontal base slab, leveraging <ClickHighlight variant="paint" at={2}>backfill soil weight</ClickHighlight> for stability.</span>
            },
            {
              title: "Counterfort & Buttressed",
              text: <span>Angled concrete webs tie stem and base, reducing bending stress in <ClickHighlight variant="paint" at={3}>tall walls (&gt;6m)</ClickHighlight>.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-4">
          <ClickReveal at={1} preset="fade-in">
            {currentClick === 1 && (
              <InteractiveCard title="Gravity & Semi-Gravity Systems" variant="default">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Gravity Walls:</strong> Direct stability from dead weight. Best for low heights (&lt; 3m). Economical when masonry materials are cheap.
                  <br /><br />
                  <strong>Semi-Gravity:</strong> Incorporates minimal steel reinforcement to reduce concrete mass.
                </p>
              </InteractiveCard>
            )}
          </ClickReveal>
          <ClickReveal at={2} preset="fade-in">
            {currentClick === 2 && (
              <InteractiveCard title="Cantilever Retaining Walls" variant="default">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Most common type for heights of **3m to 6m**. 
                  <br /><br />
                  Consists of a stem and base raft (toe and heel). The soil weight resting on the heel slab acts as a stabilizing force against overturning and sliding.
                </p>
              </InteractiveCard>
            )}
          </ClickReveal>
          <ClickReveal at={3} preset="fade-in">
            {currentClick === 3 && (
              <InteractiveCard title="Counterfort & Buttressed Walls" variant="default">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Used for high retaining structures exceeding **6 meters**.
                  <br /><br />
                  <strong>Counterforts:</strong> Thin transverse webs on backfill side in tension.
                  <br />
                  <strong>Buttresses:</strong> Front-facing webs in compression, used where property line restricts backfill.
                </p>
              </InteractiveCard>
            )}
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide: Anatomy of a Cantilever Retaining Wall (Toe, Heel, Key)
export const SlideRetainingWallAnatomy: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'stem' | 'weepholes' | 'drainage' => {
    if (click === 1) return 'stem';
    if (click === 2) return 'base';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="2.2 Anatomy of a Cantilever Retaining Wall"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Cantilever Structural Components"
          description="A cantilever retaining wall is constructed from thin reinforced concrete slabs. Each part has distinct soil interaction and structural behavior."
          revealMode="each-click"
          items={[
            {
              title: "Stem (Arm)",
              text: <span>The vertical cantilever wall that directly resists the lateral pressure of the retained backfill soil. It is tapered (thicker at base) to match the bending moment curve.</span>
            },
            {
              title: "Heel Slab",
              text: <span>The back portion of the base slab sitting <ClickHighlight variant="paint" at={2}>underneath the backfill soil</ClickHighlight>. The weight of the soil on top of the heel prevents the wall from overturning.</span>
            },
            {
              title: "Toe Slab",
              text: <span>The front portion of the base slab on the exposed side. It projects outward to distribute soil pressure and stabilize the wall foot.</span>
            },
            {
              title: "Shear Key",
              text: <span>A downward concrete projection beneath the base raft. It <ClickHighlight variant="paint" at={3}>grips the foundation soil</ClickHighlight> to provide high friction resistance against forward sliding.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RetainingWallDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="success" title="Reinforcement & Bar Bending" className="py-2">
              <span className="text-[10px] text-muted-foreground leading-normal block">
                The stem behaves as a vertical cantilever (tension on the backfill side), while the heel acts as a horizontal cantilever loaded from above, requiring main reinforcement placement in tension zones.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide: Wall Geometry
export const SlideRetainingWallGeometry: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'stem' | 'weepholes' | 'drainage' => {
    if (click === 1) return 'base';
    if (click === 2) return 'stem';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="2.3 Retaining Wall Geometry"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Stem & Base Raft Details"
          description="Retaining walls withstand lateral earth pressure. The concrete structure consists of a base raft and a tapered vertical stem."
          revealMode="each-click"
          items={[
            { title: "Base Raft Footing", text: <span>Provides overturning resistance. Standard concrete base slab thickness is 400mm-600mm (<ClickHighlight variant="paint" at={1}>Base Raft</ClickHighlight>).</span> },
            { title: "Tapered Vertical Stem", text: <span>Wall stem thickens at the bottom to resist higher bending moment. Top width w₁ = 450mm, bottom width w₂ = 900mm (<ClickHighlight variant="paint" at={2}>Tapered Stem</ClickHighlight>).</span> },
            { title: "Trapezoidal Stem Formula", text: <span>Average stem width w_avg = (w₁ + w₂) / 2. Stem Volume = w_avg × Height × Length.</span> }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RetainingWallDrawing activeHighlight={getHighlight(currentClick)} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="info" title="Concrete Stem Volume Formula" className="py-2">
              <div className="bg-muted/40 p-2 rounded-xl border border-primary/20">
                <LatexFormula math="V = \frac{w_1 + w_2}{2} \times H \times L" block />
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

// Slide: Drainage & Backfill
export const SlideRetainingWallDrainage: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const getHighlight = (click: number): 'none' | 'base' | 'stem' | 'weepholes' | 'drainage' => {
    if (click === 1) return 'weepholes';
    if (click === 2) return 'drainage';
    return 'none';
  };

  return (
    <TwoColumnLayout
      title="2.4 Sub-surface Drainage & Backfill"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Pore Water Pressure Control"
          description="Accumulated water behind a retaining wall increases lateral forces. Drainage structures prevent hydro-static load build-up."
          revealMode="each-click"
          items={[
            { title: "PVC Weep Holes", text: <span>Horizontal pipe sleeves passing through the stem, typically 75mm PVC spaced at 1.5m intervals (<ClickHighlight variant="paint" at={1}>Weep Holes</ClickHighlight>).</span> },
            { title: "Gravel Filter Backing", text: <span>Granular wedge behind the stem. Allows water to drain freely to weep holes while retaining backfill soil (<ClickHighlight variant="paint" at={2}>Gravel Filter</ClickHighlight>).</span> },
            { title: "Filter Packing Estimation", text: <span>Usually estimated in cubic meters (m³). A triangular or rectangular wedge behind the vertical back wall.</span> }
          ]}
        />
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

// Slide: Retaining Wall Sandbox
export const SlideRetainingWallSandbox: React.FC = () => (
  <RetainingWallSandbox />
);
