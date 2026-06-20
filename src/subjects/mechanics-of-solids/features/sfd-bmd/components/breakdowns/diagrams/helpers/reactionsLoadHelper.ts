import { ISupport, ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export interface IActiveReactionVisual {
  supportId: string;
  letter: string;
  position: number;
  label: string;
  isPivot: boolean;
}

export interface IActiveLoadVisual {
  id: string;
  type: 'point' | 'udl' | 'uvl' | 'moment';
  label: string;
  magnitude: number;
  centroidX: number;
  isUpward: boolean;
}

export function processReactionsForces(
  text: string,
  supports: ISupport[],
  loads: ILoad[]
) {
  const trimmed = text.trim();
  const sortedSupports = [...supports].sort((a, b) => a.position - b.position);

  let pivotPos: number | null = null;
  let isMomentEquation = false;
  let isLeftOnly = false;
  let isRightOnly = false;

  // Detect equation type and pivot/cut point
  if (
    trimmed.toLowerCase().includes('moment') ||
    trimmed.toLowerCase().includes('m_{') ||
    trimmed.toLowerCase().includes('m_') ||
    trimmed.toLowerCase().includes('m_{\\text{left') ||
    trimmed.toLowerCase().includes('m_{\\text{right')
  ) {
    isMomentEquation = true;
  }

  if (trimmed.toLowerCase().includes('left')) {
    isLeftOnly = true;
  }
  if (trimmed.toLowerCase().includes('right')) {
    isRightOnly = true;
  }

  if (isMomentEquation) {
    const relMatch = trimmed.match(/(?:hinge|roller)\s+at\s+\$x\s*=\s*([\d.]+)/i);
    if (relMatch && relMatch[1]) {
      pivotPos = parseFloat(relMatch[1]);
    } else if (trimmed.includes('x=0') || trimmed.includes('x = 0') || trimmed.includes('x_{0}') || trimmed.includes('x=0\\text')) {
      pivotPos = 0;
    } else {
      if (trimmed.includes('M_A') || trimmed.includes('about $A$') || trimmed.includes('about support $A$')) {
        pivotPos = sortedSupports[0]?.position ?? 0;
      } else if (trimmed.includes('M_B') || trimmed.includes('about $B$') || trimmed.includes('about support $B$')) {
        pivotPos = sortedSupports[1]?.position ?? 0;
      } else if (trimmed.includes('M_C') || trimmed.includes('about $C$') || trimmed.includes('about support $C$')) {
        pivotPos = sortedSupports[2]?.position ?? 0;
      } else {
        pivotPos = 0;
      }
    }
  }

  const opacityRightOfX = (isLeftOnly || isRightOnly) ? pivotPos : null;
  const opacitySide: 'left' | 'right' = isRightOnly ? 'left' : 'right';

  // 1. Identify active loads and compute equivalents/centroids
  const activeLoadVisuals: IActiveLoadVisual[] = [];

  loads.forEach(l => {
    let cX = 0;
    let P = 0;
    let isUpward = false;
    let label = '';

    if (l.type === 'point' && l.position !== undefined) {
      if (isLeftOnly && pivotPos !== null && l.position > pivotPos + 1e-5) return;
      if (isRightOnly && pivotPos !== null && l.position < pivotPos - 1e-5) return;

      cX = l.position;
      P = Math.abs(l.magnitude ?? 0);
      isUpward = (l.magnitude ?? 0) < 0;
      label = `${P.toFixed(1)} kN`;
    } else if (l.type === 'moment' && l.position !== undefined) {
      if (isLeftOnly && pivotPos !== null && l.position > pivotPos + 1e-5) return;
      if (isRightOnly && pivotPos !== null && l.position < pivotPos - 1e-5) return;

      cX = l.position;
      P = Math.abs(l.magnitude ?? 0);
      isUpward = false;
      label = `${P.toFixed(1)} kNm`;
    } else if (l.type === 'udl' && l.startPosition !== undefined && l.endPosition !== undefined) {
      let start = l.startPosition;
      let end = l.endPosition;
      if (isLeftOnly && pivotPos !== null) {
        end = Math.min(end, pivotPos);
      }
      if (isRightOnly && pivotPos !== null) {
        start = Math.max(start, pivotPos);
      }
      const L_load = end - start;
      if (L_load <= 1e-5) return;

      cX = start + L_load / 2;
      P = Math.abs(l.magnitude ?? 0) * L_load;
      isUpward = (l.magnitude ?? 0) < 0;
      label = `${P.toFixed(1)} kN (equiv)`;
    } else if (l.type === 'uvl' && l.startPosition !== undefined && l.endPosition !== undefined) {
      let start = l.startPosition;
      let end = l.endPosition;
      if (isLeftOnly && pivotPos !== null) {
        end = Math.min(end, pivotPos);
      }
      if (isRightOnly && pivotPos !== null) {
        start = Math.max(start, pivotPos);
      }
      const L_load = end - start;
      if (L_load <= 1e-5) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;
      const totalLen = l.endPosition - l.startPosition;
      if (totalLen <= 0) return;

      let rectW = w1;
      let triW = w2 - w1;

      if (isLeftOnly && pivotPos !== null && l.endPosition > pivotPos) {
        const wx = w1 + ((w2 - w1) * L_load) / totalLen;
        rectW = w1;
        triW = wx - w1;
      } else if (isRightOnly && pivotPos !== null && l.startPosition < pivotPos) {
        const wx = w1 + ((w2 - w1) * (totalLen - L_load)) / totalLen;
        rectW = wx;
        triW = w2 - wx;
      }

      const absW1 = Math.abs(rectW);
      const absW2 = Math.abs(rectW + triW);
      P = 0.5 * Math.abs(rectW + (rectW + triW)) * L_load;
      isUpward = rectW < 0 || (rectW + triW) < 0;

      if (absW1 + absW2 > 1e-4) {
        cX = start + L_load * (absW1 + 2 * absW2) / (3 * (absW1 + absW2));
      } else {
        cX = start + L_load / 2;
      }
      label = `${P.toFixed(1)} kN (equiv)`;
    }

    activeLoadVisuals.push({
      id: l.id,
      type: l.type,
      label,
      magnitude: P,
      centroidX: cX,
      isUpward,
    });
  });

  // 2. Identify active support reactions
  const activeReactions: IActiveReactionVisual[] = [];
  sortedSupports.forEach((s, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const isPivot = pivotPos !== null && Math.abs(s.position - pivotPos) < 1e-3;

    if (isLeftOnly && s.position >= (pivotPos ?? 0) - 1e-5) {
      return;
    }
    if (isRightOnly && s.position <= (pivotPos ?? 0) + 1e-5) {
      return;
    }

    activeReactions.push({
      supportId: s.id,
      letter,
      position: s.position,
      label: `R_{y${letter}}`,
      isPivot,
    });
  });

  // 3. Filter and sort targets for dimension lines
  const dimTargets: { x: number; label: string }[] = [];

  if (pivotPos !== null) {
    activeReactions.forEach(r => {
      if (Math.abs(r.position - pivotPos!) > 0.05) {
        dimTargets.push({ x: r.position, label: `${Math.abs(r.position - pivotPos!).toFixed(2)}m` });
      }
    });

    activeLoadVisuals.forEach(l => {
      if (Math.abs(l.centroidX - pivotPos!) > 0.05 && l.type !== 'moment') {
        dimTargets.push({ x: l.centroidX, label: `${Math.abs(l.centroidX - pivotPos!).toFixed(2)}m` });
      }
    });

    dimTargets.sort((a, b) => Math.abs(a.x - pivotPos!) - Math.abs(b.x - pivotPos!));
  }

  return {
    pivotPos,
    isLeftOnly,
    isRightOnly,
    opacityRightOfX,
    opacitySide,
    activeLoadVisuals,
    activeReactions,
    dimTargets,
  };
}
