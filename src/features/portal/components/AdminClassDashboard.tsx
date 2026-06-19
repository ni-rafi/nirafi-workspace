import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebase } from '@/context/FirebaseContext';
import { ArrowLeft, RefreshCw, GraduationCap, Award, FileSpreadsheet } from 'lucide-react';
import type { SubjectSubmissions } from '@/services/firebase/IFirebaseService';

export const AdminClassDashboard: React.FC = () => {
  const { subjectId, sessionId } = useParams<{ subjectId: string; sessionId: string }>();
  const navigate = useNavigate();
  const firebaseService = useFirebase();

  const [submissions, setSubmissions] = useState<SubjectSubmissions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // For Quantity Surveying session-2026, define the quiz columns
  const quizIds = ['qs_2026_lec1_quiz1', 'qs_2026_lec2_quiz1', 'qs_2026_lec3_quiz1'];
  const quizHeaders = ['Lec 1 Concrete', 'Lec 2 Brickwork', 'Lec 3 Steel'];

  const loadSubmissions = async () => {
    if (!subjectId || !sessionId) return;
    setIsLoading(true);
    try {
      const answersMod = await import(`../../../lectures/${subjectId}/${sessionId}/answers.ts`);
      setQuizAnswers(answersMod.QUIZ_ANSWERS);

      const data = await firebaseService.getAllSubmissions(subjectId, sessionId);
      setSubmissions(data);
    } catch (e) {
      console.error('Failed to load class submissions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [subjectId, sessionId]);

  const handleExport = () => {
    // Basic CSV mock download
    const headers = ['Roll Number', 'Student Name', ...quizHeaders, 'Score'];
    const rows = submissions.map((sub) => {
      let correct = 0;
      const quizCols = quizIds.map((qId) => {
        const ans = sub.answers[qId];
        if (ans) {
          const realAnswer = quizAnswers[qId] || '';
          const isCorrect = ans.answer.trim().toLowerCase() === realAnswer.trim().toLowerCase();
          if (isCorrect) correct++;
          return ans.answer;
        }
        return 'N/A';
      });
      return [sub.studentRegistration, sub.studentName, ...quizCols, `${correct}/${quizIds.length}`];
    });

    const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `submissions_${subjectId}_${sessionId}.csv`);
    link.click();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-6 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Scoreboard</h1>
            <p className="text-xs text-muted-foreground uppercase font-mono">{subjectId} • {sessionId}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadSubmissions}
            disabled={isLoading}
            className="px-3.5 py-2 border rounded-lg hover:bg-muted text-foreground transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            disabled={submissions.length === 0}
            className="px-3.5 py-2 bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-4 sm:grid-cols-3 select-none">
        <div className="border bg-card p-5 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <div className="text-xs text-muted-foreground font-medium">Students Enrolled</div>
          </div>
        </div>
        <div className="border bg-card p-5 rounded-xl flex items-center gap-4 shadow-xs">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {submissions.length > 0
                ? (
                    submissions.reduce((acc, curr) => {
                      let correct = 0;
                      quizIds.forEach((qId) => {
                        const ans = curr.answers[qId];
                        if (ans) {
                          const realAnswer = quizAnswers[qId] || '';
                          const isCorrect = ans.answer.trim().toLowerCase() === realAnswer.trim().toLowerCase();
                          if (isCorrect) correct++;
                        }
                      });
                      return acc + correct;
                    }, 0) / submissions.length
                  ).toFixed(1)
                : '0.0'}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Average Quizzes Correct</div>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="border bg-card rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border/80 font-bold text-muted-foreground select-none">
                <th className="p-3.5 pl-5">Registration</th>
                <th className="p-3.5">Student Name</th>
                {quizHeaders.map((head, i) => (
                  <th key={i} className="p-3.5 text-center">{head}</th>
                ))}
                <th className="p-3.5 text-right pr-5">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => {
                let score = 0;
                return (
                  <tr key={sub.studentUid} className="border-b border-border/40 last:border-0 hover:bg-muted/10">
                    <td className="p-3.5 pl-5 font-mono font-semibold text-xs text-foreground/80">{sub.studentRegistration}</td>
                    <td className="p-3.5 font-medium">{sub.studentName}</td>
                    {quizIds.map((qId) => {
                      const ans = sub.answers[qId];
                      if (!ans) {
                        return <td key={qId} className="p-3.5 text-center text-muted-foreground/50">—</td>;
                      }
                      const realAnswer = quizAnswers[qId] || '';
                      const isCorrect = ans.answer.trim().toLowerCase() === realAnswer.trim().toLowerCase();
                      if (isCorrect) score++;
                      return (
                        <td key={qId} className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold font-mono border ${
                              isCorrect
                                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400'
                                : 'bg-red-500/10 border-red-500/25 text-red-600 dark:text-red-400'
                            }`}
                            title={`Submitted: ${ans.answer}`}
                          >
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </td>
                      );
                    })}
                    <td className="p-3.5 text-right pr-5 font-bold font-mono">
                      {score} / {quizIds.length}
                    </td>
                  </tr>
                );
              })}
              {submissions.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={3 + quizIds.length} className="p-8 text-center text-muted-foreground select-none">
                    No submissions found for this session.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClassDashboard;
