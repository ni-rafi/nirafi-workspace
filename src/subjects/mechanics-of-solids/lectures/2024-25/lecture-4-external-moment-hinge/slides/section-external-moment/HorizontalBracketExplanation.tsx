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

export const HorizontalBracketExplanation: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 1 : currentClick;

  return (
    <TwoRowLayout
      title="Eccentric Horizontal Load"
      topHeight="50%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && <ClickReveal at={1} className="hidden">{' '}</ClickReveal>}
          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <BracketLoadingDrawing
              loadVal={2.0}
              bracketLen={1.5}
              mode={activeStep === 0 ? 'horizontal-physical' : 'horizontal-equivalent'}
            />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Physical model */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Physical Model
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                A horizontal load <LatexFormula math="P = 2.0\text{ kN}" /> acts at the tip of the bracket (height <LatexFormula math="h = 1.5\text{ m}" />) above node C, creating a rotational leverage.
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Equivalent model */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                Equivalent Loading
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Resolves directly to the neutral axis at node C as:
                <br />
                • Axial Force: <ClickHighlight variant="paint" at={1}><LatexFormula math="P_x = 2.0\text{ kN}" /></ClickHighlight>
                <br />
                • Moment Couple: <ClickHighlight variant="paint" at={1}><LatexFormula math="M_0 = P \times h = 3.0\text{ kNm}" /></ClickHighlight>
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default HorizontalBracketExplanation;
