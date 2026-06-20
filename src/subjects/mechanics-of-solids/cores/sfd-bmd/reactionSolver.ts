import { IBeam, IReaction, ILoad } from './types';
import { solveLinearSystem } from './utils/linearSystemSolver';
import { getLoadForceAndMoment, getLoadsLeftOf } from './utils/loadCalculator';

export { solveLinearSystem } from './utils/linearSystemSolver';
export { getLoadForceAndMoment, getLoadsLeftOf } from './utils/loadCalculator';

interface ILoadsBreakdown {
  terms: string;
  steps: string;
  value: number;
}

function formatNumber(val: number): string {
  const rounded = parseFloat(val.toFixed(3));
  if (Number.isInteger(rounded)) {
    return rounded.toFixed(1);
  }
  return rounded.toString();
}

function getLoadsDetailedSum(loads: ILoad[], xLimit?: number): ILoadsBreakdown {
  const activeLoads = xLimit !== undefined
    ? loads.filter(l => (l.position ?? l.startPosition ?? 0) < xLimit)
    : loads;

  if (activeLoads.length === 0) {
    return { terms: '0', steps: '0', value: 0 };
  }

  const parts: string[] = [];
  const vals: string[] = [];
  let total = 0;

  activeLoads.forEach(l => {
    if (l.type === 'point') {
      const p = l.magnitude ?? 0;
      if (Math.abs(p) < 1e-4) return;
      parts.push(`${formatNumber(p)}`);
      vals.push(`${formatNumber(p)}`);
      total += p;
    } else if (l.type === 'udl') {
      const w = l.magnitude ?? 0;
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const len = xLimit !== undefined ? Math.min(end, xLimit) - start : end - start;
      if (len <= 0 || Math.abs(w) < 1e-4) return;
      parts.push(`(${formatNumber(w)} \\times ${formatNumber(len)})`);
      const val = w * len;
      vals.push(`${formatNumber(val)}`);
      total += val;
    } else if (l.type === 'uvl') {
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const totalLen = end - start;
      const len = xLimit !== undefined ? Math.min(end, xLimit) - start : totalLen;
      if (len <= 0 || totalLen <= 0) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;
      const wx = xLimit !== undefined && end > xLimit
        ? w1 + ((w2 - w1) * len) / totalLen
        : w2;

      if (Math.abs(w1) < 1e-4) {
        parts.push(`(0.5 \\times ${formatNumber(wx)} \\times ${formatNumber(len)})`);
        const val = 0.5 * wx * len;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else if (Math.abs(wx) < 1e-4) {
        parts.push(`(0.5 \\times ${formatNumber(w1)} \\times ${formatNumber(len)})`);
        const val = 0.5 * w1 * len;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else {
        parts.push(`(${formatNumber(w1)} \\times ${formatNumber(len)} + 0.5 \\times (${formatNumber(wx - w1)}) \\times ${formatNumber(len)})`);
        const val = w1 * len + 0.5 * (wx - w1) * len;
        vals.push(`${formatNumber(val)}`);
        total += val;
      }
    }
  });

  if (parts.length === 0) {
    return { terms: '0', steps: '0', value: 0 };
  }

  return {
    terms: parts.join(' + '),
    steps: vals.join(' + '),
    value: total,
  };
}

function getLoadsDetailedMomentSum(loads: ILoad[], referenceX: number, xLimit?: number): ILoadsBreakdown {
  const activeLoads = xLimit !== undefined
    ? loads.filter(l => (l.position ?? l.startPosition ?? 0) < xLimit)
    : loads;

  if (activeLoads.length === 0) {
    return { terms: '0', steps: '0', value: 0 };
  }

  const parts: string[] = [];
  const vals: string[] = [];
  let total = 0;

  activeLoads.forEach(l => {
    if (l.type === 'point') {
      const p = l.magnitude ?? 0;
      const pos = l.position ?? 0;
      const arm = pos - referenceX;
      if (Math.abs(p) < 1e-4) return;
      parts.push(`(${formatNumber(p)} \\times ${formatNumber(arm)})`);
      const val = p * arm;
      vals.push(`${formatNumber(val)}`);
      total += val;
    } else if (l.type === 'udl') {
      const w = l.magnitude ?? 0;
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const len = xLimit !== undefined ? Math.min(end, xLimit) - start : end - start;
      if (len <= 0 || Math.abs(w) < 1e-4) return;
      const cg = start + len / 2;
      const arm = cg - referenceX;
      parts.push(`[(${formatNumber(w)} \\times ${formatNumber(len)}) \\times ${formatNumber(arm)}]`);
      const val = w * len * arm;
      vals.push(`${formatNumber(val)}`);
      total += val;
    } else if (l.type === 'uvl') {
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const totalLen = end - start;
      const len = xLimit !== undefined ? Math.min(end, xLimit) - start : totalLen;
      if (len <= 0 || totalLen <= 0) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;
      const wx = xLimit !== undefined && end > xLimit
        ? w1 + ((w2 - w1) * len) / totalLen
        : w2;

      if (Math.abs(w1) < 1e-4) {
        const cgTri = start + (2 / 3) * len;
        const armTri = cgTri - referenceX;
        parts.push(`[(0.5 \\times ${formatNumber(wx)} \\times ${formatNumber(len)}) \\times ${formatNumber(armTri)}]`);
        const val = 0.5 * wx * len * armTri;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else if (Math.abs(wx) < 1e-4) {
        const cgTri = start + (1 / 3) * len;
        const armTri = cgTri - referenceX;
        parts.push(`[(0.5 \\times ${formatNumber(w1)} \\times ${formatNumber(len)}) \\times ${formatNumber(armTri)}]`);
        const val = 0.5 * w1 * len * armTri;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else {
        const fRect = w1 * len;
        const cgRect = start + len / 2;
        const fTri = 0.5 * (wx - w1) * len;
        const cgTri = start + (2 / 3) * len;
        parts.push(`[(${formatNumber(w1)} \\times ${formatNumber(len)}) \\times ${formatNumber(cgRect - referenceX)} + (0.5 \\times (${formatNumber(wx - w1)}) \\times ${formatNumber(len)}) \\times ${formatNumber(cgTri - referenceX)}]`);
        const val = fRect * (cgRect - referenceX) + fTri * (cgTri - referenceX);
        vals.push(`${formatNumber(val)}`);
        total += val;
      }
    } else if (l.type === 'moment') {
      const mag = l.magnitude ?? 0;
      if (Math.abs(mag) < 1e-4) return;
      parts.push(`(${formatNumber(mag)})`);
      const res = getLoadForceAndMoment(l, referenceX);
      vals.push(`${formatNumber(res.moment)}`);
      total += res.moment;
    }
  });

  if (parts.length === 0) {
    return { terms: '0', steps: '0', value: 0 };
  }

  return {
    terms: parts.join(' + '),
    steps: vals.join(' + '),
    value: total,
  };
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
  const sortedSupports = [...beam.supports].sort((a, b) => a.position - b.position);
  const supportIdToLetter = new Map<string, string>();
  sortedSupports.forEach((s, idx) => {
    const letter = String.fromCharCode(65 + idx); // A, B, C...
    supportIdToLetter.set(s.id, letter);
  });

  sortedSupports.forEach((s) => {
    const letter = supportIdToLetter.get(s.id)!;
    if (s.type === 'roller' || s.type === 'hinge') {
      vars.push({ supportId: s.id, type: 'R_y', x: s.position, label: `R_{y${letter}}` });
    } else if (s.type === 'fixed') {
      vars.push({ supportId: s.id, type: 'R_y', x: s.position, label: `R_{y${letter}}` });
      vars.push({ supportId: s.id, type: 'M', x: s.position, label: `M_{${letter}}` });
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
      A[0]![idx] = 1;
      eqFyStr += `${eqFyStr ? ' + ' : ''}${v.label}`;
    }
  });

  let totalDownwardForce = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalDownwardForce += res.force;
  });
  B[0] = totalDownwardForce;

  const verticalDetail = getLoadsDetailedSum(beam.loads);
  let verticalEqText = '';
  if (verticalDetail.steps && verticalDetail.steps !== verticalDetail.terms && verticalDetail.terms !== '0') {
    verticalEqText = ` = ${verticalDetail.terms} = ${verticalDetail.steps} = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  } else if (verticalDetail.terms !== '0') {
    verticalEqText = ` = ${verticalDetail.terms} = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  } else {
    verticalEqText = ` = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  }
  steps.push(`$$${eqFyStr}${verticalEqText}$$`);

  // 2. Moment equilibrium about x=0
  steps.push(`**Step 2: Moment Equilibrium Equation about $x=0$ ($\\sum M_{x=0} = 0$)**`);
  let eqMStr = '';
  vars.forEach((v, idx) => {
    if (v.type === 'R_y') {
      A[1]![idx] = v.x;
      eqMStr += `${eqMStr ? ' + ' : ''}${v.label}(${v.x.toFixed(2)})`;
    } else if (v.type === 'M') {
      A[1]![idx] = -1;
      eqMStr += `${eqMStr ? ' - ' : ''}${v.label}`;
    }
  });

  let totalMomentsAboutZero = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalMomentsAboutZero += res.moment;
  });
  B[1] = totalMomentsAboutZero;

  const momentDetail = getLoadsDetailedMomentSum(beam.loads, 0);
  let momentEqText = '';
  if (momentDetail.steps && momentDetail.steps !== momentDetail.terms && momentDetail.terms !== '0') {
    momentEqText = ` = ${momentDetail.terms} = ${momentDetail.steps} = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  } else if (momentDetail.terms !== '0') {
    momentEqText = ` = ${momentDetail.terms} = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  } else {
    momentEqText = ` = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  }
  steps.push(`$$${eqMStr}${momentEqText}$$`);

  // 3. Equations of condition from internal releases
  let eqIdx = 2;
  beam.releases.forEach(rel => {
    if (rel.type === 'hinge' || rel.type === 'roller') {
      // Hinge adds: M_left = 0
      steps.push(`**Step ${eqIdx + 1}: Equation of condition from Hinge at $x = ${rel.position.toFixed(2)}\\text{ m}$ ($\\sum M_{\\text{left}, x_h} = 0$)**`);
      let hMStr = '';
      vars.forEach((v, vIdx) => {
        if (v.x < rel.position) {
          if (v.type === 'R_y') {
            A[eqIdx]![vIdx] = rel.position - v.x;
            hMStr += `${hMStr ? ' + ' : ''}${v.label}(${(rel.position - v.x).toFixed(2)})`;
          } else if (v.type === 'M') {
            A[eqIdx]![vIdx] = -1;
            hMStr += `${hMStr ? ' - ' : ''}${v.label}`;
          }
        }
      });
      const loadsLeft = getLoadsLeftOf(beam, rel.position);
      B[eqIdx] = -loadsLeft.moment;

      const hingeDetail = getLoadsDetailedMomentSum(beam.loads, rel.position, rel.position);
      let hingeEqText = '';
      if (hingeDetail.steps && hingeDetail.steps !== hingeDetail.terms && hingeDetail.terms !== '0') {
        hingeEqText = ` = -[${hingeDetail.terms}] = -[${hingeDetail.steps}] = ${formatNumber(-loadsLeft.moment)}\\text{ kNm}`;
      } else if (hingeDetail.terms !== '0') {
        hingeEqText = ` = -[${hingeDetail.terms}] = ${formatNumber(-loadsLeft.moment)}\\text{ kNm}`;
      } else {
        hingeEqText = ` = ${formatNumber(-loadsLeft.moment)}\\text{ kNm}`;
      }
      steps.push(`$$${hMStr || '0'}${hingeEqText}$$`);
      eqIdx++;
    }

    if (rel.type === 'roller') {
      // Roller also adds: V_left = 0
      steps.push(`**Step ${eqIdx + 1}: Equation of condition from Roller at $x = ${rel.position.toFixed(2)}\\text{ m}$ ($\\sum V_{\\text{left}, x_h} = 0$)**`);
      let hVStr = '';
      vars.forEach((v, vIdx) => {
        if (v.x < rel.position && v.type === 'R_y') {
          A[eqIdx]![vIdx] = 1;
          hVStr += `${hVStr ? ' + ' : ''}${v.label}`;
        }
      });
      const loadsLeft = getLoadsLeftOf(beam, rel.position);
      B[eqIdx] = loadsLeft.force;

      const rollerDetail = getLoadsDetailedSum(beam.loads, rel.position);
      let rollerEqText = '';
      if (rollerDetail.steps && rollerDetail.steps !== rollerDetail.terms && rollerDetail.terms !== '0') {
        rollerEqText = ` = ${rollerDetail.terms} = ${rollerDetail.steps} = ${formatNumber(loadsLeft.force)}\\text{ kN}`;
      } else if (rollerDetail.terms !== '0') {
        rollerEqText = ` = ${rollerDetail.terms} = ${formatNumber(loadsLeft.force)}\\text{ kN}`;
      } else {
        rollerEqText = ` = ${formatNumber(loadsLeft.force)}\\text{ kN}`;
      }
      steps.push(`$$${hVStr || '0'}${rollerEqText}$$`);
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
    const val = parseFloat(solution[idx]!.toFixed(3));
    reactions.push({
      supportId: v.supportId,
      type: v.type === 'R_y' ? 'R_y' : 'M',
      value: val,
    });
    steps.push(`- $${v.label} = ${formatNumber(val)}\\text{ ${v.type === 'R_y' ? 'kN' : 'kNm'}}$`);
  });

  // Add horizontal reaction as 0
  beam.supports.forEach(s => {
    if (s.type === 'hinge' || s.type === 'fixed') {
      reactions.push({ supportId: s.id, type: 'R_x', value: 0 });
    }
  });

  return { reactions, steps, success: true };
}
