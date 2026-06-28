import React from 'react';
import { ClickSyncedTabs, ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { SlideBullet } from '@/features/presentation/components/elements';
import { SfdBmdRelationsDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

export const SfdBmdRelationsPart1: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: "Load to Shear (Integration)",
      badge: "1st Integral",
      badgeVariant: "success",
      description: "The change in shear force between two points equals the negative area under the load diagram.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="load-to-shear-int" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-emerald-500 font-bold">•</span>}>
              <span>Area under the load curve subtracts from the current shear value.</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-emerald-500 font-bold">•</span>}>
              <span>A constant load double integrates to a quadratic moment (linear shear).</span>
            </SlideBullet>
          </div>
        </div>
      )
    },
    {
      title: "Shear to Moment (Integration)",
      badge: "2nd Integral",
      badgeVariant: "success",
      description: "The change in bending moment between two points equals the area under the shear force diagram.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="shear-to-moment-int" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-blue-500 font-bold">•</span>}>
              <span>Peak moments occur directly where the shear diagram equals zero (or passes through zero).</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-blue-500 font-bold">•</span>}>
              <span>The area under the shear force curve represents the net change in bending moment.</span>
            </SlideBullet>
          </div>
        </div>
      )
    },
    {
      title: "Load to Moment (Double Integration)",
      badge: "Double Int",
      badgeVariant: "primary",
      description: "Double integrating the load distribution profile yields the change in bending moment.",
      rightContent: (
        <div className="flex flex-col items-center gap-4 text-foreground w-full select-text text-left">
          <SfdBmdRelationsDrawing type="load-to-moment-dbl-int" />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full">
            <SlideBullet icon={<span className="text-violet-500 font-bold">•</span>}>
              <span>Bending moment is the second spatial integral of the load intensity.</span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-violet-500 font-bold">•</span>}>
              <span>The shape degree transitions sequentially (e.g. constant load → linear shear → quadratic moment).</span>
            </SlideBullet>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Relationships between SFD & BMD (Part 1: Integration)"
      items={items}
      leftTitle="Theory Cheat-Sheet: Load to Shear to Moment"
      rightTitle="Visual Concept Demonstration"
      leftWidth="52%"
      clickToTabMap={[0, 1, 2]}
    />
  );
};

export default SfdBmdRelationsPart1;
