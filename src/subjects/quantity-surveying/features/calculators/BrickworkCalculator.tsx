import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateBrickworkInternal } from '../../cores/brickwork';
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

export const BrickworkCalculator: React.FC<CalculatorProps> = ({
  layout = 'vertical',
  inputMode = 'slider',
}) => {
  const [unitSystem, setUnitSystem] = useUrlSyncedState<'metric' | 'imperial'>('brickSystem', 'imperial');
  const [wallArea, setWallArea] = useUrlSyncedState<number>('brickWallArea', 150);
  const [wallThickness, setWallThickness] = useUrlSyncedState<number>('brickWallThick', 0.24);
  const [mortarThickness, setMortarThickness] = useUrlSyncedState<number>('brickMortarThick', 0.01);

  const isMetric = unitSystem === 'metric';
  const isCardMode = inputMode === 'card';
  const isBothMode = inputMode === 'both';
  const isSplit = layout === 'split' || layout === 'horizontal';

  // Presets and dimensions based on standard conventions
  // Bangladesh standard brick without mortar: 9.5" x 4.5" x 2.75" -> in meters: 0.2413m x 0.1143m x 0.06985m
  const brickL = isMetric ? 0.24 : 9.5 * 0.0254;
  const brickW = isMetric ? 0.115 : 4.5 * 0.0254;
  const brickH = isMetric ? 0.07 : 2.75 * 0.0254;

  // Convert inputs to SI base units (meters)
  const areaM2 = isMetric ? wallArea : UnitConverter.area.sftToM2(wallArea, 3);
  const thickM = isMetric ? wallThickness : UnitConverter.length.inToM(wallThickness, 3);
  const mortarM = isMetric ? mortarThickness : UnitConverter.length.inToM(mortarThickness, 3);

  // Invoke core logic
  const { brickCount, mortarVolume } = calculateBrickworkInternal(
    areaM2,
    thickM,
    brickL,
    brickW,
    brickH,
    mortarM
  );

  // Output formatting
  const displayMortarVol = isMetric ? mortarVolume : UnitConverter.volume.m3ToCft(mortarVolume, 3);

  const areaUnit = isMetric ? 'm²' : 'sft';
  const thickUnit = isMetric ? 'm' : 'in';
  const volumeUnit = isMetric ? 'm³' : 'cft';

  // Slider bounds
  const areaMin = isMetric ? 1 : 10;
  const areaMax = isMetric ? 200 : 2000;
  const areaStep = isMetric ? 1 : 10;

  const thickMin = isMetric ? 0.115 : 5; // 5 inch or 10 inch wall typical in BGD
  const thickMax = isMetric ? 0.5 : 20;
  const thickStep = isMetric ? 0.005 : 5; // step by 5 inches (5, 10, 15, 20)

  const mortarMin = isMetric ? 0.005 : 0.2; // 0.2 in = 5mm, 0.4 in = 10mm
  const mortarMax = isMetric ? 0.025 : 1;
  const mortarStep = isMetric ? 0.001 : 0.05;

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSystem = e.target.value as 'metric' | 'imperial';
    setUnitSystem(nextSystem);
    if (nextSystem === 'imperial') {
      setWallArea(parseFloat(UnitConverter.area.m2ToSft(wallArea).toFixed(0)));
      setWallThickness(Math.round(UnitConverter.length.mToIn(wallThickness)));
      setMortarThickness(parseFloat(UnitConverter.length.mToIn(mortarThickness).toFixed(2)));
    } else {
      setWallArea(parseFloat(UnitConverter.area.sftToM2(wallArea).toFixed(1)));
      setWallThickness(parseFloat(UnitConverter.length.inToM(wallThickness).toFixed(3)));
      setMortarThickness(parseFloat(UnitConverter.length.inToM(mortarThickness).toFixed(3)));
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
          <option value="imperial">Imperial (sft / inches / Bangladesh Brick)</option>
          <option value="metric">Metric (m² / meters / Standard Brick)</option>
        </select>
      </div>

      {isCardMode ? (
        <div className="grid grid-cols-2 gap-2">
          <ParameterInputCard
            label="Wall Surface Area"
            value={wallArea}
            unit={areaUnit}
            onChange={setWallArea}
            min={0.1}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Wall Thickness"
            value={wallThickness}
            unit={thickUnit}
            onChange={setWallThickness}
            min={0.01}
            max={999999}
            variant="compact"
          />
          <ParameterInputCard
            label="Mortar Joint"
            value={mortarThickness}
            unit={isMetric ? 'm' : 'in'}
            onChange={setMortarThickness}
            min={0.001}
            max={999999}
            variant="compact"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <ParameterSlider
            label="Wall Surface Area:"
            value={wallArea}
            unit={areaUnit}
            min={areaMin}
            max={areaMax}
            step={areaStep}
            onChange={setWallArea}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Wall Thickness:"
            value={wallThickness}
            unit={thickUnit}
            min={thickMin}
            max={thickMax}
            step={thickStep}
            onChange={setWallThickness}
            showInput={isBothMode}
          />
          <ParameterSlider
            label="Mortar Joint Thickness:"
            value={mortarThickness}
            unit={isMetric ? 'm' : 'in'}
            min={mortarMin}
            max={mortarMax}
            step={mortarStep}
            onChange={setMortarThickness}
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
          title="Total Bricks Count"
          value={brickCount}
          unit="Nos"
          variant="compact"
          subtitle={`${isMetric ? '240×115×70' : '9.5"×4.5"×2.75"'} sizes`}
        />
        <CalculationOutput
          title="Mortar Wet Volume"
          value={displayMortarVol}
          unit={volumeUnit}
          variant="compact"
          subtitle="Sand-cement wet paste"
        />
        <CalculationOutput
          title="Total Wall Volume"
          value={isMetric ? UnitConverter.round(areaM2 * thickM, 3) : UnitConverter.volume.m3ToCft(areaM2 * thickM, 3)}
          unit={volumeUnit}
          variant="compact"
          subtitle="Bricks + Mortar"
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
          <InteractiveCard title="Brickwork Parameters">
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
    <InteractiveCard title="Brickwork &amp; Mortar Calculator" className="w-full">
      <div className="flex flex-col gap-4 select-text">
        {renderInputs()}
        {renderOutputs(false)}
      </div>
    </InteractiveCard>
  );
};

export default BrickworkCalculator;
