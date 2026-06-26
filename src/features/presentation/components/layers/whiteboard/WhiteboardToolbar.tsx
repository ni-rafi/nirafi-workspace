import React from 'react';
import {
  MousePointer, Pencil, Type, Eraser, Minus, ArrowUpRight,
  Square, Circle, Undo2, Redo2, Trash2, Sun, Moon, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WhiteboardToolType } from './WhiteboardCanvas';
import type { BoardMode } from '../../../../../hooks/useWhiteboard';

interface WhiteboardToolbarProps {
  activeTool: WhiteboardToolType;
  onToolChange: (t: WhiteboardToolType) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onClose: () => void;
  boardMode: BoardMode;
  onToggleBoardMode: () => void;
  /** Injected colour picker slot */
  colorPickerSlot: React.ReactNode;
  /** Injected size selector slot */
  sizeSelectorSlot: React.ReactNode;
}

const TB_BTN = 'h-9 w-9 rounded-xl';

/**
 * WhiteboardToolbar: vertical floating tool panel.
 * Receives injected slots for the colour picker and size selector
 * to keep this component under 200 lines.
 */
export const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  activeTool, onToolChange, canUndo, canRedo,
  onUndo, onRedo, onClear, onClose, boardMode, onToggleBoardMode,
  colorPickerSlot, sizeSelectorSlot,
}) => {
  const isDark = boardMode === 'dark';

  const toolBtn = (tool: WhiteboardToolType, icon: React.ReactNode, title: string) => (
    <Button
      key={tool}
      variant={activeTool === tool ? 'default' : 'ghost'}
      size="icon"
      className={TB_BTN}
      onClick={() => onToolChange(tool)}
      title={title}
    >
      {icon}
    </Button>
  );

  return (
    <div
      className="absolute left-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 items-center
        rounded-2xl border bg-background/95 backdrop-blur-md shadow-xl px-2 py-3
        animate-in slide-in-from-left-2 duration-200"
    >
      {/* Drawing tools */}
      <div className="flex flex-col gap-0.5">
        {toolBtn('select',  <MousePointer className="h-4 w-4" />, 'Select & Move (V)')}
        {toolBtn('pencil',  <Pencil className="h-4 w-4" />, 'Freehand Pen (P)')}
        {toolBtn('text',    <Type className="h-4 w-4" />, 'Text Label (T)')}
        {toolBtn('eraser',  <Eraser className="h-4 w-4" />, 'Eraser (E)')}
      </div>

      <div className="w-6 h-px bg-border my-1" />

      {/* Shape tools */}
      <div className="flex flex-col gap-0.5">
        {toolBtn('line',   <Minus className="h-4 w-4 rotate-45" />, 'Line (L)')}
        {toolBtn('arrow',  <ArrowUpRight className="h-4 w-4" />, 'Arrow (A)')}
        {toolBtn('rect',   <Square className="h-4 w-4" />, 'Rectangle (R)')}
        {toolBtn('circle', <Circle className="h-4 w-4" />, 'Circle (C)')}
      </div>

      <div className="w-6 h-px bg-border my-1" />

      {/* Color picker slot */}
      {colorPickerSlot}

      <div className="w-6 h-px bg-border my-1" />

      {/* Size selector slot */}
      {sizeSelectorSlot}

      <div className="w-6 h-px bg-border my-1" />

      {/* Undo / Redo */}
      <Button variant="ghost" size="icon" className={TB_BTN} onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={TB_BTN} onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
        <Redo2 className="h-4 w-4" />
      </Button>

      <div className="w-6 h-px bg-border my-1" />

      {/* Board mode toggle */}
      <Button variant="ghost" size="icon" className={TB_BTN} onClick={onToggleBoardMode} title={isDark ? 'Switch to Light Board' : 'Switch to Dark Board'}>
        {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Clear all */}
      <Button variant="ghost" size="icon" className={`${TB_BTN} text-destructive hover:bg-destructive/10`} onClick={onClear} title="Clear All">
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="w-6 h-px bg-border my-1" />

      {/* Close */}
      <Button variant="ghost" size="icon" className={TB_BTN} onClick={onClose} title="Close Whiteboard (Esc)">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WhiteboardToolbar;
