import React from 'react';
import { MathTextRenderer } from './MathTextRenderer';
import { StepDiagramRenderer, hasDiagram } from './StepDiagramRenderer';
import { Eye, EyeOff } from 'lucide-react';

interface StepRowProps {
  step: string;
  tab: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export const StepRow: React.FC<StepRowProps> = ({ step, tab, isExpanded, onToggle }) => {
  const showToggle = hasDiagram(step);

  return (
    <div className="flex flex-col gap-1.5 border-l-2 border-primary/20 pl-3.5 py-1">
      <div className="flex items-start justify-between gap-3 group">
        <div className="flex-1">
          <MathTextRenderer text={step} />
        </div>
        {showToggle && (
          <button
            onClick={onToggle}
            className="mt-0.5 rounded-md p-1 text-muted-foreground hover:bg-muted/15 hover:text-primary transition-all flex items-center justify-center"
            title={isExpanded ? 'Hide Diagram' : 'Show Diagram'}
          >
            {isExpanded ? (
              <EyeOff className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Eye className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        )}
      </div>

      {showToggle && isExpanded && (
        <div className="mt-1 transition-all duration-200 ease-in-out">
          <StepDiagramRenderer text={step} tab={tab} />
        </div>
      )}
    </div>
  );
};
