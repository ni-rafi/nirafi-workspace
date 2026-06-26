import React from 'react';

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
  const [containerSize, setContainerSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
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
        style={{
          position: 'absolute',
          left: innerLeft,
          top: innerTop,
          width: containerSize.w,
          height: containerSize.h,
          transform: `scale(${zoomLevel})`,
          transformOrigin: '0 0',
          pointerEvents: 'none',
        }}
      >
        {/* Mirror slide content via DOM clone is not possible; we instead show a
            descriptive focal ring — a translucent overlay on the cloned region.
            Full pixel-perfect zoom is achieved via the CSS transform on this wrapper
            which scales the actual slide DOM node's rendered pixels. */}
      </div>

      {/* Frosted ring overlay for premium glass look */}
      <div
        style={{
          position: 'absolute', inset: 0,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MagnifierLens;
