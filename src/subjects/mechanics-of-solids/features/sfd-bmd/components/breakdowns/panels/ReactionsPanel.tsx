import React from 'react';
import { StepListHeader } from '../StepListHeader';
import { StepRow } from '../StepRow';

interface ReactionsPanelProps {
  reactionSteps: string[];
  expandedDiagrams: Record<string, boolean>;
  setExpandedDiagrams: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const ReactionsPanel: React.FC<ReactionsPanelProps> = ({
  reactionSteps,
  expandedDiagrams,
  setExpandedDiagrams,
}) => {
  return (
    <div id="breakdown-reactions" className="flex flex-col gap-3">
      <StepListHeader
        title="Equilibrium Equations solver"
        steps={reactionSteps}
        tab="reactions"
        expandedDiagrams={expandedDiagrams}
        setExpandedDiagrams={setExpandedDiagrams}
      />
      <div className="flex flex-col gap-2.5">
        {reactionSteps.map((step, idx) => (
          <StepRow
            key={idx}
            step={step}
            tab="reactions"
            stepIndex={idx}
            allSteps={reactionSteps}
            isExpanded={!!expandedDiagrams[`reactions-${idx}`]}
            onToggle={() =>
              setExpandedDiagrams(prev => ({
                ...prev,
                [`reactions-${idx}`]: !prev[`reactions-${idx}`],
              }))
            }
          />
        ))}
      </div>
    </div>
  );
};
