import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { FlatTOCItem, ComputedSVG } from './types';

const BASE_OFFSET = 8;

function getLineOffset(depth: number): number {
  if (depth <= 2) return BASE_OFFSET;
  if (depth === 3) return 8 + BASE_OFFSET;
  return 16 + BASE_OFFSET;
}

export function useSVGTrack(
  sidebarRef: React.RefObject<HTMLDivElement | null>,
  itemsWithActive: FlatTOCItem[]
) {
  const [svgData, setSvgData] = useState<ComputedSVG | null>(null);

  const recalculateSVGTrack = useCallback(() => {
    const container = sidebarRef.current;
    if (!container || container.clientHeight === 0) return;
    if (itemsWithActive.length === 0) {
      setSvgData(null);
      return;
    }

    let w = 0;
    let h = 0;
    let d = '';
    const positions: [top: number, bottom: number, x: number][] = [];
    const output: React.ReactNode[] = [];

    for (let i = 0; i < itemsWithActive.length; i++) {
      const item = itemsWithActive[i];
      if (!item) continue;
      const element: HTMLElement | null = container.querySelector(`a[href="${item.url}"]`);
      if (!element) continue;

      const styles = getComputedStyle(element);
      const x = getLineOffset(item.depth) + 0.5;
      const top = element.offsetTop + parseFloat(styles.paddingTop);
      const bottom = element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom);

      w = Math.max(x + 8, w);
      h = Math.max(h, bottom);

      if (i === 0) {
        d += ` M${x} ${top} L${x} ${bottom}`;
      } else {
        const prevPos = i > 0 ? positions[i - 1] : undefined;
        const upperX = prevPos ? prevPos[2] : 0;
        const upperBottom = prevPos ? prevPos[1] : 0;
        d += ` C ${upperX} ${top - 4} ${x} ${upperBottom + 4} ${x} ${top} L${x} ${bottom}`;
      }

      positions.push([top, bottom, x]);
    }

    // Insert background line track
    output.unshift(
      <path key="path" d={d} className="stroke-primary" strokeWidth="1.5" fill="none" />
    );

    const itemLineLengths: [top: number, bottom: number][] = [];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);

    const n = path.getTotalLength();
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      if (!pos) continue;
      const [top, bottom] = pos;

      const prevLine = i > 0 ? itemLineLengths[i - 1] : undefined;
      const prevPos = i > 0 ? positions[i - 1] : undefined;

      let l = prevLine && prevPos
        ? prevLine[1] + (top - prevPos[1])
        : top;

      while (l < n && path.getPointAtLength(l).y < top) l++;
      itemLineLengths.push([l, l + bottom - top]);
    }

    setSvgData({
      content: output,
      width: w,
      height: h,
      d,
      itemLineLengths,
      positions,
    });
  }, [itemsWithActive, sidebarRef]);

  useEffect(() => {
    const container = sidebarRef.current;
    if (!container) return;

    const observer = new ResizeObserver(recalculateSVGTrack);
    observer.observe(container);
    recalculateSVGTrack();

    return () => {
      observer.unobserve(container);
    };
  }, [recalculateSVGTrack, sidebarRef]);

  // Compute ThumbTrack properties
  const trackStyle = useMemo<React.CSSProperties & Record<string, string>>(() => {
    const out: Record<string, string> = {};
    if (!svgData) return out;

    const lineStartIdx = itemsWithActive.findIndex((item) => item.active || item.visible);
    const lineEndIdx = itemsWithActive.findLastIndex((item) => item.active || item.visible);
    const dotIdx = itemsWithActive.findIndex((item) => item.active);

    if (lineStartIdx === -1 || lineEndIdx === -1) return out;

    const startPos = svgData.positions[lineStartIdx];
    const endPos = svgData.positions[lineEndIdx];
    if (!startPos || !endPos) return out;

    out['--track-top'] = `${startPos[0]}px`;
    out['--track-bottom'] = `${endPos[1]}px`;

    if (dotIdx !== -1) {
      const dotLine = svgData.itemLineLengths[dotIdx];
      const dotPos = svgData.positions[dotIdx];
      if (dotLine && dotPos) {
        // Center the dot vertically on the item line segment length
        out['--offset-distance'] = `${(dotLine[0] + dotLine[1]) / 2}px`;
        out['--opacity'] = '1';
      }
    } else {
      out['--opacity'] = '0';
    }

    return out;
  }, [svgData, itemsWithActive]);

  return { svgData, trackStyle };
}
