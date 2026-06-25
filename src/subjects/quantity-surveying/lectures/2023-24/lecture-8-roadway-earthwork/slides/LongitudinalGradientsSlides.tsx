import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideList,
  ClickHighlight,
  LatexFormula
} from '@/features/presentation/components/elements';
import { RoadwayGradientDrawing } from '@/subjects/quantity-surveying/features';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

// ============================================================================
// Slide: Gradients Divider
// ============================================================================
export const GradientsDividerSlide: React.FC = () => (
  <TopicDividerLayout
    topicNumber="02"
    title="Formation Levels &amp; Longitudinal Gradients"
    description="Designed Grade Lines, Elevation Gradients, and Chainage Calculations"
  />
);

// ============================================================================
// Slide: Longitudinal Slopes and Gradients
// ============================================================================
export const LongitudinalGradientsSlide1: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="2.1 Roadway Longitudinal Slopes &amp; Gradients"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Controlling Road Elevations"
            description="Unlike natural terrain which fluctuates dynamically, a finished roadway must follow a smooth, controlled design grade to ensure vehicle safety and proper drainage."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "Longitudinal Gradient",
                text: <span>The rate of rise or fall along the length of the highway profile, expressed as a ratio (e.g. 1 in 1000) or percentage.</span>,
                revealAt: 1
              },
              {
                title: "Existing Ground Level (EGL)",
                text: <span>The natural raw elevation of the site at a specific station before construction begins, determined by field survey.</span>,
                revealAt: 2
              },
              {
                title: "Formation Level (FL)",
                text: <span>The target design level of the finished road bed (subgrade) to which earth is cut or filled.</span>,
                revealAt: 3
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <RoadwayGradientDrawing currentClick={Math.min(1, currentClick)} className="flex-1" />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide: Calculating FL at Chainage Stations
// ============================================================================
export const LongitudinalGradientsSlide2: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="2.2 Calculating FL at Chainage Stations"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="space-y-3 select-text">
          <SlideList
            title="Mathematical Gradient Derivation"
            description="In practice, surveyors are only given the starting Formation Level (FL) and design slope. They must calculate subsequent values."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "Station Drop/Rise",
                text: <span>For a gradient of 1 in G, the elevation change per station of interval L is calculated using the grade ratio.</span>,
                revealAt: 1
              },
              {
                title: "Calculating Next FL",
                text: <span>Multiply station distance by gradient, then subtract (for downward slope) or add (for upward slope).</span>,
                revealAt: 2
              }
            ]}
          />
          <div className="bg-muted/40 p-2.5 rounded-xl border border-border/40 space-y-1 animate-fadeIn">
            <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase block">The FL Increment Formula</span>
            <LatexFormula math="FL_n = FL_{n-1} \pm \left( \text{Interval} \times \text{Gradient} \right)" block />
          </div>
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadwayGradientDrawing currentClick={2} className="flex-1" />
          {currentClick >= 2 && (
            <div className="bg-muted/40 p-2.5 rounded-xl border border-border/40 text-[10px] leading-relaxed text-muted-foreground animate-fadeIn font-mono">
              <span className="font-bold text-primary block uppercase text-[9px] mb-1">Worked Example (1 in 1000 Downward)</span>
              • Start FL (0+00) = 55.000m<br />
              • FL at 1+00 = 55.000 - (100m × 1/1000) = <ClickHighlight at={2} variant="bold" className="text-amber-500">54.900m</ClickHighlight><br />
              • FL at 2+00 = 54.900 - (100m × 1/1000) = <ClickHighlight at={2} variant="bold" className="text-amber-500">54.800m</ClickHighlight>
            </div>
          )}
        </div>
      }
    />
  );
};
