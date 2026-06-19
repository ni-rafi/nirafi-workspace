import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'projection';
export type ViewMode = 'scroll' | 'present' | 'blog';

export interface PresentationContextType {
  theme: Theme;
  viewMode: ViewMode;
  activeSubStep: number;
  slideNo?: number;
}

export const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

/**
 * Custom hook to consume the dynamic presentation session context.
 */
export const usePresentation = (): PresentationContextType => {
  const context = useContext(PresentationContext);
  if (!context) {
    return {
      theme: 'light',
      viewMode: 'blog',
      activeSubStep: 999,
    };
  }
  return context;
};
