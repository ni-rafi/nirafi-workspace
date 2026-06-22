import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateConcreteMixIngredients } from '../../cores/concrete';
import { UnitConverter } from '@/cores/shared/utils/unitConverter';
import { CONCRETE_SHRINKAGE_FACTOR } from '../../cores/constants';
import { ConcreteMixVolumeDrawing } from '../components/ConcreteMixVolumeDrawing';
import {
  InteractiveCard,
  ParameterSlider,
  ParameterInputCard,
  CalculationOutput
} from '@/features/presentation/components/elements';

export interface CalculatorProps {
  layout?: 'horizontal' | 'vertical' | 'split';
  inputMode?: 'slider' | 'card' | 'both';
}

export const ConcreteMixCalculator: React.FC<CalculatorProps> = ({
  layout = 'horizontal',
  inputMode = 'slider',
}) => {
  const [unitSystem, setUnitSystem] = useUrlSyncedState<'metric' | 'imperial'>('conMixSystem', 'imperial');
  const [wetVolume, setWetVolume] = useUrlSyncedState<number>('conMixWetVol', 100);
  const [sandPart, setSandPart] = useUrlSyncedState<number>('conMixSandPart', 2);
  const [stonePart, setStonePart] = useUrlSyncedState<number>('conMixStonePart', 4);
  const [cementPart, setCementPart] = useUrlSyncedState<number>('conMixCementPart', 1);
  const [shrinkage, setShrinkage] = useUrlSyncedState<number>('conMixShrinkage', CONCRETE_SHRINKAGE_FACTOR);

  const isMetric = unitSystem === 'metric';
  const isCardMode = inputMode === 'card';
  const isBothMode = inputMode === 'both';

  // Convert inputs to SI base units (cubic meters)
  const wetVolumeM3 = isMetric ? wetVolume : UnitConverter.volume.cftToM3(wetVolume, 3);

  // Invoke core calculations
  const mix = calculateConcreteMixIngredients(
    wetVolumeM3,
    sandPart,
    stonePart,
    cementPart,
    shrinkage
  );

  // Convert outputs back to display units
  const dryVolOut = isMetric ? mix.dryVolume : UnitConverter.volume.m3ToCft(mix.dryVolume, 3);
  const sandVolOut = isMetric ? mix.sandVolume : UnitConverter.volume.m3ToCft(mix.sandVolume, 3);
  const stoneVolOut = isMetric ? mix.stoneVolume : UnitConverter.volume.m3ToCft(mix.stoneVolume, 3);

  // Calculate cement bags consistently from cement CFT volume
  const cementVolCft = UnitConverter.volume.m3ToCft(mix.cementVolume, 3);
  const cementBags = UnitConverter.cement.cftToBags(cementVolCft, 3);

  const volumeUnit = isMetric ? 'm³' : 'cft';

  // Presets and limits based on unit system
  const wetVolMin = isMetric ? 1 : 10;
  const wetVolMax = isMetric ? 100 : 3000;
  const wetVolStep = isMetric ? 1 : 10;

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSystem = e.target.value as 'metric' | 'imperial';
    setUnitSystem(nextSystem);
    if (nextSystem === 'imperial') {
      setWetVolume(parseFloat(UnitConverter.volume.m3ToCft(wetVolume).toFixed(0)));
    } else {
      setWetVolume(parseFloat(UnitConverter.volume.cftToM3(wetVolume).toFixed(1)));
    }
  };

  const renderInputs = () => (
    <InteractiveCard title="Design Parameters">
      <div className="flex flex-col gap-2.5 select-text">
        {/* Unit Selector */}
        <div className="flex items-center justify-between border-b pb-1.5 mb-0.5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unit System</span>
          <select
            value={unitSystem}
            onChange={handleSystemChange}
            className="text-xs font-bold bg-muted border border-border/60 rounded px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="metric">Metric (m³)</option>
            <option value="imperial">Imperial (cft)</option>
          </select>
        </div>

        {/* Inputs */}
        {isCardMode ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <ParameterInputCard
              label="Wet Volume"
              value={wetVolume}
              unit={volumeUnit}
              onChange={setWetVolume}
              min={0.1}
              max={999999}
              variant="compact"
            />
            <ParameterInputCard
              label="Cement Part"
              value={cementPart}
              unit="part"
              onChange={setCementPart}
              min={0.1}
              max={999999}
              variant="compact"
            />
            <ParameterInputCard
              label="Sand Part"
              value={sandPart}
              unit="parts"
              onChange={setSandPart}
              min={0}
              max={999999}
              variant="compact"
            />
            <ParameterInputCard
              label="Stone Part"
              value={stonePart}
              unit="parts"
              onChange={setStonePart}
              min={0}
              max={999999}
              variant="compact"
            />
            <ParameterInputCard
              label="Shrinkage Factor"
              value={shrinkage}
              unit="x"
              onChange={setShrinkage}
              min={1.0}
              max={2.5}
              variant="compact"
              className="col-span-2 sm:col-span-1"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <ParameterSlider
              label="Design Wet Volume:"
              value={wetVolume}
              unit={volumeUnit}
              min={wetVolMin}
              max={wetVolMax}
              step={wetVolStep}
              onChange={setWetVolume}
              showInput={isBothMode}
            />
            <ParameterSlider
              label="Cement Proportion:"
              value={cementPart}
              unit="part"
              min={0.5}
              max={3}
              step={0.5}
              onChange={setCementPart}
              showInput={isBothMode}
            />
            <ParameterSlider
              label="Sand Proportion:"
              value={sandPart}
              unit="parts"
              min={0.5}
              max={5}
              step={0.5}
              onChange={setSandPart}
              showInput={isBothMode}
            />
            <ParameterSlider
              label="Coarse Agg. (Stone) Proportion:"
              value={stonePart}
              unit="parts"
              min={1}
              max={10}
              step={0.5}
              onChange={setStonePart}
              showInput={isBothMode}
            />
            <ParameterSlider
              label="Shrinkage Factor (Wet to Dry):"
              value={shrinkage}
              unit="x"
              min={1.1}
              max={1.8}
              step={0.01}
              onChange={setShrinkage}
              showInput={isBothMode}
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );

  const renderOutputs = () => (
    <InteractiveCard title="Computed Material Breakdown">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-text">
        <CalculationOutput
          title="Dry Vol (Expanded)"
          value={dryVolOut}
          unit={volumeUnit}
          variant="compact"
          subtitle={`Wet Vol × ${shrinkage.toFixed(2)}`}
        />
        <CalculationOutput
          title="Cement Required"
          value={cementBags}
          unit="bags"
          variant="compact"
          subtitle={`${cementPart} / ${(cementPart + sandPart + stonePart).toFixed(1)} share`}
        />
        <CalculationOutput
          title="Sand Required"
          value={sandVolOut}
          unit={volumeUnit}
          variant="compact"
          subtitle={`${sandPart} / ${(cementPart + sandPart + stonePart).toFixed(1)} share`}
        />
        <CalculationOutput
          title="Stone Required"
          value={stoneVolOut}
          unit={volumeUnit}
          variant="compact"
          subtitle={`${stonePart} / ${(cementPart + sandPart + stonePart).toFixed(1)} share`}
        />
      </div>
    </InteractiveCard>
  );

  const renderVisualizer = () => (
    <ConcreteMixVolumeDrawing
      dryVolume={dryVolOut}
      cementBags={cementBags}
      sandVol={sandVolOut}
      stoneVol={stoneVolOut}
      sandPart={sandPart}
      stonePart={stonePart}
      volumeUnit={volumeUnit}
    />
  );

  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-4 w-full select-text">
        {renderInputs()}
        {renderOutputs()}
        <div className="w-full max-w-[360px] mx-auto">
          {renderVisualizer()}
        </div>
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div className="flex flex-col md:flex-row gap-6 w-full items-start select-text">
        <div className="flex-1 w-full">
          {renderInputs()}
        </div>
        <div className="flex flex-col gap-4 flex-1 w-full">
          {renderOutputs()}
          <div className="w-full max-w-[360px]">
            {renderVisualizer()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full items-start select-text">
      {/* Parameter Cards Left */}
      <div className="flex flex-col gap-4 flex-1 w-full">
        {renderInputs()}
        {renderOutputs()}
      </div>

      {/* SVG drawing visualizer right */}
      <div className="w-full md:w-[360px] shrink-0">
        {renderVisualizer()}
      </div>
    </div>
  );
};

export default ConcreteMixCalculator;
