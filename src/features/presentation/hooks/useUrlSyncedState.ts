import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePresentation } from '../context/PresentationContext';

/**
 * useUrlSyncedState synchronizes an interactive component's parameter state with URL query search parameters,
 * scoped automatically by slide number (e.g., `?s3.thickness=0.150`) to avoid naming collisions.
 */
export function useUrlSyncedState<T extends string | number | boolean>(
  key: string,
  defaultValue: T
): [T, (val: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  
  let presentation = null;
  try {
    presentation = usePresentation();
  } catch {
    // Return safe fallback outside of presentation provider (e.g. in static docs or sandbox)
  }

  const slideNo = presentation?.slideNo;
  
  // Compute query key (e.g. "s3.thickness" or "thickness" if outside presentation)
  const queryKey = slideNo ? `s${slideNo}.${key}` : key;

  // Helper to parse URL strings back to typed parameters
  const parseVal = (str: string | null): T => {
    if (str === null) return defaultValue;
    if (typeof defaultValue === 'number') {
      const parsed = parseFloat(str);
      return (isNaN(parsed) ? defaultValue : parsed) as unknown as T;
    }
    if (typeof defaultValue === 'boolean') {
      return (str === 'true') as unknown as T;
    }
    return str as unknown as T;
  };

  const [state, setState] = useState<T>(() => {
    const fromUrl = searchParams.get(queryKey);
    return parseVal(fromUrl);
  });

  // Keep state in sync with URL adjustments (e.g., loaded link, reset buttons, active routing shifts)
  useEffect(() => {
    const fromUrl = searchParams.get(queryKey);
    const parsed = parseVal(fromUrl);
    if (parsed !== state) {
      setState(parsed);
    }
  }, [searchParams, queryKey]);

  // Update value in local state and push replacing update to search query parameters
  const setSyncedState = useCallback(
    (newValue: T) => {
      setState(newValue);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(queryKey, String(newValue));
          return next;
        },
        { replace: true } // replace: true prevents history clutter
      );
    },
    [queryKey, setSearchParams]
  );

  return [state, setSyncedState];
}

export default useUrlSyncedState;
