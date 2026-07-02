import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TimberBeamDesignDrawing } from './drawings/TimberBeamDesignDrawing';
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
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left select-text">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Load Analysis
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To solve the shear stresses, we must analyze the shear force diagram (SFD) of the simply supported beam to find the absolute maximum shear force.
            </SlideParagraph>
          </div>

          <div className="space-y-3 text-[11px] text-muted-foreground">
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Step 1: Span Reaction Force <LatexFormula math="w \cdot L / 2" />
              </SlideParagraph>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground mb-1">
                For a simply supported span under uniform load <LatexFormula math="w" />, the reactions at each support are equal:
              </SlideParagraph>
              <div className="py-1 text-center bg-muted/30 border border-border/40 rounded">
                <LatexFormula math="R_A = R_B = \frac{w \cdot L}{2}" />
              </div>
            </div>

            <ClickReveal at={1}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 2: Solve Maximum Shear Force <LatexFormula math="V_{\max}" />
                </SlideParagraph>
                <SlideParagraph variant="plain" className="text-xs text-muted-foreground mb-1">
                  The maximum shear force occurs at the reaction supports:
                </SlideParagraph>
                <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px]">
                  <ClickHighlight variant="paint" at={2} className="inline-block font-extrabold text-[12px]">
                    <LatexFormula math={`V_{\\max} = \\frac{10\\text{ kN/m} \\cdot 3\\text{ m}}{2} = ${maxReactionRy.toFixed(1)}\\text{ kN} = ${V_max_N.toLocaleString()}\\text{ N}`} />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ClickReveal at={1} className="w-full">
              <CalculationOutput title="Support Reaction R" value={maxReactionRy.toFixed(1)} unit="kN" variant="compact" />
            </ClickReveal>
            <ClickReveal at={2} className="w-full">
              <CalculationOutput title="Peak Shear V_max" value={V_max_N.toLocaleString()} unit="N" variant="compact" />
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <TimberBeamDesignDrawing currentClick={1} />
      }
    />
  );
};

export default Problem03BeamAnalysis;
