import { useState, useEffect, useRef } from 'react';
import type { SectionGroup } from './types';

export function useScrollSpy(
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  sidebarRef: React.RefObject<HTMLDivElement | null>,
  totalSlides: number,
  sectionsData: SectionGroup[],
  activeSlide: number,
  collapsedSections: Record<string, boolean>
) {
  const [activeSlideNo, setActiveSlideNo] = useState<number>(activeSlide);
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>(() => ({
    [`slide-card-${activeSlide}`]: true,
  }));
  const lastActiveRef = useRef<number>(activeSlide);

  // Sync state if activeSlide prop changes
  useEffect(() => {
    setActiveSlideNo(activeSlide);
    lastActiveRef.current = activeSlide;
  }, [activeSlide]);

  // 1. Scroll listener for pixel-accurate active slide detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      // focusY represents the active focus point (e.g. 25% from the top of the container viewport)
      const focusY = containerRect.height * 0.25;

      let currentActive = lastActiveRef.current;

      // Find the slide that currently overlaps the focus point
      for (let i = 1; i <= totalSlides; i++) {
        const el = container.querySelector(`#slide-card-${i}`);
        if (!el) continue;

        const elRect = el.getBoundingClientRect();
        const relativeTop = elRect.top - containerRect.top;
        const relativeBottom = elRect.bottom - containerRect.top;

        if (relativeTop <= focusY && relativeBottom >= focusY) {
          currentActive = i;
          break;
        }
      }

      if (currentActive !== lastActiveRef.current) {
        lastActiveRef.current = currentActive;
        setActiveSlideNo(currentActive);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial check once mounted
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [totalSlides, scrollContainerRef, collapsedSections]);

  // 2. Intersection Observer to track visible slide cards AND section headers
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Proactively clean up elements that are no longer in the DOM
    setVisibleElements((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const key of Object.keys(next)) {
        const el = container.querySelector(`#${key}`);
        if (!el) {
          delete next[key];
          changed = true;
        }
      }
      return changed ? next : prev;
    });

    const observerOptions = {
      root: container,
      rootMargin: '-5px 0px -5px 0px', // slight inset to avoid boundary issues
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      setVisibleElements((prev) => {
        const next = { ...prev };
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (id) {
            if (entry.isIntersecting) {
              next[id] = true;
            } else {
              delete next[id];
            }
          }
        });
        return next;
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe slide cards
    for (let i = 1; i <= totalSlides; i++) {
      const el = container.querySelector(`#slide-card-${i}`);
      if (el) observer.observe(el);
    }

    // Observe section headers
    sectionsData.forEach((sec) => {
      const el = container.querySelector(`#section-${sec.slug}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [totalSlides, scrollContainerRef, sectionsData, collapsedSections]);

  // 3. Auto-scroll sidebar to keep active item in view
  useEffect(() => {
    const activeEl = sidebarRef.current?.querySelector('a[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSlideNo, sidebarRef]);

  return { activeSlideNo, visibleElements };
}
