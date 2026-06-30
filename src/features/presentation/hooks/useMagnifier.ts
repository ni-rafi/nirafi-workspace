import { useState, useCallback, useEffect, useRef } from 'react';
import { getLectureIdFromPath, isProjectionView, getStorageItem, setStorageItem } from '../utils/presentationStorage';

interface MagnifierState {
  x: number;   // percent (0-100) of slide width
  y: number;   // percent (0-100) of slide height
  zoom: number;
  active: boolean;
}

const DEFAULT_STATE: MagnifierState = { x: 50, y: 50, zoom: 2, active: false };

/**
 * useMagnifier manages a loupe lens that follows the mouse cursor.
 * The lens position and zoom are synced across the main and projection windows
 * via localStorage (same pattern as laser pointer / useUrlSyncedState).
 *
 * The main window drives updates; the projection window reads passively via StorageEvent.
 */
export const useMagnifier = () => {
  const lectureId = getLectureIdFromPath();
  const storageKey = `cee_magnifier_${lectureId}`;
  const isProjection = isProjectionView();
  const containerRectRef = useRef<DOMRect | null>(null);

  const [state, setState] = useState<MagnifierState>(() =>
    getStorageItem<MagnifierState>(storageKey, DEFAULT_STATE)
  );

  // Projection: listen for cross-tab updates
  useEffect(() => {
    if (!isProjection) return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          setState(JSON.parse(e.newValue) as MagnifierState);
        } catch { /* ignore parse errors */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey, isProjection]);

  // Main screen: also sync initial state on mount
  useEffect(() => {
    if (isProjection) return;
    const saved = getStorageItem<MagnifierState>(storageKey, DEFAULT_STATE);
    setState(saved);
  }, [storageKey, isProjection]);

  const updateState = useCallback((partial: Partial<MagnifierState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      setStorageItem(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const toggleMagnifier = useCallback(() => {
    updateState({ active: !state.active });
  }, [state.active, updateState]);

  /** Called on mousemove over the slide container on the main screen. */
  const handleMagnifierMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!state.active || isProjection) return;
    const rect = containerRectRef.current ?? e.currentTarget.getBoundingClientRect();
    containerRectRef.current = rect;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    updateState({ x, y });
  }, [state.active, isProjection, updateState]);

  const setMagnifierZoom = useCallback((zoom: number) => {
    updateState({ zoom });
  }, [updateState]);

  return {
    isMagnifierActive: state.active,
    magnifierPosition: { x: state.x, y: state.y },
    magnifierZoom: state.zoom,
    toggleMagnifier,
    handleMagnifierMouseMove,
    setMagnifierZoom,
  };
};

export default useMagnifier;
