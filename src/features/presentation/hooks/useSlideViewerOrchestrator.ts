import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useParams, useNavigate, NavigateOptions, useLocation } from 'react-router-dom';
import { SUBJECTS } from '@/config/lectures';
import { useUserContext } from '@/context/UserContext';
import { getSlideMetadata, getLectureSlideCount, getBgVariant, getLectureDeck } from '../components/slides/SlideRenderer';
import { useSlideViewerState } from './useSlideViewerState';
import { usePresenterFeatures } from './usePresenterFeatures';
import { ViewMode, Theme } from '../context/PresentationContext';
import { useFirebase } from '@/context/FirebaseContext';
import type { QuizState } from '@/services/firebase/IFirebaseService';
import { DEFAULT_SETTINGS } from '../components/layers/SettingsPopover';


/** Minimal shape of the View Transition API object we actually use */
interface ViewTransitionHandle {
  ready: Promise<void>;
  finished: Promise<void>;
}

export const useSlideViewerOrchestrator = () => {
  const { subjectId, sessionId, lectureId, slideNo } = useParams<Record<string, string>>();
  const navigate = useNavigate();
  const currentSlideInt = slideNo ? parseInt(slideNo, 10) : 1;

  // Tracks the intended direction of the most recent slide change.
  // Read by PresentationModeView to set initialClick on the per-slide ClickStepsProvider.
  const slideDirectionRef = useRef<'forward' | 'backward'>('forward');

  // Settings ref to access settings without causing dependency re-evaluation circular loops
  const settingsRef = useRef(DEFAULT_SETTINGS);

  const startSafeTransition = useCallback((updateFn: () => void) => {
    if (!document.startViewTransition) {
      updateFn();
      return;
    }
    // When rapid navigation fires a second transition before the first animation
    // finishes, the browser aborts the first and rejects its promises. We suppress
    // both `ready` and `finished` so no uncaught-rejection noise reaches the console.
    const vt = document.startViewTransition(() => {
      flushSync(updateFn);
    }) as unknown as ViewTransitionHandle;
    vt.ready.catch(() => { });
    vt.finished.catch(() => { });
  }, []);

  const activeSub = SUBJECTS.find((sub) => sub.id === subjectId);
  const activeSession = activeSub?.sessions.find((sess) => sess.id === sessionId);
  const activeLec = activeSession?.lectures.find((lec) => lec.id === lectureId);

  const { userProfile } = useUserContext();
  const isAdmin = userProfile?.role === 'admin';

  const rawTotalSlidesCount = useMemo(() => {
    return activeLec ? getLectureSlideCount(activeLec.id) : 10;
  }, [activeLec]);

  // Active slide local state for synchronous rendering transitions
  const [activeSlide, setActiveSlide] = useState(currentSlideInt);

  const firebaseService = useFirebase();
  const [quizStates, setQuizStates] = useState<Record<string, QuizState>>({});

  useEffect(() => {
    if (!activeLec || !activeSub) return;
    const deck = getLectureDeck(activeLec.id);
    const quizIds = (Object.values(deck.slideMetadata) as Array<{ quizId?: string }>)
      .map((m) => m.quizId)
      .filter((id): id is string => !!id);

    if (quizIds.length === 0) {
      setQuizStates({});
      return;
    }

    const unsubscribes = quizIds.map((id) =>
      firebaseService.subscribeQuizState(id, (state) => {
        if (state) {
          setQuizStates((prev) => ({ ...prev, [id]: state }));
        }
      })
    );

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [activeLec, activeSub, firebaseService]);

  const visibleSlideNumbers = useMemo(() => {
    const list: number[] = [];
    if (!activeSub || !activeLec) return list;
    const deck = getLectureDeck(activeLec.id);

    for (let i = 1; i <= rawTotalSlidesCount; i++) {
      const meta = deck.slideMetadata[i];
      if (meta && meta.quizId && meta.quizVisibilityMode === 'stealth' && !isAdmin) {
        const qState = quizStates[meta.quizId];
        const isLive = qState?.status === 'active' || qState?.status === 'closed';
        if (!isLive) {
          continue;
        }
      }
      list.push(i);
    }
    return list;
  }, [rawTotalSlidesCount, activeSub, activeLec, quizStates, isAdmin]);

  const totalSlidesCount = visibleSlideNumbers.length;

  const currentMeta = useMemo(() => {
    if (!activeLec || !activeSub) return null;
    return getSlideMetadata(activeSlide, activeSub, activeLec);
  }, [activeSlide, activeSub, activeLec]);

  const quizId = currentMeta?.quizId || null;
  const activeQuizState = quizId ? quizStates[quizId] || null : null;

  // Initial background resolution
  const initialMeta = activeLec && activeSub ? getSlideMetadata(currentSlideInt, activeSub, activeLec) : null;
  const [bgVariant, setBgVariant] = useState<'default' | 'calculation' | 'gallery' | 'cover'>(
    initialMeta ? getBgVariant(initialMeta.type) : 'default'
  );

  // Sync route URL parameter slideNo changes into local state (e.g. browser history back/forward)
  useEffect(() => {
    if (slideNo !== undefined) {
      const parsed = parseInt(slideNo, 10);
      if (!isNaN(parsed) && parsed !== activeSlide) {
        setActiveSlide(parsed);
        const meta = activeSub && activeLec ? getSlideMetadata(parsed, activeSub, activeLec) : null;
        if (meta) {
          setBgVariant(getBgVariant(meta.type));
        }
      }
    }
  }, [slideNo]);

  const applyTransitionStyle = useCallback((nextSlideNum: number, direction: 'forward' | 'backward') => {
    const meta = activeSub && activeLec ? getSlideMetadata(nextSlideNum, activeSub, activeLec) : null;
    const resolvedTransition = meta?.transition || settingsRef.current.transitionType || 'morph';
    const duration = settingsRef.current.transitionDuration || 300;

    let oldAnim = 'morph-out';
    let newAnim = 'morph-in';

    if (resolvedTransition === 'slide') {
      if (direction === 'forward') {
        oldAnim = 'canvas-slide-out-left';
        newAnim = 'canvas-slide-in-right';
      } else {
        oldAnim = 'canvas-slide-out-right';
        newAnim = 'canvas-slide-in-left';
      }
    } else if (resolvedTransition === 'fade') {
      oldAnim = 'canvas-fade-out';
      newAnim = 'canvas-fade-in';
    } else if (resolvedTransition === 'zoom') {
      oldAnim = 'canvas-zoom-out';
      newAnim = 'canvas-zoom-in';
    } else if (resolvedTransition === 'none') {
      oldAnim = 'none';
      newAnim = 'none';
    }

    const docEl = document.documentElement;
    docEl.style.setProperty('--slide-canvas-duration', `${duration}ms`);
    docEl.style.setProperty('--slide-canvas-old-anim', oldAnim);
    docEl.style.setProperty('--slide-canvas-new-anim', newAnim);
  }, [activeSub, activeLec]);

  // Sync browser back/forward buttons (popstate events) with view transitions
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart) {
        const parsed = parseInt(lastPart, 10);
        if (!isNaN(parsed) && parsed !== activeSlide) {
          const meta = activeSub && activeLec ? getSlideMetadata(parsed, activeSub, activeLec) : null;
          const nextBgVariant = meta ? getBgVariant(meta.type) : 'default';
          const direction = parsed > activeSlide ? 'forward' : 'backward';
          
          applyTransitionStyle(parsed, direction);
          slideDirectionRef.current = direction;
          
          startSafeTransition(() => {
            setActiveSlide(parsed);
            setBgVariant(nextBgVariant);
          });
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeSlide, activeSub, activeLec, startSafeTransition, applyTransitionStyle]);

  const changeSlideWithTransition = useCallback((nextSlide: number, direction: 'forward' | 'backward' = 'forward') => {
    const meta = activeSub && activeLec ? getSlideMetadata(nextSlide, activeSub, activeLec) : null;
    const nextBgVariant = meta ? getBgVariant(meta.type) : 'default';

    applyTransitionStyle(nextSlide, direction);
    slideDirectionRef.current = direction;
    startSafeTransition(() => {
      setActiveSlide(nextSlide);
      setBgVariant(nextBgVariant);
    });
    window.history.pushState(null, '', `/${subjectId}/${sessionId}/${lectureId}/${nextSlide}`);
  }, [subjectId, sessionId, lectureId, activeSub, activeLec, startSafeTransition, applyTransitionStyle]);

  const { pathname } = useLocation();
  const isBlogMode = pathname.endsWith('/blog');

  // Determine active viewMode and theme based on presentation states
  const isPresenting = slideNo !== undefined;
  const viewMode: ViewMode = isPresenting ? 'present' : (isBlogMode ? 'blog' : 'scroll');

  const viewerState = useSlideViewerState({ subjectId, sessionId, lectureId, currentSlideInt: activeSlide });

  const presenterFeatures = usePresenterFeatures({
    subjectId,
    sessionId,
    lectureId,
    currentSlideInt: activeSlide,
    onSlideChange: changeSlideWithTransition,
    viewMode,
  });

  // Sync settings state to ref for transition callbacks
  useEffect(() => {
    if (presenterFeatures?.settings) {
      settingsRef.current = presenterFeatures.settings;
    }
  }, [presenterFeatures?.settings]);

  // Group slide numbers by section
  const sections = useMemo(() => {
    const groups: Record<string, number[]> = {};
    if (!activeSub || !activeLec) return groups;
    visibleSlideNumbers.forEach((i) => {
      const meta = getSlideMetadata(i, activeSub, activeLec);
      const sec = meta.section;
      if (!groups[sec]) groups[sec] = [];
      groups[sec].push(i);
    });
    return groups;
  }, [visibleSlideNumbers, activeSub, activeLec]);

  // Redirect to nearest valid slide if the current URL slide is hidden/stealthed
  useEffect(() => {
    if (visibleSlideNumbers.length > 0 && !visibleSlideNumbers.includes(activeSlide)) {
      const closest = visibleSlideNumbers.find((num) => num > activeSlide) || visibleSlideNumbers[visibleSlideNumbers.length - 1] || 1;
      changeSlideWithTransition(closest, 'forward');
    }
  }, [visibleSlideNumbers, activeSlide, changeSlideWithTransition]);

  const navigateWithTransition = useCallback((path: string, options?: NavigateOptions) => {
    startSafeTransition(() => navigate(path, options));
  }, [navigate, startSafeTransition]);

  const handleNextSection = useCallback(() => {
    if (activeQuizState?.status === 'active') {
      alert('Cannot advance slide while the live quiz is actively collecting responses. Please close the quiz first.');
      return;
    }
    if (!activeSub || !activeLec) return;
    const currentMeta = getSlideMetadata(activeSlide, activeSub, activeLec);
    const sectionNames = Object.keys(sections);
    const currentSecIndex = sectionNames.indexOf(currentMeta.section);
    if (currentSecIndex !== -1 && currentSecIndex < sectionNames.length - 1) {
      const nextSectionName = sectionNames[currentSecIndex + 1];
      if (nextSectionName) {
        const nextSectionSlides = sections[nextSectionName];
        if (nextSectionSlides && nextSectionSlides.length > 0) {
          const targetSlide = nextSectionSlides[0];
          if (targetSlide !== undefined) {
            changeSlideWithTransition(targetSlide);
          }
        }
      }
    }
  }, [activeSlide, activeSub, activeLec, sections, changeSlideWithTransition, activeQuizState]);

  const handlePrevSection = useCallback(() => {
    if (!activeSub || !activeLec) return;
    const currentMeta = getSlideMetadata(activeSlide, activeSub, activeLec);
    const sectionNames = Object.keys(sections);
    const currentSecIndex = sectionNames.indexOf(currentMeta.section);
    if (currentSecIndex > 0) {
      const prevSectionName = sectionNames[currentSecIndex - 1];
      if (prevSectionName) {
        const prevSectionSlides = sections[prevSectionName];
        if (prevSectionSlides && prevSectionSlides.length > 0) {
          const targetSlide = prevSectionSlides[0];
          if (targetSlide !== undefined) {
            changeSlideWithTransition(targetSlide);
          }
        }
      }
    }
  }, [activeSlide, activeSub, activeLec, sections, changeSlideWithTransition]);

  const handlePrevSlide = useCallback(() => {
    const currentIndex = visibleSlideNumbers.indexOf(activeSlide);
    if (currentIndex > 0) {
      const prevSlideNum = visibleSlideNumbers[currentIndex - 1]!;
      changeSlideWithTransition(prevSlideNum, 'backward');
    }
  }, [activeSlide, visibleSlideNumbers, changeSlideWithTransition]);

  const handleNextSlide = useCallback(() => {
    if (activeQuizState?.status === 'active') {
      alert('Cannot advance slide while the live quiz is actively collecting responses. Please close the quiz first.');
      return;
    }
    const currentIndex = visibleSlideNumbers.indexOf(activeSlide);
    if (currentIndex !== -1 && currentIndex < visibleSlideNumbers.length - 1) {
      const nextSlideNum = visibleSlideNumbers[currentIndex + 1]!;
      changeSlideWithTransition(nextSlideNum, 'forward');
    }
  }, [activeSlide, visibleSlideNumbers, changeSlideWithTransition, activeQuizState]);

  const activeTheme: Theme = viewerState.isProjectionView ? 'projection' : (presenterFeatures.isDark ? 'dark' : 'light');

  const notFound = !activeSub || !activeLec;

  return {
    subjectId,
    sessionId,
    lectureId,
    slideNo,
    activeSub,
    activeSession,
    activeLec,
    totalSlidesCount,
    activeSlide,
    setActiveSlide,
    viewMode,
    activeTheme,
    sections,
    viewerState,
    presenterFeatures,
    notFound,
    bgVariant,
    slideDirectionRef,
    navigateWithTransition,
    changeSlideWithTransition,
    handleNextSection,
    handlePrevSection,
    handlePrevSlide,
    handleNextSlide,
    visibleSlideNumbers,
  };
};

export default useSlideViewerOrchestrator;
