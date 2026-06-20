import { IBeam, ISolverOutput } from './types';

export interface ISFDBmdService {
  solve(beam: IBeam): ISolverOutput;
}
