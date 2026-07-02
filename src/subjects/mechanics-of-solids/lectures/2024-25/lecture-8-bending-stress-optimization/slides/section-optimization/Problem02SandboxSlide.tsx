import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AsymmetricMaterialLimitSolver } from './drawings/AsymmetricMaterialLimitSolver';

export const Problem02SandboxSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Problem 02: Asymmetric Material Limits Sandbox" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <AsymmetricMaterialLimitSolver />
      </div>
    </FullWidthLayout>
  );
};

export default Problem02SandboxSlide;
