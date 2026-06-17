import React from 'react';
import MorphingBackground from '../components/MorphingBackground';

interface GridLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
  cols?: number; // e.g. 2, 3, 4
  bgVariant?: 'default' | 'calculation' | 'gallery';
}

/**
 * GridLayout arranges slides in a multi-column flex/grid container,
 * supporting 2, 3, or 4 columns dynamically.
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  title,
  children,
  cols = 3,
  bgVariant = 'gallery',
}) => {
  const getColClass = () => {
    switch (cols) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full p-8 bg-background text-foreground overflow-hidden select-text">
      <MorphingBackground variant={bgVariant} />
      
      <div className="relative z-10 flex flex-col h-full w-full min-h-0">
        <header className="slide-header text-xl font-bold tracking-tight text-foreground mb-4">
          {title}
        </header>
        
        <main className="flex-1 w-full min-h-0 overflow-y-auto">
          <div className={`grid gap-6 w-full ${getColClass()}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GridLayout;
