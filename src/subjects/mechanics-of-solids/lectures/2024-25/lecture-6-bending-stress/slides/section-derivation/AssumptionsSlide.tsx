import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { ShieldCheck, Info } from 'lucide-react';

export const AssumptionsSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Assumptions in Simple Bending">
      <div className="flex flex-col h-full justify-between gap-4 text-left select-text max-w-3xl mx-auto py-2">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
            <ShieldCheck className="h-4.5 w-4.5" />
            <span>Euler-Bernoulli Beam Assumptions</span>
          </div>
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
            To derive the analytical mathematical model for bending stresses, we assume the following:
          </SlideParagraph>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-2">
          <div className="space-y-2">
            <SlideBullet text="Homogeneous & Isotropic: Material properties are uniform in all directions." />
            <SlideBullet text="Hooke's Law Holds: The material is elastic; stress is directly proportional to strain." />
            <SlideBullet text="Plane Sections Remain Plane: Cross-sections perpendicular to the neutral axis remain plane and perpendicular after bending." />
          </div>
          <div className="space-y-2">
            <SlideBullet text="Independent Fibers: Longitudinal fibers contract/expand independently without lateral pressure." />
            <SlideBullet text="Elastic Modulus Equality: E has the same value in tension as in compression." />
            <SlideBullet text="Symmetric Section: Bending occurs in a plane of symmetry containing the load axis." />
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-muted/10 p-2.5 rounded-xl border border-border/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
          <span>These assumptions define pure, elastic flexural behavior without shear deformation.</span>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default AssumptionsSlide;
