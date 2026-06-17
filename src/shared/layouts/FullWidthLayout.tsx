import React from 'react';
import MorphingBackground from '../components/MorphingBackground';

interface FullWidthLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
  bgVariant?: 'default' | 'calculation' | 'gallery';
}

/**
 * FullWidthLayout gives 90% of screen width to content, making it perfect
 * for displaying large code compilers, spreadsheets, or charts.
 */
export const FullWidthLayout: React.FC<FullWidthLayoutProps> = ({
  title,
  children,
  bgVariant = 'default',
}) => {
  return (
    <div className="relative flex flex-col h-full w-full p-8 bg-background text-foreground overflow-hidden select-text">
      <MorphingBackground variant={bgVariant} />
      
      <div className="relative z-10 flex flex-col h-full w-full min-h-0">
        <header className="slide-header text-xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </header>
        
        <main className="flex-1 w-full min-h-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FullWidthLayout;
