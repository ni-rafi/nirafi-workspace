import React from 'react';

export interface MultipleChoiceQuizStudentProps {
  questionText: string;
  options: string[];
  userAnswer: string; // e.g. "0" or "A"
  setUserAnswer: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isLocked: boolean;
  correctAnswer: string;
  hasSubmitted: boolean;
}

export interface MultipleChoiceQuizAdminProps {
  options: string[];
  submissions: { studentName: string; studentRegistration: string; answer: string; isCorrect: boolean }[];
  activeView: 'chart' | 'details';
}

export const MultipleChoiceQuizStudent: React.FC<MultipleChoiceQuizStudentProps> = ({
  questionText,
  options,
  userAnswer,
  setUserAnswer,
  onSubmit,
  isSubmitting,
  isLocked,
  correctAnswer,
  hasSubmitted,
}) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto text-left">
      <div className="p-4 bg-muted/20 border rounded-xl font-medium text-sm text-foreground">
        {questionText}
      </div>

      {!hasSubmitted ? (
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => {
            const letter = letters[i] || `${i + 1}`;
            const isSelected = userAnswer === letter;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setUserAnswer(letter)}
                disabled={isLocked || isSubmitting}
                className={`w-full flex items-center gap-3 px-4 py-3 border rounded-xl text-left text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary/10 border-primary font-bold text-primary'
                    : 'bg-background hover:bg-muted/40 border-border/60 text-foreground'
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                  isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/80 text-muted-foreground border-border/60'
                }`}>
                  {letter}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
          <button
            onClick={onSubmit}
            disabled={isLocked || isSubmitting || !userAnswer}
            className="w-full mt-2 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Choice'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-4 border rounded-xl bg-muted/10">
          <div className="text-xs text-muted-foreground font-semibold">Your Selection:</div>
          <div className="text-md font-bold text-primary select-all">
            {userAnswer} {options[letters.indexOf(userAnswer)] && `— ${options[letters.indexOf(userAnswer)]}`}
          </div>
          {isLocked && (
            <div className="text-xs border-t pt-2 mt-1 border-border/40">
              Correct Answer: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{correctAnswer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const MultipleChoiceQuizAdmin: React.FC<MultipleChoiceQuizAdminProps> = ({
  options,
  submissions,
  activeView,
}) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Calculate distribution
  const counts: Record<string, number> = {};
  letters.slice(0, options.length).forEach((letter) => { counts[letter] = 0; });
  submissions.forEach((sub) => {
    const ans = sub.answer.toUpperCase();
    if (counts[ans] !== undefined) counts[ans]++;
  });

  const total = submissions.length;

  if (activeView === 'chart') {
    return (
      <div className="flex flex-col gap-3 w-full p-4 border border-border/40 rounded-xl bg-muted/10 text-xs">
        {options.map((opt, i) => {
          const letter = letters[i] || '';
          const count = counts[letter] || 0;
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={i} className="flex flex-col gap-1 w-full text-left">
              <div className="flex justify-between items-center text-[10px] font-semibold text-muted-foreground">
                <span>Choice {letter}: {opt}</span>
                <span>{count} votes ({percent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden relative border border-border/30">
                <div
                  style={{ width: `${percent}%` }}
                  className="h-full bg-primary transition-all duration-500"
                />
              </div>
            </div>
          );
        })}
        <div className="text-[10px] text-muted-foreground text-center mt-2 border-t pt-2 border-border/20 select-none">
          Total Participants: <span className="font-bold text-foreground">{total}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border/40 rounded-xl overflow-hidden text-xs w-full max-h-60 overflow-y-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b border-border/40 font-bold text-muted-foreground select-none">
            <th className="p-2">Roll</th>
            <th className="p-2">Name</th>
            <th className="p-2 text-right">Choice</th>
            <th className="p-2 text-center">Result</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, i) => (
            <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/10">
              <td className="p-2 font-mono">{sub.studentRegistration}</td>
              <td className="p-2 truncate max-w-[120px]">{sub.studentName}</td>
              <td className="p-2 text-right font-bold font-mono">{sub.answer}</td>
              <td className="p-2 text-center">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  sub.isCorrect ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                  {sub.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </td>
            </tr>
          ))}
          {submissions.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">No submissions yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
