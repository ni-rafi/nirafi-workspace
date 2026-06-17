import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ChevronDown } from 'lucide-react';
import type { Subject, Lecture, Session } from '@/config/lectures';
import SlideContainer from './SlideContainer';
import SlideRenderer, { getSlideMetadata } from '../slides/SlideRenderer';
import { ClickStepsProvider, useClickStepsContext } from '../../context/ClickStepsContext';
import { PresentationContext, ViewMode, Theme } from '../../context/PresentationContext';

interface TwoWayGridOrchestratorProps {
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  viewMode: ViewMode;
  theme: Theme;
  totalSlides: number;
  onSelectSlide: (num: number) => void;
  currentSlide?: number;
}

/**
 * SlideCardInner consumes ClickStepsContext to handle local animation stepping in play mode.
 */
const SlideCardInner: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  isPlayMode: boolean;
  setIsPlayMode: (val: boolean) => void;
  localStep: number;
  setLocalStep: React.Dispatch<React.SetStateAction<number>>;
  onSelect: () => void;
}> = ({
  slideNo,
  subject,
  lecture,
  session,
  isPlayMode,
  setIsPlayMode,
  localStep,
  setLocalStep,
  onSelect,
}) => {
  const { totalClicks } = useClickStepsContext();
  const meta = getSlideMetadata(slideNo, subject, lecture);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localStep < totalClicks) {
      setLocalStep((prev) => prev + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localStep > 0) {
      setLocalStep((prev) => prev - 1);
    }
  };

  const startPlayMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayMode(true);
    setLocalStep(0);
  };

  const stopPlayMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayMode(false);
  };

  return (
    <div
      onClick={onSelect}
      className="group flex flex-col gap-2 rounded-xl border border-border/80 bg-card p-4 transition-all duration-300 hover:border-primary/80 hover:shadow-lg cursor-pointer w-full select-none"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center rounded-lg bg-background border border-border/50 overflow-hidden">
        <SlideContainer scaleMode="fit" isThumbnail={true}>
          <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
        </SlideContainer>

        {/* Local Play Controls Overlay */}
        {isPlayMode ? (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-between p-4 z-20 pointer-events-auto">
            <button
              onClick={handlePrev}
              disabled={localStep === 0}
              className="p-1 rounded bg-background/80 hover:bg-background text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-white font-mono bg-black/75 px-2 py-0.5 rounded">
              Step {localStep} / {totalClicks}
            </span>
            <button
              onClick={handleNext}
              disabled={localStep === totalClicks}
              className="p-1 rounded bg-background/80 hover:bg-background text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={stopPlayMode}
              className="absolute top-2 right-2 p-1 rounded bg-red-500/80 hover:bg-red-500 text-white cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          totalClicks > 0 && (
            <button
              onClick={startPlayMode}
              className="absolute bottom-2 left-2 z-20 p-1.5 rounded-lg bg-primary/95 hover:bg-primary text-white shadow-md flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors pointer-events-auto cursor-pointer"
            >
              <Play className="h-3 w-3 fill-white" />
              Play
            </button>
          )
        )}

        <span className="absolute bottom-2 right-2 z-10 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
          Slide {slideNo}
        </span>
      </div>

      <div className="flex flex-col text-left">
        <span className="truncate text-xs font-bold text-foreground group-hover:text-primary transition-colors">
          {meta.title}
        </span>
        <span className="text-[10px] text-muted-foreground">{meta.type}</span>
      </div>
    </div>
  );
};

/**
 * SlideCard wraps the SlideCardInner with ClickStepsProvider to track step reveal counts.
 */
const SlideCard: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onSelect: () => void;
}> = ({ slideNo, subject, lecture, session, onSelect }) => {
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [localStep, setLocalStep] = useState(0);

  return (
    <ClickStepsProvider currentClickOverride={isPlayMode ? localStep : 999}>
      <SlideCardInner
        slideNo={slideNo}
        subject={subject}
        lecture={lecture}
        session={session}
        isPlayMode={isPlayMode}
        setIsPlayMode={setIsPlayMode}
        localStep={localStep}
        setLocalStep={setLocalStep}
        onSelect={onSelect}
      />
    </ClickStepsProvider>
  );
};

/**
 * TwoWayGridOrchestrator manages Scrollable snapping layout vs Presenter canvas mode layout.
 */
export const TwoWayGridOrchestrator: React.FC<TwoWayGridOrchestratorProps> = ({
  subject,
  lecture,
  session,
  viewMode,
  theme,
  totalSlides,
  onSelectSlide,
}) => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const slides = useMemo(() => Array.from({ length: totalSlides }, (_, i) => i + 1), [totalSlides]);

  // Group slide numbers by section
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

  // 1. Scrollable Mode: Vertical sections list + Horizontal snap-scrolling tracks
  if (viewMode === 'scroll') {
    return (
      <PresentationContext.Provider value={{ theme, viewMode, activeSubStep: 0 }}>
        <div className="mx-auto w-full max-w-6xl flex flex-col gap-8 pb-12 p-8">
          {Object.entries(sections).map(([sectionName, slideNumbers]) => {
            const isCollapsed = !!collapsedSections[sectionName];
            return (
              <div key={sectionName} className="flex flex-col gap-4">
                <button
                  onClick={() => toggleSection(sectionName)}
                  className="flex items-center gap-2 text-left border-b pb-2 hover:text-primary transition-colors group/sec w-full cursor-pointer"
                >
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground group-hover/sec:text-primary transition-transform duration-200 ${
                      isCollapsed ? '-rotate-90' : ''
                    }`}
                  />
                  <span className="text-sm font-bold text-foreground group-hover/sec:text-primary">
                    {sectionName}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                    {slideNumbers.length} {slideNumbers.length === 1 ? 'slide' : 'slides'}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="flex overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-thin">
                    {slideNumbers.map((num) => (
                      <div key={num} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] snap-start flex-shrink-0">
                        <SlideCard
                          slideNo={num}
                          subject={subject}
                          lecture={lecture}
                          session={session}
                          onSelect={() => onSelectSlide(num)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PresentationContext.Provider>
    );
  }

  // 2. Presentation Mode (Slide-Viewer presentation state handled by parent canvas)
  return null;
};

export default TwoWayGridOrchestrator;
