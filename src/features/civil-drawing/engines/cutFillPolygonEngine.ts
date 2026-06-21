import { Point2D } from '../../building-drawing/types/geometry';

export interface EarthworkRegion {
  type: 'cut' | 'fill';
  path: string;       // SVG path string, e.g. "M 10 20 L 30 40 Z"
  area: number;       // calculated area in square units
  centroid: Point2D;  // centroid coordinate for text labels
}

/**
 * Finds the intersection between two line segments.
 */
function getLineIntersection(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D): Point2D | null {
  const s1_x = p1.x - p0.x;
  const s1_y = p1.y - p0.y;
  const s2_x = p3.x - p2.x;
  const s2_y = p3.y - p2.y;

  const s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  const t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    return { x: p0.x + t * s1_x, y: p0.y + t * s1_y };
  }
  return null;
}

/**
 * Calculates the area and centroid of a polygon using the Shoelace and centroid formulas.
 */
export function getPolygonProperties(points: Point2D[]): { area: number; centroid: Point2D } {
  const n = points.length;
  if (n < 3) return { area: 0, centroid: { x: 0, y: 0 } };

  let area = 0;
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < n; i++) {
    const curr = points[i]!;
    const next = points[(i + 1) % n]!;

    const factor = curr.x * next.y - next.x * curr.y;
    area += factor;
    cx += (curr.x + next.x) * factor;
    cy += (curr.y + next.y) * factor;
  }

  area = area / 2;
  const absArea = Math.abs(area);

  if (absArea === 0) {
    return { area: 0, centroid: points[0]! };
  }

  cx = cx / (6 * area);
  cy = cy / (6 * area);

  return {
    area: absArea,
    centroid: { x: cx, y: cy },
  };
}

/**
 * Intersects EGL and FL profiles to generate shaded polygons and area calculations.
 */
export function computeEarthworkRegions(
  egl: Point2D[],
  formationLevel: number,
  formationWidth: number,
  sideSlopeCut: number,
  sideSlopeFill: number,
  isTrench: boolean = false
): EarthworkRegion[] {
  if (egl.length < 2) return [];

  // 1. Establish the design formation bed center and edges
  const minX = egl[0]!.x;
  const maxX = egl[egl.length - 1]!.x;
  const cx = (minX + maxX) / 2;
  const halfW = formationWidth / 2;

  const leftBed = { x: cx - halfW, y: formationLevel };
  const rightBed = { x: cx + halfW, y: formationLevel };

  // Calculate design slope lines going outwards to EGL edges (vertical for trenches)
  const slopeRatio = isTrench ? 0 : (formationLevel > egl[0]!.y ? sideSlopeFill : sideSlopeCut);
  // If it's a trench, slope can be steep/vertical, otherwise sloped
  const dy = 300; // arbitrary height for slope line testing
  const leftSlopeEnd = { x: leftBed.x - dy * slopeRatio, y: leftBed.y - dy };
  const rightSlopeEnd = { x: rightBed.x + dy * slopeRatio, y: rightBed.y - dy };

  // Intersect EGL with design profile to find boundary limits
  const findIntersection = (p1: Point2D, p2: Point2D): Point2D => {
    for (let i = 0; i < egl.length - 1; i++) {
      const ipt = getLineIntersection(p1, p2, egl[i]!, egl[i + 1]!);
      if (ipt) return ipt;
    }
    return p2;
  };

  let actualLeftSlope = findIntersection(leftBed, leftSlopeEnd);
  if (actualLeftSlope.x < minX) {
    const clampX = minX;
    const dyLeft = leftBed.x - clampX;
    const clampY = slopeRatio > 0 ? leftBed.y - dyLeft / slopeRatio : leftBed.y;
    actualLeftSlope = { x: clampX, y: clampY };
  }

  let actualRightSlope = findIntersection(rightBed, rightSlopeEnd);
  if (actualRightSlope.x > maxX) {
    const clampX = maxX;
    const dyRight = clampX - rightBed.x;
    const clampY = slopeRatio > 0 ? rightBed.y - dyRight / slopeRatio : rightBed.y;
    actualRightSlope = { x: clampX, y: clampY };
  }

  // Re-build final design profile within EGL bounds
  const finalDesign = [actualLeftSlope, leftBed, rightBed, actualRightSlope];

  // 2. Find all intersections between EGL segments and final design segments
  const allNodes: { x: number; eglY: number; desY: number; isIntersection: boolean }[] = [];

  // Add EGL points
  egl.forEach(p => {
    if (p.x >= actualLeftSlope.x && p.x <= actualRightSlope.x) {
      allNodes.push({ x: p.x, eglY: p.y, desY: getInterpolatedY(p.x, finalDesign), isIntersection: false });
    }
  });

  // Add design key points
  finalDesign.forEach(p => {
    allNodes.push({ x: p.x, eglY: getInterpolatedY(p.x, egl), desY: p.y, isIntersection: false });
  });

  // Check segment intersections
  for (let i = 0; i < egl.length - 1; i++) {
    for (let j = 0; j < finalDesign.length - 1; j++) {
      const ipt = getLineIntersection(egl[i]!, egl[i + 1]!, finalDesign[j]!, finalDesign[j + 1]!);
      if (ipt && ipt.x >= actualLeftSlope.x && ipt.x <= actualRightSlope.x) {
        allNodes.push({ x: ipt.x, eglY: ipt.y, desY: ipt.y, isIntersection: true });
      }
    }
  }

  // Sort nodes from left to right
  allNodes.sort((a, b) => a.x - b.x);

  // Group nodes into regions between intersections
  const regions: EarthworkRegion[] = [];

  for (let i = 0; i < allNodes.length - 1; i++) {
    const curr = allNodes[i]!;
    const next = allNodes[i + 1]!;

    // We skip zero-width segments
    if (Math.abs(next.x - curr.x) < 0.1) continue;

    // Check middle height of segment to classify cut vs fill
    const midEglY = (curr.eglY + next.eglY) / 2;
    const midDesY = (curr.desY + next.desY) / 2;
    const type = midEglY < midDesY ? 'cut' : 'fill'; // SVG Y coordinate is inverted: smaller Y means higher elevation

    // Construct the 4-point trapezoidal sub-region
    const subPoly = [
      { x: curr.x, y: curr.eglY },
      { x: next.x, y: next.eglY },
      { x: next.x, y: next.desY },
      { x: curr.x, y: curr.desY },
    ];

    const { area, centroid } = getPolygonProperties(subPoly);
    const path = `M ${curr.x} ${curr.eglY} L ${next.x} ${next.eglY} L ${next.x} ${next.desY} L ${curr.x} ${curr.desY} Z`;

    regions.push({ type, path, area, centroid });
  }

  return regions;
}

function getInterpolatedY(x: number, profile: Point2D[]): number {
  for (let i = 0; i < profile.length - 1; i++) {
    const p1 = profile[i]!;
    const p2 = profile[i + 1]!;
    if (x >= Math.min(p1.x, p2.x) && x <= Math.max(p1.x, p2.x)) {
      if (p2.x === p1.x) return p1.y;
      const t = (x - p1.x) / (p2.x - p1.x);
      return p1.y + t * (p2.y - p1.y);
    }
  }
  return profile[0]!.y;
}
