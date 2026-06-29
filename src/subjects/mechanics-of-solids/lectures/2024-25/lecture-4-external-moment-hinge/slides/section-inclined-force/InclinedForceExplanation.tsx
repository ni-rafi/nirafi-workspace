import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import {
  SlideParagraph,
  ClickReveal,
  LatexFormula,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { InclinedForceDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/InclinedForceDrawing';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';

export const InclinedForceExplanation: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 1 : currentClick;

  return (
    <TwoRowLayout
      title="Inclined Forces & Component Resolution"
      topHeight="50%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && <ClickReveal at={1} className="hidden">{' '}</ClickReveal>}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <InclinedForceDrawing
              angle={50}
              showComponents={true}
              showReactions={activeStep >= 1}
            />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          {/* Step 0: Orthogonal Components */}
          {(activeStep >= 0 || isScrollOrBlog) && (
            <div className="animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Step 1: Vector Resolution
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Resolve inclined force <LatexFormula math="P = 10\text{ kN}" /> at <LatexFormula math="\theta = 50^{\circ}" /> into components:
                <br />
                • Axial Force: <ClickHighlight variant="paint" at={0}><LatexFormula math="P_x = P \cos(\theta) = 6.43 \text{ kN}" /></ClickHighlight>
                <br />
                • Transverse Force: <ClickHighlight variant="paint" at={0}><LatexFormula math="P_y = P \sin(\theta) = 7.66 \text{ kN}" /></ClickHighlight>
              </SlideParagraph>
            </div>
          )}

          {/* Step 1: Support Boundary Reactions */}
          {(activeStep >= 1 || isScrollOrBlog) && (
            <div className="animate-in slide-in-from-bottom-2 md:border-l border-border/20 md:pl-6 duration-300">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
                Step 2: Support Reactions
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-1">
                Pin A resists axial movement. Reactions satisfy equilibrium:
                <br />
                • Axial reaction: <ClickHighlight variant="paint" at={1}><LatexFormula math="A_x = P_x = 6.43\text{ kN}" /></ClickHighlight>
                <br />
                • Transverse reactions: <ClickHighlight variant="paint" at={1}><LatexFormula math="A_y = B_y = \frac{P_y}{2} = 3.83\text{ kN}" /></ClickHighlight>
              </SlideParagraph>
            </div>
          )}
        </div>
      }
    />
  );
};

export default InclinedForceExplanation;
