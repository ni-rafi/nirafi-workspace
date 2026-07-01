import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { BeamStressSizer } from './drawings/BeamStressSizer';

export const Step3SizingSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Step 3: Sizing via Governing Boundary" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <BeamStressSizer />
      </div>
    </FullWidthLayout>
  );
};

export default Step3SizingSlide;
