import { SlideList, SlideParagraph } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const SpringDiagramSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Deformation of a Bending Spring"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Mechanical Analog"
            description="To mathematically track these changes in fiber lengths, let's look at a spring model."
            revealMode="each-click"
            items={[
              { text: "A spring under moments curls into a distinct arc shape.", revealAt: 1 },
              { text: "Coils on the outer boundary expand (stretched).", revealAt: 2 },
              { text: "Coils on the inner boundary compress (contracted).", revealAt: 3 },
              { text: "This serves as a visual scale to measure deformation.", revealAt: 4 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"We will trace the exact lengths of these straight and bent spring fibers to formulate strain."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Lateral Bending Spring</span>
          <SpringDrawing mode="bent" />
        </div>
      }
    />
  );
};

export default SpringDiagramSlide;
