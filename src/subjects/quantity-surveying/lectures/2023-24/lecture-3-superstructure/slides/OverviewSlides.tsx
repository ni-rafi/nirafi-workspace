import React from 'react';
import { LectureCover } from '@/shared/layouts/LectureCover';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  SlideContent,
  SlideBullet,
  InteractiveCard,
  SlideGrid,
  ClickHighlight,
  SlideBadge
} from '@/features/presentation/components/elements';
import { SuperstructureBoundaryDrawing } from '@/subjects/quantity-surveying/features';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 1: Cover Slide
export const Slide1: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

// Slide 2: 1.1 Defining the Superstructure Boundary
export const Slide2: React.FC = () => {
  const [activeTab, setActiveTab] = useUrlSyncedState<'superstructure' | 'substructure' | 'all'>('sub_boundary_tab', 'superstructure');

  return (
    <TwoColumnLayout
      title="1.1 Defining the Superstructure Boundary"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Boundary Classifications">
            <div className="flex gap-2 mb-2">
              {(['superstructure', 'substructure', 'all'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-all ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="🏗️">
                <span>
                  The <strong>Superstructure</strong> encompasses all architectural and structural elements constructed strictly above the <strong>Plinth Level</strong>.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="🏠">
                <span>
                  <strong>Target Profile:</strong> A two-storied residential frame structure with load-bearing RCC elements.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="📋">
                <span>
                  <strong>Core Elements:</strong> Column members, floor beams, multi-panel slabs, partition masonry, and finishes.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full">
          <SuperstructureBoundaryDrawing activeSection={activeTab} />
        </div>
      }
    />
  );
};

// Slide 3: 1.2 Grids & Load Paths
export const Slide3: React.FC = () => {
  return (
    <TwoColumnLayout
      title="1.2 Grid Layouts & Critical Distances"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Grid Navigation Rules">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      We must navigate structural grids (e.g., A-1, B-2) to prevent overlapping take-off quantities.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      <ClickHighlight at={1} variant="paint">Center-to-Center (C/C) distance</ClickHighlight>: Tracks continuous wall baselines and grid centerlines.
                    </span>
                  ),
                  revealAt: 0,
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      <ClickHighlight at={2} variant="paint">Clear Span distance</ClickHighlight>: The face-to-face opening length. Essential for net beam lengths, interior plaster, and floor finishes.
                    </span>
                  ),
                  revealAt: 0,
                },
              ]}
            />
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3 block text-center">
            Beam Clear Span vs. Grid Centerline
          </span>
          <div className="w-full aspect-[4/3] bg-background rounded-lg border border-border/20 p-2 flex items-center justify-center">
            <svg viewBox="0 0 320 240" className="w-full h-full select-none overflow-visible">
              {/* Columns */}
              <rect x="40" y="80" width="40" height="40" className="fill-muted stroke-border/60" strokeWidth="1.5" />
              <rect x="240" y="80" width="40" height="40" className="fill-muted stroke-border/60" strokeWidth="1.5" />
              <text x="60" y="105" textAnchor="middle" className="fill-foreground font-mono text-[9px]">Col A</text>
              <text x="260" y="105" textAnchor="middle" className="fill-foreground font-mono text-[9px]">Col B</text>

              {/* Beam */}
              <rect x="80" y="90" width="160" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1" />
              <text x="160" y="103" textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">RCC Beam (Main Span)</text>

              {/* Centerline */}
              <line x1="60" y1="50" x2="60" y2="170" stroke="currentColor" className="text-muted-foreground/40" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="260" y1="50" x2="260" y2="170" stroke="currentColor" className="text-muted-foreground/40" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Dimensions */}
              {/* Center-to-Center */}
              <line x1="60" y1="160" x2="260" y2="160" stroke="#f59e0b" strokeWidth="1" />
              <polygon points="60,160 66,157 66,163" fill="#f59e0b" />
              <polygon points="260,160 254,157 254,163" fill="#f59e0b" />
              <text x="160" y="154" textAnchor="middle" className="fill-amber-500 font-mono text-[9px] font-bold">Center-to-Center = 4.00m</text>

              {/* Clear Span */}
              <line x1="80" y1="130" x2="240" y2="130" stroke="#3b82f6" strokeWidth="1" />
              <polygon points="80,130 86,127 86,133" fill="#3b82f6" />
              <polygon points="240,130 234,127 234,133" fill="#3b82f6" />
              <text x="160" y="124" textAnchor="middle" className="fill-blue-500 font-mono text-[9px] font-bold">Clear Span = 3.60m</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};

// Slide 4: 1.3 Units of Measurement
export const Slide4: React.FC = () => {
  return (
    <FullWidthLayout title="1.3 Standard Units of Measurement Rules" bgVariant="default">
      <SlideGrid cols={3}>
        <InteractiveCard title="Volumetric (m³ or cft)" className="h-full">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="info" label="3D Mass Multiplier" />
            <span className="text-[10px] font-mono text-muted-foreground">Formula: L × W × H</span>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Applied to structural elements with substantial physical depth and mass bounds.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Examples:</strong> RCC Columns, Floor Beams, Slabs, and thick 10" structural brickwork walls.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Surface Area (m² or sft)" className="h-full">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="success" label="Planar 2D Surface" />
            <span className="text-[10px] font-mono text-muted-foreground">Formula: Length × Width</span>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Used when thickness is a standardized constant parameter in the project specs.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Examples:</strong> Damp-Proof Course (DPC), Plastering, Pointing, Flooring finishes.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Linear Length (m or ft)" className="h-full">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="warning" label="1D Running Length" />
            <span className="text-[10px] font-mono text-muted-foreground">Formula: Running length only</span>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Used for uniform items where cross-sectional area is absorbed in description code.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Examples:</strong> Skirting, Dado borders, Cornices, and weathering concrete coping edge runs.
            </div>
          </div>
        </InteractiveCard>
      </SlideGrid>
    </FullWidthLayout>
  );
};
