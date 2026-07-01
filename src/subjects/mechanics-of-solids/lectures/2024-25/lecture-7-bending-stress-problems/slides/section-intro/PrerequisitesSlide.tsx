import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';
import { Compass, BookOpen } from 'lucide-react';

export const PrerequisitesSlide: React.FC = () => {
  const prerequisites = [
    { title: 'Free-Body Diagrams & Equilibrium', text: 'Drawing FBDs and applying equations of equilibrium to determine support reactions.' },
    { title: 'Bending Moment Diagrams (BMD)', text: 'Tracing local variations of bending moments to identify critical cross-sectional demands.' },
    { title: 'Centroid of Area', text: 'Calculating the centroid location for standard and composite sections.' },
    { title: 'Area Moment of Inertia (I)', text: 'Integrating resistance to rotation about centroidal axes.' },
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
            Students are expected to be familiar with the following concepts before proceeding:
          </SlideParagraph>
        </div>
        <div className="flex-1 my-2">
          <SlideList revealMode="none" items={prerequisites} />
        </div>
        <div className="bg-slate-50 dark:bg-muted/10 p-2.5 rounded-xl border border-border/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
          <span>Review these concepts if needed to fully grasp the upcoming material.</span>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default PrerequisitesSlide;
