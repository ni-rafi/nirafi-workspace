import React from 'react';
import { IDoiPayload } from '../../../../cores/shared/types/step-protocol';

interface DoiStepRendererProps {
  payload: IDoiPayload;
}

export const DoiStepRenderer: React.FC<DoiStepRendererProps> = ({ payload }) => {
  const { dki, nodesCount, restraintsCount, swayDegrees, rotationalDegrees, details } = payload;

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="text-xs font-bold text-primary uppercase tracking-wider">
          Kinematic Indeterminacy (DKI)
        </div>
        <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-extrabold text-primary">
          DKI = {dki}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-background/25 border border-border/30 p-2 text-center">
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Nodes</div>
          <div className="text-lg font-extrabold text-foreground">{nodesCount}</div>
        </div>
        <div className="rounded-lg bg-background/25 border border-border/30 p-2 text-center">
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Restraints</div>
          <div className="text-lg font-extrabold text-foreground">{restraintsCount}</div>
        </div>
        <div className="rounded-lg bg-background/25 border border-border/30 p-2 text-center">
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Rotations</div>
          <div className="text-lg font-extrabold text-foreground">{rotationalDegrees}</div>
        </div>
        <div className="rounded-lg bg-background/25 border border-border/30 p-2 text-center">
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Sways</div>
          <div className="text-lg font-extrabold text-foreground">{swayDegrees}</div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Calculation Details:</div>
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed pl-1">
            <span className="text-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DoiStepRenderer;
