import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';

export const AssumptionsSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Assumptions in Simple Bending">
      <div className="flex flex-col gap-4 text-left select-text max-w-3xl mx-auto py-2">
        <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
          To derive the analytical mathematical model for bending stresses, we assume the following:
        </SlideParagraph>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-2">
          <SlideList
            title="Material & Elasticity"
            revealMode="each-click"
            variant="plain"
            items={[
              { text: "Homogeneous & Isotropic: Material properties are uniform in all directions.", revealAt: 1 },
              { text: "Hooke's Law Holds: The material is elastic; stress is directly proportional to strain.", revealAt: 2 },
              { text: "Plane Sections Remain Plane: Cross-sections perpendicular to the neutral axis remain plane and perpendicular after bending.", revealAt: 3 },
            ]}
          />
          <SlideList
            title="Geometric & Fiber Mechanics"
            revealMode="each-click"
            variant="plain"
            items={[
              { text: "Independent Fibers: Longitudinal fibers contract/expand independently without lateral pressure.", revealAt: 4 },
              { text: "Elastic Modulus Equality: E has the same value in tension as in compression.", revealAt: 5 },
              { text: "Symmetric Section: Bending occurs in a plane of symmetry containing the load axis.", revealAt: 6 },
            ]}
          />
        </div>
        <SlideParagraph variant="info" className="text-[10px] my-1">
          {"These assumptions define pure, elastic flexural behavior without shear deformation."}
        </SlideParagraph>
      </div>
    </FullWidthLayout>
  );
};

export default AssumptionsSlide;
