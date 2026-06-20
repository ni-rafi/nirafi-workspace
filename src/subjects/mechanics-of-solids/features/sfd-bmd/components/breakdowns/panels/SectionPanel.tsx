import React from 'react';
import { StepListHeader } from '../StepListHeader';
import { StepRow } from '../StepRow';

interface SectionPanelProps {
  sectionSteps: string[];
  expandedDiagrams: Record<string, boolean>;
  setExpandedDiagrams: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const SectionPanel: React.FC<SectionPanelProps> = ({
  sectionSteps,
  expandedDiagrams,
  setExpandedDiagrams,
}) => {
  return (
    <div id="breakdown-section" className="flex flex-col gap-3">
      <StepListHeader
        title="Interval Equations cut segments"
        steps={sectionSteps}
        tab="section"
        expandedDiagrams={expandedDiagrams}
        setExpandedDiagrams={setExpandedDiagrams}
      />
      <div className="flex flex-col gap-2.5">
        {sectionSteps.map((step, idx) => (
          <StepRow
            key={idx}
            step={step}
            tab="section"
            stepIndex={idx}
            allSteps={sectionSteps}
            isExpanded={!!expandedDiagrams[`section-${idx}`]}
            onToggle={() =>
              setExpandedDiagrams(prev => ({
                ...prev,
                [`section-${idx}`]: !prev[`section-${idx}`],
              }))
            }
          />
        ))}
      </div>
    </div>
  );
};
