import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SectionPropertyStepper } from './drawings/SectionPropertyStepper';

export const CentroidAnimationSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Component Centroidal Mapping & Global Centroid" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <SectionPropertyStepper />
      </div>
    </FullWidthLayout>
  );
};

export default CentroidAnimationSlide;
