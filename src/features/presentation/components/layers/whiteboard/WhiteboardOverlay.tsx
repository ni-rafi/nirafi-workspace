import React, { useState, useCallback, useEffect, useRef } from 'react';
import { WhiteboardCanvas, type WhiteboardToolType } from './WhiteboardCanvas';
import { WhiteboardToolbar } from './WhiteboardToolbar';
import { WhiteboardColorPicker } from './WhiteboardColorPicker';
import { WhiteboardSizeSelector } from './WhiteboardSizeSelector';
import { useWhiteboardHistory } from '../../../hooks/useWhiteboardHistory';
import { getStorageItem } from '../../../utils/presentationStorage';
import type { BoardMode } from '../../../hooks/useWhiteboard';
import type { VectorElement } from '../../../types';

interface WhiteboardOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  boardMode: BoardMode;
  onToggleBoardMode: () => void;
  /** True when rendered in the projection popup (read-only mirror). */
  isProjectionView: boolean;
  lectureId: string;
  slideNo: number;
}

/**
 * WhiteboardOverlay: fullscreen whiteboard modal over the presentation.
 * Orchestrates WhiteboardCanvas + WhiteboardToolbar. Handles keyboard
 * shortcuts (Esc to close, Ctrl+Z/Y for undo/redo), per-slide persistence,
 * and projection read-only mirroring.
 */
export const WhiteboardOverlay: React.FC<WhiteboardOverlayProps> = ({
  isOpen, onClose, boardMode, onToggleBoardMode, isProjectionView, lectureId, slideNo,
}) => {
  const storageKey = `cee_whiteboard_${lectureId}_${slideNo}`;
  const [activeTool, setActiveTool] = useState<WhiteboardToolType>('pencil');
  const [color, setColor] = useState(boardMode === 'dark' ? '#ffffff' : '#111111');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [clearTrigger, setClearTrigger] = useState(0);
  const history = useWhiteboardHistory();
  const elementsRef = useRef<VectorElement[]>([]);

  // Sync default colour when board mode changes
  useEffect(() => {
    setColor(boardMode === 'dark' ? '#ffffff' : '#111111');
  }, [boardMode]);

  // Load persisted elements on open
  useEffect(() => {
    if (!isOpen) return;
    elementsRef.current = getStorageItem<VectorElement[]>(storageKey, []);
  }, [isOpen, storageKey]);

  // Projection: listen for cross-tab storage changes to re-render canvas
  useEffect(() => {
    if (!isProjectionView) return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        elementsRef.current = e.newValue ? JSON.parse(e.newValue) as VectorElement[] : [];
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey, isProjectionView]);

  // Keyboard: Esc to close (only on main screen)
  useEffect(() => {
    if (!isOpen || isProjectionView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, isProjectionView]);

  const handleElementsChange = useCallback((els: VectorElement[]) => {
    elementsRef.current = els;
  }, []);

  const handleUndo = useCallback(() => {
    const prev = history.undo(elementsRef.current);
    if (prev !== undefined) { elementsRef.current = prev; setClearTrigger(c => c + 1); }
  }, [history]);

  const handleRedo = useCallback(() => {
    const next = history.redo(elementsRef.current);
    if (next !== undefined) { elementsRef.current = next; setClearTrigger(c => c + 1); }
  }, [history]);

  if (!isOpen) return null;

  const colorSlot = (
    <WhiteboardColorPicker activeColor={color} onColorChange={setColor} boardMode={boardMode} />
  );

  const sizeSlot = (
    <WhiteboardSizeSelector activeSize={strokeWidth} onSizeChange={setStrokeWidth} activeColor={color} />
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200"
      style={{ background: boardMode === 'dark' ? '#1a2a1a' : '#fafafa' }}
    >
      <div className="relative w-full h-full">
        <WhiteboardCanvas
          boardMode={boardMode}
          activeTool={activeTool}
          color={color}
          strokeWidth={strokeWidth}
          storageKey={storageKey}
          isReadOnly={isProjectionView}
          onElementsChange={handleElementsChange}
          clearTrigger={clearTrigger}
        />

        {!isProjectionView && (
          <WhiteboardToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            canUndo={history.canUndo}
            canRedo={history.canRedo}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={() => { history.clearHistory(); setClearTrigger(c => c + 1); }}
            onClose={onClose}
            boardMode={boardMode}
            onToggleBoardMode={onToggleBoardMode}
            colorPickerSlot={colorSlot}
            sizeSelectorSlot={sizeSlot}
          />
        )}
      </div>
    </div>
  );
};

export default WhiteboardOverlay;
