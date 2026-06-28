import React from 'react';
import { ClickSyncedTabs, ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { SlideBullet, LatexFormula } from '@/features/presentation/components/elements';
import { SfdBmdRelationsDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

export const SfdBmdRelationsPart2: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: "Moment to Shear (Differentiation)",
      badge: "1st Derivative",
      badgeVariant: "info",
      description: "The derivative of bending moment with respect to distance equals the local shear force.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="moment-to-shear-diff" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-indigo-500 font-bold">•</span>}>
              <span>A constant shear yields a linear moment; zero shear yields a horizontal peak moment slope.</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-indigo-500 font-bold">•</span>}>
              <span>The local slope of the moment diagram directly reveals the shear force value.</span>
            </SlideBullet>
          </div>
        </div>
      )
    },
    {
      title: "Shear to Load (Differentiation)",
      badge: "2nd Derivative",
      badgeVariant: "info",
      description: "The derivative of shear force with respect to distance equals the negative loading intensity.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="shear-to-load-diff" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-rose-500 font-bold">•</span>}>
              <span>Unloaded spans have a shear slope of zero (constant shear).</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-rose-500 font-bold">•</span>}>
              <span>A uniform load corresponds to a constant sloped shear force line.</span>
            </SlideBullet>
          </div>
        </div>
      )
    },
    {
      title: "Moment to Load (Double Differentiation)",
      badge: "Double Diff",
      badgeVariant: "primary",
      description: "Differentiating the moment curve twice yields the negative load intensity.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="moment-to-load-dbl-diff" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-violet-500 font-bold">•</span>}>
              <span>Bending moment concavity directly mirrors the distributed load intensity.</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-violet-500 font-bold">•</span>}>
              <span>A concave-down moment region (<LatexFormula math="d^2M/dx^2 < 0" />) corresponds to a downward load vector.</span>
            </SlideBullet>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Relationships between SFD & BMD (Part 2: Differentiation)"
      items={items}
      leftTitle="Theory Cheat-Sheet: Moment to Shear to Load"
      rightTitle="Visual Concept Demonstration"
      leftWidth="52%"
      clickToTabMap={[0, 1, 2]}
    />
  );
};

export default SfdBmdRelationsPart2;
