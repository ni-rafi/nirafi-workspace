import { Point2D } from '../../building-drawing/types/geometry';
import { PavementLayerSpec } from '../types/roadSchema';

export interface PavementLayerGeometry {
  id: string;
  name: string;
  polygonPoints: Point2D[]; // loop of coordinates rendering the layer block
  colorClass: string;
}

/**
 * Calculates parallel cambered coordinates for stacked pavement layers.
 */
export function calculatePavementLayers(
  carriagewayWidth: number,
  camberPercentage: number,
  layers: PavementLayerSpec[]
): PavementLayerGeometry[] {
  const w = carriagewayWidth;
  const halfW = w / 2;
  const slope = camberPercentage / 100;

  // Finished surface center elevation is at 0
  const getSurfaceY = (x: number): number => {
    return -Math.abs(x) * slope;
  };

  const geoms: PavementLayerGeometry[] = [];
  let currentDepth = 0;

  layers.forEach(layer => {
    const topD = currentDepth;
    const bottomD = currentDepth + layer.thickness;

    // Top boundary coordinates
    const leftTop = { x: -halfW, y: getSurfaceY(-halfW) + topD };
    const centerTop = { x: 0, y: getSurfaceY(0) + topD };
    const rightTop = { x: halfW, y: getSurfaceY(halfW) + topD };

    // Bottom boundary coordinates
    const isFlatBottom = !!layer.isSubgrade;
    const leftBottom = { x: -halfW, y: isFlatBottom ? bottomD : getSurfaceY(-halfW) + bottomD };
    const centerBottom = { x: 0, y: isFlatBottom ? bottomD : getSurfaceY(0) + bottomD };
    const rightBottom = { x: halfW, y: isFlatBottom ? bottomD : getSurfaceY(halfW) + bottomD };

    // Polygon path outline (Left-Top -> Center-Top -> Right-Top -> Right-Bottom -> Center-Bottom -> Left-Bottom)
    const polygonPoints: Point2D[] = [
      leftTop,
      centerTop,
      rightTop,
      rightBottom,
      centerBottom,
      leftBottom,
    ];

    geoms.push({
      id: layer.id,
      name: layer.name,
      polygonPoints,
      colorClass: layer.colorClass,
    });

    currentDepth = bottomD;
  });

  return geoms;
}
