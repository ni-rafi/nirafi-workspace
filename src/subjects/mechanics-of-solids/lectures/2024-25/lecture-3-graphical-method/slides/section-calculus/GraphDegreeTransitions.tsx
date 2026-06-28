import React from 'react';
import { ClickSyncedTabs, ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { useClickStepsContext, usePresentation } from '@/features/presentation/context';
import { GraphDegreeTransitionsDrawing, TransitionShapeDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

export const GraphDegreeTransitions: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const { viewMode } = usePresentation();
  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';

  const showStep1 = isScrollOrBlog || currentClick >= 1;
  const showStep2 = isScrollOrBlog || currentClick >= 2;

  const getMathFormula = (click: number) => {
    if (click === 0) {
      return `\\text{Degree: } \\text{None } (-\\infty)`;
    }
    if (click === 1) {
      return `\\text{Degree transition: } \\text{None } (-\\infty) \\xrightarrow{\\int} \\text{Constant } (0)`;
    }
    return `\\text{Degree transition: } \\text{None } (-\\infty) \\xrightarrow{\\int} \\text{Constant } (0) \\xrightarrow{\\int} \\text{Linear } (1)`;
  };

  const formulaMath = isScrollOrBlog ? getMathFormula(2) : getMathFormula(currentClick);

  const items: ClickSyncedTabItem[] = [
    {
      title: "Constant (x⁰) from Zero Load",
      badge: "Degree 0",
      badgeVariant: "success",
      description: "Under zero load (w = 0), the shear diagram remains constant. Integrating constant shear yields a sloped linear bending moment.",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-6 w-full text-foreground">
          <GraphDegreeTransitionsDrawing showStep1={showStep1} showStep2={showStep2} />
          <div className="flex gap-4 text-xs font-mono bg-muted/60 border border-border text-foreground px-4 py-2 rounded-xl shadow-xs min-h-[40px] items-center justify-center">
            <span>
              <LatexFormula math={formulaMath} />
            </span>
          </div>
        </div>
      )
    },
    {
      title: "Linear (x¹) from Constant Load",
      badge: "Degree 1",
      badgeVariant: "info",
      description: "Under a uniform load (w = C), shear is linear. Integrating linear shear yields a quadratic parabola bending moment. We display both concavities depending on load orientation:",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-4 w-full text-foreground">
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            {/* Case A: Concave Down Parabola */}
            <div className="flex flex-col items-center">
              <TransitionShapeDrawing type="concave-down-quadratic" label="Concave Down (PD)" />
            </div>
            
            {/* Case B: Concave Up Parabola */}
            <div className="flex flex-col items-center">
              <TransitionShapeDrawing type="concave-up-quadratic" label="Concave Up (PI)" />
            </div>
          </div>

          <div className="flex gap-4 text-xs font-mono bg-muted/60 border border-border text-foreground px-4 py-1.5 rounded-xl shadow-xs">
            <span>
              <LatexFormula math="\text{Degree transition: } \text{Constant } (0) \xrightarrow{\int} \text{Linear } (1) \xrightarrow{\int} \text{Quadratic } (2)" />
            </span>
          </div>
        </div>
      )
    },
    {
      title: "Parabolic (x²) from Linear Load",
      badge: "Degree 2",
      badgeVariant: "primary",
      description: "Under a triangular load (w = Cx), shear is parabolic (degree 2). Integrating parabolic shear yields a third-order cubic bending moment. We display both cubic orientations:",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-4 w-full text-foreground">
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            {/* Case A: Concave Down Cubic */}
            <div className="flex flex-col items-center">
              <TransitionShapeDrawing type="concave-down-cubic" label="Concave Down (Cubic)" />
            </div>
 
            {/* Case B: Concave Up Cubic */}
            <div className="flex flex-col items-center">
              <TransitionShapeDrawing type="concave-up-cubic" label="Concave Up (Cubic)" />
            </div>
          </div>

          <div className="flex gap-4 text-xs font-mono bg-muted/60 border border-border text-foreground px-4 py-1.5 rounded-xl shadow-xs">
            <span>
              <LatexFormula math="\text{Degree transition: } \text{Linear } (1) \xrightarrow{\int} \text{Quadratic } (2) \xrightarrow{\int} \text{Cubic } (3)" />
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Integration & Differentiation of Graphs"
      items={items}
      leftTitle="Graphical Cheat-Sheet: Polynomial Degree Rules"
      rightTitle="Degree Transition Loop"
      leftWidth="45%"
      clickToTabMap={[0, 0, 0, 1, 2]}
    />
  );
};

export default GraphDegreeTransitions;
