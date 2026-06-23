import React from 'react';
import { Play } from 'lucide-react';

interface AdminQuizSetupProps {
  durationInput: number;
  setDurationInput: (val: number) => void;
  bufferInput: number;
  setBufferInput: (val: number) => void;
  handleAdminActivate: () => Promise<void>;
}

export const AdminQuizSetup: React.FC<AdminQuizSetupProps> = ({
  durationInput,
  setDurationInput,
  bufferInput,
  setBufferInput,
  handleAdminActivate,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-[10px] font-bold text-muted-foreground uppercase select-none">
          Duration
        </label>
        <select
          value={durationInput}
          onChange={(e) => setDurationInput(parseInt(e.target.value, 10))}
          className="w-full text-xs border rounded-lg bg-background p-2 h-9 min-w-[110px]"
        >
          <option value={60}>1 Minute</option>
          <option value={120}>2 Minutes</option>
          <option value={300}>5 Minutes</option>
          <option value={600}>10 Minutes</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-[10px] font-bold text-muted-foreground uppercase select-none">
          Buffer (Max 30s)
        </label>
        <select
          value={bufferInput}
          onChange={(e) => setBufferInput(parseInt(e.target.value, 10))}
          className="w-full text-xs border rounded-lg bg-background p-2 h-9 min-w-[125px]"
        >
          <option value={0}>0s (No Lag)</option>
          <option value={10}>10 Seconds</option>
          <option value={20}>20 Seconds</option>
          <option value={30}>30 Seconds</option>
        </select>
      </div>
      <button
        type="button"
        onClick={handleAdminActivate}
        className="w-full sm:flex-1 py-2 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer h-9"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        Activate Quiz
      </button>
    </div>
  );
};
