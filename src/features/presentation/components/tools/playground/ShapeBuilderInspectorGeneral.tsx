import React from 'react';
import { Input } from '@/components/ui/input';
import { VisualCanvasShape } from '../../../types/schema';

interface ShapeBuilderInspectorGeneralProps {
  selectedEl: VisualCanvasShape;
  onUpdateSelected: (key: keyof VisualCanvasShape, val: any) => void;
}

export const ShapeBuilderInspectorGeneral: React.FC<ShapeBuilderInspectorGeneralProps> = ({
  selectedEl,
  onUpdateSelected,
}) => {
  return (
    <div className="space-y-4">
      {/* Label Text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Label Text
        </label>
        <Input
          type="text"
          value={selectedEl.label || ''}
          onChange={(e) => onUpdateSelected('label', e.target.value)}
          className="h-9 text-xs text-primary bg-background border-input font-medium"
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Enter Step
          </label>
          <Input
            type="number"
            min={1}
            value={selectedEl.enterAt}
            onChange={(e) => onUpdateSelected('enterAt', parseInt(e.target.value) || 1)}
            className="h-9 text-xs text-primary bg-background border-input font-mono font-semibold"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Exit Step
          </label>
          <Input
            type="number"
            value={selectedEl.exitAt || ''}
            onChange={(e) =>
              onUpdateSelected('exitAt', e.target.value ? parseInt(e.target.value) : undefined)
            }
            placeholder="Never"
            className="h-9 text-xs text-primary bg-background border-input font-mono font-semibold"
          />
        </div>
      </div>

      {/* Animation */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Animation Preset
        </label>
        <select
          value={selectedEl.animation || 'none'}
          onChange={(e) => onUpdateSelected('animation', e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs text-primary focus:ring-1 focus:ring-ring outline-none transition-colors"
        >
          <option value="none" className="bg-popover text-foreground">None</option>
          <option value="fade" className="bg-popover text-foreground">Fade In</option>
          <option value="scale" className="bg-popover text-foreground">Scale Up</option>
        </select>
      </div>

      {/* Dynamic Load parameters */}
      {selectedEl.type === 'moment' && (
        <div className="flex flex-col gap-1.5 pt-3 border-t border-border/60">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Moment Direction
          </label>
          <select
            value={selectedEl.momentDirection || 'cw'}
            onChange={(e) => onUpdateSelected('momentDirection', e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs text-primary focus:ring-1 focus:ring-ring outline-none transition-colors"
          >
            <option value="cw" className="bg-popover text-foreground">Clockwise (CW)</option>
            <option value="ccw" className="bg-popover text-foreground">Counter-Clockwise (CCW)</option>
          </select>
        </div>
      )}

      {selectedEl.type === 'point-load' && (
        <div className="flex flex-col gap-1.5 pt-3 border-t border-border/60">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Load Direction
          </label>
          <select
            value={selectedEl.pointLoadDirection || 'down'}
            onChange={(e) => onUpdateSelected('pointLoadDirection', e.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs text-primary focus:ring-1 focus:ring-ring outline-none transition-colors"
          >
            <option value="down" className="bg-popover text-foreground">Downward</option>
            <option value="up" className="bg-popover text-foreground">Upward</option>
            <option value="left" className="bg-popover text-foreground">Leftward</option>
            <option value="right" className="bg-popover text-foreground">Rightward</option>
          </select>
        </div>
      )}

      {selectedEl.type === 'udl' && (
        <div className="flex flex-col gap-1.5 pt-3 border-t border-border/60">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              UDL Segments
            </label>
            <span className="text-xs font-mono font-bold text-primary">
              {selectedEl.udlSegmentsCount ?? 8}
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={20}
            step={1}
            value={selectedEl.udlSegmentsCount ?? 8}
            onChange={(e) => onUpdateSelected('udlSegmentsCount', parseInt(e.target.value))}
            className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
          />
        </div>
      )}

      {selectedEl.type === 'uvl' && (
        <div className="space-y-3 pt-3 border-t border-border/60">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Start Load Height
              </label>
              <span className="text-xs font-mono font-bold text-primary">
                {Math.round((selectedEl.uvlStartHeight ?? 0) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={selectedEl.uvlStartHeight ?? 0}
              onChange={(e) => onUpdateSelected('uvlStartHeight', parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                End Load Height
              </label>
              <span className="text-xs font-mono font-bold text-primary">
                {Math.round((selectedEl.uvlEndHeight ?? 1) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={selectedEl.uvlEndHeight ?? 1}
              onChange={(e) => onUpdateSelected('uvlEndHeight', parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
            />
          </div>
        </div>
      )}
      {/* Rotation Control */}
      <div className="flex flex-col gap-1.5 pt-3 border-t border-border/60">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Rotation Angle
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={0}
              max={360}
              value={selectedEl.rotate || 0}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (isNaN(val)) val = 0;
                val = Math.max(0, Math.min(360, val));
                onUpdateSelected('rotate', val);
              }}
              className="w-16 h-7 text-xs font-mono font-bold text-primary bg-background border-input px-1 text-center"
            />
            <span className="text-xs font-mono font-bold text-muted-foreground">°</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          value={selectedEl.rotate || 0}
          onChange={(e) => onUpdateSelected('rotate', parseInt(e.target.value) || 0)}
          className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
        />
      </div>
    </div>
  );
};

export default ShapeBuilderInspectorGeneral;
