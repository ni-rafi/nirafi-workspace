import React from 'react';
import { AnimatedCount } from '../AnimatedCount';
import { parseNumericAnswer } from '../../utils/answerChecker';
import { parameterResolver } from '../../utils/parameterResolver';

export interface NumericQuizStudentProps {
  questionText: string;
  userAnswer: string;
  setUserAnswer: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isLocked: boolean;
  correctAnswer: string;
  hasSubmitted: boolean;
  hideSubmit?: boolean;
}

export interface NumericQuizAdminProps {
  correctAnswer: string;
  correctAnswerRaw?: string | ((reg: string) => string) | { formula: string; resolve: (reg: string) => string };
  submissions: { studentName: string; studentRegistration: string; answer: string; isCorrect: boolean }[];
  activeView: 'chart' | 'details';
  isRevealed: boolean;
}

export const NumericQuizStudent: React.FC<NumericQuizStudentProps> = ({
  questionText,
  userAnswer,
  setUserAnswer,
  onSubmit,
  isSubmitting,
  isLocked,
  hasSubmitted,
  hideSubmit = false,
}) => {
  const parsed = parseNumericAnswer(userAnswer);
  const isValid = parsed !== null;
  const hasText = userAnswer.trim().length > 0;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto text-left">
      <div className="p-4 bg-muted/20 border rounded-xl font-medium text-sm text-foreground">
        {questionText}
      </div>
      {!hasSubmitted ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your calculation answer (e.g. 308 cft)..."
              disabled={isLocked || isSubmitting}
              className="flex-1 px-3 py-2 border rounded-lg bg-background text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {!hideSubmit && (
              <button
                onClick={onSubmit}
                disabled={isLocked || isSubmitting || !userAnswer.trim() || !isValid}
                className="px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
          {hasText && (
            <div className="px-1 text-[10px] font-medium select-none">
              {isValid ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  ✓ Interpreted as: <strong className="font-bold font-mono">{parsed.value}</strong>{parsed.unit ? ` ${parsed.unit}` : ''}
                </span>
              ) : (
                <span className="text-red-500">
                  ⚠️ Please enter a number first (e.g., 308 or 308 cft)
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4 border rounded-xl bg-muted/10">
          <div className="text-xs text-muted-foreground">Your Submission:</div>
          <div className="text-lg font-bold text-primary select-all">{userAnswer}</div>
        </div>
      )}
    </div>
  );
};

export const NumericQuizAdmin: React.FC<NumericQuizAdminProps> = ({
  correctAnswer,
  correctAnswerRaw,
  submissions,
  activeView,
  isRevealed,
}) => {
  const correctCount = submissions.filter((s) => s.isCorrect).length;
  const totalCount = submissions.length;
  const percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  if (activeView === 'chart') {
    // 1. If not revealed, always show response count screen
    if (!isRevealed) {
      return (
        <div className="flex flex-col items-center justify-center p-8 border border-border/40 rounded-xl bg-muted/10 gap-3 text-center min-h-[180px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest select-none">Collecting Responses</span>
          <div className="text-5xl font-extrabold text-primary select-none my-2">
            <AnimatedCount value={totalCount} />
          </div>
          <p className="text-xs text-muted-foreground select-none">
            Responses received in this live session.
          </p>
        </div>
      );
    }

    // 2. If revealed, show correctness chart
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-border/40 rounded-xl bg-muted/10 gap-4">
        <div className="relative flex items-center justify-center h-28 w-28 rounded-full border-4 border-muted">
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="text-2xl font-extrabold text-foreground">{percent}%</span>
            <span className="text-[9px] text-muted-foreground font-semibold uppercase">Correct</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center">
          <span className="font-bold text-foreground">{correctCount}</span> out of <span className="font-bold text-foreground">{totalCount}</span> submissions are correct (exact value: <span className="font-mono bg-muted px-1 py-0.5 rounded">{correctAnswer}</span>)
        </div>
      </div>
    );
  }

  // Details list view
  return (
    <div className="border border-border/40 rounded-xl overflow-hidden text-xs w-full max-h-60 overflow-y-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b border-border/40 font-bold text-muted-foreground select-none">
            <th className="p-2">Reg No</th>
            <th className="p-2">Name</th>
            <th className="p-2 text-right">Answer</th>
            {isRevealed && <th className="p-2 text-center">Result</th>}
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, i) => {
            const resolvedCorrect = correctAnswerRaw
              ? parameterResolver.resolve(correctAnswerRaw, sub.studentRegistration)
              : correctAnswer;
            return (
              <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10">
                <td className="p-2 font-mono">{sub.studentRegistration}</td>
                <td className="p-2 truncate max-w-[120px]">{sub.studentName}</td>
                <td className="p-2 text-right font-semibold font-mono">{isRevealed ? sub.answer : '✓ Submitted'}</td>
                {isRevealed && (
                  <td className="p-2 text-center select-none">
                    <span 
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-help ${
                        sub.isCorrect ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}
                      title={`Target correct answer: ${resolvedCorrect}`}
                    >
                      {sub.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
          {submissions.length === 0 && (
            <tr>
              <td colSpan={isRevealed ? 4 : 3} className="p-4 text-center text-muted-foreground">No submissions yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
