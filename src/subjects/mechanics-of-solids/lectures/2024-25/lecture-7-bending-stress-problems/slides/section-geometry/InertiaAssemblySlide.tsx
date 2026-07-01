import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SectionPropertyStepper } from './drawings/SectionPropertyStepper';

export const InertiaAssemblySlide: React.FC = () => {
  return (
    <FullWidthLayout title="Total Global Inertia Assembly (Ixx)" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <SectionPropertyStepper />
      </div>
    </FullWidthLayout>
  );
};

export default InertiaAssemblySlide;
