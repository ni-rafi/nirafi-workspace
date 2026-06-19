import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface ClickStepsContextType {
  currentClick: number;
  totalClicks: number;
  registerClick: (id: string, at: number | string) => number;
  deregisterClick: (id: string) => void;
  setClick: (step: number) => void;
  resetClicks: () => void;
}

export const ClickStepsContext = createContext<ClickStepsContextType | null>(null);

/**
 * Hook to consume active click counts and register click-reveal offsets.
 * Outside a ClickStepsProvider (scroll/blog/thumbnails), all elements are
 * fully revealed by default (currentClick: 999).
 */
export const useClickStepsContext = (): ClickStepsContextType => {
  const context = useContext(ClickStepsContext);
  if (!context) {
    return {
      currentClick: 999,
      totalClicks: 0,
      registerClick: () => 0,
      deregisterClick: () => {},
      setClick: () => {},
      resetClicks: () => {},
    };
  }
  return context;
};

interface ClickStepsProviderProps {
  children: React.ReactNode;
  /**
   * Override the reactive currentClick with a fixed value (used in preview
   * contexts like OverviewModal thumbnails or PresenterLayout next-slide panel).
   */
  currentClickOverride?: number;
  /**
   * Seed the starting click step when this provider first mounts.
   * - 0   → forward navigation: new slide starts at step 0 (default)
   * - 999 → backward navigation: all steps revealed immediately, then
   *          normalises to totalClicks once elements have registered
   *
   * Because ClickStepsProvider is mounted with key={activeSlide} inside
   * PresentationModeView, it remounts fresh on every slide change, so
   * initialClick reliably controls the starting state.
   */
  initialClick?: number;
}

/**
 * ClickStepsProvider maintains a reactive registry of all click-reveal elements
 * on the current slide, calculating totalClicks and exposing currentClick.
 *
 * It must be mounted with key={activeSlide} to remount fresh on each slide
 * change — this is the mechanism that resets state between slides cleanly.
 */
export const ClickStepsProvider: React.FC<ClickStepsProviderProps> = ({
  children,
  currentClickOverride,
  initialClick = 0,
}) => {
  const [currentClickState, setCurrentClick] = useState(initialClick);
  const currentClick = currentClickOverride !== undefined ? currentClickOverride : currentClickState;
  const [totalClicks, setTotalClicks] = useState(0);

  const registryRef = useRef<Record<string, number>>({});
  const nextRelativeRef = useRef(1);

  const registerClick = useCallback((id: string, at: number | string): number => {
    if (registryRef.current[id] !== undefined) {
      return registryRef.current[id];
    }

    let absoluteStep = 0;
    if (typeof at === 'string' && at.startsWith('+')) {
      absoluteStep = nextRelativeRef.current;
      nextRelativeRef.current += parseInt(at.slice(1), 10) || 1;
    } else if (typeof at === 'string' && at.startsWith('-')) {
      absoluteStep = Math.max(0, nextRelativeRef.current - (parseInt(at.slice(1), 10) || 1));
    } else {
      absoluteStep = typeof at === 'number' ? at : parseInt(at, 10) || 1;
    }

    registryRef.current[id] = absoluteStep;
    const maxStep = Math.max(...Object.values(registryRef.current));
    setTotalClicks(maxStep);

    // For backward entry (initialClick=999), normalise to the real last step
    // each time a new element registers (keeps currentClick === totalClicks).
    setCurrentClick((prev) => {
      if (currentClickOverride !== undefined) return prev; // respect override
      return prev >= 999 ? maxStep : prev;               // normalise backward entry
    });

    return absoluteStep;
  }, [currentClickOverride]);

  const deregisterClick = useCallback((id: string) => {
    if (registryRef.current[id] === undefined) return;
    delete registryRef.current[id];
    const steps = Object.values(registryRef.current);
    const maxStep = steps.length > 0 ? Math.max(...steps) : 0;
    setTotalClicks(maxStep);
    if (steps.length === 0) nextRelativeRef.current = 1;
  }, []);

  const setClick = useCallback((step: number) => {
    setCurrentClick(Math.max(0, step));
  }, []);

  const resetClicks = useCallback(() => {
    registryRef.current = {};
    nextRelativeRef.current = 1;
    setCurrentClick(0);
    setTotalClicks(0);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      currentClick,
      totalClicks,
      registerClick,
      deregisterClick,
      setClick,
      resetClicks,
    }),
    [currentClick, totalClicks, registerClick, deregisterClick, setClick, resetClicks]
  );

  return <ClickStepsContext.Provider value={contextValue}>{children}</ClickStepsContext.Provider>;
};
