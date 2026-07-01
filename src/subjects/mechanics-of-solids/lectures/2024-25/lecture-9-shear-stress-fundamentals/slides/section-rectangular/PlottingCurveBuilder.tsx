import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { RectangularShearPlotting } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/RectangularShearPlotting';

export const PlottingCurveBuilder: React.FC = () => {
  const [plotStep, setPlotStep] = useUrlSyncedState<number>('rectangular_plot_step', 2);

  const steps = [
    { id: 2, name: 'Boundary Dots (y = ±h/2)', desc: 'Shear stress drops to zero at the free top and bottom boundaries since Q = 0.' },
    { id: 3, name: 'Intermediate Fibers', desc: 'As we slice closer to the center, Q increases, leading to larger stress values.' },
    { id: 4, name: 'Parabolic Curve', desc: 'Connecting the points yields a smooth downward parabola, peaking at the Neutral Axis.' }
  ];

  return (
    <TwoColumnLayout
      title="Plotting the Stress Distribution"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Step-by-step curve building
            </span>
            <div className="flex gap-1.5 mb-3 bg-slate-900 p-1 rounded-lg border border-border/40">
              {steps.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setPlotStep(st.id)}
                  className={`flex-1 py-1.5 px-1 text-[10px] font-bold rounded transition-all cursor-pointer ${
                    plotStep === st.id
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-background hover:bg-muted text-muted-foreground'
                  }`}
                >
                  Step {st.id - 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-muted/10 p-3.5 rounded-xl border border-border/40 min-h-[100px] flex flex-col justify-center">
            <h4 className="text-xs font-bold text-foreground mb-1">
              {steps.find(s => s.id === plotStep)?.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {steps.find(s => s.id === plotStep)?.desc}
            </p>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Notice that the curve starts at 0 at the boundaries and grows non-linearly towards the center Neutral Axis.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[240px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Plotting stress distribution</span>
          <RectangularShearPlotting plotStep={plotStep} />
        </div>
      }
    />
  );
};

export default PlottingCurveBuilder;
