import React from 'react';
import { useClickStepsContext } from '../../context/ClickStepsContext';
import { ShapeMorph } from './ShapeMorph';
import { VisualCanvasShape, PhysicalUnit } from '../../types/schema';
import { BeamLoads } from './BeamLoads';
import { BeamSupports } from './BeamSupports';
import { SlideDimensionLines } from './SlideDimensionLines';

interface SlideVisualCanvasProps {
  elements: VisualCanvasShape[];
  scaleFactor?: {
    pixelsPerUnit: number;
    unit: PhysicalUnit;
  };
  editable?: boolean;
  onLabelClick?: (
    elementId: string,
    dimensionKey: 'length' | 'height' | 'diameter' | 'diagonal1' | 'diagonal2',
    currentValue: number,
    clientX: number,
    clientY: number
  ) => void;
  showLayoutBodyBorder?: boolean;
}

export const SlideVisualCanvas: React.FC<SlideVisualCanvasProps> = ({
  elements,
  scaleFactor = { pixelsPerUnit: 150, unit: 'm' },
  editable = false,
  onLabelClick,
  showLayoutBodyBorder = false,
}) => {
  const { currentClick } = useClickStepsContext();

  return (
    <svg
      viewBox="0 0 980 551.25"
      className="w-full h-full overflow-visible pointer-events-none select-none"
    >
      <defs>
        <marker
          id="dim-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-primary/70" />
        </marker>
        <marker
          id="canvas-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-primary" />
        </marker>
      </defs>

      {showLayoutBodyBorder && (
        <g className="pointer-events-none">
          <rect
            x="40"
            y="85"
            width="900"
            height="425"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className="opacity-20"
          />
          <text
            x="45"
            y="78"
            fontSize="9"
            fontWeight="bold"
            className="fill-primary font-mono opacity-40 tracking-wider"
          >
            LAYOUT BODY BOUNDS (SAFE AREA)
          </text>
        </g>
      )}

      {elements.map((el) => {
        const isVisible =
          editable ||
          (currentClick >= el.enterAt && (el.exitAt === undefined || currentClick < el.exitAt));
        if (!isVisible) return null;

        const transform = `translate(${el.x}, ${el.y}) rotate(${el.rotate || 0}, ${el.w / 2}, ${el.h / 2})`;
        const fill = el.fill || 'var(--primary)';
        const stroke = el.stroke || 'rgba(255,255,255,0.15)';
        const sw = el.strokeWidth || 1.5;
        const animationClass =
          !editable && el.animation && el.animation !== 'none'
            ? `slidev-vclick-anim-${el.animation}`
            : '';

        const isLoad = ['udl', 'uvl', 'moment', 'point-load'].includes(el.type);
        const isSupport = ['support-pin', 'support-roller', 'support-fixed', 'hinge'].includes(el.type);

        return (
          <g key={el.id} className={`${animationClass} pointer-events-auto`}>
            {/* 1. Custom loads rendering */}
            {isLoad && (
              <BeamLoads
                el={el}
                stroke={stroke}
                fill={fill}
                sw={sw}
                transform={transform}
              />
            )}

            {/* 2. Custom supports rendering */}
            {isSupport && (
              <BeamSupports
                el={el}
                stroke={stroke}
                fill={fill}
                sw={sw}
                transform={transform}
              />
            )}

            {/* 3. Standard shape rendering */}
            {!isLoad && !isSupport && (() => {
              if (el.type === 'arrow') {
                return (
                  <line
                    x1={el.x}
                    y1={el.y}
                    x2={el.x + el.w}
                    y2={el.y + el.h}
                    stroke={fill}
                    strokeWidth={el.strokeWidth || 3.5}
                    markerEnd="url(#canvas-arrow)"
                  />
                );
              }
              if (el.type === 'text') {
                return (
                  <text
                    x={el.x}
                    y={el.y}
                    transform={`rotate(${el.rotate || 0}, ${el.x}, ${el.y})`}
                    className="fill-foreground font-mono text-[11px] font-bold"
                  >
                    {el.label || 'Text'}
                  </text>
                );
              }

              return (
                <g transform={transform}>
                  <foreignObject width={el.w} height={el.h} className="overflow-visible">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <ShapeMorph
                          type={el.type === 'rounded-arrow' ? 'arrow' : el.type}
                          w={el.w}
                          h={el.h}
                          points={el.points}
                          borderRadius={el.borderRadius}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={sw}
                          strokeLinejoin={el.type === 'rounded-arrow' ? 'round' : undefined}
                          strokeLinecap={el.type === 'rounded-arrow' ? 'round' : undefined}
                        />
                      </svg>
                      {el.label && (
                        <span className="relative z-10 text-[9px] font-mono font-bold text-foreground text-center px-1">
                          {el.label}
                        </span>
                      )}
                    </div>
                  </foreignObject>
                </g>
              );
            })()}

            {/* 4. Dimension lines rendering */}
            <SlideDimensionLines
              el={el}
              scaleFactor={scaleFactor}
              editable={editable}
              onLabelClick={onLabelClick}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default SlideVisualCanvas;
