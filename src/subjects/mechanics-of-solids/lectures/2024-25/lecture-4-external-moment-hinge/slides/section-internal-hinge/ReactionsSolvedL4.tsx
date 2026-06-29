import React from 'react';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';
import {
  SlideParagraph,
  SlideBullet,
  LatexFormula,
} from '@/features/presentation/components/elements';
import { HingeBeamDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/HingeBeamDrawing';

export const ReactionsSolvedL4: React.FC = () => {
  return (
    <TwoRowLayout
      title="Solved Support Reactions Summary"
      topHeight="40%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <HingeBeamDrawing mode="solved" />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-text text-left text-xs leading-relaxed">
          <div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
              Verified Solutions
            </span>
            <h4 className="text-sm font-bold text-foreground">Completed Reaction Boundary Values</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Reaction analysis is complete. The values on the right satisfy equilibrium across all segments:
            </SlideParagraph>
            
            <div className="space-y-1.5 mt-3">
              <SlideBullet text="All segments satisfy force and moment equilibrium." />
              <SlideBullet text="Next, we will solve the internal shear and bending moment interval equations." />
            </div>
          </div>

          <div className="md:border-l border-border/20 md:pl-6 flex flex-col justify-center">
            <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground">Fixed Support Vertical Reaction:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math={"A_y = 9.40 \\text{ kN}"} />
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-border/10">
                <span className="font-semibold text-foreground">Fixed Support Moment Couple Reaction:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math={"M_A = 20.53 \\text{ kNm}"} />
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-border/10">
                <span className="font-semibold text-foreground">Right Roller Vertical Reaction:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <LatexFormula math={"B_y = 2.50 \\text{ kN}"} />
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ReactionsSolvedL4;
