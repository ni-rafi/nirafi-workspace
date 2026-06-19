import React from 'react';
import { VisualCanvasShape, PhysicalUnit } from '../../types/schema';

interface SlideDimensionLinesProps {
  el: VisualCanvasShape;
  scaleFactor: { pixelsPerUnit: number; unit: PhysicalUnit };
  editable: boolean;
  onLabelClick?: (
    elementId: string,
    dimensionKey: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2',
    currentValue: number,
    clientX: number,
    clientY: number
  ) => void;
}

export const SlideDimensionLines: React.FC<SlideDimensionLinesProps> = ({
  el,
  scaleFactor,
  editable,
  onLabelClick,
}) => {
  if (!el.showDimensionLines || !el.dimensions) return null;

  const handleLabelPointerDown = (
    e: React.MouseEvent,
    elId: string,
    key: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2',
    val: number
  ) => {
    if (!editable || !onLabelClick) return;
    e.stopPropagation();
    onLabelClick(elId, key, val, e.clientX, e.clientY);
  };

  const renderDimLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    labelText: string,
    dimKey: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2',
    val: number,
    elId: string,
    isDotted = false
  ) => {
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const isVertical = Math.abs(x1 - x2) < 2;
    const textAngle = isVertical ? -90 : 0;

    return (
      <g className="select-none font-mono">
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={isDotted ? '3 3' : undefined}
          markerStart={isDotted ? undefined : 'url(#dim-arrow)'}
          markerEnd={isDotted ? undefined : 'url(#dim-arrow)'}
          className="text-primary/70"
        />
        <g
          transform={`translate(${cx}, ${cy}) rotate(${textAngle})`}
          onClick={(e) => handleLabelPointerDown(e, elId, dimKey, val)}
          className={editable ? 'cursor-pointer hover:text-primary' : ''}
        >
          <rect
            x="-24"
            y="-7"
            width="48"
            height="14"
            fill="var(--background, #030712)"
            rx="3"
            className="stroke-border/30 stroke-[0.5]"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8"
            fontWeight="bold"
            className="fill-foreground font-sans tracking-wide"
          >
            {labelText}
          </text>
        </g>
      </g>
    );
  };

  const dims = el.dimensions;
  const unit = scaleFactor.unit;
  const offset = 20;

  const cx = el.x + el.w / 2;
  const cy = el.y + el.h / 2;

  if (el.type === 'circle' && dims.diameter !== undefined) {
    const r = Math.min(el.w, el.h) / 2;
    const dx = r * Math.cos(Math.PI / 4);
    const dy = r * Math.sin(Math.PI / 4);
    return renderDimLine(
      cx - dx,
      cy + dy,
      cx + dx,
      cy - dy,
      `ø ${dims.diameter}${unit}`,
      'diameter',
      dims.diameter,
      el.id
    );
  }

  if (el.type === 'triangle') {
    const baseVal = dims.length || 0;
    const heightVal = dims.height || 0;
    return (
      <g>
        {renderDimLine(
          el.x,
          el.y + el.h + offset,
          el.x + el.w,
          el.y + el.h + offset,
          `b: ${baseVal}${unit}`,
          'length',
          baseVal,
          el.id
        )}
        {renderDimLine(
          cx,
          el.y,
          cx,
          el.y + el.h,
          `h: ${heightVal}${unit}`,
          'height',
          heightVal,
          el.id,
          true
        )}
      </g>
    );
  }

  if (el.type === 'rhombus') {
    const d1Val = dims.diagonal1 || 0;
    const d2Val = dims.diagonal2 || 0;
    return (
      <g>
        {renderDimLine(
          el.x,
          cy,
          el.x + el.w,
          cy,
          `d1: ${d1Val}${unit}`,
          'diagonal1',
          d1Val,
          el.id,
          true
        )}
        {renderDimLine(
          cx,
          el.y,
          cx,
          el.y + el.h,
          `d2: ${d2Val}${unit}`,
          'diagonal2',
          d2Val,
          el.id,
          true
        )}
      </g>
    );
  }

  const wVal = dims.length || 0;
  const hVal = dims.height || 0;
  return (
    <g>
      {wVal > 0 &&
        renderDimLine(
          el.x,
          el.y + el.h + offset,
          el.x + el.w,
          el.y + el.h + offset,
          `${wVal}${unit}`,
          'length',
          wVal,
          el.id
        )}
      {hVal > 0 &&
        renderDimLine(
          el.x + el.w + offset,
          el.y,
          el.x + el.w + offset,
          el.y + el.h,
          `${hVal}${unit}`,
          'height',
          hVal,
          el.id
        )}
    </g>
  );
};

export default SlideDimensionLines;
