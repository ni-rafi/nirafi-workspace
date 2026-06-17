import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMetadata from './PageMetadata';
import TwoWayGridOrchestrator from './TwoWayGridOrchestrator';
import { useSlideViewerOrchestrator } from '../../hooks/useSlideViewerOrchestrator';

interface ScrollModeViewProps {
  orchestrator: ReturnType<typeof useSlideViewerOrchestrator>;
}

export const ScrollModeView: React.FC<ScrollModeViewProps> = ({ orchestrator }) => {
  const navigate = useNavigate();

  const {
    activeSub,
    activeSession,
    activeLec,
    totalSlidesCount,
    activeSlide,
    activeTheme,
    subjectId,
    sessionId,
    lectureId,
    presenterFeatures,
    navigateWithTransition,
  } = orchestrator;

  if (!activeSub || !activeLec) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background animate-in fade-in duration-300">
      <PageMetadata title={activeLec.title} subjectCode={activeSub.code} slideNo={activeSlide} />
      
      {/* Sticky blurred header panel */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Portal</span>
          </Button>
          <div className="h-4 w-px bg-border" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-foreground">
              {activeLec.title}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {activeSub.code} • {activeSub.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={presenterFeatures.handleToggleDark}
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
          >
            {presenterFeatures.isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            size="sm"
            onClick={() => {
              navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/1`);
            }}
            className="flex items-center gap-1.5 font-semibold shadow-xs"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Presentation</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        <TwoWayGridOrchestrator
          subject={activeSub}
          lecture={activeLec}
          session={activeSession}
          viewMode="scroll"
          theme={activeTheme}
          totalSlides={totalSlidesCount}
          onSelectSlide={(num) => {
            navigateWithTransition(`/${subjectId}/${sessionId}/${lectureId}/${num}`);
          }}
          currentSlide={activeSlide}
        />
      </main>
    </div>
  );
};

export default ScrollModeView;
