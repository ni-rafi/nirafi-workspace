import { useState, useEffect } from 'react';
import { useTheme } from '@/context';
import { SlideSettings, DEFAULT_SETTINGS } from '../components/layers/SettingsPopover';
import { useUrlSyncedState } from './useUrlSyncedState';

interface WakeLockSentinel {
  release: () => Promise<void>;
}

export const usePresenterFeatures = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

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

  // 1. Right Click Context Menu Handler
  const handleContextMenu = (e: React.MouseEvent) => {
    if (e.shiftKey) return; // Shift + Right Click bypass
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true,
    });
  };


  // 3. Screen Wake Lock control
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
      if (wakeLockSentinel) {
        await wakeLockSentinel.release();
        wakeLockSentinel = null;
      }
    };

    if (settings.wakeLock) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [settings.wakeLock]);

  // 4. Cursor inactivity control
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
        if (!isLaserActive) {
          document.body.classList.add('cursor-none');
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('cursor-none');
      clearTimeout(timer);
    };
  }, [settings.hideIdleCursor, isLaserActive]);

  // Apply filters dynamically
  const filterStyle = [
    settings.invert ? 'invert(1)' : '',
    settings.brightness !== 1.0 ? `brightness(${settings.brightness})` : '',
    settings.contrast !== 1.0 ? `contrast(${settings.contrast})` : '',
    settings.saturation !== 1.0 ? `saturate(${settings.saturation})` : '',
    settings.sepia > 0 ? `sepia(${settings.sepia})` : '',
    settings.hueRotate !== 0 ? `hue-rotate(${settings.hueRotate}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    settings,
    contextMenu,
    setContextMenu,
    isOverviewOpen,
    setIsOverviewOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isLaserActive,
    setIsLaserActive,
    isDark,
    handleToggleDark,
    handleSettingsChange,
    handleContextMenu,
    filterStyle,
  };
};
export default usePresenterFeatures;
