import React from 'react';
import MorphingBackground from '../components/MorphingBackground';

interface TwoColumnLayoutProps {
  title: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: string; // e.g. "40%" or "60%"
  bgVariant?: 'default' | 'calculation' | 'gallery';
}

/**
 * TwoColumnLayout handles side-by-side structures, dividing screen width
 * into resizable left and right content panels.
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  title,
  leftContent,
  rightContent,
  leftWidth = '50%',
  bgVariant = 'default',
}) => {
  const rightWidth = `calc(100% - ${leftWidth})`;

  return (
    <div className="relative flex flex-col h-full w-full p-8 bg-background text-foreground overflow-hidden select-text">
      <MorphingBackground variant={bgVariant} />
      
      <div className="relative z-10 flex flex-col h-full w-full min-h-0">
        <header className="slide-header text-xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </header>
        
        <main className="flex flex-1 gap-6 w-full min-h-0 items-start">
          <section 
            style={{ width: leftWidth }} 
            className="left-column h-full flex flex-col justify-start text-left overflow-y-auto pr-2 transition-all duration-500"
          >
            {leftContent}
          </section>
          <section 
            style={{ width: rightWidth }} 
            className="right-column h-full flex flex-col justify-start text-left overflow-y-auto pl-4 border-l border-border/40 transition-all duration-500"
          >
            {rightContent}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
