import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TaperedBeamOptimizer } from './drawings/TaperedBeamOptimizer';

export const Problem03SandboxSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Problem 03: Tapered Cantilever Optimization Sandbox" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-1">
        <TaperedBeamOptimizer />
      </div>
    </FullWidthLayout>
  );
};

export default Problem03SandboxSlide;
