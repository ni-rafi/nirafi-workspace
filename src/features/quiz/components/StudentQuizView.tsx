import React from 'react';
import { NumericQuizStudent } from './types/NumericQuiz';
import { MultipleChoiceQuizStudent } from './types/MultipleChoiceQuiz';
import { Clock } from 'lucide-react';

interface StudentQuizViewProps {
  status: string;
  visibilityMode: 'stealth' | 'placeholder';
  isLagging: boolean;
  lagTimeLeft: number;
  timeLeft: number;
  quizType: 'numeric-input' | 'multiple-choice';
  questionText: string;
  options: string[];
  studentAnswer: string;
  setStudentAnswer: (val: string) => void;
  handleStudentSubmit: () => Promise<void>;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  correctAnswer: string;
  formatTime: (seconds: number) => string;
}

export const StudentQuizView: React.FC<StudentQuizViewProps> = ({
  status,
  visibilityMode,
  isLagging,
  lagTimeLeft,
  timeLeft,
  quizType,
  questionText,
  options,
  studentAnswer,
  setStudentAnswer,
  handleStudentSubmit,
  isSubmitting,
  hasSubmitted,
  correctAnswer,
  formatTime,
}) => {
  if (status === 'hidden') {
    if (visibilityMode === 'stealth') {
      return null;
    }
    return (
      <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
        <div className="flex justify-center mb-2">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            Classroom Quiz
          </span>
        </div>
        <div className="py-8 px-4 flex flex-col items-center gap-3">
          <Clock className="h-8 w-8 text-primary animate-pulse" />
          <h3 className="text-base font-bold text-foreground">Waiting to Open</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Classroom Quiz - Waiting to Open. Please stay tuned during the live session.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'closed') {
    return (
      <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
        <div className="flex justify-center mb-2">
          <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Quiz Closed
          </span>
        </div>
        <div className="py-8 px-4 flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-foreground">Submissions Closed</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            The quiz has already been taken on the live session. Submissions are now closed.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'active' && isLagging) {
    return (
      <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
        <div className="flex justify-between items-center select-none">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Classroom Quiz</span>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25 animate-pulse">
            <Clock className="h-3.5 w-3.5 animate-spin" />
            {lagTimeLeft}s
          </span>
        </div>
        <div className="py-8 px-4 flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <h3 className="text-base font-bold text-foreground">Preparing Quiz Form</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Classroom Quiz is loading... Form will open in {lagTimeLeft} seconds.
          </p>
        </div>
      </div>
    );
  }

  // Active Phase & Answering Phase
  return (
    <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-left">
      <div className="flex justify-between items-center select-none">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Classroom Quiz</span>
        <span className="flex items-center gap-1 text-xs font-bold text-red-500 font-mono bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/25">
          <Clock className="h-3.5 w-3.5 animate-pulse" />
          {formatTime(timeLeft)}
        </span>
      </div>

      {quizType === 'numeric-input' ? (
        <NumericQuizStudent
          questionText={questionText}
          userAnswer={studentAnswer}
          setUserAnswer={setStudentAnswer}
          onSubmit={handleStudentSubmit}
          isSubmitting={isSubmitting}
          isLocked={status === 'closed'}
          correctAnswer={correctAnswer}
          hasSubmitted={hasSubmitted}
        />
      ) : (
        <MultipleChoiceQuizStudent
          questionText={questionText}
          options={options}
          userAnswer={studentAnswer}
          setUserAnswer={setStudentAnswer}
          onSubmit={handleStudentSubmit}
          isSubmitting={isSubmitting}
          isLocked={status === 'closed'}
          correctAnswer={correctAnswer}
          hasSubmitted={hasSubmitted}
        />
      )}
    </div>
  );
};
