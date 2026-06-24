import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideBullet,
  ParameterSlider,
  LatexFormula
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateNetWallHeight } from '../../cores';

export const MasonryHeightSandbox: React.FC = () => {
  const [fHeight, setFHeight] = useUrlSyncedState<number>('mas_fheight_i', 3.00);
  const [bDepth, setBDepth] = useUrlSyncedState<number>('mas_bdepth_i', 0.35);

  const netWallHeight = calculateNetWallHeight(fHeight, bDepth);

  return (
    <TwoColumnLayout
      title="3.2 &amp; 3.3 Masonry: Net Height Correction"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Brick Masonry Guidelines">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="🧱">
                <span>
                  <strong>Wall Segregation:</strong> Separate thick structural main walls (e.g. 10" or 250mm) from thin internal partition layouts (e.g. 5" or 125mm) into different BoQ item lines.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📐">
                <span>
                  <strong>The Beam Clash:</strong> Masonry walls stop at the beam soffit. Never calculate brickwork all the way to the top of the floor slab.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Net Height Computation">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Floor Height" min={2.80} max={3.50} step={0.05} value={fHeight} onChange={setFHeight} unit="m" />
              <ParameterSlider label="Beam Depth" min={0.25} max={0.50} step={0.05} value={bDepth} onChange={setBDepth} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor to Floor height:</span>
                <span className="font-bold">{fHeight.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Isolate Beam Depth:</span>
                <span className="font-bold text-destructive">- {bDepth.toFixed(2)} m</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between font-extrabold text-primary">
                <span>Net Wall Height (Hn):</span>
                <span>{netWallHeight.toFixed(2)} m</span>
              </div>
            </div>

            <div className="mt-2 p-3 bg-muted rounded border border-border/40 text-center">
              <div className="text-md font-bold text-foreground font-mono">
                <LatexFormula math="H_{net} = H_{floor\_to\_floor} - d_{beam\_depth}" />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default MasonryHeightSandbox;
