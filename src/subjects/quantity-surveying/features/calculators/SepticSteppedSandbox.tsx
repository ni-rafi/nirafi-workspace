import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput
} from '@/features/presentation/components/elements';
import { SepticSteppedDrawing } from '../components/SepticSteppedDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateSteppedSepticTankMasonry, calculateSepticPlasterAreas } from '../../cores/reservoir';

export const SepticSteppedSandbox: React.FC = () => {
  const [L_in, setLIn] = useUrlSyncedState<number>('septic_L_in', 3.0);
  const [B_in, setBIn] = useUrlSyncedState<number>('septic_B_in', 1.5);
  const [partitionCount, setPartitionCount] = useUrlSyncedState<number>('septic_partition', 1);

  const [step1WallThick, setStep1WallThick] = useUrlSyncedState<number>('septic_s1_thick', 0.375);
  const [step1Height, setStep1Height] = useUrlSyncedState<number>('septic_s1_height', 1.0);

  const [step2WallThick, setStep2WallThick] = useUrlSyncedState<number>('septic_s2_thick', 0.25);
  const [step2Height, setStep2Height] = useUrlSyncedState<number>('septic_s2_height', 1.5);

  const [activeStepIndex, setActiveStepIndex] = useUrlSyncedState<number>('septic_active_step', 0);

  const steps = [
    { tWall: step1WallThick, height: step1Height },
    { tWall: step2WallThick, height: step2Height },
  ];

  const { stepVolumes, totalVolume: totalMasonry } = calculateSteppedSepticTankMasonry(L_in, B_in, partitionCount, steps);
  const totalDepth = step1Height + step2Height;
  const { wallPlasterAreaM2, floorPlasterAreaM2 } = calculateSepticPlasterAreas(L_in, B_in, totalDepth, partitionCount);

  // Constants for plaster pricing estimation
  const wallRate = 250;
  const floorRate = 350;
  const totalPlasterCost = Math.round((wallPlasterAreaM2 * wallRate + floorPlasterAreaM2 * floorRate) * 100) / 100;

  return (
    <TwoColumnLayout
      title="Septic Tank Stepped Walls Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Septic Parameters">
          <div className="space-y-3 mb-3 max-h-[360px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2">
              <ParameterSlider label="Inner Length (L)" min={1.5} max={8.0} step={0.1} value={L_in} onChange={setLIn} unit=" m" />
              <ParameterSlider label="Inner Width (B)" min={0.8} max={4.0} step={0.1} value={B_in} onChange={setBIn} unit=" m" />
            </div>
            <ParameterSlider label="Partition Walls (N)" min={0} max={3} step={1} value={partitionCount} onChange={setPartitionCount} unit="" />
            
            <div className="border-t border-border/30 pt-2">
              <span className="text-xs font-bold text-primary block mb-2">Step 1 (Base Layer)</span>
              <div className="grid grid-cols-2 gap-2">
                <ParameterSlider label="Thickness" min={0.25} max={0.50} step={0.005} value={step1WallThick} onChange={setStep1WallThick} unit=" m" displayValue={`${(step1WallThick * 1000).toFixed(0)} mm`} />
                <ParameterSlider label="Height" min={0.5} max={2.0} step={0.1} value={step1Height} onChange={setStep1Height} unit=" m" />
              </div>
            </div>

            <div className="border-t border-border/30 pt-2">
              <span className="text-xs font-bold text-primary block mb-2">Step 2 (Upper Layer)</span>
              <div className="grid grid-cols-2 gap-2">
                <ParameterSlider label="Thickness" min={0.125} max={0.375} step={0.005} value={step2WallThick} onChange={setStep2WallThick} unit=" m" displayValue={`${(step2WallThick * 1000).toFixed(0)} mm`} />
                <ParameterSlider label="Height" min={0.5} max={3.0} step={0.1} value={step2Height} onChange={setStep2Height} unit=" m" />
              </div>
            </div>

            <div className="border-t border-border/30 pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">Highlight Element:</span>
              <select
                value={activeStepIndex}
                onChange={(e) => setActiveStepIndex(parseInt(e.target.value))}
                className="text-xs font-bold bg-muted border border-border/60 rounded px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value={0}>Show All Components</option>
                <option value={1}>1st Step Wall (Masonry)</option>
                <option value={2}>2nd Step Wall (Masonry)</option>
                <option value={3}>Floor Plaster (20mm)</option>
                <option value={4}>Wall Plaster (12mm)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3 font-mono">
            <CalculationOutput title="Step 1 Masonry" value={stepVolumes[0]?.toFixed(3) || '0.000'} unit=" m³" variant="compact" />
            <CalculationOutput title="Step 2 Masonry" value={stepVolumes[1]?.toFixed(3) || '0.000'} unit=" m³" variant="compact" />
            <CalculationOutput title="Total Masonry" value={totalMasonry.toFixed(3)} unit=" m³" variant="compact" />
            <CalculationOutput title="Wall Plaster (12mm)" value={wallPlasterAreaM2.toFixed(2)} unit=" m²" variant="compact" />
            <CalculationOutput title="Floor Plaster (20mm)" value={floorPlasterAreaM2.toFixed(2)} unit=" m²" variant="compact" />
            <CalculationOutput title="Plaster Cost (Est.)" value={`৳${totalPlasterCost.toLocaleString()}`} unit="" variant="compact" />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <SepticSteppedDrawing activeStepIndex={activeStepIndex} className="flex-1" />
      }
    />
  );
};

export default SepticSteppedSandbox;
