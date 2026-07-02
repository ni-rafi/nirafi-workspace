import { SlideList, SlideParagraph } from '@/features/presentation/components/elements';
import { BeamDeformationDrawing } from './drawings/BeamDeformationDrawing';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const StraightBeamSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Undeformed Beam Reference"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Beam Element"
            description="We now apply this spring intuition to a solid structural beam element."
            revealMode="each-click"
            items={[
              { text: "Initially, the beam is straight and horizontal.", revealAt: 1 },
              { text: "The Neutral Axis (NA) is at the center of gravity (centroid) of the cross section.", revealAt: 2 },
              { text: "Before any load is applied, all internal normal stresses are exactly zero.", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"Let's see how this horizontal reference line transforms under positive sagging moments."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Straight Beam Reference</span>
          <BeamDeformationDrawing mode="straight" />
        </div>
      }
    />
  );
};

export default StraightBeamSlide;
