import React, { useRef } from 'react';
import type { SlideDimensions } from '../types';
import { useSlideScale } from '../hooks/useSlideScale';

interface SlideContainerProps {
  children: React.ReactNode;
  /** Dimensions of the virtual canvas coordinate space */
  dimensions?: SlideDimensions;
  /** Scale factor override for this slide */
  zoom?: number;
}

const DEFAULT_DIMENSIONS: SlideDimensions = {
  width: 980,
  aspectRatio: 16 / 9,
};

/**
 * SlideContainer bounds the slide layouts to a fixed virtual aspect ratio
 * and applies CSS scale transformations to fit any display screen responsively.
 */
export const SlideContainer: React.FC<SlideContainerProps> = ({
  children,
  dimensions = DEFAULT_DIMENSIONS,
  zoom = 1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scale = useSlideScale(containerRef, dimensions, zoom);

  const virtualHeight = dimensions.width / dimensions.aspectRatio;

  const canvasStyle: React.CSSProperties = {
    width: `${dimensions.width}px`,
    height: `${virtualHeight}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    flexShrink: 0,
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted/40 p-4 sm:p-6"
      data-slide-container
    >
      {/* Centered Sandboxed virtual canvas sheet */}
      <div
        style={canvasStyle}
        className="relative bg-background text-foreground shadow-2xl rounded-2xl border overflow-hidden flex flex-col justify-between transition-shadow duration-300 hover:shadow-primary/5 select-none"
        data-slide-canvas
      >
        {children}
      </div>
    </div>
  );
};

export default SlideContainer;
