import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AsymmetricInversion } from './drawings/AsymmetricInversion';

export const Problem03SandboxSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Problem 03: Asymmetric Capacity & Inversion Sandbox" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <AsymmetricInversion />
      </div>
    </FullWidthLayout>
  );
};

export default Problem03SandboxSlide;
