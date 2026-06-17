import { useCallback } from 'react';
import { useClickStepsContext } from '../context/ClickStepsContext';

/**
 * Controller hook managing presentation click increments and slide transitions.
 * 
 * @param onPrevSlide - Callback to transition to the previous slide.
 * @param onNextSlide - Callback to transition to the next slide.
 */
export const useClickSteps = (
  onPrevSlide: () => void,
  onNextSlide: () => void
) => {
  const { currentClick, totalClicks, setClick } = useClickStepsContext();

  const handleNext = useCallback(() => {
    if (currentClick < totalClicks) {
      setClick(currentClick + 1);
      return false; // Click consumed, slide did not change
    } else {
      onNextSlide();
      return true; // Slide changed
    }
  }, [currentClick, totalClicks, setClick, onNextSlide]);

  const handlePrev = useCallback(() => {
    if (currentClick > 0) {
      setClick(currentClick - 1);
      return false; // Click consumed, slide did not change
    } else {
      onPrevSlide();
      return true; // Slide changed
    }
  }, [currentClick, setClick, onPrevSlide]);

  return {
    currentClick,
    totalClicks,
    handleNext,
    handlePrev,
    setClick,
  };
};

export default useClickSteps;
