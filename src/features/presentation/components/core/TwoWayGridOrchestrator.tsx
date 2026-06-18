import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import type { Subject, Lecture, Session } from '@/config/lectures';
import SlideRenderer, { getSlideMetadata } from '../slides/SlideRenderer';
import { ClickStepsProvider, useClickStepsContext } from '../../context/ClickStepsContext';
import { PresentationContext, ViewMode, Theme } from '../../context/PresentationContext';
import { useSlideTheme } from '../../context/SlideThemeContext';

const ClickTrackerInner: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onCountResolved: (count: number) => void;
}> = ({ slideNo, subject, lecture, session, onCountResolved }) => {
  const { totalClicks } = useClickStepsContext();
  useEffect(() => {
    onCountResolved(totalClicks);
  }, [totalClicks, onCountResolved]);
  return (
    <div className="hidden" aria-hidden="true">
      <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
    </div>
  );
};

const ClickTracker: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onCountResolved: (count: number) => void;
}> = ({ slideNo, subject, lecture, session, onCountResolved }) => {
  return (
    <ClickStepsProvider currentClickOverride={0}>
      <ClickTrackerInner
        slideNo={slideNo}
        subject={subject}
        lecture={lecture}
        session={session}
        onCountResolved={onCountResolved}
      />
    </ClickStepsProvider>
  );
};

interface TwoWayGridOrchestratorProps {
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  viewMode: ViewMode;
  theme: Theme;
  totalSlides: number;
  onSelectSlide: (num: number) => void;
  currentSlide?: number;
  collapsedSections: Record<string, boolean>;
  setCollapsedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const SlideCard: React.FC<{
  slideNo: number;
  subject: Subject;
  lecture: Lecture;
  session?: Session;
  onSelect: () => void;
}> = ({ slideNo, subject, lecture, session, onSelect }) => {
  const meta = getSlideMetadata(slideNo, subject, lecture);
  const [localTotalClicks, setLocalTotalClicks] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [localClick, setLocalClick] = useState(0);

  let resolvedTheme: any = null;
  try {
    resolvedTheme = useSlideTheme().resolvedTheme;
  } catch (e) {
    // Context fallback
  }

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  let customBackgroundValue: string | undefined = undefined;

  if (resolvedTheme) {
    if (resolvedTheme.bgType === 'gradient') {
      customBackgroundValue = isDark
        ? `linear-gradient(135deg, oklch(0.18 0.04 ${resolvedTheme.accentHue}) 0%, oklch(0.12 0.02 ${resolvedTheme.accentHue}) 100%)`
        : `linear-gradient(135deg, oklch(0.95 0.05 ${resolvedTheme.accentHue}) 0%, oklch(0.99 0.01 ${resolvedTheme.accentHue}) 100%)`;
    } else if (resolvedTheme.bgType === 'custom' && resolvedTheme.customBgValue) {
      customBackgroundValue = resolvedTheme.customBgValue;
    }
  }

  const containerStyle: React.CSSProperties & Record<string, string | number> = {
    '--slide-accent-hue': resolvedTheme ? resolvedTheme.accentHue.toString() : '220',
    '--slide-radius': resolvedTheme ? `${resolvedTheme.borderRadius}px` : '0px',
    '--slide-font-sans': resolvedTheme ? resolvedTheme.fontSans : 'Montserrat',
    '--slide-font-header': resolvedTheme ? resolvedTheme.fontHeader : 'Raleway',
    '--slide-bg-type': resolvedTheme ? resolvedTheme.bgType : 'solid',
    '--slide-custom-bg': resolvedTheme ? resolvedTheme.customBgValue : '',
    '--slide-border-side': resolvedTheme ? resolvedTheme.borderSide : 'left',
    '--slide-header-size': resolvedTheme ? `${resolvedTheme.headerFontSize}px` : '30px',
  };

  if (customBackgroundValue) {
    containerStyle.background = customBackgroundValue;
    containerStyle['--background'] = customBackgroundValue;
  }

  return (
    <div className="relative group w-full bg-card rounded-2xl border border-border shadow-xs hover:shadow-md transition-shadow duration-300 animate-in fade-in duration-300">
      <ClickTracker
        slideNo={slideNo}
        subject={subject}
        lecture={lecture}
        session={session}
        onCountResolved={setLocalTotalClicks}
      />

      <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-6 py-3.5 rounded-t-2xl select-none">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-wider">Slide {slideNo} • {meta.type}</span>
          <h4 className="text-sm font-bold text-foreground leading-tight">{meta.title}</h4>
        </div>
        
        <div className="flex items-center gap-2">
          {!isSimulating && localTotalClicks > 0 && (
            <button
              onClick={() => {
                setIsSimulating(true);
                setLocalClick(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors cursor-pointer"
              title="Play step-by-step simulation"
            >
              <Play className="h-3.5 w-3.5 fill-primary" />
              <span>Play Steps</span>
            </button>
          )}

          <button
            onClick={onSelect}
            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Present from this slide"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
      
      <div 
        style={containerStyle}
        className="p-6 md:p-8 select-text w-full bg-background text-foreground rounded-b-2xl overflow-hidden flex flex-col justify-between"
        data-slide-canvas
      >
        <ClickStepsProvider currentClickOverride={isSimulating ? localClick : 999}>
          <SlideRenderer slideNo={slideNo} subject={subject} lecture={lecture} session={session} />
        </ClickStepsProvider>

        {isSimulating && (
          <div className="flex items-center justify-between border-t border-border/40 mt-4 pt-3 text-xs bg-muted/5 px-4 py-2 rounded-xl border select-none">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { if (localClick > 0) setLocalClick(prev => prev - 1); }}
                disabled={localClick === 0}
                className="px-2.5 py-1 bg-background hover:bg-muted border border-border/50 rounded-md disabled:opacity-40 cursor-pointer font-bold transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => { if (localClick < localTotalClicks) setLocalClick(prev => prev + 1); }}
                disabled={localClick === localTotalClicks}
                className="px-2.5 py-1 bg-background hover:bg-muted border border-border/50 rounded-md disabled:opacity-40 cursor-pointer font-bold transition-colors"
              >
                Next
              </button>
            </div>
            <span className="font-mono text-muted-foreground font-semibold">
              Step {localClick} of {localTotalClicks}
            </span>
            <button
              onClick={() => { setIsSimulating(false); setLocalClick(0); }}
              className="px-2.5 py-1 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 rounded-md cursor-pointer font-bold transition-colors"
            >
              Exit Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const TwoWayGridOrchestrator: React.FC<TwoWayGridOrchestratorProps> = ({
  subject,
  lecture,
  session,
  viewMode,
  theme,
  totalSlides,
  onSelectSlide,
  collapsedSections,
  setCollapsedSections,
}) => {
  const slides = useMemo(() => Array.from({ length: totalSlides }, (_, i) => i + 1), [totalSlides]);

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

  if (viewMode === 'scroll') {
    return (
      <PresentationContext.Provider value={{ theme, viewMode, activeSubStep: 0 }}>
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-8 pb-12 p-8 animate-in fade-in duration-300">
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
                  <span className="text-sm font-bold text-foreground group-hover/sec:text-primary">
                    {sectionName}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                    {slideNumbers.length} {slideNumbers.length === 1 ? 'slide' : 'slides'}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="flex flex-col gap-8 items-center w-full">
                    {slideNumbers.map((num) => (
                      <div key={num} id={`slide-card-${num}`} className="w-full max-w-3xl">
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

  return null;
};

export default TwoWayGridOrchestrator;
