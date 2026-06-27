import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ClickReveal } from '@/features/presentation/components/elements';
import { ManualPlottingVisualizer } from './drawings/ManualPlottingVisualizer';
import { beamConfig } from './beamConfig';

export const ManualBMDPlotting: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Manual Plotting - Bending Moment Diagram (BMD)</span>}
    >
      <div className="w-full h-full flex flex-col gap-2 p-2 px-3 text-left">
        {/* Implicit click registration */}
        <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
        <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>

        <ManualPlottingVisualizer mode="bmd" beam={beamConfig} />
      </div>
    </FullWidthLayout>
  );
};

export default ManualBMDPlotting;
