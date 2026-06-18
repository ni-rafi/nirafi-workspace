import React from 'react';
import { Palette } from 'lucide-react';

interface PlaygroundHueSliderProps {
  value: number;
  onChange: (hue: number) => void;
  disabled?: boolean;
}

const PRESET_HUES = [
  // Row 1
  { hue: 0, label: 'Red' },
  { hue: 30, label: 'Orange' },
  { hue: 60, label: 'Yellow' },
  { hue: 120, label: 'Green' },
  { hue: 155, label: 'Emerald' },
  // Row 2
  { hue: 195, label: 'Cyan' },
  { hue: 220, label: 'Blue' },
  { hue: 255, label: 'Indigo' },
  { hue: 290, label: 'Purple' },
  { hue: 330, label: 'Pink' },
];

export const PlaygroundHueSlider: React.FC<PlaygroundHueSliderProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <span className="flex items-center gap-1.5 font-semibold text-muted-foreground">
        <Palette className="h-3.5 w-3.5" /> Theme Accent Color
      </span>
      <div className="flex flex-col gap-1.5 rounded-lg border p-3 bg-muted/20">
        <div className="grid grid-cols-5 gap-2.5 py-1 justify-items-center">
          {PRESET_HUES.map(({ hue, label }) => {
            const isSelected = value === hue;
            return (
              <button
                key={hue}
                type="button"
                disabled={disabled}
                onClick={() => onChange(hue)}
                title={`${label} (${hue}°)`}
                className={`w-7 h-7 rounded-full transition-all flex items-center justify-center relative ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
                }`}
                style={{
                  backgroundColor: `hsl(${hue}, 75%, 55%)`,
                  boxShadow: isSelected
                    ? `0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(${hue}, 75%, 55%)`
                    : 'none',
                }}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[9px] text-muted-foreground mt-2 leading-normal">
          Select an accent color from the curated palette to style slide highlights, equations, badges, and layout lines.
        </p>
      </div>
    </div>
  );
};

export default PlaygroundHueSlider;
