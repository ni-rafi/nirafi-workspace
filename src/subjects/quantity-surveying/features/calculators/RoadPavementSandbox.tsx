import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { 
  InteractiveCard, 
  ParameterSlider, 
  CalculationOutput 
} from '@/features/presentation/components/elements';
import { RoadPavementDrawing } from '../components/RoadPavementDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculatePavementLayerVolume, calculateBitumenWeight } from '../../cores/roadway';

export const RoadPavementSandbox: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('road_pav_len', 500);
  const [width, setWidth] = useUrlSyncedState<number>('road_pav_width', 5.5);
  const [tSubbase, setTSubbase] = useUrlSyncedState<number>('road_pav_t_subbase', 0.150);
  const [tBase, setTBase] = useUrlSyncedState<number>('road_pav_t_base', 0.150);
  const [tSurface, setTSurface] = useUrlSyncedState<number>('road_pav_t_surface', 0.040);

  // Constants
  const primeRate = 1.0; // 1 kg/m² tack/prime coat
  const area = length * width;

  // Volumes (Compaction factors: WBM subbase = 1.25, Stone base = 1.30)
  const volSubgrade = calculatePavementLayerVolume(length, width + 0.5, 0.300, 1.0); // wider subgrade
  const volSubbase = calculatePavementLayerVolume(length, width + 0.3, tSubbase, 1.25);
  const volBase = calculatePavementLayerVolume(length, width + 0.15, tBase, 1.30);
  const weightBitumen = calculateBitumenWeight(area, primeRate);

  return (
    <TwoColumnLayout
      title="Roadway Pavement Sandbox"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <InteractiveCard title="Pavement Parameters">
          <div className="grid grid-cols-2 gap-2">
            <ParameterSlider
              label="Road Length"
              min={100}
              max={1000}
              step={50}
              value={length}
              onChange={setLength}
              unit=" m"
              className="col-span-2"
            />
            <ParameterSlider
              label="Wearing Course Width"
              min={3.0}
              max={10.0}
              step={0.5}
              value={width}
              onChange={setWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Sub-base Thickness"
              min={0.100}
              max={0.300}
              step={0.025}
              value={tSubbase}
              onChange={setTSubbase}
              unit=" m"
            />
            <ParameterSlider
              label="Base Course Thickness"
              min={0.100}
              max={0.300}
              step={0.025}
              value={tBase}
              onChange={setTBase}
              unit=" m"
            />
            <ParameterSlider
              label="Surface Carpeting Thickness"
              min={0.020}
              max={0.080}
              step={0.010}
              value={tSurface}
              onChange={setTSurface}
              unit=" m"
            />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing className="flex-1" />
          <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-2 font-mono">
            <CalculationOutput title="Subgrade Bed" value={volSubgrade.toFixed(1)} unit="m³" variant="compact" />
            <CalculationOutput title="Sub-Base WBM" value={volSubbase.toFixed(1)} unit="m³" variant="compact" />
            <CalculationOutput title="Base Chips" value={volBase.toFixed(1)} unit="m³" variant="compact" />
            <CalculationOutput title="Bitumen Req." value={(weightBitumen / 1000).toFixed(2)} unit="Tons" variant="compact" />
          </div>
        </div>
      }
    />
  );
};

export default RoadPavementSandbox;
