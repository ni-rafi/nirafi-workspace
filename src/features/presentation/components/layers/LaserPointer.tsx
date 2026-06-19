import React, { useEffect, useState } from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

interface LaserPointerProps {
  active: boolean;
  isProjectionView?: boolean;
}

/**
 * LaserPointer tracks cursor movement when enabled, hides the browser's standard cursor,
 * and renders a glowing red dot to act as a presenter laser pointer.
 * Synchronizes laser status and coordinates dynamically to the projection view.
 */
export const LaserPointer: React.FC<LaserPointerProps> = ({ active, isProjectionView = false }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  // Sync laser state (x/y as percentages, isInside as active status)
  const [syncedState, setSyncedState] = useUrlSyncedState<{
    x: number;
    y: number;
    isInside: boolean;
  }>('laser-pointer-pos', { x: 0, y: 0, isInside: false });

  // 1. Publisher Role (Presenter View / Leader)
  useEffect(() => {
    if (!active || isProjectionView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvasEl = document.querySelector('[data-slide-canvas="active"]');
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsInside(inside);
        if (inside) {
          document.body.classList.add('cursor-none');
          setCoords({ x: e.clientX, y: e.clientY });

          // Calculate percentage coordinates relative to active slide canvas
          const xPct = (e.clientX - rect.left) / rect.width;
          const yPct = (e.clientY - rect.top) / rect.height;
          setSyncedState({ x: xPct, y: yPct, isInside: true });
        } else {
          document.body.classList.remove('cursor-none');
          setSyncedState({ x: 0, y: 0, isInside: false });
        }
      } else {
        setIsInside(false);
        document.body.classList.remove('cursor-none');
        setSyncedState({ x: 0, y: 0, isInside: false });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('cursor-none');
      setSyncedState({ x: 0, y: 0, isInside: false });
    };
  }, [active, isProjectionView, setSyncedState]);

  // 2. Consumer Role (Projection View / Follower)
  useEffect(() => {
    if (!active || !isProjectionView) return;

    if (syncedState.isInside) {
      const canvasEl = document.querySelector('[data-slide-canvas="active"]');
      if (canvasEl) {
        const rect = canvasEl.getBoundingClientRect();
        const absoluteX = rect.left + syncedState.x * rect.width;
        const absoluteY = rect.top + syncedState.y * rect.height;

        setCoords({ x: absoluteX, y: absoluteY });
        setIsInside(true);
        document.body.classList.add('cursor-none');
      } else {
        setIsInside(false);
        document.body.classList.remove('cursor-none');
      }
    } else {
      setIsInside(false);
      document.body.classList.remove('cursor-none');
    }

    return () => {
      document.body.classList.remove('cursor-none');
    };
  }, [active, isProjectionView, syncedState]);

  if (!active || !isInside) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
      }}
    >
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 blur-[2px] animate-pulse" />
      
      {/* Inner Bright Laser Point */}
      <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444,0_0_20px_#ef4444]" />
    </div>
  );
};

export default LaserPointer;
