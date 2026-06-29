import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import {
  SlideParagraph,
  ClickReveal,
  LatexFormula,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { LoadDiagramDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/LoadDiagramDrawing';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';

export const LoadDiagramReconstruction: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 1 : currentClick;

  return (
    <TwoRowLayout
      title="Diagram Reconstruction Principles"
      topHeight="55%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && <ClickReveal at={1} className="hidden">{' '}</ClickReveal>}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <LoadDiagramDrawing loadCase="all" />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Reaction reconstruction */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Reconstruction: Phase 1
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Solve boundary constraints by reading diagram jumps backward:
                <br />
                • Shear jumps reveal support reaction forces.
                <br />
                • Moment jumps reveal concentrated moment couples.
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Span Load reconstruction */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                Reconstruction: Phase 2
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Solve span loading:
                <br />
                • Load intensity from shear slope: <ClickHighlight variant="paint" at={1}><LatexFormula math="w(x) = -\\frac{dV}{dx}" /></ClickHighlight>.
                <br />
                • Constant shear means no load; sloped shear means UDL.
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default LoadDiagramReconstruction;
