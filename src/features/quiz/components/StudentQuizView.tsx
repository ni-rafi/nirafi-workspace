import React from 'react';
import { NumericQuizStudent } from './types/NumericQuiz';
import { MultipleChoiceQuizStudent } from './types/MultipleChoiceQuiz';
import { Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { SubQuestionDefinition } from '../hooks/useQuizState';
import { useUserContext } from '@/context';
import { parameterResolver } from '../utils/parameterResolver';

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
  studentAnswers: Record<string, string>;
  setStudentAnswer: (valOrSuffix: string, val?: string) => void;
  handleStudentSubmit: () => Promise<void>;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  correctAnswer: string | ((reg: string) => string) | { formula: string; resolve: (reg: string) => string };
  correctAnswers: Record<string, string | ((reg: string) => string) | { formula: string; resolve: (reg: string) => string }>;
  formatTime: (seconds: number) => string;
  questions: SubQuestionDefinition[];
}

export const StudentQuizView: React.FC<StudentQuizViewProps> = ({
  status,
  visibilityMode,
  isLagging,
  lagTimeLeft,
  timeLeft,
  studentAnswers,
  setStudentAnswer,
  handleStudentSubmit,
  isSubmitting,
  hasSubmitted,
  correctAnswers,
  formatTime,
  questions,
}) => {
  const { userProfile } = useUserContext();
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    if (status !== 'active') {
      setActiveStep(0);
    }
  }, [status]);

  if (status === 'hidden') {
    if (visibilityMode === 'stealth') {
      return null;
    }
    return (
      <div className="w-full max-w-2xl mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
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

  if (status === 'closed' && questions.length <= 1) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
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
      <div className="w-full max-w-2xl mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-center select-none">
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

  const registration = userProfile?.registration || '2020331000';

  const isMultiQuestion = questions.length > 1;
  const currentQuestion = questions[activeStep] || questions[0] || {
    idSuffix: '',
    questionText: '',
    quizType: 'numeric-input' as const,
    options: [] as string[],
  };
  
  const curQuestionText = parameterResolver.resolve(currentQuestion.questionText, registration);
  const curOptions = parameterResolver.resolve(currentQuestion.options || [], registration);
  const curAnswer = studentAnswers[currentQuestion.idSuffix] || '';
  
  const curCorrectAnswerRaw = correctAnswers[currentQuestion.idSuffix] || '';
  const curCorrectAnswer = parameterResolver.resolve(curCorrectAnswerRaw, registration);

  const isAnswerValid = (ans: string, type: 'numeric-input' | 'multiple-choice') => {
    if (type === 'multiple-choice') return ans.trim().length > 0;
    const clean = ans.trim();
    if (!clean) return false;
    const match = clean.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(.*)$/);
    return match !== null && match[1] !== undefined;
  };

  const isAllValid = questions.every((q) => {
    const ans = studentAnswers[q.idSuffix] || '';
    return isAnswerValid(ans, q.quizType);
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-5 text-left">
      <div className="flex justify-between items-center select-none border-b border-border/40 pb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Classroom Quiz</span>
          {isMultiQuestion && (
            <span className="text-xs text-muted-foreground font-semibold">
              Question {activeStep + 1} of {questions.length}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-red-500 font-mono bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/25 animate-pulse">
          <Clock className="h-3.5 w-3.5" />
          {formatTime(timeLeft)}
        </span>
      </div>

      {isMultiQuestion && !hasSubmitted && (
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden select-none -mt-2">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((activeStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      )}

      <div className="flex-1 py-1">
        {currentQuestion.quizType === 'numeric-input' ? (
          <NumericQuizStudent
            key={currentQuestion.idSuffix}
            questionText={curQuestionText}
            userAnswer={curAnswer}
            setUserAnswer={(val) => setStudentAnswer(currentQuestion.idSuffix, val)}
            onSubmit={handleStudentSubmit}
            isSubmitting={isSubmitting}
            isLocked={status === 'closed'}
            correctAnswer={curCorrectAnswer}
            hasSubmitted={hasSubmitted}
            hideSubmit={isMultiQuestion}
          />
        ) : (
          <MultipleChoiceQuizStudent
            key={currentQuestion.idSuffix}
            questionText={curQuestionText}
            options={curOptions}
            userAnswer={curAnswer}
            setUserAnswer={(val) => setStudentAnswer(currentQuestion.idSuffix, val)}
            onSubmit={handleStudentSubmit}
            isSubmitting={isSubmitting}
            isLocked={status === 'closed'}
            correctAnswer={curCorrectAnswer}
            hasSubmitted={hasSubmitted}
            hideSubmit={isMultiQuestion}
          />
        )}
      </div>

      {isMultiQuestion && (
        <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-2 select-none">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0 || isSubmitting}
            className="px-3 py-1.5 border rounded-lg hover:bg-muted text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          {!hasSubmitted ? (
            <div className="flex gap-2">
              {activeStep < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(questions.length - 1, prev + 1))}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-primary hover:bg-primary/95 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStudentSubmit}
                  disabled={!isAllValid || isSubmitting}
                  className="px-5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
                >
                  <Check className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit All Answers'}
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-1.5 items-center">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${
                    activeStep === idx ? 'bg-primary text-white border-primary' : 'bg-muted hover:bg-muted/80 text-muted-foreground border-transparent'
                  } border`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
