import { SlideParagraph, SlideList, LatexFormula, ClickReveal } from '@/features/presentation/components/elements';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const StressFieldAnalysisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Stress Field Mapping"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Stress Classification"
            description="Let's map the spring deformation to structural stress zones:"
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Outer Side: Larger radius, stretched fibers \u2192 Tensile Stress ("}
                    <LatexFormula math="+\sigma" />
                    {")"}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Inner Side: Smaller radius, compressed fibers \u2192 Compressive Stress ("}
                    <LatexFormula math="-\sigma" />
                    {")"}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: <span>{"Middle Zone: No change in length \u2192 Zero Stress (Neutral Axis)"}</span>,
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"This stress variation creates a torque (internal bending moment) that resists the external loads."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-3 justify-center h-full min-h-[260px] w-full text-left">
          <ClickReveal at={4} preset="fade">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start gap-2.5">
              <ArrowUpRight className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Tensile Stress Field</span>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Developed in fibers that are forced to stretch. Corresponds to the outer curve profile.</p>
              </div>
            </div>
          </ClickReveal>

          <ClickReveal at={5} preset="fade">
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-2.5">
              <ArrowDownLeft className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Compressive Stress Field</span>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Developed in fibers that are forced to contract. Corresponds to the inner curve profile.</p>
              </div>
            </div>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default StressFieldAnalysisSlide;
