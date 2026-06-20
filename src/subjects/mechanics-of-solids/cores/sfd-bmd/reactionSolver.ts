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

function getLoadsDetailedSum(loads: ILoad[], xLimit?: number, side: 'left' | 'right' = 'left'): ILoadsBreakdown {
  const activeLoads = xLimit !== undefined
    ? (side === 'left'
        ? loads.filter(l => (l.position ?? l.startPosition ?? 0) < xLimit - 1e-5)
        : loads.filter(l => (l.position ?? l.endPosition ?? 0) > xLimit + 1e-5))
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
      const len = xLimit !== undefined
        ? (side === 'left' ? Math.min(end, xLimit) - start : end - Math.max(start, xLimit))
        : end - start;
      if (len <= 0 || Math.abs(w) < 1e-4) return;
      parts.push(`(${formatNumber(w)} \\times ${formatNumber(len)})`);
      const val = w * len;
      vals.push(`${formatNumber(val)}`);
      total += val;
    } else if (l.type === 'uvl') {
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const totalLen = end - start;
      if (totalLen <= 0) return;
      const len = xLimit !== undefined
        ? (side === 'left' ? Math.min(end, xLimit) - start : end - Math.max(start, xLimit))
        : totalLen;
      if (len <= 0) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;

      let rectW = w1;
      let triW = w2 - w1;

      if (xLimit !== undefined) {
        if (side === 'left' && end > xLimit) {
          const wx = w1 + ((w2 - w1) * len) / totalLen;
          rectW = w1;
          triW = wx - w1;
        } else if (side === 'right' && start < xLimit) {
          const wx = w1 + ((w2 - w1) * (totalLen - len)) / totalLen;
          rectW = wx;
          triW = w2 - wx;
        }
      }

      if (Math.abs(rectW) < 1e-4) {
        parts.push(`(0.5 \\times ${formatNumber(triW)} \\times ${formatNumber(len)})`);
        const val = 0.5 * triW * len;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else if (Math.abs(triW) < 1e-4) {
        parts.push(`(${formatNumber(rectW)} \\times ${formatNumber(len)})`);
        const val = rectW * len;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else {
        parts.push(`(${formatNumber(rectW)} \\times ${formatNumber(len)} + 0.5 \\times (${formatNumber(triW)}) \\times ${formatNumber(len)})`);
        const val = rectW * len + 0.5 * triW * len;
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

function getLoadsDetailedMomentSum(loads: ILoad[], referenceX: number, xLimit?: number, side: 'left' | 'right' = 'left'): ILoadsBreakdown {
  const activeLoads = xLimit !== undefined
    ? (side === 'left'
        ? loads.filter(l => (l.position ?? l.startPosition ?? 0) < xLimit - 1e-5)
        : loads.filter(l => (l.position ?? l.endPosition ?? 0) > xLimit + 1e-5))
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
      const len = xLimit !== undefined
        ? (side === 'left' ? Math.min(end, xLimit) - start : end - Math.max(start, xLimit))
        : end - start;
      if (len <= 0 || Math.abs(w) < 1e-4) return;
      const cg = side === 'left' ? start + len / 2 : end - len / 2;
      const arm = cg - referenceX;
      parts.push(`[(${formatNumber(w)} \\times ${formatNumber(len)}) \\times ${formatNumber(arm)}]`);
      const val = w * len * arm;
      vals.push(`${formatNumber(val)}`);
      total += val;
    } else if (l.type === 'uvl') {
      const start = l.startPosition ?? 0;
      const end = l.endPosition ?? 0;
      const totalLen = end - start;
      if (totalLen <= 0) return;
      const len = xLimit !== undefined
        ? (side === 'left' ? Math.min(end, xLimit) - start : end - Math.max(start, xLimit))
        : totalLen;
      if (len <= 0) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;

      let rectW = w1;
      let triW = w2 - w1;
      let segmentStart = start;

      if (xLimit !== undefined) {
        if (side === 'left') {
          if (end > xLimit) {
            const wx = w1 + ((w2 - w1) * len) / totalLen;
            rectW = w1;
            triW = wx - w1;
          }
          segmentStart = start;
        } else {
          if (start < xLimit) {
            const wx = w1 + ((w2 - w1) * (totalLen - len)) / totalLen;
            rectW = wx;
            triW = w2 - wx;
          }
          segmentStart = xLimit;
        }
      }

      if (Math.abs(rectW) < 1e-4) {
        const cgTri = segmentStart + (2 / 3) * len;
        const armTri = cgTri - referenceX;
        parts.push(`[(0.5 \\times ${formatNumber(triW)} \\times ${formatNumber(len)}) \\times ${formatNumber(armTri)}]`);
        const val = 0.5 * triW * len * armTri;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else if (Math.abs(triW) < 1e-4) {
        const cgRect = segmentStart + len / 2;
        const armRect = cgRect - referenceX;
        parts.push(`[(${formatNumber(rectW)} \\times ${formatNumber(len)}) \\times ${formatNumber(armRect)}]`);
        const val = rectW * len * armRect;
        vals.push(`${formatNumber(val)}`);
        total += val;
      } else {
        const fRect = rectW * len;
        const cgRect = segmentStart + len / 2;
        const fTri = 0.5 * triW * len;
        const cgTri = segmentStart + (2 / 3) * len;
        parts.push(`[(${formatNumber(rectW)} \\times ${formatNumber(len)}) \\times ${formatNumber(cgRect - referenceX)} + (0.5 \\times (${formatNumber(triW)}) \\times ${formatNumber(len)}) \\times ${formatNumber(cgTri - referenceX)}]`);
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

function getLoadsRightOf(beam: IBeam, xLimit: number): { force: number; moment: number } {
  let force = 0;
  let moment = 0;

  beam.loads.forEach(load => {
    if (load.type === 'point' || load.type === 'moment') {
      const pos = load.position ?? 0;
      if (pos > xLimit) {
        const res = getLoadForceAndMoment(load, xLimit);
        force += res.force;
        moment += res.moment;
      }
    } else if (load.type === 'udl' || load.type === 'uvl') {
      const start = load.startPosition ?? 0;
      const end = load.endPosition ?? 0;

      if (end <= xLimit) return; // Entirely to the left

      if (start >= xLimit) {
        // Entirely to the right
        const res = getLoadForceAndMoment(load, xLimit);
        force += res.force;
        moment += res.moment;
      } else {
        // Cut UDL/UVL at xLimit
        const length = end - xLimit;
        if (load.type === 'udl') {
          const mag = load.magnitude ?? 0;
          const partialForce = mag * length;
          const cg = xLimit + length / 2;
          force += partialForce;
          moment += partialForce * (cg - xLimit);
        } else {
          // UVL
          const w1 = load.startMagnitude ?? 0;
          const w2 = load.endMagnitude ?? 0;
          const totalLength = end - start;
          const wx = w1 + ((w2 - w1) * (xLimit - start)) / totalLength;

          const fRect = wx * length;
          const cgRect = xLimit + length / 2;
          const fTri = 0.5 * (w2 - wx) * length;
          const cgTri = xLimit + (2 / 3) * length;

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

  const n = vars.length;
  if (n === 0) {
    return { reactions: [], steps: ['No supports to solve.'], success: false };
  }

  interface IEquationData {
    title: string;
    coefs: number[];
    rhsValue: number;
    latex: string;
  }

  const condEqs: IEquationData[] = [];
  let stepNum = 1;

  // 1. Equations of condition from internal releases (Hinges & Rollers)
  beam.releases.forEach(rel => {
    if (rel.type === 'hinge' || rel.type === 'roller') {
      // Determine which side has fewer unknown reaction variables
      const unknownsLeft = vars.filter(v => v.x < rel.position).length;
      const unknownsRight = vars.filter(v => v.x > rel.position).length;
      const useLeft = unknownsLeft <= unknownsRight;
      const side = useLeft ? 'left' : 'right';

      // Hinge adds: M_left = 0 or M_right = 0
      const title = `**Step ${stepNum}: Equation of condition from Hinge at $x = ${rel.position.toFixed(2)}\\text{ m}$ ($\\sum M_{\\text{${side}}, x_h} = 0$)**`;
      stepNum++;

      const coefs = new Array(n).fill(0);
      let hMStr = '';

      vars.forEach((v, vIdx) => {
        const isActive = useLeft ? v.x < rel.position : v.x > rel.position;
        if (isActive) {
          if (v.type === 'R_y') {
            const arm = useLeft ? rel.position - v.x : v.x - rel.position;
            coefs[vIdx] = arm;
            hMStr += `${hMStr ? ' + ' : ''}${v.label}(${arm.toFixed(2)})`;
          } else if (v.type === 'M') {
            coefs[vIdx] = -1; // support moments are consistently -1
            hMStr += `${hMStr ? ' - ' : ''}${v.label}`;
          }
        }
      });

      const loadsDetail = getLoadsDetailedMomentSum(beam.loads, rel.position, rel.position, side);
      const loadsMoment = useLeft ? getLoadsLeftOf(beam, rel.position).moment : getLoadsRightOf(beam, rel.position).moment;
      const rhsVal = useLeft ? -loadsMoment : loadsMoment;

      let hingeEqText = '';
      if (loadsDetail.steps && loadsDetail.steps !== loadsDetail.terms && loadsDetail.terms !== '0') {
        hingeEqText = useLeft
          ? ` = -[${loadsDetail.terms}] = -[${loadsDetail.steps}] = ${formatNumber(rhsVal)}\\text{ kNm}`
          : ` = ${loadsDetail.terms} = ${loadsDetail.steps} = ${formatNumber(rhsVal)}\\text{ kNm}`;
      } else if (loadsDetail.terms !== '0') {
        hingeEqText = useLeft
          ? ` = -[${loadsDetail.terms}] = ${formatNumber(rhsVal)}\\text{ kNm}`
          : ` = ${loadsDetail.terms} = ${formatNumber(rhsVal)}\\text{ kNm}`;
      } else {
        hingeEqText = ` = ${formatNumber(rhsVal)}\\text{ kNm}`;
      }

      condEqs.push({
        title,
        coefs,
        rhsValue: rhsVal,
        latex: `$$${hMStr || '0'}${hingeEqText}$$`,
      });
    }

    if (rel.type === 'roller') {
      // Roller also adds: V_left = 0 or V_right = 0
      const unknownsLeft = vars.filter(v => v.x < rel.position).length;
      const unknownsRight = vars.filter(v => v.x > rel.position).length;
      const useLeft = unknownsLeft <= unknownsRight;
      const side = useLeft ? 'left' : 'right';

      const title = `**Step ${stepNum}: Equation of condition from Roller at $x = ${rel.position.toFixed(2)}\\text{ m}$ ($\\sum V_{\\text{${side}}, x_h} = 0$)**`;
      stepNum++;

      const coefs = new Array(n).fill(0);
      let hVStr = '';

      vars.forEach((v, vIdx) => {
        const isActive = useLeft ? v.x < rel.position : v.x > rel.position;
        if (isActive && v.type === 'R_y') {
          coefs[vIdx] = 1;
          hVStr += `${hVStr ? ' + ' : ''}${v.label}`;
        }
      });

      const loadsDetail = getLoadsDetailedSum(beam.loads, rel.position, side);
      const loadsForce = useLeft ? getLoadsLeftOf(beam, rel.position).force : getLoadsRightOf(beam, rel.position).force;
      const rhsVal = loadsForce;

      let rollerEqText = '';
      if (loadsDetail.steps && loadsDetail.steps !== loadsDetail.terms && loadsDetail.terms !== '0') {
        rollerEqText = ` = ${loadsDetail.terms} = ${loadsDetail.steps} = ${formatNumber(rhsVal)}\\text{ kN}`;
      } else if (loadsDetail.terms !== '0') {
        rollerEqText = ` = ${loadsDetail.terms} = ${formatNumber(rhsVal)}\\text{ kN}`;
      } else {
        rollerEqText = ` = ${formatNumber(rhsVal)}\\text{ kN}`;
      }

      condEqs.push({
        title,
        coefs,
        rhsValue: rhsVal,
        latex: `$$${hVStr || '0'}${rollerEqText}$$`,
      });
    }
  });

  // 2. Moment equilibrium about x=0
  const titleMoment = `**Step ${stepNum}: Moment Equilibrium Equation about $x=0$ ($\\sum M_{x=0} = 0$)**`;
  stepNum++;

  const coefsMoment = new Array(n).fill(0);
  let eqMStr = '';
  vars.forEach((v, idx) => {
    if (v.type === 'R_y') {
      coefsMoment[idx] = v.x;
      eqMStr += `${eqMStr ? ' + ' : ''}${v.label}(${v.x.toFixed(2)})`;
    } else if (v.type === 'M') {
      coefsMoment[idx] = -1;
      eqMStr += `${eqMStr ? ' - ' : ''}${v.label}`;
    }
  });

  let totalMomentsAboutZero = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalMomentsAboutZero += res.moment;
  });

  const momentDetail = getLoadsDetailedMomentSum(beam.loads, 0);
  let momentEqText = '';
  if (momentDetail.steps && momentDetail.steps !== momentDetail.terms && momentDetail.terms !== '0') {
    momentEqText = ` = ${momentDetail.terms} = ${momentDetail.steps} = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  } else if (momentDetail.terms !== '0') {
    momentEqText = ` = ${momentDetail.terms} = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  } else {
    momentEqText = ` = ${formatNumber(totalMomentsAboutZero)}\\text{ kNm}`;
  }

  const momentEq: IEquationData = {
    title: titleMoment,
    coefs: coefsMoment,
    rhsValue: totalMomentsAboutZero,
    latex: `$$${eqMStr}${momentEqText}$$`,
  };

  // 3. Vertical equilibrium (sum Fy = 0)
  const titleVertical = `**Step ${stepNum}: Vertical Equilibrium Equation ($\\sum F_y = 0$)**`;
  stepNum++;

  const coefsVertical = new Array(n).fill(0);
  let eqFyStr = '';
  vars.forEach((v, idx) => {
    if (v.type === 'R_y') {
      coefsVertical[idx] = 1;
      eqFyStr += `${eqFyStr ? ' + ' : ''}${v.label}`;
    }
  });

  let totalDownwardForce = 0;
  beam.loads.forEach(load => {
    const res = getLoadForceAndMoment(load, 0);
    totalDownwardForce += res.force;
  });

  const verticalDetail = getLoadsDetailedSum(beam.loads);
  let verticalEqText = '';
  if (verticalDetail.steps && verticalDetail.steps !== verticalDetail.terms && verticalDetail.terms !== '0') {
    verticalEqText = ` = ${verticalDetail.terms} = ${verticalDetail.steps} = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  } else if (verticalDetail.terms !== '0') {
    verticalEqText = ` = ${verticalDetail.terms} = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  } else {
    verticalEqText = ` = ${formatNumber(totalDownwardForce)}\\text{ kN}`;
  }

  const verticalEq: IEquationData = {
    title: titleVertical,
    coefs: coefsVertical,
    rhsValue: totalDownwardForce,
    latex: `$$${eqFyStr}${verticalEqText}$$`,
  };

  const allEqs = [...condEqs, momentEq, verticalEq];
  const eqCount = allEqs.length;

  if (eqCount !== n) {
    return { reactions: [], steps: ['Error: Support system is unstable or statically redundant.'], success: false };
  }

  const A: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const B: number[] = new Array(n).fill(0);

  allEqs.forEach((eq, eqIdx) => {
    A[eqIdx] = eq.coefs;
    B[eqIdx] = eq.rhsValue;
    steps.push(eq.title);
    steps.push(eq.latex);
  });

  // Solve the system of equations
  const solution = solveLinearSystem(A, B);
  if (!solution) {
    return { reactions: [], steps: [...steps, 'Error: Support system is unstable or statically redundant.'], success: false };
  }

  steps.push(`**Step ${stepNum}: Solved Support Reactions**`);
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
