import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { Compass } from 'lucide-react';

export const PrerequisitesSlide: React.FC = () => {
  const prerequisites = [
    { title: <span>Moment of Inertia (<LatexFormula math="I" />)</span>, text: 'Tracing structural stiffness properties across standard cross-sectional profiles.' },
    { title: 'Centroid and Area Calculations', text: 'Tracking Neutral Axis locations for composite and asymmetric flanged shapes.' },
    { title: 'The Flexure Formula', text: <span>Applying the primary normal stress equation: <LatexFormula math="\sigma = \frac{M \cdot y}{I}" />.</span> },
    { title: 'Symmetric & Asymmetric Bending Moment Demands', text: 'Resolving peak moments from BMDs to feed design stress checks.' },
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
          <SlideList revealMode="each-click" items={prerequisites} />
        </div>
        <SlideParagraph variant="info" className="text-[10px] my-1">
          {"Review these concepts if needed to fully grasp the upcoming material."}
        </SlideParagraph>
      </div>
    </FullWidthLayout>
  );
};

export default PrerequisitesSlide;
