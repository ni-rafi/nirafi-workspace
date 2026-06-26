import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDrawingBoard } from '../../../hooks/useDrawingBoard';
import { SvgElementsRenderer } from '../SvgElementsRenderer';
import { WhiteboardTextTool } from './WhiteboardTextTool';
import { useWhiteboardHistory } from '../../../hooks/useWhiteboardHistory';
import type { VectorElement, Point } from '../../../types';
import type { BoardMode } from '../../../hooks/useWhiteboard';

export type WhiteboardToolType = 'select' | 'pencil' | 'eraser' | 'line' | 'arrow' | 'rect' | 'circle' | 'text';

const WIDTH = 980;
const HEIGHT = 551.25;

interface WhiteboardCanvasProps {
  boardMode: BoardMode;
  activeTool: WhiteboardToolType;
  color: string;
  strokeWidth: number;
  storageKey: string;
  isReadOnly: boolean;
  onElementsChange?: (els: VectorElement[]) => void;
  clearTrigger: number;
}

/**
 * WhiteboardCanvas: SVG drawing surface with text support and undo/redo.
 * Reuses useDrawingBoard for pen/shape logic; adds text tool and history.
 */
const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  boardMode, activeTool, color, strokeWidth,
  storageKey, isReadOnly, onElementsChange, clearTrigger,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const history = useWhiteboardHistory();

  const drawingTool = activeTool === 'text' ? 'select' : activeTool;
  const isActive = !isReadOnly && activeTool !== 'text';

  const { elements, setElements, currentElement, selectedId, setSelectedId,
    handlePointerDown, handlePointerMove, handlePointerUp, handleElementDown,
  } = useDrawingBoard({
    isActive,
    color,
    brushWidth: strokeWidth,
    activeTool: drawingTool as 'select' | 'pencil' | 'eraser' | 'line' | 'arrow' | 'rect' | 'circle',
    lectureId: storageKey,   // reuse storageKey as the unique scope key
    slideNo: 0,              // whiteboard is keyed by storageKey directly
    clearTrigger,
    svgRef,
  });

  const [pendingText, setPendingText] = useState<Point | null>(null);

  // Sync elements to parent for persistence
  useEffect(() => {
    onElementsChange?.(elements);
  }, [elements, onElementsChange]);

  // After each committed stroke, push to history
  const prevElementsRef = useRef<VectorElement[]>([]);
  useEffect(() => {
    if (elements.length > prevElementsRef.current.length) {
      history.pushHistory(prevElementsRef.current);
    }
    prevElementsRef.current = elements;
  }, [elements, history]);

  const handleUndo = useCallback(() => {
    const prev = history.undo(elements);
    if (prev !== undefined) setElements(prev);
  }, [history, elements, setElements]);

  const handleRedo = useCallback(() => {
    const next = history.redo(elements);
    if (next !== undefined) setElements(next);
  }, [history, elements, setElements]);

  // Keyboard undo/redo inside whiteboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); handleUndo(); }
      if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleUndo, handleRedo]);

  const handleSvgClick = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activeTool !== 'text' || isReadOnly) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setPendingText({
      x: ((e.clientX - rect.left) / rect.width) * WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * HEIGHT,
    });
  };

  const commitText = (text: string, position: Point) => {
    const textEl: VectorElement = {
      id: crypto.randomUUID(),
      type: 'text',
      points: [position],
      color,
      strokeWidth,
      translate: { x: 0, y: 0 },
      text,
    };
    const updated = [...elements, textEl];
    setElements(updated);
    history.pushHistory(elements);
    setPendingText(null);
  };

  const bgColor = boardMode === 'dark' ? '#1a2a1a' : '#fafafa';

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full"
      style={{ display: 'block', background: bgColor, touchAction: 'none' }}
      onPointerDown={(e) => {
        if (activeTool === 'select') { setSelectedId(null); return; }
        if (activeTool === 'text') { handleSvgClick(e); return; }
        handlePointerDown(e);
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={activeTool === 'text' ? handleSvgClick : undefined}
    >
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill={bgColor} />
      <SvgElementsRenderer
        elements={elements}
        currentElement={currentElement}
        activeTool={activeTool}
        selectedId={selectedId}
        onElementDown={handleElementDown}
      />
      {pendingText && (
        <WhiteboardTextTool
          position={pendingText}
          color={color}
          fontSize={strokeWidth * 4 + 12}
          onCommit={commitText}
          onCancel={() => setPendingText(null)}
        />
      )}
    </svg>
  );
};

export { WhiteboardCanvas };
export default WhiteboardCanvas;
