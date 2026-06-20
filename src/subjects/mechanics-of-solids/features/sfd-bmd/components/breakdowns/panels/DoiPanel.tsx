import React from 'react';
import { StepListHeader } from '../StepListHeader';
import { StepRow } from '../StepRow';

interface DoiPanelProps {
  doiResult: {
    isUnstable: boolean;
    isDeterminate: boolean;
    doi: number;
    explanationSteps: string[];
  };
  expandedDiagrams: Record<string, boolean>;
  setExpandedDiagrams: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  alertClass: string;
  alertTitle: string;
}

export const DoiPanel: React.FC<DoiPanelProps> = ({
  doiResult,
  expandedDiagrams,
  setExpandedDiagrams,
  alertClass,
  alertTitle,
}) => {
  return (
    <div id="breakdown-doi" className="flex flex-col gap-3">
      <StepListHeader
        title="Static Restraints Analysis"
        steps={doiResult.explanationSteps}
        tab="doi"
        expandedDiagrams={expandedDiagrams}
        setExpandedDiagrams={setExpandedDiagrams}
        rightElement={
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${alertClass}`}>
            {alertTitle} (DOI = {doiResult.doi})
          </span>
        }
      />
      <div className="flex flex-col gap-2.5">
        {doiResult.explanationSteps.map((step, idx) => (
          <StepRow
            key={idx}
            step={step}
            tab="doi"
            isExpanded={!!expandedDiagrams[`doi-${idx}`]}
            onToggle={() =>
              setExpandedDiagrams(prev => ({
                ...prev,
                [`doi-${idx}`]: !prev[`doi-${idx}`],
              }))
            }
          />
        ))}
      </div>
    </div>
  );
};
