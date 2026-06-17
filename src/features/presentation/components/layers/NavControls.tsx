import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

/**
 * NavControls renders a floating presenter dashboard overlay enabling slides transition,
 * fullscreen toggling, and binds general arrow key controls on mount.
 */
export const NavControls: React.FC<NavControlsProps> = ({
  current,
  total,
  onPrev,
  onNext,
  isFullscreen,
  onToggleFullscreen,
}) => {
  // Bind standard presentation keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        onToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPrev, onNext, onToggleFullscreen]);

  return (
    <div
      className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-background/80 px-4 py-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-background/95 select-none"
      data-nav-controls
    >
      {/* Return to Portal dashboard shortcut */}
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
        title="Return to Portal"
      >
        <Link to="/">
          <Home className="h-4 w-4" />
        </Link>
      </Button>

      <div className="h-4 w-px bg-border mx-1" />

      {/* Slide Navigation Back button */}
      <Button
        variant="ghost"
        size="icon"
        disabled={current <= 1}
        onClick={onPrev}
        className="h-8 w-8 rounded-full disabled:opacity-30"
        title="Previous Slide (Left Arrow)"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Slide Jump Indicator page label */}
      <span className="min-w-[45px] text-center font-mono text-xs font-semibold text-foreground/80">
        {current} / {total}
      </span>

      {/* Slide Navigation Next button */}
      <Button
        variant="ghost"
        size="icon"
        disabled={current >= total}
        onClick={onNext}
        className="h-8 w-8 rounded-full disabled:opacity-30"
        title="Next Slide (Right Arrow)"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="h-4 w-px bg-border mx-1" />

      {/* Fullscreen Mode toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFullscreen}
        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (Ctrl+F)'}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default NavControls;
