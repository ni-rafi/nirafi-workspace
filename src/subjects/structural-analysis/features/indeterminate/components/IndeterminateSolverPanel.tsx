import React, { useState, useEffect } from 'react';
import { useFrameWorkspace } from '../../frame-solver/context/FrameWorkspaceContext';
import { solveMDM } from '../../../cores/indeterminate/mdm/mdmSolver';
import { solveSlopeDeflection } from '../../../cores/indeterminate/slope-deflection/sdmSolver';
import { solveForceMethod } from '../../../cores/indeterminate/force-method/forceMethod';
import { IndeterminateStepRenderer } from './interpreters/IndeterminateStepRenderer';
import { Calculator, Play, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from 'lucide-react';
import { IStructuralStep } from '../../../cores/shared/types/step-protocol';

type SolverMethod = 'mdm' | 'sdm' | 'force';

export const IndeterminateSolverPanel: React.FC = () => {
  const { nodes, members, supports, loads, setSelectedElementId } = useFrameWorkspace();

  const [selectedMethod, setSelectedMethod] = useState<SolverMethod>('mdm');
  const [solverResult, setSolverResult] = useState<{ finalMoments: Map<string, { M_ab: number; M_ba: number }>; steps: IStructuralStep[] } | null>(null);
  const [expandedStepIdx, setExpandedStepIdx] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Clear results if topology changes
  useEffect(() => {
    setSolverResult(null);
    setExpandedStepIdx(null);
    setError(null);
  }, [nodes, members, supports, loads]);

  const handleSolve = () => {
    if (nodes.length === 0 || members.length === 0) {
      setError('Please draw nodes and members on the canvas first.');
      return;
    }

    try {
      let result;
      if (selectedMethod === 'mdm') {
        result = solveMDM(nodes, members, supports, loads);
      } else if (selectedMethod === 'sdm') {
        result = solveSlopeDeflection(nodes, members, supports, loads);
      } else {
        result = solveForceMethod(nodes, members, supports, loads);
      }
      setSolverResult(result);
      setError(null);
      setExpandedStepIdx(0); // auto-expand first step
      
      // Highlight elements of first step
      if (result.steps.length > 0) {
        highlightStepElements(result.steps[0]!);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred during calculations. Check supports/boundary conditions.';
      setError(errMsg);
      setSolverResult(null);
    }
  };

  const highlightStepElements = (step: IStructuralStep) => {
    const memberId = step.highlightMembers?.[0];
    const nodeId = step.highlightNodes?.[0];
    if (memberId) {
      setSelectedElementId(memberId);
    } else if (nodeId) {
      setSelectedElementId(nodeId);
    } else {
      setSelectedElementId(null);
    }
  };

  const handleStepClick = (idx: number, step: IStructuralStep) => {
    if (expandedStepIdx === idx) {
      setExpandedStepIdx(null);
      setSelectedElementId(null);
    } else {
      setExpandedStepIdx(idx);
      highlightStepElements(step);
    }
  };

  const readableTypeName = (type: string) => {
    return type
      .replace('FORCE_', 'FORCE: ')
      .replace('MDM_', 'MDM: ')
      .replace('SDM_', 'SDM: ')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card/30 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h3 className="text-base sm:text-lg font-extrabold text-primary">Indeterminate Derivations</h3>
        </div>
        {solverResult && (
          <button
            onClick={() => {
              setSolverResult(null);
              setSelectedElementId(null);
            }}
            className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground transition-all"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Solver</span>
          </button>
        )}
      </div>

      {/* Solver Select Tabs */}
      {!solverResult && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 rounded-lg bg-background/40 p-1 border border-border/50 text-xs font-semibold">
            {(['mdm', 'sdm', 'force'] as const).map(method => {
              const label = method === 'force' ? 'Force Method' : method.toUpperCase();
              const isActive = selectedMethod === method;
              return (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`flex-1 rounded-md py-1.5 transition-all text-center uppercase tracking-wider font-bold ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleSolve}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/95 transition-all shadow-md"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Solve & Inspect Steps</span>
          </button>
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Solved Steps List */}
      {solverResult && (
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {selectedMethod.toUpperCase()} Solving Steps ({solverResult.steps.length}):
          </div>

          <div className="flex flex-col gap-2.5">
            {solverResult.steps.map((step, idx) => {
              const isExpanded = expandedStepIdx === idx;
              return (
                <div
                  key={step.stepId}
                  className={`rounded-xl border transition-all ${
                    isExpanded 
                      ? 'border-primary/30 bg-primary/5 shadow-xs' 
                      : 'border-border/50 bg-background/10 hover:border-border hover:bg-background/25'
                  }`}
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => handleStepClick(idx, step)}
                    className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold"
                  >
                    <div className="flex items-center gap-2 text-foreground/90">
                      <span className="rounded-full bg-primary/10 border border-primary/20 h-5 w-5 flex items-center justify-center text-[10px] text-primary">
                        {idx + 1}
                      </span>
                      <span>{readableTypeName(step.type)}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground opacity-60" />
                    )}
                  </button>

                  {/* Body Content */}
                  {isExpanded && (
                    <div className="px-3.5 pb-4 border-t border-primary/10 pt-3">
                      <IndeterminateStepRenderer step={step} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default IndeterminateSolverPanel;
