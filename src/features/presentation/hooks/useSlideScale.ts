import { useState, useEffect, type RefObject } from 'react';
import type { SlideDimensions } from '../types';

/**
 * Custom hook that uses a ResizeObserver to calculate the exact scale factor
 * required to fit a fixed virtual slide resolution inside its parent container.
 * 
 * @param containerRef - React reference to the parent container element.
 * @param dimensions - Virtual pixel width and aspect ratio of the slides.
 * @param zoom - Per-slide zoom scale override multiplier.
 */
export const useSlideScale = (
  containerRef: RefObject<HTMLElement | null>,
  dimensions: SlideDimensions,
  zoom: number = 1
): number => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const baseWidth = dimensions.width;
    const baseHeight = baseWidth / dimensions.aspectRatio;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      // Read current display dimensions
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) {
        return;
      }

      // Calculate scale coefficients for width and height
      const scaleX = width / baseWidth;
      const scaleY = height / baseHeight;

      // Fit the virtual canvas within the container boundary
      const fitScale = Math.min(scaleX, scaleY);
      
      // Factor in the custom slide zoom override
      setScale(fitScale * zoom);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    // Initial manual layout execution
    const initialRect = container.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      const scaleX = initialRect.width / baseWidth;
      const scaleY = initialRect.height / baseHeight;
      setScale(Math.min(scaleX, scaleY) * zoom);
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef, dimensions, zoom]);

  return scale;
};

export default useSlideScale;
