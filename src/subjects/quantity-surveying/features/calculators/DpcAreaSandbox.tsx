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
import { calculateDpcArea } from '../../cores';

export const DpcAreaSandbox: React.FC = () => {
  const [dpcLength, setDpcLength] = useUrlSyncedState<number>('dpc_len_i', 12.00);
  const [dpcWidth, setDpcWidth] = useUrlSyncedState<number>('dpc_wid_i', 0.25);
  const [doorSillsCount, setDoorSillsCount] = useUrlSyncedState<number>('dpc_sills_i', 2);

  const { grossArea, deductionArea, netArea } = calculateDpcArea(dpcLength, dpcWidth, doorSillsCount, 1.00);

  return (
    <TwoColumnLayout
      title="3.1 DPC: Surface Area &amp; Omissions"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="DPC Take-off Rules">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      Damp-Proof Course (DPC) is measured strictly as a horizontal surface area (<LatexFormula math="L \times W" />) across the plinth transition level.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      <ClickHighlight at={1} variant="paint">The Sill Deduction Rule:</ClickHighlight> You must deduct DPC area across door openings, veranda openings, and thresholds where concrete columns clash.
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
          <InteractiveCard title="DPC Take-off Simulator">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Wall Length" min={8.00} max={20.00} step={0.50} value={dpcLength} onChange={setDpcLength} unit="m" />
              <ParameterSlider label="Wall Width" min={0.125} max={0.375} step={0.125} value={dpcWidth} onChange={setDpcWidth} unit="m" displayValue={`${(dpcWidth * 1000).toFixed(0)} mm`} />
              <ParameterSlider label="Door Openings (N)" min={0} max={4} step={1} value={doorSillsCount} onChange={setDoorSillsCount} unit="" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross DPC Area:</span>
                <span className="font-bold">{grossArea.toFixed(3)} m²</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Deductions ({doorSillsCount} Doors):</span>
                <span>- {deductionArea.toFixed(3)} m²</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between font-extrabold text-primary">
                <span>Net Billing Area:</span>
                <span>{netArea.toFixed(3)} m²</span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default DpcAreaSandbox;
