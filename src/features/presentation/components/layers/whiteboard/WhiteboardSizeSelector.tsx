import React from 'react';
import { Button } from '@/components/ui/button';

interface WhiteboardSizeSelectorProps {
  activeSize: number;
  onSizeChange: (size: number) => void;
  activeColor: string;
}

const SIZES = [
  { value: 2, label: 'XS' },
  { value: 4, label: 'S' },
  { value: 8, label: 'M' },
  { value: 16, label: 'L' },
];

/**
 * WhiteboardSizeSelector renders stroke size buttons with a live dot preview
 * showing the active colour at the selected size.
 */
export const WhiteboardSizeSelector: React.FC<WhiteboardSizeSelectorProps> = ({
  activeSize,
  onSizeChange,
  activeColor,
}) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">Size</span>
      {SIZES.map((sz) => {
        const isActive = activeSize === sz.value;
        const dotSize = Math.min(sz.value * 1.5, 18);
        return (
          <Button
            key={sz.value}
            variant={isActive ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => onSizeChange(sz.value)}
            title={`Stroke size ${sz.label}`}
            className="h-8 w-8 rounded-lg flex items-center justify-center"
          >
            <span
              className="rounded-full transition-all"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: isActive ? activeColor : 'currentColor',
                opacity: isActive ? 1 : 0.4,
              }}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default WhiteboardSizeSelector;
