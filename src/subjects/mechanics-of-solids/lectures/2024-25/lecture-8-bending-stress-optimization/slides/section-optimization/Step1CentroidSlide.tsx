import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Step1CentroidSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Locating the Asymmetric Neutral Axis"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Centroid mapping</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate centroid height "}
              <LatexFormula math="\bar{y}" />
              {" from the bottom of the section."}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1 text-[11px] text-left">
            <SlideBullet text={<span>Segment 1 (Bottom Flange): <LatexFormula math="A_1 = 160 \times 40 = 6400\text{ mm}^2" />, <LatexFormula math="y_1 = 20\text{ mm}" /></span>} revealAt={1} />
            <SlideBullet text={<span>Segment 2 (Web): <LatexFormula math="A_2 = 200 \times 20 = 4000\text{ mm}^2" />, <LatexFormula math="y_2 = 140\text{ mm}" /></span>} revealAt={2} />
            <SlideBullet text={<span>Segment 3 (Top Flange): <LatexFormula math="A_3 = 80 \times 20 = 1600\text{ mm}^2" />, <LatexFormula math="y_3 = 250\text{ mm}" /></span>} revealAt={3} />
            <SlideBullet text={<span>Total Area <LatexFormula math="\Sigma A = 12,000\text{ mm}^2" /></span>} revealAt={4} />
          </div>
          <div className="space-y-1 text-left">
            <ClickReveal at={5} preset="fade">
              <SlideEquation math="\bar{y} = \frac{(6400 \times 20) + (4000 \times 140) + (1600 \times 250)}{12000}" />
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <ClickHighlight at={7} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="\bar{y} = 87.11\text{ mm from bottom}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Centroid shift" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>• Total height = 260 mm</p>
              <p className="text-emerald-500 font-bold">y_bottom = 87.11 mm</p>
              <p className="text-emerald-500 font-bold">y_top = 172.89 mm</p>
              <p className="text-muted-foreground text-[10px] leading-normal mt-2">Because the centroid NA lies closer to the heavy bottom flange, the top fibers have double the bending distance!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step1CentroidSlide;
