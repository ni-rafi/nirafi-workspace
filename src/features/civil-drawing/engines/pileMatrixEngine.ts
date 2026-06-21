import { Point2D } from '../../building-drawing/types/geometry';

/**
 * Calculates symmetrical 2D offset coordinates for pile groups centered at (0, 0).
 */
export function calculatePileMatrix(
  count: number,
  diameter: number,
  spacingFactor: number = 2.5,
  customOverrides?: Point2D[]
): Point2D[] {
  if (customOverrides && customOverrides.length === count) {
    return customOverrides;
  }

  const s = diameter * spacingFactor;
  const points: Point2D[] = [];

  switch (count) {
    case 1:
      points.push({ x: 0, y: 0 });
      break;

    case 2:
      points.push({ x: -s / 2, y: 0 });
      points.push({ x: s / 2, y: 0 });
      break;

    case 3: {
      // Equilateral triangle layout (centroid at origin)
      const h = (s * Math.sqrt(3)) / 2;
      points.push({ x: 0, y: (-2 / 3) * h });
      points.push({ x: -s / 2, y: (1 / 3) * h });
      points.push({ x: s / 2, y: (1 / 3) * h });
      break;
    }

    case 4:
      // Square layout
      points.push({ x: -s / 2, y: -s / 2 });
      points.push({ x: s / 2, y: -s / 2 });
      points.push({ x: -s / 2, y: s / 2 });
      points.push({ x: s / 2, y: s / 2 });
      break;

    case 5:
      // Square with center pile
      points.push({ x: -s / 2, y: -s / 2 });
      points.push({ x: s / 2, y: -s / 2 });
      points.push({ x: 0, y: 0 });
      points.push({ x: -s / 2, y: s / 2 });
      points.push({ x: s / 2, y: s / 2 });
      break;

    case 6:
      // 2 rows of 3 piles
      points.push({ x: -s, y: -s / 2 });
      points.push({ x: 0, y: -s / 2 });
      points.push({ x: s, y: -s / 2 });
      points.push({ x: -s, y: s / 2 });
      points.push({ x: 0, y: s / 2 });
      points.push({ x: s, y: s / 2 });
      break;

    default:
      // Fallback: simple line array
      for (let i = 0; i < count; i++) {
        points.push({ x: -((count - 1) * s) / 2 + i * s, y: 0 });
      }
      break;
  }

  return points;
}
