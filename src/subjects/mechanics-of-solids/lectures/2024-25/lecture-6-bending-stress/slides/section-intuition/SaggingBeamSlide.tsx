import { SlideList, SlideParagraph } from '@/features/presentation/components/elements';
import { BeamDeformationDrawing } from './drawings/BeamDeformationDrawing';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const SaggingBeamSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Positive Curvature (Sagging Beam)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Sagging Curvature (+ve Moment)"
            description="Under positive bending moments, the beam deforms downwards, creating a smile curvature."
            revealMode="each-click"
            items={[
              { text: "Fibers above the Neutral Axis compress (contract).", revealAt: 1 },
              { text: "Fibers below the Neutral Axis stretch (tensile stress).", revealAt: 2 },
              { text: "Neutral Axis retains its original length (zero strain).", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"This is the standard loading condition for simply supported beams under gravity loads."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Sagging Deformation</span>
          <BeamDeformationDrawing mode="sagging" />
        </div>
      }
    />
  );
};

export default SaggingBeamSlide;
