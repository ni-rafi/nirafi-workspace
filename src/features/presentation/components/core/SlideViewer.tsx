import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUBJECTS } from '@/config/lectures';
import { SPEAKER_NOTES } from '../../config/speakerNotes';
import SlideContainer from './SlideContainer';
import GlobalTop from '../layers/GlobalTop';
import GlobalBottom from '../layers/GlobalBottom';
import NavControls from '../layers/NavControls';
import PageMetadata from './PageMetadata';
import { useClickSteps } from '../../hooks/useClickSteps';
import DrawingBoard from '../layers/DrawingBoard';
import SlideRenderer, { getSlideMetadata, getLectureSlideCount } from '../slides/SlideRenderer';
import { usePresenterFeatures } from '../../hooks/usePresenterFeatures';
import PresenterLayout from '../layers/PresenterLayout';
import PresentationOverlays from '../layers/PresentationOverlays';
import { useSlideViewerState } from '../../hooks/useSlideViewerState';
import { PresentationContext, ViewMode } from '../../context/PresentationContext';
import TwoWayGridOrchestrator from './TwoWayGridOrchestrator';

/**
 * SlideViewer manages the slide deck viewing lifecycle,
 * orchestrating the transition between scrollable 2D grid mode and presentation mode.
 */
export const SlideViewer: React.FC = () => {
  const { subjectId, sessionId, lectureId, slideNo } = useParams<Record<string, string>>();
  const navigate = useNavigate();
  const currentSlideInt = slideNo ? parseInt(slideNo, 10) : 1;

  const activeSub = SUBJECTS.find((sub) => sub.id === subjectId);
  const activeSession = activeSub?.sessions.find((sess) => sess.id === sessionId);
  const activeLec = activeSession?.lectures.find((lec) => lec.id === lectureId);

  // Dynamic total slides count derived from active lecture deck configuration
  const totalSlidesCount = activeLec ? getLectureSlideCount(activeLec.id) : 10;

  const {
    outerRef, isFullscreen, isPenActive, setIsPenActive, penColor, setPenColor,
    penWidth, setPenWidth, isEraser, setIsEraser, clearTrigger, setClearTrigger,
    isCameraOpen, setIsCameraOpen, isTimerOpen, setIsTimerOpen, isRecording,
    setIsRecording, isPresenterView, elapsed, setElapsed, timerRunning,
    setTimerRunning, isProjectionView, handleToggleFullscreen, handleTogglePresenter,
  } = useSlideViewerState({ subjectId, sessionId, lectureId, currentSlideInt });

  const {
    settings, contextMenu, setContextMenu,
    isSettingsOpen, setIsSettingsOpen, isLaserActive, setIsLaserActive, isDark,
    handleToggleDark, handleSettingsChange, handleContextMenu, filterStyle,
  } = usePresenterFeatures({ subjectId, sessionId, lectureId, currentSlideInt });

  // SlideViewer local presentation override state
  const [localPresent, setLocalPresent] = useState(false);

  // Group slide numbers by section
  const sections = useMemo(() => {
    const groups: Record<string, number[]> = {};
    if (!activeSub || !activeLec) return groups;
    for (let i = 1; i <= totalSlidesCount; i++) {
      const meta = getSlideMetadata(i, activeSub, activeLec);
      const sec = meta.section;
      if (!groups[sec]) groups[sec] = [];
      groups[sec].push(i);
    }
    return groups;
  }, [totalSlidesCount, activeSub, activeLec]);

  const handleNextSection = () => {
    if (!activeSub || !activeLec) return;
    const currentMeta = getSlideMetadata(currentSlideInt, activeSub, activeLec);
    const sectionNames = Object.keys(sections);
    const currentSecIndex = sectionNames.indexOf(currentMeta.section);
    if (currentSecIndex !== -1 && currentSecIndex < sectionNames.length - 1) {
      const nextSectionName = sectionNames[currentSecIndex + 1];
      if (nextSectionName) {
        const nextSectionSlides = sections[nextSectionName];
        if (nextSectionSlides && nextSectionSlides.length > 0) {
          navigate(`/${subjectId}/${sessionId}/${lectureId}/${nextSectionSlides[0]}`);
        }
      }
    }
  };

  const handlePrevSection = () => {
    if (!activeSub || !activeLec) return;
    const currentMeta = getSlideMetadata(currentSlideInt, activeSub, activeLec);
    const sectionNames = Object.keys(sections);
    const currentSecIndex = sectionNames.indexOf(currentMeta.section);
    if (currentSecIndex > 0) {
      const prevSectionName = sectionNames[currentSecIndex - 1];
      if (prevSectionName) {
        const prevSectionSlides = sections[prevSectionName];
        if (prevSectionSlides && prevSectionSlides.length > 0) {
          navigate(`/${subjectId}/${sessionId}/${lectureId}/${prevSectionSlides[0]}`);
        }
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideInt > 1) {
      navigate(`/${subjectId}/${sessionId}/${lectureId}/${currentSlideInt - 1}`, { state: { clicks: 'max' } });
    }
  };

  const handleNextSlide = () => {
    if (currentSlideInt < totalSlidesCount) {
      navigate(`/${subjectId}/${sessionId}/${lectureId}/${currentSlideInt + 1}`);
    }
  };

  const { handlePrev, handleNext, currentClick, totalClicks } = useClickSteps(handlePrevSlide, handleNextSlide);

  // Determine active viewMode and theme based on presentation states
  const isPresenting = isPresenterView || isProjectionView || isFullscreen || localPresent;
  const viewMode: ViewMode = isPresenting ? 'present' : 'scroll';
  const activeTheme = isProjectionView ? 'projection' : (isDark ? 'dark' : 'light');

  // Handle Escape key to exit presentation mode back to scrollable view
  useEffect(() => {
    if (viewMode !== 'present') return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLocalPresent(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [viewMode]);

  if (!activeSub || !activeLec) {
    return <div className="flex h-64 items-center justify-center text-sm text-destructive">Lecture deck not found.</div>;
  }

  const isCoverPage = currentSlideInt === 1;
  const currentNotes = SPEAKER_NOTES[currentSlideInt] || 'No presenter notes defined for this slide.';

  if (viewMode === 'scroll') {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background">
        <PageMetadata title={activeLec.title} subjectCode={activeSub.code} slideNo={currentSlideInt} />
        
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
              onClick={handleToggleDark}
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              size="sm"
              onClick={() => {
                setLocalPresent(true);
                navigate(`/${subjectId}/${sessionId}/${lectureId}/1`);
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
              setLocalPresent(true);
              navigate(`/${subjectId}/${sessionId}/${lectureId}/${num}`);
            }}
            currentSlide={currentSlideInt}
          />
        </main>
      </div>
    );
  }

  const mainSlideContent = (
    <PresentationContext.Provider value={{ theme: activeTheme, viewMode, activeSubStep: currentClick }}>
      <div className="flex-1 w-full h-full relative" style={{ filter: filterStyle || undefined }}>
        <SlideContainer zoom={isPresenterView ? 0.95 : 1} scaleMode={settings.scale}>
          <GlobalTop subjectName={activeSub.title} subjectCode={activeSub.code} lectureTitle={activeLec.title} hide={isCoverPage} />
          <div className="flex-1 flex flex-col justify-center items-center px-12 py-10 text-center select-text">
            <SlideRenderer slideNo={currentSlideInt} subject={activeSub} lecture={activeLec} session={activeSession} />
          </div>
          <DrawingBoard
            isActive={isPenActive && !isProjectionView} color={penColor} brushWidth={penWidth} isEraser={isEraser}
            lectureId={lectureId || 'mock'} slideNo={currentSlideInt} clearTrigger={clearTrigger}
          />
          <GlobalBottom current={currentSlideInt} total={totalSlidesCount} hide={isCoverPage} />
        </SlideContainer>
      </div>
    </PresentationContext.Provider>
  );

  return (
    <div
      ref={outerRef}
      onContextMenu={isProjectionView ? undefined : handleContextMenu}
      className="relative flex h-screen w-full flex-col items-center justify-center bg-background"
      data-slide-viewer
    >
      <PageMetadata title={activeLec.title} subjectCode={activeSub.code} slideNo={currentSlideInt} />

      {isPresenterView && !isProjectionView ? (
        <PresenterLayout
          currentSlide={currentSlideInt}
          totalSlides={totalSlidesCount}
          elapsed={elapsed}
          timerRunning={timerRunning}
          onToggleTimer={() => setTimerRunning(!timerRunning)}
          onResetTimer={() => setElapsed(0)}
          currentNotes={currentNotes}
          activeSub={activeSub}
          activeLec={activeLec}
          activeSession={activeSession}
          currentClick={currentClick}
          totalClicks={totalClicks}
        >
          {mainSlideContent}
        </PresenterLayout>
      ) : (
        <div className="flex-1 w-full h-full relative">{mainSlideContent}</div>
      )}

      {!isProjectionView && (
        <NavControls
          current={currentSlideInt} total={totalSlidesCount} onPrev={handlePrev} onNext={handleNext}
          isFullscreen={isFullscreen} onToggleFullscreen={handleToggleFullscreen}
          isCameraOpen={isCameraOpen} onToggleCamera={() => setIsCameraOpen(!isCameraOpen)}
          isTimerOpen={isTimerOpen} onToggleTimer={() => setIsTimerOpen(!isTimerOpen)}
          isRecording={isRecording} onToggleRecording={() => setIsRecording(!isRecording)}
          isOverviewOpen={false} onToggleOverview={() => setLocalPresent(false)}
          isSettingsOpen={isSettingsOpen} onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          isDark={isDark} onToggleDark={handleToggleDark} isPresenterView={isPresenterView} onTogglePresenter={handleTogglePresenter}
          isPenActive={isPenActive} onPenActiveChange={setIsPenActive} penColor={penColor} onPenColorChange={setPenColor}
          penWidth={penWidth} onPenWidthChange={setPenWidth} isEraser={isEraser} onEraserChange={setIsEraser}
          onClearDrawing={() => setClearTrigger((c) => c + 1)}
          onNextSection={handleNextSection}
          onPrevSection={handlePrevSection}
        />
      )}

      <PresentationOverlays
        isProjectionView={isProjectionView}
        isCameraOpen={isCameraOpen}
        isTimerOpen={isTimerOpen}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        lectureId={lectureId || 'mock'}
        durationMins={activeLec.durationMins}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        currentSlide={currentSlideInt}
        totalSlides={totalSlidesCount}
        onPrev={handlePrev}
        onNext={handleNext}
        isDark={isDark}
        onToggleDark={handleToggleDark}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isLaserActive={isLaserActive}
        onToggleLaser={() => setIsLaserActive(!isLaserActive)}
        isPenActive={isPenActive}
        onTogglePen={() => setIsPenActive(!isPenActive)}
        isEraser={isEraser}
        onToggleEraser={() => setIsEraser(!isEraser)}
        isOverviewOpen={false}
        onToggleOverview={() => setLocalPresent(false)}
        isPresenterView={isPresenterView}
        onTogglePresenter={handleTogglePresenter}
        isSettingsOpen={isSettingsOpen}
        onCloseSettings={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onSelectSlide={(num) => {
          navigate(`/${subjectId}/${sessionId}/${lectureId}/${num}`);
          setLocalPresent(true);
        }}
        activeSub={activeSub}
        activeLec={activeLec}
        activeSession={activeSession}
      />
    </div>
  );
};

export default SlideViewer;

