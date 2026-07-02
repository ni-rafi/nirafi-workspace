import { SlideParagraph, SlideEquation, LatexFormula, ClickReveal, InteractiveCard } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const GeometrySummarySlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Consolidated Area Properties Summary"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Reference Sheet</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Before applying the flexure stress formula, resolve these two geometric steps in sequence.
            </SlideParagraph>
          </div>
          <div className="space-y-3 my-2 text-left">
            <ClickReveal at={1} preset="fade">
              <div>
                <span className="text-[10px] font-bold text-foreground block mb-1">Step 1: Centroid Location</span>
                <SlideEquation math="\bar{y} = \frac{\sum A_i \cdot y_i}{\sum A_i}" />
              </div>
            </ClickReveal>
            <ClickReveal at={2} preset="fade">
              <div>
                <span className="text-[10px] font-bold text-foreground block mb-1">Step 2: Moment of Inertia</span>
                <SlideEquation math="I_{xx} = \sum (I_{gi} + A_i \cdot d_i^2)" />
              </div>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] text-muted-foreground leading-relaxed font-mono">
          <InteractiveCard title="Calculated Constants" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>• Segment 1 Centroid: <LatexFormula math="y_1 = 275\text{ mm}" /></p>
              <p>• Segment 2 Centroid: <LatexFormula math="y_2 = 150\text{ mm}" /></p>
              <p>• Segment 3 Centroid: <LatexFormula math="y_3 = 25\text{ mm}" /></p>
              <hr className="border-border/25 my-1" />
              <p>• Global NA: <LatexFormula math="\bar{y} = 125.0\text{ mm}" /></p>
              <p>• Global Inertia: <LatexFormula math="I_{xx} = 255.20 \times 10^6\text{ mm}^4" /></p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default GeometrySummarySlide;
