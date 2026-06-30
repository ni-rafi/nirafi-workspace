import React, { useState, useEffect, useRef } from 'react';

interface MagnifierLensProps {
  /** Lens centre as percentage of the container width/height (0-100). */
  lensPosition: { x: number; y: number };
  /** Zoom multiplier, e.g. 2.5 */
  zoomLevel: number;
  /** Ref to the slide container div whose content is to be magnified. */
  containerRef: React.RefObject<HTMLElement | null>;
}

const LENS_SIZE = 260; // px — square lens side length

/**
 * MagnifierLens renders a square loupe that follows the cursor.
 * It works by absolutely positioning an inner `div` that is a CSS-scaled
 * clone of the container's visual content using `transform: scale(zoomLevel)`.
 *
 * The inner div is offset so that the region under the cursor appears centred
 * inside the lens window.
 */
export const MagnifierLens: React.FC<MagnifierLensProps> = ({
  lensPosition,
  zoomLevel,
  containerRef,
}) => {
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const cloneContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ w: rect.width, h: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  // Clone slide content DOM and synchronize drawings from canvas nodes
  useEffect(() => {
    const el = containerRef.current;
    if (!el || containerSize.w === 0) return;

    const getSourceElement = () => {
      return el.querySelector('[data-slide-container]') ||
             el.querySelector('[data-slide-canvas="active"]') ||
             el.firstElementChild ||
             el;
    };

    const updateClone = () => {
      const source = getSourceElement();
      const dest = cloneContainerRef.current;
      if (!source || !dest) return;

      dest.innerHTML = '';
      const clone = source.cloneNode(true) as HTMLElement;

      // Prevent infinite loop by removing nested magnifier components in the clone
      const magnifiers = clone.querySelectorAll('[aria-label="magnifier"], [data-magnifier-lens], .magnifier-lens');
      magnifiers.forEach(m => m.remove());

      // Sync drawings on canvas nodes
      const originalCanvases = source.querySelectorAll('canvas');
      const clonedCanvases = clone.querySelectorAll('canvas');
      clonedCanvases.forEach((clonedCanvas, index) => {
        const originalCanvas = originalCanvases[index] as HTMLCanvasElement;
        if (originalCanvas) {
          const ctx = (clonedCanvas as HTMLCanvasElement).getContext('2d');
          if (ctx) {
            ctx.drawImage(originalCanvas, 0, 0);
          }
        }
      });

      dest.appendChild(clone);
    };

    updateClone();

    const source = getSourceElement();
    if (!source) return;

    const observer = new MutationObserver(() => {
      updateClone();
    });

    observer.observe(source, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [containerRef, containerSize.w]);

  if (!containerRef.current || containerSize.w === 0) return null;

  // Cursor position in pixels relative to the container
  const cursorX = (lensPosition.x / 100) * containerSize.w;
  const cursorY = (lensPosition.y / 100) * containerSize.h;

  // The lens top-left corner in container-relative pixels (clamped to stay in bounds)
  const half = LENS_SIZE / 2;
  const lensLeft = Math.min(Math.max(cursorX - half, 0), containerSize.w - LENS_SIZE);
  const lensTop = Math.min(Math.max(cursorY - half, 0), containerSize.h - LENS_SIZE);

  // Inner scaled content offset so the focal point stays centred in the lens
  const innerLeft = -(cursorX * zoomLevel - half);
  const innerTop = -(cursorY * zoomLevel - half);

  return (
    <div
      aria-hidden="true"
      data-magnifier-lens="true"
      style={{
        position: 'absolute',
        left: lensLeft,
        top: lensTop,
        width: LENS_SIZE,
        height: LENS_SIZE,
        overflow: 'hidden',
        borderRadius: 12,
        border: '2.5px solid rgba(255,255,255,0.45)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(0px)',
        zIndex: 30,
        pointerEvents: 'none',
      }}
    >
      {/* Zoomed content layer */}
      <div
        ref={cloneContainerRef}
        style={{
          position: 'absolute',
          left: innerLeft,
          top: innerTop,
          width: containerSize.w,
          height: containerSize.h,
          transform: `scale(${zoomLevel})`,
          transformOrigin: '0 0',
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      />

      {/* Frosted ring overlay for premium glass look */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MagnifierLens;
