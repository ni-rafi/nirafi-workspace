import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';

export const PrerequisitesSlide: React.FC = () => {
  const prerequisites = [
    { title: 'Free-Body Diagrams & Equilibrium', text: 'Drawing FBDs and applying equations of equilibrium to determine support reactions.' },
    { title: 'Bending Moment Diagrams (BMD)', text: 'Tracing local variations of bending moments to identify critical cross-sectional demands.' },
    { title: 'Centroid of Area', text: 'Calculating the centroid location for standard and composite sections.' },
    { title: 'Area Moment of Inertia (I)', text: 'Integrating resistance to rotation about centroidal axes.' },
  ];

  return (
    <FullWidthLayout title="Prerequisite Knowledge">
      <div className="flex flex-col gap-4 text-left select-text max-w-2xl mx-auto py-2">
        <SlideList
          title="Foundational Competencies"
          description="Students are expected to be familiar with the following concepts before proceeding:"
          revealMode="each-click"
          items={prerequisites}
        />
        <SlideParagraph variant="info" className="text-[10px] my-1">
          {"Review these concepts if needed to fully grasp the upcoming material."}
        </SlideParagraph>
      </div>
    </FullWidthLayout>
  );
};

export default PrerequisitesSlide;
