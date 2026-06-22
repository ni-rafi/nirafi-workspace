import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateConcreteVolumeInternal } from '../../cores/concrete';
import { UnitConverter } from '@/cores/shared/utils/unitConverter';
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

export const ConcreteVolumeCalculator: React.FC<CalculatorProps> = ({
  layout = 'vertical',
  inputMode = 'slider',
}) => {
  const [unitSystem, setUnitSystem] = useUrlSyncedState<'metric' | 'imperial'>('conVolSystem', 'metric');
  const [length, setLength] = useUrlSyncedState<number>('conVolLength', 10);
  const [width, setWidth] = useUrlSyncedState<number>('conVolWidth', 0.3);
  const [height, setHeight] = useUrlSyncedState<number>('conVolHeight', 0.4);
  const [wastage, setWastage] = useUrlSyncedState<number>('conVolWastage', 5);

  const isMetric = unitSystem === 'metric';
  const isCardMode = inputMode === 'card';
  const isBothMode = inputMode === 'both';
  const isSplit = layout === 'split' || layout === 'horizontal';

  // Perform core calculations strictly in SI base units (meters)
  const lengthM = isMetric ? length : UnitConverter.length.ftToM(length, 3);
  const widthM = isMetric ? width : UnitConverter.length.ftToM(width, 3);
  const heightM = isMetric ? height : UnitConverter.length.ftToM(height, 3);
  const wastageFactor = wastage / 100;

  // Calculate volume using the core logic
  const { volume: totalVolumeM3 } = calculateConcreteVolumeInternal(lengthM, widthM, heightM, wastageFactor);
  const wetVolumeM3 = UnitConverter.round(lengthM * widthM * heightM, 3);
  const wastageVolumeM3 = UnitConverter.round(totalVolumeM3 - wetVolumeM3, 3);

  // Format outputs based on selected unit system
  const displayWetVol = isMetric ? wetVolumeM3 : UnitConverter.volume.m3ToCft(wetVolumeM3, 3);
  const displayWastageVol = isMetric ? wastageVolumeM3 : UnitConverter.volume.m3ToCft(wastageVolumeM3, 3);
  const displayTotalVol = isMetric ? totalVolumeM3 : UnitConverter.volume.m3ToCft(totalVolumeM3, 3);

  const volumeUnit = isMetric ? 'm³' : 'cft';
  const dimensionUnit = isMetric ? 'm' : 'ft';

  // Presets and limits based on unit system
  const lengthMin = isMetric ? 1 : 3;
  const lengthMax = isMetric ? 50 : 160;
  const lengthStep = isMetric ? 0.5 : 1.5;

  const widthMin = isMetric ? 0.1 : 0.3;
  const widthMax = isMetric ? 2 : 6.5;
  const widthStep = isMetric ? 0.05 : 0.15;

  const heightMin = isMetric ? 0.1 : 0.3;
  const heightMax = isMetric ? 2 : 6.5;
  const heightStep = isMetric ? 0.05 : 0.15;

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSystem = e.target.value as 'metric' | 'imperial';
    setUnitSystem(nextSystem);
    // Convert values to avoid massive jumps
    if (nextSystem === 'imperial') {
      setLength(parseFloat(UnitConverter.length.mToFt(length).toFixed(1)));
      setWidth(parseFloat(UnitConverter.length.mToFt(width).toFixed(2)));
      setHeight(parseFloat(UnitConverter.length.mToFt(height).toFixed(2)));
    } else {
      setLength(parseFloat(UnitConverter.length.ftToM(length).toFixed(1)));
      setWidth(parseFloat(UnitConverter.length.ftToM(width).toFixed(2)));
      setHeight(parseFloat(UnitConverter.length.ftToM(height).toFixed(2)));
    }
  };

  const renderInputs = () => (
    <div className="flex flex-col gap-2 w-full">
      {/* Unit Selector */}
      <div className="flex items-center justify-between border-b pb-1.5 mb-0.5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unit System</span>
        <select
          value={unitSystem}
          onChange={handleSystemChange}
          className="text-xs font-bold bg-muted border border-border/60 rounded px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value="metric">Metric (meters / m³)</option>
          <option value="imperial">Imperial (feet / cft)</option>
        </select>
      </div>

      {isCardMode ? (
        <div className="grid grid-cols-2 gap-2">
          <ParameterInputCard
            label="Length"
            value={length}
            unit={dimensionUnit}
            onChange={setLength}
            min={0.1}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Width"
            value={width}
            unit={dimensionUnit}
            onChange={setWidth}
            min={0.05}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Height / Depth"
            value={height}
            unit={dimensionUnit}
            onChange={setHeight}
            min={0.05}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Wastage Allowance"
            value={wastage}
            unit="%"
            onChange={setWastage}
            min={0}
            max={100}
            variant="compact"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <ParameterSlider
            label="Length:"
            value={length}
            unit={dimensionUnit}
            min={lengthMin}
            max={lengthMax}
            step={lengthStep}
            onChange={setLength}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Width:"
            value={width}
            unit={dimensionUnit}
            min={widthMin}
            max={widthMax}
            step={widthStep}
            onChange={setWidth}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Height / Depth:"
            value={height}
            unit={dimensionUnit}
            min={heightMin}
            max={heightMax}
            step={heightStep}
            onChange={setHeight}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Wastage Allowance:"
            value={wastage}
            unit="%"
            min={0}
            max={20}
            step={1}
            onChange={setWastage}
            showInput={isBothMode}
          />
        </div>
      )}
    </div>
  );

  const renderOutputs = (wrapInCard = false) => {
    const outputsGrid = (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <CalculationOutput
          title="Design Wet Volume"
          value={displayWetVol}
          unit={volumeUnit}
          variant="compact"
          subtitle={`${length.toFixed(2)} × ${width.toFixed(2)} × ${height.toFixed(2)}`}
        />
        <CalculationOutput
          title="Wastage Volume"
          value={displayWastageVol}
          unit={volumeUnit}
          variant="compact"
          subtitle={`${wastage}% allowance`}
        />
        <CalculationOutput
          title="Total Ordered Volume"
          value={displayTotalVol}
          unit={volumeUnit}
          variant="compact"
          subtitle="Wet Vol + Wastage"
        />
      </div>
    );

    if (wrapInCard) {
      return (
        <InteractiveCard title="Computed Outputs" className="w-full">
          {outputsGrid}
        </InteractiveCard>
      );
    }
    return (
      <div className="border-t border-border/40 pt-4 mt-2">
        {outputsGrid}
      </div>
    );
  };

  if (isSplit) {
    return (
      <div className="flex flex-col md:flex-row gap-6 w-full items-start select-text">
        <div className="flex-1 w-full">
          <InteractiveCard title="Concrete Volume Parameters">
            {renderInputs()}
          </InteractiveCard>
        </div>
        <div className="flex-1 w-full">
          {renderOutputs(true)}
        </div>
      </div>
    );
  }

  return (
    <InteractiveCard title="Concrete Volume Calculator" className="w-full">
      <div className="flex flex-col gap-4 select-text">
        {renderInputs()}
        {renderOutputs(false)}
      </div>
    </InteractiveCard>
  );
};

export default ConcreteVolumeCalculator;
