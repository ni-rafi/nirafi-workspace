import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideBullet } from '@/features/presentation/components/elements';

export const IntegralsAndRelations: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Differential Relationships: Loading, Shear, & Moment</span>}
    >
      <div className="w-full h-full flex flex-col justify-start gap-4 p-4 text-left select-text">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch mt-1">
          {/* Left Card: Slopes & Derivatives */}
          <div className="p-3 border border-border/40 bg-muted/10 rounded-xl flex flex-col justify-start gap-2">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Slopes & Derivatives</span>
            <div className="grid grid-cols-1 gap-2.5 mt-1">
              <div className="flex flex-col gap-1 p-2 bg-background/50 border border-border/40 rounded-lg">
                <div className="text-center font-mono py-1 border-b border-border/10">
                  <LatexFormula math="\frac{dV}{dx} = -w" />
                </div>
                <span className="text-[10px] text-muted-foreground leading-snug text-center pt-1.5">
                  The slope of the Shear Force Diagram (SFD) at any coordinate equals the negative loading intensity.
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2 bg-background/50 border border-border/40 rounded-lg">
                <div className="text-center font-mono py-1 border-b border-border/10">
                  <LatexFormula math="\frac{dM}{dx} = V" />
                </div>
                <span className="text-[10px] text-muted-foreground leading-snug text-center pt-1.5">
                  The slope of the Bending Moment Diagram (BMD) at any coordinate equals the local shear force magnitude.
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Integration & Steps */}
          <div className="p-3 border border-border/40 bg-muted/10 rounded-xl flex flex-col justify-start gap-2">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Integration & Step Changes</span>
            <div className="grid grid-cols-1 gap-2.5 mt-1">
              <div className="flex flex-col gap-1 p-2 bg-background/50 border border-border/40 rounded-lg">
                <div className="text-center font-mono py-1 border-b border-border/10">
                  <LatexFormula math="\Delta V = -\int w \, dx" />
                </div>
                <span className="text-[10px] text-muted-foreground leading-snug text-center pt-1.5">
                  The shear difference between two coordinates is the integrated area of the load diagram.
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2 bg-background/50 border border-border/40 rounded-lg">
                <div className="text-center font-mono py-1 border-b border-border/10">
                  <LatexFormula math="\Delta M = \int V \, dx" />
                </div>
                <span className="text-[10px] text-muted-foreground leading-snug text-center pt-1.5">
                  The moment difference between two coordinates is the integrated area of the shear diagram.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/[0.02] border border-indigo-500/10 p-2.5 rounded-xl text-[10.5px] leading-normal">
          <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">Critical Graphing Guidelines:</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">•</span>}>
              <span>
                Where shear force is zero (<LatexFormula math="V = 0" />), bending moment slope is horizontal (<LatexFormula math="\frac{dM}{dx} = 0" />), denoting a local maximum or minimum.
              </span>
            </SlideBullet>
            <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">•</span>}>
              <span>A point load creates a vertical jump in the SFD, and a point moment creates a vertical jump in the BMD.</span>
            </SlideBullet>
          </div>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default IntegralsAndRelations;
