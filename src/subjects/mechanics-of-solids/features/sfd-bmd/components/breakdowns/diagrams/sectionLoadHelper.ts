import { ISupport, ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { computeActiveLoads } from './helpers/sectionLoadsCentroids';
import { formatNumber } from './helpers/sectionLoadsFormatter';

export interface IActiveReactionVisual {
  supportId: string;
  letter: string;
  position: number;
  label: string;
}

export interface IActiveLoadVisual {
  id: string;
  type: 'point' | 'udl' | 'uvl' | 'moment';
  label: string;
  magnitude: number;
  centroidX: number;
  isUpward: boolean;
  armLabel: string;
}

export function processSectionForces(
  supports: ISupport[],
  loads: ILoad[],
  cutX: number,
  length: number,
  isMoment: boolean
) {
  const sortedSupports = [...supports].sort((a, b) => a.position - b.position);

  // 1. Determine activeSide based on complexity (reactions + loads)
  const leftReactionsCount = supports.filter(s => s.position < cutX - 1e-5).length;
  const rightReactionsCount = supports.filter(s => s.position > cutX + 1e-5).length;

  const leftLoadsCount = loads.filter(l => {
    if (l.type === 'point' || l.type === 'moment') {
      return l.position !== undefined && l.position < cutX - 1e-5;
    }
    return l.startPosition !== undefined && l.startPosition < cutX - 1e-5;
  }).length;

  const rightLoadsCount = loads.filter(l => {
    if (l.type === 'point' || l.type === 'moment') {
      return l.position !== undefined && l.position > cutX + 1e-5;
    }
    return l.endPosition !== undefined && l.endPosition > cutX + 1e-5;
  }).length;

  const totalLeft = leftReactionsCount + leftLoadsCount;
  const totalRight = rightReactionsCount + rightLoadsCount;

  // Select side with fewer elements (default to left if equal)
  const activeSide: 'left' | 'right' = totalRight < totalLeft ? 'right' : 'left';

  // 2. Identify active support reactions
  const activeReactions: IActiveReactionVisual[] = [];
  sortedSupports.forEach((s, idx) => {
    const letter = String.fromCharCode(65 + idx);
    if (activeSide === 'left') {
      if (s.position < cutX - 1e-5) {
        activeReactions.push({
          supportId: s.id,
          letter,
          position: s.position,
          label: `R_{y${letter}}`,
        });
      }
    } else {
      if (s.position > cutX + 1e-5) {
        activeReactions.push({
          supportId: s.id,
          letter,
          position: s.position,
          label: `R_{y${letter}}`,
        });
      }
    }
  });

  // 3. Identify active loads
  const activeLoadVisuals = computeActiveLoads(loads, activeSide, cutX, length);

  // 4. Filter and sort targets for dimension lines
  const dimTargets: { x: number; label: string }[] = [];
  if (isMoment) {
    activeReactions.forEach(r => {
      const arm = Math.abs(cutX - r.position);
      if (arm > 0.05) {
        const label = activeSide === 'left'
          ? (r.position === 0 ? 'x' : `x - ${formatNumber(r.position)}`)
          : (r.position === length ? `${formatNumber(length)} - x` : `${formatNumber(r.position)} - x`);
        dimTargets.push({ x: r.position, label });
      }
    });

    activeLoadVisuals.forEach(l => {
      const arm = Math.abs(cutX - l.centroidX);
      if (arm > 0.05 && l.type !== 'moment' && l.armLabel) {
        dimTargets.push({ x: l.centroidX, label: l.armLabel });
      }
    });

    dimTargets.sort((a, b) => Math.abs(a.x - cutX) - Math.abs(b.x - cutX));
  }

  return {
    activeSide,
    activeReactions,
    activeLoadVisuals,
    dimTargets,
  };
}
