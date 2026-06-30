import React, { useContext, useState } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import TwoColumnLayout from './TwoColumnLayout';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import { Minimize2, MessageSquare } from 'lucide-react';
import { getLectureIdFromPath, getStorageItem, setStorageItem } from '@/features/presentation/utils/presentationStorage';

interface TwoColumnToastLayoutProps {
  title: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: string;
  footer?: React.ReactNode;
  toastPosition?: 'left' | 'right' | 'center';
  allowMinimize?: boolean;
}

export const TwoColumnToastLayout: React.FC<TwoColumnToastLayoutProps> = (props) => {
  const presentation = useContext(PresentationContext);
  const { currentClick } = useClickStepsContext();
  const viewMode = presentation?.viewMode || 'present';

  const { title, leftContent, rightContent, footer, toastPosition = 'right', allowMinimize = true } = props;

  const lectureId = getLectureIdFromPath();
  const storageKey = `cee_toast_minimized_${lectureId}`;

  const [isMinimized, setIsMinimized] = useState(() => {
    if (viewMode !== 'present') return false;
    return getStorageItem<boolean>(storageKey, false);
  });

  // For non-presentation modes (blog, scroll), delegate directly to TwoColumnLayout
  if (viewMode !== 'present') {
    return <TwoColumnLayout {...props} />;
  }

  const handleToggleMinimize = (val: boolean) => {
    setIsMinimized(val);
    setStorageItem(storageKey, val);
  };

  // Determine positioning classes based on toastPosition prop
  let positionClasses = 'bottom-6 right-6'; // Default to right
  let originClass = 'origin-bottom-right';
  if (toastPosition === 'left') {
    positionClasses = 'bottom-6 left-6';
    originClass = 'origin-bottom-left';
  } else if (toastPosition === 'center') {
    positionClasses = 'bottom-6 left-1/2 -translate-x-1/2';
    originClass = 'origin-bottom';
  }

  const revealedSelectors = Array.from(
    { length: currentClick + 1 },
    (_, i) => `.presentation-toast-container [data-click-reveal][data-step="${i}"]`
  ).join(',\n');

  return (
    <div className="relative flex flex-col justify-between h-full w-full px-2.5 py-1.5 bg-transparent text-foreground overflow-hidden select-text">
      <div className="relative z-10 flex flex-col h-full w-full min-h-0 flex-1">
        <LayoutHeader title={title} />

        <main className="relative flex-1 w-full min-h-0">
          {/* Diagram takes full width/height in presentation mode */}
          <div className="w-full h-full">
            {leftContent}
          </div>

          {/* Premium highly transparent glassmorphic toast pinned to corner */}
          <div 
            className={`absolute z-50 w-80 max-w-xs presentation-toast-container ${positionClasses} ${originClass} transition-all duration-300 ease-in-out ${
              isMinimized 
                ? 'opacity-0 scale-90 pointer-events-none translate-y-4' 
                : 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            }`}
            style={toastPosition === 'center' ? { transform: `translateX(-50%) ${isMinimized ? 'translateY(16px) scale(0.9)' : 'translateY(0) scale(1)'}` } : undefined}
          >
            {allowMinimize && (
              <button
                onClick={() => handleToggleMinimize(true)}
                className="absolute -top-3 -right-2.5 z-50 h-6 w-6 rounded-full bg-background/90 hover:bg-background text-muted-foreground hover:text-foreground shadow-md border border-border flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                title="Minimize explanation"
                aria-label="Minimize explanation"
              >
                <Minimize2 className="h-3 w-3" />
              </button>
            )}
            <div className="bg-background/70 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] p-3.5 text-left transition-all duration-300">
              <div className="toast-content">
                {rightContent}
              </div>
            </div>
          </div>

          {/* Restore/Expand button when minimized */}
          {allowMinimize && (
            <div 
              className={`absolute z-50 ${positionClasses} ${originClass} transition-all duration-300 ease-in-out ${
                isMinimized 
                  ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' 
                  : 'opacity-0 scale-90 pointer-events-none translate-y-4'
              }`}
              style={toastPosition === 'center' ? { transform: `translateX(-50%) ${isMinimized ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)'}` } : undefined}
            >
              <button
                onClick={() => handleToggleMinimize(false)}
                className="flex items-center justify-center h-12 w-12 rounded-full bg-background/80 hover:bg-background/90 text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-border/50 backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
                title="Show explanation"
                aria-label="Show explanation"
              >
                <MessageSquare className="h-5 w-5 text-primary" />
              </button>
            </div>
          )}
        </main>
      </div>

      <LayoutFooter footer={footer} />

      <style>{`
            .presentation-toast-container [data-click-reveal] {
              display: none !important;
            }
            ${revealedSelectors} {
              display: block !important;
              animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            /* Hide static column sub-headers in the toast to optimize corner space */
            .presentation-toast-container h4,
            .presentation-toast-container span[class*="text-[9px]"] {
              display: none !important;
            }
            /* Strip card-nested borders/backgrounds to keep the floating toast layout sleek and single-layer */
            .toast-content .border,
            .toast-content [class*="border-"],
            .toast-content [class*="bg-muted"],
            .toast-content [class*="shadow-"] {
              border-color: transparent !important;
              background-color: transparent !important;
              background: transparent !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            @keyframes toastSlideUp {
              from { transform: translateY(12px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
    </div>
  );
};

export default TwoColumnToastLayout;
