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

export const VerticalBracketIntro: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 2 : currentClick;

  const getDrawingMode = (): 'intro-setup-straight' | 'intro-setup-deformed' | 'intro-flow' => {
    switch (activeStep) {
      case 0:
        return 'intro-setup-straight';
      case 1:
        return 'intro-setup-deformed';
      case 2:
      default:
        return 'intro-flow';
    }
  };

  return (
    <TwoRowLayout
      title="Eccentric Loads & Deflection Curvature"
      topHeight="50%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
            </>
          )}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Physical setup */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Step 1: Setup
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                A point load <LatexFormula math="P = 1.2\text{ kN}" /> acts at the bracket tip (offset <LatexFormula math="d = 2.0\text{ m}" />) fixed to node C.
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Physical setup deformed */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
                Step 2: Deformation
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                The eccentric load bends the beam into a double-curvature shape.
              </SlideParagraph>
            </div>
          )}

          {/* Step 2: Force Flow */}
          {(activeStep >= 2 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
                Step 3: Force Flow Path
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                The force <ClickHighlight variant="paint" at={2}>flows from the bracket tip</ClickHighlight> through the rigid arm to node C on the beam neutral axis.
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default VerticalBracketIntro;
