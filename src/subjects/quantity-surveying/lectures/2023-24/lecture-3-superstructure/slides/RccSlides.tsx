import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet
} from '@/features/presentation/components/elements';
import { ColumnVolumeSandbox, BeamClearSpanSandbox } from '@/subjects/quantity-surveying/features';

// Slide 5: 2.1 Superstructure Columns: Net Height
export const Slide5: React.FC = () => (
  <ColumnVolumeSandbox />
);

// Slide 6: 2.2 Floor Beams: Extracting Clear Span
export const Slide6: React.FC = () => (
  <BeamClearSpanSandbox />
);

// Slide 7: 2.3 Slab Projections & Cantilevers
export const Slide7: React.FC = () => {
  return (
    <FullWidthLayout title="2.3 Slab Projections & Cantilevers" bgVariant="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6">
          <InteractiveCard title="Volumetric Slabs Rules" className="h-full flex flex-col justify-between">
            <ul className="flex flex-col gap-4">
              <SlideBullet revealAt={0} icon="🟦">
                <span>
                  Slabs are estimated volumetrically by multiplying plan floor areas by design slab thickness.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📐">
                <span>
                  <strong>Cantilevers:</strong> Projecting balconies, verandas, and sunshades (chajjas) must be computed separately and added to the slab totals.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="🌧️">
                <span>
                  <strong>Weathering Copings:</strong> Keep running copings at roof level separated from standard slab concrete.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>

        <div className="lg:col-span-6">
          <InteractiveCard title="Slab-Cantilever Cross-Section" className="h-full flex flex-col justify-center">
            <div className="w-full aspect-[1.8/1] bg-background border border-border/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 320 180" className="w-full h-full select-none overflow-visible">
                {/* Main Slab */}
                <rect x="20" y="70" width="180" height="25" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                <text x="110" y="85" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px] font-bold">Main Floor Slab</text>

                {/* Cantilever/Balcony */}
                <polygon points="200,70 280,70 280,82 200,95" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
                <text x="240" y="64" textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">Cantilever Balcony</text>

                {/* Support Column */}
                <rect x="180" y="95" width="20" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />

                {/* Rebar lines representation */}
                <line x1="30" y1="74" x2="275" y2="74" stroke="red" strokeWidth="1" opacity="0.6" />
                <line x1="30" y1="91" x2="198" y2="91" stroke="red" strokeWidth="1" opacity="0.6" />
                {/* Main reinforcement hook */}
                <path d="M 275 74 L 277 78 L 272 81" fill="none" stroke="red" strokeWidth="1" opacity="0.6" />

                {/* Dimension markup */}
                <line x1="20" y1="150" x2="200" y2="150" stroke="currentColor" className="text-muted-foreground/30" strokeWidth="1" />
                <line x1="200" y1="150" x2="280" y2="150" stroke="red" strokeWidth="1" />
                <text x="110" y="144" textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">Room span</text>
                <text x="240" y="144" textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">Cantilever span</text>
              </svg>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </FullWidthLayout>
  );
};
