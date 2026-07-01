import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';
import { Compass, BookOpen } from 'lucide-react';

export const PrerequisitesSlide: React.FC = () => {
  const prerequisiteItems = [
    { title: 'Bending Moment & BMDs', text: 'Understanding shear force (SF) and bending moment (BM) diagrams.' },
    { title: 'Free-body Diagrams', text: 'Drawing FBDs to determine reaction forces using equilibrium equations.' },
    { title: 'Moment of Inertia (I)', text: 'Calculating the second moment of area for rectangular, circular, and flanged sections.' },
    { title: 'Centroid Calculations', text: 'Finding the neutral axes (centroidal axes) for symmetric and unsymmetric sections.' }
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
            Students are expected to be familiar with the following concepts from Engineering Mechanics and previous lectures before proceeding:
          </SlideParagraph>
        </div>
        <div className="flex-1 my-2">
          <SlideList revealMode="none" items={prerequisiteItems} />
        </div>
        <div className="bg-slate-50 dark:bg-muted/10 p-2.5 rounded-xl border border-border/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
          <span>Need a refresher? Check Lecture 1-5 materials or references.</span>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default PrerequisitesSlide;
