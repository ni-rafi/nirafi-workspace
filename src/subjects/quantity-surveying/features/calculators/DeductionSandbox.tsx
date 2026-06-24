import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideContent,
  ClickHighlight,
  ParameterSlider,
  LatexFormula
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateNetWallVolume } from '../../cores';

export const DeductionSandbox: React.FC = () => {
  const [grossVol, setGrossVol] = useUrlSyncedState<number>('deduct_gross_vol', 15.60);
  const [opWidth, setOpWidth] = useUrlSyncedState<number>('deduct_op_wid', 1.00);
  const [opHeight, setOpHeight] = useUrlSyncedState<number>('deduct_op_hei', 2.10);
  const [wallThick, setWallThick] = useUrlSyncedState<number>('deduct_wall_t', 0.25);

  const { voidVolume, netVolume } = calculateNetWallVolume(grossVol, opWidth, opHeight, wallThick);

  return (
    <TwoColumnLayout
      title="4.2 The Deduction (Ddt) Protocol"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Mathematical Tolerances">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      In professional take-off, we calculate the <strong>Gross Wall Volume</strong> first as if the wall is solid.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      Then, we utilize a strict <ClickHighlight at={1} variant="paint">Deduct (Ddt) ledger entry</ClickHighlight> to mathematically subtract the scheduled opening frames.
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
          <InteractiveCard title="Void Deduction Modeler">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Gross Masonry Vol" min={10.0} max={25.0} step={0.5} value={grossVol} onChange={setGrossVol} unit="m³" />
              <ParameterSlider label="Opening Width" min={0.90} max={1.80} step={0.10} value={opWidth} onChange={setOpWidth} unit="m" />
              <ParameterSlider label="Opening Height" min={1.20} max={2.20} step={0.10} value={opHeight} onChange={setOpHeight} unit="m" />
              <ParameterSlider label="Wall Thickness" min={0.125} max={0.375} step={0.125} value={wallThick} onChange={setWallThick} unit="m" displayValue={`${(wallThick * 1000).toFixed(0)} mm`} />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Masonry Vol:</span>
                <span className="font-bold">{grossVol.toFixed(3)} m³</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Ddt Opening Void:</span>
                <span>- {voidVolume.toFixed(3)} m³</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between font-extrabold text-primary">
                <span>Net Billing Volume:</span>
                <span>{netVolume.toFixed(3)} m³</span>
              </div>
            </div>

            <div className="mt-2 p-3 bg-muted rounded border border-border/40 text-center">
              <div className="text-md font-bold text-foreground font-mono">
                <LatexFormula math="V_{ddt} = L_{opening} \times W_{wall} \times H_{opening}" />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default DeductionSandbox;
