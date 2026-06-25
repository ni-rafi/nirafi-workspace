import React, { useState } from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideList,
  LatexFormula,
  InteractiveCard
} from '@/features/presentation/components/elements';
import { GridMethodDrawing } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide: Grid Method Divider
// ============================================================================
export const GridMethodDividerSlide: React.FC = () => (
  <TopicDividerLayout
    topicNumber="05"
    title="Area Excavations (Spot Level/Grid Method)"
    description="Borrow Pits, Wide Foundations, Corner Spot Levels, and Averaging Formulas"
  />
);

// ============================================================================
// Slide: Area Excavations and Spot Levels
// ============================================================================
export const GridMethodSlide1: React.FC = () => {
  return (
    <TwoColumnLayout
      title="5.1 Area Excavations &amp; Spot Levels"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Beyond Linear Formations"
            description="While cross-sectional methods (Mid-Section, Trapezoidal, Prismoidal) are suitable for linear roadway strips, they cannot be used to estimate wide three-dimensional earthworks."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "Areal Excavations",
                text: "Applicable to large planar excavations such as massive borrow fields, wide interchanges, highway toll plazas, or flat foundation basements."
              },
              {
                title: "Spot Levels",
                text: "The reduced levels (RLs) of the existing ground surface are measured at grid nodes before excavation, and compared with target design levels."
              },
              {
                title: "Uniform Grid division",
                text: "The total plan layout is divided into a grid of squares or rectangles of a standard size (e.g. 5m × 5m or 10m × 10m)."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <GridMethodDrawing activeCell={null} className="flex-1" />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide: Grid Volume Mathematical Formula
// ============================================================================
export const GridMethodSlide2: React.FC = () => {
  return (
    <TwoColumnLayout
      title="5.2 Grid Cell Volume Calculation Formula"
      bgVariant="default"
      leftWidth="48%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Corner Depth Averaging"
            description="For any individual square or rectangular cell, the excavation volume is computed by multiplying the cell area by the average of its four corner depths."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "Corner Depths (d1, d2, d3, d4)",
                text: "Calculated at each of the 4 nodes as the difference between the Existing Ground Level (EGL) and target Formation Level (FL)."
              },
              {
                title: "Average Depth",
                text: "Takes the arithmetic mean of the four corners: d_mean = (d1 + d2 + d3 + d4) / 4."
              },
              {
                title: "Total Earthwork Volume",
                text: "The total volume across the entire site is the sum of all individual cell volumes."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-4">
          <InteractiveCard title="The Grid Averaging Model">
            <div className="bg-muted/40 p-4 rounded-xl border border-border/40 space-y-3 text-center">
              <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase block">Single Grid Cell Volume</span>
              <LatexFormula math="V = \text{Area} \times \frac{d_1 + d_2 + d_3 + d_4}{4}" block />
              <span className="text-[9px] text-muted-foreground block font-mono">Where Area = Length × Width of cell</span>
            </div>
            <div className="bg-muted/40 p-4 rounded-xl border border-border/40 space-y-3 text-center mt-3">
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block">Total Site Earthwork Volume</span>
              <LatexFormula math="V_{\text{total}} = \sum_{i=1}^{n} V_i" block />
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// ============================================================================
// Slide: Spot Levels & The Grid Method (Interactive Drawing)
// ============================================================================
export const GridMethodInteractiveSlide: React.FC = () => {
  const [activeCell, setActiveCell] = useState<number | null>(1);

  return (
    <TwoColumnLayout
      title="5.3 Spot Levels &amp; Grid Cell Modeling"
      bgVariant="default"
      leftWidth="48%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Interactive Grid Model"
            description="Select different cells in the grid to inspect how corner depths are combined to compute individual excavation volumes."
            revealMode="none"
            variant="plain"
            items={[
              {
                title: "Square Size",
                text: "The grid is laid out as 5m × 5m squares, yielding a cell area of 25.00 m²."
              },
              {
                title: "Depth Extraction",
                text: "Click on cell numbers in the drawing to load node depths and execute the formula."
              },
              {
                title: "Note on precision",
                text: "Keep intermediate average depths to 4 decimal places, and round final volumes to 3 decimal places."
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <GridMethodDrawing
            activeCell={activeCell}
            onCellClick={(id) => setActiveCell(id)}
            className="flex-1"
          />
        </div>
      }
    />
  );
};
