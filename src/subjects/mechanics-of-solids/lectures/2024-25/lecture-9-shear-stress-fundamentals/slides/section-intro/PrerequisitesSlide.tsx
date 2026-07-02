import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { Compass, BookOpen } from 'lucide-react';

export const PrerequisitesSlide: React.FC = () => {
  const prerequisiteItems = [
    { title: 'Shear Force & SFDs', text: <span>Calculating internal shear force (<LatexFormula math="V" />) at any segment section and plotting SFDs.</span> },
    { title: 'Moment of Inertia (I)', text: <span>Calculating second moment of area (<LatexFormula math="I" />) for rectangular and symmetric profiles.</span> },
    { title: 'Centroid & Neutral Axis (N.A.)', text: 'Locating the centroid of a cross-section to establish the zero bending stress plane.' },
    { title: 'Equilibrium Equations', text: <span>Applying equilibrium equations (<LatexFormula math="\sum F = 0" />, <LatexFormula math="\sum M = 0" />) to satisfy overall static structural stability.</span> }
  ];

  return (
    <FullWidthLayout title="Prerequisite Knowledge">
      <div className="flex flex-col h-full justify-between gap-4 text-left select-text max-w-2xl mx-auto py-2">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
            <Compass className="h-4.5 w-4.5" />
            <span>Foundational Competencies</span>
          </div>
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
            Students should review the following concepts from Engineering Mechanics and previous lectures before proceeding:
          </SlideParagraph>
        </div>
        <div className="flex-1 my-2">
          <SlideList revealMode="none" items={prerequisiteItems} />
        </div>
        <div className="bg-muted/60 dark:bg-muted/20 p-2.5 rounded-xl border border-border/40 text-[10px] text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
          <span>Need a refresher? Check Lectures 1 to 5 for SFDs and cross-sectional parameters.</span>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default PrerequisitesSlide;
