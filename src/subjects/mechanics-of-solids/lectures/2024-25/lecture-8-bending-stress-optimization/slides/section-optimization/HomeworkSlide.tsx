import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { BookOpen, AlertTriangle } from 'lucide-react';

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
            <SlideBullet text="Ferdinand L. Singer (Strength of Materials): Problems 559 – 565." />
            <SlideBullet text="R.S. Khurmi (Strength of Materials): Examples 15.4 – 15.9; Exercises 15.2." />
          </div>
          <div className="p-3 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl text-[9px] text-emerald-600 dark:text-emerald-400 leading-normal flex items-start gap-1.5 font-bold">
            <AlertTriangle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Remember, homework is not a suggestion for any kind of examination!</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-2">Practice Guidelines</h4>
            <p>1. Formulate Section Modulus Z relative to width b.</p>
            <p>2. Differentiate dZ/db and set to zero.</p>
            <p>3. Identify tensile/compressive fibers for asymmetric profiles.</p>
            <p>4. Scale limits properly.</p>
          </div>
        </div>
      }
    />
  );
};

export default HomeworkSlide;
