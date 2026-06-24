import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideBullet,
  ParameterSlider,
  LatexFormula
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateColumnVolume } from '../../cores';

export const ColumnVolumeSandbox: React.FC = () => {
  const [colW, setColW] = useUrlSyncedState<number>('col_width_i', 0.30);
  const [colL, setColL] = useUrlSyncedState<number>('col_length_i', 0.30);
  const [floorH, setFloorH] = useUrlSyncedState<number>('floor_height_i', 3.00);
  const [beamD, setBeamD] = useUrlSyncedState<number>('beam_depth_i', 0.35);

  const { netHeight, volume: colVol } = calculateColumnVolume(colW, colL, floorH, beamD);

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

export default ColumnVolumeSandbox;
