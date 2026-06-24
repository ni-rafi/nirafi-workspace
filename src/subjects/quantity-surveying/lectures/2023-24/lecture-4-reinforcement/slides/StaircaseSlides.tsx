import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  SlideList,
  InteractiveCard,
  SlideGrid,
  SlideCallout
} from '@/features/presentation/components/elements';
import { StaircaseVolumeSandbox } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide 16F: RCC Staircase Estimation (Concrete Volume)
// ============================================================================
export const Slide16F: React.FC = () => (
  <TwoColumnLayout
    title="3.6 RCC Staircase Estimation: Concrete Volume"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Volumetric Breakdown">
          Staircases consist of structural components that must be calculated as separate geometric volumes.
        </SlideParagraph>

        <SlideList
          revealMode="each-click"
          items={[
            {
              title: "Waist Slab Volume",
              text: "The sloping concrete plate that acts as the primary support. Volume = Length (sloping) × Width × Slab Thickness."
            },
            {
              title: "Steps (Triangular)",
              text: "The individual steps sitting on top of the waist slab. Calculated as triangular prisms. Volume = Number of steps × Width × (½ × Tread × Riser)."
            },
            {
              title: "Landings & Support Beams",
              text: "Flat slabs and columns/beams supporting the stairs. Calculated standardly as Length × Width × Thickness/Depth."
            }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-between h-full">
        <InteractiveCard title="Standard Volumes (Sloping Math)" variant="default" className="flex-1">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Finding the sloping length of the waist slab is done using Pythagoras' Theorem based on total rise and run:
          </p>
          <div className="p-3 bg-muted/40 rounded-xl border border-border/40 font-mono text-center text-sm my-2 text-primary font-bold">
            Sloping Length = √ ( Rise² + Run² )
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Where <code>Rise</code> is the vertical height of the flight and <code>Run</code> is the total horizontal length of the steps.
          </p>
        </InteractiveCard>

        <SlideCallout variant="info" title="Why Separated?">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Separating steps and waist slab calculations avoids complex irregular polygon volume formulas, breaking the structure into standard rectangular and triangular shapes that are easy to double check.
          </p>
        </SlideCallout>
      </div>
    }
  />
);

// ============================================================================
// Slide 16G: Staircase Concrete Volume Sandbox
// ============================================================================
export const Slide16G: React.FC = () => (
  <StaircaseVolumeSandbox />
);

// ============================================================================
// Slide 16H: RCC Staircase Reinforcement Detailing
// ============================================================================
export const Slide16H: React.FC = () => (
  <FullWidthLayout title="3.7 RCC Staircase Reinforcement Detailing" bgVariant="default">
    <div className="flex flex-col gap-4 select-text">
      <SlideParagraph variant="plain" className="text-xs md:text-sm text-muted-foreground select-none">
        Staircases require careful rebar tracking due to support anchors and sloping layout spacing.
      </SlideParagraph>

      <SlideGrid cols={3} gap="md">
        <InteractiveCard title="Main Bars (Longitudinal)" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Placed along the slope to resist bending tension.
          </p>
          <div className="text-[10px] text-muted-foreground leading-normal font-mono border-t border-border/40 pt-1">
            • L = Clear Span + Hooks (+6") + support embedment offsets.
            <br />• No. = (Slab Width / Spacing) + 1.
          </div>
        </InteractiveCard>

        <InteractiveCard title="Binders (Transverse)" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Rest on top of main bars to hold them in position and distribute load.
          </p>
          <div className="text-[10px] text-muted-foreground leading-normal font-mono border-t border-border/40 pt-1">
            • L = Slab Width - 2 × Clear Cover.
            <br />• No. = (Running sloping length / Spacing) + 1.
          </div>
        </InteractiveCard>

        <InteractiveCard title="Tonnage Weight Conversion" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Convert totals from lengths to weight (BoQ standard).
          </p>
          <div className="text-[10px] text-muted-foreground leading-normal font-mono border-t border-border/40 pt-1">
            • Total Weight = L_total × Unit Weight (D²/162).
            <br />• 10mm rebar = 0.617 kg/m
            <br />• 12mm rebar = 0.889 kg/m
          </div>
        </InteractiveCard>
      </SlideGrid>

      <SlideCallout variant="warning" title="Embedment and Anchors" className="py-2">
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Staircase main steel must extend deeply into floor and landing beams (anchor embedment length) to transfer loads safely. Always look at sections for standard anchor lengths like <code>+12"</code> or <code>40db</code> embedment extensions.
        </p>
      </SlideCallout>
    </div>
  </FullWidthLayout>
);
