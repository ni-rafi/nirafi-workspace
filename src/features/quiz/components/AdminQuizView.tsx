import React from 'react';
import { NumericQuizAdmin } from './types/NumericQuiz';
import { MultipleChoiceQuizAdmin } from './types/MultipleChoiceQuiz';
import { Play, RotateCcw, BarChart, List } from 'lucide-react';

interface QuizSubmission {
  studentName: string;
  studentRegistration: string;
  answer: string;
  isCorrect: boolean;
}

interface AdminQuizViewProps {
  status: string;
  questionText: string;
  durationInput: number;
  setDurationInput: (val: number) => void;
  handleAdminActivate: () => Promise<void>;
  isLagging: boolean;
  lagTimeLeft: number;
  handleAdminClose: () => Promise<void>;
  adminView: 'chart' | 'details';
  setAdminView: (view: 'chart' | 'details') => void;
  handleAdminReactivate: (extraSeconds: number) => Promise<void>;
  quizType: 'numeric-input' | 'multiple-choice';
  correctAnswer: string;
  options: string[];
  allSubmissions: QuizSubmission[];
}

export const AdminQuizView: React.FC<AdminQuizViewProps> = ({
  status,
  questionText,
  durationInput,
  setDurationInput,
  handleAdminActivate,
  isLagging,
  lagTimeLeft,
  handleAdminClose,
  adminView,
  setAdminView,
  handleAdminReactivate,
  quizType,
  correctAnswer,
  options,
  allSubmissions,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 text-left">
      <div className="flex justify-between items-center select-none">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Classroom Quiz</span>
      </div>

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
            {isLagging ? (
              <div className="p-6 border border-dashed border-border rounded-xl bg-muted/10 flex flex-col items-center gap-3 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin"></div>
                </div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Lag Buffer Active</h4>
                <p className="text-xs text-muted-foreground">
                  Students are loading the quiz form... {lagTimeLeft} seconds remaining.
                </p>
                <div className="flex gap-2 mt-2 w-full justify-center">
                  <button
                    onClick={handleAdminClose}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Cancel / Close
                  </button>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
