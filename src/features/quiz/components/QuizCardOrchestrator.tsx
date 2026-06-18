import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { NumericQuizStudent, NumericQuizAdmin } from './types/NumericQuiz';
import { MultipleChoiceQuizStudent, MultipleChoiceQuizAdmin } from './types/MultipleChoiceQuiz';
import { useQuizState } from '../hooks/useQuizState';
import { Play, RotateCcw, BarChart, List, Clock } from 'lucide-react';

interface QuizCardOrchestratorProps {
  quizId: string;
  questionText: string;
  correctAnswer: string;
  quizType?: 'numeric-input' | 'multiple-choice';
  options?: string[]; // Required for multiple choice
}

export const QuizCardOrchestrator: React.FC<QuizCardOrchestratorProps> = ({
  quizId,
  questionText,
  correctAnswer,
  quizType = 'numeric-input',
  options = [],
}) => {
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const {
    isAdmin,
    quizState,
    studentAnswer,
    setStudentAnswer,
    hasSubmitted,
    isSubmitting,
    timeLeft,
    adminView,
    setAdminView,
    durationInput,
    setDurationInput,
    allSubmissions,
    handleStudentSubmit,
    handleAdminActivate,
    handleAdminReactivate,
    handleAdminClose,
  } = useQuizState(quizId, correctAnswer, quizType);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (viewMode === 'blog') {
    return (
      <div className="w-full border p-4 rounded-xl bg-transparent text-left">
        <h4 className="font-extrabold text-sm text-primary mb-2">QUIZ: {questionText}</h4>
        <p className="text-xs text-muted-foreground">This is an interactive classroom assessment. Please visit the live session slides to participate.</p>
      </div>
    );
  }

  const status = quizState?.status || 'hidden';

  if (status === 'hidden' && !isAdmin) return null;

  return (
    <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-left">
      <div className="flex justify-between items-center select-none">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Classroom Quiz</span>
        {status === 'active' && (
          <span className="flex items-center gap-1 text-xs font-bold text-red-500 font-mono bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/25">
            <Clock className="h-3.5 w-3.5 animate-pulse" />
            {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {!isAdmin ? (
        // STUDENT INTERFACE
        status === 'placeholder' ? (
          <div className="text-center py-6 text-sm font-semibold text-muted-foreground select-none">
            [ QUIZ ACTIVE IN LIVE SESSION - Waiting to Open... ]
          </div>
        ) : (
          quizType === 'numeric-input' ? (
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
          )
        )
      ) : (
        // ADMIN PRESENTER INTERFACE
        <div className="flex flex-col gap-4">
          <div className="text-xs font-medium text-foreground select-text border bg-muted/20 p-3 rounded-xl mb-1">
            <span className="font-bold text-muted-foreground block mb-0.5 select-none">Admin Preview:</span>
            {questionText}
          </div>

          {status === 'hidden' && (
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <select
                value={durationInput}
                onChange={(e) => setDurationInput(parseInt(e.target.value))}
                className="w-full sm:w-auto text-xs border rounded-lg bg-background p-2"
              >
                <option value={60}>1 Minute</option>
                <option value={120}>2 Minutes</option>
                <option value={300}>5 Minutes</option>
                <option value={600}>10 Minutes</option>
              </select>
              <button
                onClick={handleAdminActivate}
                className="w-full sm:flex-1 py-2 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Activate Quiz
              </button>
            </div>
          )}

          {status !== 'hidden' && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center border-b pb-2 border-border/40 select-none">
                <div className="flex gap-1">
                  <button
                    onClick={() => setAdminView('chart')}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      adminView === 'chart' ? 'bg-primary/10 border-primary text-primary' : 'bg-background hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <BarChart className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setAdminView('details')}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      adminView === 'details' ? 'bg-primary/10 border-primary text-primary' : 'bg-background hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {status === 'active' && (
                    <>
                      <button
                        onClick={() => handleAdminReactivate(60)}
                        className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        +1 Min
                      </button>
                      <button
                        onClick={handleAdminClose}
                        className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        Close
                      </button>
                    </>
                  )}
                  {status === 'closed' && (
                    <button
                      onClick={() => handleAdminReactivate(120)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary/95 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reopen 2m
                    </button>
                  )}
                </div>
              </div>

              {quizType === 'numeric-input' ? (
                <NumericQuizAdmin
                  correctAnswer={correctAnswer}
                  submissions={allSubmissions}
                  activeView={adminView}
                />
              ) : (
                <MultipleChoiceQuizAdmin
                  options={options}
                  submissions={allSubmissions}
                  activeView={adminView}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* PRINT-ONLY PLACEHOLDER */}
      <div className="quiz-print-placeholder hidden print:block border-2 border-dashed border-black/80 rounded-lg p-4 mt-4 text-xs select-none">
        <div className="font-bold text-center border-b border-black pb-1.5 mb-2">[ QUIZ ASSESSMENT ZONE ]</div>
        <p className="mb-1"><strong>Question:</strong> {questionText}</p>
        <p className="mb-1"><strong>Quiz ID:</strong> {quizId}</p>
        <p className="italic text-black/60">Submit your answer inside the web course portal to receive completion credit.</p>
      </div>
    </div>
  );
};
