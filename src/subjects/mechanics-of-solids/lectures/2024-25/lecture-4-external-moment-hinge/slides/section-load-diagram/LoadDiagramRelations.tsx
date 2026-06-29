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

export const LoadDiagramRelations: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 3 : currentClick;

  const getLoadCase = (): 'intro' | 'point-load' | 'udl' | 'moment' => {
    switch (activeStep) {
      case 0:
        return 'intro';
      case 1:
        return 'point-load';
      case 2:
        return 'udl';
      case 3:
      default:
        return 'moment';
    }
  };

  return (
    <TwoRowLayout
      title="Load-Shear-Moment Differential Relations"
      topHeight="55%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
            </>
          )}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <LoadDiagramDrawing loadCase={getLoadCase()} />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Differential Equations Summary */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Calculus Foundations
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Infinitesimal slice equilibrium:
                <br />
                • Load intensity: <ClickHighlight variant="paint" at={0}><LatexFormula math="w(x) = -\\frac{dV}{dx}" /></ClickHighlight>
                <br />
                • Shear slope: <ClickHighlight variant="paint" at={0}><LatexFormula math="V(x) = \\frac{dM}{dx}" /></ClickHighlight>
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Point Load Effects */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
                Concentrated Point Loads
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                • Shear force jump: <ClickHighlight variant="paint" at={1}><LatexFormula math="\\Delta V = P" /></ClickHighlight>.
                <br />
                • Moment diagram cusp (slope change).
              </SlideParagraph>
            </div>
          )}

          {/* Step 2: Distributed Load Effects */}
          {(activeStep >= 2 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
                Uniform Distributed Loads (UDL)
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                • Linear sloped shear: <ClickHighlight variant="paint" at={2}><LatexFormula math="\\frac{dV}{dx} = -w" /></ClickHighlight>.
                <br />
                • Parabolic moment: <ClickHighlight variant="paint" at={2}><LatexFormula math="\\frac{d^2M}{dx^2} = -w" /></ClickHighlight>.
              </SlideParagraph>
            </div>
          )}

          {/* Step 3: Concentrated Moment Effects */}
          {(activeStep >= 3 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                Concentrated Moment Couples
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                • Shear change is zero: <ClickHighlight variant="paint" at={3}><LatexFormula math="\\Delta V = 0" /></ClickHighlight>.
                <br />
                • Bending moment jump: <ClickHighlight variant="paint" at={3}><LatexFormula math="\\Delta M = -M_0" /></ClickHighlight>.
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default LoadDiagramRelations;
