import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AsymmetricInversion } from './drawings/AsymmetricInversion';

export const Problem03InversionSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Problem 03: Section Inversion Optimization" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <AsymmetricInversion />
      </div>
    </FullWidthLayout>
  );
};

export default Problem03InversionSlide;
