import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  LatexFormula,
  ClickHighlight,
  ParameterSlider
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 5: 2.1 Superstructure Columns: Net Height
export const Slide5: React.FC = () => {
  const [colW, setColW] = useUrlSyncedState<number>('col_width_i', 0.30);
  const [colL, setColL] = useUrlSyncedState<number>('col_length_i', 0.30);
  const [floorH, setFloorH] = useUrlSyncedState<number>('floor_height_i', 3.00);
  const [beamD, setBeamD] = useUrlSyncedState<number>('beam_depth_i', 0.35);

  const netHeight = floorH - beamD;
  const colVol = colW * colL * netHeight;

  return (
    <TwoColumnLayout
      title="2.1 Superstructure Columns: Net Height"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Net Height Measurement Rules">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="📏">
                <span>
                  Measure column height strictly up to the <strong>beam soffit</strong> (bottom face of the beam) to prevent duplicate concrete volumes at floor junctions.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📉">
                <span>
                  <strong>Section Reductions:</strong> Manage cross-sectional changes (e.g., 12"×12" column on Ground Floor reducing to 10"×10" on First Floor).
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Column Volume Calculator">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Col Width (W)" min={0.25} max={0.60} step={0.05} value={colW} onChange={setColW} unit="m" />
              <ParameterSlider label="Col Length (L)" min={0.25} max={0.60} step={0.05} value={colL} onChange={setColL} unit="m" />
              <ParameterSlider label="Floor Height" min={2.70} max={3.60} step={0.10} value={floorH} onChange={setFloorH} unit="m" />
              <ParameterSlider label="Beam Depth" min={0.25} max={0.50} step={0.05} value={beamD} onChange={setBeamD} unit="m" />
            </div>
            
            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">Net Column Height (Hn):</span>
                <span className="font-bold text-foreground">{netHeight.toFixed(2)} m</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-primary">Volume Yield:</span>
                <span className="text-sm font-black text-primary font-mono">{colVol.toFixed(3)} m³</span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-muted rounded border border-border/40 flex justify-center">
              <div className="text-md font-bold text-foreground font-mono">
                <LatexFormula math="V_{col} = W \times L \times (H_{floor} - d_{beam})" />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// Slide 6: 2.2 Floor Beams: Extracting Clear Span
export const Slide6: React.FC = () => {
  const [cCenter, setCCenter] = useUrlSyncedState<number>('beam_cc_i', 4.50);
  const [colDim, setColDim] = useUrlSyncedState<number>('beam_col_dim', 0.30);

  const clearSpan = cCenter - colDim;

  return (
    <TwoColumnLayout
      title="2.2 Floor Beams: Extracting Clear Span"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Double Counting Prevention">
            <p className="text-xs text-muted-foreground leading-relaxed">
              To prevent double-counting concrete at the column intersection core, we must extract the <ClickHighlight at={1} variant="paint">Clear Span</ClickHighlight> rather than the Center-to-Center distance.
            </p>
            <div className="mt-3 p-3 bg-muted rounded border border-border/40 text-[11px] font-mono leading-relaxed">
              <strong>Beam Take-off length:</strong>
              <br />
              Length = Grid C/C Span - Width of column (or bearing width).
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Beam Clear Span Configurator">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Grid C/C Span" min={3.00} max={6.00} step={0.10} value={cCenter} onChange={setCCenter} unit="m" />
              <ParameterSlider label="Column Support Width" min={0.25} max={0.50} step={0.05} value={colDim} onChange={setColDim} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clear Span:</span>
                <span className="font-bold">{clearSpan.toFixed(3)} m</span>
              </div>
            </div>

            <div className="w-full aspect-[2/1] bg-background border border-border/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 280 140" className="w-full h-full select-none overflow-visible">
                {/* Columns */}
                <rect x="30" y="40" width="30" height="70" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                <rect x="220" y="40" width="30" height="70" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                
                {/* Beam */}
                <rect x="60" y="50" width="160" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />

                {/* Overlaps highlighted in red */}
                <rect x="45" y="50" width="15" height="20" className="fill-destructive/20 stroke-destructive/50" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="220" y="50" width="15" height="20" className="fill-destructive/20 stroke-destructive/50" strokeWidth="1" strokeDasharray="2 2" />

                {/* C/C line */}
                <line x1="45" y1="120" x2="235" y2="120" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="45" cy="120" r="2" fill="#f59e0b" />
                <circle cx="235" cy="120" r="2" fill="#f59e0b" />
                <text x="140" y="115" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">C/C Grid Span</text>

                {/* Clear span line */}
                <line x1="60" y1="85" x2="220" y2="85" stroke="#3b82f6" strokeWidth="1" />
                <polygon points="60,85 66,82 66,88" fill="#3b82f6" />
                <polygon points="220,85 214,82 214,88" fill="#3b82f6" />
                <text x="140" y="80" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Clear Span (Take-off L)</text>
              </svg>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

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
