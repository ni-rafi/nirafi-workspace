import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import TwoColumnLayout from './TwoColumnLayout';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';

interface TwoColumnToastLayoutProps {
  title: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: string;
  footer?: React.ReactNode;
  toastPosition?: 'left' | 'right' | 'center';
}

export const TwoColumnToastLayout: React.FC<TwoColumnToastLayoutProps> = (props) => {
  const presentation = useContext(PresentationContext);
  const { currentClick } = useClickStepsContext();
  const viewMode = presentation?.viewMode || 'present';

  // For non-presentation modes (blog, scroll), delegate directly to TwoColumnLayout
  if (viewMode !== 'present') {
    return <TwoColumnLayout {...props} />;
  }

  const { title, leftContent, rightContent, footer, toastPosition = 'right' } = props;

  // Determine positioning classes based on toastPosition prop
  let positionClasses = 'bottom-6 right-6'; // Default to right
  if (toastPosition === 'left') {
    positionClasses = 'bottom-6 left-6';
  } else if (toastPosition === 'center') {
    positionClasses = 'bottom-6 left-1/2 -translate-x-1/2';
  }

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
          <div className={`absolute z-50 w-80 max-w-xs presentation-toast-container ${positionClasses}`}>
            <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl p-3 text-left transition-all duration-300">
              {rightContent}
            </div>
          </div>
        </main>
      </div>

      <LayoutFooter footer={footer} />

      <style>{`
        .presentation-toast-container [data-click-reveal] {
          display: none !important;
        }
        .presentation-toast-container [data-click-reveal][data-step="${currentClick}"] {
          display: block !important;
          animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Hide static column sub-headers in the toast to optimize corner space */
        .presentation-toast-container h4,
        .presentation-toast-container span[class*="text-[9px]"] {
          display: none !important;
        }
        /* Strip card-nested borders/backgrounds to keep the floating toast layout sleek and single-layer */
        .presentation-toast-container .border,
        .presentation-toast-container [class*="border-"],
        .presentation-toast-container [class*="bg-muted"],
        .presentation-toast-container [class*="shadow-"] {
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
