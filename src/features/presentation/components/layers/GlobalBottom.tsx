import React from 'react';

interface GlobalBottomProps {
  current: number;
  total: number;
  hide?: boolean;
}

/**
 * GlobalBottom renders a persistent footer layer inside the slide canvas sheet,
 * including a thin progress bar at the bottom and active slide indices.
 */
export const GlobalBottom: React.FC<GlobalBottomProps> = ({
  current,
  total,
  hide = false,
}) => {
  if (hide) {
    return null;
  }

  // Calculate slide percentage progress
  const progressPercent = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 select-none pointer-events-none"
      data-global-bottom
    >
      {/* Footer Branding Text & Slide Counter */}
      <div className="flex items-center justify-between px-8 py-3 text-[10px] font-semibold text-muted-foreground/80 tracking-wide uppercase">
        <span>Shahjalal University of Science & Technology</span>
        <span className="font-mono text-primary font-bold bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
          {current} / {total}
        </span>
      </div>

      {/* Progress Bar Indicator at the absolute bottom edge */}
      <div className="h-0.5 w-full bg-muted/60 overflow-hidden">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-full bg-primary transition-all duration-300 ease-out"
        />
      </div>
    </div>
  );
};

export default GlobalBottom;
