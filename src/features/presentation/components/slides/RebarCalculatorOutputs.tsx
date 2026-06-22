import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { CalculationOutput } from '@/features/presentation/components/elements';
import { calculateSteelWeightInternal } from '@/subjects/quantity-surveying/cores';

export const RebarCalculatorOutputs: React.FC = () => {
  const [diameter] = useUrlSyncedState<number>('diameter', 12);
  const [length] = useUrlSyncedState<number>('length', 100);

  const { weightKg } = calculateSteelWeightInternal(diameter, length);
  const unitWeight = (diameter * diameter) / 162;

  return (
    <CalculationOutput
      title="Rebar Weight Output"
      value={weightKg}
      unit="kg"
      subtitle={`Estimated Unit Weight: ${unitWeight.toFixed(3)} kg/m`}
    />
  );
};


export default RebarCalculatorOutputs;
