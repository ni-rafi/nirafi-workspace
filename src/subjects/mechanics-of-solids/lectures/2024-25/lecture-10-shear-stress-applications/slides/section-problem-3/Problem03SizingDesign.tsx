import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TimberBeamDesignDrawing } from './drawings/TimberBeamDesignDrawing';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { problem3Config } from '../../problemConfig';

export const Problem03SizingDesign: React.FC = () => {
  const solver = React.useMemo(() => new SFDBmdService(), []);
  const beam = React.useMemo(() => problem3Config.beam, []);

  const result = React.useMemo(() => solver.solve(beam), [solver, beam]);
  const maxReactionRy = React.useMemo(() => {
    if (!result.success) return 15;
    return Math.max(...result.reactions.filter(r => r.type === 'R_y').map(r => Math.abs(r.value)));
  }, [result]);

  const V_max_N = maxReactionRy * 1000;
  const { h_mm, tau_allow } = problem3Config;
  const b_min = (1.5 * V_max_N) / (h_mm * tau_allow);

  return (
    <TwoColumnLayout
      title="Sizing Design via Rectangular Criterion"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left select-text">
          <div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
              Structural Sizing Solution
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We apply the solid rectangular shear stress criterion to find the minimum width requirement:
            </SlideParagraph>
          </div>

          <div className="space-y-3 text-[11px] text-muted-foreground">
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Step 1: Set up allowable stress inequality
              </SlideParagraph>
              <div className="py-1 text-center bg-muted/30 border border-border/40 rounded">
                <LatexFormula math="\tau_{\max} = \frac{1.5 \cdot V_{\max}}{b \cdot h} \le \tau_{\text{allow}}" />
              </div>
            </div>
            
            <ClickReveal at={1}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 2: Substitute values (in N and mm)
                </SlideParagraph>
                <div className="py-1 px-2.5 text-center bg-muted/30 border border-border/40 rounded font-mono text-[10px]">
                  <LatexFormula math={`\\frac{1.5 \\cdot ${V_max_N.toLocaleString()}}{b \\cdot ${h_mm}} \\le ${tau_allow.toFixed(1)}\\text{ N/mm}^2`} />
                  <br />
                  <LatexFormula math={`\\frac{${(1.5 * V_max_N).toLocaleString()}}{${h_mm} \\cdot b} \\le ${tau_allow.toFixed(1)} \\implies \\frac{${(1.5 * V_max_N / h_mm).toFixed(1)}}{b} \\le ${tau_allow.toFixed(1)}`} />
                </div>
              </div>
            </ClickReveal>

            <ClickReveal at={2}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 3: Solve for minimum required width <LatexFormula math="b" />
                </SlideParagraph>
                <div className="py-2 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500 font-extrabold text-[12px] w-full">
                  <ClickHighlight variant="paint" at={3} className="inline-block font-extrabold text-[12px]">
                    <LatexFormula math={`b \\ge ${b_min.toFixed(2)}\\text{ mm}`} />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Allowable Stress" value={tau_allow.toFixed(2)} unit="MPa" variant="compact" />
            <ClickReveal at={2} className="w-full">
              <CalculationOutput title="Min Width b" value={b_min.toFixed(2)} unit="mm" variant="compact" />
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <TimberBeamDesignDrawing currentClick={3} />
      }
    />
  );
};

export default Problem03SizingDesign;
