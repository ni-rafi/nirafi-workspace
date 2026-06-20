import React, { useState } from 'react';
import { useBeamEngine } from '../../hooks/useBeamEngine';
import { MathTextRenderer } from './DOIBreakdown';

export const MethodSolverBreakdown: React.FC = () => {
  const { solverResult } = useBeamEngine();
  const [activeTab, setActiveTab] = useState<'section' | 'graphical'>('section');

  if (!solverResult.success) return null;

  const steps = activeTab === 'section' ? solverResult.sectionSteps : solverResult.graphicalSteps;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/30 p-5 backdrop-blur-md">
      <div className="flex flex-col gap-3 border-b border-border/60 pb-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-primary">Internal Forces & Diagrams Calculations</h3>
          <p className="text-[10px] text-muted-foreground">Detailed analytical steps used to construct the diagrams</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-1 rounded-lg bg-muted/30 p-1 border border-border/60">
          <button
            onClick={() => setActiveTab('section')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'section'
                ? 'bg-background text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Section Method
          </button>
          <button
            onClick={() => setActiveTab('graphical')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'graphical'
                ? 'bg-background text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Graphical Method
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-xs text-foreground/80">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3.5 py-1">
            <MathTextRenderer text={step} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MethodSolverBreakdown;
