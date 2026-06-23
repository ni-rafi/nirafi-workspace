import React from 'react';

interface AdminRegNoInspectorProps {
  inspectorRegNo: string;
  setInspectorRegNo: (val: string) => void;
  maxDigitsRequired: number;
  activeRegNo: string | undefined;
  curCorrectAnswer: string;
}

export const AdminRegNoInspector: React.FC<AdminRegNoInspectorProps> = ({
  inspectorRegNo,
  setInspectorRegNo,
  maxDigitsRequired,
  activeRegNo,
  curCorrectAnswer,
}) => {
  return (
    <div className="flex items-center gap-2 mt-4 border-t border-border/40 pt-3 select-none">
      <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">
        Inspector Reg No:
      </span>
      <input
        type="text"
        value={inspectorRegNo}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '');
          setInspectorRegNo(val.slice(0, maxDigitsRequired));
        }}
        maxLength={maxDigitsRequired}
        placeholder={`Type last ${maxDigitsRequired} digit${
          maxDigitsRequired > 1 ? 's' : ''
        } to inspect parameters (e.g. ${maxDigitsRequired === 2 ? '45' : '5'})...`}
        className="flex-1 text-[11px] px-2.5 py-1 border border-border/60 rounded bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
      />
      {activeRegNo &&
        !curCorrectAnswer.includes('[last digit]') &&
        !curCorrectAnswer.includes('[last 2 digits]') && (
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
            Resolved: {curCorrectAnswer}
          </span>
        )}
    </div>
  );
};
