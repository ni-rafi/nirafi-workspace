import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { 
  InteractiveCard, 
  ParameterSlider, 
  CalculationOutput 
} from '@/features/presentation/components/elements';
import { RetainingWallDrawing } from '../components/RetainingWallDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateRetainingWallVolume } from '../../cores/roadway';

export const RetainingWallSandbox: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('wall_len', 30);
  const [height, setHeight] = useUrlSyncedState<number>('wall_height', 3.0);
  const [topWidth, setTopWidth] = useUrlSyncedState<number>('wall_top_w', 0.45);
  const [bottomWidth, setBottomWidth] = useUrlSyncedState<number>('wall_bot_w', 0.90);
  const [baseWidth, setBaseWidth] = useUrlSyncedState<number>('wall_base_w', 2.4);
  const [baseThickness, setBaseThickness] = useUrlSyncedState<number>('wall_base_t', 0.45);

  // Concrete Volumes
  const volStem = calculateRetainingWallVolume(topWidth, bottomWidth, height, length);
  const volBase = Math.round(length * baseWidth * baseThickness * 1000) / 1000;
  const totalConcrete = Math.round((volStem + volBase) * 1000) / 1000;

  // Weep holes count approximation (spaced 1.5m center-to-center in staggered rows)
  const weepHolesCount = Math.max(1, Math.round(length / 1.5) * Math.max(1, Math.floor(height / 1.2)));

  return (
    <TwoColumnLayout
      title="Retaining Wall Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Wall Parameters">
          <div className="space-y-4 mb-4">
            <ParameterSlider
              label="Wall Length"
              min={10}
              max={100}
              step={5}
              value={length}
              onChange={setLength}
              unit=" m"
            />
            <ParameterSlider
              label="Stem Height (H)"
              min={1.5}
              max={6.0}
              step={0.25}
              value={height}
              onChange={setHeight}
              unit=" m"
            />
            <ParameterSlider
              label="Top Stem Width (w₁)"
              min={0.30}
              max={1.00}
              step={0.05}
              value={topWidth}
              onChange={setTopWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Bottom Stem Width (w₂)"
              min={0.60}
              max={2.00}
              step={0.05}
              value={bottomWidth}
              onChange={setBottomWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Base Raft Width"
              min={1.5}
              max={5.0}
              step={0.1}
              value={baseWidth}
              onChange={setBaseWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Base Raft Thickness"
              min={0.30}
              max={1.00}
              step={0.05}
              value={baseThickness}
              onChange={setBaseThickness}
              unit=" m"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3 font-mono">
            <CalculationOutput title="Stem RCC" value={volStem.toFixed(3)} unit="m³" variant="compact" />
            <CalculationOutput title="Base Raft RCC" value={volBase.toFixed(3)} unit="m³" variant="compact" />
            <CalculationOutput title="Total RCC" value={totalConcrete.toFixed(3)} unit="m³" variant="compact" />
            <CalculationOutput title="Weep Holes (Est.)" value={weepHolesCount.toString()} unit=" Nos" variant="compact" />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <RetainingWallDrawing />
      }
    />
  );
};

export default RetainingWallSandbox;
