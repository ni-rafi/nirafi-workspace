import React, { useMemo, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Subject, Lecture, Session } from '@/config/lectures';
import SlideRenderer, { getSlideMetadata } from '../slides/SlideRenderer';
import { ClickStepsProvider } from '../../context/ClickStepsContext';
import { PresentationContext, ViewMode, Theme } from '../../context/PresentationContext';
import { useSlideTheme } from '../../context/SlideThemeContext';
import sustLogoUrl from '@/assets/Logos/SUST Logo.svg';
import { useLectureStatus } from '@/context';
import { useParams } from 'react-router-dom';

interface BlogOrchestratorProps {
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  viewMode: ViewMode;
  theme: Theme;
  visibleSlideNumbers: number[];
  collapsedSections: Record<string, boolean>;
  setCollapsedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  printRef?: React.RefObject<HTMLDivElement | null>;
}

const BlogSlideCard: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
}> = ({ slideNo, subject, lecture, session }) => {
  const meta = getSlideMetadata(slideNo, subject, lecture);
  const presentation = useContext(PresentationContext);

  const cardContextValue = useMemo(() => ({
    theme: presentation?.theme || 'light',
    viewMode: presentation?.viewMode || 'blog',
    activeSubStep: 999,
    slideNo,
    // Forward tutorial flags from outer context so QuizCardOrchestrator
    // inside each slide knows it is in tutorial mode.
    isTutorial: presentation?.isTutorial || false,
    tutorialLocked: presentation?.tutorialLocked || false,
  }), [presentation, slideNo]);

  let resolvedTheme: ReturnType<typeof useSlideTheme>['resolvedTheme'] | null = null;
  try {
    resolvedTheme = useSlideTheme().resolvedTheme;
  } catch {
    // Context fallback
  }

  const containerStyle: React.CSSProperties & Record<string, string | number> = {
    '--slide-accent-hue': resolvedTheme ? resolvedTheme.accentHue.toString() : '220',
    '--slide-font-sans': resolvedTheme ? resolvedTheme.fontSans : 'Montserrat',
    '--slide-font-header': resolvedTheme ? resolvedTheme.fontHeader : 'Raleway',
  };

  return (
    <PresentationContext.Provider value={cardContextValue}>
      <div
        id={`slide-card-${slideNo}`}
        style={containerStyle}
        className="w-full select-text py-2 text-foreground bg-transparent overflow-hidden flex flex-col gap-3"
      >
        {slideNo > 1 && meta.title && (
          <h3 className="text-lg font-bold text-primary tracking-tight select-none border-b border-border/20 pb-1 mt-4">
            {meta.title}
          </h3>
        )}
        <ClickStepsProvider currentClickOverride={999}>
          <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
        </ClickStepsProvider>
      </div>
    </PresentationContext.Provider>
  );
};

export const BlogOrchestrator: React.FC<BlogOrchestratorProps> = ({
  subject,
  lecture,
  session,
  viewMode,
  theme,
  visibleSlideNumbers,
  collapsedSections,
  setCollapsedSections,
  printRef,
}) => {
  const slides = visibleSlideNumbers;

  const sections = useMemo(() => {
    const groups: Record<string, number[]> = {};
    slides.forEach((num) => {
      const meta = getSlideMetadata(num, subject, lecture);
      const sec = meta.section;
      if (!groups[sec]) groups[sec] = [];
      groups[sec].push(num);
    });
    return groups;
  }, [slides, subject, lecture]);

  const toggleSection = (sectionName: string) => {
    setCollapsedSections((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const isTutorial = lecture.type === 'tutorial';
  const cleanCredits = (subject.creditHours || '').split(' ')[0] || '';
  const cleanSemester = (subject.yearSemester || '').replace(/\s*\/\s*/g, ' / ') || '';

  const { getLectureActiveRange } = useLectureStatus();
  const params = useParams<{ subjectId?: string; sessionId?: string; lectureId?: string }>();
  const [nowMs, setNowMs] = React.useState(Date.now());

  React.useEffect(() => {
    if (!isTutorial) return;
    const tick = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(tick);
  }, [isTutorial]);

  const tutorialTimingLocked = React.useMemo(() => {
    if (!isTutorial) return false;
    const range = getLectureActiveRange(
      params.subjectId || '',
      params.sessionId || '',
      params.lectureId || ''
    );
    if (!range) return false;
    const { activeFrom = 0, activeUntil = 0 } = range;
    if (activeUntil > 0 && nowMs > activeUntil) return true;
    if (activeFrom > 0 && nowMs < activeFrom) return true;
    return false;
  }, [isTutorial, params, getLectureActiveRange, nowMs]);

  return (
    <PresentationContext.Provider value={{
      theme,
      viewMode,
      activeSubStep: 0,
      isTutorial,
      tutorialLocked: tutorialTimingLocked,
    }}>
      <style>{`
        @media print {
          /* Only apply tutorial print overrides inside tutorial pages */
          #blog-orchestrator-root.tutorial-print-root { padding: 0 !important; }
          @page { size: A4 portrait; margin: 18mm 16mm; }
          #blog-orchestrator-root.tutorial-print-root * { box-shadow: none !important; }

          /* Hide interactive chrome */
          #blog-orchestrator-root.tutorial-print-root button,
          #blog-orchestrator-root.tutorial-print-root [role="button"],
          #blog-orchestrator-root.tutorial-print-root input,
          #blog-orchestrator-root.tutorial-print-root .section-collapse-button { display: none !important; }

          /* Force all sections visible even if collapsed */
          #blog-orchestrator-root.tutorial-print-root [data-collapsed="true"],
          #blog-orchestrator-root.tutorial-print-root .flex.flex-col.gap-4.w-full { display: flex !important; }

          /* Completely hide quiz cards, quiz placeholders, and cover/checkpoint slides */
          #blog-orchestrator-root.tutorial-print-root .quiz-print-excluded,
          #blog-orchestrator-root.tutorial-print-root .quiz-print-placeholder,
          #blog-orchestrator-root.tutorial-print-root .cover-print-excluded { display: none !important; }

          /* Force black text */
          #blog-orchestrator-root.tutorial-print-root h2,
          #blog-orchestrator-root.tutorial-print-root h3,
          #blog-orchestrator-root.tutorial-print-root p,
          #blog-orchestrator-root.tutorial-print-root span,
          #blog-orchestrator-root.tutorial-print-root div { color: #000 !important; }
          #blog-orchestrator-root.tutorial-print-root .bg-card,
          #blog-orchestrator-root.tutorial-print-root .bg-muted { background: #f9f9f9 !important; }

          /* ── PAGE BREAK CONTROL ──────────────────────────────────────────────── */

          /* Keep h3 slide titles glued to the content that follows them */
          #blog-orchestrator-root.tutorial-print-root h3 {
            break-after: avoid;
            page-break-after: avoid;
          }

          /* Keep h2 section titles with their first child */
          #blog-orchestrator-root.tutorial-print-root h2 {
            break-after: avoid;
            page-break-after: avoid;
          }

          /* SVG beam diagrams and drawings must never be clipped across pages */
          #blog-orchestrator-root.tutorial-print-root svg {
            break-inside: avoid;
            page-break-inside: avoid;
            overflow: visible !important;
            max-width: 100% !important;
          }

          /* Grid / two-column layouts must stay on one page if they fit */
          #blog-orchestrator-root.tutorial-print-root .grid,
          #blog-orchestrator-root.tutorial-print-root [class*="grid-cols"] {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Bordered content blocks (parameters box, formula box etc.) */
          #blog-orchestrator-root.tutorial-print-root [class*="rounded-xl"],
          #blog-orchestrator-root.tutorial-print-root [class*="rounded-2xl"] {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
      <div
        id="blog-orchestrator-root"
        ref={printRef}
        className={`mx-auto w-full max-w-3xl flex flex-col gap-6 pt-8 pb-16 px-6 md:px-8 animate-in fade-in duration-300${isTutorial ? ' tutorial-print-root' : ''}`}
      >
        {/* Render sessional header for tutorials */}
        {isTutorial && (
          <div className="border-b-2 border-foreground pb-4 mb-6 select-none bg-card p-5 rounded-2xl border border-border/60 shadow-xs">
            <div className="flex items-center gap-4">
              <img src={sustLogoUrl} alt="SUST Logo" className="h-16 w-16 object-contain shrink-0" />
              <div className="flex-1 text-center pr-16">
                <h2 className="text-sm font-extrabold uppercase tracking-wide leading-tight text-foreground">
                  Shahjalal University of Science and Technology, Sylhet
                </h2>
                <h3 className="text-[10px] font-bold uppercase tracking-wide leading-tight mt-0.5 text-muted-foreground">
                  Department of Civil and Environmental Engineering
                </h3>
                <h4 className="text-xs font-black mt-2 underline uppercase text-primary">
                  Tutorial-{lecture.lectureNumber}: SFD & BMD
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold mt-4 border-t border-border/40 pt-3 text-muted-foreground">
              <div className="flex flex-col gap-0.5 text-left">
                <div>{cleanSemester}</div>
                <div>Course Title: {subject.courseTitle}</div>
                <div>Credit: {cleanCredits}</div>
                <div className="mt-1 text-foreground font-bold">
                  Course Teacher: Md. Nazmul Islam Rafi
                </div>
              </div>
              <div className="flex flex-col gap-0.5 text-center justify-end font-bold text-foreground">
                <div>Time: {lecture.timeLimit || '45 minutes'}</div>
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <div>Session: {session?.session || session?.label || '2023-24'}</div>
                <div>Course No: {subject.courseCode}</div>
                <div>Full Marks: {lecture.fullMarks || '10'}</div>
              </div>
            </div>
          </div>
        )}

        {Object.entries(sections).map(([sectionName, slideNumbers]) => {
          const isCollapsed = !!collapsedSections[sectionName];
          const sectionSlug = sectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <div key={sectionName} className="flex flex-col gap-4">
              <button
                id={`section-${sectionSlug}`}
                onClick={() => toggleSection(sectionName)}
                className="flex items-center gap-2 text-left border-b pb-2 hover:text-primary transition-colors group/sec w-full cursor-pointer select-none"
              >
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground group-hover/sec:text-primary transition-transform duration-200 ${
                    isCollapsed ? '-rotate-90' : ''
                  }`}
                />
                <h2 className="text-base font-extrabold text-foreground group-hover/sec:text-primary">
                  {sectionName}
                </h2>
                <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full ml-1">
                  {slideNumbers.length} {slideNumbers.length === 1 ? 'slide' : 'slides'}
                </span>
              </button>

              {!isCollapsed && (
                <div className="flex flex-col gap-4 w-full">
                  {slideNumbers.map((num) => {
                    const slideMeta = getSlideMetadata(num, subject, lecture);
                    const isCoverSlide = slideMeta?.type === 'Title Card';
                    const isCheckpointSlide = slideMeta?.type === 'Dynamic Quiz';
                    const hideInPrint = isCoverSlide || isCheckpointSlide;
                    return (
                      <div
                        key={num}
                        className={hideInPrint ? 'cover-print-excluded' : ''}
                      >
                        <BlogSlideCard
                          slideNo={num}
                          subject={subject}
                          lecture={lecture}
                          session={session}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PresentationContext.Provider>
  );
};

export default BlogOrchestrator;
