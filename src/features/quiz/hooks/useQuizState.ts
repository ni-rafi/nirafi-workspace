import { useState, useEffect } from 'react';
import { useFirebase } from '@/context/FirebaseContext';
import { useUserContext } from '@/context/UserContext';
import type { QuizState } from '@/services/firebase/IFirebaseService';

interface QuizSubmission {
  studentName: string;
  studentRegistration: string;
  answer: string;
  isCorrect: boolean;
}

export const useQuizState = (
  quizId: string,
  correctAnswer: string,
  quizType: 'numeric-input' | 'multiple-choice'
) => {
  const firebaseService = useFirebase();
  const { userProfile, uid } = useUserContext();

  const isAdmin = userProfile?.role === 'admin';


  const [quizState, setQuizStateState] = useState<QuizState | null>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLagging, setIsLagging] = useState(false);
  const [lagTimeLeft, setLagTimeLeft] = useState(0);
  const [adminView, setAdminView] = useState<'chart' | 'details'>('chart');
  const [durationInput, setDurationInput] = useState(300); // Default 5 mins
  const [allSubmissions, setAllSubmissions] = useState<QuizSubmission[]>([]);

  const subjectId = 'quantity-surveying'; // default mock
  const sessionId = 'session-2026';

  // 1. Subscribe to active Quiz State
  useEffect(() => {
    return firebaseService.subscribeQuizState(quizId, (state) => {
      setQuizStateState(state);
    });
  }, [quizId, firebaseService]);

  // 2. Fetch student's existing answer if any
  useEffect(() => {
    if (uid && !isAdmin) {
      firebaseService.getSubjectSubmissions(subjectId, sessionId, uid).then((sub) => {
        if (sub && sub.answers[quizId]) {
          setStudentAnswer(sub.answers[quizId].answer);
          setHasSubmitted(true);
        }
      });
    }
  }, [uid, quizId, isAdmin, firebaseService]);

  // 3. Fetch submissions for Admin view
  const fetchSubmissions = async () => {
    if (isAdmin) {
      const subs = await firebaseService.getAllSubmissions(subjectId, sessionId);
      const quizSubs = subs
        .filter((s) => s.answers[quizId] !== undefined)
        .map((s) => {
          const ans = s.answers[quizId]!;
          return {
            studentName: s.studentName,
            studentRegistration: s.studentRegistration,
            answer: ans.answer,
            isCorrect: ans.isCorrect,
          };
        });
      setAllSubmissions(quizSubs);
    }
  };

  useEffect(() => {
    if (isAdmin && (quizState?.status === 'active' || quizState?.status === 'closed')) {
      fetchSubmissions();
      const interval = setInterval(fetchSubmissions, 4000);
      return () => clearInterval(interval);
    }
  }, [isAdmin, quizState?.status, quizId]);

  // Helper to determine buffer lag time based on the active answering duration
  const getLagTimeSeconds = (durationSeconds: number): number => {
    if (durationSeconds <= 60) return 20;
    if (durationSeconds <= 120) return 30;
    return 50;
  };

  // 4. Timer Logic
  useEffect(() => {
    if (quizState?.status === 'active' && quizState.activatedAt) {
      const activatedTime = typeof quizState.activatedAt === 'number'
        ? quizState.activatedAt
        : quizState.activatedAt instanceof Date
          ? quizState.activatedAt.getTime()
          : (quizState.activatedAt as { seconds: number }).seconds * 1000 || Date.now();

      const buffer = quizState.loadingBufferSeconds || 0;

      const runTimer = () => {
        const elapsed = Math.floor((Date.now() - activatedTime) / 1000);
        
        if (elapsed < buffer) {
          setIsLagging(true);
          setLagTimeLeft(buffer - elapsed);
          setTimeLeft(quizState.durationSeconds);
        } else {
          setIsLagging(false);
          setLagTimeLeft(0);
          
          const answeringElapsed = elapsed - buffer;
          const remaining = quizState.durationSeconds - answeringElapsed;
          
          if (remaining <= 0) {
            setTimeLeft(0);
            if (isAdmin) {
              firebaseService.setQuizState(quizId, { ...quizState, status: 'closed' });
            }
          } else {
            setTimeLeft(remaining);
          }
        }
      };

      runTimer();
      const timer = setInterval(runTimer, 1000);
      return () => clearInterval(timer);
    } else {
      setIsLagging(false);
      setLagTimeLeft(0);
      setTimeLeft(0);
    }
  }, [quizState, quizId, isAdmin, firebaseService]);

  const handleStudentSubmit = async () => {
    if (!uid || !userProfile || hasSubmitted) return;
    setIsSubmitting(true);
    const isCorrect = studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    await firebaseService.submitQuizAnswer(
      subjectId,
      sessionId,
      uid,
      { name: userProfile.name, reg: userProfile.registration || '0000000000' },
      quizId,
      studentAnswer,
      isCorrect
    );
    setHasSubmitted(true);
    setIsSubmitting(false);
  };

  const handleAdminActivate = async () => {
    const lagTime = getLagTimeSeconds(durationInput);
    await firebaseService.setQuizState(quizId, {
      status: 'active',
      activatedAt: Date.now(),
      durationSeconds: durationInput,
      quizType,
      loadingBufferSeconds: lagTime,
    });
  };

  const handleAdminReactivate = async (extraSeconds: number) => {
    const nextDuration = (timeLeft > 0 ? timeLeft : 0) + extraSeconds;
    await firebaseService.setQuizState(quizId, {
      status: 'active',
      activatedAt: Date.now(),
      durationSeconds: nextDuration,
      quizType,
      loadingBufferSeconds: 0,
    });
  };

  const handleAdminClose = async () => {
    if (quizState) {
      await firebaseService.setQuizState(quizId, { ...quizState, status: 'closed' });
    }
  };

  return {
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
    allSubmissions,
    handleStudentSubmit,
    handleAdminActivate,
    handleAdminReactivate,
    handleAdminClose,
  };
};
