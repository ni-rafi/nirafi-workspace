import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Lock,
  Unlock,
  BarChart2,
  Users,
  CheckCircle,
  Clock,
  X,
  Trash2,
  Search,
  Loader2
} from 'lucide-react';
import { SUBJECTS } from '@/config/lectures';
import { useFirebase } from '@/context/FirebaseContext';
import { useLectureStatus } from '@/context';
import { getLectureDeck, loadLectureDeck, type SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import type { SubjectSubmissions, StudentQuizAnswer } from '@/services/firebase/firebase.schemas';

interface SlideDeck {
  slides: Record<number, React.ComponentType<SlideProps>>;
  slideMetadata: Record<number, {
    section?: string;
    tutorialRole?: 'statement' | 'checkpoint' | 'solution';
    quizId?: string;
    title?: string;
  }>;
}

interface StudentRow {
  uid: string;
  name: string;
  reg: string;
  correctCount: number;
  skippedCount: number;
  totalAttempts: number;
  lastSubmitTime: number;
  answers: Record<string, StudentQuizAnswer>;
}

export const TutorialAdminDashboard: React.FC = () => {
  const { subjectId, sessionId, lectureId } = useParams<{
    subjectId: string;
    sessionId: string;
    lectureId: string;
  }>();
  const navigate = useNavigate();
  const firebaseService = useFirebase();
  const { isLectureLocked, getLectureActiveRange, setLectureStatus } = useLectureStatus();

  const [isLoadingDeck, setIsLoadingDeck] = useState(true);
  const [deck, setDeck] = useState<SlideDeck | null>(null);
  const [submissions, setSubmissions] = useState<SubjectSubmissions[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Date time ranges state
  const [activeFromInput, setActiveFromInput] = useState('');
  const [activeUntilInput, setActiveUntilInput] = useState('');
  const [isSavingLimits, setIsSavingLimits] = useState(false);

  const activeSub = SUBJECTS.find((s) => s.id === subjectId);
  const activeSession = activeSub?.sessions.find((s) => s.id === sessionId);
  const activeLec = activeSession?.lectures.find((l) => l.id === lectureId);

  const isLocked = subjectId && sessionId && lectureId ? isLectureLocked(subjectId, sessionId, lectureId) : true;
  const { activeFrom, activeUntil } = subjectId && sessionId && lectureId
    ? getLectureActiveRange(subjectId, sessionId, lectureId)
    : { activeFrom: 0, activeUntil: 0 };

  // Sync timing bounds with states
  useEffect(() => {
    if (activeFrom) {
      // Format to yyyy-MM-ddThh:mm
      const d = new Date(activeFrom);
      const formatted = d.toISOString().slice(0, 16);
      setActiveFromInput(formatted);
    } else {
      setActiveFromInput('');
    }

    if (activeUntil) {
      const d = new Date(activeUntil);
      const formatted = d.toISOString().slice(0, 16);
      setActiveUntilInput(formatted);
    } else {
      setActiveUntilInput('');
    }
  }, [activeFrom, activeUntil]);

  // Load sessional slide deck to know what checkpoints exist
  useEffect(() => {
    if (!subjectId || !sessionId || !lectureId) return;
    setIsLoadingDeck(true);
    loadLectureDeck(subjectId, sessionId, lectureId)
      .then(() => {
        setDeck(getLectureDeck(lectureId));
        setIsLoadingDeck(false);
      })
      .catch((err) => {
        console.error('Failed to load sessional tutorial deck:', err);
        setIsLoadingDeck(false);
      });
  }, [subjectId, sessionId, lectureId]);

  // Listen to all student submissions in real-time
  useEffect(() => {
    if (!subjectId || !sessionId) return;
    return firebaseService.subscribeAllSubmissions(subjectId, sessionId, (subs) => {
      setSubmissions(subs);
    });
  }, [subjectId, sessionId, firebaseService]);

  // Parse checkpoints list from deck
  const checkpoints = useMemo(() => {
    if (!deck) return [];
    const list: { quizId: string; title: string }[] = [];
    Object.values(deck.slideMetadata).forEach((meta) => {
      if (meta.tutorialRole === 'checkpoint' && meta.quizId) {
        list.push({
          quizId: meta.quizId,
          title: meta.title || `Checkpoint (${meta.quizId})`,
        });
      }
    });
    return list;
  }, [deck]);

  // Build rows data
  const studentRows = useMemo((): StudentRow[] => {
    if (checkpoints.length === 0) return [];
    return submissions.map((sub) => {
      let correctCount = 0;
      let skippedCount = 0;
      let totalAttempts = 0;
      let lastSubmitTime = 0;

      checkpoints.forEach((cp) => {
        const answer = sub.answers[cp.quizId];
        if (answer) {
          if (answer.isCorrect) correctCount++;
          if (answer.isSkipped) skippedCount++;

          const attempts = answer.attempts || [];
          totalAttempts += attempts.length > 0 ? attempts.length : 1;

          if (answer.submittedAt > lastSubmitTime) {
            lastSubmitTime = answer.submittedAt;
          }
        }
      });

      return {
        uid: sub.studentUid,
        name: sub.studentName,
        reg: sub.studentRegistration,
        correctCount,
        skippedCount,
        totalAttempts,
        lastSubmitTime,
        answers: sub.answers,
      };
    });
  }, [submissions, checkpoints]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return studentRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reg.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [studentRows, searchQuery]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalCount = studentRows.length;
    if (totalCount === 0) {
      return { avgScore: 0, avgAttempts: 0, completedPercent: 0, totalCount: 0 };
    }

    let sumCorrect = 0;
    let sumAttempts = 0;
    let fullyCompletedCount = 0;

    studentRows.forEach((row) => {
      sumCorrect += row.correctCount;
      sumAttempts += row.totalAttempts;
      if (checkpoints.length > 0 && row.correctCount === checkpoints.length) {
        fullyCompletedCount++;
      }
    });

    return {
      avgScore: checkpoints.length > 0 ? ((sumCorrect / (totalCount * checkpoints.length)) * 100).toFixed(0) : '0',
      avgAttempts: (sumAttempts / totalCount).toFixed(1),
      completedPercent: ((fullyCompletedCount / totalCount) * 100).toFixed(0),
      totalCount,
    };
  }, [studentRows, checkpoints]);

  // Toggle sessional lock
  const handleToggleLock = async () => {
    if (!subjectId || !sessionId || !lectureId) return;
    try {
      await setLectureStatus(subjectId, sessionId, lectureId, { locked: !isLocked });
    } catch (err) {
      console.error('Failed to toggle lock status:', err);
    }
  };

  // Update timing bounds
  const handleUpdateBounds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || !sessionId || !lectureId) return;
    setIsSavingLimits(true);
    try {
      const fromMs = activeFromInput ? new Date(activeFromInput).getTime() : 0;
      const untilMs = activeUntilInput ? new Date(activeUntilInput).getTime() : 0;
      await setLectureStatus(subjectId, sessionId, lectureId, {
        activeFrom: fromMs,
        activeUntil: untilMs,
      });
      alert('Sessional limits updated successfully!');
    } catch (err) {
      console.error('Failed to update limits:', err);
      alert('Failed to update limits: ' + err);
    } finally {
      setIsSavingLimits(false);
    }
  };

  // Reset student attempts
  const handleResetStudent = async (row: StudentRow) => {
    if (!subjectId || !sessionId) return;
    const confirmReset = window.confirm(
      `Are you sure you want to reset all tutorial attempts for ${row.name} (${row.reg})? This will delete all their recorded checkpoint answers.`
    );
    if (!confirmReset) return;

    try {
      await firebaseService.resetStudentSubmissions(subjectId, sessionId, row.uid, {
        name: row.name,
        reg: row.reg,
      });
      // Close side sheet if open
      if (selectedStudent?.uid === row.uid) {
        setSelectedStudent(null);
      }
      alert('Student submissions reset successfully.');
    } catch (err) {
      console.error('Failed to reset student:', err);
      alert('Failed to reset student: ' + err);
    }
  };

  if (isLoadingDeck) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary shrink-0" />
        <span className="mt-4 text-sm font-semibold tracking-wide animate-pulse">Loading Tutorial Scoreboard</span>
      </div>
    );
  }

  if (!activeSub || !activeLec) {
    return <div className="text-center py-10 text-red-500 font-bold">Tutorial not found.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 text-left">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/${subjectId}`)}
            className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" /> {activeLec.title} - Scoreboard
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Grade and audit student sessional tutorial responses in real-time.
            </p>
          </div>
        </div>

        {/* Global lock button */}
        <button
          onClick={handleToggleLock}
          className={`flex items-center gap-1.5 px-4 py-2 font-semibold text-xs rounded-lg transition-colors cursor-pointer border ${
            isLocked
              ? 'bg-red-500/10 text-red-500 border-red-500/25 hover:bg-red-500/20'
              : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25 hover:bg-emerald-500/20'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="h-4 w-4 shrink-0" />
              <span>Workspace Locked</span>
            </>
          ) : (
            <>
              <Unlock className="h-4 w-4 shrink-0" />
              <span>Workspace Active (Unlocked)</span>
            </>
          )}
        </button>
      </div>

      {/* Metrics Summaries Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Submissions</div>
            <div className="text-xl font-black text-foreground">{metrics.totalCount}</div>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Avg Class Score</div>
            <div className="text-xl font-black text-foreground">{metrics.avgScore}%</div>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Avg Attempts/Step</div>
            <div className="text-xl font-black text-foreground">{metrics.avgAttempts}</div>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Completion Rate</div>
            <div className="text-xl font-black text-foreground">{metrics.completedPercent}%</div>
          </div>
        </div>
      </div>

      {/* Sessional timing bounds configuration panel */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5 select-none">
          <Calendar className="h-4 w-4 text-muted-foreground" /> Sessional Active Limits
        </h3>
        <form onSubmit={handleUpdateBounds} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground">From Date/Time</label>
            <input
              type="datetime-local"
              value={activeFromInput}
              onChange={(e) => setActiveFromInput(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Until Date/Time</label>
            <input
              type="datetime-local"
              value={activeUntilInput}
              onChange={(e) => setActiveUntilInput(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isSavingLimits}
            className="px-5 py-2 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
          >
            {isSavingLimits ? 'Saving...' : 'Update Limits'}
          </button>
        </form>
      </div>

      {/* Table grid scoreboard */}
      <div className="bg-card border border-border/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        {/* Search filter bar */}
        <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by student name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg bg-background text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary w-full"
            />
          </div>
          <div className="text-xs text-muted-foreground select-none">
            Showing {filteredRows.length} of {studentRows.length} submissions
          </div>
        </div>

        {/* Score table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border select-none">
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase font-mono">Roll / Registration</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase">Student Name</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase text-center">Correct Steps</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase text-center">Skipped</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase text-center">Attempts</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase">Last Activity</th>
                <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRows.map((row) => (
                <tr
                  key={row.uid}
                  onClick={() => setSelectedStudent(row)}
                  className="hover:bg-muted/20 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-bold text-foreground font-mono">{row.reg}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{row.name}</td>
                  <td className="px-5 py-3.5 text-sm font-black text-center text-emerald-600 dark:text-emerald-400">
                    {row.correctCount} / {checkpoints.length}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-center text-amber-500">
                    {row.skippedCount}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-center text-foreground font-mono">{row.totalAttempts}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {row.lastSubmitTime > 0 ? new Date(row.lastSubmitTime).toLocaleTimeString() : 'N/A'}
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedStudent(row)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleResetStudent(row)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Reset Student data"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr className="select-none">
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No submissions matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Inspect panel (Slide Drawer) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-in fade-in duration-200">
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedStudent(null)}
          />

          {/* Drawer content body */}
          <div className="relative w-full max-w-lg bg-card border-l border-border h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{selectedStudent.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">Registration: {selectedStudent.reg}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer scroll body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Reset button inside drawer */}
              <div className="flex justify-between items-center bg-muted/30 border p-4 rounded-2xl">
                <span className="text-xs font-semibold text-muted-foreground select-none">
                  Clear attempts history:
                </span>
                <button
                  onClick={() => handleResetStudent(selectedStudent)}
                  className="px-3.5 py-1.5 bg-red-500 hover:bg-red-500/90 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" /> Reset All Answers
                </button>
              </div>

              {/* Checkpoints Audit list */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest select-none">
                  Checkpoint Logs Timeline
                </h4>
                
                <div className="flex flex-col gap-5">
                  {checkpoints.map((cp) => {
                    const ans = selectedStudent.answers[cp.quizId];
                    const attempts = ans?.attempts || [];
                    const isCorrect = ans?.isCorrect || false;
                    const isSkipped = ans?.isSkipped || false;

                    return (
                      <div
                        key={cp.quizId}
                        className="border border-border/80 bg-muted/10 p-4 rounded-2xl flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between border-b border-border/30 pb-2">
                          <h5 className="text-xs font-bold text-foreground pr-2 truncate">{cp.title}</h5>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border select-none ${
                            isCorrect
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : isSkipped
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Unsolved'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          {attempts.map((att: { answer: string; isCorrect: boolean; submittedAt: number; isSkipped?: boolean }, attIdx: number) => (
                            <div
                              key={attIdx}
                              className="flex items-center justify-between text-xs py-1 px-2 rounded bg-background border"
                            >
                              <span className="font-semibold text-muted-foreground">
                                Attempt #{attIdx + 1}:
                              </span>
                              <span className="font-bold text-foreground select-all">
                                {att.answer}
                              </span>
                              <span className={`font-bold ${att.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                {att.isSkipped ? 'Skipped' : att.isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                {new Date(att.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </span>
                            </div>
                          ))}

                          {/* Fallback if answer exists but attempts list is empty (backwards compatibility) */}
                          {ans && attempts.length === 0 && (
                            <div className="flex items-center justify-between text-xs py-1 px-2 rounded bg-background border">
                              <span className="font-semibold text-muted-foreground">
                                Initial:
                              </span>
                              <span className="font-bold text-foreground select-all">
                                {ans.answer}
                              </span>
                              <span className={`font-bold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                                {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                {new Date(ans.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          )}

                          {!ans && (
                            <span className="text-xs text-muted-foreground italic select-none">
                              No submissions yet.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialAdminDashboard;
