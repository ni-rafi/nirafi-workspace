import React, { useRef, useEffect } from 'react';
import type { Point } from '../../../../../types';

interface WhiteboardTextToolProps {
  /** Position in SVG coordinate space (980×551.25) */
  position: Point;
  color: string;
  fontSize: number;
  /** Called when the user commits text (Enter or blur). */
  onCommit: (text: string, position: Point) => void;
  /** Called when the user cancels (Escape). */
  onCancel: () => void;
}

/**
 * WhiteboardTextTool renders a foreignObject input inside the SVG that allows
 * the user to type text inline. Commits on Enter or blur, cancels on Escape.
 */
export const WhiteboardTextTool: React.FC<WhiteboardTextToolProps> = ({
  position,
  color,
  fontSize,
  onCommit,
  onCancel,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Auto-focus on mount
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation(); // Prevent global nav shortcuts while typing
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const commit = () => {
    const text = inputRef.current?.value.trim() ?? '';
    if (text) {
      onCommit(text, position);
    } else {
      onCancel();
    }
  };

  // Render in SVG coordinate space — foreignObject scales with the SVG viewport
  const inputWidth = 320;
  const inputHeight = 80;

  return (
    <foreignObject
      x={position.x}
      y={position.y - fontSize}
      width={inputWidth}
      height={inputHeight}
      style={{ overflow: 'visible' }}
    >
      <textarea
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        rows={2}
        placeholder="Type text…"
        style={{
          background: 'transparent',
          border: 'none',
          outline: '1.5px dashed rgba(150,150,150,0.5)',
          color,
          fontSize,
          fontFamily: 'inherit',
          resize: 'none',
          width: '100%',
          padding: '2px 4px',
          lineHeight: 1.4,
          caretColor: color,
        }}
      />
    </foreignObject>
  );
};

export default WhiteboardTextTool;
