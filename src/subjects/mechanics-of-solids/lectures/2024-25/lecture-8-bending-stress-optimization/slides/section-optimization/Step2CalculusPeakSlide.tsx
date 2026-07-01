import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TaperedBeamOptimizer } from './drawings/TaperedBeamOptimizer';

export const Step2CalculusPeakSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Step 2: Calculus Sizing Optimization" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <TaperedBeamOptimizer />
      </div>
    </FullWidthLayout>
  );
};

export default Step2CalculusPeakSlide;
