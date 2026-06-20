import React from 'react';
import { StepListHeader } from '../StepListHeader';
import { StepRow } from '../StepRow';

interface GraphicalPanelProps {
  graphicalSteps: string[];
  expandedDiagrams: Record<string, boolean>;
  setExpandedDiagrams: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const GraphicalPanel: React.FC<GraphicalPanelProps> = ({
  graphicalSteps,
  expandedDiagrams,
  setExpandedDiagrams,
}) => {
  return (
    <div id="breakdown-graphical" className="flex flex-col gap-3">
      <StepListHeader
        title="Curvatures integration & shear jumps"
        steps={graphicalSteps}
        tab="graphical"
        expandedDiagrams={expandedDiagrams}
        setExpandedDiagrams={setExpandedDiagrams}
      />
      <div className="flex flex-col gap-2.5">
        {graphicalSteps.map((step, idx) => (
          <StepRow
            key={idx}
            step={step}
            tab="graphical"
            stepIndex={idx}
            allSteps={graphicalSteps}
            isExpanded={!!expandedDiagrams[`graphical-${idx}`]}
            onToggle={() =>
              setExpandedDiagrams(prev => ({
                ...prev,
                [`graphical-${idx}`]: !prev[`graphical-${idx}`],
              }))
            }
          />
        ))}
      </div>
    </div>
  );
};
