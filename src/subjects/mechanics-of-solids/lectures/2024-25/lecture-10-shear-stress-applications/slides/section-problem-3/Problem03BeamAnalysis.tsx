import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
import { TimberBeamDesignDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/TimberBeamDesignDrawing';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';

import { problem3Config } from '../../problemConfig';

export const Problem03BeamAnalysis: React.FC = () => {
  const solver = React.useMemo(() => new SFDBmdService(), []);
  const beam = React.useMemo(() => problem3Config.beam, []);

  const result = React.useMemo(() => solver.solve(beam), [solver, beam]);
  const maxReactionRy = React.useMemo(() => {
    if (!result.success) return 15;
    return Math.max(...result.reactions.filter(r => r.type === 'R_y').map(r => Math.abs(r.value)));
  }, [result]);

  const V_max_N = maxReactionRy * 1000;

  return (
    <TwoColumnLayout
      title="Span Force Analysis (V_max)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Load Analysis
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To solve the shear stresses, we must analyze the shear force diagram (SFD) of the simply supported beam to find the absolute maximum shear force.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              For a simply supported span under uniform load w, the reactions at each support are equal:
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              R_A = R_B = w * L / 2
            </div>
            <p>
              The maximum shear force occurs at the reaction supports:
            </p>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math={`V_{\\\\max} = \\\\frac{10 \\\\text{ kN/m} \\\\cdot 3 \\\\text{ m}}{2} = ${maxReactionRy.toFixed(1)} \\\\text{ kN} = ${V_max_N.toLocaleString()} \\\\text{ N}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Support Reaction R" value={maxReactionRy.toFixed(1)} unit="kN" />
            <CalculationOutput title="Peak Shear V_max" value={V_max_N.toLocaleString()} unit="N" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Beam Span and Cross Section</span>
          <TimberBeamDesignDrawing />
        </div>
      }
    />
  );
};

export default Problem03BeamAnalysis;
