import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { ClickReveal } from '@/features/presentation/components/elements';
import { ElasticCurveSegmentedDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/ElasticCurveSegmentedDrawing';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';

export const ElasticCurveSegmentedExplanation: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 6 : currentClick;

  const stepsList = [
    { step: 0, label: '1. Beam & Loads', color: 'text-blue-500 border-blue-500/30' },
    { step: 1, label: '2. Real BMD Plot', color: 'text-indigo-500 border-indigo-500/30' },
    { step: 2, label: '3. Signs (+/-)', color: 'text-violet-500 border-violet-500/30' },
    { step: 3, label: '4. Sagging Segments', color: 'text-amber-500 border-amber-500/30' },
    { step: 4, label: '5. Hogging Segments', color: 'text-rose-500 border-rose-500/30' },
    { step: 5, label: '6. Smooth Connection', color: 'text-emerald-500 border-emerald-500/30' },
    { step: 6, label: '7. Inflection Point', color: 'text-teal-500 border-teal-500/30' },
  ];

  return (
    <TwoRowLayout
      title="Segment-by-Segment Elastic Deflection Construction"
      topHeight="78%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={4} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={5} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={6} className="hidden">{' '}</ClickReveal>
            </>
          )}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <ElasticCurveSegmentedDrawing activeStep={activeStep} />
          </div>
        </div>
      }
      bottomContent={
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-4 py-2 border border-border/40 bg-muted/5 rounded-xl select-none">
          {stepsList.map((item) => {
            const isActive = activeStep === item.step;
            const isPassed = activeStep > item.step;
            return (
              <div
                key={item.step}
                className={`flex flex-col items-center px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? `bg-muted/10 font-bold scale-105 ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`
                    : isPassed
                    ? 'opacity-65 text-muted-foreground border-transparent'
                    : 'opacity-30 text-muted-foreground/60 border-transparent'
                }`}
              >
                <span className="text-[10px] tracking-wide uppercase font-semibold">{item.label}</span>
              </div>
            );
          })}
        </div>
      }
    />
  );
};

export default ElasticCurveSegmentedExplanation;
