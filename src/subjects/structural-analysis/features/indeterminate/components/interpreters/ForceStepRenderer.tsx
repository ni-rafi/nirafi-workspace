import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';
import { 
  IForcePrimaryPayload, 
  IForceCompatibilityPayload 
} from '../../../../cores/shared/types/step-protocol';

interface ForceStepRendererProps {
  type: 'FORCE_PRIMARY_SETUP' | 'FORCE_COMPATIBILITY_SETUP';
  payload: unknown;
}

export const ForceStepRenderer: React.FC<ForceStepRendererProps> = ({ type, payload }) => {
  if (type === 'FORCE_PRIMARY_SETUP') {
    const data = payload as IForcePrimaryPayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="text-xs font-bold text-primary uppercase tracking-wider">
            Primary Determinate Structure Setup
          </div>
          <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-extrabold text-primary">
            DSI = {data.dsi}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Primary Model:</div>
          <div className="text-xs text-foreground/90 font-semibold bg-background/25 border border-border/30 rounded-lg p-2.5">
            {data.primaryStructureDescription}
          </div>
        </div>

        {data.redundantReactions.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Selected Redundant Coordinates:</div>
            <div className="flex flex-col gap-2">
              {data.redundantReactions.map((reac, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono bg-background/10 border border-border/20 px-3 py-1.5 rounded-md">
                  <span className="text-primary font-bold">R_{idx}</span>
                  <span className="text-foreground">{reac.reactionType} at Node {reac.nodeId}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-xs text-emerald-600 font-bold bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
            Structure is statically determinate (DSI = 0). No redundants are needed.
          </div>
        )}
      </div>
    );
  }

  if (type === 'FORCE_COMPATIBILITY_SETUP') {
    const data = payload as IForceCompatibilityPayload;

    const formatMatrix = (mat: number[][]) => {
      return `\\begin{bmatrix} ${mat.map(row => row.map(v => parseFloat(v.toFixed(6))).join(' & ')).join(' \\\\ ') } \\end{bmatrix}`;
    };

    const formatVector = (vec: number[]) => {
      return `\\begin{Bmatrix} ${vec.map(v => parseFloat(v.toFixed(6))).join(' \\\\ ') } \\end{Bmatrix}`;
    };

    const dsi = data.solvedRedundants.length;
    const fLatex = formatMatrix(data.flexibilityMatrix);
    const d0Latex = formatVector(data.displacementVector0);
    const rLabels = `\\begin{Bmatrix} ${Array.from({ length: dsi }, (_, i) => `R_{${i}}`).join(' \\\\ ') } \\end{Bmatrix}`;
    const RHSLatex = formatVector(data.displacementVector0.map(d => -d));

    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
        <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
          Compatibility Equations
        </div>

        <div className="flex flex-col gap-3 overflow-x-auto py-2">
          <div className="text-xs text-muted-foreground font-semibold">{"Compatibility: \\([f]\\{R\\} + \\{\\Delta_0\\} = 0 \\implies [f]\\{R\\} = \\{-\\Delta_0\\}\\):"}</div>
          <div className="flex justify-center my-2 select-text">
            <LatexFormula math={`${fLatex} \\times ${rLabels} = ${RHSLatex}`} block />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/30 pt-3">
          <div className="text-xs font-bold text-primary uppercase tracking-wider">{"Displacement Vector \\(\\{\\Delta_0\\}\\):"}</div>
          <div className="flex justify-center my-1 select-text">
            <LatexFormula math={`\\{\\Delta_0\\} = ${d0Latex}`} block />
          </div>
        </div>

        {dsi > 0 && (
          <div className="flex flex-col gap-2 border-t border-border/30 pt-3">
            <div className="text-xs font-bold text-foreground/90">Solved Redundant Reactions:</div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {data.solvedRedundants.map((val, idx) => (
                <div key={idx} className="rounded-md bg-background/25 border border-border/30 p-2 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-primary">R_{idx}:</span>
                  <span className="font-bold text-foreground">{val.toFixed(3)} kN</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
export default ForceStepRenderer;
