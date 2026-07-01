import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AsymmetricMaterialLimitSolver } from './drawings/AsymmetricMaterialLimitSolver';

export const Step2InertiaSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Step 2: Capacity Evaluation under Dual Limits" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <AsymmetricMaterialLimitSolver />
      </div>
    </FullWidthLayout>
  );
};

export default Step2InertiaSlide;
