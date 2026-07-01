import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext, useLectureStatus } from '@/context';
import { Sparkles, BookOpen } from 'lucide-react';
import { SUBJECTS } from '@/config/lectures';

/**
 * LecturePortal renders the main student dashboard listing registered subjects
 * as minimal, beautiful course cards. Selecting a card navigates the student
 * to the dedicated subject portal.
 */
export const LecturePortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useUserContext();
  const { isLectureHidden } = useLectureStatus();
  const isAdmin = userProfile?.role === 'admin';
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (location.state && (location.state as { alertMessage?: string }).alertMessage) {
      setAlertMessage((location.state as { alertMessage: string }).alertMessage);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const latestSessionLabel = React.useMemo(() => {
    let latestYear = 0;
    let latestLabel = '';
    
    SUBJECTS.forEach((subject) => {
      subject.sessions.forEach((session) => {
        const match = session.label.match(/\d+/);
        if (match) {
          const year = parseInt(match[0], 10);
          if (year > latestYear) {
            latestYear = year;
            latestLabel = session.label;
          }
        }
      });
    });
    
    return latestLabel || 'Session 2026–27';
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Warning Alert Banner */}
      {alertMessage && (
        <div className="relative overflow-hidden rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs font-semibold text-destructive flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-300">
          <span>{alertMessage}</span>
          <button
            onClick={() => setAlertMessage(null)}
            className="text-[10px] font-bold tracking-wider uppercase bg-destructive/20 hover:bg-destructive/30 text-destructive px-2 py-1 rounded transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xs sm:p-8">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Latest: {latestSessionLabel}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Welcome to Md. Nazmul Islam Rafi's Workspace
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore interactive presentation slides, run civil engineering calculations in real-time wizards, and verify concepts in active quizzes.
          </p>
        </div>
      </div>

      {/* Course Catalog Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Course Catalog</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Select a subject to view its academic sessions, topic outlines, and interactive lecture decks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.filter((subject) => {
            if (isAdmin) return true;
            return subject.sessions.some((session) =>
              session.lectures.some((lecture) => !isLectureHidden(subject.id, session.id, lecture.id))
            );
          }).map((subject) => {
            const totalSessions = subject.sessions.length;
            const totalLectures = subject.sessions.reduce((acc, s) => acc + s.lectures.length, 0);

            return (
              <div
                key={subject.id}
                onClick={() => navigate(`/${subject.id}`)}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 cursor-pointer"
              >
                {/* Visual accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
                  style={{ backgroundColor: subject.color }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border shadow-xs text-2xl transition-transform duration-300 group-hover:scale-105">
                    {subject.iconEmoji}
                  </div>
                  <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold font-mono tracking-wider border bg-primary/5 text-primary uppercase">
                    {subject.courseCode}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary leading-tight">
                    {subject.courseTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t pt-4 mt-2 text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                  <span>{totalSessions} {totalSessions === 1 ? 'Session' : 'Sessions'}</span>
                  <span>{totalLectures} {totalLectures === 1 ? 'Lecture' : 'Lectures'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LecturePortal;
