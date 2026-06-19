import React from 'react';
import { Input } from '@/components/ui/input';
import { VisualCanvasShape, PhysicalUnit } from '../../../types/schema';

interface ShapeBuilderInspectorDimensionsProps {
  selectedEl: VisualCanvasShape;
  scaleFactor: { pixelsPerUnit: number; unit: PhysicalUnit };
  onUpdateSelected: (key: keyof VisualCanvasShape | Partial<VisualCanvasShape>, val?: any) => void;
  onUpdateSelectedDimensions: (dimKey: string, val: number) => void;
}

export const ShapeBuilderInspectorDimensions: React.FC<ShapeBuilderInspectorDimensionsProps> = ({
  selectedEl,
  scaleFactor,
  onUpdateSelected,
  onUpdateSelectedDimensions,
}) => {
  const isSupportOrHinge = ['support-pin', 'support-roller', 'support-fixed', 'hinge'].includes(selectedEl.type);

  return (
    <div className="border-t border-border pt-3 space-y-3">
      {/* Dimension Lines Toggle is only useful for dimension-controlled elements */}
      {!isSupportOrHinge && (
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
          <input
            type="checkbox"
            checked={!!selectedEl.showDimensionLines}
            onChange={(e) => onUpdateSelected('showDimensionLines', e.target.checked)}
            className="rounded border-input bg-background text-primary focus:ring-1 focus:ring-ring cursor-pointer"
          />
          <span>Show Dimension Lines</span>
        </label>
      )}

      {selectedEl.type === 'rect' && (
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between">
            <span>Corner Radius</span>
            <span className="font-mono text-primary font-bold">{selectedEl.borderRadius || 0}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={50}
            value={selectedEl.borderRadius || 0}
            onChange={(e) => onUpdateSelected('borderRadius', parseInt(e.target.value) || 0)}
            className="w-full accent-primary cursor-pointer h-1 bg-muted rounded-lg appearance-none"
          />
        </div>
      )}

      {/* Proportional Scale for Supports and Hinges */}
      {isSupportOrHinge && (
        <div className="space-y-3 pt-1">
          {(() => {
            const BASE_SIZES: Record<string, { w: number; h: number }> = {
              'support-pin': { w: 80, h: 80 },
              'support-roller': { w: 80, h: 80 },
              'support-fixed': { w: 40, h: 120 },
              hinge: { w: 30, h: 30 },
            };
            const base = BASE_SIZES[selectedEl.type] || { w: 80, h: 80 };
            const currentScale = parseFloat((selectedEl.w / base.w).toFixed(2));

            return (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Proportional Scale</span>
                  <span className="font-mono text-primary font-bold">{Math.round(currentScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={2.5}
                  step={0.05}
                  value={currentScale}
                  onChange={(e) => {
                    const s = parseFloat(e.target.value) || 1.0;
                    const nextW = Math.round(base.w * s);
                    const nextH = Math.round(base.h * s);
                    onUpdateSelected({ w: nextW, h: nextH });
                  }}
                  className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none animate-none"
                />
              </div>
            );
          })()}
        </div>
      )}

      {/* Standard dimension controls for all other shapes */}
      {!isSupportOrHinge && selectedEl.dimensions && (
        <div className="space-y-3">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Physical Dimensions ({scaleFactor.unit})
          </span>

          {selectedEl.type === 'circle' && selectedEl.dimensions.diameter !== undefined && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Diameter
              </label>
              <Input
                type="number"
                step="0.05"
                value={selectedEl.dimensions.diameter}
                onChange={(e) =>
                  onUpdateSelectedDimensions('diameter', parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs text-primary bg-background border-input font-mono font-semibold"
              />
            </div>
          )}

          {selectedEl.type === 'rhombus' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Diagonal 1
                </label>
                <Input
                  type="number"
                  step="0.05"
                  value={selectedEl.dimensions.diagonal1 || 0}
                  onChange={(e) =>
                    onUpdateSelectedDimensions('diagonal1', parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-primary bg-background border-input font-mono font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Diagonal 2
                </label>
                <Input
                  type="number"
                  step="0.05"
                  value={selectedEl.dimensions.diagonal2 || 0}
                  onChange={(e) =>
                    onUpdateSelectedDimensions('diagonal2', parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-primary bg-background border-input font-mono font-semibold"
                />
              </div>
            </div>
          )}

          {selectedEl.type !== 'circle' && selectedEl.type !== 'rhombus' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Length / Base
                </label>
                <Input
                  type="number"
                  step="0.05"
                  value={selectedEl.dimensions.length || 0}
                  onChange={(e) =>
                    onUpdateSelectedDimensions('length', parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-primary bg-background border-input font-mono font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Height
                </label>
                <Input
                  type="number"
                  step="0.05"
                  value={selectedEl.dimensions.height || 0}
                  onChange={(e) =>
                    onUpdateSelectedDimensions('height', parseFloat(e.target.value) || 0)
                  }
                  className="h-8 text-xs text-primary bg-background border-input font-mono font-semibold"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShapeBuilderInspectorDimensions;
