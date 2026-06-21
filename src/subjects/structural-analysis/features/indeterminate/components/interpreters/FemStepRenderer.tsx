import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';
import { IFemPayload } from '../../../../cores/shared/types/step-protocol';

interface FemStepRendererProps {
  payload: IFemPayload;
}

export const FemStepRenderer: React.FC<FemStepRendererProps> = ({ payload }) => {
  const { memberId, loadType, variables, results } = payload;
  const { w, P, a, b, L, delta, E, I } = variables;
  const { M_ab, M_ba } = results;

  const renderFormula = () => {
    switch (loadType) {
      case 'UDL_FULL':
        return (
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="text-muted-foreground">Formula:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{w L^2}{12}, \\quad FEM_{ba} = \\frac{w L^2}{12}`} block />
            <div className="text-muted-foreground mt-2">Substitution:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{${w} \\times ${L}^2}{12} = ${M_ab} \\text{ kNm}`} block />
            <LatexFormula math={`FEM_{ba} = \\frac{${w} \\times ${L}^2}{12} = ${M_ba} \\text{ kNm}`} block />
          </div>
        );
      case 'POINT_CENTER':
        return (
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="text-muted-foreground">Formula:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{P L}{8}, \\quad FEM_{ba} = \\frac{P L}{8}`} block />
            <div className="text-muted-foreground mt-2">Substitution:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{${P} \\times ${L}}{8} = ${M_ab} \\text{ kNm}`} block />
            <LatexFormula math={`FEM_{ba} = \\frac{${P} \\times ${L}}{8} = ${M_ba} \\text{ kNm}`} block />
          </div>
        );
      case 'POINT_ANY':
        return (
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="text-muted-foreground">Formula:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{P a b^2}{L^2}, \\quad FEM_{ba} = \\frac{P a^2 b}{L^2}`} block />
            <div className="text-muted-foreground mt-2">Substitution:</div>
            <LatexFormula math={`FEM_{ab} = -\\frac{${P} \\times ${a} \\times ${b}^2}{${L}^2} = ${M_ab} \\text{ kNm}`} block />
            <LatexFormula math={`FEM_{ba} = \\frac{${P} \\times ${a}^2 \\times ${b}}{${L}^2} = ${M_ba} \\text{ kNm}`} block />
          </div>
        );
      case 'SETTLEMENT':
        return (
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="text-muted-foreground">Formula (Support Settlement):</div>
            <LatexFormula math={`FEM_{ab} = FEM_{ba} = \\frac{6 E I \\Delta}{L^2}`} block />
            <div className="text-muted-foreground mt-2">Substitution:</div>
            <LatexFormula math={`FEM_{ab} = FEM_{ba} = \\frac{6 \\times (${E} \\times 10^3) \\times (${I} \\times 10^{-6}) \\times (${delta})}{${L}^2} = ${M_ab} \\text{ kNm}`} block />
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-1 font-mono text-xs">
            <div className="text-muted-foreground">Results:</div>
            <LatexFormula math={`FEM_{ab} = ${M_ab} \\text{ kNm}`} block />
            <LatexFormula math={`FEM_{ba} = ${M_ba} \\text{ kNm}`} block />
          </div>
        );
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="text-xs font-bold text-primary uppercase tracking-wider">
          Fixed-End Moments: Member {memberId}
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase">
          {loadType.replace('_', ' ')}
        </span>
      </div>
      <div className="text-xs text-muted-foreground leading-relaxed">
        {`Span Length \\(L = ${L}\\) m. Given properties: \\(E = ${E ?? 200}\\) GPa, \\(I = ${I ?? 100} \\times 10^6 \\text{ mm}^4\\).`}
      </div>
      <div className="bg-background/25 rounded-lg p-3 border border-border/30">
        {renderFormula()}
      </div>
    </div>
  );
};
export default FemStepRenderer;
