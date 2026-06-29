import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import {
  SlideParagraph,
  ClickReveal,
  LatexFormula,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { BracketLoadingDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/BracketLoadingDrawing';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';

export const VerticalBracketEquivalence: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 1 : currentClick;

  const getDrawingMode = (): 'equiv-dimmed' | 'equiv-deflected' => {
    switch (activeStep) {
      case 0:
        return 'equiv-dimmed';
      case 1:
      default:
        return 'equiv-deflected';
    }
  };

  return (
    <TwoRowLayout
      title="Equivalent Loading & Equivalence Proof"
      topHeight="50%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && <ClickReveal at={1} className="hidden">{' '}</ClickReveal>}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <BracketLoadingDrawing
              loadVal={1.2}
              bracketLen={2.0}
              mode={getDrawingMode()}
            />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Move Force & Moment */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
                Step 3: Idealized System
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Dim the bracket arm, move force <LatexFormula math="P = 1.2\text{ kN}" /> directly to the joint C, and replace the arm leverage with a clockwise moment couple:
                <br />
                <ClickHighlight variant="paint" at={0}>
                  <LatexFormula math="M_0 = P \times d = 2.4\text{ kNm}" />
                </ClickHighlight>
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Equivalence */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                Step 4: Deflection Equivalence
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Applying this force-plus-couple system creates the <ClickHighlight variant="paint" at={1}>identical double-curvature deflection profile</ClickHighlight> as the original bracket assembly.
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default VerticalBracketEquivalence;
