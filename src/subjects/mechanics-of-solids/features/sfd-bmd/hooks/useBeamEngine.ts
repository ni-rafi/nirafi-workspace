import { useMemo } from 'react';
import { useBeamWorkspace } from '../context/BeamWorkspaceContext';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { DeflectionService } from '@/subjects/mechanics-of-solids/cores/deflection/deflectionService';
import { ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { IDeflectionResult } from '@/subjects/mechanics-of-solids/cores/deflection/types';

export const useBeamEngine = (): {
  solverResult: ISolverOutput;
  deflectionResult: IDeflectionResult;
} => {
  const { length, supports, releases, loads, eiSegments, deflMethod, customInspectX } = useBeamWorkspace();

  const solverResult = useMemo(() => {
    const service = new SFDBmdService();
    return service.solve({
      length,
      supports,
      releases,
      loads,
    });
  }, [length, supports, releases, loads]);

  const deflectionResult = useMemo(() => {
    const service = new DeflectionService();
    if (!solverResult.success) {
      return {
        success: false,
        points: [],
        criticalPoints: [],
        steps: ['Solver is halted: supports must be stable and determinate.']
      };
    }
    return service.calculateDeflection(
      { length, supports, releases, loads },
      solverResult.reactions,
      solverResult.intervals,
      eiSegments,
      deflMethod,
      customInspectX
    );
  }, [length, supports, releases, loads, solverResult, eiSegments, deflMethod, customInspectX]);

  return { solverResult, deflectionResult };
};
