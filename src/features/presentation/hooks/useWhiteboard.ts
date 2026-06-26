import { useState, useCallback, useEffect } from 'react';
import { isProjectionView, getStorageItem, setStorageItem } from '../utils/presentationStorage';
import type { VectorElement } from '../types';

export type BoardMode = 'light' | 'dark';

interface UseWhiteboardOptions {
  lectureId: string;
  slideNo: number;
}

/**
 * useWhiteboard manages whiteboard open/close state, board mode, and per-slide
 * localStorage persistence with cross-tab (projection) sync.
 *
 * The main window reads/writes; projection window reads passively via StorageEvent.
 */
export const useWhiteboard = ({ lectureId, slideNo }: UseWhiteboardOptions) => {
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [boardMode, setBoardMode] = useState<BoardMode>('light');

  const storageKey = `cee_whiteboard_${lectureId}_${slideNo}`;
  const openKey = `cee_whiteboard_open_${lectureId}`;
  const modeKey = `cee_whiteboard_mode_${lectureId}`;
  const isProjection = isProjectionView();

  // Sync open state and board mode across tabs (projection follows main)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === openKey) {
        setIsWhiteboardOpen(e.newValue === 'true');
      }
      if (e.key === modeKey) {
        setBoardMode((e.newValue as BoardMode) ?? 'light');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [openKey, modeKey]);

  // Restore board mode on mount
  useEffect(() => {
    setBoardMode(getStorageItem<BoardMode>(modeKey, 'light'));
  }, [modeKey]);

  const toggleWhiteboard = useCallback(() => {
    setIsWhiteboardOpen(prev => {
      const next = !prev;
      setStorageItem(openKey, next);
      return next;
    });
  }, [openKey]);

  const toggleBoardMode = useCallback(() => {
    setBoardMode(prev => {
      const next: BoardMode = prev === 'light' ? 'dark' : 'light';
      setStorageItem(modeKey, next);
      return next;
    });
  }, [modeKey]);

  /** Persist whiteboard elements after each stroke (called from WhiteboardCanvas). */
  const persistElements = useCallback((elements: VectorElement[]) => {
    if (!isProjection) {
      setStorageItem(storageKey, elements);
    }
  }, [storageKey, isProjection]);

  /** Load saved elements for the current slide (called by WhiteboardCanvas on open). */
  const loadElements = useCallback((): VectorElement[] => {
    return getStorageItem<VectorElement[]>(storageKey, []);
  }, [storageKey]);

  return {
    isWhiteboardOpen,
    boardMode,
    storageKey,
    isProjection,
    toggleWhiteboard,
    toggleBoardMode,
    persistElements,
    loadElements,
  };
};

export default useWhiteboard;
