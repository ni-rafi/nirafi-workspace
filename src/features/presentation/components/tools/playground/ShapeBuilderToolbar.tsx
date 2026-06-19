import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Layers,
  Square,
  Circle,
  Type,
  Triangle,
  Star,
  Hexagon,
  Diamond,
  ArrowUpRight,
  Activity,
  TrendingDown,
  RotateCw,
  ArrowDown,
  CircleDot,
  ArrowRight,
  Construction,
} from 'lucide-react';
import { VisualCanvasShape } from '../../../types/schema';

interface ShapeBuilderToolbarProps {
  onAddElement: (type: VisualCanvasShape['type']) => void;
}

const TOOLBAR_TYPES = [
  'rect',
  'circle',
  'triangle',
  'rhombus',
  'star',
  'hexagon',
  'arrow',
  'text',
  'polygon',
  'udl',
  'uvl',
  'moment',
  'point-load',
  'support-pin',
  'support-roller',
  'support-fixed',
  'hinge',
  'rounded-arrow',
] as const;

const SHAPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rect: Square,
  circle: Circle,
  triangle: Triangle,
  rhombus: Diamond,
  star: Star,
  hexagon: Hexagon,
  arrow: ArrowUpRight,
  text: Type,
  polygon: Layers,
  udl: Activity,
  uvl: TrendingDown,
  moment: RotateCw,
  'point-load': ArrowDown,
  'support-pin': Triangle,
  'support-roller': CircleDot,
  'support-fixed': Construction,
  hinge: CircleDot,
  'rounded-arrow': ArrowRight,
};

export const ShapeBuilderToolbar: React.FC<ShapeBuilderToolbarProps> = ({ onAddElement }) => {
  return (
    <div className="w-48 border-r border-border bg-card p-4 space-y-4 select-none flex flex-col justify-start shrink-0 overflow-y-auto max-h-[calc(100vh-60px)]">
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
        <Layers className="h-3 w-3 text-primary" /> Shapes
      </div>
      <div className="grid grid-cols-2 gap-2">
        {TOOLBAR_TYPES.map((t) => {
          const Icon = SHAPE_ICONS[t] || Square;
          return (
            <Button
              key={t}
              variant="outline"
              size="xs"
              onClick={() => onAddElement(t)}
              className="h-10 text-[9px] flex flex-col justify-center items-center gap-1 border-border/60 hover:border-primary/50 hover:bg-primary/5 capitalize text-foreground font-medium px-1 overflow-hidden text-ellipsis whitespace-nowrap"
              title={t}
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate w-full text-center">{t.replace('-', ' ')}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ShapeBuilderToolbar;
