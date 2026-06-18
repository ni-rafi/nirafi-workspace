import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';

interface SlideGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SlideGrid: React.FC<SlideGridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const colClasses = isBlog
    ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
      }
    : {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
      };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-5 md:gap-6',
    lg: 'gap-6 md:gap-8',
  };

  const containerClass = `grid ${colClasses[cols]} ${gapClasses[gap]} w-full my-4 ${className}`;

  return (
    <div className={containerClass}>
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return (
          <div className="flex w-full h-full flex-col">
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default SlideGrid;
