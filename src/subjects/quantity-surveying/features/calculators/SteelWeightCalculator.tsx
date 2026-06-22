import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateSteelWeightInternal } from '../../cores/steel';
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

export const SteelWeightCalculator: React.FC<CalculatorProps> = ({
  layout = 'vertical',
  inputMode = 'slider',
}) => {
  const [unitSystem, setUnitSystem] = useUrlSyncedState<'metric' | 'imperial'>('steelSystem', 'metric');
  const [diameter, setDiameter] = useUrlSyncedState<number>('steelDiameter', 12);
  const [length, setLength] = useUrlSyncedState<number>('steelLength', 100);

  const isMetric = unitSystem === 'metric';
  const isCardMode = inputMode === 'card';
  const isBothMode = inputMode === 'both';
  const isSplit = layout === 'split' || layout === 'horizontal';

  // Core calculations strictly in SI base units (meters, mm)
  // diameter is always mm in cores
  const diameterMm = diameter;
  const lengthM = isMetric ? length : UnitConverter.length.ftToM(length, 3);

  // Invoke core logic
  const { weightKg } = calculateSteelWeightInternal(diameterMm, lengthM);

  // Convert output
  const displayWeight = isMetric ? weightKg : UnitConverter.mass.kgToLb(weightKg, 3);
  const displayUnit = isMetric ? 'kg' : 'lbs';
  const lengthUnit = isMetric ? 'm' : 'ft';

  // Calculate unit weight
  const unitWeightKgM = UnitConverter.round((diameterMm * diameterMm) / 162, 3);
  const rawUnitWeight = isMetric ? unitWeightKgM : UnitConverter.mass.kgToLb(unitWeightKgM, 3) / UnitConverter.length.mToFt(1, 3);
  const displayUnitWeight = UnitConverter.round(rawUnitWeight, 3);

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSystem = e.target.value as 'metric' | 'imperial';
    setUnitSystem(nextSystem);
    if (nextSystem === 'imperial') {
      setLength(parseFloat(UnitConverter.length.mToFt(length).toFixed(0)));
    } else {
      setLength(parseFloat(UnitConverter.length.ftToM(length).toFixed(0)));
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
          <option value="metric">Metric (mm / meters / kg)</option>
          <option value="imperial">Imperial (mm / feet / lbs)</option>
        </select>
      </div>

      {isCardMode ? (
        <div className="grid grid-cols-2 gap-2">
          <ParameterInputCard
            label="Rebar Diameter"
            value={diameter}
            unit="mm"
            onChange={setDiameter}
            min={1}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Total Length"
            value={length}
            unit={lengthUnit}
            onChange={setLength}
            min={0.1}
            max={999999}
            variant="compact"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <ParameterSlider
            label="Rebar Diameter:"
            value={diameter}
            unit="mm"
            min={6}
            max={40}
            step={1}
            onChange={setDiameter}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Total Rebar Length:"
            value={length}
            unit={lengthUnit}
            min={isMetric ? 10 : 30}
            max={isMetric ? 1000 : 3000}
            step={isMetric ? 10 : 30}
            onChange={setLength}
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
          title="Total Steel Weight"
          value={displayWeight}
          unit={displayUnit}
          variant="compact"
          subtitle={`Weight = (D² / 162) × L`}
        />
        <CalculationOutput
          title="Unit Weight"
          value={displayUnitWeight}
          unit={`${displayUnit}/${lengthUnit}`}
          variant="compact"
          subtitle="Mass per unit length"
        />
        <CalculationOutput
          title="Rebar Diameter Specification"
          value={diameter}
          unit="Ø"
          variant="compact"
          subtitle={`Standard ${diameter}mm bar`}
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
          <InteractiveCard title="Steel Weight Parameters">
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
    <InteractiveCard title="Steel Reinforcement weight Calculator" className="w-full">
      <div className="flex flex-col gap-4 select-text">
        {renderInputs()}
        {renderOutputs(false)}
      </div>
    </InteractiveCard>
  );
};

export default SteelWeightCalculator;
