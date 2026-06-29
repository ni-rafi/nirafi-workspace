import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';
import {
  SlideParagraph,
  ClickReveal,
  SlideBullet,
  LatexFormula,
} from '@/features/presentation/components/elements';
import { HingeBeamDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/HingeBeamDrawing';

export const ReactionsStep2L4: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 2 : currentClick;

  return (
    <TwoRowLayout
      title="Support Reactions - Left Span equilibrium"
      topHeight="40%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
            </>
          )}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <HingeBeamDrawing mode="left-segment" activeStep={activeStep} />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          <div>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
              Step 2: Fixed Support Reactions
            </span>
            <h4 className="text-sm font-bold text-foreground">Isolating Left Sub-span (A-E)</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Apply shear <LatexFormula math="V_E = 2.50\text{ kN}" /> downwards at hinge E. Solve reactions at fixed support A:
            </SlideParagraph>
            
            {(activeStep >= 1 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 p-3 bg-muted/20 border border-border/30 rounded-xl mt-2 space-y-1.5 text-[11px] leading-relaxed duration-300">
                <span className="font-semibold text-primary block">1. Vertical Reaction (ΣFy = 0):</span>
                <div className="font-mono font-bold text-foreground">
                  <LatexFormula math="A_y - w L_1 - V_E = 0" />
                </div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math="A_y - (2 \times 3.45) - 2.50 = 0 \implies A_y = 9.40\text{ kN}" />
                </div>
              </div>
            )}
          </div>

          <div className="md:border-l border-border/20 md:pl-6 flex flex-col justify-between">
            {(activeStep >= 2 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 p-3 bg-muted/20 border border-border/30 rounded-xl space-y-1.5 text-[11px] leading-relaxed duration-300">
                <span className="font-semibold text-primary block">2. Bending Moment Reaction (ΣMA = 0):</span>
                <div className="font-mono font-bold text-foreground">
                  <LatexFormula math="M_A - w L_1 \times \frac{L_1}{2} - V_E L_1 = 0" />
                </div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math="M_A - 6.90 \times 1.725 - 2.50 \times 3.45 = 0 \implies M_A = 20.53\text{ kNm}" />
                </div>
              </div>
            )}

            {(activeStep >= 2 || isScrollOrBlog) && (
              <div className="mt-2 animate-in fade-in duration-300">
                <SlideBullet text="Fixed boundary support resists both vertical shear force and bending moment." />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ReactionsStep2L4;
