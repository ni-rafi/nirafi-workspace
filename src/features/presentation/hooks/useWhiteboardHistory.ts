import { useRef, useCallback, useState } from 'react';
import type { VectorElement } from '../types';

const MAX_HISTORY = 50;

/**
 * useWhiteboardHistory maintains an undo/redo stack for whiteboard strokes.
 * Works with snapshots of the full VectorElement array.
 * Completely decoupled from UI — pure state machine.
 */
export const useWhiteboardHistory = () => {
  // undoStack: states we can go back to
  const undoStack = useRef<VectorElement[][]>([]);
  // redoStack: states we can re-apply after undo
  const redoStack = useRef<VectorElement[][]>([]);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const refreshFlags = useCallback(() => {
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  /** Call after every committed stroke to save a snapshot. */
  const pushHistory = useCallback((elements: VectorElement[]) => {
    undoStack.current.push([...elements]);
    if (undoStack.current.length > MAX_HISTORY) {
      undoStack.current.shift();
    }
    // A new action clears the redo stack
    redoStack.current = [];
    refreshFlags();
  }, [refreshFlags]);

  /**
   * Undo: pops the last snapshot from undoStack and pushes the current state
   * onto redoStack. Returns the snapshot to restore, or undefined if empty.
   */
  const undo = useCallback((current: VectorElement[]): VectorElement[] | undefined => {
    const snapshot = undoStack.current.pop();
    if (snapshot === undefined) return undefined;
    redoStack.current.push([...current]);
    refreshFlags();
    return snapshot;
  }, [refreshFlags]);

  /**
   * Redo: pops the top of redoStack. Returns the snapshot to restore, or undefined.
   */
  const redo = useCallback((current: VectorElement[]): VectorElement[] | undefined => {
    const snapshot = redoStack.current.pop();
    if (snapshot === undefined) return undefined;
    undoStack.current.push([...current]);
    refreshFlags();
    return snapshot;
  }, [refreshFlags]);

  /** Clear both stacks (e.g. on clear-all action). */
  const clearHistory = useCallback(() => {
    undoStack.current = [];
    redoStack.current = [];
    refreshFlags();
  }, [refreshFlags]);

  return { pushHistory, undo, redo, clearHistory, canUndo, canRedo };
};

export default useWhiteboardHistory;
