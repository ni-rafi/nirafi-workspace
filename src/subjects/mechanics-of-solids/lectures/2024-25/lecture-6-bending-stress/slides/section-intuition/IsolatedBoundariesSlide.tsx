import { SlideList } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const IsolatedBoundariesSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Isolated Parallel Boundaries"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Geometric Isolation"
            description="By removing the spring coils, we isolate the boundaries to focus purely on the geometric outlines."
            revealMode="each-click"
            items={[
              { text: "The orange parallel lines represent plane cross-sections of a beam.", revealAt: 1 },
              { text: "Before bending, the distance between boundaries is uniform at all heights.", revealAt: 2 },
              { text: "No normal strains are present in this undeformed condition.", revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Isolated Boundaries</span>
          <SpringDrawing mode="boundaries-only" />
        </div>
      }
    />
  );
};

export default IsolatedBoundariesSlide;
