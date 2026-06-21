import { describe, it, expect } from 'vitest';
import { getPolygonProperties, computeEarthworkRegions } from '../cutFillPolygonEngine';

describe('getPolygonProperties (Shoelace & Centroid formulas)', () => {
  it('should compute exact area and centroid for a 10x10 square', () => {
    const square = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
    ];
    const { area, centroid } = getPolygonProperties(square);
    expect(area).toBe(100);
    expect(centroid).toEqual({ x: 5, y: 5 });
  });

  it('should compute exact area and centroid for a right-angled triangle', () => {
    const triangle = [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: 8 },
    ];
    const { area, centroid } = getPolygonProperties(triangle);
    expect(area).toBe(24);
    // Centroid of right triangle is at (b/3, h/3) -> (2, 8/3)
    expect(centroid.x).toBeCloseTo(2);
    expect(centroid.y).toBeCloseTo(2.6666, 3);
  });
});

describe('computeEarthworkRegions', () => {
  it('should return empty list if EGL points are insufficient', () => {
    const result = computeEarthworkRegions([], 100, 10, 1.5, 2.0);
    expect(result).toEqual([]);
  });

  it('should partition cut/fill regions when EGL intersects FL', () => {
    // EGL goes from high to low: (0, 50) to (100, 150)
    // Note: Y coordinates are inverted in SVG (smaller Y is higher elevation).
    // Let's test a simple profile:
    const egl = [
      { x: 0, y: 50 },
      { x: 100, y: 150 },
    ];
    const fl = 100;
    const width = 40; // bed runs from x = 30 to 70

    const regions = computeEarthworkRegions(egl, fl, width, 1.5, 1.5);
    
    // Check that we got valid regions
    expect(regions.length).toBeGreaterThan(0);
    regions.forEach(r => {
      expect(r.path).toContain('M');
      expect(r.area).toBeGreaterThan(0);
      expect(r.centroid.x).toBeGreaterThanOrEqual(0);
      expect(r.centroid.x).toBeLessThanOrEqual(100);
    });
  });
});
