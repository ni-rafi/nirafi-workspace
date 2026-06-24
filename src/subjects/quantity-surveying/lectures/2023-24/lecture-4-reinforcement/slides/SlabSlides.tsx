import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  SlideGrid,
  SlideCallout
} from '@/features/presentation/components/elements';
import { SlabBarCountingSandbox } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide 16B: Slab Reinforcement Types & Distribution Rules
// ============================================================================
export const Slide16B: React.FC = () => (
  <FullWidthLayout title="3.3 Slab Reinforcement: Layout & Distribution" bgVariant="default">
    <div className="flex flex-col gap-4 select-text">
      <SlideParagraph variant="plain" className="text-xs md:text-sm text-muted-foreground select-none">
        Floor slabs employ specific rebar types arranged in a structured sequence to handle tensile stresses.
      </SlideParagraph>

      <SlideGrid cols={3} gap="md">
        <InteractiveCard title="1. Straight Bars" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Placed at the very bottom of the grid. They carry direct bottom tension in the mid-span of the slab.
          </p>
        </InteractiveCard>
        <InteractiveCard title="2. Cranked Bars" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bent at 45° near support zones to transition from bottom reinforcement to top reinforcement, counteracting negative support bending moments.
          </p>
        </InteractiveCard>
        <InteractiveCard title="3. Extra Top Bars" variant="default">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Short straight rebars added exclusively at support locations to strengthen the top grid zone against peak hogging tension.
          </p>
        </InteractiveCard>
      </SlideGrid>

      <SlideCallout variant="warning" title="Strict Placement Distribution Rules" className="py-2">
        <div className="text-[11px] leading-relaxed space-y-1 select-text">
          <p>
            1. <strong>Start &amp; End Constraint</strong>: Always start and end the layout width with a <strong>Straight bar</strong>.
          </p>
          <p>
            2. <strong>Alternating Layout</strong>: Cranked bars must be placed alternating directly in between the straight bars.
          </p>
          <p>
            3. <strong>Extra Top Distribution</strong>: Extra top bars are placed exclusively in between the cranked bars at the top of the slab.
          </p>
        </div>
      </SlideCallout>
    </div>
  </FullWidthLayout>
);

// ============================================================================
// Slide 16C: Slab Bar Counting Mechanics
// ============================================================================
export const Slide16C: React.FC = () => (
  <TwoColumnLayout
    title="3.4 Slab Bar Counting Mechanics"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Counting Layout across Slab Spans">
          Calculating the counts of slab bars requires applying the alternating rules mathematically.
        </SlideParagraph>

        <InteractiveCard title="Straight Bars Formula" variant="default">
          <div className="p-2 bg-muted/40 rounded-lg border border-border/40 font-mono text-center text-sm mb-2 text-primary font-bold">
            No. = ⌈ (Total Length - 2 × cc) / Spacing ⌉ + 1
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Where <strong>cc</strong> is the clear concrete cover, and spacing is center-to-center. <strong>Always round up (ceil)</strong> to the next whole number.
          </p>
        </InteractiveCard>

        <InteractiveCard title="Cranked &amp; Extra Top Counts" variant="default">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
            <div className="bg-muted/40 p-2 rounded-lg border border-border/40">
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Cranked Bars</span>
              <span className="text-amber-500 font-extrabold text-xs block mt-1">Straight Bars - 1</span>
            </div>
            <div className="bg-muted/40 p-2 rounded-lg border border-border/40">
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Extra Top (1 side)</span>
              <span className="text-red-500 font-extrabold text-xs block mt-1">(Cranked - 1) × 2</span>
            </div>
          </div>
        </InteractiveCard>
      </div>
    }
    rightContent={
      <div className="space-y-4">
        <InteractiveCard title="Worked Example (AUST Manual)" variant="plain" className="bg-muted/30 border border-border/50">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground">
            Calculate rebar count for a 5" thick slab with a span width of 4.5m, spacing of 150mm (0.15m), and 20mm cover.
          </SlideParagraph>
          <div className="text-[11px] leading-relaxed text-muted-foreground space-y-2 mt-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded text-[9px]">STEP 1</span>
              <span>Net Span = 4.5 - 2×(0.02) = 4.46 m</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded text-[9px]">STEP 2</span>
              <span>Straight = ⌈4.46 / 0.15⌉ + 1 = ⌈29.73⌉ + 1 = 31 Nos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded text-[9px]">STEP 3</span>
              <span>Cranked = 31 - 1 = 30 Nos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded text-[9px]">STEP 4</span>
              <span>Extra Top = (30 - 1) × 2 = 58 Nos</span>
            </div>
          </div>
        </InteractiveCard>

        <SlideCallout variant="info" title="Why Cranked = Straight - 1?">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Since we begin and end the layout with a straight bar, the alternating sequence yields exactly one less cranked bar. The extra top bars are placed exclusively between cranked bars, creating <code>(Cranked - 1)</code> spaces, with 2 bars per space (one on each end).
          </p>
        </SlideCallout>
      </div>
    }
  />
);

// ============================================================================
// Slide 16D: Interactive Slab Bar Counting Sandbox
// ============================================================================
export const Slide16D: React.FC = () => (
  <SlabBarCountingSandbox />
);

// ============================================================================
// Slide 16E: Advanced BBS Geometry: Hooks & Cranks
// ============================================================================
export const Slide16E: React.FC = () => (
  <FullWidthLayout title="3.5 Advanced BBS Geometry: Hooks &amp; Cranks" bgVariant="default">
    <div className="flex flex-col gap-3 select-text">
      <SlideParagraph variant="plain" className="text-xs md:text-sm text-muted-foreground select-none">
        Precise cut length estimation requires accounting for hook anchorages and crank bend geometries.
      </SlideParagraph>

      <SlideGrid cols={3} gap="md">
        <InteractiveCard title="Standard Tension Hooks" variant="default">
          <div className="mb-2 text-center text-primary font-bold font-mono text-sm">
            Hook Addition = 9db to 12db
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Standard anchor hooks (typically 180° or 90° bends) require adding 9 to 12 times the bar diameter (db) per hook to the cut length to establish bond strength.
          </p>
        </InteractiveCard>

        <InteractiveCard title="Cranked Bar Addition" variant="default">
          <div className="mb-2 text-center text-primary font-bold font-mono text-xs">
            L_cut = L_straight + n × (0.42d)
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed font-sans">
            For 45° bends, the diagonal path adds length. We add <strong>0.42d</strong> per crank, where <strong>d</strong> is the effective vertical depth of the crank (Slab thickness minus top/bottom cover and bar diameter).
          </p>
        </InteractiveCard>

        <InteractiveCard title="Code Minimum Covers" variant="default">
          <div className="mb-2 text-center text-amber-500 font-bold font-mono text-[11px] uppercase tracking-wider">
            ACI Cover Standards
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Clear concrete cover prevents rebar corrosion. According to the ACI code:
            <br />• <strong>Slabs &amp; Walls</strong>: 0.75 inches (~20mm)
            <br />• <strong>Beams &amp; Columns</strong>: 1.5 inches (~40mm)
          </p>
        </InteractiveCard>
      </SlideGrid>

      <div className="mt-2 bg-muted/40 p-3 rounded-xl border border-border/40 select-text">
        <span className="font-bold text-xs text-primary block mb-1">Mathematical Depth Definition:</span>
        <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
          Effective crank depth (d) = Slab Thickness - 2 × Clear Cover - db.
          <br />For a 5" (127mm) slab with #3 bars (db = 9.5mm) and 0.75" (19mm) cover:
          <br />d = 127 - 2×19 - 9.5 = 79.5 mm = 0.0795 m. Crank addition per bend = 0.42 × 0.0795m = 0.0334 m.
        </p>
      </div>
    </div>
  </FullWidthLayout>
);
