import { VisualCanvasShape } from '../../../types/schema';

export interface SnapResult {
  value: number;
  guides: number[];
}

/**
 * Snaps a 1D horizontal position relative to the slide grid, safe areas, and other shapes.
 */
export function snapX(
  rawX: number,
  width: number,
  elementId: string,
  elements: VisualCanvasShape[],
  snappingEnabled: boolean,
  threshold = 8
): SnapResult {
  let finalX = rawX;
  let guideXs: number[] = [];

  if (!snappingEnabled) {
    return { value: finalX, guides: [] };
  }

  let bestDistX = threshold;
  const checkXSnap = (draggedVal: number, targetVal: number, resultX: number) => {
    const dist = Math.abs(draggedVal - targetVal);
    if (dist < bestDistX) {
      bestDistX = dist;
      finalX = resultX;
      guideXs = [targetVal];
    } else if (dist === bestDistX && bestDistX < threshold) {
      guideXs.push(targetVal);
    }
  };

  // Slide Center
  checkXSnap(rawX + width / 2, 490, 490 - width / 2);
  
  // Safe Area Boundaries
  checkXSnap(rawX, 40, 40);
  checkXSnap(rawX + width, 940, 940 - width);
  checkXSnap(rawX, 940, 940);
  checkXSnap(rawX + width, 40, 40 - width);

  // Other Shapes boundaries & centers
  elements.forEach((other) => {
    if (other.id === elementId) return;
    checkXSnap(rawX, other.x, other.x);
    checkXSnap(rawX, other.x + other.w, other.x + other.w);
    checkXSnap(rawX + width, other.x, other.x - width);
    checkXSnap(rawX + width, other.x + other.w, other.x + other.w - width);
    checkXSnap(rawX + width / 2, other.x + other.w / 2, other.x + other.w / 2 - width / 2);
    checkXSnap(rawX, other.x + other.w / 2, other.x + other.w / 2);
    checkXSnap(rawX + width, other.x + other.w / 2, other.x + other.w / 2 - width);
  });

  return { value: finalX, guides: guideXs };
}

/**
 * Snaps a 1D vertical position relative to the slide grid, safe areas, and other shapes.
 */
export function snapY(
  rawY: number,
  height: number,
  elementId: string,
  elements: VisualCanvasShape[],
  snappingEnabled: boolean,
  threshold = 8
): SnapResult {
  let finalY = rawY;
  let guideYs: number[] = [];

  if (!snappingEnabled) {
    return { value: finalY, guides: [] };
  }

  let bestDistY = threshold;
  const checkYSnap = (draggedVal: number, targetVal: number, resultY: number) => {
    const dist = Math.abs(draggedVal - targetVal);
    if (dist < bestDistY) {
      bestDistY = dist;
      finalY = resultY;
      guideYs = [targetVal];
    } else if (dist === bestDistY && bestDistY < threshold) {
      guideYs.push(targetVal);
    }
  };

  // Slide Center
  checkYSnap(rawY + height / 2, 275.6, 275.6 - height / 2);
  
  // Safe Area Boundaries
  checkYSnap(rawY, 85, 85);
  checkYSnap(rawY + height, 510, 510 - height);
  checkYSnap(rawY, 510, 510);
  checkYSnap(rawY + height, 85, 85 - height);

  // Other Shapes boundaries & centers
  elements.forEach((other) => {
    if (other.id === elementId) return;
    checkYSnap(rawY, other.y, other.y);
    checkYSnap(rawY, other.y + other.h, other.y + other.h);
    checkYSnap(rawY + height, other.y, other.y - height);
    checkYSnap(rawY + height, other.y + other.h, other.y + other.h - height);
    checkYSnap(rawY + height / 2, other.y + other.h / 2, other.y + other.h / 2 - height / 2);
    checkYSnap(rawY, other.y + other.h / 2, other.y + other.h / 2);
    checkYSnap(rawY + height, other.y + other.h / 2, other.y + other.h / 2 - height);
  });

  return { value: finalY, guides: guideYs };
}
