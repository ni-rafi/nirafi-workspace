import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  LatexFormula,
  SlideGrid,
  SlideBadge
} from '@/features/presentation/components/elements';
import { DeductionSandbox } from '@/subjects/quantity-surveying/features';

// Slide 11: 4.1 & 4.2 The Deduction (Ddt) Protocol
export const Slide11: React.FC = () => (
  <DeductionSandbox />
);

// Slide 12: 4.3 Lintel Bearings & Embedment
export const Slide12: React.FC = () => {
  return (
    <TwoColumnLayout
      title="4.3 Lintel Bearings &amp; Embedment"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Lintel Measurement Logic">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="↔️">
                <span>
                  <strong>The Bearing Offset:</strong> Lintels must extend past the clear opening into the masonry support on both sides (typically 150mm or 6").
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="➕">
                <span>
                  <strong>Concrete Addition:</strong> Calculate and add the RCC volume of the full lintel length (<LatexFormula math="L_{clear} + 2 \times 0.15m" />).
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="➖">
                <span>
                  <strong>Masonry Deduction:</strong> Deduct the lintel's embedded volume from the gross brickwork ledger.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3 block text-center">
            Lintel Bearing &amp; Clear Span Anatomy
          </span>
          <div className="w-full aspect-[1.8/1] bg-background rounded-lg border border-border/20 p-2 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-full select-none overflow-visible">
              {/* Lintel */}
              <rect x="30" y="50" width="240" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
              <text x="150" y="63" textAnchor="middle" className="fill-primary font-mono text-[9px] font-bold">RCC Lintel Band</text>

              {/* Masonry support blocks */}
              <rect x="10" y="70" width="50" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />
              <rect x="240" y="70" width="50" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />
              
              {/* Voids / opening */}
              <rect x="60" y="70" width="180" height="60" className="fill-transparent stroke-dashed stroke-border/30" strokeWidth="1" />
              <text x="150" y="105" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px]">Clear Window Opening</text>

              {/* Bearing annotations */}
              {/* Left Bearing */}
              <line x1="30" y1="40" x2="60" y2="40" stroke="#f59e0b" strokeWidth="1" />
              <text x="45" y="34" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">150mm</text>

              {/* Clear span */}
              <line x1="60" y1="40" x2="240" y2="40" stroke="#3b82f6" strokeWidth="1" />
              <text x="150" y="34" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Clear Span</text>

              {/* Right Bearing */}
              <line x1="240" y1="40" x2="270" y2="40" stroke="#f59e0b" strokeWidth="1" />
              <text x="255" y="34" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">150mm</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};

// Slide 13: 4.4 Woodwork & Joinery Segregation
export const Slide13: React.FC = () => {
  return (
    <FullWidthLayout title="4.4 Woodwork &amp; Joinery Segregation" bgVariant="default">
      <SlideGrid cols={2}>
        <InteractiveCard title="Chowkhats (Frames)" className="h-full">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="info" label="Volumetric Take-off (m³ or cft)" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Measured by tracking the total running length of the timber or metal frame, multiplied by its specific cross-sectional profile (e.g. 3" × 4" or 75mm × 100mm).
            </p>
            <div className="mt-3 p-3 bg-muted rounded border border-border/40 text-[11px] font-mono leading-normal">
              <strong>Calculation:</strong>
              <br />
              Vol = Total Frame Length × Section Area. Remember to account for horn embeddings into masonry.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Shutters (Panels)" className="h-full">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="success" label="Surface Area Take-off (m² or sft)" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Measured as a flat surface area based on the clear inner dimensions of the door/window frame openings.
            </p>
            <div className="mt-3 p-3 bg-muted rounded border border-border/40 text-[11px] font-mono leading-normal">
              <strong>Calculation:</strong>
              <br />
              Area = Height × Width of the panels. Thickness is absorbed into the item description.
            </div>
          </div>
        </InteractiveCard>
      </SlideGrid>
    </FullWidthLayout>
  );
};
