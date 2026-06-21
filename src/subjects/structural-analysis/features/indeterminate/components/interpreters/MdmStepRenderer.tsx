import React from 'react';
import { 
  IMdmDfSetupPayload, 
  IMdmCyclePayload, 
  IMdmFinalMomentsPayload 
} from '../../../../cores/shared/types/step-protocol';

interface MdmStepRendererProps {
  type: 'MDM_DF_SETUP' | 'MDM_CYCLE' | 'MDM_FINAL_MOMENTS';
  payload: unknown;
}

export const MdmStepRenderer: React.FC<MdmStepRendererProps> = ({ type, payload }) => {
  if (type === 'MDM_DF_SETUP') {
    const data = payload as IMdmDfSetupPayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-3">
        <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
          Joint Distribution Factors (DF)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-bold">
                <th className="py-2 px-3">Joint</th>
                <th className="py-2 px-3">Member</th>
                <th className="py-2 px-3">Far End</th>
                <th className="py-2 px-3">Stiffness (k)</th>
                <th className="py-2 px-3 text-right">DF</th>
              </tr>
            </thead>
            <tbody>
              {data.joints.map((joint) => 
                joint.members.map((member, idx) => (
                  <tr key={`${joint.nodeId}-${member.memberId}`} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="py-2 px-3 font-semibold">{idx === 0 ? joint.nodeId : ''}</td>
                    <td className="py-2 px-3 font-mono">{member.memberId}</td>
                    <td className="py-2 px-3 text-[10px] uppercase font-bold text-muted-foreground/80">{member.farEndCondition}</td>
                    <td className="py-2 px-3 font-mono">{member.stiffness.toFixed(3)}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-primary">{member.df.toFixed(3)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'MDM_CYCLE') {
    const data = payload as IMdmCyclePayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="text-xs font-bold text-primary uppercase tracking-wider">
            MDM Iteration: Cycle {data.cycleIndex + 1}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-foreground/90">1. Joint Moment Balancing</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.balances.map((bal) => (
              <div key={bal.nodeId} className="rounded-lg bg-background/20 border border-border/30 p-2.5 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-border/20 pb-1 text-xs">
                  <span className="font-bold text-primary">Joint {bal.nodeId}</span>
                  <span className="font-mono text-muted-foreground">Unbalance: {bal.unbalancedMoment.toFixed(3)} kNm</span>
                </div>
                <div className="flex flex-col gap-1">
                  {bal.distributions.map((dist) => (
                    <div key={dist.memberId} className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">{dist.memberId}:</span>
                      <span className="font-bold text-foreground">{dist.distributedMoment.toFixed(3)} kNm</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.carryOvers.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border/30 pt-3">
            <div className="text-xs font-bold text-foreground/90">2. Member Moment Carry-Overs (CO)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.carryOvers.map((co, idx) => (
                <div key={idx} className="rounded-md bg-background/10 border border-border/20 p-2 flex flex-col gap-1 text-[11px] font-mono">
                  <div className="text-muted-foreground text-[10px] uppercase font-bold">CO from {co.fromNodeId} to {co.toNodeId}</div>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground">{co.fromMemberId}:</span>
                    <span className="font-bold text-primary">{co.moment.toFixed(3)} kNm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'MDM_FINAL_MOMENTS') {
    const data = payload as IMdmFinalMomentsPayload;
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-xs flex flex-col gap-3">
        <div className="text-xs font-bold text-primary uppercase tracking-wider border-b border-border/40 pb-2">
          Final Superposed Member End Moments
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-bold">
                <th className="py-2 px-3">Member</th>
                <th className="py-2 px-3 text-right">Start Moment (M_ab)</th>
                <th className="py-2 px-3 text-right">End Moment (M_ba)</th>
              </tr>
            </thead>
            <tbody>
              {data.memberEndMoments.map((mom) => (
                <tr key={mom.memberId} className="border-b border-border/20 hover:bg-muted/10 font-mono">
                  <td className="py-2 px-3 font-semibold text-foreground">{mom.memberId}</td>
                  <td className="py-2 px-3 text-right text-destructive font-bold">{mom.startMoment.toFixed(3)} kNm</td>
                  <td className="py-2 px-3 text-right text-emerald-600 font-bold">{mom.endMoment.toFixed(3)} kNm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
export default MdmStepRenderer;
