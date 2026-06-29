import React from 'react';
import PageMetadata from './PageMetadata';
import { ClickStepsProvider } from '../../context/ClickStepsContext';
import { PresentationModeContent } from './PresentationModeContent';
import { useSlideViewerOrchestrator } from '../../hooks/useSlideViewerOrchestrator';

interface PresentationModeViewProps {
  orchestrator: ReturnType<typeof useSlideViewerOrchestrator>;
}

/**
 * PresentationModeInner keeps the outer container element stable (meaning it does not
 * unmount during slide change) while recreating the per-slide ClickStepsProvider context.
 */
const PresentationModeInner: React.FC<PresentationModeViewProps> = ({ orchestrator }) => {
  const [isThemePlaygroundOpen, setIsThemePlaygroundOpen] = React.useState(false);
  const { activeSlide, slideDirectionRef, viewerState, activeSub, activeLec } = orchestrator;
  const slideContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Focus the window so keyboard shortcuts and USB clicker events are captured
  React.useEffect(() => {
    window.focus();
  }, []);

  const content = (
    <ClickStepsProvider
      slideNo={activeSlide}
      initialClick={slideDirectionRef.current === 'backward' ? 999 : 0}
    >
      <PresentationModeContent
        orchestrator={orchestrator}
        isThemePlaygroundOpen={isThemePlaygroundOpen}
        setIsThemePlaygroundOpen={setIsThemePlaygroundOpen}
        slideContainerRef={slideContainerRef}
      />
    </ClickStepsProvider>
  );

  return (
    <div
      ref={viewerState.outerRef}
      onContextMenu={viewerState.isProjectionView ? undefined : orchestrator.presenterFeatures.handleContextMenu}
      className="relative flex h-screen w-screen flex-row overflow-hidden bg-background"
      data-slide-viewer
    >
      {activeSub && activeLec && (
        <PageMetadata title={activeLec.title} subjectCode={activeSub.courseCode} slideNo={activeSlide} />
      )}
      {content}
    </div>
  );
};

/**
 * Main wrapper view for presentation mode slides.
 */
export const PresentationModeView: React.FC<PresentationModeViewProps> = ({ orchestrator }) => {
  return <PresentationModeInner orchestrator={orchestrator} />;
};

export default PresentationModeView;
