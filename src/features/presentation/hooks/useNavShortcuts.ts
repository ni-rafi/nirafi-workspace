import { useEffect } from 'react';

interface ShortcutProps {
  onNext: () => void;
  onPrev: () => void;
  onNextSection?: () => void;
  onPrevSection?: () => void;
  onToggleFullscreen: () => void;
  onToggleOverview: () => void;
  onToggleDark: () => void;
  onTogglePresenter?: () => void;
  onToggleMagnifier?: () => void;
  onToggleWhiteboard?: () => void;
}

/**
 * useNavShortcuts binds presentation keyboard binds including USB clicker keycodes.
 *
 * USB pointer devices commonly emit:
 *  - PageDown / PageUp   (Logitech Spotlight, Kensington)
 *  - ArrowRight / ArrowLeft (generic)
 *  - Period (.) for next on Logitech R400
 *  - F5 for "start slideshow" — we prevent default to avoid browser reload
 */
export const useNavShortcuts = ({
  onNext,
  onPrev,
  onNextSection,
  onPrevSection,
  onToggleFullscreen,
  onToggleOverview,
  onToggleDark,
  onTogglePresenter,
  onToggleMagnifier,
  onToggleWhiteboard,
}: ShortcutProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts if the user is typing in an input, textarea, or editable element
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.hasAttribute('contenteditable') ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // Navigation: ArrowRight / Space / PageDown / Period (Logitech R400 next)
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown' || e.key === '.') {
        e.preventDefault();
        onNext();
      // Navigation: ArrowLeft / Backspace / PageUp
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        onPrev();
      // Section jump
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        onNextSection?.();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        onPrevSection?.();
      // Fullscreen
      } else if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        onToggleFullscreen();
      // Overview
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        onToggleOverview();
      // Dark mode
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        onToggleDark();
      // Presenter view
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        onTogglePresenter?.();
      // Magnifier (M key)
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onToggleMagnifier?.();
      // Whiteboard (W key)
      } else if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        onToggleWhiteboard?.();
      // Prevent F5 browser refresh (some clickers send F5 for "start slideshow")
      } else if (e.key === 'F5') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onNext, onPrev, onNextSection, onPrevSection,
    onToggleFullscreen, onToggleOverview, onToggleDark,
    onTogglePresenter, onToggleMagnifier, onToggleWhiteboard,
  ]);
};

export default useNavShortcuts;
