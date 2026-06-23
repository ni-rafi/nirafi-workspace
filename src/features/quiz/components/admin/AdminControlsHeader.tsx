import React from 'react';
import { BarChart, List, RefreshCw, RotateCcw } from 'lucide-react';

interface AdminControlsHeaderProps {
  status: string;
  adminView: 'chart' | 'details';
  setAdminView: (view: 'chart' | 'details') => void;
  handleAdminReset: () => Promise<void>;
  handleAdminReactivate: (extraSeconds: number) => Promise<void>;
  handleAdminClose: () => Promise<void>;
  curIsRevealed: boolean;
  globalSubmissionCount: number;
  handleAdminReveal: (idSuffix?: string) => Promise<void>;
  currentQuestionIdSuffix: string;
  durationInput: number;
  setDurationInput: (val: number) => void;
}

export const AdminControlsHeader: React.FC<AdminControlsHeaderProps> = ({
  status,
  adminView,
  setAdminView,
  handleAdminReset,
  handleAdminReactivate,
  handleAdminClose,
  curIsRevealed,
  globalSubmissionCount,
  handleAdminReveal,
  currentQuestionIdSuffix,
  durationInput,
  setDurationInput,
}) => {
  return (
    <div className="flex justify-between items-center border-b pb-2 border-border/40 select-none">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setAdminView('chart')}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            adminView === 'chart'
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-background hover:bg-muted text-muted-foreground'
          }`}
        >
          <BarChart className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setAdminView('details')}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            adminView === 'details'
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-background hover:bg-muted text-muted-foreground'
          }`}
        >
          <List className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex gap-2">
        {status === 'active' && (
          <>
            <button
              type="button"
              onClick={handleAdminReset}
              className="px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => handleAdminReactivate(60)}
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold cursor-pointer"
            >
              +1 Min
            </button>
            <button
              type="button"
              onClick={handleAdminClose}
              className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold cursor-pointer"
            >
              Close
            </button>
          </>
        )}
        {status === 'closed' && (
          <>
            {!curIsRevealed && globalSubmissionCount >= 1 && (
              <button
                type="button"
                onClick={() => handleAdminReveal(currentQuestionIdSuffix)}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
              >
                Reveal Answer
              </button>
            )}
            <button
              type="button"
              onClick={handleAdminReset}
              className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
            <div className="flex items-center gap-1">
              <select
                value={durationInput}
                onChange={(e) => setDurationInput(parseInt(e.target.value, 10))}
                className="text-[10px] font-bold border rounded-lg bg-background px-1.5 py-1 h-[28px] min-w-[85px] cursor-pointer"
              >
                <option value={60}>1 Min</option>
                <option value={120}>2 Mins</option>
                <option value={300}>5 Mins</option>
                <option value={600}>10 Mins</option>
              </select>
              <button
                type="button"
                onClick={() => handleAdminReactivate(durationInput)}
                className="px-2.5 py-1.5 bg-primary hover:bg-primary/95 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer h-[28px]"
              >
                <RotateCcw className="h-3 w-3" />
                Reopen
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
