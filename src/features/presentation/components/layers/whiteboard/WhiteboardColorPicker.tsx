import React from 'react';
import type { BoardMode } from '../../../../../hooks/useWhiteboard';

interface WhiteboardColorPickerProps {
  activeColor: string;
  onColorChange: (color: string) => void;
  boardMode: BoardMode;
}

const LIGHT_COLORS = [
  { value: '#111111', name: 'Black' },
  { value: '#555555', name: 'Dark Grey' },
  { value: '#ef4444', name: 'Red' },
  { value: '#f97316', name: 'Orange' },
  { value: '#3b82f6', name: 'Blue' },
  { value: '#22c55e', name: 'Green' },
  { value: '#a855f7', name: 'Purple' },
  { value: '#eab308', name: 'Yellow' },
];

const DARK_COLORS = [
  { value: '#ffffff', name: 'White' },
  { value: '#fde68a', name: 'Yellow' },
  { value: '#67e8f9', name: 'Cyan' },
  { value: '#86efac', name: 'Lime' },
  { value: '#f9a8d4', name: 'Pink' },
  { value: '#fb923c', name: 'Orange' },
  { value: '#c4b5fd', name: 'Violet' },
  { value: '#ef4444', name: 'Red' },
];

/**
 * WhiteboardColorPicker renders a palette of preset colour swatches
 * appropriate for the current board mode, plus a native colour input for custom picks.
 */
export const WhiteboardColorPicker: React.FC<WhiteboardColorPickerProps> = ({
  activeColor,
  onColorChange,
  boardMode,
}) => {
  const palette = boardMode === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div className="flex flex-col gap-1 items-center">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Color</span>
      <div className="flex flex-col gap-1.5">
        {palette.map((col) => {
          const isActive = activeColor === col.value;
          return (
            <button
              key={col.value}
              type="button"
              title={col.name}
              onClick={() => onColorChange(col.value)}
              style={{ backgroundColor: col.value }}
              className={`h-5 w-5 rounded-full border-2 transition-all hover:scale-110 ${
                isActive
                  ? 'border-primary scale-110 shadow-md'
                  : 'border-transparent'
              }`}
            />
          );
        })}
        {/* Custom colour picker */}
        <label
          title="Custom colour"
          className="h-5 w-5 rounded-full border-2 border-dashed border-muted-foreground/50 hover:border-primary cursor-pointer flex items-center justify-center overflow-hidden transition-all hover:scale-110"
        >
          <input
            type="color"
            value={activeColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="opacity-0 absolute w-0 h-0"
          />
          <span className="text-[8px] font-bold text-muted-foreground leading-none">+</span>
        </label>
      </div>
    </div>
  );
};

export default WhiteboardColorPicker;
