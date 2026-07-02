import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserContext, useLectureStatus } from '@/context';
import { SUBJECTS } from '@/config/lectures';
import { ChevronLeft, Calculator, BookOpen, GraduationCap } from 'lucide-react';
import LectureCard from './LectureCard';
import { ErrorBoundary } from '@/shared/components';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export const SubjectPortal: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { userProfile } = useUserContext();
  const { isLectureHidden } = useLectureStatus();
  const isAdmin = userProfile?.role === 'admin';

  // Find matching subject
  const subject = React.useMemo(() => {
    return SUBJECTS.find((sub) => sub.id === subjectId);
  }, [subjectId]);

  // Sort sessions: latest first based on year in label
  const sortedSessions = React.useMemo(() => {
    if (!subject) return [];
    return [...subject.sessions].sort((a, b) => {
      const yearA = parseInt(a.label.match(/\d+/)?.[0] || '0', 10);
      const yearB = parseInt(b.label.match(/\d+/)?.[0] || '0', 10);
      return yearB - yearA;
    });
  }, [subject]);

  // Active session state (defaults to latest)
  const [activeSessionId, setActiveSessionId] = React.useState<string>('');

  React.useEffect(() => {
    if (sortedSessions.length > 0 && !activeSessionId) {
      const firstSession = sortedSessions[0];
      if (firstSession) {
        setActiveSessionId(firstSession.id);
      }
    }
  }, [sortedSessions, activeSessionId]);

  const activeSession = React.useMemo(() => {
    return subject?.sessions.find((s) => s.id === activeSessionId) || sortedSessions[0];
  }, [subject, activeSessionId, sortedSessions]);

  if (!subject) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold">Subject Not Found</h2>
        <p className="text-sm text-muted-foreground">The requested subject does not exist or has no registered lectures.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Breadcrumbs / Back button */}
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Workspace Dashboard</span>
        </button>
      </div>

      {/* Subject Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: subject.color }}
        />
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background border shadow-xs text-3xl select-none"
            role="img"
            aria-label={subject.courseTitle}
          >
            {subject.iconEmoji}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold font-mono tracking-wider border bg-primary/10 text-primary uppercase">
                {subject.courseCode}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                {subject.yearSemester}
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl text-foreground mt-0.5">
              {subject.courseTitle}
            </h1>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed mt-1">
              {subject.description}
            </p>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          {/* Syllabus Drawer Trigger */}
          {activeSession?.courseContent && activeSession.courseContent.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-muted hover:bg-muted/80 text-foreground border border-border/50 rounded-md cursor-pointer transition-all duration-200 shadow-xs">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>Syllabus Info</span>
                </button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full sm:max-w-md p-6 flex flex-col gap-6">
                <SheetHeader className="p-0 border-b pb-4">
                  <SheetTitle className="text-base font-extrabold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Course Syllabus Overview</span>
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    Syllabus chapters and outcomes for {subject.courseTitle} ({subject.courseCode}).
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-5 flex-1 select-text">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-foreground uppercase font-mono tracking-wider">
                      Syllabus Chapters (CCs)
                    </h3>
                    <div className="flex flex-col gap-4">
                      {activeSession.courseContent.map((chapter) => (
                        <div key={chapter.id} className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex h-4.5 min-w-[2.25rem] items-center justify-center rounded-md bg-muted px-1.5 text-[9px] font-bold font-mono text-muted-foreground border select-none">
                              CC 0{chapter.serial}
                            </span>
                            <h4 className="text-xs font-bold text-foreground leading-tight">
                              {chapter.title}
                            </h4>
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                            {chapter.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {activeSession && (
                  <div className="border-t pt-4 mt-auto">
                    <Link
                      to={`/${subject.id}/${activeSession.id}/course-outline`}
                      className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-xl border bg-muted/40 hover:bg-muted text-xs font-bold text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Launch Complete Outline Deck (Lecture 0)</span>
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          )}

          {subject.id === 'quantity-surveying' && (
            <button
              onClick={() => navigate('/quantity-surveying/calculators')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md cursor-pointer transition-all duration-200"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Launch Calculators</span>
            </button>
          )}
          <span className="text-xs font-mono font-bold border rounded-md px-2.5 py-1 text-muted-foreground select-none">
            {subject.creditHours} Credits
          </span>
        </div>
      </div>

      {/* Main Single Column layout (no sidebar) */}
      <div className="flex flex-col gap-6">
        {/* Sessions tab list */}
        {sortedSessions.length > 0 && (
          <div className="flex items-center gap-2 border-b pb-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono tracking-wider mr-2 select-none">
              Academic Session:
            </span>
            <div className="flex gap-2 flex-wrap">
              {sortedSessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <button
                    key={sess.id}
                    onClick={() => setActiveSessionId(sess.id)}
                    className={`px-3 py-1 text-xs font-bold rounded-full border cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-muted/30 border-border hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {sess.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Topics and Lectures Lists */}
        {activeSession && (
          <div className="flex flex-col gap-8">
            {/* Session Administration Header */}
            {isAdmin && (
              <div className="flex items-center justify-between border rounded-xl bg-card px-5 py-3 shadow-xs select-none">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-foreground">
                    Session Administration ({activeSession.label})
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Manage access locks and view aggregated student quiz performance.
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/${subject.id}/${activeSession.id}/admin`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md cursor-pointer transition-all duration-200"
                >
                  <span>Admin Scoreboard</span>
                </button>
              </div>
            )}

            {/* Loop topics */}
            {activeSession.topics && activeSession.topics.length > 0 ? (
              activeSession.topics
                .filter((group) => {
                  if (isAdmin) return true;
                  return group.lectures.some((l) => !isLectureHidden(subject.id, activeSession.id, l.id));
                })
                .map((group) => {
                  const matchedCC = activeSession.courseContent?.find((cc) => cc.id === group.topic.ccId);

                  const lecturesOnly = group.lectures.filter(l => l.type !== 'tutorial');
                  const tutorialsOnly = group.lectures.filter(l => l.type === 'tutorial');

                  return (
                    <section key={group.topic.id} className="flex flex-col gap-5">
                      {/* Topic Sub-Header Highlighted Banner */}
                      <div className="relative overflow-hidden rounded-xl border bg-muted/40 px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ backgroundColor: subject.color }}
                        />
                        <h3 className="text-sm font-bold text-foreground tracking-tight pl-1 select-text">
                          {group.topic.title}
                        </h3>
                        {matchedCC && (
                          <Link
                            to={`/${subject.id}/${activeSession.id}/course-outline/4`}
                            title={`Click to view details of CC 0${matchedCC.serial} in Course Syllabus (Lecture 0)`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-primary/25 bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-150 shadow-xs"
                          >
                            <BookOpen className="h-3.5 w-3.5 shrink-0" />
                            <span>CC 0{matchedCC.serial}: {matchedCC.title}</span>
                          </Link>
                        )}
                      </div>

                      {/* Classroom Lectures Grid */}
                      {lecturesOnly.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1 select-none">
                            Classroom Lectures
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {lecturesOnly
                              .filter((lecture) => {
                                if (isAdmin) return true;
                                return !isLectureHidden(subject.id, activeSession.id, lecture.id);
                              })
                              .map((lecture) => {
                                const deckUrl = `/${subject.id}/${activeSession.id}/${lecture.id}`;
                                return (
                                  <ErrorBoundary
                                    key={lecture.id}
                                    variant="card"
                                    contextTitle={
                                      typeof lecture.lectureNumber === 'number'
                                        ? `Lecture ${lecture.lectureNumber}: ${lecture.title}`
                                        : lecture.title
                                    }
                                  >
                                    <LectureCard
                                      lecture={lecture}
                                      deckUrl={deckUrl}
                                      subjectColor={subject.color}
                                      subjectId={subject.id}
                                      sessionId={activeSession.id}
                                    />
                                  </ErrorBoundary>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Sessional Tutorials Grid */}
                      {tutorialsOnly.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1 select-none">
                            Sessional Tutorials
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {tutorialsOnly
                              .filter((lecture) => {
                                if (isAdmin) return true;
                                return !isLectureHidden(subject.id, activeSession.id, lecture.id);
                              })
                              .map((lecture) => {
                                const deckUrl = `/${subject.id}/${activeSession.id}/${lecture.id}`;
                                return (
                                  <ErrorBoundary
                                    key={lecture.id}
                                    variant="card"
                                    contextTitle={`Tutorial ${lecture.lectureNumber}: ${lecture.title}`}
                                  >
                                    <LectureCard
                                      lecture={lecture}
                                      deckUrl={deckUrl}
                                      subjectColor={subject.color}
                                      subjectId={subject.id}
                                      sessionId={activeSession.id}
                                    />
                                  </ErrorBoundary>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })
            ) : (
              <div className="text-center py-10 border border-dashed rounded-2xl bg-card">
                <p className="text-sm text-muted-foreground">No lectures found for this session.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPortal;
