import React from 'react';
import FullWidthLayout from '@/shared/layouts/FullWidthLayout';
import CurvedLineChart from '../elements/bklit/line-chart';

export const SlideBklitChart: React.FC = () => {
  return (
    <FullWidthLayout title="Interactive Volumetric Casting Trend" bgVariant="default">
      <div className="flex justify-center items-center w-full p-4 md:p-6 border border-border/40 bg-card rounded-2xl overflow-hidden shadow-xs">
        <div className="w-full max-w-[700px] mx-auto">
          <CurvedLineChart showGrid={true} />
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default SlideBklitChart;
