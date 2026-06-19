import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { CalculationOutput } from '@/features/presentation/components/elements';

export const RebarCalculatorOutputs: React.FC = () => {
  const [diameter] = useUrlSyncedState<number>('diameter', 12);
  const [length] = useUrlSyncedState<number>('length', 100);

  const unitWeight = (diameter * diameter) / 162;
  const weight = parseFloat((unitWeight * length).toFixed(3));

  return (
    <CalculationOutput
      title="Rebar Weight Output"
      value={weight}
      unit="kg"
      subtitle={`Estimated Unit Weight: ${unitWeight.toFixed(3)} kg/m`}
    />
  );
};

export default RebarCalculatorOutputs;
