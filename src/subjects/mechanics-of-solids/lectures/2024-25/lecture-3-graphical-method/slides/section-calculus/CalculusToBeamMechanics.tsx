import React, { useContext } from 'react';
import { ClickSyncedTabs, ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { LatexFormula, SlideBullet } from '@/features/presentation/components/elements';
import { CalculusLoopDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

export const CalculusToBeamMechanics: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';

  const items: ClickSyncedTabItem[] = [
    {
      title: "Core Variables",
      badge: "Definitions",
      badgeVariant: "default",
      description: "Connecting abstract mathematical functions to physical loading, shear, and bending moment curves.",
      rightContent: (
        <div className="flex flex-col gap-2 text-foreground w-full select-text text-left">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-indigo-500 block">The Core Variables:</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-1 border border-red-500/20 bg-red-500/5 rounded font-mono font-bold text-rose-500 text-[10px] leading-tight">
                <LatexFormula math="w(x)" />
                <span className="block text-[8px] font-sans font-normal text-muted-foreground mt-0.5">Distributed Load</span>
              </div>
              <div className="p-1 border border-emerald-500/20 bg-emerald-500/5 rounded font-mono font-bold text-emerald-500 text-[10px] leading-tight">
                <LatexFormula math="V(x)" />
                <span className="block text-[8px] font-sans font-normal text-muted-foreground mt-0.5">Shear Force</span>
              </div>
              <div className="p-1 border border-blue-500/20 bg-blue-500/5 rounded font-mono font-bold text-blue-500 text-[10px] leading-tight">
                <LatexFormula math="M(x)" />
                <span className="block text-[8px] font-sans font-normal text-muted-foreground mt-0.5">Bending Moment</span>
              </div>
            </div>
          </div>
          {/* SVG Diagram - Tab 0 Style */}
          <div className="w-full border border-border/20 bg-muted/5 rounded-xl p-0 flex justify-center overflow-hidden">
            <CalculusLoopDrawing tabIndex={0} currentClick={currentClick} isScrollOrBlog={isScrollOrBlog} />
          </div>
        </div>
      )
    },
    {
      title: "Integration Flow",
      badge: "Areas",
      badgeVariant: "success",
      description: "Area summation processes moving from distributed load to shear force, and shear force to bending moment.",
      rightContent: (
        <div className="flex flex-col gap-2 text-foreground w-full select-text text-left">
          <div className="text-[11px] min-h-[50px] space-y-1 text-muted-foreground">
            <span className="font-bold text-emerald-500 block mb-0.5">Integration (Area Accumulation):</span>
            {(isScrollOrBlog || currentClick >= 1) && (
              <SlideBullet icon={<span className="text-emerald-500 font-black animate-in fade-in">→</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Integrating load <LatexFormula math="-w(x)" /> yields shear <LatexFormula math="V(x) = -\int w \, dx" />.</span>
              </SlideBullet>
            )}
            {(isScrollOrBlog || currentClick >= 2) && (
              <SlideBullet icon={<span className="text-blue-500 font-black animate-in fade-in">→</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Integrating shear <LatexFormula math="V(x)" /> yields bending moment <LatexFormula math="M(x) = \int V \, dx" />.</span>
              </SlideBullet>
            )}
          </div>
          {/* SVG Diagram - Tab 1 Style */}
          <div className="w-full border border-border/20 bg-muted/5 rounded-xl p-0 flex justify-center overflow-hidden">
            <CalculusLoopDrawing tabIndex={1} currentClick={currentClick} isScrollOrBlog={isScrollOrBlog} />
          </div>
        </div>
      )
    },
    {
      title: "Differentiation Flow",
      badge: "Slopes",
      badgeVariant: "info",
      description: "Calculating local tangent slopes of the diagrams to find the corresponding force intensities.",
      rightContent: (
        <div className="flex flex-col gap-2 text-foreground w-full select-text text-left">
          <div className="text-[11px] min-h-[50px] space-y-1 text-muted-foreground">
            <span className="font-bold text-blue-500 block mb-0.5">Differentiation (Tangent Slopes):</span>
            {(isScrollOrBlog || currentClick >= 3) && (
              <SlideBullet icon={<span className="text-emerald-550 dark:text-emerald-400 font-black animate-in fade-in">←</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Slope of bending moment <LatexFormula math="dM/dx" /> equals local shear <LatexFormula math="V(x)" />.</span>
              </SlideBullet>
            )}
            {(isScrollOrBlog || currentClick >= 4) && (
              <SlideBullet icon={<span className="text-rose-500 font-black animate-in fade-in">←</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Slope of shear diagram <LatexFormula math="dV/dx" /> equals negative load <LatexFormula math="-w(x)" />.</span>
              </SlideBullet>
            )}
          </div>
          {/* SVG Diagram - Tab 2 Style */}
          <div className="w-full border border-border/20 bg-muted/5 rounded-xl p-0 flex justify-center overflow-hidden">
            <CalculusLoopDrawing tabIndex={2} currentClick={currentClick} isScrollOrBlog={isScrollOrBlog} />
          </div>
        </div>
      )
    },
    {
      title: "Double Operators",
      badge: "Concavity",
      badgeVariant: "primary",
      description: "Second-order relationships directly linking distributed load to bending moment curves.",
      rightContent: (
        <div className="flex flex-col gap-2 text-foreground w-full select-text text-left">
          <div className="text-[11px] min-h-[50px] space-y-1 text-muted-foreground">
            <span className="font-bold text-violet-500 block mb-0.5">Double Operators (Concavity Relations):</span>
            {(isScrollOrBlog || currentClick >= 5) && (
              <SlideBullet icon={<span className="text-violet-500 font-black animate-in fade-in">↕</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Double integration of load: <LatexFormula math="\Delta M = -\iint w \, dx^2" />.</span>
              </SlideBullet>
            )}
            {(isScrollOrBlog || currentClick >= 6) && (
              <SlideBullet icon={<span className="text-rose-550 dark:text-rose-455 font-black animate-in fade-in">↕</span>}>
                <span className="animate-in slide-in-from-left-2 duration-300">Double derivative of moment: <LatexFormula math="d^2M/dx^2 = -w(x)" />.</span>
              </SlideBullet>
            )}
          </div>
          {/* SVG Diagram - Tab 3 Style */}
          <div className="w-full border border-border/20 bg-muted/5 rounded-xl p-0 flex justify-center overflow-hidden">
            <CalculusLoopDrawing tabIndex={3} currentClick={currentClick} isScrollOrBlog={isScrollOrBlog} />
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Bridging Calculus & Beam Mechanics"
      items={items}
      leftTitle="Theory Cheat-Sheet: Calculus & Beams"
      rightTitle="Visual Concept Demonstration"
      leftWidth="52%"
      clickToTabMap={[0, 1, 1, 2, 2, 3, 3]}
    />
  );
};

export default CalculusToBeamMechanics;
