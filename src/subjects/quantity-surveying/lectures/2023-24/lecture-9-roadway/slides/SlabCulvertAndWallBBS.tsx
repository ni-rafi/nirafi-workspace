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
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { RetainingWallBBSDrawing } from '@/subjects/quantity-surveying/features/components/RetainingWallBBSDrawing';
import { SlabCulvertAnatomyDrawing } from '@/subjects/quantity-surveying/features/components/SlabCulvertAnatomyDrawing';

// ============================================================================
// Slide 8: Retaining Wall Typology
// ============================================================================


// ============================================================================
// Slide 11: Retaining Wall Reinforcement & The Shear Key
// ============================================================================
export const Slide11: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const highlightMap: Record<number, 'none' | 'stem' | 'base' | 'key'> = {
    0: 'none',
    1: 'stem',
    2: 'base',
    3: 'key',
  };
  const activeHighlight = highlightMap[currentClick] || 'none';

  return (
    <TwoColumnLayout
      title="2.4 Retaining Wall BBS & The Shear Key"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-3 text-left select-text">
          <SlideParagraph title="Steel Detailing Constraints">
            Quantifying retaining wall reinforcement requires mapping separate stem, base, and shear key grids:
          </SlideParagraph>

          <SlideList
            revealMode="each-click"
            items={[
              {
                title: "Tapered Stem Steel (Pythagoras)",
                text: "The outside vertical bars are inclined. Length must be calculated using Pythagoras: L = sqrt(h² + b_slope²)."
              },
              {
                title: "Base Raft Grids",
                text: "Requires horizontal steel grids on both the top (tension) and bottom faces of the slab."
              },
              {
                title: "The Shear Key dowels",
                text: "A downward concrete block prevents wall sliding. Dowel reinforcing anchors it into the heel-stem junction."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RetainingWallBBSDrawing activeHighlight={activeHighlight} className="flex-1" />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide 14: Culvert Typologies & Engineering Limits
// ============================================================================
export const Slide14: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  return (
    <TwoColumnLayout
      title="3.1 Culvert Classifications & Limits"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Culvert Types & Limits"
          description="Culverts carry water through embankments. Standard culvert structures are bound by strict hydraulic and structural span restrictions."
          revealMode="each-click"
          items={[
            {
              title: "Structural Typologies",
              text: <span>Includes <ClickHighlight variant="paint" at={1}>Slab</ClickHighlight>, <ClickHighlight variant="paint" at={1}>Box</ClickHighlight>, <ClickHighlight variant="paint" at={1}>Pipe</ClickHighlight>, and <ClickHighlight variant="paint" at={1}>Arch</ClickHighlight> culverts depending on water flow discharge.</span>
            },
            {
              title: "Maximum Span Limit",
              text: <span>Standard culvert span is restricted to a maximum of <ClickHighlight variant="paint" at={2}>5 to 6 meters</ClickHighlight>. Higher spans require full bridge designs.</span>
            },
            {
              title: "Maximum Spans Count",
              text: <span>Multi-span culverts are restricted to a maximum of <ClickHighlight variant="paint" at={3}>3 spans</ClickHighlight> to prevent river siltation and choking.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-4">
          <ClickReveal at={1} preset="fade-in">
            {currentClick === 1 && (
              <InteractiveCard title="Standard Typology Summary" variant="default">
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5">
                  <li><strong>Slab Culvert:</strong> Flat RCC deck over masonry abutments.</li>
                  <li><strong>Box Culvert:</strong> Monolithic concrete rectangular frame.</li>
                  <li><strong>Pipe Culvert:</strong> Hume precast pipes on concrete cradles.</li>
                  <li><strong>Arch Culvert:</strong> Masonry/RCC curved span over waterways.</li>
                </ul>
              </InteractiveCard>
            )}
          </ClickReveal>
          <ClickReveal at={2} preset="fade-in">
            {currentClick === 2 && (
              <InteractiveCard title="Span Limit Constraints" variant="default">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For spans &gt; 6.0m, high flexural stress in the deck slab requires deep beams or girder ribs. Standard practice dictates transitioning to full T-beam or steel bridges.
                </p>
              </InteractiveCard>
            )}
          </ClickReveal>
          <ClickReveal at={3} preset="fade-in">
            {currentClick === 3 && (
              <InteractiveCard title="Hydraulic Limits" variant="default">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Adding too many intermediate support piers inside a culvert narrows the channel and slows down flow. This triggers heavy siltation and potential flooding.
                </p>
              </InteractiveCard>
            )}
          </ClickReveal>
        </div>
      }
    />
  );
};

// ============================================================================
// Slide 15: Anatomy of an RCC Slab Culvert
// ============================================================================
export const Slide15: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const highlightMap: Record<number, 'none' | 'abutment' | 'wingwall' | 'deck'> = {
    0: 'none',
    1: 'abutment',
    2: 'wingwall',
    3: 'deck',
  };
  const activeHighlight = highlightMap[currentClick] || 'none';

  return (
    <TwoColumnLayout
      title="3.2 Anatomy of an RCC Slab Culvert"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="space-y-3 text-left select-text">
          <SlideParagraph title="Geometric Take-Off Zones">
            A slab culvert divides concrete estimates into three distinct anatomical components:
          </SlideParagraph>

          <SlideList
            revealMode="each-click"
            items={[
              {
                title: "Abutments",
                text: "The main parallel vertical support walls taking deck loads and retaining the roadway approach ramp."
              },
              {
                title: "Wing Walls",
                text: "Flared, angled walls preventing earth spill into the stream and streamlining flow."
              },
              {
                title: "Deck Slab",
                text: "The horizontal RCC plate spanning across the abutments to carry traffic wheel loads."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <SlabCulvertAnatomyDrawing activeHighlight={activeHighlight} className="flex-1" />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide 16: The Slab Bearing Deduction Rule
// ============================================================================
export const Slide16: React.FC = () => {
  return (
    <TwoColumnLayout
      title="3.3 The Slab Bearing Deduction Rule"
      bgVariant="default"
      leftWidth="48%"
      leftContent={
        <div className="space-y-3 text-left select-text">
          <SlideParagraph title="The Overlap Joint Problem">
            Where the horizontal deck slab sits on top of the vertical abutment walls, their physical volumes overlap.
          </SlideParagraph>

          <SlideList
            items={[
              {
                title: "Superstructure concrete",
                text: "First calculate gross vertical abutment wall concrete."
              },
              {
                title: "Bearing Deduction",
                text: "Log a negative deduction row: bearing width × slab thickness × length."
              },
              {
                title: "Avoid Double-Billing",
                text: "Without this deduction, you charge the client twice for the same physical concrete zone."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <SlabCulvertAnatomyDrawing activeHighlight="bearing" className="flex-1" />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide 17: Slab Culvert Reinforcement & Wing Wall BBS Nuances
// ============================================================================
export const Slide17: React.FC = () => {
  return (
    <TwoColumnLayout
      title="3.4 Slab Culvert BBS Spacing Nuances"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="space-y-4 text-left select-text">
          <SlideParagraph title="Double Counting Corner Steel">
            Standard spacing math adds a starter bar: N = (Span / Spacing) + 1. However, continuous structural boundaries require an exception:
          </SlideParagraph>

          <SlideList
            items={[
              {
                title: "Wing Wall corner Intersection",
                text: "Wing walls attach directly to abutment corners. The shared joint already contains the abutment's terminal bar."
              },
              {
                title: "No (+1) spacing rule",
                text: "When calculating the wing wall run, use N = (Length / Spacing). Adding the (+1) double-counts the corner bar."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <InteractiveCard title="Wing Wall BBS worked Example" variant="default" className="p-1 px-3">
            <span className="font-bold text-xs text-primary block mb-1 font-sans">For 5.0m Wing Wall at 200mm c/c spacing:</span>
            <div className="bg-muted/40 p-2.5 rounded-lg border border-border/40 space-y-2 font-mono text-xs">
              <div>
                <span className="text-[9px] text-muted-foreground uppercase block font-bold">Standard Formula (Incorrect):</span>
                <span className="font-bold text-foreground">N = (5.0m / 0.2m) + 1 = 26 bars</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-600 uppercase block font-bold">Continuous Joint Formula (Correct):</span>
                <span className="font-bold text-emerald-600">N = 5.0m / 0.2m = 25 bars</span>
              </div>
            </div>
            <SlideCallout variant="warning" title="Surveyor Recall" className="py-1 px-2.5 mt-2">
              <p className="text-[9px] leading-normal text-muted-foreground">
                No (+1) is added since the corner joint bar is already counted in the abutment wall.
              </p>
            </SlideCallout>
          </InteractiveCard>
        </div>
      }
    />
  );
};
