import { SlideList, SlideParagraph } from '@/features/presentation/components/elements';
import { BeamDeformationDrawing } from './drawings/BeamDeformationDrawing';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const HoggingBeamSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Negative Curvature (Hogging Beam)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Hogging Curvature (-ve Moment)"
            description="Under negative bending moments, the beam deforms upwards, creating a frown curvature."
            revealMode="each-click"
            items={[
              { text: "Fibers above the Neutral Axis stretch (tensile stress).", revealAt: 1 },
              { text: "Fibers below the Neutral Axis compress (contract).", revealAt: 2 },
              { text: "The locations of tension and compression are completely reversed.", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"This occurs typically over column supports in continuous beams or in cantilever structures."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Hogging Deformation</span>
          <BeamDeformationDrawing mode="hogging" />
        </div>
      }
    />
  );
};

export default HoggingBeamSlide;
