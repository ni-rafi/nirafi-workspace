import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ClickReveal } from '@/features/presentation/components/elements';
import { ManualPlottingVisualizer } from './drawings/ManualPlottingVisualizer';
import { beamConfig } from './beamConfig';

export const ManualSFDPlotting: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Manual Plotting - Shear Force Diagram (SFD)</span>}
    >
      <div className="w-full h-full flex flex-col gap-2 p-2 px-3 text-left">
        {/* Implicit click registration */}
        <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
        <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
        <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>

        <ManualPlottingVisualizer mode="sfd" beam={beamConfig} />
      </div>
    </FullWidthLayout>
  );
};

export default ManualSFDPlotting;
