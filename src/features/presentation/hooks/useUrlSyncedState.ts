import { useEffect, useState, useCallback } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { getLectureIdFromPath, storageKeys, getStorageItem, setStorageItem } from '../utils/presentationStorage';

/**
 * useUrlSyncedState synchronizes an interactive component's parameter state across windows/tabs
 * via local storage and storage events, scoped automatically by slide number to avoid naming collisions.
 */
export function useUrlSyncedState<T extends string | number | boolean>(
  key: string,
  defaultValue: T
): [T, (val: T) => void] {
  let presentation = null;
  try {
    presentation = usePresentation();
  } catch {
    // Return safe fallback outside of presentation provider
  }

  const slideNo = presentation?.slideNo;
  const lectureId = getLectureIdFromPath();

  // Compute storage key scoped by lecture and slide
  const storageKey = storageKeys.syncedParam(lectureId, slideNo, key);

  const [state, setState] = useState<T>(() => {
    return getStorageItem<T>(storageKey, defaultValue);
  });

  // Sync state when localStorage changes in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        setState(getStorageItem<T>(storageKey, defaultValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey, defaultValue]);

  // Keep state in sync when storageKey updates (e.g. slide change mounts)
  useEffect(() => {
    setState(getStorageItem<T>(storageKey, defaultValue));
  }, [storageKey, defaultValue]);

  // Update value in local state and set in localStorage to trigger cross-tab sync
  const setSyncedState = useCallback(
    (newValue: T) => {
      setState(newValue);
      setStorageItem(storageKey, newValue);
    },
    [storageKey]
  );

  return [state, setSyncedState];
}

export default useUrlSyncedState;

