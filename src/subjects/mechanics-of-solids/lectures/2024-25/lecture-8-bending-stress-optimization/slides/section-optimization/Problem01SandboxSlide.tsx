import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LogCuttingOptimizer } from './drawings/LogCuttingOptimizer';

export const Problem01SandboxSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Problem 01: Timber Log Strength Optimization Sandbox" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <LogCuttingOptimizer />
      </div>
    </FullWidthLayout>
  );
};

export default Problem01SandboxSlide;
