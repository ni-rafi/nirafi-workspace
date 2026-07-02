import { SlideList } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const StraightSpringSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Straight Reference Spring"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Reference State"
            description="We begin with a straight reference spring in its undeformed, zero-moment state."
            revealMode="each-click"
            items={[
              { text: "All coils are uniform in length and spacing.", revealAt: 1 },
              { text: "Vertical boundaries (marked in orange) are perfectly straight and parallel.", revealAt: 2 },
              { text: "Every horizontal fiber layer has an identical original length.", revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Straight Reference State</span>
          <SpringDrawing mode="straight" />
        </div>
      }
    />
  );
};

export default StraightSpringSlide;
