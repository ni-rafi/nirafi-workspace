import { useMemo } from 'react';
import { useBeamWorkspace } from '../context/BeamWorkspaceContext';
import { SFDBmdService } from '@/cores/mechanics-of-solids/sfd-bmd/sfdBmdService';
import { ISolverOutput } from '@/cores/mechanics-of-solids/sfd-bmd/types';

export const useBeamEngine = (): { solverResult: ISolverOutput } => {
  const { length, supports, releases, loads } = useBeamWorkspace();

  const solverResult = useMemo(() => {
    const service = new SFDBmdService();
    return service.solve({
      length,
      supports,
      releases,
      loads,
    });
  }, [length, supports, releases, loads]);

  return { solverResult };
};
