import { useCallback } from 'react';
import { useClickStepsContext } from '../context/ClickStepsContext';

/**
 * Controller hook managing presentation click increments and slide transitions.
 * Direction signalling (forward/backward) is handled centrally by changeSlideWithTransition
 * in useSlideViewerOrchestrator — this hook just increments/decrements the step counter
 * and delegates slide changes when the boundary is reached.
 *
 * @param onPrevSlide - Callback to transition to the previous slide.
 * @param onNextSlide - Callback to transition to the next slide.
 */
export const useClickSteps = (
  onPrevSlide: () => void,
  onNextSlide: () => void,
) => {
  const { currentClick, totalClicks, setClick } = useClickStepsContext();

  const handleNext = useCallback(() => {
    if (currentClick < totalClicks) {
      setClick(currentClick + 1);
      return false; // Click consumed, slide did not change
    } else {
      onNextSlide();
      return true;  // Slide changed
    }
  }, [currentClick, totalClicks, setClick, onNextSlide]);

  const handlePrev = useCallback(() => {
    // Guard: currentClick must be within [1, totalClicks] to step back within the slide.
    // When currentClick > totalClicks (e.g. 999 on a no-step slide entered backward),
    // treat as "already at start" and navigate to the previous slide.
    if (currentClick > 0 && currentClick <= totalClicks) {
      setClick(currentClick - 1);
      return false; // Click consumed, slide did not change
    } else {
      onPrevSlide();
      return true;  // Slide changed
    }
  }, [currentClick, totalClicks, setClick, onPrevSlide]);

  return {
    currentClick,
    totalClicks,
    handleNext,
    handlePrev,
    setClick,
  };
};

export default useClickSteps;
