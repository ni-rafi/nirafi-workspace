import React from 'react';
import { ICrossSection } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';

interface ProfileShapeViewProps {
  shape: ICrossSection;
  centroid: number;
  toPixelY: (yNA: number) => number;
  inspectY: number;
  currentWidth: number;
  xSection?: number;
  sliceHeight?: number;
  sliceDirection?: 'above' | 'below';
  showAllDimensions?: boolean;
  showCentroidDim?: boolean;
  chartH?: number;
}

export const ProfileShapeView: React.FC<ProfileShapeViewProps> = ({
  shape,
  centroid,
  toPixelY,
  inspectY,
  currentWidth,
  xSection: xSectionProp,
  sliceHeight,
  sliceDirection,
  showAllDimensions = false,
  showCentroidDim = false,
  chartH: chartHProp,
}) => {
  const H = shape.type === 'circular' ? (shape.diameter ?? 0.1) : (shape.height ?? 0.2);

  // SVG parameters
  const paddingY = 20;
  const chartH = chartHProp ?? 110;
  const height = chartH + paddingY * 2;

  const xSection = xSectionProp ?? 45;

  const scaleY = chartH / H;
  const scaleX = scaleY;

  const W_top = shape.type === 'circular' ? (shape.diameter ?? 0.15) : (shape.width ?? 0.15);
  const W_bot = (shape.type === 'i-beam' || shape.type === 'channel') ? (shape.widthBottom ?? W_top) : W_top;

  const tf_top = shape.thicknessFlange ?? 0.01;
  const tf_bot = (shape.type === 'i-beam' || shape.type === 'channel') ? (shape.thicknessFlangeBottom ?? tf_top) : tf_top;
  const tw = shape.thicknessWeb ?? (shape.type === 't-beam' ? 0.008 : 0.006);
  const d = shape.diameter ?? 0.1;

  const maxW = Math.max(W_top, W_bot);
  const maxWPx = maxW * scaleX;
  const wTopPx = W_top * scaleX;
  const wBotPx = W_bot * scaleX;

  const px0Top = shape.type === 'channel' ? (xSection - maxWPx / 2) : (xSection - wTopPx / 2);
  const px0Bot = shape.type === 'channel' ? (xSection - maxWPx / 2) : (xSection - wBotPx / 2);
  const px0Web = shape.type === 'channel' ? (xSection - maxWPx / 2) : (shape.type === 'i-beam' ? xSection - (tw * scaleX) / 2 : px0Top);

  const leftEdge = Math.min(px0Top, px0Bot);
  const rightEdge = xSection + maxWPx / 2;
  const py0 = paddingY;
  const py1 = paddingY + chartH;

  const pyInspect = toPixelY(inspectY / 1000);

  const renderSliceHighlight = () => {
    if (sliceHeight === undefined || !sliceDirection) return null;

    const sliceHeight_m = sliceHeight / 1000;
    const yTopLimit = H - centroid;
    const yBotLimit = -centroid;

    const highlightFill = "rgba(245, 158, 11, 0.32)";
    const highlightStroke = "#f59e0b";

    if (shape.type === 'rectangular') {
      if (sliceDirection === 'above') {
        const topY = toPixelY(yTopLimit);
        const botY = toPixelY(sliceHeight_m);
        return (
          <rect
            x={xSection - wTopPx / 2}
            y={topY}
            width={wTopPx}
            height={Math.max(0, botY - topY)}
            fill={highlightFill}
            stroke={highlightStroke}
            strokeWidth={1}
            className="animate-in fade-in duration-300"
          />
        );
      } else {
        const topY = toPixelY(sliceHeight_m);
        const botY = toPixelY(yBotLimit);
        return (
          <rect
            x={xSection - wTopPx / 2}
            y={topY}
            width={wTopPx}
            height={Math.max(0, botY - topY)}
            fill={highlightFill}
            stroke={highlightStroke}
            strokeWidth={1}
            className="animate-in fade-in duration-300"
          />
        );
      }
    }

    if (shape.type === 'i-beam' || shape.type === 'channel') {
      const twPx = tw * scaleX;

      const yTopFlangeBot = H - tf_top - centroid;
      const yBotFlangeTop = tf_bot - centroid;

      if (sliceDirection === 'above') {
        const parts: React.ReactNode[] = [];

        // 1. Top Flange portion
        if (yTopLimit > yTopFlangeBot) {
          const startY = Math.max(sliceHeight_m, yTopFlangeBot);
          const topY = toPixelY(yTopLimit);
          const botY = toPixelY(startY);
          if (botY > topY) {
            parts.push(
              <rect
                key="top-flange-slice"
                x={px0Top}
                y={topY}
                width={wTopPx}
                height={botY - topY}
                fill={highlightFill}
                stroke={highlightStroke}
                strokeWidth={1}
                className="animate-in fade-in duration-300"
              />
            );
          }
        }

        // 2. Web portion
        if (sliceHeight_m < yTopFlangeBot && yTopFlangeBot > yBotFlangeTop) {
          const startY = Math.max(sliceHeight_m, yBotFlangeTop);
          const topY = toPixelY(yTopFlangeBot);
          const botY = toPixelY(startY);
          if (botY > topY) {
            parts.push(
              <rect
                key="web-slice"
                x={px0Web}
                y={topY}
                width={twPx}
                height={botY - topY}
                fill={highlightFill}
                stroke={highlightStroke}
                strokeWidth={1}
                className="animate-in fade-in duration-300"
              />
            );
          }
        }

        return <g>{parts}</g>;
      } else {
        const parts: React.ReactNode[] = [];

        // 1. Bottom Flange portion
        if (yBotFlangeTop > yBotLimit) {
          const endY = Math.min(sliceHeight_m, yBotFlangeTop);
          const topY = toPixelY(endY);
          const botY = toPixelY(yBotLimit);
          if (botY > topY) {
            parts.push(
              <rect
                key="bot-flange-slice"
                x={px0Bot}
                y={topY}
                width={wBotPx}
                height={botY - topY}
                fill={highlightFill}
                stroke={highlightStroke}
                strokeWidth={1}
                className="animate-in fade-in duration-300"
              />
            );
          }
        }

        // 2. Web portion
        if (sliceHeight_m > yBotFlangeTop && yTopFlangeBot > yBotFlangeTop) {
          const endY = Math.min(sliceHeight_m, yTopFlangeBot);
          const topY = toPixelY(endY);
          const botY = toPixelY(yBotFlangeTop);
          if (botY > topY) {
            parts.push(
              <rect
                key="web-slice-bot"
                x={px0Web}
                y={topY}
                width={twPx}
                height={botY - topY}
                fill={highlightFill}
                stroke={highlightStroke}
                strokeWidth={1}
                className="animate-in fade-in duration-300"
              />
            );
          }
        }

        return <g>{parts}</g>;
      }
    }

    return null;
  };

  const renderProfileShape = () => {
    const tfTopPx = tf_top * scaleX;
    const tfBotPx = tf_bot * scaleX;
    const twPx = tw * scaleX;
    const dPx = d * scaleX;

    switch (shape.type) {
      case 'rectangular':
        return <rect x={xSection - wTopPx / 2} y={py0} width={wTopPx} height={chartH} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />;
      case 'circular':
        const rPx = Math.min(chartH / 2, dPx / 2);
        return <circle cx={xSection} cy={height / 2} r={rPx} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />;
      case 'i-beam':
      case 'channel':
        return (
          <g>
            {/* Top Flange */}
            <rect x={px0Top} y={py0} width={wTopPx} height={tfTopPx} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />
            {/* Bottom Flange */}
            <rect x={px0Bot} y={py0 + chartH - tfBotPx} width={wBotPx} height={tfBotPx} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />
            {/* Web */}
            <rect
              x={px0Web}
              y={py0 + tfTopPx - 0.2}
              width={twPx}
              height={chartH - tfTopPx - tfBotPx + 0.4}
              className="fill-primary/10 stroke-muted-foreground"
              strokeWidth={1}
            />
          </g>
        );
      case 't-beam':
        return (
          <g>
            <rect x={px0Top} y={py0} width={wTopPx} height={tfTopPx} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />
            <rect x={xSection - twPx / 2} y={py0 + tfTopPx - 0.2} width={twPx} height={chartH - tfTopPx + 0.2} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1} />
          </g>
        );
      default:
        return <line x1={xSection} y1={py0} x2={xSection} y2={py0 + chartH} stroke="var(--foreground)" strokeWidth={3} />;
    }
  };

  const tfTopPx = tf_top * scaleX;
  const tfBotPx = tf_bot * scaleX;
  const twPx = tw * scaleX;

  const renderExtraDimensions = () => {
    if (!showAllDimensions) return null;

    return (
      <g className="animate-in fade-in duration-300">
        {/* Top flange width bf,top */}
        <line x1={px0Top} y1={py0 - 10} x2={px0Top} y2={py0 - 2} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={px0Top + wTopPx} y1={py0 - 10} x2={px0Top + wTopPx} y2={py0 - 2} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={px0Top} y1={py0 - 6} x2={px0Top + wTopPx} y2={py0 - 6} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={px0Top - 2} y1={py0 - 4} x2={px0Top + 2} y2={py0 - 8} stroke="var(--muted-foreground)" strokeWidth={1} />
        <line x1={px0Top + wTopPx - 2} y1={py0 - 4} x2={px0Top + wTopPx + 2} y2={py0 - 8} stroke="var(--muted-foreground)" strokeWidth={1} />
        <text x={px0Top + wTopPx / 2} y={py0 - 12} textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono font-bold">
          bf,top={(W_top * 1000).toFixed(0)}mm
        </text>

        {/* Top flange thickness tf,top */}
        <line x1={leftEdge - 15} y1={py0} x2={px0Top - 2} y2={py0} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={leftEdge - 15} y1={py0 + tfTopPx} x2={px0Top - 2} y2={py0 + tfTopPx} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={leftEdge - 10} y1={py0} x2={leftEdge - 10} y2={py0 + tfTopPx} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={leftEdge - 12} y1={py0 + 2} x2={leftEdge - 8} y2={py0 - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <line x1={leftEdge - 12} y1={py0 + tfTopPx + 2} x2={leftEdge - 8} y2={py0 + tfTopPx - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <text x={leftEdge - 15} y={py0 + tfTopPx / 2 + 3} textAnchor="end" className="fill-muted-foreground text-[8px] font-mono font-bold">
          tf,top={(tf_top * 1000).toFixed(0)}
        </text>

        {/* Bottom flange thickness tf,bot */}
        <line x1={leftEdge - 15} y1={py1 - tfBotPx} x2={px0Bot - 2} y2={py1 - tfBotPx} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={leftEdge - 15} y1={py1} x2={px0Bot - 2} y2={py1} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={leftEdge - 10} y1={py1 - tfBotPx} x2={leftEdge - 10} y2={py1} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={leftEdge - 12} y1={py1 - tfBotPx + 2} x2={leftEdge - 8} y2={py1 - tfBotPx - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <line x1={leftEdge - 12} y1={py1 + 2} x2={leftEdge - 8} y2={py1 - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <text x={leftEdge - 15} y={py1 - tfBotPx / 2 + 3} textAnchor="end" className="fill-muted-foreground text-[8px] font-mono font-bold">
          tf,bot={(tf_bot * 1000).toFixed(0)}
        </text>

        {/* Web thickness tw (relocated high inside web to clear N.A. line) */}
        <line x1={px0Web} y1={py0 + tfTopPx + 8} x2={px0Web + twPx} y2={py0 + tfTopPx + 8} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={px0Web} y1={py0 + tfTopPx + 5} x2={px0Web} y2={py0 + tfTopPx + 11} stroke="var(--muted-foreground)" strokeWidth={0.5} />
        <line x1={px0Web + twPx} y1={py0 + tfTopPx + 5} x2={px0Web + twPx} y2={py0 + tfTopPx + 11} stroke="var(--muted-foreground)" strokeWidth={0.5} />
        <text x={px0Web + twPx / 2} y={py0 + tfTopPx + 16} textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono font-bold animate-in fade-in duration-300">
          tw={(tw * 1000).toFixed(0)}mm
        </text>
      </g>
    );
  };

  const renderCentroidDimension = () => {
    if (!showCentroidDim) return null;
    const pyCentroid = toPixelY(0);
    const pyBottom = toPixelY(-centroid);

    return (
      <g className="animate-in fade-in duration-300">
        <line x1={rightEdge + 2} y1={pyCentroid} x2={rightEdge + 14} y2={pyCentroid} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={rightEdge + 2} y1={pyBottom} x2={rightEdge + 14} y2={pyBottom} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
        <line x1={rightEdge + 10} y1={pyCentroid} x2={rightEdge + 10} y2={pyBottom} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={rightEdge + 8} y1={pyCentroid + 2} x2={rightEdge + 12} y2={pyCentroid - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <line x1={rightEdge + 8} y1={pyBottom + 2} x2={rightEdge + 12} y2={pyBottom - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
        <text x={rightEdge + 15} y={(pyCentroid + pyBottom) / 2 + 3} textAnchor="start" className="fill-muted-foreground text-[8px] font-mono font-bold">
          ȳ={(centroid * 1000).toFixed(0)}mm
        </text>
      </g>
    );
  };

  const hOffset = showAllDimensions ? 20 : 10;

  return (
    <g>
      {/* Section Title (hidden when showing full dimensions to prevent bf,top overlap) */}
      {!showAllDimensions && (
        <text x={xSection} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">PROFILE</text>
      )}

      {/* 2D Shape SVG */}
      {renderProfileShape()}

      {/* Slice Q Highlight Area */}
      {renderSliceHighlight()}

      {/* Extra Dimensions (tf,tw,bf) */}
      {renderExtraDimensions()}

      {/* Centroid NA Measurement line */}
      {renderCentroidDimension()}

      {/* Width Dimension Line (Bottom) */}
      {shape.type !== 'circular' && (
        <g>
          <line x1={px0Bot} y1={py1 + 2} x2={px0Bot} y2={py1 + 10} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
          <line x1={px0Bot + wBotPx} y1={py1 + 2} x2={px0Bot + wBotPx} y2={py1 + 10} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
          <line x1={px0Bot} y1={py1 + 6} x2={px0Bot + wBotPx} y2={py1 + 6} stroke="var(--muted-foreground)" strokeWidth={0.8} />
          <line x1={px0Bot - 2} y1={py1 + 8} x2={px0Bot + 2} y2={py1 + 4} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={px0Bot + wBotPx - 2} y1={py1 + 8} x2={px0Bot + wBotPx + 2} y2={py1 + 4} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={px0Bot + wBotPx / 2} y={py1 + 16} textAnchor="middle" className="fill-muted-foreground text-[8.5px] font-mono font-bold">
            {shape.type === 'rectangular' ? 'b' : ((shape.type === 'i-beam' || shape.type === 'channel') ? 'bf,bot' : 'bf')}={(W_bot * 1000).toFixed(0)}mm
          </text>
        </g>
      )}

      {/* Height Dimension Line (Left) - shifted outward when showing extra dimensions */}
      {shape.type !== 'circular' && (
        <g>
          <line x1={leftEdge - 2} y1={py0} x2={leftEdge - hOffset - 4} y2={py0} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
          <line x1={leftEdge - 2} y1={py1} x2={leftEdge - hOffset - 4} y2={py1} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="1,1" opacity={0.6} />
          <line x1={leftEdge - hOffset} y1={py0} x2={leftEdge - hOffset} y2={py1} stroke="var(--muted-foreground)" strokeWidth={0.8} />
          <line x1={leftEdge - hOffset - 2} y1={py0 + 2} x2={leftEdge - hOffset + 2} y2={py0 - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={leftEdge - hOffset - 2} y1={py1 + 2} x2={leftEdge - hOffset + 2} y2={py1 - 2} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={leftEdge - hOffset - 5} y={(py0 + py1) / 2 + 2.5} textAnchor="end" className="fill-muted-foreground text-[8.5px] font-mono font-bold">h={(H * 1000).toFixed(0)}</text>
        </g>
      )}

      {/* Diameter Dimension for Circular */}
      {shape.type === 'circular' && (
        <g>
          <line x1={xSection - (d * scaleX) / 2} y1={height / 2 + (d * scaleX) / 2 + 4} x2={xSection + (d * scaleX) / 2} y2={height / 2 + (d * scaleX) / 2 + 4} stroke="var(--muted-foreground)" strokeWidth={0.8} />
          <line x1={xSection - (d * scaleX) / 2 - 2} y1={height / 2 + (d * scaleX) / 2 + 6} x2={xSection - (d * scaleX) / 2 + 2} y2={height / 2 + (d * scaleX) / 2 + 2} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={xSection + (d * scaleX) / 2 - 2} y1={height / 2 + (d * scaleX) / 2 + 6} x2={xSection + (d * scaleX) / 2 + 2} y2={height / 2 + (d * scaleX) / 2 + 2} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={xSection} y={height / 2 + (d * scaleX) / 2 + 1} textAnchor="middle" className="fill-muted-foreground text-[8.5px] font-mono font-bold">d={(d * 1000).toFixed(0)}</text>
        </g>
      )}

      {/* Neutral Axis line on shape */}
      <line x1={xSection - 20} y1={toPixelY(0)} x2={xSection + 20} y2={toPixelY(0)} stroke="var(--destructive)" strokeWidth={0.8} strokeDasharray="3,1" opacity={0.6} />
      <text x={xSection} y={toPixelY(0) - 2.5} textAnchor="middle" className="fill-destructive text-[7.5px] font-mono font-bold opacity-80">N.A.</text>

      {/* Height y and width b readout value on shape (only when not showing all static dimensions) */}
      {!showAllDimensions && (
        <g>
          <text x={rightEdge + 6} y={pyInspect + 6} className="fill-primary text-[8.5px] font-mono font-bold">
            y={inspectY >= 0 ? '+' : ''}{inspectY.toFixed(0)}mm
          </text>
          <text x={rightEdge + 6} y={pyInspect + 14} className="fill-primary text-[8.5px] font-mono font-bold">
            b={currentWidth.toFixed(0)}mm
          </text>
        </g>
      )}
    </g>
  );
};
