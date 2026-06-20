import { IBeam, IReaction, ILoad } from './types';

// Solves A * X = B using Gaussian elimination with partial pivoting
function solveLinearSystem(A: number[][], B: number[]): number[] | null {
  const n = B.length;
  for (let i = 0; i < n; i++) {
    // Search for maximum in this column
    let maxEl = Math.abs(A[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i]);
        maxRow = k;
      }
    }

    // Swap maximum row with current row
    const tempA = A[maxRow];
    A[maxRow] = A[i];
    A[i] = tempA;

    const tempB = B[maxRow];
    B[maxRow] = B[i];
    B[i] = tempB;

    // Check if matrix is singular
    if (Math.abs(A[i][i]) < 1e-9) {
      return null;
    }

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const c = -A[k][i] / A[i][i];
      for (let j = i; j < n; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
      A[k][i] = 0; // force exact zero
      B[k] += c * B[i];
    }
  }

  // Solve equation Ax = B for an upper triangular matrix
  const X = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let k = i + 1; k < n; k++) {
      sum += A[i][k] * X[k];
    }
    X[i] = parseFloat(((B[i] - sum) / A[i][i]).toFixed(5));
  }
  return X;
}

// Compute load properties (force and moment about x=0)
export function getLoadForceAndMoment(load: ILoad, referenceX: number = 0): { force: number; moment: number } {
  let force = 0;
  let moment = 0;

  if (load.type === 'point') {
    const mag = load.magnitude ?? 0;
    const pos = load.position ?? 0;
    force = mag; // Downward is positive force
    moment = mag * (pos - referenceX);
  } else if (load.type === 'udl') {
    const mag = load.magnitude ?? 0;
    const start = load.startPosition ?? 0;
    const end = load.endPosition ?? 0;
    const length = end - start;
    const cg = (start + end) / 2;
    force = mag * length;
    moment = force * (cg - referenceX);
  } else if (load.type === 'uvl') {
    const start = load.startPosition ?? 0;
    const end = load.endPosition ?? 0;
    const length = end - start;
    const w1 = load.startMagnitude ?? 0;
    const w2 = load.endMagnitude ?? 0;
    
    // UVL is split into rectangular (w1) and triangular (w2-w1) parts
    const fRect = w1 * length;
    const cgRect = (start + end) / 2;
    const fTri = 0.5 * (w2 - w1) * length;
    const cgTri = start + (2 / 3) * length; // CG of triangle from start
    
    force = fRect + fTri;
    moment = fRect * (cgRect - referenceX) + fTri * (cgTri - referenceX);
  } else if (load.type === 'moment') {
    const mag = load.magnitude ?? 0; // kNm (positive clockwise)
    force = 0;
    moment = -mag; // clockwise moment about any point is clockwise. Wait, signs: standard moment about a point adds clockwise moments. Let's keep signs consistent.
  }

  return { force, moment };
}

// Compute load properties to the left of a coordinate
export function getLoadsLeftOf(beam: IBeam, xLimit: number): { force: number; moment: number } {
  let force = 0;
  let moment = 0;

  beam.loads.forEach(load => {
    if (load.type === 'point' || load.type === 'moment') {
      const pos = load.position ?? 0;
      if (pos < xLimit) {
        const res = getLoadForceAndMoment(load, xLimit);
        force += res.force;
        moment += res.moment;
      }
    } else if (load.type === 'udl' || load.type === 'uvl') {
      const start = load.startPosition ?? 0;
      const end = load.endPosition ?? 0;

      if (start >= xLimit) return; // Entirely to the right

      if (end <= xLimit) {
        // Entirely to the left
        const res = getLoadForceAndMoment(load, xLimit);
        force += res.force;
        moment += res.moment;
      } else {
        // Cut UDL/UVL at xLimit
        const length = xLimit - start;
        if (load.type === 'udl') {
          const mag = load.magnitude ?? 0;
          const partialForce = mag * length;
          const cg = start + length / 2;
          force += partialForce;
          moment += partialForce * (cg - xLimit);
        } else {
          // UVL
          const w1 = load.startMagnitude ?? 0;
          const w2 = load.endMagnitude ?? 0;
          const totalLength = end - start;
          const wx = w1 + ((w2 - w1) * length) / totalLength; // intensity at xLimit

          const fRect = w1 * length;
          const cgRect = start + length / 2;
          const fTri = 0.5 * (wx - w1) * length;
          const cgTri = start + (2 / 3) * length;

          force += fRect + fTri;
          moment += fRect * (cgRect - xLimit) + fTri * (cgTri - xLimit);
        }
      }
    }
  });

  return { force, moment };
}

export function solveReactions(beam: IBeam): { reactions: IReaction[]; steps: string[]; success: boolean } {
  const steps: string[] = [];
  const reactions: IReaction[] = [];

  // Identify vertical & moment reactions
  interface IReactionVariable {
    supportId: string;
    type: 'R_y' | 'M';
    x: number;
    label: string;
  }

  const vars: IReactionVariable[] = [];
  beam.supports.forEach((s, idx) => {
    if (s.type === 'roller' || s.type === 'hinge') {
      vars.push({ supportId: s.id, type: 'R_y', x: s.position, label: `R_{y${idx + 1}}` });
    } else if (s.type === 'fixed') {
      vars.push({ supportId: s.id, type: 'R_y', x: s.position, label: `R_{y${idx + 1}}` });
      vars.push({ supportId: s.id, type: 'M', x: s.position, label: `M_{${idx + 1}}` });
    }
  });

  // Number of equations = number of variables (which is 2 + c for determinate stable beams)
  const n = vars.length;
  if (n === 0) {
    return { reactions: [], steps: ['No supports to solve.'], success: false };
  }

  const A: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const B: number[] = new Array(n).fill(0);

  // 1. Vertical force equation: sum(R_y) = sum(Load_y)
  steps.push(`**Step 1: Vertical Equilibrium Equation ($\\sum F_y = 0$)**`);
  let eqFyStr = '';
  vars.forEach((v, idx) => {
    if (v.type === 'R_y') {
      A[0][idx] = 1;
      eqFyStr += `${eqFyStr ? ' + ' : ''}${v.label}`;
    }
  });

  let totalDownwardForce = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalDownwardForce += res.force;
  });
  B[0] = totalDownwardForce;
  steps.push(`$$${eqFyStr} = ${totalDownwardForce.toFixed(3)}\\text{ kN}$$`);

  // 2. Moment equilibrium about x=0
  steps.push(`**Step 2: Moment Equilibrium Equation about $x=0$ ($\\sum M_{x=0} = 0$)**`);
  let eqMStr = '';
  vars.forEach((v, idx) => {
    if (v.type === 'R_y') {
      A[1][idx] = v.x;
      eqMStr += `${eqMStr ? ' + ' : ''}${v.label}(${v.x})`;
    } else if (v.type === 'M') {
      A[1][idx] = -1;
      eqMStr += `${eqMStr ? ' - ' : ''}${v.label}`;
    }
  });

  let totalMomentsAboutZero = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalMomentsAboutZero += res.moment;
  });
  B[1] = totalMomentsAboutZero;
  steps.push(`$$${eqMStr} = ${totalMomentsAboutZero.toFixed(3)}\\text{ kNm}$$`);

  // 3. Equations of condition from internal releases
  let eqIdx = 2;
  beam.releases.forEach(rel => {
    if (rel.type === 'hinge' || rel.type === 'roller') {
      // Hinge adds: M_left = 0
      steps.push(`**Step ${eqIdx + 1}: Equation of condition from Hinge at $x = ${rel.position}\\text{ m}$ ($\\sum M_{\\text{left}, x_h} = 0$)**`);
      let hMStr = '';
      vars.forEach((v, vIdx) => {
        if (v.x < rel.position) {
          if (v.type === 'R_y') {
            A[eqIdx][vIdx] = rel.position - v.x;
            hMStr += `${hMStr ? ' + ' : ''}${v.label}(${(rel.position - v.x).toFixed(2)})`;
          } else if (v.type === 'M') {
            A[eqIdx][vIdx] = -1;
            hMStr += `${hMStr ? ' - ' : ''}${v.label}`;
          }
        }
      });
      const loadsLeft = getLoadsLeftOf(beam, rel.position);
      B[eqIdx] = -loadsLeft.moment;
      steps.push(`$$${hMStr || '0'} = ${(-loadsLeft.moment).toFixed(3)}\\text{ kNm}$$`);
      eqIdx++;
    }

    if (rel.type === 'roller') {
      // Roller also adds: V_left = 0
      steps.push(`**Step ${eqIdx + 1}: Equation of condition from Roller at $x = ${rel.position}\\text{ m}$ ($\\sum V_{\\text{left}, x_h} = 0$)**`);
      let hVStr = '';
      vars.forEach((v, vIdx) => {
        if (v.x < rel.position && v.type === 'R_y') {
          A[eqIdx][vIdx] = 1;
          hVStr += `${hVStr ? ' + ' : ''}${v.label}`;
        }
      });
      const loadsLeft = getLoadsLeftOf(beam, rel.position);
      B[eqIdx] = loadsLeft.force;
      steps.push(`$$${hVStr || '0'} = ${loadsLeft.force.toFixed(3)}\\text{ kN}$$`);
      eqIdx++;
    }
  });

  // Solve the system of equations
  const solution = solveLinearSystem(A, B);
  if (!solution) {
    return { reactions: [], steps: [...steps, 'Error: Support system is unstable or statically redundant.'], success: false };
  }

  steps.push(`**Step ${eqIdx + 1}: Solved Support Reactions**`);
  vars.forEach((v, idx) => {
    const val = parseFloat(solution[idx].toFixed(3));
    reactions.push({
      supportId: v.supportId,
      type: v.type === 'R_y' ? 'R_y' : 'M',
      value: val,
    });
    steps.push(`- $${v.label} = ${val.toFixed(3)}\\text{ ${v.type === 'R_y' ? 'kN' : 'kNm'}}$`);
  });

  // Add horizontal reaction as 0
  beam.supports.forEach(s => {
    if (s.type === 'hinge' || s.type === 'fixed') {
      reactions.push({ supportId: s.id, type: 'R_x', value: 0 });
    }
  });

  return { reactions, steps, success: true };
}
