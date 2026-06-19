import React from 'react';
import { VisualCanvasShape } from '../../types/schema';

interface BeamSupportsProps {
  el: VisualCanvasShape;
  stroke: string;
  fill: string;
  sw: number;
  transform: string;
}

export const BeamSupports: React.FC<BeamSupportsProps> = ({ el, stroke, fill, sw, transform }) => {
  if (el.type === 'support-pin') {
    const ty = el.h * 0.7;
    const pts = `${el.w/2},0 ${el.w*0.15},${ty} ${el.w*0.85},${ty}`;
    const hatches = [];
    const startX = el.w * 0.1;
    const endX = el.w * 0.9;
    const step = 8;
    for (let x = startX; x <= endX; x += step) {
      hatches.push(
        <line
          key={x}
          x1={x}
          y1={ty}
          x2={x - 6}
          y2={el.h}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    }
    return (
      <g transform={transform}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
        <line x1={startX} y1={ty} x2={endX} y2={ty} stroke={stroke} strokeWidth={sw} />
        {hatches}
      </g>
    );
  }

  if (el.type === 'support-roller') {
    const ty = el.h * 0.55;
    const wheelY = el.h * 0.68;
    const wheelR = el.h * 0.08;
    const basePlateY = el.h * 0.78;
    const pts = `${el.w/2},0 ${el.w*0.15},${ty} ${el.w*0.85},${ty}`;
    const hatches = [];
    const startX = el.w * 0.1;
    const endX = el.w * 0.9;
    const step = 8;
    for (let x = startX; x <= endX; x += step) {
      hatches.push(
        <line
          key={x}
          x1={x}
          y1={basePlateY}
          x2={x - 6}
          y2={el.h}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    }
    return (
      <g transform={transform}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} />
        <circle cx={el.w * 0.35} cy={wheelY} r={wheelR} fill="none" stroke={stroke} strokeWidth={sw} />
        <circle cx={el.w * 0.65} cy={wheelY} r={wheelR} fill="none" stroke={stroke} strokeWidth={sw} />
        <line x1={startX} y1={basePlateY} x2={endX} y2={basePlateY} stroke={stroke} strokeWidth={sw} />
        {hatches}
      </g>
    );
  }

  if (el.type === 'support-fixed') {
    const wallX = 12;
    const hatches = [];
    const step = 10;
    for (let y = 0; y <= el.h; y += step) {
      hatches.push(
        <line
          key={y}
          x1={wallX}
          y1={y}
          x2={0}
          y2={y + 8}
          stroke={stroke}
          strokeWidth={sw}
        />
      );
    }
    return (
      <g transform={transform}>
        <line x1={wallX} y1={0} x2={wallX} y2={el.h} stroke={stroke} strokeWidth={Math.max(3, sw + 1)} />
        {hatches}
      </g>
    );
  }

  if (el.type === 'hinge') {
    return (
      <g transform={transform}>
        <circle
          cx={el.w / 2}
          cy={el.h / 2}
          r={Math.min(el.w, el.h) * 0.35}
          fill="var(--background, #030712)"
          stroke={stroke}
          strokeWidth={Math.max(2.5, sw + 0.5)}
        />
      </g>
    );
  }

  return null;
};
