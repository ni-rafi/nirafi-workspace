import { INode, IMember } from '../../../features/frame-solver/types/frame';
import { getMemberLength } from '../mdm/distributionFactors';

export interface ISdmEquation {
  memberId: string;
  nearNodeId: string;
  farNodeId: string;
  nearCoef: number; // 4EI/L
  farCoef: number;  // 2EI/L
  constant: number; // FEM (reaction, clockwise positive)
}

// Formats a Slope-Deflection equation into a readable string
export function formatSdmEquationString(
  nearNodeId: string,
  farNodeId: string,
  nearCoef: number,
  farCoef: number,
  constant: number
): string {
  const nearPart = nearCoef !== 0 ? `${nearCoef.toFixed(3)}*θ_${nearNodeId}` : '';
  const farPart = farCoef !== 0 ? `${farCoef.toFixed(3)}*θ_${farNodeId}` : '';
  
  let constPart = '';
  if (constant !== 0) {
    constPart = constant > 0 ? ` + ${constant.toFixed(3)}` : ` - ${Math.abs(constant).toFixed(3)}`;
  }

  let eq = '';
  if (nearPart && farPart) {
    eq = `${nearPart} + ${farPart}${constPart}`;
  } else if (nearPart) {
    eq = `${nearPart}${constPart}`;
  } else if (farPart) {
    eq = `${farPart}${constPart}`;
  } else {
    eq = constant !== 0 ? `${constant.toFixed(3)}` : '0';
  }
  return eq;
}

/**
 * Builds standard Slope-Deflection equations for a member.
 */
export function buildSdmEquationsForMember(
  member: IMember,
  nodes: INode[],
  femStart: number, // FEM at start node (reaction, clockwise positive)
  femEnd: number    // FEM at end node (reaction, clockwise positive)
): { Near: ISdmEquation; Far: ISdmEquation } {
  const L = getMemberLength(member, nodes);
  const E = member.E ?? 200; // GPa
  const I = member.I ?? 100; // 10^6 mm^4
  const EI = E * I; // kN * m^2

  const k_near = (4 * EI) / L;
  const k_far = (2 * EI) / L;

  return {
    Near: {
      memberId: member.id,
      nearNodeId: member.startNodeId,
      farNodeId: member.endNodeId,
      nearCoef: k_near,
      farCoef: k_far,
      constant: femStart
    },
    Far: {
      memberId: member.id,
      nearNodeId: member.endNodeId,
      farNodeId: member.startNodeId,
      nearCoef: k_near,
      farCoef: k_far,
      constant: femEnd
    }
  };
}
