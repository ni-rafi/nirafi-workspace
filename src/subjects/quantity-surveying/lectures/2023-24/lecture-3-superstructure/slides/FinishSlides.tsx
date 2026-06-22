import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  LatexFormula,
  ClickHighlight,
  SlideContent,
  SlideGrid,
  SlideBadge,
  ParameterSlider
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 14: 5.1 & 5.3 Plastering & Floor Area Fundamentals
export const Slide14: React.FC = () => {
  const [roomL, setRoomL] = useUrlSyncedState<number>('finish_room_l', 4.50);
  const [roomW, setRoomW] = useUrlSyncedState<number>('finish_room_w', 3.60);
  const [wallH, setWallH] = useUrlSyncedState<number>('finish_wall_h', 2.80);

  const floorArea = roomL * roomW;
  const wallArea = (2 * roomL + 2 * roomW) * wallH;

  return (
    <TwoColumnLayout
      title="5.1 &amp; 5.3 Plastering &amp; Floor Finishes"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Surface Area Take-Off Rules">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      Finishes are measured strictly in <strong>Surface Area (m² or sft)</strong>.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      For internal floor tiles and ceiling plaster, calculate using the room's inside <ClickHighlight at={1} variant="paint">Clear Span</ClickHighlight> dimensions (<LatexFormula math="L \times W" />).
                    </span>
                  ),
                  revealAt: 0,
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      For interior walls, calculate the total room perimeter and multiply by the <ClickHighlight at={2} variant="bold">Net Height</ClickHighlight> (floor finish to ceiling soffit).
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
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Finishing Area Modeler">
            <div className="grid grid-cols-3 gap-2.5 mb-2">
              <ParameterSlider label="Room Length" min={3.00} max={6.00} step={0.10} value={roomL} onChange={setRoomL} unit="m" />
              <ParameterSlider label="Room Width" min={2.70} max={5.40} step={0.10} value={roomW} onChange={setRoomW} unit="m" />
              <ParameterSlider label="Net Wall Height" min={2.60} max={3.30} step={0.10} value={wallH} onChange={setWallH} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor / Ceiling Area:</span>
                <span className="font-bold text-primary">{floorArea.toFixed(3)} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wall Plastering Area:</span>
                <span className="font-bold text-primary">{wallArea.toFixed(3)} m²</span>
              </div>
            </div>

            <div className="mt-1 p-2 bg-muted rounded border border-border/40 text-center font-mono text-[11px] leading-relaxed">
              <LatexFormula math="A_{floor} = L \times W" />
              <br className="mb-1" />
              <LatexFormula math="A_{walls} = (2L + 2W) \times H_{net}" />
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// Slide 15: 5.2 Engineering Thresholds: Plastering Voids
export const Slide15: React.FC = () => {
  return (
    <FullWidthLayout title="5.2 Engineering Thresholds: Plastering Voids" bgVariant="default">
      <SlideGrid cols={3}>
        <InteractiveCard title="Minor Openings (< 0.5 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="success" label="No Deduction" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Small ventilator holes, pipe sleeves, and minor exhaust gaps do not require deductions from the gross plastering area.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Ignore completely. No deductions are made, and no jambs are added.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Medium Voids (0.5 to 3.0 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="warning" label="Partial Deduction" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Typical for standard residential bedroom doors and windows. Deduct only one face of the wall.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Deduct one face only. Omit jambs/sills plastering calculations (mutually offsetting).
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Large Voids (> 3.0 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="error" label="Full Deduct + Additions" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              For large structural openings, shop fronts, verandas, or glazed facade walls.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Deduct both faces from wall plastering. Add internal jambs/soffits plastering surface.
            </div>
          </div>
        </InteractiveCard>
      </SlideGrid>
    </FullWidthLayout>
  );
};

// Slide 16: 5.4 Skirting: Linear Perimeter Tracking
export const Slide16: React.FC = () => {
  return (
    <TwoColumnLayout
      title="5.4 Skirting: Linear Perimeter Tracking"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Skirting Rules">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="📏">
                <span>
                  Skirting and Dado trim are measured as a <strong>Linear Length (m or ft)</strong> along the base perimeter of room walls.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="🚪">
                <span>
                  <strong>The Door Sill Rule:</strong> Skirting must be strictly omitted across all door frame openings, as the trim cannot run across a walkable sill path.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3 block text-center">
            Perimeter Skirting Track with Door Omissions
          </span>
          <div className="w-full aspect-[1.8/1] bg-background rounded-lg border border-border/20 p-2 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-full select-none overflow-visible">
              {/* Room perimeter lines (Inner walls) */}
              <rect x="20" y="20" width="260" height="110" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />

              {/* Skirting line (Blue highlighted offset track) */}
              {/* Left wall */}
              <line x1="25" y1="25" x2="25" y2="125" stroke="#3b82f6" strokeWidth="2" />
              {/* Top wall */}
              <line x1="25" y1="25" x2="275" y2="25" stroke="#3b82f6" strokeWidth="2" />
              {/* Right wall */}
              <line x1="275" y1="25" x2="275" y2="125" stroke="#3b82f6" strokeWidth="2" />
              
              {/* Bottom wall with door opening (split in 2) */}
              <line x1="25" y1="125" x2="110" y2="125" stroke="#3b82f6" strokeWidth="2" />
              <line x1="170" y1="125" x2="275" y2="125" stroke="#3b82f6" strokeWidth="2" />

              {/* Door Opening (dashed red) */}
              <line x1="110" y1="125" x2="170" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="142" textAnchor="middle" className="fill-destructive font-mono text-[8px] font-bold">Door Sill (OMIT)</text>
              <text x="65" y="117" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Skirting Track</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};
