import { SlideParagraph, SlideBullet, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';
import { BookOpen } from 'lucide-react';

export const HomeworkSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Independent Homework Practice"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <BookOpen className="h-4.5 w-4.5" />
              <span>Assigned Exercises</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Solve these targeted textbook exercise problems to master Section Modulus and log-cutting optimizations."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Ferdinand L. Singer (Strength of Materials): Problems 559 – 565." revealAt={1} />
            <SlideBullet text="R.S. Khurmi (Strength of Materials): Examples 15.4 – 15.9; Exercises 15.2." revealAt={2} />
          </div>
          <SlideParagraph variant="success" className="text-[10px] my-1 font-bold">
            {"Remember, homework is not a suggestion for any kind of examination!"}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Practice Guidelines" className="w-full text-left">
            <div className="space-y-1.5 text-xs text-foreground font-mono">
              <p>1. Formulate Section Modulus <LatexFormula math="Z" /> relative to width <LatexFormula math="b" />.</p>
              <p>2. Differentiate <LatexFormula math="dZ/db" /> and set to zero.</p>
              <p>3. Identify tensile/compressive fibers for asymmetric profiles.</p>
              <p>4. Scale limits properly.</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default HomeworkSlide;
