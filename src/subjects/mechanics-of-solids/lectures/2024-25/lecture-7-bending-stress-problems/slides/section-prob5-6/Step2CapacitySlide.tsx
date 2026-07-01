import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { CoverPlateRetrofit } from './drawings/CoverPlateRetrofit';

export const Step2CapacitySlide: React.FC = () => {
  return (
    <FullWidthLayout title="Step 2: Capacity Evaluation & Sizing" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <CoverPlateRetrofit />
      </div>
    </FullWidthLayout>
  );
};

export default Step2CapacitySlide;
