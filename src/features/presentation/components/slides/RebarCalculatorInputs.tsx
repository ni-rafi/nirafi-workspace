import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { InteractiveCard, ParameterSlider } from '@/features/presentation/components/elements';

export const RebarCalculatorInputs: React.FC = () => {
  const [diameter, setDiameter] = useUrlSyncedState<number>('diameter', 12);
  const [length, setLength] = useUrlSyncedState<number>('length', 100);

  return (
    <InteractiveCard title="Parameters (SI Units)">
      <ParameterSlider
        label="Rebar Diameter:"
        value={diameter}
        unit="mm"
        min={6}
        max={32}
        step={1}
        onChange={setDiameter}
      />
      <ParameterSlider
        label="Total Length:"
        value={length}
        unit="m"
        min={10}
        max={1000}
        step={10}
        onChange={setLength}
      />
    </InteractiveCard>
  );
};

export default RebarCalculatorInputs;
