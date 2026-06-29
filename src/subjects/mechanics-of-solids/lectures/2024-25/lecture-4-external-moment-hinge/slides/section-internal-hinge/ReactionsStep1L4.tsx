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

export const ReactionsStep1L4: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 2 : currentClick;

  return (
    <TwoRowLayout
      title="Support Reactions - Right Span Isolation"
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
            <HingeBeamDrawing mode="right-segment" activeStep={activeStep} />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          <div>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
              Step 1: Slice at Hinge
            </span>
            <h4 className="text-sm font-bold text-foreground">Isolating Right Sub-span (E-B)</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Cut at internal hinge E (<LatexFormula math="M_E = 0" />) to isolate segment E-B:
            </SlideParagraph>
            
            {(activeStep >= 1 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 p-3 bg-muted/20 border border-border/30 rounded-xl mt-2 space-y-1.5 text-[11px] leading-relaxed duration-300">
                <span className="font-semibold text-primary block">1. Moment Equilibrium about E (ΣME = 0):</span>
                <div className="font-mono font-bold text-foreground">
                  <LatexFormula math={"\\sum M_E = 0 \\implies P \\times 0.5 - B_y \\times 1.0 = 0"} />
                </div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math={"5 \\times 0.5 - B_y \\times 1.0 = 0 \\implies B_y = 2.50 \\text{ kN}"} />
                </div>
              </div>
            )}
          </div>

          <div className="md:border-l border-border/20 md:pl-6 flex flex-col justify-between">
            {(activeStep >= 2 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 p-3 bg-muted/20 border border-border/30 rounded-xl space-y-1.5 text-[11px] leading-relaxed duration-300">
                <span className="font-semibold text-primary block">2. Vertical Equilibrium (ΣFy = 0):</span>
                <div className="font-mono font-bold text-foreground">
                  <LatexFormula math={"V_E + B_y - P = 0"} />
                </div>
                <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  <LatexFormula math={"V_E + 2.50 - 5 = 0 \\implies V_E = 2.50 \\text{ kN}"} />
                </div>
              </div>
            )}

            {(activeStep >= 2 || isScrollOrBlog) && (
              <div className="mt-2 animate-in fade-in duration-300">
                <SlideBullet text="Shear force transfers as an equal and opposite downward load on left sub-span." />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ReactionsStep1L4;
