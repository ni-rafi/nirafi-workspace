import React from 'react';
import useSlideViewerOrchestrator from '../../hooks/useSlideViewerOrchestrator';
import ScrollModeView from './ScrollModeView';
import PresentationModeView from './PresentationModeView';

/**
 * SlideViewer manages the slide deck viewing lifecycle,
 * orchestrating the transition between scrollable 2D grid mode and presentation mode.
 */
export const SlideViewer: React.FC = () => {
  const orchestrator = useSlideViewerOrchestrator();

  if (orchestrator.notFound) {
    return <div className="flex h-64 items-center justify-center text-sm text-destructive">Lecture deck not found.</div>;
  }

  if (orchestrator.viewMode === 'scroll') {
    return <ScrollModeView orchestrator={orchestrator} />;
  }

  return <PresentationModeView orchestrator={orchestrator} />;
};

export default SlideViewer;
