import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
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
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
              Structural Sizing Solution
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We apply the solid rectangular shear stress criterion to find the minimum width requirement:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Set up allowable stress inequality:**
            </SlideParagraph>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              τ_max = 1.5 * V_max / (b * h) ≤ τ_allow
            </div>
            
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Substitute values (in N and mm):**
            </SlideParagraph>
            <div className="font-mono text-[10px] text-foreground bg-muted/20 p-1 rounded border border-border/40">
              1.5 * {V_max_N.toLocaleString()} / (b * {h_mm}) ≤ {tau_allow.toFixed(1)} N/mm²
              <br />
              {(1.5 * V_max_N).toLocaleString()} / ({h_mm} * b) ≤ {tau_allow.toFixed(1)}  ⇒  {(1.5 * V_max_N / h_mm).toFixed(1)} / b ≤ {tau_allow.toFixed(1)}
            </div>

            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Solve for minimum required width b:**
            </SlideParagraph>
            <div className="py-2 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
              <LatexFormula math={`b \\ge ${b_min.toFixed(2)} \\text{ mm}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Allowable Stress" value={tau_allow.toFixed(2)} unit="MPa" />
            <CalculationOutput title="Min Width b" value={b_min.toFixed(2)} unit="mm" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Beam Span and Cross Section</span>
          <TimberBeamDesignDrawing currentClick={3} />
        </div>
      }
    />
  );
};

export default Problem03SizingDesign;
