import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context';
import { SlideSettings, DEFAULT_SETTINGS } from '../components/layers/SettingsPopover';
import { useUrlSyncedState } from './useUrlSyncedState';
import { useMagnifier } from './useMagnifier';
import { useWhiteboard } from './useWhiteboard';
import { getLectureIdFromPath } from '../utils/presentationStorage';

interface WakeLockSentinel {
  release: () => Promise<void>;
}

/**
 * usePresenterFeatures aggregates all presenter-specific tool state:
 * settings, context menu, overview, dark mode, laser pointer,
 * magnifier (loupe), and whiteboard.
 */
export const usePresenterFeatures = (slideNo?: number) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const lectureId = getLectureIdFromPath();

  const [settings, setSettings] = useState<SlideSettings>(DEFAULT_SETTINGS);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean } | null>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLaserActive, setIsLaserActive] = useUrlSyncedState<boolean>('laser-active', false);

  const isDark = resolvedTheme === 'dark';

  const handleToggleDark = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSettingsChange = (newSettings: Partial<SlideSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (e.shiftKey) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, isOpen: true });
  };

  // Magnifier (loupe lens)
  const magnifier = useMagnifier();

  // Whiteboard overlay
  const whiteboard = useWhiteboard({ lectureId, slideNo: slideNo ?? 0 });

  // Screen Wake Lock control
  useEffect(() => {
    let wakeLockSentinel: WakeLockSentinel | null = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && settings.wakeLock) {
        try {
          const navWakeLock = (navigator as unknown as { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock;
          wakeLockSentinel = await navWakeLock.request('screen');
        } catch (err) {
          console.warn('Wake lock active request failed:', err);
        }
      }
    };
    const releaseWakeLock = async () => {
      if (wakeLockSentinel) { await wakeLockSentinel.release(); wakeLockSentinel = null; }
    };
    if (settings.wakeLock) { requestWakeLock(); } else { releaseWakeLock(); }
    return () => { releaseWakeLock(); };
  }, [settings.wakeLock]);

  // Cursor inactivity control
  useEffect(() => {
    if (!settings.hideIdleCursor || isLaserActive) {
      document.body.classList.remove('cursor-none');
      return;
    }
    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
      document.body.classList.remove('cursor-none');
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isLaserActive) document.body.classList.add('cursor-none');
      }, 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('cursor-none');
      clearTimeout(timer);
    };
  }, [settings.hideIdleCursor, isLaserActive]);

  // Apply display filters dynamically
  const filterStyle = [
    settings.invert ? 'invert(1)' : '',
    settings.brightness !== 1.0 ? `brightness(${settings.brightness})` : '',
    settings.contrast !== 1.0 ? `contrast(${settings.contrast})` : '',
    settings.saturation !== 1.0 ? `saturate(${settings.saturation})` : '',
    settings.sepia > 0 ? `sepia(${settings.sepia})` : '',
    settings.hueRotate !== 0 ? `hue-rotate(${settings.hueRotate}deg)` : '',
  ].filter(Boolean).join(' ');

  return {
    settings, contextMenu, setContextMenu,
    isOverviewOpen, setIsOverviewOpen,
    isSettingsOpen, setIsSettingsOpen,
    isLaserActive, setIsLaserActive,
    isDark, handleToggleDark, handleSettingsChange, handleContextMenu, filterStyle,
    // Magnifier
    isMagnifierActive: magnifier.isMagnifierActive,
    magnifierPosition: magnifier.magnifierPosition,
    magnifierZoom: magnifier.magnifierZoom,
    toggleMagnifier: magnifier.toggleMagnifier,
    handleMagnifierMouseMove: magnifier.handleMagnifierMouseMove,
    // Whiteboard
    isWhiteboardOpen: whiteboard.isWhiteboardOpen,
    boardMode: whiteboard.boardMode,
    toggleWhiteboard: whiteboard.toggleWhiteboard,
    toggleBoardMode: whiteboard.toggleBoardMode,
  };
};

export default usePresenterFeatures;
