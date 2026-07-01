import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LogCuttingOptimizer } from './drawings/LogCuttingOptimizer';

export const Step2CalculusSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Step 2: Calculus Sizing Optimization" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <LogCuttingOptimizer />
      </div>
    </FullWidthLayout>
  );
};

export default Step2CalculusSlide;
