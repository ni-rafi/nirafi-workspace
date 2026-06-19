import { VisualCanvasShape } from '../../../types/schema';

export function createDefaultShape(
  type: VisualCanvasShape['type']
): Omit<VisualCanvasShape, 'id' | 'x' | 'y' | 'enterAt'> {
  let defaultDims = {};
  let w = 200;
  let h = 80;
  let extraFields: Partial<VisualCanvasShape> = {};

  if (type === 'circle' || type === 'hinge') {
    const d = type === 'hinge' ? 0.3 : 1.0;
    defaultDims = { diameter: d };
    w = type === 'hinge' ? 30 : 150;
    h = type === 'hinge' ? 30 : 150;
  } else if (type === 'triangle' || type === 'polygon') {
    defaultDims = { length: 2.0, height: 1.5 };
    w = 200;
    h = 150;
  } else if (type === 'rhombus') {
    defaultDims = { diagonal1: 2.0, diagonal2: 1.5 };
    w = 200;
    h = 150;
  } else if (type === 'udl') {
    defaultDims = { length: 3.0, height: 0.6 };
    w = 300;
    h = 60;
    extraFields = { udlSegmentsCount: 8 };
  } else if (type === 'uvl') {
    defaultDims = { length: 3.0, height: 0.6 };
    w = 300;
    h = 60;
    extraFields = { uvlStartHeight: 0, uvlEndHeight: 1 };
  } else if (type === 'moment') {
    defaultDims = { length: 1.0, height: 1.0 };
    w = 100;
    h = 100;
    extraFields = { momentDirection: 'cw' };
  } else if (type === 'point-load') {
    defaultDims = { length: 0.4, height: 1.2 };
    w = 40;
    h = 120;
    extraFields = { pointLoadDirection: 'down' };
  } else if (type === 'support-pin' || type === 'support-roller') {
    defaultDims = { length: 0.8, height: 0.8 };
    w = 80;
    h = 80;
  } else if (type === 'support-fixed') {
    defaultDims = { length: 0.4, height: 1.2 };
    w = 40;
    h = 120;
  } else if (type === 'rounded-arrow') {
    defaultDims = { length: 2.0, height: 0.8 };
    w = 200;
    h = 80;
    extraFields = { borderRadius: 6 };
  } else {
    defaultDims = { length: 2.0, height: 0.4 };
    w = 200;
    h = 80;
  }

  const points =
    type === 'polygon'
      ? [
          { x: 0, y: 0 },
          { x: 200, y: 0 },
          { x: 200, y: 150 },
          { x: 0, y: 150 },
        ]
      : undefined;

  const noDimensionLines =
    type === 'polygon' ||
    type === 'hinge' ||
    type === 'support-pin' ||
    type === 'support-roller' ||
    type === 'support-fixed';

  const noLabel =
    type === 'udl' ||
    type === 'uvl' ||
    type === 'moment' ||
    type === 'point-load' ||
    type === 'hinge' ||
    type.startsWith('support-');

  return {
    type,
    w,
    h,
    fill: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    stroke: 'var(--primary)',
    strokeWidth: 2,
    showDimensionLines: !noDimensionLines,
    dimensions: defaultDims,
    label: noLabel ? '' : `${type.toUpperCase()}`,
    points,
    ...extraFields,
  };
}
