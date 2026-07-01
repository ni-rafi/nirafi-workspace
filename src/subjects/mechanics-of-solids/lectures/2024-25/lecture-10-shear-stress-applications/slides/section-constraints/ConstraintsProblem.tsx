import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { StressBalanceScaleDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/StressBalanceScaleDrawing';
import { problem2Config } from '../../problemConfig';

export const ConstraintsProblem: React.FC = () => {
  const { shape } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const H_m = shape.height ?? 0.3;
  
  // Calculate first moment of area at N.A. (y = 0)
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, 0, props);
  
  const Q_max_mm3 = statQ.Q * 1e9;
  const t_web_mm = (shape.thicknessWeb ?? 0.05) * 1000;
  
  // Distances to extreme fibers
  const c_top_mm = (H_m - props.centroid) * 1000;
  const c_bot_mm = props.centroid * 1000;
  const c_max_mm = Math.max(c_top_mm, c_bot_mm);
  
  // Solve for L using the constraint: σ_max = 4 * τ_max
  // For cantilever with tip load P: M_max = P * L, V_max = P
  // σ_max = P * L * c_max / I
  // τ_max = P * Q_max / (I * t_web)
  // P * L * c_max / I = 4 * P * Q_max / (I * t_web)
  // L = 4 * Q_max / (t_web * c_max)
  const L_mm = (4 * Q_max_mm3) / (t_web_mm * c_max_mm);
  const L_m = L_mm / 1000;

  return (
    <TwoColumnLayout
      title="Interdependent Bending-Shear Optimization"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Multi-variable boundary design
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              In real structures, normal and shearing stresses act simultaneously. Consider a cantilever beam of length L under a tip load P, made of the unsymmetric I-section from Problem 2. Determine L such that the peak normal stress is exactly four times the peak shear stress:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Mathematical Relationship:</h4>
            <div className="py-1 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math="L = \\frac{4 \\cdot Q_{\\max}}{t_{\\text{web}} \\cdot c_{\\max}}" />
            </div>
            <p>
              **Properties used in calculation:**
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Peak Statical Moment: Q_max = {Q_max_mm3.toLocaleString()} mm³</li>
              <li>Web thickness: t_web = {t_web_mm.toFixed(0)} mm</li>
              <li>Farthest fiber from N.A.: c_max = {c_max_mm.toFixed(1)} mm (top fiber)</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Limit Ratio" value="σ = 4τ" unit="" />
            <CalculationOutput title="Optimal Length L" value={L_m.toFixed(3)} unit="m" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Simultaneous Failure Criterion</span>
          <StressBalanceScaleDrawing />
        </div>
      }
    />
  );
};

export default ConstraintsProblem;
