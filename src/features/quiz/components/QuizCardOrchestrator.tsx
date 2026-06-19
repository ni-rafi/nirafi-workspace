import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { useQuizState } from '../hooks/useQuizState';
import { getQuizVisibilityMode } from '@/features/presentation/components/slides/SlideRenderer';
import { StudentQuizView } from './StudentQuizView';
import { AdminQuizView } from './AdminQuizView';

export type QuizType = 'numeric-input' | 'multiple-choice';

interface QuizCardOrchestratorProps {
  quizId: string;
  questionText: string;
  quizType?: QuizType;
  options?: string[]; // Required for multiple choice
}

export const QuizCardOrchestrator: React.FC<QuizCardOrchestratorProps> = ({
  quizId,
  questionText,
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
    isLagging,
    lagTimeLeft,
    adminView,
    setAdminView,
    durationInput,
    setDurationInput,
    bufferInput,
    setBufferInput,
    allSubmissions,
    handleStudentSubmit,
    handleAdminActivate,
    handleAdminReactivate,
    handleAdminClose,
    handleAdminReset,
    isRevealed,
    handleAdminReveal,
    correctAnswer,
  } = useQuizState(quizId, quizType);

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

  const visibilityMode = getQuizVisibilityMode(quizId);
  const status = quizState?.status || 'hidden';

  if (!isAdmin) {
    return (
      <>
        <StudentQuizView
          status={status}
          visibilityMode={visibilityMode}
          isLagging={isLagging}
          lagTimeLeft={lagTimeLeft}
          timeLeft={timeLeft}
          quizType={quizType}
          questionText={questionText}
          options={options}
          studentAnswer={studentAnswer}
          setStudentAnswer={setStudentAnswer}
          handleStudentSubmit={handleStudentSubmit}
          isSubmitting={isSubmitting}
          hasSubmitted={hasSubmitted}
          correctAnswer={correctAnswer}
          formatTime={formatTime}
        />
        {/* PRINT-ONLY PLACEHOLDER */}
        <div className="quiz-print-placeholder hidden print:block border-2 border-dashed border-black/80 rounded-lg p-4 mt-4 text-xs select-none">
          <div className="font-bold text-center border-b border-black pb-1.5 mb-2">[ QUIZ ASSESSMENT ZONE ]</div>
          <p className="mb-1"><strong>Question:</strong> {questionText}</p>
          <p className="mb-1"><strong>Quiz ID:</strong> {quizId}</p>
          <p className="italic text-black/60">Submit your answer inside the web course portal to receive completion credit.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminQuizView
        status={status}
        questionText={questionText}
        durationInput={durationInput}
        setDurationInput={setDurationInput}
        bufferInput={bufferInput}
        setBufferInput={setBufferInput}
        handleAdminActivate={handleAdminActivate}
        isLagging={isLagging}
        lagTimeLeft={lagTimeLeft}
        timeLeft={timeLeft}
        formatTime={formatTime}
        handleAdminClose={handleAdminClose}
        handleAdminReset={handleAdminReset}
        adminView={adminView}
        setAdminView={setAdminView}
        handleAdminReactivate={handleAdminReactivate}
        quizType={quizType}
        correctAnswer={correctAnswer}
        options={options}
        allSubmissions={allSubmissions}
        isRevealed={isRevealed}
        handleAdminReveal={handleAdminReveal}
      />
      {/* PRINT-ONLY PLACEHOLDER */}
      <div className="quiz-print-placeholder hidden print:block border-2 border-dashed border-black/80 rounded-lg p-4 mt-4 text-xs select-none">
        <div className="font-bold text-center border-b border-black pb-1.5 mb-2">[ QUIZ ASSESSMENT ZONE ]</div>
        <p className="mb-1"><strong>Question:</strong> {questionText}</p>
        <p className="mb-1"><strong>Quiz ID:</strong> {quizId}</p>
        <p className="italic text-black/60">Submit your answer inside the web course portal to receive completion credit.</p>
      </div>
    </>
  );
};
