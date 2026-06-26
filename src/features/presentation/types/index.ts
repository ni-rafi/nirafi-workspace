/**
 * Core slide canvas dimensions configuration.
 */
export interface SlideDimensions {
  /** Width in pixels of the virtual slide canvas */
  width: number;
  /** Aspect ratio of the canvas width/height (e.g. 16/9 = 1.777) */
  aspectRatio: number;
}

/**
 * Per-slide parameters configuration.
 */
export interface SlideConfig {
  /** Scaling factor override for this specific slide (e.g. 0.8) */
  zoom?: number;
}

/**
 * Single coordinate point representation.
 */
export interface Point {
  x: number;
  y: number;
}

export type VectorElementType = 'pencil' | 'line' | 'arrow' | 'rect' | 'circle' | 'text';

export interface VectorElement {
  id: string;
  type: VectorElementType;
  points: Point[]; // For pencil (polygon outline points), line/arrow (start/end), rect/circle (corners), text (position)
  color: string;
  strokeWidth: number;
  translate: Point;
  /** Optional text content for type === 'text' elements */
  text?: string;
}

