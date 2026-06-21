import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';
import { 
  ISdmEquationsPayload, 
  ISdmEquilibriumPayload 
} from '../../../../cores/shared/types/step-protocol';

interface SdmStepRendererProps {
  type: 'SDM_EQUATIONS_SETUP' | 'SDM_EQUILIBRIUM_SETUP';
  payload: unknown;
}

export const SdmStepRenderer: React.FC<SdmStepRendererProps> = ({ type, payload }) => {
  if (type === 'SDM_EQUATIONS_SETUP') {
    const data = payload as ISdmEquationsPayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
        <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
          Slope-Deflection Member-End Equations
        </div>
        <div className="flex flex-col gap-3.5">
          {data.equations.map((eq) => (
            <div key={eq.memberId} className="rounded-lg bg-background/25 border border-border/30 p-3 flex flex-col gap-2">
              <div className="text-[10px] text-primary font-bold uppercase tracking-wider">Member: {eq.memberId}</div>
              <div className="flex flex-col gap-2 pl-2 select-text">
                <LatexFormula math={eq.equations.nearEnd} block />
                <LatexFormula math={eq.equations.farEnd} block />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'SDM_EQUILIBRIUM_SETUP') {
    const data = payload as ISdmEquilibriumPayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
        <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
          Joint Moment Equilibrium Equations (\(\sum M = 0\))
        </div>
        <div className="flex flex-col gap-3">
          {data.equations.map((eq) => (
            <div key={eq.nodeId} className="rounded-lg bg-background/25 border border-border/30 p-3 flex flex-col gap-2 select-text">
              <div className="text-[10px] text-primary font-bold uppercase tracking-wider">Joint {eq.nodeId}:</div>
              <div className="pl-1">
                <LatexFormula math={eq.equation} block />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
export default SdmStepRenderer;
