import React from 'react';
import { VisualCanvasShape } from '../../types/schema';

interface BeamLoadsProps {
  el: VisualCanvasShape;
  stroke: string;
  fill: string;
  sw: number;
  transform: string;
}

export const BeamLoads: React.FC<BeamLoadsProps> = ({ el, stroke, fill, sw, transform }) => {
  if (el.type === 'udl') {
    const S = el.udlSegmentsCount || 8;
    const ry = el.h * 0.45;
    const rx = el.w / S / 2;
    const y_bottom = el.h;
    const y_top = el.h * 0.55;
    
    let archesPath = `M 0 ${y_bottom}`;
    for (let i = 0; i < S; i++) {
      const x2 = ((i + 1) * el.w) / S;
      archesPath += ` A ${rx} ${ry} 0 0 1 ${x2} ${y_bottom}`;
    }
    
    const arrows = [];
    const numArrows = S + 1;
    for (let i = 0; i < numArrows; i++) {
      const x_i = (i * el.w) / (numArrows - 1);
      arrows.push(
        <g key={i}>
          <line
            x1={x_i}
            y1={y_top}
            x2={x_i}
            y2={y_bottom - 5}
            stroke={stroke}
            strokeWidth={sw}
          />
          <path
            d={`M ${x_i - 3} ${y_bottom - 5} L ${x_i} ${y_bottom} L ${x_i + 3} ${y_bottom - 5} Z`}
            fill={stroke}
          />
        </g>
      );
    }
    
    return (
      <g transform={transform}>
        <line x1={0} y1={y_bottom} x2={el.w} y2={y_bottom} stroke={stroke} strokeWidth={sw} />
        <path d={archesPath} fill="none" stroke={stroke} strokeWidth={sw} />
        {arrows}
      </g>
    );
  }

  if (el.type === 'uvl') {
    const y_bottom = el.h;
    const y1 = el.h - (el.h - 15) * (el.uvlStartHeight ?? 0);
    const y2 = el.h - (el.h - 15) * (el.uvlEndHeight ?? 1);
    
    const arrows = [];
    const numArrows = 6;
    for (let i = 0; i < numArrows; i++) {
      const x_i = (i * el.w) / (numArrows - 1);
      const y_top_i = y1 + ((y2 - y1) * i) / (numArrows - 1);
      arrows.push(
        <g key={i}>
          <line
            x1={x_i}
            y1={y_top_i}
            x2={x_i}
            y2={y_bottom - 5}
            stroke={stroke}
            strokeWidth={sw}
          />
          <path
            d={`M ${x_i - 3} ${y_bottom - 5} L ${x_i} ${y_bottom} L ${x_i + 3} ${y_bottom - 5} Z`}
            fill={stroke}
          />
        </g>
      );
    }
    
    return (
      <g transform={transform}>
        <polygon
          points={`0,${y_bottom} 0,${y1} ${el.w},${y2} ${el.w},${y_bottom}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeOpacity={0.5}
        />
        {arrows}
      </g>
    );
  }

  if (el.type === 'moment') {
    const cw = el.momentDirection !== 'ccw';
    const startAngle = Math.PI / 4;
    const endAngle = 7 * Math.PI / 4;
    const r = Math.min(el.w, el.h) * 0.35;
    const cx = el.w / 2;
    const cy = el.h / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const pathD = cw 
      ? `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`
      : `M ${x2} ${y2} A ${r} ${r} 0 1 0 ${x1} ${y1}`;
    
    const theta = cw ? endAngle : startAngle;
    const arrowLength = 9;
    const arrowAngle = Math.PI / 6;
    const tangent = theta + (cw ? -Math.PI / 2 : Math.PI / 2);
    const ax = cx + r * Math.cos(theta);
    const ay = cy + r * Math.sin(theta);
    
    const p1x = ax - arrowLength * Math.cos(tangent - arrowAngle);
    const p1y = ay - arrowLength * Math.sin(tangent - arrowAngle);
    const p2x = ax - arrowLength * Math.cos(tangent + arrowAngle);
    const p2y = ay - arrowLength * Math.sin(tangent + arrowAngle);
    const arrowheadD = `M ${p1x} ${p1y} L ${ax} ${ay} L ${p2x} ${p2y} Z`;

    return (
      <g transform={transform}>
        <path d={pathD} fill="none" stroke={stroke} strokeWidth={Math.max(2.5, sw)} strokeLinecap="round" />
        <path d={arrowheadD} fill={stroke} />
      </g>
    );
  }

  if (el.type === 'point-load') {
    const dir = el.pointLoadDirection || 'down';
    let x1 = el.w / 2, y1 = 0, x2 = el.w / 2, y2 = el.h;
    let arrowheadD = '';
    
    if (dir === 'down') {
      x1 = el.w / 2; y1 = 0; x2 = el.w / 2; y2 = el.h;
      arrowheadD = `M ${x2 - 6} ${y2 - 12} L ${x2} ${y2} L ${x2 + 6} ${y2 - 12} Z`;
    } else if (dir === 'up') {
      x1 = el.w / 2; y1 = el.h; x2 = el.w / 2; y2 = 0;
      arrowheadD = `M ${x2 - 6} 12 L ${x2} 0 L ${x2 + 6} 12 Z`;
    } else if (dir === 'left') {
      x1 = el.w; y1 = el.h / 2; x2 = 0; y2 = el.h / 2;
      arrowheadD = `M 12 ${y2 - 6} L 0 ${y2} L 12 ${y2 + 6} Z`;
    } else if (dir === 'right') {
      x1 = 0; y1 = el.h / 2; x2 = el.w; y2 = el.h / 2;
      arrowheadD = `M ${x2 - 12} ${y2 - 6} L ${x2} ${y2} L ${x2 - 12} ${y2 + 6} Z`;
    }
    
    return (
      <g transform={transform}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={Math.max(3.5, sw + 1)} strokeLinecap="round" />
        <path d={arrowheadD} fill={stroke} />
      </g>
    );
  }

  return null;
};
