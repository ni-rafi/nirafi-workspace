import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PresentationTimerProps {
  durationMins: number;
  isOpen: boolean;
}

export const PresentationTimer: React.FC<PresentationTimerProps> = ({
  durationMins,
  isOpen,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const totalBudgetSeconds = durationMins * 60;

  // Running interval hook
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  if (!isOpen) return null;

  const handleReset = () => {
    setElapsedSeconds(0);
    setIsRunning(false);
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const isNegative = secs < 0;
    const absoluteSecs = Math.abs(secs);
    const m = Math.floor(absoluteSecs / 60);
    const s = absoluteSecs % 60;
    return `${isNegative ? '-' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const displaySeconds = isCountdown
    ? totalBudgetSeconds - elapsedSeconds
    : elapsedSeconds;

  const isExceeded = isCountdown ? displaySeconds < 0 : elapsedSeconds > totalBudgetSeconds;
  
  // Calculate percentage progress bar
  const progressPercent = Math.min(100, Math.max(0, (elapsedSeconds / totalBudgetSeconds) * 100));

  return (
    <div
      className="absolute top-20 right-6 z-40 flex flex-col gap-2 rounded-2xl border bg-background/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 w-52 select-none"
      data-presentation-timer
    >
      <div className="flex items-center justify-between border-b border-border pb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-1">
          <Timer className="h-3 w-3" /> Lecture Timer
        </span>
        <button
          onClick={() => setIsCountdown(!isCountdown)}
          className="hover:text-foreground transition-colors flex items-center gap-0.5"
          title="Toggle stopwatch/countdown mode"
        >
          {isCountdown ? (
            <Hourglass className="h-2.5 w-2.5 text-primary" />
          ) : (
            <Timer className="h-2.5 w-2.5 text-muted-foreground" />
          )}
          {isCountdown ? 'CountDown' : 'Elapsed'}
        </button>
      </div>

      {/* Ticking time digits */}
      <div className="text-center py-1.5">
        <span
          className={`text-2xl font-mono font-bold tracking-tight transition-colors duration-300 ${
            isExceeded ? 'text-destructive animate-pulse' : 'text-foreground'
          }`}
        >
          {formatTime(displaySeconds)}
        </span>
      </div>

      {/* Visual progress bar */}
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isExceeded ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <Button
          variant={isRunning ? 'secondary' : 'default'}
          size="sm"
          className="h-7 w-16 text-[10px] gap-1 font-semibold rounded-lg"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-16 text-[10px] gap-1 rounded-lg"
          onClick={handleReset}
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </Button>
      </div>
    </div>
  );
};

export default PresentationTimer;
